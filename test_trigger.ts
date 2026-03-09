import { tasks } from "@trigger.dev/sdk/v3";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
      try {
            console.log("Triggering task...");
            const run = await tasks.trigger("generate-youtube-insights-deck", {
                  channels: ["UC2ojq-nuP8ceeHqiroeKhBA"],
                  limit: 1,
                  toEmail: "kaleem478@gmail.com"
            });
            console.log("Run triggered successfully:", run.id);
      } catch (error) {
            console.error("Error triggering task:", error);
      }
}

main();
