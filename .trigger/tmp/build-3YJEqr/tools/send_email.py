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
                
                # Sort by views
                top_videos = sorted(all_videos, key=lambda x: x.get('stats', {}).get('viewCount', 0), reverse=True)[:10]
                
                if top_videos:
                    top_videos_html = "<h2>🔥 Top 10 Trending AI Videos</h2><table style='width:100%; max-width: 800px; border-collapse: collapse; font-family: sans-serif;'>"
                    for i, v in enumerate(top_videos):
                        title = v.get('title', 'Unknown')
                        views = v.get('stats', {}).get('viewCount', 0)
                        likes = v.get('stats', {}).get('likeCount', 0)
                        channel = v.get('channel_title', 'Unknown')
                        thumb = v.get('thumbnail_url', '')
                        vid_id = v.get('video_id', '')
                        url = f"https://www.youtube.com/watch?v={vid_id}"
                        
                        top_videos_html += f"<tr>"
                        top_videos_html += f"<td style='padding: 15px 0; width: 180px; border-bottom: 1px solid #eee;'>"
                        top_videos_html += f"<a href='{url}'><img src='{thumb}' alt='Thumbnail' width='160' style='border-radius: 8px;'></a>"
                        top_videos_html += f"</td>"
                        top_videos_html += f"<td style='padding: 15px 10px; vertical-align: top; border-bottom: 1px solid #eee;'>"
                        top_videos_html += f"<h3 style='margin: 0 0 5px 0; font-size: 16px;'><a href='{url}' style='color: #0056b3; text-decoration: none;'>{title}</a></h3>"
                        top_videos_html += f"<p style='margin: 0; color: #555; font-size: 14px;'><strong>{channel}</strong></p>"
                        top_videos_html += f"<p style='margin: 5px 0 0 0; color: #777; font-size: 13px;'>👁️ {views:,} views &nbsp;&nbsp; 👍 {likes:,} likes</p>"
                        top_videos_html += f"</td>"
                        top_videos_html += f"</tr>"
                        
                    top_videos_html += "</table><br>"
            except Exception as e:
                print(f"Error parsing json data for email HTML: {e}")
            
    subject = "Your Automated AI YouTube Insights Report is Ready!"
    
    text_body = f"""Hello,

Your latest YouTube AI Insights automated report has been generated.

You can view the full presentation here:
{deck_url}

Best regards,
Your Output Automation Bot
"""

    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h1 style="color: #4CAF50;">🤖 Your AI YouTube Insights are Ready!</h1>
        <p>Hello! Your latest YouTube AI Insights automated report has been successfully generated.</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px;"><strong>📊 View Full Presentation Slides:</strong> <br>
            <a href="{deck_url}" style="color: #0056b3; text-decoration: none; font-size: 18px;">{deck_url}</a></p>
        </div>
        
        {top_videos_html}
        
        <p>Best regards,<br><strong>Your Output Automation Bot</strong></p>
      </body>
    </html>
    """
    
    send_email(args.to, subject, text_body, html_body)

if __name__ == "__main__":
    main()
