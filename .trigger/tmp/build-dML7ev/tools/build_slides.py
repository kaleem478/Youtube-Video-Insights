import os
import json
import argparse
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
    import shutil
    credential_path = os.getenv("GMAIL_CREDENTIAL_PATH", "credentials.json")
    # Always operate on token.json in /tmp so we can write to it if it needs refreshing
    token_src_path = os.getenv("GMAIL_TOKEN_PATH", "token.json")
    token_path = ".tmp/token.json"

    # Copy token from project dir to /tmp if it exists in project but not in /tmp
    if os.path.exists(token_src_path) and not os.path.exists(token_path):
        import shutil
        shutil.copy2(token_src_path, token_path)

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
    
    print("Generating slides with premium design...")
    
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
        'bg_dark': {'red': 0.117, 'green': 0.117, 'blue': 0.180},       # #1E1E2E
        'accent': {'red': 0.796, 'green': 0.651, 'blue': 0.968},        # #CBA6F7 (Lavender)
        'accent2': {'red': 0.537, 'green': 0.902, 'blue': 0.741},       # #89DCEB (Sky/Teal)
        'text_light': {'red': 0.811, 'green': 0.823, 'blue': 0.878},    # #CDD6F4 (Text)
        'white': {'red': 1.0, 'green': 1.0, 'blue': 1.0}
    }
    
    def slide_bgcolor_request(slide_id):
        return {
            'updatePageProperties': {
                'objectId': slide_id,
                'pageProperties': {
                    'pageBackgroundFill': {
                        'solidFill': {'color': {'rgbColor': colors['bg_dark']}}
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
        add_text_style(title_shape_id, colors['accent'], 44, True),
        add_text_style(subtitle_shape_id, colors['text_light'], 22)
    ])
    
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
    ai_summary = ""
    if os.getenv("OPENAI_API_KEY"):
        try:
            import openai
            client = openai.OpenAI()
            prompt = f"Write an insightful, enthusiastic 2-sentence professional executive summary for a YouTube scraping report focused on AI and Automation. Data captured: {len(unique_channels)} channels tracked, {len(all_videos)} total videos processed, with {total_views:,} cumulative views."
            res = client.chat.completions.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}])
            ai_summary = "\n\n🤖 AI Exec Summary:\n" + res.choices[0].message.content
        except Exception as e:
            print("OpenAI parsing error:", e)

    exec_summary = f"Total Channels Appraised: {len(unique_channels)}\n"
    exec_summary += f"Total Videos Processed: {len(all_videos)}\n"
    exec_summary += f"Total Cumulative Views: {total_views:,}\n"
    exec_summary += f"Total Cumulative Likes: {total_likes:,}"
    exec_summary += ai_summary

    slides_content.append(insert_list_slide("Executive Summary (KPIs)", exec_summary))
    
    def insert_video_list_slide(title_text, items, stat_type):
        nonlocal insertion_index
        slide_id = f"custom_slide_{insertion_index}"
        
        requests.append({
            'createSlide': {
                'objectId': slide_id,
                'insertionIndex': insertion_index,
                'slideLayoutReference': {'predefinedLayout': 'BLANK'}
            }
        })
        requests.append(slide_bgcolor_request(slide_id))
        
        title_id = f"{slide_id}_title"
        requests.append({
            'createShape': {
                'objectId': title_id,
                'shapeType': 'TEXT_BOX',
                'elementProperties': {
                    'pageObjectId': slide_id,
                    'size': {'height': {'magnitude': 60, 'unit': 'PT'}, 'width': {'magnitude': 650, 'unit': 'PT'}},
                    'transform': {'scaleX': 1, 'scaleY': 1, 'translateX': 40, 'translateY': 20, 'unit': 'PT'}
                }
            }
        })
        
        text_styler_tasks.extend([
            {'insertText': {'objectId': title_id, 'text': title_text}},
            add_text_style(title_id, colors['accent'], 36, True),
        ])
        
        y_offset = 90
        for i, item in enumerate(items):
            if i >= 5 and stat_type != 'subs':
                break
            if i >= 6 and stat_type == 'subs': # limit to 6 so they fit
                break
                
            img_id = f"{slide_id}_img_{i}"
            text_id = f"{slide_id}_text_{i}"
            
            thumbnail = None
            if stat_type == 'subs':
                # find any video of this channel to get a thumbnail
                cid = item['id']
                if cid in youtube_data and youtube_data[cid]:
                    thumbnail = youtube_data[cid][0].get('thumbnail_url')
            else:
                thumbnail = item.get('thumbnail_url')
                
            if thumbnail:
                requests.append({
                    'createImage': {
                        'objectId': img_id,
                        'url': thumbnail,
                        'elementProperties': {
                            'pageObjectId': slide_id,
                            'size': {'height': {'magnitude': 63, 'unit': 'PT'}, 'width': {'magnitude': 112, 'unit': 'PT'}},
                            'transform': {'scaleX': 1, 'scaleY': 1, 'translateX': 40, 'translateY': y_offset, 'unit': 'PT'}
                        }
                    }
                })
                
            requests.append({
                'createShape': {
                    'objectId': text_id,
                    'shapeType': 'TEXT_BOX',
                    'elementProperties': {
                        'pageObjectId': slide_id,
                        'size': {'height': {'magnitude': 45, 'unit': 'PT'}, 'width': {'magnitude': 500, 'unit': 'PT'}},
                        'transform': {'scaleX': 1, 'scaleY': 1, 'translateX': 160, 'translateY': y_offset + 5, 'unit': 'PT'}
                    }
                }
            })
            
            if stat_type == 'views':
                row_text = f"{i+1}. {item.get('title')} ({item.get('stats',{}).get('viewCount',0):,} views)"
            elif stat_type == 'likes':
                row_text = f"{i+1}. {item.get('title')} ({item.get('stats',{}).get('likeCount',0):,} likes)"
            else:
                row_text = f"{i+1}. {item['name']} ({item.get('subs',0):,} subscribers)"
            
            text_styler_tasks.extend([
                {'insertText': {'objectId': text_id, 'text': row_text}},
                add_text_style(text_id, colors['text_light'], 14)
            ])
            
            y_offset += 68
            
        insertion_index += 1

    # For subs we need to pass the real dict item with an id, so let's modify unique_channels builder earlier:
    # Actually wait, I need to pass the dict with ID. I will just reconstruct channels_by_subs...
    subs_items = []
    for cid, c_data in unique_channels.items():
        c_data['id'] = cid
        subs_items.append(c_data)
    channels_by_subs = sorted(subs_items, key=lambda c: c.get('subs', 0), reverse=True)

    # 3. Top Views Videos
    insert_video_list_slide("Top Viewed Videos", videos_by_views, 'views')
    
    # 4. Top Liked Videos
    insert_video_list_slide("Top Liked Videos", videos_by_likes, 'likes')
    
    # 5. Top Subscribed YouTube Channels
    insert_video_list_slide("Top Subscribed YouTube Channels", channels_by_subs, 'subs')
    
    # 7. Videos (30 videos)
    video_shapes = []
    for i, video in enumerate(top_30_videos):
        slide_id = f"video_slide_{insertion_index}"
        title_id = f"video_title_{insertion_index}"
        body_id = f"video_body_{insertion_index}"
        img_id = f"video_img_{insertion_index}"
        
        video_shapes.append((title_id, body_id))
        
        requests.append({
            'createSlide': {
                'objectId': slide_id,
                'insertionIndex': insertion_index,
                'slideLayoutReference': {'predefinedLayout': 'BLANK'}
            }
        })
        requests.append(slide_bgcolor_request(slide_id))
        
        # Create Title Shape
        requests.append({
            'createShape': {
                'objectId': title_id,
                'shapeType': 'TEXT_BOX',
                'elementProperties': {
                    'pageObjectId': slide_id,
                    'size': {'height': {'magnitude': 80, 'unit': 'PT'}, 'width': {'magnitude': 650, 'unit': 'PT'}},
                    'transform': {'scaleX': 1, 'scaleY': 1, 'translateX': 40, 'translateY': 20, 'unit': 'PT'}
                }
            }
        })
        
        # Create Body Shape
        requests.append({
            'createShape': {
                'objectId': body_id,
                'shapeType': 'TEXT_BOX',
                'elementProperties': {
                    'pageObjectId': slide_id,
                    'size': {'height': {'magnitude': 260, 'unit': 'PT'}, 'width': {'magnitude': 250, 'unit': 'PT'}},
                    'transform': {'scaleX': 1, 'scaleY': 1, 'translateX': 440, 'translateY': 110, 'unit': 'PT'}
                }
            }
        })
        
        thumbnail = video.get('thumbnail_url')
        if thumbnail:
            requests.append({
                'createImage': {
                    'objectId': img_id,
                    'url': thumbnail,
                    'elementProperties': {
                        'pageObjectId': slide_id,
                        'size': {'height': {'magnitude': 216, 'unit': 'PT'}, 'width': {'magnitude': 384, 'unit': 'PT'}},
                        'transform': {'scaleX': 1, 'scaleY': 1, 'translateX': 40, 'translateY': 110, 'unit': 'PT'}
                    }
                }
            })
            
        insertion_index += 1
        
    # 8. Outro / Goodbye slide
    outro_slide_id, outro_title, outro_body = insert_list_slide("Thank You!", "We hope these AI Insights were valuable.\n\nKeep building the future!")
    slides_content.append((outro_slide_id, outro_title, outro_body))
    
    # ---- Execution of base requests ----
    if requests:
        slides_service.presentations().batchUpdate(presentationId=presentation_id, body={'requests': requests}).execute()
        
    # Now we fetch IDs and inject text for List slides
    presentation = slides_service.presentations().get(presentationId=presentation_id).execute()
    parsed_slides = presentation.get('slides')
    
    # Injecting texts into Executive Summary and Outro
    target_slides = [parsed_slides[1], parsed_slides[-1]]
    
    for slide_data, custom_id, custom_title, custom_body in zip(target_slides, 
                                                                [x[0] for x in slides_content], 
                                                                [x[1] for x in slides_content], 
                                                                [x[2] for x in slides_content]):
        try:
            # We assume these slides are TITLE_AND_BODY
            t_id = slide_data['pageElements'][0]['objectId']
            b_id = slide_data['pageElements'][1]['objectId']
            
            text_styler_tasks.extend([
                {'insertText': {'objectId': t_id, 'text': custom_title}},
                {'insertText': {'objectId': b_id, 'text': custom_body}},
                add_text_style(t_id, colors['accent'], 36, True),
                add_text_style(b_id, colors['text_light'], 18),
                {'updateParagraphStyle': {
                    'objectId': b_id,
                    'style': {'lineSpacing': 140},
                    'textRange': {'type': 'ALL'},
                    'fields': 'lineSpacing'
                }}
            ])
        except Exception as e:
            print(f"Failed to style summary/outro slide: {e}")
            
    # Inject 30 Content Slides Custom Text
    for i, video in enumerate(top_30_videos):
        try:
            title_id, body_id = video_shapes[i]
            
            v_title = video.get('title', 'Unknown Title')
            v_views = video.get('stats', {}).get('viewCount', '0')
            v_likes = video.get('stats', {}).get('likeCount', '0')
            channel_name = video.get('channel_title', 'Unknown Channel')
            v_link = f"https://www.youtube.com/watch?v={video.get('video_id', '')}"
            desc = video.get('description', '')[:120] + "..." if video.get('description') else "No description available."
            
            body_text = f"👑 Channel: {channel_name}\n👁️ Views: {v_views:,}\n👍 Likes: {v_likes:,}\n🔗 Link: {v_link}\n\nDescription:\n{desc}"
            
            text_styler_tasks.extend([
                {'insertText': {'objectId': title_id, 'text': v_title}},
                {'insertText': {'objectId': body_id, 'text': body_text}},
                add_text_style(title_id, colors['accent'], 24, True),
                add_text_style(body_id, colors['text_light'], 16),
                {'updateTextStyle': {
                    'objectId': body_id,
                    'style': {
                        'link': {'url': v_link},
                        'foregroundColor': {'opaqueColor': {'rgbColor': colors['accent2']}}, # Teal link
                        'underline': True
                    },
                    'textRange': {
                        'type': 'FIXED_RANGE',
                        'startIndex': len(f"👑 Channel: {channel_name}\n👁️ Views: {v_views:,}\n👍 Likes: {v_likes:,}\n🔗 Link: "),
                        'endIndex': len(f"👑 Channel: {channel_name}\n👁️ Views: {v_views:,}\n👍 Likes: {v_likes:,}\n🔗 Link: {v_link}")
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
    
    os.makedirs(".tmp", exist_ok=True)
    with open(".tmp/deck_url.txt", "w") as f:
        f.write(url)
        
    print("Slide deck generation complete.")

if __name__ == "__main__":
    main()
