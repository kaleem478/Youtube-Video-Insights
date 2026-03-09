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
                    <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px 20px; text-align: center;">
                            <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">🔥 Top 30 Viral AI Videos</h1>
                            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 15px;">The most hyped AI & Automation content from the last 7 days</p>
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
                            <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 10px; margin-bottom: 25px; overflow: hidden;">
                                <a href="{url}" style="display: block; background-color: #000; text-align: center;">
                                    <img src="{thumb}" alt="Thumbnail" style="width: 100%; max-width: 100%; height: auto; display: block; object-fit: cover;">
                                </a>
                                <div style="padding: 20px;">
                                    <div style="display: inline-block; background-color: rgba(59, 130, 246, 0.2); color: #60a5fa; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Rank #{i + 1}</div>
                                    <h3 style="margin: 0 0 8px 0; font-size: 18px; line-height: 1.4; font-weight: 700;">
                                        <a href="{url}" style="color: #f8fafc; text-decoration: none;">{title}</a>
                                    </h3>
                                    <p style="margin: 0 0 12px 0; color: #94a3b8; font-size: 14px; display: flex; align-items: center;">📺 {channel}</p>
                                    <p style="margin: 0 0 15px 0; color: #cbd5e1; font-size: 14px; line-height: 1.5;">{desc}</p>
                                    
                                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #334155; padding-top: 15px; margin-top: 15px;">
                                        <tr>
                                            <td style="color: #94a3b8; font-size: 13px; font-weight: 600; vertical-align: middle;">
                                                <span style="color: #60a5fa;">👁️ {views:,} Views</span> &nbsp;&nbsp; 
                                                <span style="color: #f87171;">👍 {likes:,} Likes</span>
                                            </td>
                                            <td align="right" style="vertical-align: middle;">
                                                <a href="{url}" style="display: inline-block; background-color: #3b82f6; color: white; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;">Watch Now</a>
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
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #020617; padding: 40px 10px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto 30px auto; background-color: #0f172a; padding: 25px; border-radius: 12px; text-align: center; border: 1px solid #334155;">
            <h2 style="color: #f8fafc; margin: 0 0 15px 0; font-size: 20px;">🤖 AI Insights Automated Report</h2>
            <div style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 15px; margin-bottom: 0;">
                <p style="margin: 0; color: #e2e8f0; font-size: 15px; font-weight: 500;">
                    📊 View Full Presentation Slides:<br>
                    <a href="{deck_url}" style="color: #60a5fa; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; margin-top: 5px;">{deck_url}</a>
                </p>
            </div>
        </div>
        
        {top_videos_html}
        
        <div style="max-width: 600px; margin: 30px auto 0 auto; text-align: center; color: #64748b; font-size: 13px;">
            <p>Generated automatically by your Output Automation Bot.</p>
        </div>
      </body>
    </html>
    """
    
    send_email(args.to, subject, text_body, html_body)

if __name__ == "__main__":
    main()
