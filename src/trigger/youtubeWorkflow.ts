import { task, logger } from "@trigger.dev/sdk/v3";
import { python } from "@trigger.dev/python";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";

export const generateYoutubeInsightsDeck = task({
      id: "generate-youtube-insights-deck",
      run: async (payload: { channels?: string[]; limit?: number; toEmail: string }) => {
            logger.info("Starting YouTube Insights Generation Workflow...");

            // We pass any necessary environment variables explicitly mapping them to the expected format
            const env = {
                  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
                  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
                  GMAIL_CREDENTIAL_PATH: process.env.GMAIL_CREDENTIAL_PATH || "./credentials.json",
                  GMAIL_TOKEN_PATH: process.env.GMAIL_TOKEN_PATH || "./token.json",
            };

            // Make sure we have credentials
            if (!env.YOUTUBE_API_KEY) {
                  throw new Error("YOUTUBE_API_KEY is missing from environment variables.");
            }

            // Step 1. Scrape YouTube Data
            logger.info("Phase 1: Scraping YouTube Data...");
            const channelsArg = payload.channels && payload.channels.length > 0
                  ? ["--channels", ...payload.channels]
                  : ["--find_top_channels", "30"]; // fallback
            const limitArg = payload.limit
                  ? ["--limit", payload.limit.toString()]
                  : ["--limit", "5"];

            const scrapeResult = await python.runScript(
                  "./tools/scrape_youtube_data.py",
                  [...channelsArg, ...limitArg, "--output", ".tmp/youtube_data.json"],
                  { env }
            );

            if (scrapeResult.exitCode !== 0) {
                  logger.error(`Scraping Failed: ${scrapeResult.stderr}`);
                  throw new Error("Failed to scrape YouTube data.");
            }
            logger.info("✅ Scrape Complete!");

            // Step 2. Build Slide Deck
            logger.info("Phase 2: Building Slide Deck...");
            const deckResult = await python.runScript(
                  "./tools/build_slides.py",
                  ["--output_name", "Weekly AI Pulse Report", "--input", ".tmp/youtube_data.json"],
                  { env }
            );

            if (deckResult.exitCode !== 0) {
                  logger.error(`Slide building failed: ${deckResult.stderr}`);
                  throw new Error("Failed to build slides.");
            }
            logger.info("✅ Slide Deck Generated!");

            // Step 3. Send Email
            logger.info(`Phase 3: Sending Email to ${payload.toEmail}...`);
            const emailResult = await python.runScript(
                  "./tools/send_email.py",
                  ["--to", payload.toEmail, "--url_file", ".tmp/deck_url.txt", "--json_data", ".tmp/youtube_data.json"],
                  { env }
            );

            if (emailResult.exitCode !== 0) {
                  logger.error(`Email sending failed: ${emailResult.stderr}`);
                  throw new Error("Failed to send email.");
            }
            logger.info("✅ Email Delivered Successfully!");

            return {
                  success: true,
                  message: "Insights workflow completed successfully.",
            };
      },
});
