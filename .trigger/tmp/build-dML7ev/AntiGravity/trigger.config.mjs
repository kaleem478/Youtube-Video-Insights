import {
  defineConfig
} from "../chunk-ZNLNCDEN.mjs";
import "../chunk-7ICTEJBC.mjs";
import "../chunk-XZJUTV6Z.mjs";
import {
  init_esm
} from "../chunk-GIHTFTQG.mjs";

// trigger.config.ts
init_esm();
var trigger_config_default = defineConfig({
  project: "proj_pyroxraxhbclnvofymfa",
  runtime: "node",
  maxDuration: 3600,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 1e4,
      factor: 2,
      randomize: true
    }
  },
  dirs: ["./src/trigger"],
  build: {}
});
var resolveEnvVars = void 0;
export {
  trigger_config_default as default,
  resolveEnvVars
};
//# sourceMappingURL=trigger.config.mjs.map
