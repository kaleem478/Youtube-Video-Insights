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
            if not os.path.exists(credential_path) or os.path.getsize(credential_path) == 0:
                print(f"⚠️ Error: {credential_path} is empty or missing. Please set up a Google Cloud project, generate an OAuth credential, and save it to {credential_path}")
                return None
            flow = InstalledAppFlow.from_client_secrets_file(credential_path, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, 'w') as token:
            token.write(creds.to_json())

    return build('gmail', 'v1', credentials=creds)

def send_email(to_email: str, subject: str, body: str):
    service = get_gmail_service()
    if not service:
        return

    message = EmailMessage()
    message.set_content(body)
    message['To'] = to_email
    message['Subject'] = subject

    encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    create_message = {'raw': encoded_message}

    print(f"Sending email to {to_email} via Gmail API...")
    try:
        service.users().messages().send(userId="me", body=create_message).execute()
        print("✅ Email sent successfully.")
    except Exception as e:
        print(f"⚠️ Failed to send email: {e}")

def main():
    parser = argparse.ArgumentParser(description="Send an email with the insights.")
    parser.add_argument("--to", type=str, required=True, help="Recipient email address")
    parser.add_argument("--url_file", type=str, default=".tmp/deck_url.txt", help="Path to text file with deck URL")
    args = parser.parse_args()
    
    deck_url = "No URL available."
    if os.path.exists(args.url_file):
        with open(args.url_file, 'r') as f:
            deck_url = f.read().strip()
            
    subject = "Your Automated AI YouTube Insights Report is Ready!"
    body = f"""
Hello,

Your latest YouTube AI Insights automated report has been generated.

You can view the presentation here:
{deck_url}

Best regards,
Your Output Automation Bot
"""
    
    send_email(args.to, subject, body)

if __name__ == "__main__":
    main()
