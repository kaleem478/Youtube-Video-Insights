import os
import json
import argparse
import matplotlib.pyplot as plt
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from dotenv import load_dotenv

load_dotenv()

SCOPES = [
    'https://www.googleapis.com/auth/presentations',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/gmail.send'
]

def get_google_services():
    credential_path = os.getenv("GMAIL_CREDENTIAL_PATH", "credentials.json")
    token_path = os.getenv("GMAIL_TOKEN_PATH", "token.json")

    creds = None
    if os.path.exists(token_path):
        if os.path.getsize(token_path) > 0:
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(credential_path):
                print(f"⚠️ Error: {credential_path} is missing.")
                return None, None
            flow = InstalledAppFlow.from_client_secrets_file(credential_path, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, 'w') as token:
            token.write(creds.to_json())

    return build('drive', 'v3', credentials=creds), build('slides', 'v1', credentials=creds)

def create_presentation(slides_service, title):
    """Creates a brand new blank presentation"""
    body = {'title': title}
    presentation = slides_service.presentations().create(body=body).execute()
    return presentation.get('presentationId')

def generate_chart_and_upload(drive_service, top_videos):
    """Generates a bar chart, saves it locally, and uploads it to Google Drive."""
    chart_path = ".tmp/top_videos_chart.png"
    
    titles = [v.get('title', 'Unknown')[:40] + "..." for v in top_videos[:5]]
    views = [v.get('stats', {}).get('viewCount', 0) for v in top_videos[:5]]
    
    fig, ax = plt.subplots(figsize=(12, 6))
    bars = ax.barh(titles, views, color='#800080')
    
    # Clean up the chart (remove borders, format labels)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_visible(False)
    ax.spines['left'].set_visible(False)
    
    ax.xaxis.set_visible(False) # Hide x axis for cleaner look
    
    # Add data labels directly on bars
    ax.bar_label(bars, fmt='{:,.0f}', padding=5, color='black', fontsize=12, fontweight='bold')
    
    plt.title('Most Watched Videos (Views)', fontsize=16, fontweight='bold', pad=20)
    plt.gca().invert_yaxis()
    plt.tight_layout()
    plt.savefig(chart_path, dpi=300)
    plt.close()
    
    file_metadata = {'name': 'top_videos_chart.png'}
    media = MediaFileUpload(chart_path, mimetype='image/png')
    file = drive_service.files().create(body=file_metadata, media_body=media, fields='id, webContentLink').execute()
    
    file_id = file.get('id')
    drive_service.permissions().create(fileId=file_id, body={'role': 'reader', 'type': 'anyone'}).execute()
    
    file = drive_service.files().get(fileId=file_id, fields='webContentLink').execute()
    return file.get('webContentLink')

def build_slides_from_scratch(drive_service, slides_service, presentation_id, youtube_data):
    """Generates a full presentation including new required slides."""
    
    # Process analytics
    all_videos = []
    unique_channels = {}
    total_views = 0
    total_likes = 0
    
    for cid, videos in youtube_data.items():
        if videos:
            first_v = videos[0]
            unique_channels[cid] = {
                'name': first_v.get('channel_title', 'Unknown'),
                'subs': first_v.get('channel_subscriber_count', 0)
            }
        all_videos.extend(videos)
        for v in videos:
            total_views += v.get('stats', {}).get('viewCount', 0)
            total_likes += v.get('stats', {}).get('likeCount', 0)

    # Sorting
    videos_by_views = sorted(all_videos, key=lambda v: v.get('stats', {}).get('viewCount', 0), reverse=True)
    videos_by_likes = sorted(all_videos, key=lambda v: v.get('stats', {}).get('likeCount', 0), reverse=True)
    channels_by_subs = sorted(unique_channels.values(), key=lambda c: c.get('subs', 0), reverse=True)
    
    top_30_videos = videos_by_views[:30]
    
    print("Generating chart and uploading to drive...")
    chart_url = generate_chart_and_upload(drive_service, videos_by_views)
    
    requests = []
    
    def add_text_style(obj_id, color, size, bold=False):
        return {
            'updateTextStyle': {
                'objectId': obj_id,
                'style': {
                    'foregroundColor': {'opaqueColor': {'rgbColor': color}}, 
                    'fontSize': {'magnitude': size, 'unit': 'PT'},
                    'bold': bold,
                    'fontFamily': 'Montserrat'
                },
                'textRange': {'type': 'ALL'},
                'fields': 'foregroundColor,fontSize,bold,fontFamily'
            }
        }

    colors = {
        'white': {'red': 1.0, 'green': 1.0, 'blue': 1.0},
        'purple': {'red': 0.5, 'green': 0.0, 'blue': 0.5},
        'black': {'red': 0.0, 'green': 0.0, 'blue': 0.0}
    }
    
    def slide_bgcolor_request(slide_id):
        return {
            'updatePageProperties': {
                'objectId': slide_id,
                'pageProperties': {
                    'pageBackgroundFill': {
                        'solidFill': {'color': {'rgbColor': colors['white']}}
                    }
                },
                'fields': 'pageBackgroundFill'
            }
        }

    # 1. Update Title Slide
    presentation = slides_service.presentations().get(presentationId=presentation_id).execute()
    title_slide = presentation.get('slides')[0]
    title_slide_id = title_slide['objectId']
    title_shape_id = title_slide['pageElements'][0]['objectId']
    subtitle_shape_id = title_slide['pageElements'][1]['objectId']
    
    requests.extend([
        slide_bgcolor_request(title_slide_id),
        {'insertText': {'objectId': title_shape_id, 'text': 'Top AI & Automation Video Insights\nWelcome!'}},
        {'insertText': {'objectId': subtitle_shape_id, 'text': 'Automatically Generated via WAT Automation'}}
    ])
    
    text_styler_tasks = []
    text_styler_tasks.extend([
        add_text_style(title_shape_id, colors['purple'], 44, True),
        add_text_style(subtitle_shape_id, colors['black'], 22)
    ])
    
    # Helper to insert standard slides
    insertion_index = 1
    def insert_list_slide(title_text, body_text):
        nonlocal insertion_index
        slide_id = f"custom_slide_{insertion_index}"
        
        requests.append({
            'createSlide': {
                'objectId': slide_id,
                'insertionIndex': insertion_index,
                'slideLayoutReference': {'predefinedLayout': 'TITLE_AND_BODY'}
            }
        })
        requests.append(slide_bgcolor_request(slide_id))
        insertion_index += 1
        return slide_id, title_text, body_text

    slides_content = []
    
    # 2. Executive Summary
    exec_summary = f"Total Channels Appraised: {len(unique_channels)}\n"
    exec_summary += f"Total Videos Found: {len(all_videos)}\n"
    exec_summary += f"Total Cumulative Views: {total_views:,}\n"
    exec_summary += f"Total Cumulative Likes: {total_likes:,}"
    slides_content.append(insert_list_slide("Executive Summary", exec_summary))
    
    # 3. Top Views Videos
    top_views_text = ""
    for idx, v in enumerate(videos_by_views[:5]):
        top_views_text += f"{idx+1}. {v.get('title')} ({v.get('stats',{}).get('viewCount',0):,} views)\n"
    slides_content.append(insert_list_slide("Top Viewed Videos", top_views_text))
    
    # 4. Top Liked Videos
    top_likes_text = ""
    for idx, v in enumerate(videos_by_likes[:5]):
        top_likes_text += f"{idx+1}. {v.get('title')} ({v.get('stats',{}).get('likeCount',0):,} likes)\n"
    slides_content.append(insert_list_slide("Top Liked Videos", top_likes_text))
    
    # 5. Top Subscribers YouTube Channels
    top_subs_text = ""
    for idx, c in enumerate(channels_by_subs[:10]):
        top_subs_text += f"{idx+1}. {c.get('name')} ({c.get('subs',0):,} subscribers)\n"
    slides_content.append(insert_list_slide("Top Subscribed YouTube Channels", top_subs_text))
    
    # 6. Top Videos Graph Slide
    graph_slide_id = f"graph_slide_{insertion_index}"
    requests.append({
        'createSlide': {
            'objectId': graph_slide_id,
            'insertionIndex': insertion_index,
            'slideLayoutReference': {'predefinedLayout': 'TITLE_AND_BODY'}
        }
    })
    requests.append(slide_bgcolor_request(graph_slide_id))
    insertion_index += 1
    
    # 7. Videos (30 videos)
    for i, video in enumerate(top_30_videos):
        slide_id = f"video_slide_{insertion_index}"
        requests.append({
            'createSlide': {
                'objectId': slide_id,
                'insertionIndex': insertion_index,
                'slideLayoutReference': {'predefinedLayout': 'TITLE_AND_BODY'}
            }
        })
        requests.append(slide_bgcolor_request(slide_id))
        insertion_index += 1
        
    # 8. Outro / Goodbye slide
    outro_slide_id, outro_title, outro_body = insert_list_slide("Thank You!", "We hope these AI Insights were valuable.\n\nSee you next time!")
    slides_content.append((outro_slide_id, outro_title, outro_body))
    
    # ---- Execution of base requests ----
    if requests:
        slides_service.presentations().batchUpdate(presentationId=presentation_id, body={'requests': requests}).execute()
        
    # Now we fetch IDs and inject text
    presentation = slides_service.presentations().get(presentationId=presentation_id).execute()
    parsed_slides = presentation.get('slides')
    
    # Injecting texts into Summary slides and Outro
    for slide_data, custom_id, custom_title, custom_body in zip(parsed_slides[1:5] + [parsed_slides[-1]], 
                                                                [x[0] for x in slides_content], 
                                                                [x[1] for x in slides_content], 
                                                                [x[2] for x in slides_content]):
        try:
            t_id = slide_data['pageElements'][0]['objectId']
            b_id = slide_data['pageElements'][1]['objectId']
            
            text_styler_tasks.extend([
                {'insertText': {'objectId': t_id, 'text': custom_title}},
                {'insertText': {'objectId': b_id, 'text': custom_body}},
                add_text_style(t_id, colors['purple'], 36, True),
                add_text_style(b_id, colors['black'], 18),
                {'updateParagraphStyle': {
                    'objectId': b_id,
                    'style': {'lineSpacing': 140},
                    'textRange': {'type': 'ALL'},
                    'fields': 'lineSpacing'
                }}
            ])
        except Exception as e:
            print(e)
            
    # Inject Graph image into Graph Slide
    graph_slide_data = parsed_slides[5]
    try:
        t_id = graph_slide_data['pageElements'][0]['objectId']
        text_styler_tasks.extend([
            {'insertText': {'objectId': t_id, 'text': "Top Views Graph"}},
            add_text_style(t_id, colors['purple'], 36, True),
            {'createImage': {
                'url': chart_url,
                'elementProperties': {
                    'pageObjectId': graph_slide_data['objectId'],
                    'size': {'height': {'magnitude': 300, 'unit': 'PT'}, 'width': {'magnitude': 500, 'unit': 'PT'}},
                    'transform': {'scaleX': 1, 'scaleY': 1, 'translateX': 100, 'translateY': 100, 'unit': 'PT'}
                }
            }}
        ])
    except Exception as e:
        print(e)
        
    # Inject 30 Content Slides
    # The 30 videos are at index 6 through 35
    for i, video in enumerate(top_30_videos):
        slide = parsed_slides[6 + i]
        try:
            title_id = slide['pageElements'][0]['objectId']
            body_id = slide['pageElements'][1]['objectId']
            
            v_title = video.get('title', 'Unknown Title')
            v_views = video.get('stats', {}).get('viewCount', '0')
            v_likes = video.get('stats', {}).get('likeCount', '0')
            channel_name = video.get('channel_title', 'Unknown Channel')
            v_link = f"https://www.youtube.com/watch?v={video.get('video_id', '')}"
            desc = video.get('description', '')[:100] + "..." if video.get('description') else "No description available."
            
            # Using \n for splitting and inserting links
            body_text = f"📺 Channel: {channel_name}\n📈 Views: {v_views:,}\n👍 Likes: {v_likes:,}\n🔗 Link: {v_link}\n\nDescription:\n{desc}"
            
            text_styler_tasks.extend([
                {'insertText': {'objectId': title_id, 'text': v_title}},
                {'insertText': {'objectId': body_id, 'text': body_text}},
                add_text_style(title_id, colors['purple'], 22, True),
                add_text_style(body_id, colors['black'], 14),
                {'updateTextStyle': {
                    'objectId': body_id,
                    'style': {
                        'link': {'url': v_link},
                        'foregroundColor': {'opaqueColor': {'rgbColor': {'red': 0, 'green': 0, 'blue': 1.0}}}, # Blue link
                        'underline': True
                    },
                    # Match the link part exactly dynamically.
                    'textRange': {
                        'type': 'FIXED_RANGE',
                        'startIndex': len(f"📺 Channel: {channel_name}\n📈 Views: {v_views:,}\n👍 Likes: {v_likes:,}\n🔗 Link: "),
                        'endIndex': len(f"📺 Channel: {channel_name}\n📈 Views: {v_views:,}\n👍 Likes: {v_likes:,}\n🔗 Link: {v_link}")
                    },
                    'fields': 'link,foregroundColor,underline'
                }},
                {'updateParagraphStyle': {
                    'objectId': body_id,
                    'style': {'lineSpacing': 140},
                    'textRange': {'type': 'ALL'},
                    'fields': 'lineSpacing'
                }}
            ])
        except Exception as e:
            print(f"Warning: Could not format slide for video {i}: {e}")

    if text_styler_tasks:
        slides_service.presentations().batchUpdate(presentationId=presentation_id, body={'requests': text_styler_tasks}).execute()
            
    print("Populated presentation with slide data and themes.")

def main():
    parser = argparse.ArgumentParser(description="Create a Slide Deck based on YouTube scrape data.")
    parser.add_argument("--output_name", type=str, default="AI YouTube Stats Report", help="New presentation name")
    parser.add_argument("--input", type=str, default=".tmp/youtube_data.json", help="Path to youtube data json")
    args = parser.parse_args()

    drive_service, slides_service = get_google_services()
    if not drive_service:
        return
        
    if not os.path.exists(args.input):
        print(f"Error: Could not find {args.input}. Run the scraper first.")
        return

    with open(args.input, 'r', encoding='utf-8') as f:
        youtube_data = json.load(f)

    print("Creating new empty presentation...")
    new_presentation_id = create_presentation(slides_service, args.output_name)
    url = f"https://docs.google.com/presentation/d/{new_presentation_id}/edit"
    print(f"Created new presentation: {url}")

    print("Building slides formatting...")
    build_slides_from_scratch(drive_service, slides_service, new_presentation_id, youtube_data)
    
    with open(".tmp/deck_url.txt", "w") as f:
        f.write(url)
        
    print("✅ Slide deck generation complete.")

if __name__ == "__main__":
    main()
