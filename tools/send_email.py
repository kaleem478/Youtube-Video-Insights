import os
import argparse
import base64
from email.message import EmailMessage
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from dotenv import load_dotenv

load_dotenv()

# We include all scopes so token.json can be shared across tools
SCOPES = [
    'https://www.googleapis.com/auth/presentations',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/gmail.send'
]

def get_gmail_service():
    """Authenticate and build Gmail service."""
    import shutil
    credential_path = os.getenv("GMAIL_CREDENTIAL_PATH", "credentials.json")
    token_src_path = os.getenv("GMAIL_TOKEN_PATH", "token.json")
    token_path = ".tmp/token.json"

    if os.path.exists(token_src_path) and not os.path.exists(token_path):
        shutil.copy2(token_src_path, token_path)

    creds = None
    if os.path.exists(token_path):
        if os.path.getsize(token_path) > 0:
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(credential_path) or os.path.getsize(credential_path) == 0:
                print(f"⚠️ Error: {credential_path} is empty or missing. Please set up a Google Cloud project, generate an OAuth credential, and save it to {credential_path}")
                return None
            flow = InstalledAppFlow.from_client_secrets_file(credential_path, SCOPES)
            creds = flow.run_local_server(port=0)
        # We write back to /tmp/token.json since serverless functions can't write locally
        with open(token_path, 'w') as token:
            token.write(creds.to_json())

    return build('gmail', 'v1', credentials=creds)

def send_email(to_email: str, subject: str, text_body: str, html_body: str = None):
    service = get_gmail_service()
    if not service:
        return

    message = EmailMessage()
    message['To'] = to_email
    message['Subject'] = subject
    
    if html_body:
        message.add_alternative(text_body, subtype='plain')
        message.add_alternative(html_body, subtype='html')
    else:
        message.set_content(text_body)

    # Gmail automatically populates 'From' if omitted when using userId='me'.
    
    encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    create_message = {'raw': encoded_message}

    print(f"Sending email to {to_email} via Gmail API...")
    try:
        service.users().messages().send(userId="me", body=create_message).execute()
        print("Email sent successfully.")
    except Exception as e:
        print(f"⚠️ Failed to send email: {e}")

def main():
    parser = argparse.ArgumentParser(description="Send an email with the insights.")
    parser.add_argument("--to", type=str, required=True, help="Recipient email address")
    parser.add_argument("--url_file", type=str, default=".tmp/deck_url.txt", help="Path to text file with deck URL")
    parser.add_argument("--json_data", type=str, default=".tmp/youtube_data.json", help="Path to youtube data json")
    args = parser.parse_args()
    
    deck_url = "No URL available."
    if os.path.exists(args.url_file):
        with open(args.url_file, 'r') as f:
            deck_url = f.read().strip()
            
    top_videos_html = ""
    if os.path.exists(args.json_data):
        import json
        with open(args.json_data, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                all_videos = []
                for cid, videos in data.items():
                    all_videos.extend(videos)
                
                # Sort by views (primary) and likes (secondary)
                top_videos = sorted(all_videos, key=lambda x: (x.get('stats', {}).get('viewCount', 0), x.get('stats', {}).get('likeCount', 0)), reverse=True)[:30]
                
                if top_videos:
                    top_videos_html = """
                    <div style="max-width: 600px; margin: 0 auto; background-color: #09090b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; border: 1px solid #27272a;">
                        <div style="background: linear-gradient(135deg, #10b981, #06b6d4); padding: 40px 20px; text-align: center;">
                            <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">🔥 Top 30 Viral AI Videos</h1>
                            <p style="margin: 12px 0 0; color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 500;">The most hyped AI & Automation content from the last 7 days</p>
                        </div>
                        <div style="padding: 30px 20px;">
                    """
                    for i, v in enumerate(top_videos):
                        title = v.get('title', 'Unknown')
                        views = v.get('stats', {}).get('viewCount', 0)
                        likes = v.get('stats', {}).get('likeCount', 0)
                        channel = v.get('channel_title', 'Unknown')
                        thumb = v.get('thumbnail_url', '')
                        vid_id = v.get('video_id', '')
                        desc = v.get('description', '') or ''
                        
                        # Truncate description beautifully
                        if len(desc) > 140:
                            desc = desc[:137] + "..."
                            
                        url = f"https://www.youtube.com/watch?v={vid_id}"
                        
                        top_videos_html += f"""
                            <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; margin-bottom: 25px; overflow: hidden; transition: all 0.3s ease;">
                                <a href="{url}" style="display: block; background-color: #000; text-align: center; position: relative;">
                                    <img src="{thumb}" alt="Thumbnail" style="width: 100%; max-width: 100%; height: auto; display: block; object-fit: cover; opacity: 0.95;">
                                </a>
                                <div style="padding: 24px;">
                                    <div style="display: inline-block; background: linear-gradient(90deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15)); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; font-size: 12px; font-weight: 800; padding: 6px 12px; border-radius: 6px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">Rank #{i + 1}</div>
                                    <h3 style="margin: 0 0 10px 0; font-size: 19px; line-height: 1.4; font-weight: 700;">
                                        <a href="{url}" style="color: #f4f4f5; text-decoration: none;">{title}</a>
                                    </h3>
                                    <p style="margin: 0 0 14px 0; color: #a1a1aa; font-size: 14px; display: flex; align-items: center; font-weight: 500;">📺 {channel}</p>
                                    <p style="margin: 0 0 20px 0; color: #d4d4d8; font-size: 15px; line-height: 1.6;">{desc}</p>
                                    
                                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #27272a; padding-top: 20px; margin-top: 15px;">
                                        <tr>
                                            <td style="color: #a1a1aa; font-size: 13px; font-weight: 600; vertical-align: middle;">
                                                <span style="color: #2dd4bf; background-color: rgba(45, 212, 191, 0.1); padding: 4px 8px; border-radius: 4px;">👁️ {views:,} Views</span> &nbsp;&nbsp; 
                                                <span style="color: #fb7185; background-color: rgba(251, 113, 133, 0.1); padding: 4px 8px; border-radius: 4px;">👍 {likes:,} Likes</span>
                                            </td>
                                            <td align="right" style="vertical-align: middle;">
                                                <a href="{url}" style="display: inline-block; background: linear-gradient(135deg, #10b981, #0ea5e9); color: white; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; text-align: center;">Watch Now</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        """
                        
                    top_videos_html += """
                        </div>
                    </div>
                    """
            except Exception as e:
                print(f"Error parsing json data for email HTML: {e}")
            
    subject = "🔥 Your Top 30 AI YouTube Insights are Ready!"
    
    text_body = f"""Hello,

Your latest YouTube AI Insights automated report has been generated.

You can view the full presentation here:
{deck_url}

Best regards,
Your Output Automation Bot
"""

    html_body = f"""
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000000; padding: 40px 10px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto 30px auto; background-color: #09090b; padding: 30px; border-radius: 16px; text-align: center; border: 1px solid #27272a; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);">
            <h2 style="color: #f4f4f5; margin: 0 0 20px 0; font-size: 22px; font-weight: 800;">🤖 AI Insights Automated Report</h2>
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1)); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 0;">
                <p style="margin: 0; color: #e4e4e7; font-size: 16px; font-weight: 600;">
                    📊 View Full Presentation Slides:<br>
                    <a href="{deck_url}" style="color: #2dd4bf; text-decoration: none; font-weight: 700; font-size: 16px; display: inline-block; margin-top: 8px; padding-bottom: 2px; border-bottom: 2px solid rgba(45, 212, 191, 0.3);">{deck_url}</a>
                </p>
            </div>
        </div>
        
        {top_videos_html}
        
        <div style="max-width: 600px; margin: 40px auto 0 auto; text-align: center; color: #52525b; font-size: 13px; font-weight: 500;">
            <p>Generated automatically by your Output Automation Bot.</p>
        </div>
      </body>
    </html>
    """
    
    send_email(args.to, subject, text_body, html_body)

if __name__ == "__main__":
    main()
