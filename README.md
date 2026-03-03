# YouTube Video Insights (WAT Framework)

This project is an automated AI agent workflow adhering to the **WAT (Workflows, Agents, Tools)** architecture. It is designed to automatically scrape YouTube channels in the AI and AI automation niche, synthesize the data into a Google Slides presentation, and email the final intelligence deliverable.

## Architecture: WAT Framework

The project is structured according to the WAT principles:
- **Workflows (`workflows/`)**: Markdown-based SOPs that define objectives, requirements, tool sequences, and edge cases. (e.g., `generate_youtube_insights_deck.md`)
- **Agents**: The intelligent coordinator (LLM) that interprets workflows and executes determinisitic tools.
- **Tools (`tools/`)**: Deterministic Python execution scripts for specific operations.
  - `scrape_youtube_data.py`: Gathers transcripts and stats from YouTube APIs.
  - `build_slides.py`: Uses Google Drive and Slides APIs to generate a presentation deck.
  - `send_email.py`: Handles final email delivery of the slide deck URL.

## Directory Structure
```text
.
├── .tmp/             # Temporary processing files (e.g. scraped data, intermediate outputs)
├── tools/            # Python scripts for execution (deterministic steps)
├── workflows/        # Markdown instructions/SOPs for agent reasoning
├── .env              # Environment configurations and API keys (not in version control)
└── requirements.txt  # Python dependencies
```

## Setup & Installation

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory with the following keys:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key
   GMAIL_CREDENTIAL_PATH=credentials.json
   GMAIL_TOKEN_PATH=token.json
   ```

3. **Google Cloud OAuth:**
   - Create a Google Cloud Desktop Application OAuth credential.
   - Enable the Drive, Slides, and Gmail APIs.
   - Download the client secret JSON file and save it as `credentials.json` (or whatever your `GMAIL_CREDENTIAL_PATH` dictates) in the root directory.

## Usage

You can trigger the entire workflow by instructing the AI agent to run the `generate_youtube_insights_deck.md` workflow. Below are the underlying deterministic tool commands that the agent orchestrates:

1. **Scrape YouTube Data:**
   ```bash
   python tools/scrape_youtube_data.py --channels [CHANNEL_IDS] --limit 5
   ```
2. **Build Slide Deck:**
   ```bash
   python tools/build_slides.py --output_name "Weekly AI Pulse Report" --input .tmp/youtube_data.json
   ```
3. **Deliver Presentation:**
   ```bash
   python tools/send_email.py --to user@example.com
   ```

## Design Philosophy

- **Deterministic Execution**: Complex tasks are offloaded to Python scripts to guarantee accuracy and reduce the chance of LLM hallucination.
- **Self-Improvement**: When encountering API rate limits or unexpected behaviors, the agent patches the tools and documents the findings in the workflows. 
- **Cloud-First Deliverables**: Local files in `.tmp/` are considered disposable. Final deliverables live as Google Slides or email accessible straight from the cloud.
