import { defineConfig } from "@trigger.dev/sdk/v3";
import { pythonExtension } from "@trigger.dev/python/extension";
import { additionalFiles } from "@trigger.dev/build/extensions/core";

export default defineConfig({
      project: "proj_pyroxraxhbclnvofymfa",
      runtime: "node",
      maxDuration: 3600,
      retries: {
            enabledInDev: true,
            default: {
                  maxAttempts: 3,
                  minTimeoutInMs: 1000,
                  maxTimeoutInMs: 10000,
                  factor: 2,
                  randomize: true,
            },
      },
      dirs: ["./src/trigger"],
      build: {
            extensions: [
                  pythonExtension({
                        requirementsFile: "./requirements.txt",
                        scripts: ["./tools/**/*.py"],
                        // When deploying, Trigger.dev builds the python environment using these paths
                  }),
                  additionalFiles({
                        files: ["./credentials.json", "./token.json"],
                  }),
            ],
      },
});
