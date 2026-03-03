---
description: How to run the automated YouTube insights gathering and presentation generation
---

# Generate YouTube Insights Deck Workflow

**Objective**: Automatically perform a niche analysis of AI YouTube channels by grabbing stats and transcripts, summarizing them with an LLM, generating charts, injecting the content into a Google Slides template, and emailing the deliverable to the user.

## Required Setup

1. `.env` file requires:
   - `YOUTUBE_API_KEY`
   - `GMAIL_CREDENTIAL_PATH`
   - `GMAIL_TOKEN_PATH`
2. Google Cloud OAuth Desktop Application secret for Drive, Slides, and Gmail API scopes. Store the path to this file in `GMAIL_CREDENTIAL_PATH` in `.env`.

## Step-by-Step Execution

// turbo-all

**1. Scrape YouTube Data**
Run the YouTube scraper for the desired channels (e.g., target AI niche channels)
```bash
python tools/scrape_youtube_data.py --channels UC2ojq-nuP8ceeHqiroeKhBA UCuU3oDzMkwAD8ggCLjgnF-Xw --limit 5
```
*Expected Output: Data is saved to `.tmp/youtube_data.json`.*

**2. Build Slide Deck**
Use the Google Slides and Drive APIs to create a new presentation from scratch featuring the top viewed videos.
```bash
python tools/build_slides.py --output_name "Weekly AI Pulse Report" --input .tmp/youtube_data.json
```
*Expected Output: A new generated Google Slides document, output URL saved to `.tmp/deck_url.txt`.*

**3. Deliver Presentation**
Send the final slide deck directly to the user's email.
```bash
python tools/send_email.py --to <YOUR_EMAIL>
```
*Expected Output: An email sent with the summary and deck URL.*

## Edge Case Handling
- **No Transcripts Available**: If a video lacks captions, the scraper will warn and continue.
- **Empty Credentials**: If the credentials file from `.env` is missing/empty, the Google OAuth flow will fail. Ensure the Desktop App OAuth ID is properly generated from the Google developer console and seeded.
- **Rate Limits**: If YouTube throws a 403 / Quota Exceeded error, halt the execution immediately. Note that standard Search API quota is heavy (100 units per search).
