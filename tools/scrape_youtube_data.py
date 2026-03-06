import os
import json
import argparse
from typing import List, Dict, Any
from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
import datetime

from googleapiclient.errors import HttpError
import sys

# Load env variables (YouTube API Key)
load_dotenv(override=True)

# Support multiple comma-separated keys
YOUTUBE_API_KEYS = [k.strip() for k in os.getenv("YOUTUBE_API_KEY", "").split(",") if k.strip()]

if not YOUTUBE_API_KEYS:
    raise ValueError("YOUTUBE_API_KEY is missing from .env")

current_key_index = 0
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEYS[current_key_index])

def execute_request_with_retry(request_creator):
    global current_key_index
    global youtube
    while True:
        try:
            request = request_creator(youtube)
            return request.execute()
        except HttpError as e:
            if e.resp.status == 403 and "quota" in str(e).lower():
                print(f"Quota exceeded for API Key {current_key_index + 1}. ", file=sys.stderr)
                current_key_index += 1
                if current_key_index < len(YOUTUBE_API_KEYS):
                    print(f"Switching to API Key {current_key_index + 1}...", file=sys.stderr)
                    youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEYS[current_key_index])
                else:
                    raise Exception("All provided YouTube API keys have exhausted their quota!")
            else:
                raise e

def get_channel_videos(channel_id: str, max_results: int = 10) -> List[Dict[str, Any]]:
    """Fetch the latest videos for a given YouTube channel ID."""
    print(f"Fetching latest {max_results} videos for channel: {channel_id}")
    seven_days_ago = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(days=7)).isoformat().replace("+00:00", "Z")
    def request_creator(yt):
        return yt.search().list(
            part="snippet",
            channelId=channel_id,
            q='"Artificial Intelligence" OR "AI automation"',
            maxResults=max_results,
            order="date",
            publishedAfter=seven_days_ago,
            relevanceLanguage="en",
            type="video"
        )
    response = execute_request_with_retry(request_creator)
    
    videos = []
    for item in response.get("items", []):
        thumbnails = item["snippet"].get("thumbnails", {})
        thumb_url = ""
        for quality in ["maxres", "standard", "high", "medium", "default"]:
            if quality in thumbnails:
                thumb_url = thumbnails[quality]["url"]
                break

        videos.append({
            "video_id": item["id"]["videoId"],
            "title": item["snippet"]["title"],
            "channel_title": item["snippet"].get("channelTitle", "Unknown Channel"),
            "published_at": item["snippet"]["publishedAt"],
            "description": item["snippet"]["description"],
            "thumbnail_url": thumb_url
        })
    return videos

def get_video_stats(video_id: str) -> Dict[str, Any]:
    """Fetch view count and likes for a video."""
    def request_creator(yt):
        return yt.videos().list(
            part="statistics",
            id=video_id
        )
    response = execute_request_with_retry(request_creator)
    
    if not response.get("items"):
        return {"viewCount": 0, "likeCount": 0, "commentCount": 0}
        
    stats = response["items"][0]["statistics"]
    return {
        "viewCount": int(stats.get("viewCount", 0)),
        "likeCount": int(stats.get("likeCount", 0)),
        "commentCount": int(stats.get("commentCount", 0))
    }

def get_channel_stats(channel_id: str) -> Dict[str, Any]:
    """Fetch subscriber count and other stats for a channel."""
    def request_creator(yt):
        return yt.channels().list(
            part="statistics",
            id=channel_id
        )
    response = execute_request_with_retry(request_creator)
    if not response.get("items"):
        return {"subscriberCount": 0}
    stats = response["items"][0]["statistics"]
    return {
        "subscriberCount": int(stats.get("subscriberCount", 0))
    }

def get_transcript(video_id: str) -> str:
    """Fetch the English transcript of the video as a single string."""
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        full_text = " ".join([item['text'] for item in transcript_list])
        return full_text
    except Exception as e:
        print(f"Warning: Could not get transcript for {video_id}. Error: {str(e)}")
        return ""

def find_top_channels(query: str, max_results: int = 30) -> List[str]:
    """Search for top channels matching a query, filtered by highest subscriber count."""
    print(f"Finding potential channels for query: '{query}'")
    
    # YouTube API limits maxResults to 50 per search
    def request_creator(yt):
        return yt.search().list(
            part="snippet",
            q='("Artificial Intelligence" OR "AI automation") -hindi -urdu',
            type="channel",
            maxResults=50,
            order="relevance",
            relevanceLanguage="en"
        )
    response = execute_request_with_retry(request_creator)
    
    found_channels = []
    for item in response.get("items", []):
        found_channels.append(item["snippet"]["channelId"])
        
    print(f"Found {len(found_channels)} potential channels. Filtering for highest authority (subscribers)...")
    
    if not found_channels:
        return []
        
    # Batch request for channel statistics
    chunk_ids = ",".join(found_channels)
    def stats_req_creator(yt):
        return yt.channels().list(
            part="statistics",
            id=chunk_ids
        )
    stats_res = execute_request_with_retry(stats_req_creator)
    
    channel_subs = []
    for item in stats_res.get("items", []):
        cid = item["id"]
        sub_count = int(item.get("statistics", {}).get("subscriberCount", 0))
        channel_subs.append((cid, sub_count))
        
    # Sort descending by subscribers
    channel_subs.sort(key=lambda x: x[1], reverse=True)
    
    top_channels = [c[0] for c in channel_subs[:max_results]]
    print(f"Selected top {len(top_channels)} most subscribed channels.")
    return top_channels

def main():
    parser = argparse.ArgumentParser(description="Scrape YouTube channel data, stats, and transcripts.")
    parser.add_argument("--channels", nargs='+', help="List of YouTube Channel IDs to scrape")
    parser.add_argument("--find_top_channels", type=int, help="Number of top channels to find automatically")
    parser.add_argument("--query", type=str, default='\u0022Artificial Intelligence\u0022 OR \u0022AI automation\u0022', help="Query to use for finding top channels")
    parser.add_argument("--limit", type=int, default=5, help="Number of recent videos per channel")
    parser.add_argument("--output", type=str, default=".tmp/youtube_data.json", help="Output JSON file path")
    args = parser.parse_args()
    
    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    
    channel_ids = args.channels or []
    if args.find_top_channels:
        channel_ids = find_top_channels(args.query, args.find_top_channels)
        
    if not channel_ids:
        print("Error: No channels provided or found.")
        return
    
    all_data = {}
    for channel_id in channel_ids:
        channel_data = []
        videos = get_channel_videos(channel_id, max_results=args.limit)
        channel_stats = get_channel_stats(channel_id)
        
        for video in videos:
            stats = get_video_stats(video["video_id"])
            transcript = get_transcript(video["video_id"])
            
            video_info = {
                **video,
                "stats": stats,
                "channel_subscriber_count": channel_stats.get("subscriberCount", 0),
                # Truncate transcript to save tokens in LLM (first 5000 chars)
                "transcript": transcript[:5000] if transcript else None
            }
            channel_data.append(video_info)
            
        all_data[channel_id] = channel_data
        
    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully saved scraped data to {args.output}")

if __name__ == "__main__":
    main()
