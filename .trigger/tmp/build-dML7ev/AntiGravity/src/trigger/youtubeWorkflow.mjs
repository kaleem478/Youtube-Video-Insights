import {
  SemanticInternalAttributes,
  carrierFromContext,
  createAsyncIterableStreamFromAsyncIterable,
  esm_exports as esm_exports2,
  generateFriendlyId,
  getEnvVar,
  init_esm as init_esm3,
  logger,
  require_src,
  task,
  taskContext
} from "../../../chunk-ZNLNCDEN.mjs";
import {
  esm_exports,
  init_esm as init_esm2
} from "../../../chunk-7ICTEJBC.mjs";
import "../../../chunk-XZJUTV6Z.mjs";
import {
  __commonJS,
  __name,
  __require,
  __toCommonJS,
  __toESM,
  init_esm
} from "../../../chunk-GIHTFTQG.mjs";

// node_modules/@opentelemetry/host-metrics/build/src/version.js
var require_version = __commonJS({
  "node_modules/@opentelemetry/host-metrics/build/src/version.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PACKAGE_NAME = exports.PACKAGE_VERSION = void 0;
    exports.PACKAGE_VERSION = "0.37.0";
    exports.PACKAGE_NAME = "@opentelemetry/host-metrics";
  }
});

// node_modules/@opentelemetry/host-metrics/build/src/BaseMetrics.js
var require_BaseMetrics = __commonJS({
  "node_modules/@opentelemetry/host-metrics/build/src/BaseMetrics.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseMetrics = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var version_1 = require_version();
    var DEFAULT_NAME = version_1.PACKAGE_NAME;
    var BaseMetrics = class {
      static {
        __name(this, "BaseMetrics");
      }
      _meter;
      _name;
      _metricGroups;
      constructor(config) {
        this._name = config?.name || DEFAULT_NAME;
        const meterProvider = config?.meterProvider ?? api_1.metrics.getMeterProvider();
        this._meter = meterProvider.getMeter(this._name, version_1.PACKAGE_VERSION);
        this._metricGroups = config?.metricGroups;
      }
    };
    exports.BaseMetrics = BaseMetrics;
  }
});

// node_modules/@opentelemetry/host-metrics/build/src/semconv.js
var require_semconv = __commonJS({
  "node_modules/@opentelemetry/host-metrics/build/src/semconv.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SYSTEM_MEMORY_STATE_VALUE_USED = exports.SYSTEM_MEMORY_STATE_VALUE_FREE = exports.SYSTEM_CPU_STATE_VALUE_USER = exports.SYSTEM_CPU_STATE_VALUE_SYSTEM = exports.SYSTEM_CPU_STATE_VALUE_NICE = exports.SYSTEM_CPU_STATE_VALUE_INTERRUPT = exports.SYSTEM_CPU_STATE_VALUE_IDLE = exports.PROCESS_CPU_STATE_VALUE_USER = exports.PROCESS_CPU_STATE_VALUE_SYSTEM = exports.NETWORK_IO_DIRECTION_VALUE_TRANSMIT = exports.NETWORK_IO_DIRECTION_VALUE_RECEIVE = exports.METRIC_SYSTEM_NETWORK_IO = exports.METRIC_SYSTEM_NETWORK_ERRORS = exports.METRIC_SYSTEM_MEMORY_UTILIZATION = exports.METRIC_SYSTEM_MEMORY_USAGE = exports.METRIC_SYSTEM_CPU_UTILIZATION = exports.METRIC_SYSTEM_CPU_TIME = exports.METRIC_PROCESS_MEMORY_USAGE = exports.METRIC_PROCESS_CPU_UTILIZATION = exports.METRIC_PROCESS_CPU_TIME = exports.ATTR_SYSTEM_MEMORY_STATE = exports.ATTR_SYSTEM_DEVICE = exports.ATTR_SYSTEM_CPU_STATE = exports.ATTR_SYSTEM_CPU_LOGICAL_NUMBER = exports.ATTR_PROCESS_CPU_STATE = exports.ATTR_NETWORK_IO_DIRECTION = void 0;
    exports.ATTR_NETWORK_IO_DIRECTION = "network.io.direction";
    exports.ATTR_PROCESS_CPU_STATE = "process.cpu.state";
    exports.ATTR_SYSTEM_CPU_LOGICAL_NUMBER = "system.cpu.logical_number";
    exports.ATTR_SYSTEM_CPU_STATE = "system.cpu.state";
    exports.ATTR_SYSTEM_DEVICE = "system.device";
    exports.ATTR_SYSTEM_MEMORY_STATE = "system.memory.state";
    exports.METRIC_PROCESS_CPU_TIME = "process.cpu.time";
    exports.METRIC_PROCESS_CPU_UTILIZATION = "process.cpu.utilization";
    exports.METRIC_PROCESS_MEMORY_USAGE = "process.memory.usage";
    exports.METRIC_SYSTEM_CPU_TIME = "system.cpu.time";
    exports.METRIC_SYSTEM_CPU_UTILIZATION = "system.cpu.utilization";
    exports.METRIC_SYSTEM_MEMORY_USAGE = "system.memory.usage";
    exports.METRIC_SYSTEM_MEMORY_UTILIZATION = "system.memory.utilization";
    exports.METRIC_SYSTEM_NETWORK_ERRORS = "system.network.errors";
    exports.METRIC_SYSTEM_NETWORK_IO = "system.network.io";
    exports.NETWORK_IO_DIRECTION_VALUE_RECEIVE = "receive";
    exports.NETWORK_IO_DIRECTION_VALUE_TRANSMIT = "transmit";
    exports.PROCESS_CPU_STATE_VALUE_SYSTEM = "system";
    exports.PROCESS_CPU_STATE_VALUE_USER = "user";
    exports.SYSTEM_CPU_STATE_VALUE_IDLE = "idle";
    exports.SYSTEM_CPU_STATE_VALUE_INTERRUPT = "interrupt";
    exports.SYSTEM_CPU_STATE_VALUE_NICE = "nice";
    exports.SYSTEM_CPU_STATE_VALUE_SYSTEM = "system";
    exports.SYSTEM_CPU_STATE_VALUE_USER = "user";
    exports.SYSTEM_MEMORY_STATE_VALUE_FREE = "free";
    exports.SYSTEM_MEMORY_STATE_VALUE_USED = "used";
  }
});

// node_modules/@opentelemetry/host-metrics/build/src/stats/common.js
var require_common = __commonJS({
  "node_modules/@opentelemetry/host-metrics/build/src/stats/common.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getProcessMemoryData = exports.getMemoryData = exports.getProcessCpuUsageData = exports.getCpuUsageData = void 0;
    var os_1 = __require("os");
    var MILLISECOND = 1 / 1e3;
    var MICROSECOND = 1 / 1e6;
    var prevOsData = {
      time: Date.now(),
      cpus: (0, os_1.cpus)()
    };
    function getCpuUsageData() {
      const currentTime = Date.now();
      const timeElapsed = currentTime - prevOsData.time;
      const currentOsData = { time: currentTime, cpus: (0, os_1.cpus)() };
      const usageData = currentOsData.cpus.map((cpu, cpuNumber) => {
        const prevTimes = prevOsData.cpus[cpuNumber].times;
        const currTimes = cpu.times;
        const idle = currTimes.idle * MILLISECOND;
        const user = currTimes.user * MILLISECOND;
        const system = currTimes.sys * MILLISECOND;
        const interrupt = currTimes.irq * MILLISECOND;
        const nice = currTimes.nice * MILLISECOND;
        const idleP = (currTimes.idle - prevTimes.idle) / timeElapsed;
        const userP = (currTimes.user - prevTimes.user) / timeElapsed;
        const systemP = (currTimes.sys - prevTimes.sys) / timeElapsed;
        const interruptP = (currTimes.irq - prevTimes.irq) / timeElapsed;
        const niceP = (currTimes.nice - prevTimes.nice) / timeElapsed;
        return {
          cpuNumber: String(cpuNumber),
          idle,
          user,
          system,
          interrupt,
          nice,
          userP,
          systemP,
          idleP,
          interruptP,
          niceP
        };
      });
      prevOsData = currentOsData;
      return usageData;
    }
    __name(getCpuUsageData, "getCpuUsageData");
    exports.getCpuUsageData = getCpuUsageData;
    var prevProcData = {
      time: Date.now(),
      usage: process.cpuUsage()
    };
    function getProcessCpuUsageData() {
      const currentTime = Date.now();
      const currentUsage = process.cpuUsage();
      const prevUsage = prevProcData.usage;
      const timeElapsed = (currentTime - prevProcData.time) * 1e3;
      const cpusTimeElapsed = timeElapsed * prevOsData.cpus.length;
      const user = currentUsage.user * MICROSECOND;
      const system = currentUsage.system * MICROSECOND;
      const userP = (currentUsage.user - prevUsage.user) / cpusTimeElapsed;
      const systemP = (currentUsage.system - prevUsage.system) / cpusTimeElapsed;
      prevProcData = { time: currentTime, usage: currentUsage };
      return {
        user,
        system,
        userP,
        systemP
      };
    }
    __name(getProcessCpuUsageData, "getProcessCpuUsageData");
    exports.getProcessCpuUsageData = getProcessCpuUsageData;
    function getMemoryData() {
      const total = (0, os_1.totalmem)();
      const free = (0, os_1.freemem)();
      const used = total - free;
      const freeP = free / total;
      const usedP = used / total;
      return {
        used,
        free,
        usedP,
        freeP
        // this is frac part (0-1)
      };
    }
    __name(getMemoryData, "getMemoryData");
    exports.getMemoryData = getMemoryData;
    function getProcessMemoryData() {
      if (process.memoryUsage.rss) {
        return process.memoryUsage.rss();
      }
      return process.memoryUsage().rss;
    }
    __name(getProcessMemoryData, "getProcessMemoryData");
    exports.getProcessMemoryData = getProcessMemoryData;
  }
});

// node_modules/systeminformation/lib/util.js
var require_util = __commonJS({
  "node_modules/systeminformation/lib/util.js"(exports) {
    "use strict";
    init_esm();
    var os = __require("os");
    var fs2 = __require("fs");
    var path = __require("path");
    var spawn = __require("child_process").spawn;
    var exec = __require("child_process").exec;
    var execSync = __require("child_process").execSync;
    var util = __require("util");
    var _platform = process.platform;
    var _linux = _platform === "linux" || _platform === "android";
    var _darwin = _platform === "darwin";
    var _windows = _platform === "win32";
    var _freebsd = _platform === "freebsd";
    var _openbsd = _platform === "openbsd";
    var _netbsd = _platform === "netbsd";
    var _cores = 0;
    var wmicPath = "";
    var codepage = "";
    var _smartMonToolsInstalled = null;
    var _rpi_cpuinfo = null;
    var WINDIR = process.env.WINDIR || "C:\\Windows";
    var _psChild;
    var _psResult = "";
    var _psCmds = [];
    var _psPersistent = false;
    var _psToUTF8 = "$OutputEncoding = [System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8 ; ";
    var _psCmdStart = "--###START###--";
    var _psError = "--ERROR--";
    var _psCmdSeperator = "--###ENDCMD###--";
    var _psIdSeperator = "--##ID##--";
    var execOptsWin = {
      windowsHide: true,
      maxBuffer: 1024 * 2e4,
      encoding: "UTF-8",
      env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
    };
    var execOptsLinux = {
      maxBuffer: 1024 * 2e4,
      encoding: "UTF-8",
      stdio: ["pipe", "pipe", "ignore"]
    };
    function toInt(value) {
      let result = parseInt(value, 10);
      if (isNaN(result)) {
        result = 0;
      }
      return result;
    }
    __name(toInt, "toInt");
    function splitByNumber(str) {
      let numberStarted = false;
      let num = "";
      let cpart = "";
      for (const c of str) {
        if (c >= "0" && c <= "9" || numberStarted) {
          numberStarted = true;
          num += c;
        } else {
          cpart += c;
        }
      }
      return [cpart, num];
    }
    __name(splitByNumber, "splitByNumber");
    var stringReplace = new String().replace;
    var stringToLower = new String().toLowerCase;
    var stringToString = new String().toString;
    var stringSubstr = new String().substr;
    var stringTrim = new String().trim;
    var stringStartWith = new String().startsWith;
    var mathMin = Math.min;
    function isFunction(functionToCheck) {
      let getType = {};
      return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
    }
    __name(isFunction, "isFunction");
    function unique(obj) {
      let uniques = [];
      let stringify = {};
      for (let i = 0; i < obj.length; i++) {
        let keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
          return a - b;
        });
        let str = "";
        for (let j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j]);
          str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!{}.hasOwnProperty.call(stringify, str)) {
          uniques.push(obj[i]);
          stringify[str] = true;
        }
      }
      return uniques;
    }
    __name(unique, "unique");
    function sortByKey(array, keys) {
      return array.sort(function(a, b) {
        let x2 = "";
        let y = "";
        keys.forEach(function(key) {
          x2 = x2 + a[key];
          y = y + b[key];
        });
        return x2 < y ? -1 : x2 > y ? 1 : 0;
      });
    }
    __name(sortByKey, "sortByKey");
    function cores() {
      if (_cores === 0) {
        _cores = os.cpus().length;
      }
      return _cores;
    }
    __name(cores, "cores");
    function getValue(lines, property, separator, trimmed, lineMatch) {
      separator = separator || ":";
      property = property.toLowerCase();
      trimmed = trimmed || false;
      lineMatch = lineMatch || false;
      let result = "";
      lines.some((line) => {
        let lineLower = line.toLowerCase().replace(/\t/g, "");
        if (trimmed) {
          lineLower = lineLower.trim();
        }
        if (lineLower.startsWith(property) && (lineMatch ? lineLower.match(property + separator) || lineLower.match(property + " " + separator) : true)) {
          const parts = trimmed ? line.trim().split(separator) : line.split(separator);
          if (parts.length >= 2) {
            parts.shift();
            result = parts.join(separator).trim();
            return true;
          }
        }
      });
      return result;
    }
    __name(getValue, "getValue");
    function decodeEscapeSequence(str, base) {
      base = base || 16;
      return str.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
        return String.fromCharCode(parseInt(arguments[1], base));
      });
    }
    __name(decodeEscapeSequence, "decodeEscapeSequence");
    function detectSplit(str) {
      let seperator = "";
      let part = 0;
      str.split("").forEach((element) => {
        if (element >= "0" && element <= "9") {
          if (part === 1) {
            part++;
          }
        } else {
          if (part === 0) {
            part++;
          }
          if (part === 1) {
            seperator += element;
          }
        }
      });
      return seperator;
    }
    __name(detectSplit, "detectSplit");
    function parseTime(t, pmDesignator) {
      pmDesignator = pmDesignator || "";
      t = t.toUpperCase();
      let hour = 0;
      let min = 0;
      let splitter = detectSplit(t);
      let parts = t.split(splitter);
      if (parts.length >= 2) {
        if (parts[2]) {
          parts[1] += parts[2];
        }
        let isPM = parts[1] && parts[1].toLowerCase().indexOf("pm") > -1 || parts[1].toLowerCase().indexOf("p.m.") > -1 || parts[1].toLowerCase().indexOf("p. m.") > -1 || parts[1].toLowerCase().indexOf("n") > -1 || parts[1].toLowerCase().indexOf("ch") > -1 || parts[1].toLowerCase().indexOf("ös") > -1 || pmDesignator && parts[1].toLowerCase().indexOf(pmDesignator) > -1;
        hour = parseInt(parts[0], 10);
        min = parseInt(parts[1], 10);
        hour = isPM && hour < 12 ? hour + 12 : hour;
        return ("0" + hour).substr(-2) + ":" + ("0" + min).substr(-2);
      }
    }
    __name(parseTime, "parseTime");
    function parseDateTime(dt2, culture) {
      const result = {
        date: "",
        time: ""
      };
      culture = culture || {};
      let dateFormat = (culture.dateFormat || "").toLowerCase();
      let pmDesignator = culture.pmDesignator || "";
      const parts = dt2.split(" ");
      if (parts[0]) {
        if (parts[0].indexOf("/") >= 0) {
          const dtparts = parts[0].split("/");
          if (dtparts.length === 3) {
            if (dtparts[0].length === 4) {
              result.date = dtparts[0] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[2]).substr(-2);
            } else if (dtparts[2].length === 2) {
              if (dateFormat.indexOf("/d/") > -1 || dateFormat.indexOf("/dd/") > -1) {
                result.date = "20" + dtparts[2] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[0]).substr(-2);
              } else {
                result.date = "20" + dtparts[2] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[0]).substr(-2);
              }
            } else {
              const isEN = dt2.toLowerCase().indexOf("pm") > -1 || dt2.toLowerCase().indexOf("p.m.") > -1 || dt2.toLowerCase().indexOf("p. m.") > -1 || dt2.toLowerCase().indexOf("am") > -1 || dt2.toLowerCase().indexOf("a.m.") > -1 || dt2.toLowerCase().indexOf("a. m.") > -1;
              if ((isEN || dateFormat.indexOf("/d/") > -1 || dateFormat.indexOf("/dd/") > -1) && dateFormat.indexOf("dd/") !== 0) {
                result.date = dtparts[2] + "-" + ("0" + dtparts[0]).substr(-2) + "-" + ("0" + dtparts[1]).substr(-2);
              } else {
                result.date = dtparts[2] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[0]).substr(-2);
              }
            }
          }
        }
        if (parts[0].indexOf(".") >= 0) {
          const dtparts = parts[0].split(".");
          if (dtparts.length === 3) {
            if (dateFormat.indexOf(".d.") > -1 || dateFormat.indexOf(".dd.") > -1) {
              result.date = dtparts[2] + "-" + ("0" + dtparts[0]).substr(-2) + "-" + ("0" + dtparts[1]).substr(-2);
            } else {
              result.date = dtparts[2] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[0]).substr(-2);
            }
          }
        }
        if (parts[0].indexOf("-") >= 0) {
          const dtparts = parts[0].split("-");
          if (dtparts.length === 3) {
            result.date = dtparts[0] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[2]).substr(-2);
          }
        }
      }
      if (parts[1]) {
        parts.shift();
        let time = parts.join(" ");
        result.time = parseTime(time, pmDesignator);
      }
      return result;
    }
    __name(parseDateTime, "parseDateTime");
    function parseHead(head, rights) {
      let space = rights > 0;
      let count = 1;
      let from = 0;
      let to = 0;
      let result = [];
      for (let i = 0; i < head.length; i++) {
        if (count <= rights) {
          if (/\s/.test(head[i]) && !space) {
            to = i - 1;
            result.push({
              from,
              to: to + 1,
              cap: head.substring(from, to + 1)
            });
            from = to + 2;
            count++;
          }
          space = head[i] === " ";
        } else {
          if (!/\s/.test(head[i]) && space) {
            to = i - 1;
            if (from < to) {
              result.push({
                from,
                to,
                cap: head.substring(from, to)
              });
            }
            from = to + 1;
            count++;
          }
          space = head[i] === " ";
        }
      }
      to = 5e3;
      result.push({
        from,
        to,
        cap: head.substring(from, to)
      });
      let len = result.length;
      for (let i = 0; i < len; i++) {
        if (result[i].cap.replace(/\s/g, "").length === 0) {
          if (i + 1 < len) {
            result[i].to = result[i + 1].to;
            result[i].cap = result[i].cap + result[i + 1].cap;
            result.splice(i + 1, 1);
            len = len - 1;
          }
        }
      }
      return result;
    }
    __name(parseHead, "parseHead");
    function findObjectByKey(array, key, value) {
      for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
          return i;
        }
      }
      return -1;
    }
    __name(findObjectByKey, "findObjectByKey");
    function getWmic() {
      if (os.type() === "Windows_NT" && !wmicPath) {
        wmicPath = WINDIR + "\\system32\\wbem\\wmic.exe";
        if (!fs2.existsSync(wmicPath)) {
          try {
            const wmicPathArray = execSync("WHERE WMIC", execOptsWin).toString().split("\r\n");
            if (wmicPathArray && wmicPathArray.length) {
              wmicPath = wmicPathArray[0];
            } else {
              wmicPath = "wmic";
            }
          } catch (e) {
            wmicPath = "wmic";
          }
        }
      }
      return wmicPath;
    }
    __name(getWmic, "getWmic");
    function wmic(command) {
      return new Promise((resolve) => {
        process.nextTick(() => {
          try {
            powerShell(getWmic() + " " + command).then((stdout) => {
              resolve(stdout, "");
            });
          } catch (e) {
            resolve("", e);
          }
        });
      });
    }
    __name(wmic, "wmic");
    function getVboxmanage() {
      return _windows ? `"${process.env.VBOX_INSTALL_PATH || process.env.VBOX_MSI_INSTALL_PATH}\\VBoxManage.exe"` : "vboxmanage";
    }
    __name(getVboxmanage, "getVboxmanage");
    function powerShellProceedResults(data) {
      let id = "";
      let parts;
      let res = "";
      if (data.indexOf(_psCmdStart) >= 0) {
        parts = data.split(_psCmdStart);
        const parts2 = parts[1].split(_psIdSeperator);
        id = parts2[0];
        if (parts2.length > 1) {
          data = parts2.slice(1).join(_psIdSeperator);
        }
      }
      if (data.indexOf(_psCmdSeperator) >= 0) {
        parts = data.split(_psCmdSeperator);
        res = parts[0];
      }
      let remove = -1;
      for (let i = 0; i < _psCmds.length; i++) {
        if (_psCmds[i].id === id) {
          remove = i;
          _psCmds[i].callback(res);
        }
      }
      if (remove >= 0) {
        _psCmds.splice(remove, 1);
      }
    }
    __name(powerShellProceedResults, "powerShellProceedResults");
    function powerShellStart() {
      if (!_psChild) {
        _psChild = spawn("powershell.exe", ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-NoExit", "-Command", "-"], {
          stdio: "pipe",
          windowsHide: true,
          maxBuffer: 1024 * 2e4,
          encoding: "UTF-8",
          env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
        });
        if (_psChild && _psChild.pid) {
          _psPersistent = true;
          _psChild.stdout.on("data", function(data) {
            _psResult = _psResult + data.toString("utf8");
            if (data.indexOf(_psCmdSeperator) >= 0) {
              powerShellProceedResults(_psResult);
              _psResult = "";
            }
          });
          _psChild.stderr.on("data", function() {
            powerShellProceedResults(_psResult + _psError);
          });
          _psChild.on("error", function() {
            powerShellProceedResults(_psResult + _psError);
          });
          _psChild.on("close", function() {
            if (_psChild) {
              _psChild.kill();
            }
          });
        }
      }
    }
    __name(powerShellStart, "powerShellStart");
    function powerShellRelease() {
      try {
        if (_psChild) {
          _psChild.stdin.write("exit" + os.EOL);
          _psChild.stdin.end();
          _psPersistent = false;
        }
      } catch (e) {
        if (_psChild) {
          _psChild.kill();
        }
      }
      _psChild = null;
    }
    __name(powerShellRelease, "powerShellRelease");
    function powerShell(cmd) {
      if (_psPersistent) {
        const id = Math.random().toString(36).substring(2, 12);
        return new Promise((resolve) => {
          process.nextTick(() => {
            function callback(data) {
              resolve(data);
            }
            __name(callback, "callback");
            _psCmds.push({
              id,
              cmd,
              callback,
              start: /* @__PURE__ */ new Date()
            });
            try {
              if (_psChild && _psChild.pid) {
                _psChild.stdin.write(_psToUTF8 + "echo " + _psCmdStart + id + _psIdSeperator + "; " + os.EOL + cmd + os.EOL + "echo " + _psCmdSeperator + os.EOL);
              }
            } catch (e) {
              resolve("");
            }
          });
        });
      } else {
        let result = "";
        return new Promise((resolve) => {
          process.nextTick(() => {
            try {
              const child = spawn("powershell.exe", ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-NoExit", "-ExecutionPolicy", "Unrestricted", "-Command", "-"], {
                stdio: "pipe",
                windowsHide: true,
                maxBuffer: 1024 * 2e4,
                encoding: "UTF-8",
                env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
              });
              if (child && !child.pid) {
                child.on("error", function() {
                  resolve(result);
                });
              }
              if (child && child.pid) {
                child.stdout.on("data", function(data) {
                  result = result + data.toString("utf8");
                });
                child.stderr.on("data", function() {
                  child.kill();
                  resolve(result);
                });
                child.on("close", function() {
                  child.kill();
                  resolve(result);
                });
                child.on("error", function() {
                  child.kill();
                  resolve(result);
                });
                try {
                  child.stdin.write(_psToUTF8 + cmd + os.EOL);
                  child.stdin.write("exit" + os.EOL);
                  child.stdin.end();
                } catch (e) {
                  child.kill();
                  resolve(result);
                }
              } else {
                resolve(result);
              }
            } catch (e) {
              resolve(result);
            }
          });
        });
      }
    }
    __name(powerShell, "powerShell");
    function execSafe(cmd, args, options) {
      let result = "";
      options = options || {};
      return new Promise((resolve) => {
        process.nextTick(() => {
          try {
            const child = spawn(cmd, args, options);
            if (child && !child.pid) {
              child.on("error", function() {
                resolve(result);
              });
            }
            if (child && child.pid) {
              child.stdout.on("data", function(data) {
                result += data.toString();
              });
              child.on("close", function() {
                child.kill();
                resolve(result);
              });
              child.on("error", function() {
                child.kill();
                resolve(result);
              });
            } else {
              resolve(result);
            }
          } catch (e) {
            resolve(result);
          }
        });
      });
    }
    __name(execSafe, "execSafe");
    function getCodepage() {
      if (_windows) {
        if (!codepage) {
          try {
            const stdout = execSync("chcp", execOptsWin);
            const lines = stdout.toString().split("\r\n");
            const parts = lines[0].split(":");
            codepage = parts.length > 1 ? parts[1].replace(".", "").trim() : "";
          } catch (err) {
            codepage = "437";
          }
        }
        return codepage;
      }
      if (_linux || _darwin || _freebsd || _openbsd || _netbsd) {
        if (!codepage) {
          try {
            const stdout = execSync("echo $LANG", util.execOptsLinux);
            const lines = stdout.toString().split("\r\n");
            const parts = lines[0].split(".");
            codepage = parts.length > 1 ? parts[1].trim() : "";
            if (!codepage) {
              codepage = "UTF-8";
            }
          } catch (err) {
            codepage = "UTF-8";
          }
        }
        return codepage;
      }
    }
    __name(getCodepage, "getCodepage");
    function smartMonToolsInstalled() {
      if (_smartMonToolsInstalled !== null) {
        return _smartMonToolsInstalled;
      }
      _smartMonToolsInstalled = false;
      if (_windows) {
        try {
          const pathArray = execSync("WHERE smartctl 2>nul", execOptsWin).toString().split("\r\n");
          if (pathArray && pathArray.length) {
            _smartMonToolsInstalled = pathArray[0].indexOf(":\\") >= 0;
          } else {
            _smartMonToolsInstalled = false;
          }
        } catch (e) {
          _smartMonToolsInstalled = false;
        }
      }
      if (_linux || _darwin || _freebsd || _openbsd || _netbsd) {
        try {
          const pathArray = execSync("which smartctl 2>/dev/null", execOptsLinux).toString().split("\r\n");
          _smartMonToolsInstalled = pathArray.length > 0;
        } catch (e) {
          util.noop();
        }
      }
      return _smartMonToolsInstalled;
    }
    __name(smartMonToolsInstalled, "smartMonToolsInstalled");
    function isRaspberry() {
      const PI_MODEL_NO = [
        "BCM2708",
        "BCM2709",
        "BCM2710",
        "BCM2711",
        "BCM2712",
        "BCM2835",
        "BCM2836",
        "BCM2837",
        "BCM2837B0"
      ];
      let cpuinfo = [];
      if (_rpi_cpuinfo !== null) {
        cpuinfo = _rpi_cpuinfo;
      } else {
        try {
          cpuinfo = fs2.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split("\n");
          _rpi_cpuinfo = cpuinfo;
        } catch (e) {
          return false;
        }
      }
      const hardware = getValue(cpuinfo, "hardware");
      return hardware && PI_MODEL_NO.indexOf(hardware) > -1;
    }
    __name(isRaspberry, "isRaspberry");
    function isRaspbian() {
      let osrelease = [];
      try {
        osrelease = fs2.readFileSync("/etc/os-release", { encoding: "utf8" }).toString().split("\n");
      } catch (e) {
        return false;
      }
      const id = getValue(osrelease, "id", "=");
      return id && id.indexOf("raspbian") > -1;
    }
    __name(isRaspbian, "isRaspbian");
    function execWin(cmd, opts, callback) {
      if (!callback) {
        callback = opts;
        opts = execOptsWin;
      }
      let newCmd = "chcp 65001 > nul && cmd /C " + cmd + " && chcp " + codepage + " > nul";
      exec(newCmd, opts, function(error, stdout) {
        callback(error, stdout);
      });
    }
    __name(execWin, "execWin");
    function darwinXcodeExists() {
      const cmdLineToolsExists = fs2.existsSync("/Library/Developer/CommandLineTools/usr/bin/");
      const xcodeAppExists = fs2.existsSync("/Applications/Xcode.app/Contents/Developer/Tools");
      const xcodeExists = fs2.existsSync("/Library/Developer/Xcode/");
      return cmdLineToolsExists || xcodeExists || xcodeAppExists;
    }
    __name(darwinXcodeExists, "darwinXcodeExists");
    function nanoSeconds() {
      const time = process.hrtime();
      if (!Array.isArray(time) || time.length !== 2) {
        return 0;
      }
      return +time[0] * 1e9 + +time[1];
    }
    __name(nanoSeconds, "nanoSeconds");
    function countUniqueLines(lines, startingWith) {
      startingWith = startingWith || "";
      const uniqueLines = [];
      lines.forEach((line) => {
        if (line.startsWith(startingWith)) {
          if (uniqueLines.indexOf(line) === -1) {
            uniqueLines.push(line);
          }
        }
      });
      return uniqueLines.length;
    }
    __name(countUniqueLines, "countUniqueLines");
    function countLines(lines, startingWith) {
      startingWith = startingWith || "";
      const uniqueLines = [];
      lines.forEach((line) => {
        if (line.startsWith(startingWith)) {
          uniqueLines.push(line);
        }
      });
      return uniqueLines.length;
    }
    __name(countLines, "countLines");
    function sanitizeShellString(str, strict) {
      if (typeof strict === "undefined") {
        strict = false;
      }
      const s = str || "";
      let result = "";
      const l2 = mathMin(s.length, 2e3);
      for (let i = 0; i <= l2; i++) {
        if (!(s[i] === void 0 || s[i] === ">" || s[i] === "<" || s[i] === "*" || s[i] === "?" || s[i] === "[" || s[i] === "]" || s[i] === "|" || s[i] === "˚" || s[i] === "$" || s[i] === ";" || s[i] === "&" || s[i] === "]" || s[i] === "#" || s[i] === "\\" || s[i] === "	" || s[i] === "\n" || s[i] === "\r" || s[i] === "'" || s[i] === "`" || s[i] === '"' || s[i].length > 1 || strict && s[i] === "(" || strict && s[i] === ")" || strict && s[i] === "@" || strict && s[i] === " " || strict && s[i] == "{" || strict && s[i] == ";" || strict && s[i] == "}")) {
          result = result + s[i];
        }
      }
      return result;
    }
    __name(sanitizeShellString, "sanitizeShellString");
    function isPrototypePolluted() {
      const s = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let notPolluted = true;
      let st = "";
      st.__proto__.replace = stringReplace;
      st.__proto__.toLowerCase = stringToLower;
      st.__proto__.toString = stringToString;
      st.__proto__.substr = stringSubstr;
      notPolluted = notPolluted || s.length !== 62;
      const ms = Date.now();
      if (typeof ms === "number" && ms > 16e11) {
        const l2 = ms % 100 + 15;
        for (let i = 0; i < l2; i++) {
          const r = Math.random() * 61.99999999 + 1;
          const rs = parseInt(Math.floor(r).toString(), 10);
          const rs2 = parseInt(r.toString().split(".")[0], 10);
          const q2 = Math.random() * 61.99999999 + 1;
          const qs = parseInt(Math.floor(q2).toString(), 10);
          const qs2 = parseInt(q2.toString().split(".")[0], 10);
          notPolluted = notPolluted && r !== q2;
          notPolluted = notPolluted && rs === rs2 && qs === qs2;
          st += s[rs - 1];
        }
        notPolluted = notPolluted && st.length === l2;
        let p = Math.random() * l2 * 0.9999999999;
        let stm = st.substr(0, p) + " " + st.substr(p, 2e3);
        stm.__proto__.replace = stringReplace;
        let sto = stm.replace(/ /g, "");
        notPolluted = notPolluted && st === sto;
        p = Math.random() * l2 * 0.9999999999;
        stm = st.substr(0, p) + "{" + st.substr(p, 2e3);
        sto = stm.replace(/{/g, "");
        notPolluted = notPolluted && st === sto;
        p = Math.random() * l2 * 0.9999999999;
        stm = st.substr(0, p) + "*" + st.substr(p, 2e3);
        sto = stm.replace(/\*/g, "");
        notPolluted = notPolluted && st === sto;
        p = Math.random() * l2 * 0.9999999999;
        stm = st.substr(0, p) + "$" + st.substr(p, 2e3);
        sto = stm.replace(/\$/g, "");
        notPolluted = notPolluted && st === sto;
        const stl = st.toLowerCase();
        notPolluted = notPolluted && stl.length === l2 && stl[l2 - 1] && !stl[l2];
        for (let i = 0; i < l2; i++) {
          const s1 = st[i];
          s1.__proto__.toLowerCase = stringToLower;
          const s2 = stl ? stl[i] : "";
          const s1l = s1.toLowerCase();
          notPolluted = notPolluted && s1l[0] === s2 && s1l[0] && !s1l[1];
        }
      }
      return !notPolluted;
    }
    __name(isPrototypePolluted, "isPrototypePolluted");
    function hex2bin(hex) {
      return ("00000000" + parseInt(hex, 16).toString(2)).substr(-8);
    }
    __name(hex2bin, "hex2bin");
    function getFilesInPath(source) {
      const lstatSync = fs2.lstatSync;
      const readdirSync = fs2.readdirSync;
      const join2 = path.join;
      function isDirectory(source2) {
        return lstatSync(source2).isDirectory();
      }
      __name(isDirectory, "isDirectory");
      function isFile(source2) {
        return lstatSync(source2).isFile();
      }
      __name(isFile, "isFile");
      function getDirectories(source2) {
        return readdirSync(source2).map(function(name) {
          return join2(source2, name);
        }).filter(isDirectory);
      }
      __name(getDirectories, "getDirectories");
      function getFiles(source2) {
        return readdirSync(source2).map(function(name) {
          return join2(source2, name);
        }).filter(isFile);
      }
      __name(getFiles, "getFiles");
      function getFilesRecursively(source2) {
        try {
          let dirs = getDirectories(source2);
          let files = dirs.map(function(dir) {
            return getFilesRecursively(dir);
          }).reduce(function(a, b) {
            return a.concat(b);
          }, []);
          return files.concat(getFiles(source2));
        } catch (e) {
          return [];
        }
      }
      __name(getFilesRecursively, "getFilesRecursively");
      if (fs2.existsSync(source)) {
        return getFilesRecursively(source);
      } else {
        return [];
      }
    }
    __name(getFilesInPath, "getFilesInPath");
    function decodePiCpuinfo(lines) {
      if (_rpi_cpuinfo === null) {
        _rpi_cpuinfo = lines;
      }
      const oldRevisionCodes = {
        "0002": {
          type: "B",
          revision: "1.0",
          memory: 256,
          manufacturer: "Egoman",
          processor: "BCM2835"
        },
        "0003": {
          type: "B",
          revision: "1.0",
          memory: 256,
          manufacturer: "Egoman",
          processor: "BCM2835"
        },
        "0004": {
          type: "B",
          revision: "2.0",
          memory: 256,
          manufacturer: "Sony UK",
          processor: "BCM2835"
        },
        "0005": {
          type: "B",
          revision: "2.0",
          memory: 256,
          manufacturer: "Qisda",
          processor: "BCM2835"
        },
        "0006": {
          type: "B",
          revision: "2.0",
          memory: 256,
          manufacturer: "Egoman",
          processor: "BCM2835"
        },
        "0007": {
          type: "A",
          revision: "2.0",
          memory: 256,
          manufacturer: "Egoman",
          processor: "BCM2835"
        },
        "0008": {
          type: "A",
          revision: "2.0",
          memory: 256,
          manufacturer: "Sony UK",
          processor: "BCM2835"
        },
        "0009": {
          type: "A",
          revision: "2.0",
          memory: 256,
          manufacturer: "Qisda",
          processor: "BCM2835"
        },
        "000d": {
          type: "B",
          revision: "2.0",
          memory: 512,
          manufacturer: "Egoman",
          processor: "BCM2835"
        },
        "000e": {
          type: "B",
          revision: "2.0",
          memory: 512,
          manufacturer: "Sony UK",
          processor: "BCM2835"
        },
        "000f": {
          type: "B",
          revision: "2.0",
          memory: 512,
          manufacturer: "Egoman",
          processor: "BCM2835"
        },
        "0010": {
          type: "B+",
          revision: "1.2",
          memory: 512,
          manufacturer: "Sony UK",
          processor: "BCM2835"
        },
        "0011": {
          type: "CM1",
          revision: "1.0",
          memory: 512,
          manufacturer: "Sony UK",
          processor: "BCM2835"
        },
        "0012": {
          type: "A+",
          revision: "1.1",
          memory: 256,
          manufacturer: "Sony UK",
          processor: "BCM2835"
        },
        "0013": {
          type: "B+",
          revision: "1.2",
          memory: 512,
          manufacturer: "Embest",
          processor: "BCM2835"
        },
        "0014": {
          type: "CM1",
          revision: "1.0",
          memory: 512,
          manufacturer: "Embest",
          processor: "BCM2835"
        },
        "0015": {
          type: "A+",
          revision: "1.1",
          memory: 256,
          manufacturer: "512MB	Embest",
          processor: "BCM2835"
        }
      };
      const processorList = [
        "BCM2835",
        "BCM2836",
        "BCM2837",
        "BCM2711",
        "BCM2712"
      ];
      const manufacturerList = [
        "Sony UK",
        "Egoman",
        "Embest",
        "Sony Japan",
        "Embest",
        "Stadium"
      ];
      const typeList = {
        "00": "A",
        "01": "B",
        "02": "A+",
        "03": "B+",
        "04": "2B",
        "05": "Alpha (early prototype)",
        "06": "CM1",
        "08": "3B",
        "09": "Zero",
        "0a": "CM3",
        "0c": "Zero W",
        "0d": "3B+",
        "0e": "3A+",
        "0f": "Internal use only",
        "10": "CM3+",
        "11": "4B",
        "12": "Zero 2 W",
        "13": "400",
        "14": "CM4",
        "15": "CM4S",
        "16": "Internal use only",
        "17": "5",
        "18": "CM5",
        "19": "500",
        "1a": "CM5 Lite"
      };
      const revisionCode = getValue(lines, "revision", ":", true);
      const model = getValue(lines, "model:", ":", true);
      const serial = getValue(lines, "serial", ":", true);
      let result = {};
      if ({}.hasOwnProperty.call(oldRevisionCodes, revisionCode)) {
        result = {
          model,
          serial,
          revisionCode,
          memory: oldRevisionCodes[revisionCode].memory,
          manufacturer: oldRevisionCodes[revisionCode].manufacturer,
          processor: oldRevisionCodes[revisionCode].processor,
          type: oldRevisionCodes[revisionCode].type,
          revision: oldRevisionCodes[revisionCode].revision
        };
      } else {
        const revision = ("00000000" + getValue(lines, "revision", ":", true).toLowerCase()).substr(-8);
        const memSizeCode = parseInt(hex2bin(revision.substr(2, 1)).substr(5, 3), 2) || 0;
        const manufacturer = manufacturerList[parseInt(revision.substr(3, 1), 10)];
        const processor = processorList[parseInt(revision.substr(4, 1), 10)];
        const typeCode = revision.substr(5, 2);
        result = {
          model,
          serial,
          revisionCode,
          memory: 256 * Math.pow(2, memSizeCode),
          manufacturer,
          processor,
          type: {}.hasOwnProperty.call(typeList, typeCode) ? typeList[typeCode] : "",
          revision: "1." + revision.substr(7, 1)
        };
      }
      return result;
    }
    __name(decodePiCpuinfo, "decodePiCpuinfo");
    function getRpiGpu() {
      let cpuinfo = null;
      if (_rpi_cpuinfo !== null) {
        cpuinfo = _rpi_cpuinfo;
      } else {
        try {
          cpuinfo = fs2.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split("\n");
          _rpi_cpuinfo = cpuinfo;
        } catch (e) {
          return false;
        }
      }
      const rpi = decodePiCpuinfo(cpuinfo);
      if (rpi.type === "4B" || rpi.type === "CM4" || rpi.type === "CM4S" || rpi.type === "400") {
        return "VideoCore VI";
      }
      if (rpi.type === "5") {
        return "VideoCore VII";
      }
      return "VideoCore IV";
    }
    __name(getRpiGpu, "getRpiGpu");
    function promiseAll(promises) {
      const resolvingPromises = promises.map(function(promise) {
        return new Promise(function(resolve) {
          let payload = new Array(2);
          promise.then(function(result) {
            payload[0] = result;
          }).catch(function(error) {
            payload[1] = error;
          }).then(function() {
            resolve(payload);
          });
        });
      });
      const errors = [];
      const results = [];
      return Promise.all(resolvingPromises).then(function(items) {
        items.forEach(function(payload) {
          if (payload[1]) {
            errors.push(payload[1]);
            results.push(null);
          } else {
            errors.push(null);
            results.push(payload[0]);
          }
        });
        return {
          errors,
          results
        };
      });
    }
    __name(promiseAll, "promiseAll");
    function promisify(nodeStyleFunction) {
      return function() {
        const args = Array.prototype.slice.call(arguments);
        return new Promise(function(resolve, reject) {
          args.push(function(err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
          nodeStyleFunction.apply(null, args);
        });
      };
    }
    __name(promisify, "promisify");
    function promisifySave(nodeStyleFunction) {
      return function() {
        const args = Array.prototype.slice.call(arguments);
        return new Promise(function(resolve) {
          args.push(function(err, data) {
            resolve(data);
          });
          nodeStyleFunction.apply(null, args);
        });
      };
    }
    __name(promisifySave, "promisifySave");
    function linuxVersion() {
      let result = "";
      if (_linux) {
        try {
          result = execSync("uname -v", util.execOptsLinux).toString();
        } catch (e) {
          result = "";
        }
      }
      return result;
    }
    __name(linuxVersion, "linuxVersion");
    function plistParser(xmlStr) {
      const tags = ["array", "dict", "key", "string", "integer", "date", "real", "data", "boolean", "arrayEmpty"];
      const startStr = "<plist version";
      let pos = xmlStr.indexOf(startStr);
      let len = xmlStr.length;
      while (xmlStr[pos] !== ">" && pos < len) {
        pos++;
      }
      let depth = 0;
      let inTagStart = false;
      let inTagContent = false;
      let inTagEnd = false;
      let metaData = [{ tagStart: "", tagEnd: "", tagContent: "", key: "", data: null }];
      let c = "";
      let cn = xmlStr[pos];
      while (pos < len) {
        c = cn;
        if (pos + 1 < len) {
          cn = xmlStr[pos + 1];
        }
        if (c === "<") {
          inTagContent = false;
          if (cn === "/") {
            inTagEnd = true;
          } else if (metaData[depth].tagStart) {
            metaData[depth].tagContent = "";
            if (!metaData[depth].data) {
              metaData[depth].data = metaData[depth].tagStart === "array" ? [] : {};
            }
            depth++;
            metaData.push({ tagStart: "", tagEnd: "", tagContent: "", key: null, data: null });
            inTagStart = true;
            inTagContent = false;
          } else if (!inTagStart) {
            inTagStart = true;
          }
        } else if (c === ">") {
          if (metaData[depth].tagStart === "true/") {
            inTagStart = false;
            inTagEnd = true;
            metaData[depth].tagStart = "";
            metaData[depth].tagEnd = "/boolean";
            metaData[depth].data = true;
          }
          if (metaData[depth].tagStart === "false/") {
            inTagStart = false;
            inTagEnd = true;
            metaData[depth].tagStart = "";
            metaData[depth].tagEnd = "/boolean";
            metaData[depth].data = false;
          }
          if (metaData[depth].tagStart === "array/") {
            inTagStart = false;
            inTagEnd = true;
            metaData[depth].tagStart = "";
            metaData[depth].tagEnd = "/arrayEmpty";
            metaData[depth].data = [];
          }
          if (inTagContent) {
            inTagContent = false;
          }
          if (inTagStart) {
            inTagStart = false;
            inTagContent = true;
            if (metaData[depth].tagStart === "array") {
              metaData[depth].data = [];
            }
            if (metaData[depth].tagStart === "dict") {
              metaData[depth].data = {};
            }
          }
          if (inTagEnd) {
            inTagEnd = false;
            if (metaData[depth].tagEnd && tags.indexOf(metaData[depth].tagEnd.substr(1)) >= 0) {
              if (metaData[depth].tagEnd === "/dict" || metaData[depth].tagEnd === "/array") {
                if (depth > 1 && metaData[depth - 2].tagStart === "array") {
                  metaData[depth - 2].data.push(metaData[depth - 1].data);
                }
                if (depth > 1 && metaData[depth - 2].tagStart === "dict") {
                  metaData[depth - 2].data[metaData[depth - 1].key] = metaData[depth - 1].data;
                }
                depth--;
                metaData.pop();
                metaData[depth].tagContent = "";
                metaData[depth].tagStart = "";
                metaData[depth].tagEnd = "";
              } else {
                if (metaData[depth].tagEnd === "/key" && metaData[depth].tagContent) {
                  metaData[depth].key = metaData[depth].tagContent;
                } else {
                  if (metaData[depth].tagEnd === "/real" && metaData[depth].tagContent) {
                    metaData[depth].data = parseFloat(metaData[depth].tagContent) || 0;
                  }
                  if (metaData[depth].tagEnd === "/integer" && metaData[depth].tagContent) {
                    metaData[depth].data = parseInt(metaData[depth].tagContent) || 0;
                  }
                  if (metaData[depth].tagEnd === "/string" && metaData[depth].tagContent) {
                    metaData[depth].data = metaData[depth].tagContent || "";
                  }
                  if (metaData[depth].tagEnd === "/boolean") {
                    metaData[depth].data = metaData[depth].tagContent || false;
                  }
                  if (metaData[depth].tagEnd === "/arrayEmpty") {
                    metaData[depth].data = metaData[depth].tagContent || [];
                  }
                  if (depth > 0 && metaData[depth - 1].tagStart === "array") {
                    metaData[depth - 1].data.push(metaData[depth].data);
                  }
                  if (depth > 0 && metaData[depth - 1].tagStart === "dict") {
                    metaData[depth - 1].data[metaData[depth].key] = metaData[depth].data;
                  }
                }
                metaData[depth].tagContent = "";
                metaData[depth].tagStart = "";
                metaData[depth].tagEnd = "";
              }
            }
            metaData[depth].tagEnd = "";
            inTagStart = false;
            inTagContent = false;
          }
        } else {
          if (inTagStart) {
            metaData[depth].tagStart += c;
          }
          if (inTagEnd) {
            metaData[depth].tagEnd += c;
          }
          if (inTagContent) {
            metaData[depth].tagContent += c;
          }
        }
        pos++;
      }
      return metaData[0].data;
    }
    __name(plistParser, "plistParser");
    function strIsNumeric(str) {
      return typeof str === "string" && !isNaN(str) && !isNaN(parseFloat(str));
    }
    __name(strIsNumeric, "strIsNumeric");
    function plistReader(output) {
      const lines = output.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf(" = ") >= 0) {
          const lineParts = lines[i].split(" = ");
          lineParts[0] = lineParts[0].trim();
          if (!lineParts[0].startsWith('"')) {
            lineParts[0] = '"' + lineParts[0] + '"';
          }
          lineParts[1] = lineParts[1].trim();
          if (lineParts[1].indexOf('"') === -1 && lineParts[1].endsWith(";")) {
            const valueString = lineParts[1].substring(0, lineParts[1].length - 1);
            if (!strIsNumeric(valueString)) {
              lineParts[1] = `"${valueString}";`;
            }
          }
          if (lineParts[1].indexOf('"') >= 0 && lineParts[1].endsWith(";")) {
            const valueString = lineParts[1].substring(0, lineParts[1].length - 1).replace(/"/g, "");
            if (strIsNumeric(valueString)) {
              lineParts[1] = `${valueString};`;
            }
          }
          lines[i] = lineParts.join(" : ");
        }
        lines[i] = lines[i].replace(/\(/g, "[").replace(/\)/g, "]").replace(/;/g, ",").trim();
        if (lines[i].startsWith("}") && lines[i - 1] && lines[i - 1].endsWith(",")) {
          lines[i - 1] = lines[i - 1].substring(0, lines[i - 1].length - 1);
        }
      }
      output = lines.join("");
      let obj = {};
      try {
        obj = JSON.parse(output);
      } catch (e) {
        noop();
      }
      return obj;
    }
    __name(plistReader, "plistReader");
    function semverCompare(v1, v2) {
      let res = 0;
      const parts1 = v1.split(".");
      const parts2 = v2.split(".");
      if (parts1[0] < parts2[0]) {
        res = 1;
      } else if (parts1[0] > parts2[0]) {
        res = -1;
      } else if (parts1[0] === parts2[0] && parts1.length >= 2 && parts2.length >= 2) {
        if (parts1[1] < parts2[1]) {
          res = 1;
        } else if (parts1[1] > parts2[1]) {
          res = -1;
        } else if (parts1[1] === parts2[1]) {
          if (parts1.length >= 3 && parts2.length >= 3) {
            if (parts1[2] < parts2[2]) {
              res = 1;
            } else if (parts1[2] > parts2[2]) {
              res = -1;
            }
          } else if (parts2.length >= 3) {
            res = 1;
          }
        }
      }
      return res;
    }
    __name(semverCompare, "semverCompare");
    function noop() {
    }
    __name(noop, "noop");
    exports.toInt = toInt;
    exports.splitByNumber = splitByNumber;
    exports.execOptsWin = execOptsWin;
    exports.execOptsLinux = execOptsLinux;
    exports.getCodepage = getCodepage;
    exports.execWin = execWin;
    exports.isFunction = isFunction;
    exports.unique = unique;
    exports.sortByKey = sortByKey;
    exports.cores = cores;
    exports.getValue = getValue;
    exports.decodeEscapeSequence = decodeEscapeSequence;
    exports.parseDateTime = parseDateTime;
    exports.parseHead = parseHead;
    exports.findObjectByKey = findObjectByKey;
    exports.getWmic = getWmic;
    exports.wmic = wmic;
    exports.darwinXcodeExists = darwinXcodeExists;
    exports.getVboxmanage = getVboxmanage;
    exports.powerShell = powerShell;
    exports.powerShellStart = powerShellStart;
    exports.powerShellRelease = powerShellRelease;
    exports.execSafe = execSafe;
    exports.nanoSeconds = nanoSeconds;
    exports.countUniqueLines = countUniqueLines;
    exports.countLines = countLines;
    exports.noop = noop;
    exports.isRaspberry = isRaspberry;
    exports.isRaspbian = isRaspbian;
    exports.sanitizeShellString = sanitizeShellString;
    exports.isPrototypePolluted = isPrototypePolluted;
    exports.decodePiCpuinfo = decodePiCpuinfo;
    exports.getRpiGpu = getRpiGpu;
    exports.promiseAll = promiseAll;
    exports.promisify = promisify;
    exports.promisifySave = promisifySave;
    exports.smartMonToolsInstalled = smartMonToolsInstalled;
    exports.linuxVersion = linuxVersion;
    exports.plistParser = plistParser;
    exports.plistReader = plistReader;
    exports.stringReplace = stringReplace;
    exports.stringToLower = stringToLower;
    exports.stringToString = stringToString;
    exports.stringSubstr = stringSubstr;
    exports.stringTrim = stringTrim;
    exports.stringStartWith = stringStartWith;
    exports.mathMin = mathMin;
    exports.WINDIR = WINDIR;
    exports.getFilesInPath = getFilesInPath;
    exports.semverCompare = semverCompare;
  }
});

// node_modules/systeminformation/lib/network.js
var require_network = __commonJS({
  "node_modules/systeminformation/lib/network.js"(exports) {
    "use strict";
    init_esm();
    var os = __require("os");
    var exec = __require("child_process").exec;
    var execSync = __require("child_process").execSync;
    var fs2 = __require("fs");
    var util = require_util();
    var _platform = process.platform;
    var _linux = _platform === "linux" || _platform === "android";
    var _darwin = _platform === "darwin";
    var _windows = _platform === "win32";
    var _freebsd = _platform === "freebsd";
    var _openbsd = _platform === "openbsd";
    var _netbsd = _platform === "netbsd";
    var _sunos = _platform === "sunos";
    var _network = {};
    var _default_iface = "";
    var _ifaces = {};
    var _dhcpNics = [];
    var _networkInterfaces = [];
    var _mac = {};
    var pathToIp;
    function getDefaultNetworkInterface() {
      let ifacename = "";
      let ifacenameFirst = "";
      try {
        let ifaces = os.networkInterfaces();
        let scopeid = 9999;
        for (let dev in ifaces) {
          if ({}.hasOwnProperty.call(ifaces, dev)) {
            ifaces[dev].forEach(function(details) {
              if (details && details.internal === false) {
                ifacenameFirst = ifacenameFirst || dev;
                if (details.scopeid && details.scopeid < scopeid) {
                  ifacename = dev;
                  scopeid = details.scopeid;
                }
              }
            });
          }
        }
        ifacename = ifacename || ifacenameFirst || "";
        if (_windows) {
          let defaultIp = "";
          const cmd = "netstat -r";
          const result = execSync(cmd, util.execOptsWin);
          const lines = result.toString().split(os.EOL);
          lines.forEach((line) => {
            line = line.replace(/\s+/g, " ").trim();
            if (line.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(line)) {
              const parts = line.split(" ");
              if (parts.length >= 5) {
                defaultIp = parts[parts.length - 2];
              }
            }
          });
          if (defaultIp) {
            for (let dev in ifaces) {
              if ({}.hasOwnProperty.call(ifaces, dev)) {
                ifaces[dev].forEach(function(details) {
                  if (details && details.address && details.address === defaultIp) {
                    ifacename = dev;
                  }
                });
              }
            }
          }
        }
        if (_linux) {
          let cmd = "ip route 2> /dev/null | grep default";
          let result = execSync(cmd, util.execOptsLinux);
          let parts = result.toString().split("\n")[0].split(/\s+/);
          if (parts[0] === "none" && parts[5]) {
            ifacename = parts[5];
          } else if (parts[4]) {
            ifacename = parts[4];
          }
          if (ifacename.indexOf(":") > -1) {
            ifacename = ifacename.split(":")[1].trim();
          }
        }
        if (_darwin || _freebsd || _openbsd || _netbsd || _sunos) {
          let cmd = "";
          if (_linux) {
            cmd = "ip route 2> /dev/null | grep default | awk '{print $5}'";
          }
          if (_darwin) {
            cmd = "route -n get default 2>/dev/null | grep interface: | awk '{print $2}'";
          }
          if (_freebsd || _openbsd || _netbsd || _sunos) {
            cmd = "route get 0.0.0.0 | grep interface:";
          }
          let result = execSync(cmd);
          ifacename = result.toString().split("\n")[0];
          if (ifacename.indexOf(":") > -1) {
            ifacename = ifacename.split(":")[1].trim();
          }
        }
      } catch (e) {
        util.noop();
      }
      if (ifacename) {
        _default_iface = ifacename;
      }
      return _default_iface;
    }
    __name(getDefaultNetworkInterface, "getDefaultNetworkInterface");
    exports.getDefaultNetworkInterface = getDefaultNetworkInterface;
    function getMacAddresses() {
      let iface = "";
      let mac = "";
      let result = {};
      if (_linux || _freebsd || _openbsd || _netbsd) {
        if (typeof pathToIp === "undefined") {
          try {
            const lines = execSync("which ip", util.execOptsLinux).toString().split("\n");
            if (lines.length && lines[0].indexOf(":") === -1 && lines[0].indexOf("/") === 0) {
              pathToIp = lines[0];
            } else {
              pathToIp = "";
            }
          } catch (e) {
            pathToIp = "";
          }
        }
        try {
          const cmd = "export LC_ALL=C; " + (pathToIp ? pathToIp + " link show up" : "/sbin/ifconfig") + "; unset LC_ALL";
          let res = execSync(cmd, util.execOptsLinux);
          const lines = res.toString().split("\n");
          for (let i = 0; i < lines.length; i++) {
            if (lines[i] && lines[i][0] !== " ") {
              if (pathToIp) {
                let nextline = lines[i + 1].trim().split(" ");
                if (nextline[0] === "link/ether") {
                  iface = lines[i].split(" ")[1];
                  iface = iface.slice(0, iface.length - 1);
                  mac = nextline[1];
                }
              } else {
                iface = lines[i].split(" ")[0];
                mac = lines[i].split("HWaddr ")[1];
              }
              if (iface && mac) {
                result[iface] = mac.trim();
                iface = "";
                mac = "";
              }
            }
          }
        } catch (e) {
          util.noop();
        }
      }
      if (_darwin) {
        try {
          const cmd = "/sbin/ifconfig";
          let res = execSync(cmd);
          const lines = res.toString().split("\n");
          for (let i = 0; i < lines.length; i++) {
            if (lines[i] && lines[i][0] !== "	" && lines[i].indexOf(":") > 0) {
              iface = lines[i].split(":")[0];
            } else if (lines[i].indexOf("	ether ") === 0) {
              mac = lines[i].split("	ether ")[1];
              if (iface && mac) {
                result[iface] = mac.trim();
                iface = "";
                mac = "";
              }
            }
          }
        } catch (e) {
          util.noop();
        }
      }
      return result;
    }
    __name(getMacAddresses, "getMacAddresses");
    function networkInterfaceDefault(callback) {
      return new Promise((resolve) => {
        process.nextTick(() => {
          let result = getDefaultNetworkInterface();
          if (callback) {
            callback(result);
          }
          resolve(result);
        });
      });
    }
    __name(networkInterfaceDefault, "networkInterfaceDefault");
    exports.networkInterfaceDefault = networkInterfaceDefault;
    function parseLinesWindowsNics(sections, nconfigsections) {
      let nics = [];
      for (let i in sections) {
        if ({}.hasOwnProperty.call(sections, i)) {
          if (sections[i].trim() !== "") {
            let lines = sections[i].trim().split("\r\n");
            let linesNicConfig = nconfigsections && nconfigsections[i] ? nconfigsections[i].trim().split("\r\n") : [];
            let netEnabled = util.getValue(lines, "NetEnabled", ":");
            let adapterType = util.getValue(lines, "AdapterTypeID", ":") === "9" ? "wireless" : "wired";
            let ifacename = util.getValue(lines, "Name", ":").replace(/\]/g, ")").replace(/\[/g, "(");
            let iface = util.getValue(lines, "NetConnectionID", ":").replace(/\]/g, ")").replace(/\[/g, "(");
            if (ifacename.toLowerCase().indexOf("wi-fi") >= 0 || ifacename.toLowerCase().indexOf("wireless") >= 0) {
              adapterType = "wireless";
            }
            if (netEnabled !== "") {
              const speed = parseInt(util.getValue(lines, "speed", ":").trim(), 10) / 1e6;
              nics.push({
                mac: util.getValue(lines, "MACAddress", ":").toLowerCase(),
                dhcp: util.getValue(linesNicConfig, "dhcpEnabled", ":").toLowerCase() === "true",
                name: ifacename,
                iface,
                netEnabled: netEnabled === "TRUE",
                speed: isNaN(speed) ? null : speed,
                operstate: util.getValue(lines, "NetConnectionStatus", ":") === "2" ? "up" : "down",
                type: adapterType
              });
            }
          }
        }
      }
      return nics;
    }
    __name(parseLinesWindowsNics, "parseLinesWindowsNics");
    function getWindowsNics() {
      return new Promise((resolve) => {
        process.nextTick(() => {
          let cmd = "Get-CimInstance Win32_NetworkAdapter | fl *; echo '#-#-#-#';";
          cmd += "Get-CimInstance Win32_NetworkAdapterConfiguration | fl DHCPEnabled";
          try {
            util.powerShell(cmd).then((data) => {
              data = data.split("#-#-#-#");
              const nsections = (data[0] || "").split(/\n\s*\n/);
              const nconfigsections = (data[1] || "").split(/\n\s*\n/);
              resolve(parseLinesWindowsNics(nsections, nconfigsections));
            });
          } catch (e) {
            resolve([]);
          }
        });
      });
    }
    __name(getWindowsNics, "getWindowsNics");
    function getWindowsDNSsuffixes() {
      let iface = {};
      let dnsSuffixes = {
        primaryDNS: "",
        exitCode: 0,
        ifaces: []
      };
      try {
        const ipconfig = execSync("ipconfig /all", util.execOptsWin);
        const ipconfigArray = ipconfig.split("\r\n\r\n");
        ipconfigArray.forEach((element, index) => {
          if (index == 1) {
            const longPrimaryDNS = element.split("\r\n").filter((element2) => {
              return element2.toUpperCase().includes("DNS");
            });
            const primaryDNS = longPrimaryDNS[0].substring(longPrimaryDNS[0].lastIndexOf(":") + 1);
            dnsSuffixes.primaryDNS = primaryDNS.trim();
            if (!dnsSuffixes.primaryDNS) {
              dnsSuffixes.primaryDNS = "Not defined";
            }
          }
          if (index > 1) {
            if (index % 2 == 0) {
              const name = element.substring(element.lastIndexOf(" ") + 1).replace(":", "");
              iface.name = name;
            } else {
              const connectionSpecificDNS = element.split("\r\n").filter((element2) => {
                return element2.toUpperCase().includes("DNS");
              });
              const dnsSuffix = connectionSpecificDNS[0].substring(connectionSpecificDNS[0].lastIndexOf(":") + 1);
              iface.dnsSuffix = dnsSuffix.trim();
              dnsSuffixes.ifaces.push(iface);
              iface = {};
            }
          }
        });
        return dnsSuffixes;
      } catch (error) {
        return {
          primaryDNS: "",
          exitCode: 0,
          ifaces: []
        };
      }
    }
    __name(getWindowsDNSsuffixes, "getWindowsDNSsuffixes");
    function getWindowsIfaceDNSsuffix(ifaces, ifacename) {
      let dnsSuffix = "";
      const interfaceName = ifacename + ".";
      try {
        const connectionDnsSuffix = ifaces.filter((iface) => {
          return interfaceName.includes(iface.name + ".");
        }).map((iface) => iface.dnsSuffix);
        if (connectionDnsSuffix[0]) {
          dnsSuffix = connectionDnsSuffix[0];
        }
        if (!dnsSuffix) {
          dnsSuffix = "";
        }
        return dnsSuffix;
      } catch (error) {
        return "Unknown";
      }
    }
    __name(getWindowsIfaceDNSsuffix, "getWindowsIfaceDNSsuffix");
    function getWindowsWiredProfilesInformation() {
      try {
        const result = execSync("netsh lan show profiles", util.execOptsWin);
        const profileList = result.split("\r\nProfile on interface");
        return profileList;
      } catch (error) {
        if (error.status === 1 && error.stdout.includes("AutoConfig")) {
          return "Disabled";
        }
        return [];
      }
    }
    __name(getWindowsWiredProfilesInformation, "getWindowsWiredProfilesInformation");
    function getWindowsWirelessIfaceSSID(interfaceName) {
      try {
        const result = execSync(`netsh wlan show  interface name="${interfaceName}" | findstr "SSID"`, util.execOptsWin);
        const SSID = result.split("\r\n").shift();
        const parseSSID = SSID.split(":").pop().trim();
        return parseSSID;
      } catch (error) {
        return "Unknown";
      }
    }
    __name(getWindowsWirelessIfaceSSID, "getWindowsWirelessIfaceSSID");
    function getWindowsIEEE8021x(connectionType, iface, ifaces) {
      let i8021x = {
        state: "Unknown",
        protocol: "Unknown"
      };
      if (ifaces === "Disabled") {
        i8021x.state = "Disabled";
        i8021x.protocol = "Not defined";
        return i8021x;
      }
      if (connectionType == "wired" && ifaces.length > 0) {
        try {
          const iface8021xInfo = ifaces.find((element) => {
            return element.includes(iface + "\r\n");
          });
          const arrayIface8021xInfo = iface8021xInfo.split("\r\n");
          const state8021x = arrayIface8021xInfo.find((element) => {
            return element.includes("802.1x");
          });
          if (state8021x.includes("Disabled")) {
            i8021x.state = "Disabled";
            i8021x.protocol = "Not defined";
          } else if (state8021x.includes("Enabled")) {
            const protocol8021x = arrayIface8021xInfo.find((element) => {
              return element.includes("EAP");
            });
            i8021x.protocol = protocol8021x.split(":").pop();
            i8021x.state = "Enabled";
          }
        } catch (error) {
          return i8021x;
        }
      } else if (connectionType == "wireless") {
        let i8021xState = "";
        let i8021xProtocol = "";
        try {
          const SSID = getWindowsWirelessIfaceSSID(iface);
          if (SSID !== "Unknown") {
            let ifaceSanitized = "";
            const s = util.isPrototypePolluted() ? "---" : util.sanitizeShellString(SSID);
            const l2 = util.mathMin(s.length, 2e3);
            for (let i = 0; i <= l2; i++) {
              if (s[i] !== void 0) {
                ifaceSanitized = ifaceSanitized + s[i];
              }
            }
            i8021xState = execSync(`netsh wlan show profiles "${ifaceSanitized}" | findstr "802.1X"`, util.execOptsWin);
            i8021xProtocol = execSync(`netsh wlan show profiles "${ifaceSanitized}" | findstr "EAP"`, util.execOptsWin);
          }
          if (i8021xState.includes(":") && i8021xProtocol.includes(":")) {
            i8021x.state = i8021xState.split(":").pop();
            i8021x.protocol = i8021xProtocol.split(":").pop();
          }
        } catch (error) {
          if (error.status === 1 && error.stdout.includes("AutoConfig")) {
            i8021x.state = "Disabled";
            i8021x.protocol = "Not defined";
          }
          return i8021x;
        }
      }
      return i8021x;
    }
    __name(getWindowsIEEE8021x, "getWindowsIEEE8021x");
    function splitSectionsNics(lines) {
      const result = [];
      let section = [];
      lines.forEach(function(line) {
        if (!line.startsWith("	") && !line.startsWith(" ")) {
          if (section.length) {
            result.push(section);
            section = [];
          }
        }
        section.push(line);
      });
      if (section.length) {
        result.push(section);
      }
      return result;
    }
    __name(splitSectionsNics, "splitSectionsNics");
    function parseLinesDarwinNics(sections) {
      let nics = [];
      sections.forEach((section) => {
        let nic = {
          iface: "",
          mtu: null,
          mac: "",
          ip6: "",
          ip4: "",
          speed: null,
          type: "",
          operstate: "",
          duplex: "",
          internal: false
        };
        const first = section[0];
        nic.iface = first.split(":")[0].trim();
        let parts = first.split("> mtu");
        nic.mtu = parts.length > 1 ? parseInt(parts[1], 10) : null;
        if (isNaN(nic.mtu)) {
          nic.mtu = null;
        }
        nic.internal = parts[0].toLowerCase().indexOf("loopback") > -1;
        section.forEach((line) => {
          if (line.trim().startsWith("ether ")) {
            nic.mac = line.split("ether ")[1].toLowerCase().trim();
          }
          if (line.trim().startsWith("inet6 ") && !nic.ip6) {
            nic.ip6 = line.split("inet6 ")[1].toLowerCase().split("%")[0].split(" ")[0];
          }
          if (line.trim().startsWith("inet ") && !nic.ip4) {
            nic.ip4 = line.split("inet ")[1].toLowerCase().split(" ")[0];
          }
        });
        let speed = util.getValue(section, "link rate");
        nic.speed = speed ? parseFloat(speed) : null;
        if (nic.speed === null) {
          speed = util.getValue(section, "uplink rate");
          nic.speed = speed ? parseFloat(speed) : null;
          if (nic.speed !== null && speed.toLowerCase().indexOf("gbps") >= 0) {
            nic.speed = nic.speed * 1e3;
          }
        } else {
          if (speed.toLowerCase().indexOf("gbps") >= 0) {
            nic.speed = nic.speed * 1e3;
          }
        }
        nic.type = util.getValue(section, "type").toLowerCase().indexOf("wi-fi") > -1 ? "wireless" : "wired";
        const operstate = util.getValue(section, "status").toLowerCase();
        nic.operstate = operstate === "active" ? "up" : operstate === "inactive" ? "down" : "unknown";
        nic.duplex = util.getValue(section, "media").toLowerCase().indexOf("half-duplex") > -1 ? "half" : "full";
        if (nic.ip6 || nic.ip4 || nic.mac) {
          nics.push(nic);
        }
      });
      return nics;
    }
    __name(parseLinesDarwinNics, "parseLinesDarwinNics");
    function getDarwinNics() {
      const cmd = "/sbin/ifconfig -v";
      try {
        const lines = execSync(cmd, { maxBuffer: 1024 * 2e4 }).toString().split("\n");
        const nsections = splitSectionsNics(lines);
        return parseLinesDarwinNics(nsections);
      } catch (e) {
        return [];
      }
    }
    __name(getDarwinNics, "getDarwinNics");
    function getLinuxIfaceConnectionName(interfaceName) {
      const cmd = `nmcli device status 2>/dev/null | grep ${interfaceName}`;
      try {
        const result = execSync(cmd, util.execOptsLinux).toString();
        const resultFormat = result.replace(/\s+/g, " ").trim();
        const connectionNameLines = resultFormat.split(" ").slice(3);
        const connectionName = connectionNameLines.join(" ");
        return connectionName != "--" ? connectionName : "";
      } catch (e) {
        return "";
      }
    }
    __name(getLinuxIfaceConnectionName, "getLinuxIfaceConnectionName");
    function checkLinuxDCHPInterfaces(file) {
      let result = [];
      try {
        let cmd = `cat ${file} 2> /dev/null | grep 'iface\\|source'`;
        const lines = execSync(cmd, util.execOptsLinux).toString().split("\n");
        lines.forEach((line) => {
          const parts = line.replace(/\s+/g, " ").trim().split(" ");
          if (parts.length >= 4) {
            if (line.toLowerCase().indexOf(" inet ") >= 0 && line.toLowerCase().indexOf("dhcp") >= 0) {
              result.push(parts[1]);
            }
          }
          if (line.toLowerCase().includes("source")) {
            let file2 = line.split(" ")[1];
            result = result.concat(checkLinuxDCHPInterfaces(file2));
          }
        });
      } catch (e) {
        util.noop();
      }
      return result;
    }
    __name(checkLinuxDCHPInterfaces, "checkLinuxDCHPInterfaces");
    function getLinuxDHCPNics() {
      let cmd = "ip a 2> /dev/null";
      let result = [];
      try {
        const lines = execSync(cmd, util.execOptsLinux).toString().split("\n");
        const nsections = splitSectionsNics(lines);
        result = parseLinuxDHCPNics(nsections);
      } catch (e) {
        util.noop();
      }
      try {
        result = checkLinuxDCHPInterfaces("/etc/network/interfaces");
      } catch (e) {
        util.noop();
      }
      return result;
    }
    __name(getLinuxDHCPNics, "getLinuxDHCPNics");
    function parseLinuxDHCPNics(sections) {
      const result = [];
      if (sections && sections.length) {
        sections.forEach((lines) => {
          if (lines && lines.length) {
            const parts = lines[0].split(":");
            if (parts.length > 2) {
              for (let line of lines) {
                if (line.indexOf(" inet ") >= 0 && line.indexOf(" dynamic ") >= 0) {
                  const parts2 = line.split(" ");
                  const nic = parts2[parts2.length - 1].trim();
                  result.push(nic);
                  break;
                }
              }
            }
          }
        });
      }
      return result;
    }
    __name(parseLinuxDHCPNics, "parseLinuxDHCPNics");
    function getLinuxIfaceDHCPstatus(iface, connectionName, DHCPNics) {
      let result = false;
      if (connectionName) {
        const cmd = `nmcli connection show "${connectionName}" 2>/dev/null | grep ipv4.method;`;
        try {
          const lines = execSync(cmd, util.execOptsLinux).toString();
          const resultFormat = lines.replace(/\s+/g, " ").trim();
          let dhcStatus = resultFormat.split(" ").slice(1).toString();
          switch (dhcStatus) {
            case "auto":
              result = true;
              break;
            default:
              result = false;
              break;
          }
          return result;
        } catch (e) {
          return DHCPNics.indexOf(iface) >= 0;
        }
      } else {
        return DHCPNics.indexOf(iface) >= 0;
      }
    }
    __name(getLinuxIfaceDHCPstatus, "getLinuxIfaceDHCPstatus");
    function getDarwinIfaceDHCPstatus(iface) {
      let result = false;
      const cmd = `ipconfig getpacket "${iface}" 2>/dev/null | grep lease_time;`;
      try {
        const lines = execSync(cmd).toString().split("\n");
        if (lines.length && lines[0].startsWith("lease_time")) {
          result = true;
        }
      } catch (e) {
        util.noop();
      }
      return result;
    }
    __name(getDarwinIfaceDHCPstatus, "getDarwinIfaceDHCPstatus");
    function getLinuxIfaceDNSsuffix(connectionName) {
      if (connectionName) {
        const cmd = `nmcli connection show "${connectionName}" 2>/dev/null | grep ipv4.dns-search;`;
        try {
          const result = execSync(cmd, util.execOptsLinux).toString();
          const resultFormat = result.replace(/\s+/g, " ").trim();
          const dnsSuffix = resultFormat.split(" ").slice(1).toString();
          return dnsSuffix == "--" ? "Not defined" : dnsSuffix;
        } catch (e) {
          return "Unknown";
        }
      } else {
        return "Unknown";
      }
    }
    __name(getLinuxIfaceDNSsuffix, "getLinuxIfaceDNSsuffix");
    function getLinuxIfaceIEEE8021xAuth(connectionName) {
      if (connectionName) {
        const cmd = `nmcli connection show "${connectionName}" 2>/dev/null | grep 802-1x.eap;`;
        try {
          const result = execSync(cmd, util.execOptsLinux).toString();
          const resultFormat = result.replace(/\s+/g, " ").trim();
          const authenticationProtocol = resultFormat.split(" ").slice(1).toString();
          return authenticationProtocol == "--" ? "" : authenticationProtocol;
        } catch (e) {
          return "Not defined";
        }
      } else {
        return "Not defined";
      }
    }
    __name(getLinuxIfaceIEEE8021xAuth, "getLinuxIfaceIEEE8021xAuth");
    function getLinuxIfaceIEEE8021xState(authenticationProtocol) {
      if (authenticationProtocol) {
        if (authenticationProtocol == "Not defined") {
          return "Disabled";
        }
        return "Enabled";
      } else {
        return "Unknown";
      }
    }
    __name(getLinuxIfaceIEEE8021xState, "getLinuxIfaceIEEE8021xState");
    function testVirtualNic(iface, ifaceName, mac) {
      const virtualMacs = ["00:00:00:00:00:00", "00:03:FF", "00:05:69", "00:0C:29", "00:0F:4B", "00:13:07", "00:13:BE", "00:15:5d", "00:16:3E", "00:1C:42", "00:21:F6", "00:24:0B", "00:50:56", "00:A0:B1", "00:E0:C8", "08:00:27", "0A:00:27", "18:92:2C", "16:DF:49", "3C:F3:92", "54:52:00", "FC:15:97"];
      if (mac) {
        return virtualMacs.filter((item) => {
          return mac.toUpperCase().toUpperCase().startsWith(item.substring(0, mac.length));
        }).length > 0 || iface.toLowerCase().indexOf(" virtual ") > -1 || ifaceName.toLowerCase().indexOf(" virtual ") > -1 || iface.toLowerCase().indexOf("vethernet ") > -1 || ifaceName.toLowerCase().indexOf("vethernet ") > -1 || iface.toLowerCase().startsWith("veth") || ifaceName.toLowerCase().startsWith("veth") || iface.toLowerCase().startsWith("vboxnet") || ifaceName.toLowerCase().startsWith("vboxnet");
      } else {
        return false;
      }
    }
    __name(testVirtualNic, "testVirtualNic");
    function networkInterfaces(callback, rescan, defaultString) {
      if (typeof callback === "string") {
        defaultString = callback;
        rescan = true;
        callback = null;
      }
      if (typeof callback === "boolean") {
        rescan = callback;
        callback = null;
        defaultString = "";
      }
      if (typeof rescan === "undefined") {
        rescan = true;
      }
      defaultString = defaultString || "";
      defaultString = "" + defaultString;
      return new Promise((resolve) => {
        process.nextTick(() => {
          let ifaces = os.networkInterfaces();
          let result = [];
          let nics = [];
          let dnsSuffixes = [];
          let nics8021xInfo = [];
          if (_darwin || _freebsd || _openbsd || _netbsd) {
            if (JSON.stringify(ifaces) === JSON.stringify(_ifaces) && !rescan) {
              result = _networkInterfaces;
              if (callback) {
                callback(result);
              }
              resolve(result);
            } else {
              const defaultInterface = getDefaultNetworkInterface();
              _ifaces = JSON.parse(JSON.stringify(ifaces));
              nics = getDarwinNics();
              nics.forEach((nic) => {
                if ({}.hasOwnProperty.call(ifaces, nic.iface)) {
                  ifaces[nic.iface].forEach(function(details) {
                    if (details.family === "IPv4" || details.family === 4) {
                      nic.ip4subnet = details.netmask;
                    }
                    if (details.family === "IPv6" || details.family === 6) {
                      nic.ip6subnet = details.netmask;
                    }
                  });
                }
                let ifaceSanitized = "";
                const s = util.isPrototypePolluted() ? "---" : util.sanitizeShellString(nic.iface);
                const l2 = util.mathMin(s.length, 2e3);
                for (let i = 0; i <= l2; i++) {
                  if (s[i] !== void 0) {
                    ifaceSanitized = ifaceSanitized + s[i];
                  }
                }
                result.push({
                  iface: nic.iface,
                  ifaceName: nic.iface,
                  default: nic.iface === defaultInterface,
                  ip4: nic.ip4,
                  ip4subnet: nic.ip4subnet || "",
                  ip6: nic.ip6,
                  ip6subnet: nic.ip6subnet || "",
                  mac: nic.mac,
                  internal: nic.internal,
                  virtual: nic.internal ? false : testVirtualNic(nic.iface, nic.iface, nic.mac),
                  operstate: nic.operstate,
                  type: nic.type,
                  duplex: nic.duplex,
                  mtu: nic.mtu,
                  speed: nic.speed,
                  dhcp: getDarwinIfaceDHCPstatus(ifaceSanitized),
                  dnsSuffix: "",
                  ieee8021xAuth: "",
                  ieee8021xState: "",
                  carrierChanges: 0
                });
              });
              _networkInterfaces = result;
              if (defaultString.toLowerCase().indexOf("default") >= 0) {
                result = result.filter((item) => item.default);
                if (result.length > 0) {
                  result = result[0];
                } else {
                  result = [];
                }
              }
              if (callback) {
                callback(result);
              }
              resolve(result);
            }
          }
          if (_linux) {
            if (JSON.stringify(ifaces) === JSON.stringify(_ifaces) && !rescan) {
              result = _networkInterfaces;
              if (callback) {
                callback(result);
              }
              resolve(result);
            } else {
              _ifaces = JSON.parse(JSON.stringify(ifaces));
              _dhcpNics = getLinuxDHCPNics();
              const defaultInterface = getDefaultNetworkInterface();
              for (let dev in ifaces) {
                let ip4 = "";
                let ip4subnet = "";
                let ip6 = "";
                let ip6subnet = "";
                let mac = "";
                let duplex = "";
                let mtu = "";
                let speed = null;
                let carrierChanges = 0;
                let dhcp = false;
                let dnsSuffix = "";
                let ieee8021xAuth = "";
                let ieee8021xState = "";
                let type = "";
                if ({}.hasOwnProperty.call(ifaces, dev)) {
                  let ifaceName = dev;
                  ifaces[dev].forEach(function(details) {
                    if (details.family === "IPv4" || details.family === 4) {
                      ip4 = details.address;
                      ip4subnet = details.netmask;
                    }
                    if (details.family === "IPv6" || details.family === 6) {
                      if (!ip6 || ip6.match(/^fe80::/i)) {
                        ip6 = details.address;
                        ip6subnet = details.netmask;
                      }
                    }
                    mac = details.mac;
                    const nodeMainVersion = parseInt(process.versions.node.split("."), 10);
                    if (mac.indexOf("00:00:0") > -1 && (_linux || _darwin) && !details.internal && nodeMainVersion >= 8 && nodeMainVersion <= 11) {
                      if (Object.keys(_mac).length === 0) {
                        _mac = getMacAddresses();
                      }
                      mac = _mac[dev] || "";
                    }
                  });
                  let iface = dev.split(":")[0].trim().toLowerCase();
                  let ifaceSanitized = "";
                  const s = util.isPrototypePolluted() ? "---" : util.sanitizeShellString(iface);
                  const l2 = util.mathMin(s.length, 2e3);
                  for (let i = 0; i <= l2; i++) {
                    if (s[i] !== void 0) {
                      ifaceSanitized = ifaceSanitized + s[i];
                    }
                  }
                  const cmd = `echo -n "addr_assign_type: "; cat /sys/class/net/${ifaceSanitized}/addr_assign_type 2>/dev/null; echo;
            echo -n "address: "; cat /sys/class/net/${ifaceSanitized}/address 2>/dev/null; echo;
            echo -n "addr_len: "; cat /sys/class/net/${ifaceSanitized}/addr_len 2>/dev/null; echo;
            echo -n "broadcast: "; cat /sys/class/net/${ifaceSanitized}/broadcast 2>/dev/null; echo;
            echo -n "carrier: "; cat /sys/class/net/${ifaceSanitized}/carrier 2>/dev/null; echo;
            echo -n "carrier_changes: "; cat /sys/class/net/${ifaceSanitized}/carrier_changes 2>/dev/null; echo;
            echo -n "dev_id: "; cat /sys/class/net/${ifaceSanitized}/dev_id 2>/dev/null; echo;
            echo -n "dev_port: "; cat /sys/class/net/${ifaceSanitized}/dev_port 2>/dev/null; echo;
            echo -n "dormant: "; cat /sys/class/net/${ifaceSanitized}/dormant 2>/dev/null; echo;
            echo -n "duplex: "; cat /sys/class/net/${ifaceSanitized}/duplex 2>/dev/null; echo;
            echo -n "flags: "; cat /sys/class/net/${ifaceSanitized}/flags 2>/dev/null; echo;
            echo -n "gro_flush_timeout: "; cat /sys/class/net/${ifaceSanitized}/gro_flush_timeout 2>/dev/null; echo;
            echo -n "ifalias: "; cat /sys/class/net/${ifaceSanitized}/ifalias 2>/dev/null; echo;
            echo -n "ifindex: "; cat /sys/class/net/${ifaceSanitized}/ifindex 2>/dev/null; echo;
            echo -n "iflink: "; cat /sys/class/net/${ifaceSanitized}/iflink 2>/dev/null; echo;
            echo -n "link_mode: "; cat /sys/class/net/${ifaceSanitized}/link_mode 2>/dev/null; echo;
            echo -n "mtu: "; cat /sys/class/net/${ifaceSanitized}/mtu 2>/dev/null; echo;
            echo -n "netdev_group: "; cat /sys/class/net/${ifaceSanitized}/netdev_group 2>/dev/null; echo;
            echo -n "operstate: "; cat /sys/class/net/${ifaceSanitized}/operstate 2>/dev/null; echo;
            echo -n "proto_down: "; cat /sys/class/net/${ifaceSanitized}/proto_down 2>/dev/null; echo;
            echo -n "speed: "; cat /sys/class/net/${ifaceSanitized}/speed 2>/dev/null; echo;
            echo -n "tx_queue_len: "; cat /sys/class/net/${ifaceSanitized}/tx_queue_len 2>/dev/null; echo;
            echo -n "type: "; cat /sys/class/net/${ifaceSanitized}/type 2>/dev/null; echo;
            echo -n "wireless: "; cat /proc/net/wireless 2>/dev/null | grep ${ifaceSanitized}; echo;
            echo -n "wirelessspeed: "; iw dev ${ifaceSanitized} link 2>&1 | grep bitrate; echo;`;
                  let lines = [];
                  try {
                    lines = execSync(cmd, util.execOptsLinux).toString().split("\n");
                    const connectionName = getLinuxIfaceConnectionName(ifaceSanitized);
                    dhcp = getLinuxIfaceDHCPstatus(ifaceSanitized, connectionName, _dhcpNics);
                    dnsSuffix = getLinuxIfaceDNSsuffix(connectionName);
                    ieee8021xAuth = getLinuxIfaceIEEE8021xAuth(connectionName);
                    ieee8021xState = getLinuxIfaceIEEE8021xState(ieee8021xAuth);
                  } catch (e) {
                    util.noop();
                  }
                  duplex = util.getValue(lines, "duplex");
                  duplex = duplex.startsWith("cat") ? "" : duplex;
                  mtu = parseInt(util.getValue(lines, "mtu"), 10);
                  let myspeed = parseInt(util.getValue(lines, "speed"), 10);
                  speed = isNaN(myspeed) ? null : myspeed;
                  let wirelessspeed = util.getValue(lines, "wirelessspeed").split("tx bitrate: ");
                  if (speed === null && wirelessspeed.length === 2) {
                    myspeed = parseFloat(wirelessspeed[1]);
                    speed = isNaN(myspeed) ? null : myspeed;
                  }
                  carrierChanges = parseInt(util.getValue(lines, "carrier_changes"), 10);
                  const operstate = util.getValue(lines, "operstate");
                  type = operstate === "up" ? util.getValue(lines, "wireless").trim() ? "wireless" : "wired" : "unknown";
                  if (ifaceSanitized === "lo" || ifaceSanitized.startsWith("bond")) {
                    type = "virtual";
                  }
                  let internal = ifaces[dev] && ifaces[dev][0] ? ifaces[dev][0].internal : false;
                  if (dev.toLowerCase().indexOf("loopback") > -1 || ifaceName.toLowerCase().indexOf("loopback") > -1) {
                    internal = true;
                  }
                  const virtual = internal ? false : testVirtualNic(dev, ifaceName, mac);
                  result.push({
                    iface: ifaceSanitized,
                    ifaceName,
                    default: iface === defaultInterface,
                    ip4,
                    ip4subnet,
                    ip6,
                    ip6subnet,
                    mac,
                    internal,
                    virtual,
                    operstate,
                    type,
                    duplex,
                    mtu,
                    speed,
                    dhcp,
                    dnsSuffix,
                    ieee8021xAuth,
                    ieee8021xState,
                    carrierChanges
                  });
                }
              }
              _networkInterfaces = result;
              if (defaultString.toLowerCase().indexOf("default") >= 0) {
                result = result.filter((item) => item.default);
                if (result.length > 0) {
                  result = result[0];
                } else {
                  result = [];
                }
              }
              if (callback) {
                callback(result);
              }
              resolve(result);
            }
          }
          if (_windows) {
            if (JSON.stringify(ifaces) === JSON.stringify(_ifaces) && !rescan) {
              result = _networkInterfaces;
              if (callback) {
                callback(result);
              }
              resolve(result);
            } else {
              _ifaces = JSON.parse(JSON.stringify(ifaces));
              const defaultInterface = getDefaultNetworkInterface();
              getWindowsNics().then(function(nics2) {
                nics2.forEach((nic) => {
                  let found = false;
                  Object.keys(ifaces).forEach((key) => {
                    if (!found) {
                      ifaces[key].forEach((value) => {
                        if (Object.keys(value).indexOf("mac") >= 0) {
                          found = value["mac"] === nic.mac;
                        }
                      });
                    }
                  });
                  if (!found) {
                    ifaces[nic.name] = [{ mac: nic.mac }];
                  }
                });
                nics8021xInfo = getWindowsWiredProfilesInformation();
                dnsSuffixes = getWindowsDNSsuffixes();
                for (let dev in ifaces) {
                  let ifaceSanitized = "";
                  const s = util.isPrototypePolluted() ? "---" : util.sanitizeShellString(dev);
                  const l2 = util.mathMin(s.length, 2e3);
                  for (let i = 0; i <= l2; i++) {
                    if (s[i] !== void 0) {
                      ifaceSanitized = ifaceSanitized + s[i];
                    }
                  }
                  let iface = dev;
                  let ip4 = "";
                  let ip4subnet = "";
                  let ip6 = "";
                  let ip6subnet = "";
                  let mac = "";
                  let duplex = "";
                  let mtu = "";
                  let speed = null;
                  let carrierChanges = 0;
                  let operstate = "down";
                  let dhcp = false;
                  let dnsSuffix = "";
                  let ieee8021xAuth = "";
                  let ieee8021xState = "";
                  let type = "";
                  if ({}.hasOwnProperty.call(ifaces, dev)) {
                    let ifaceName = dev;
                    ifaces[dev].forEach(function(details) {
                      if (details.family === "IPv4" || details.family === 4) {
                        ip4 = details.address;
                        ip4subnet = details.netmask;
                      }
                      if (details.family === "IPv6" || details.family === 6) {
                        if (!ip6 || ip6.match(/^fe80::/i)) {
                          ip6 = details.address;
                          ip6subnet = details.netmask;
                        }
                      }
                      mac = details.mac;
                      const nodeMainVersion = parseInt(process.versions.node.split("."), 10);
                      if (mac.indexOf("00:00:0") > -1 && (_linux || _darwin) && !details.internal && nodeMainVersion >= 8 && nodeMainVersion <= 11) {
                        if (Object.keys(_mac).length === 0) {
                          _mac = getMacAddresses();
                        }
                        mac = _mac[dev] || "";
                      }
                    });
                    dnsSuffix = getWindowsIfaceDNSsuffix(dnsSuffixes.ifaces, ifaceSanitized);
                    let foundFirst = false;
                    nics2.forEach((detail) => {
                      if (detail.mac === mac && !foundFirst) {
                        iface = detail.iface || iface;
                        ifaceName = detail.name;
                        dhcp = detail.dhcp;
                        operstate = detail.operstate;
                        speed = operstate === "up" ? detail.speed : 0;
                        type = detail.type;
                        foundFirst = true;
                      }
                    });
                    if (dev.toLowerCase().indexOf("wlan") >= 0 || ifaceName.toLowerCase().indexOf("wlan") >= 0 || ifaceName.toLowerCase().indexOf("802.11n") >= 0 || ifaceName.toLowerCase().indexOf("wireless") >= 0 || ifaceName.toLowerCase().indexOf("wi-fi") >= 0 || ifaceName.toLowerCase().indexOf("wifi") >= 0) {
                      type = "wireless";
                    }
                    const IEEE8021x = getWindowsIEEE8021x(type, ifaceSanitized, nics8021xInfo);
                    ieee8021xAuth = IEEE8021x.protocol;
                    ieee8021xState = IEEE8021x.state;
                    let internal = ifaces[dev] && ifaces[dev][0] ? ifaces[dev][0].internal : false;
                    if (dev.toLowerCase().indexOf("loopback") > -1 || ifaceName.toLowerCase().indexOf("loopback") > -1) {
                      internal = true;
                    }
                    const virtual = internal ? false : testVirtualNic(dev, ifaceName, mac);
                    result.push({
                      iface,
                      ifaceName,
                      default: iface === defaultInterface,
                      ip4,
                      ip4subnet,
                      ip6,
                      ip6subnet,
                      mac,
                      internal,
                      virtual,
                      operstate,
                      type,
                      duplex,
                      mtu,
                      speed,
                      dhcp,
                      dnsSuffix,
                      ieee8021xAuth,
                      ieee8021xState,
                      carrierChanges
                    });
                  }
                }
                _networkInterfaces = result;
                if (defaultString.toLowerCase().indexOf("default") >= 0) {
                  result = result.filter((item) => item.default);
                  if (result.length > 0) {
                    result = result[0];
                  } else {
                    result = [];
                  }
                }
                if (callback) {
                  callback(result);
                }
                resolve(result);
              });
            }
          }
        });
      });
    }
    __name(networkInterfaces, "networkInterfaces");
    exports.networkInterfaces = networkInterfaces;
    function calcNetworkSpeed(iface, rx_bytes, tx_bytes, operstate, rx_dropped, rx_errors, tx_dropped, tx_errors) {
      let result = {
        iface,
        operstate,
        rx_bytes,
        rx_dropped,
        rx_errors,
        tx_bytes,
        tx_dropped,
        tx_errors,
        rx_sec: null,
        tx_sec: null,
        ms: 0
      };
      if (_network[iface] && _network[iface].ms) {
        result.ms = Date.now() - _network[iface].ms;
        result.rx_sec = rx_bytes - _network[iface].rx_bytes >= 0 ? (rx_bytes - _network[iface].rx_bytes) / (result.ms / 1e3) : 0;
        result.tx_sec = tx_bytes - _network[iface].tx_bytes >= 0 ? (tx_bytes - _network[iface].tx_bytes) / (result.ms / 1e3) : 0;
        _network[iface].rx_bytes = rx_bytes;
        _network[iface].tx_bytes = tx_bytes;
        _network[iface].rx_sec = result.rx_sec;
        _network[iface].tx_sec = result.tx_sec;
        _network[iface].ms = Date.now();
        _network[iface].last_ms = result.ms;
        _network[iface].operstate = operstate;
      } else {
        if (!_network[iface]) {
          _network[iface] = {};
        }
        _network[iface].rx_bytes = rx_bytes;
        _network[iface].tx_bytes = tx_bytes;
        _network[iface].rx_sec = null;
        _network[iface].tx_sec = null;
        _network[iface].ms = Date.now();
        _network[iface].last_ms = 0;
        _network[iface].operstate = operstate;
      }
      return result;
    }
    __name(calcNetworkSpeed, "calcNetworkSpeed");
    function networkStats(ifaces, callback) {
      let ifacesArray = [];
      return new Promise((resolve) => {
        process.nextTick(() => {
          if (util.isFunction(ifaces) && !callback) {
            callback = ifaces;
            ifacesArray = [getDefaultNetworkInterface()];
          } else {
            if (typeof ifaces !== "string" && ifaces !== void 0) {
              if (callback) {
                callback([]);
              }
              return resolve([]);
            }
            ifaces = ifaces || getDefaultNetworkInterface();
            ifaces.__proto__.toLowerCase = util.stringToLower;
            ifaces.__proto__.replace = util.stringReplace;
            ifaces.__proto__.trim = util.stringTrim;
            ifaces = ifaces.trim().toLowerCase().replace(/,+/g, "|");
            ifacesArray = ifaces.split("|");
          }
          const result = [];
          const workload = [];
          if (ifacesArray.length && ifacesArray[0].trim() === "*") {
            ifacesArray = [];
            networkInterfaces(false).then((allIFaces) => {
              for (let iface of allIFaces) {
                ifacesArray.push(iface.iface);
              }
              networkStats(ifacesArray.join(",")).then((result2) => {
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              });
            });
          } else {
            for (let iface of ifacesArray) {
              workload.push(networkStatsSingle(iface.trim()));
            }
            if (workload.length) {
              Promise.all(
                workload
              ).then((data) => {
                if (callback) {
                  callback(data);
                }
                resolve(data);
              });
            } else {
              if (callback) {
                callback(result);
              }
              resolve(result);
            }
          }
        });
      });
    }
    __name(networkStats, "networkStats");
    function networkStatsSingle(iface) {
      function parseLinesWindowsPerfData(sections) {
        let perfData = [];
        for (let i in sections) {
          if ({}.hasOwnProperty.call(sections, i)) {
            if (sections[i].trim() !== "") {
              let lines = sections[i].trim().split("\r\n");
              perfData.push({
                name: util.getValue(lines, "Name", ":").replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase(),
                rx_bytes: parseInt(util.getValue(lines, "BytesReceivedPersec", ":"), 10),
                rx_errors: parseInt(util.getValue(lines, "PacketsReceivedErrors", ":"), 10),
                rx_dropped: parseInt(util.getValue(lines, "PacketsReceivedDiscarded", ":"), 10),
                tx_bytes: parseInt(util.getValue(lines, "BytesSentPersec", ":"), 10),
                tx_errors: parseInt(util.getValue(lines, "PacketsOutboundErrors", ":"), 10),
                tx_dropped: parseInt(util.getValue(lines, "PacketsOutboundDiscarded", ":"), 10)
              });
            }
          }
        }
        return perfData;
      }
      __name(parseLinesWindowsPerfData, "parseLinesWindowsPerfData");
      return new Promise((resolve) => {
        process.nextTick(() => {
          let ifaceSanitized = "";
          const s = util.isPrototypePolluted() ? "---" : util.sanitizeShellString(iface);
          const l2 = util.mathMin(s.length, 2e3);
          for (let i = 0; i <= l2; i++) {
            if (s[i] !== void 0) {
              ifaceSanitized = ifaceSanitized + s[i];
            }
          }
          let result = {
            iface: ifaceSanitized,
            operstate: "unknown",
            rx_bytes: 0,
            rx_dropped: 0,
            rx_errors: 0,
            tx_bytes: 0,
            tx_dropped: 0,
            tx_errors: 0,
            rx_sec: null,
            tx_sec: null,
            ms: 0
          };
          let operstate = "unknown";
          let rx_bytes = 0;
          let tx_bytes = 0;
          let rx_dropped = 0;
          let rx_errors = 0;
          let tx_dropped = 0;
          let tx_errors = 0;
          let cmd, lines, stats;
          if (!_network[ifaceSanitized] || _network[ifaceSanitized] && !_network[ifaceSanitized].ms || _network[ifaceSanitized] && _network[ifaceSanitized].ms && Date.now() - _network[ifaceSanitized].ms >= 500) {
            if (_linux) {
              if (fs2.existsSync("/sys/class/net/" + ifaceSanitized)) {
                cmd = "cat /sys/class/net/" + ifaceSanitized + "/operstate; cat /sys/class/net/" + ifaceSanitized + "/statistics/rx_bytes; cat /sys/class/net/" + ifaceSanitized + "/statistics/tx_bytes; cat /sys/class/net/" + ifaceSanitized + "/statistics/rx_dropped; cat /sys/class/net/" + ifaceSanitized + "/statistics/rx_errors; cat /sys/class/net/" + ifaceSanitized + "/statistics/tx_dropped; cat /sys/class/net/" + ifaceSanitized + "/statistics/tx_errors; ";
                exec(cmd, function(error, stdout) {
                  if (!error) {
                    lines = stdout.toString().split("\n");
                    operstate = lines[0].trim();
                    rx_bytes = parseInt(lines[1], 10);
                    tx_bytes = parseInt(lines[2], 10);
                    rx_dropped = parseInt(lines[3], 10);
                    rx_errors = parseInt(lines[4], 10);
                    tx_dropped = parseInt(lines[5], 10);
                    tx_errors = parseInt(lines[6], 10);
                    result = calcNetworkSpeed(ifaceSanitized, rx_bytes, tx_bytes, operstate, rx_dropped, rx_errors, tx_dropped, tx_errors);
                  }
                  resolve(result);
                });
              } else {
                resolve(result);
              }
            }
            if (_freebsd || _openbsd || _netbsd) {
              cmd = "netstat -ibndI " + ifaceSanitized;
              exec(cmd, function(error, stdout) {
                if (!error) {
                  lines = stdout.toString().split("\n");
                  for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].replace(/ +/g, " ").split(" ");
                    if (line && line[0] && line[7] && line[10]) {
                      rx_bytes = rx_bytes + parseInt(line[7]);
                      if (line[6].trim() !== "-") {
                        rx_dropped = rx_dropped + parseInt(line[6]);
                      }
                      if (line[5].trim() !== "-") {
                        rx_errors = rx_errors + parseInt(line[5]);
                      }
                      tx_bytes = tx_bytes + parseInt(line[10]);
                      if (line[12].trim() !== "-") {
                        tx_dropped = tx_dropped + parseInt(line[12]);
                      }
                      if (line[9].trim() !== "-") {
                        tx_errors = tx_errors + parseInt(line[9]);
                      }
                      operstate = "up";
                    }
                  }
                  result = calcNetworkSpeed(ifaceSanitized, rx_bytes, tx_bytes, operstate, rx_dropped, rx_errors, tx_dropped, tx_errors);
                }
                resolve(result);
              });
            }
            if (_darwin) {
              cmd = "ifconfig " + ifaceSanitized + ' | grep "status"';
              exec(cmd, function(error, stdout) {
                result.operstate = (stdout.toString().split(":")[1] || "").trim();
                result.operstate = (result.operstate || "").toLowerCase();
                result.operstate = result.operstate === "active" ? "up" : result.operstate === "inactive" ? "down" : "unknown";
                cmd = "netstat -bdI " + ifaceSanitized;
                exec(cmd, function(error2, stdout2) {
                  if (!error2) {
                    lines = stdout2.toString().split("\n");
                    if (lines.length > 1 && lines[1].trim() !== "") {
                      stats = lines[1].replace(/ +/g, " ").split(" ");
                      const offset = stats.length > 11 ? 1 : 0;
                      rx_bytes = parseInt(stats[offset + 5]);
                      rx_dropped = parseInt(stats[offset + 10]);
                      rx_errors = parseInt(stats[offset + 4]);
                      tx_bytes = parseInt(stats[offset + 8]);
                      tx_dropped = parseInt(stats[offset + 10]);
                      tx_errors = parseInt(stats[offset + 7]);
                      result = calcNetworkSpeed(ifaceSanitized, rx_bytes, tx_bytes, result.operstate, rx_dropped, rx_errors, tx_dropped, tx_errors);
                    }
                  }
                  resolve(result);
                });
              });
            }
            if (_windows) {
              let perfData = [];
              let ifaceName = ifaceSanitized;
              util.powerShell("Get-CimInstance Win32_PerfRawData_Tcpip_NetworkInterface | select Name,BytesReceivedPersec,PacketsReceivedErrors,PacketsReceivedDiscarded,BytesSentPersec,PacketsOutboundErrors,PacketsOutboundDiscarded | fl").then((stdout, error) => {
                if (!error) {
                  const psections = stdout.toString().split(/\n\s*\n/);
                  perfData = parseLinesWindowsPerfData(psections);
                }
                networkInterfaces(false).then((interfaces) => {
                  rx_bytes = 0;
                  tx_bytes = 0;
                  perfData.forEach((detail) => {
                    interfaces.forEach((det) => {
                      if ((det.iface.toLowerCase() === ifaceSanitized.toLowerCase() || det.mac.toLowerCase() === ifaceSanitized.toLowerCase() || det.ip4.toLowerCase() === ifaceSanitized.toLowerCase() || det.ip6.toLowerCase() === ifaceSanitized.toLowerCase() || det.ifaceName.replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase() === ifaceSanitized.replace(/[()[\] ]+/g, "").replace("#", "_").toLowerCase()) && det.ifaceName.replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase() === detail.name) {
                        ifaceName = det.iface;
                        rx_bytes = detail.rx_bytes;
                        rx_dropped = detail.rx_dropped;
                        rx_errors = detail.rx_errors;
                        tx_bytes = detail.tx_bytes;
                        tx_dropped = detail.tx_dropped;
                        tx_errors = detail.tx_errors;
                        operstate = det.operstate;
                      }
                    });
                  });
                  if (rx_bytes && tx_bytes) {
                    result = calcNetworkSpeed(ifaceName, parseInt(rx_bytes), parseInt(tx_bytes), operstate, rx_dropped, rx_errors, tx_dropped, tx_errors);
                  }
                  resolve(result);
                });
              });
            }
          } else {
            result.rx_bytes = _network[ifaceSanitized].rx_bytes;
            result.tx_bytes = _network[ifaceSanitized].tx_bytes;
            result.rx_sec = _network[ifaceSanitized].rx_sec;
            result.tx_sec = _network[ifaceSanitized].tx_sec;
            result.ms = _network[ifaceSanitized].last_ms;
            result.operstate = _network[ifaceSanitized].operstate;
            resolve(result);
          }
        });
      });
    }
    __name(networkStatsSingle, "networkStatsSingle");
    exports.networkStats = networkStats;
    function getProcessName(processes, pid) {
      let cmd = "";
      processes.forEach((line) => {
        const parts = line.split(" ");
        const id = parseInt(parts[0], 10) || -1;
        if (id === pid) {
          parts.shift();
          cmd = parts.join(" ").split(":")[0];
        }
      });
      cmd = cmd.split(" -")[0];
      const cmdParts = cmd.split("/");
      return cmdParts[cmdParts.length - 1];
    }
    __name(getProcessName, "getProcessName");
    function networkConnections(callback) {
      return new Promise((resolve) => {
        process.nextTick(() => {
          let result = [];
          if (_linux || _freebsd || _openbsd || _netbsd) {
            let cmd = 'export LC_ALL=C; netstat -tunap | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL';
            if (_freebsd || _openbsd || _netbsd) {
              cmd = 'export LC_ALL=C; netstat -na | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL';
            }
            exec(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
              let lines = stdout.toString().split("\n");
              if (!error && (lines.length > 1 || lines[0] != "")) {
                lines.forEach(function(line) {
                  line = line.replace(/ +/g, " ").split(" ");
                  if (line.length >= 7) {
                    let localip = line[3];
                    let localport = "";
                    let localaddress = line[3].split(":");
                    if (localaddress.length > 1) {
                      localport = localaddress[localaddress.length - 1];
                      localaddress.pop();
                      localip = localaddress.join(":");
                    }
                    let peerip = line[4];
                    let peerport = "";
                    let peeraddress = line[4].split(":");
                    if (peeraddress.length > 1) {
                      peerport = peeraddress[peeraddress.length - 1];
                      peeraddress.pop();
                      peerip = peeraddress.join(":");
                    }
                    let connstate = line[5];
                    let proc = line[6].split("/");
                    if (connstate) {
                      result.push({
                        protocol: line[0],
                        localAddress: localip,
                        localPort: localport,
                        peerAddress: peerip,
                        peerPort: peerport,
                        state: connstate,
                        pid: proc[0] && proc[0] !== "-" ? parseInt(proc[0], 10) : null,
                        process: proc[1] ? proc[1].split(" ")[0].split(":")[0] : ""
                      });
                    }
                  }
                });
                if (callback) {
                  callback(result);
                }
                resolve(result);
              } else {
                cmd = 'ss -tunap | grep "ESTAB\\|SYN-SENT\\|SYN-RECV\\|FIN-WAIT1\\|FIN-WAIT2\\|TIME-WAIT\\|CLOSE\\|CLOSE-WAIT\\|LAST-ACK\\|LISTEN\\|CLOSING"';
                exec(cmd, { maxBuffer: 1024 * 2e4 }, function(error2, stdout2) {
                  if (!error2) {
                    let lines2 = stdout2.toString().split("\n");
                    lines2.forEach(function(line) {
                      line = line.replace(/ +/g, " ").split(" ");
                      if (line.length >= 6) {
                        let localip = line[4];
                        let localport = "";
                        let localaddress = line[4].split(":");
                        if (localaddress.length > 1) {
                          localport = localaddress[localaddress.length - 1];
                          localaddress.pop();
                          localip = localaddress.join(":");
                        }
                        let peerip = line[5];
                        let peerport = "";
                        let peeraddress = line[5].split(":");
                        if (peeraddress.length > 1) {
                          peerport = peeraddress[peeraddress.length - 1];
                          peeraddress.pop();
                          peerip = peeraddress.join(":");
                        }
                        let connstate = line[1];
                        if (connstate === "ESTAB") {
                          connstate = "ESTABLISHED";
                        }
                        if (connstate === "TIME-WAIT") {
                          connstate = "TIME_WAIT";
                        }
                        let pid = null;
                        let process2 = "";
                        if (line.length >= 7 && line[6].indexOf("users:") > -1) {
                          let proc = line[6].replace('users:(("', "").replace(/"/g, "").split(",");
                          if (proc.length > 2) {
                            process2 = proc[0].split(" ")[0].split(":")[0];
                            pid = parseInt(proc[1], 10);
                          }
                        }
                        if (connstate) {
                          result.push({
                            protocol: line[0],
                            localAddress: localip,
                            localPort: localport,
                            peerAddress: peerip,
                            peerPort: peerport,
                            state: connstate,
                            pid,
                            process: process2
                          });
                        }
                      }
                    });
                  }
                  if (callback) {
                    callback(result);
                  }
                  resolve(result);
                });
              }
            });
          }
          if (_darwin) {
            let cmd = 'netstat -natvln | grep "tcp4\\|tcp6\\|udp4\\|udp6"';
            const states = "ESTABLISHED|SYN_SENT|SYN_RECV|FIN_WAIT1|FIN_WAIT2|TIME_WAIT|CLOSE|CLOSE_WAIT|LAST_ACK|LISTEN|CLOSING|UNKNOWN";
            exec(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
              if (!error) {
                exec("ps -axo pid,command", { maxBuffer: 1024 * 2e4 }, function(err2, stdout2) {
                  let processes = stdout2.toString().split("\n");
                  processes = processes.map((line) => {
                    return line.trim().replace(/ +/g, " ");
                  });
                  let lines = stdout.toString().split("\n");
                  lines.forEach(function(line) {
                    line = line.replace(/ +/g, " ").split(" ");
                    if (line.length >= 8) {
                      let localip = line[3];
                      let localport = "";
                      let localaddress = line[3].split(".");
                      if (localaddress.length > 1) {
                        localport = localaddress[localaddress.length - 1];
                        localaddress.pop();
                        localip = localaddress.join(".");
                      }
                      let peerip = line[4];
                      let peerport = "";
                      let peeraddress = line[4].split(".");
                      if (peeraddress.length > 1) {
                        peerport = peeraddress[peeraddress.length - 1];
                        peeraddress.pop();
                        peerip = peeraddress.join(".");
                      }
                      const hasState = states.indexOf(line[5]) >= 0;
                      let connstate = hasState ? line[5] : "UNKNOWN";
                      let pid = parseInt(line[8 + (hasState ? 0 : -1)], 10);
                      if (connstate) {
                        result.push({
                          protocol: line[0],
                          localAddress: localip,
                          localPort: localport,
                          peerAddress: peerip,
                          peerPort: peerport,
                          state: connstate,
                          pid,
                          process: getProcessName(processes, pid)
                        });
                      }
                    }
                  });
                  if (callback) {
                    callback(result);
                  }
                  resolve(result);
                });
              }
            });
          }
          if (_windows) {
            let cmd = "netstat -nao";
            try {
              exec(cmd, util.execOptsWin, function(error, stdout) {
                if (!error) {
                  let lines = stdout.toString().split("\r\n");
                  lines.forEach(function(line) {
                    line = line.trim().replace(/ +/g, " ").split(" ");
                    if (line.length >= 4) {
                      let localip = line[1];
                      let localport = "";
                      let localaddress = line[1].split(":");
                      if (localaddress.length > 1) {
                        localport = localaddress[localaddress.length - 1];
                        localaddress.pop();
                        localip = localaddress.join(":");
                      }
                      localip = localip.replace(/\[/g, "").replace(/\]/g, "");
                      let peerip = line[2];
                      let peerport = "";
                      let peeraddress = line[2].split(":");
                      if (peeraddress.length > 1) {
                        peerport = peeraddress[peeraddress.length - 1];
                        peeraddress.pop();
                        peerip = peeraddress.join(":");
                      }
                      peerip = peerip.replace(/\[/g, "").replace(/\]/g, "");
                      let pid = util.toInt(line[4]);
                      let connstate = line[3];
                      if (connstate === "HERGESTELLT") {
                        connstate = "ESTABLISHED";
                      }
                      if (connstate.startsWith("ABH")) {
                        connstate = "LISTEN";
                      }
                      if (connstate === "SCHLIESSEN_WARTEN") {
                        connstate = "CLOSE_WAIT";
                      }
                      if (connstate === "WARTEND") {
                        connstate = "TIME_WAIT";
                      }
                      if (connstate === "SYN_GESENDET") {
                        connstate = "SYN_SENT";
                      }
                      if (connstate === "LISTENING") {
                        connstate = "LISTEN";
                      }
                      if (connstate === "SYN_RECEIVED") {
                        connstate = "SYN_RECV";
                      }
                      if (connstate === "FIN_WAIT_1") {
                        connstate = "FIN_WAIT1";
                      }
                      if (connstate === "FIN_WAIT_2") {
                        connstate = "FIN_WAIT2";
                      }
                      if (line[0].toLowerCase() !== "udp" && connstate) {
                        result.push({
                          protocol: line[0].toLowerCase(),
                          localAddress: localip,
                          localPort: localport,
                          peerAddress: peerip,
                          peerPort: peerport,
                          state: connstate,
                          pid,
                          process: ""
                        });
                      } else if (line[0].toLowerCase() === "udp") {
                        result.push({
                          protocol: line[0].toLowerCase(),
                          localAddress: localip,
                          localPort: localport,
                          peerAddress: peerip,
                          peerPort: peerport,
                          state: "",
                          pid: parseInt(line[3], 10),
                          process: ""
                        });
                      }
                    }
                  });
                  if (callback) {
                    callback(result);
                  }
                  resolve(result);
                }
              });
            } catch (e) {
              if (callback) {
                callback(result);
              }
              resolve(result);
            }
          }
        });
      });
    }
    __name(networkConnections, "networkConnections");
    exports.networkConnections = networkConnections;
    function networkGatewayDefault(callback) {
      return new Promise((resolve) => {
        process.nextTick(() => {
          let result = "";
          if (_linux || _freebsd || _openbsd || _netbsd) {
            let cmd = "ip route get 1";
            try {
              exec(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
                if (!error) {
                  let lines = stdout.toString().split("\n");
                  const line = lines && lines[0] ? lines[0] : "";
                  let parts = line.split(" via ");
                  if (parts && parts[1]) {
                    parts = parts[1].split(" ");
                    result = parts[0];
                  }
                  if (callback) {
                    callback(result);
                  }
                  resolve(result);
                } else {
                  if (callback) {
                    callback(result);
                  }
                  resolve(result);
                }
              });
            } catch (e) {
              if (callback) {
                callback(result);
              }
              resolve(result);
            }
          }
          if (_darwin) {
            let cmd = "route -n get default";
            try {
              exec(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
                if (!error) {
                  const lines = stdout.toString().split("\n").map((line) => line.trim());
                  result = util.getValue(lines, "gateway");
                }
                if (!result) {
                  cmd = "netstat -rn | awk '/default/ {print $2}'";
                  exec(cmd, { maxBuffer: 1024 * 2e4 }, function(error2, stdout2) {
                    const lines = stdout2.toString().split("\n").map((line) => line.trim());
                    result = lines.find((line) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(line));
                    if (callback) {
                      callback(result);
                    }
                    resolve(result);
                  });
                } else {
                  if (callback) {
                    callback(result);
                  }
                  resolve(result);
                }
              });
            } catch (e) {
              if (callback) {
                callback(result);
              }
              resolve(result);
            }
          }
          if (_windows) {
            try {
              exec("netstat -r", util.execOptsWin, function(error, stdout) {
                const lines = stdout.toString().split(os.EOL);
                lines.forEach((line) => {
                  line = line.replace(/\s+/g, " ").trim();
                  if (line.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(line)) {
                    const parts = line.split(" ");
                    if (parts.length >= 5 && parts[parts.length - 3].indexOf(".") > -1) {
                      result = parts[parts.length - 3];
                    }
                  }
                });
                if (!result) {
                  util.powerShell("Get-CimInstance -ClassName Win32_IP4RouteTable | Where-Object { $_.Destination -eq '0.0.0.0' -and $_.Mask -eq '0.0.0.0' }").then((data) => {
                    let lines2 = data.toString().split("\r\n");
                    if (lines2.length > 1 && !result) {
                      result = util.getValue(lines2, "NextHop");
                      if (callback) {
                        callback(result);
                      }
                      resolve(result);
                    }
                  });
                } else {
                  if (callback) {
                    callback(result);
                  }
                  resolve(result);
                }
              });
            } catch (e) {
              if (callback) {
                callback(result);
              }
              resolve(result);
            }
          }
        });
      });
    }
    __name(networkGatewayDefault, "networkGatewayDefault");
    exports.networkGatewayDefault = networkGatewayDefault;
  }
});

// node_modules/@opentelemetry/host-metrics/build/src/stats/si.js
var require_si = __commonJS({
  "node_modules/@opentelemetry/host-metrics/build/src/stats/si.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNetworkData = void 0;
    var network_1 = require_network();
    function getNetworkData() {
      return new Promise((resolve) => {
        (0, network_1.networkStats)().then(resolve).catch(() => {
          resolve([]);
        });
      });
    }
    __name(getNetworkData, "getNetworkData");
    exports.getNetworkData = getNetworkData;
  }
});

// node_modules/@opentelemetry/host-metrics/build/src/metric.js
var require_metric = __commonJS({
  "node_modules/@opentelemetry/host-metrics/build/src/metric.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HostMetrics = void 0;
    var BaseMetrics_1 = require_BaseMetrics();
    var semconv_1 = require_semconv();
    var common_1 = require_common();
    var si_1 = require_si();
    var HostMetrics2 = class extends BaseMetrics_1.BaseMetrics {
      static {
        __name(this, "HostMetrics");
      }
      _batchUpdateCpuUsages(observableResult, cpuUsages) {
        for (let i = 0, j = cpuUsages.length; i < j; i++) {
          const cpuUsage = cpuUsages[i];
          observableResult.observe(this._cpuTime, cpuUsage.user, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_USER,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuTime, cpuUsage.system, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_SYSTEM,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuTime, cpuUsage.idle, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_IDLE,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuTime, cpuUsage.interrupt, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_INTERRUPT,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuTime, cpuUsage.nice, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_NICE,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuUtilization, cpuUsage.userP, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_USER,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuUtilization, cpuUsage.systemP, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_SYSTEM,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuUtilization, cpuUsage.idleP, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_IDLE,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuUtilization, cpuUsage.interruptP, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_INTERRUPT,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
          observableResult.observe(this._cpuUtilization, cpuUsage.niceP, {
            [semconv_1.ATTR_SYSTEM_CPU_STATE]: semconv_1.SYSTEM_CPU_STATE_VALUE_NICE,
            [semconv_1.ATTR_SYSTEM_CPU_LOGICAL_NUMBER]: cpuUsage.cpuNumber
          });
        }
      }
      _batchUpdateProcessCpuUsages(observableResult, processCpuUsage) {
        observableResult.observe(this._processCpuTime, processCpuUsage.user, {
          [semconv_1.ATTR_PROCESS_CPU_STATE]: semconv_1.PROCESS_CPU_STATE_VALUE_USER
        });
        observableResult.observe(this._processCpuTime, processCpuUsage.system, {
          [semconv_1.ATTR_PROCESS_CPU_STATE]: semconv_1.PROCESS_CPU_STATE_VALUE_SYSTEM
        });
        observableResult.observe(this._processCpuUtilization, processCpuUsage.userP, {
          [semconv_1.ATTR_PROCESS_CPU_STATE]: semconv_1.PROCESS_CPU_STATE_VALUE_USER
        });
        observableResult.observe(this._processCpuUtilization, processCpuUsage.systemP, {
          [semconv_1.ATTR_PROCESS_CPU_STATE]: semconv_1.PROCESS_CPU_STATE_VALUE_SYSTEM
        });
      }
      _batchUpdateMemUsages(observableResult, memUsage) {
        observableResult.observe(this._memoryUsage, memUsage.used, {
          [semconv_1.ATTR_SYSTEM_MEMORY_STATE]: semconv_1.SYSTEM_MEMORY_STATE_VALUE_USED
        });
        observableResult.observe(this._memoryUsage, memUsage.free, {
          [semconv_1.ATTR_SYSTEM_MEMORY_STATE]: semconv_1.SYSTEM_MEMORY_STATE_VALUE_FREE
        });
        observableResult.observe(this._memoryUtilization, memUsage.usedP, {
          [semconv_1.ATTR_SYSTEM_MEMORY_STATE]: semconv_1.SYSTEM_MEMORY_STATE_VALUE_USED
        });
        observableResult.observe(this._memoryUtilization, memUsage.freeP, {
          [semconv_1.ATTR_SYSTEM_MEMORY_STATE]: semconv_1.SYSTEM_MEMORY_STATE_VALUE_FREE
        });
      }
      _batchUpdateProcessMemUsage(observableResult, memoryUsage) {
        observableResult.observe(this._processMemoryUsage, memoryUsage);
      }
      _batchUpdateNetworkData(observableResult, networkUsages) {
        for (let i = 0, j = networkUsages.length; i < j; i++) {
          const networkUsage = networkUsages[i];
          observableResult.observe(this._networkDropped, networkUsage.rx_dropped, {
            [semconv_1.ATTR_SYSTEM_DEVICE]: networkUsage.iface,
            [semconv_1.ATTR_NETWORK_IO_DIRECTION]: semconv_1.NETWORK_IO_DIRECTION_VALUE_RECEIVE
          });
          observableResult.observe(this._networkDropped, networkUsage.tx_dropped, {
            [semconv_1.ATTR_SYSTEM_DEVICE]: networkUsage.iface,
            [semconv_1.ATTR_NETWORK_IO_DIRECTION]: semconv_1.NETWORK_IO_DIRECTION_VALUE_TRANSMIT
          });
          observableResult.observe(this._networkErrors, networkUsage.rx_errors, {
            [semconv_1.ATTR_SYSTEM_DEVICE]: networkUsage.iface,
            [semconv_1.ATTR_NETWORK_IO_DIRECTION]: semconv_1.NETWORK_IO_DIRECTION_VALUE_RECEIVE
          });
          observableResult.observe(this._networkErrors, networkUsage.tx_errors, {
            [semconv_1.ATTR_SYSTEM_DEVICE]: networkUsage.iface,
            [semconv_1.ATTR_NETWORK_IO_DIRECTION]: semconv_1.NETWORK_IO_DIRECTION_VALUE_TRANSMIT
          });
          observableResult.observe(this._networkIo, networkUsage.rx_bytes, {
            [semconv_1.ATTR_SYSTEM_DEVICE]: networkUsage.iface,
            [semconv_1.ATTR_NETWORK_IO_DIRECTION]: semconv_1.NETWORK_IO_DIRECTION_VALUE_RECEIVE
          });
          observableResult.observe(this._networkIo, networkUsage.tx_bytes, {
            [semconv_1.ATTR_SYSTEM_DEVICE]: networkUsage.iface,
            [semconv_1.ATTR_NETWORK_IO_DIRECTION]: semconv_1.NETWORK_IO_DIRECTION_VALUE_TRANSMIT
          });
        }
      }
      /**
       * Creates metrics
       */
      _createMetrics() {
        const observables = [];
        const systemCpuGroupEnabled = !this._metricGroups || this._metricGroups.includes("system.cpu");
        const systemMemoryGroupEnabled = !this._metricGroups || this._metricGroups.includes("system.memory");
        const systemNetworkGroupEnabled = !this._metricGroups || this._metricGroups.includes("system.network");
        const processCpuGroupEnabled = !this._metricGroups || this._metricGroups.includes("process.cpu");
        const processMemoryGroupEnabled = !this._metricGroups || this._metricGroups.includes("process.memory");
        if (systemCpuGroupEnabled) {
          this._cpuTime = this._meter.createObservableCounter(semconv_1.METRIC_SYSTEM_CPU_TIME, {
            description: "Cpu time in seconds",
            unit: "s"
          });
          observables.push(this._cpuTime);
          this._cpuUtilization = this._meter.createObservableGauge(semconv_1.METRIC_SYSTEM_CPU_UTILIZATION, {
            description: "Cpu usage time 0-1"
          });
          observables.push(this._cpuUtilization);
        }
        if (systemMemoryGroupEnabled) {
          this._memoryUsage = this._meter.createObservableGauge(semconv_1.METRIC_SYSTEM_MEMORY_USAGE, {
            description: "Memory usage in bytes"
          });
          observables.push(this._memoryUsage);
          this._memoryUtilization = this._meter.createObservableGauge(semconv_1.METRIC_SYSTEM_MEMORY_UTILIZATION, {
            description: "Memory usage 0-1"
          });
          observables.push(this._memoryUtilization);
        }
        if (systemNetworkGroupEnabled) {
          this._networkDropped = this._meter.createObservableCounter(
            // There is no semconv pkg export for this in v1.37.0 because
            // https://github.com/open-telemetry/semantic-conventions/issues/2828.
            // TODO: update to `METRIC_SYSTEM_NETWORK_PACKET_DROPPED` (breaking change)
            "system.network.dropped",
            {
              description: "Network dropped packets"
            }
          );
          observables.push(this._networkDropped);
          this._networkErrors = this._meter.createObservableCounter(semconv_1.METRIC_SYSTEM_NETWORK_ERRORS, {
            description: "Network errors counter"
          });
          observables.push(this._networkErrors);
          this._networkIo = this._meter.createObservableCounter(semconv_1.METRIC_SYSTEM_NETWORK_IO, {
            description: "Network transmit and received bytes"
          });
          observables.push(this._networkIo);
        }
        if (processCpuGroupEnabled) {
          this._processCpuTime = this._meter.createObservableCounter(semconv_1.METRIC_PROCESS_CPU_TIME, {
            description: "Process Cpu time in seconds",
            unit: "s"
          });
          observables.push(this._processCpuTime);
          this._processCpuUtilization = this._meter.createObservableGauge(semconv_1.METRIC_PROCESS_CPU_UTILIZATION, {
            description: "Process Cpu usage time 0-1"
          });
          observables.push(this._processCpuUtilization);
        }
        if (processMemoryGroupEnabled) {
          this._processMemoryUsage = this._meter.createObservableGauge(semconv_1.METRIC_PROCESS_MEMORY_USAGE, {
            description: "Process Memory usage in bytes"
          });
          observables.push(this._processMemoryUsage);
        }
        this._meter.addBatchObservableCallback(async (observableResult) => {
          if (systemCpuGroupEnabled) {
            const cpuUsages = (0, common_1.getCpuUsageData)();
            this._batchUpdateCpuUsages(observableResult, cpuUsages);
          }
          if (systemMemoryGroupEnabled) {
            const memoryUsages = (0, common_1.getMemoryData)();
            this._batchUpdateMemUsages(observableResult, memoryUsages);
          }
          if (processCpuGroupEnabled) {
            const processCpuUsages = (0, common_1.getProcessCpuUsageData)();
            this._batchUpdateProcessCpuUsages(observableResult, processCpuUsages);
          }
          if (processMemoryGroupEnabled) {
            const processMemoryUsages = (0, common_1.getProcessMemoryData)();
            this._batchUpdateProcessMemUsage(observableResult, processMemoryUsages);
          }
          if (systemNetworkGroupEnabled) {
            const networkData = await (0, si_1.getNetworkData)();
            this._batchUpdateNetworkData(observableResult, networkData);
          }
        }, observables);
      }
      /**
       * Starts collecting metrics
       */
      start() {
        this._createMetrics();
      }
      // The metrics are created in `_createMetrics`.
      _cpuTime;
      _cpuUtilization;
      _memoryUsage;
      _memoryUtilization;
      _processCpuTime;
      _processCpuUtilization;
      _processMemoryUsage;
      _networkDropped;
      _networkErrors;
      _networkIo;
    };
    exports.HostMetrics = HostMetrics2;
  }
});

// node_modules/@opentelemetry/host-metrics/build/src/index.js
var require_src2 = __commonJS({
  "node_modules/@opentelemetry/host-metrics/build/src/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HostMetrics = exports.BaseMetrics = void 0;
    var BaseMetrics_1 = require_BaseMetrics();
    Object.defineProperty(exports, "BaseMetrics", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return BaseMetrics_1.BaseMetrics;
    }, "get") });
    var metric_1 = require_metric();
    Object.defineProperty(exports, "HostMetrics", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return metric_1.HostMetrics;
    }, "get") });
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.js
var require_default_service_name = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultServiceName = void 0;
    function defaultServiceName() {
      return `unknown_service:${process.argv0}`;
    }
    __name(defaultServiceName, "defaultServiceName");
    exports.defaultServiceName = defaultServiceName;
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/index.js
var require_node = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultServiceName = void 0;
    var default_service_name_1 = require_default_service_name();
    Object.defineProperty(exports, "defaultServiceName", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return default_service_name_1.defaultServiceName;
    }, "get") });
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/index.js
var require_platform = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultServiceName = void 0;
    var node_1 = require_node();
    Object.defineProperty(exports, "defaultServiceName", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return node_1.defaultServiceName;
    }, "get") });
  }
});

// node_modules/@opentelemetry/resources/build/src/utils.js
var require_utils = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/utils.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.identity = exports.isPromiseLike = void 0;
    var isPromiseLike = /* @__PURE__ */ __name((val) => {
      return val !== null && typeof val === "object" && typeof val.then === "function";
    }, "isPromiseLike");
    exports.isPromiseLike = isPromiseLike;
    function identity(_) {
      return _;
    }
    __name(identity, "identity");
    exports.identity = identity;
  }
});

// node_modules/@opentelemetry/resources/build/src/ResourceImpl.js
var require_ResourceImpl = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/ResourceImpl.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultResource = exports.emptyResource = exports.resourceFromDetectedResource = exports.resourceFromAttributes = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var core_1 = require_src();
    var semantic_conventions_1 = (init_esm3(), __toCommonJS(esm_exports2));
    var platform_1 = require_platform();
    var utils_1 = require_utils();
    var ResourceImpl = class _ResourceImpl {
      static {
        __name(this, "ResourceImpl");
      }
      _rawAttributes;
      _asyncAttributesPending = false;
      _memoizedAttributes;
      static FromAttributeList(attributes) {
        const res = new _ResourceImpl({});
        res._rawAttributes = guardedRawAttributes(attributes);
        res._asyncAttributesPending = attributes.filter(([_, val]) => (0, utils_1.isPromiseLike)(val)).length > 0;
        return res;
      }
      constructor(resource) {
        const attributes = resource.attributes ?? {};
        this._rawAttributes = Object.entries(attributes).map(([k, v]) => {
          if ((0, utils_1.isPromiseLike)(v)) {
            this._asyncAttributesPending = true;
          }
          return [k, v];
        });
        this._rawAttributes = guardedRawAttributes(this._rawAttributes);
      }
      get asyncAttributesPending() {
        return this._asyncAttributesPending;
      }
      async waitForAsyncAttributes() {
        if (!this.asyncAttributesPending) {
          return;
        }
        for (let i = 0; i < this._rawAttributes.length; i++) {
          const [k, v] = this._rawAttributes[i];
          this._rawAttributes[i] = [k, (0, utils_1.isPromiseLike)(v) ? await v : v];
        }
        this._asyncAttributesPending = false;
      }
      get attributes() {
        if (this.asyncAttributesPending) {
          api_1.diag.error("Accessing resource attributes before async attributes settled");
        }
        if (this._memoizedAttributes) {
          return this._memoizedAttributes;
        }
        const attrs = {};
        for (const [k, v] of this._rawAttributes) {
          if ((0, utils_1.isPromiseLike)(v)) {
            api_1.diag.debug(`Unsettled resource attribute ${k} skipped`);
            continue;
          }
          if (v != null) {
            attrs[k] ??= v;
          }
        }
        if (!this._asyncAttributesPending) {
          this._memoizedAttributes = attrs;
        }
        return attrs;
      }
      getRawAttributes() {
        return this._rawAttributes;
      }
      merge(resource) {
        if (resource == null)
          return this;
        return _ResourceImpl.FromAttributeList([
          ...resource.getRawAttributes(),
          ...this.getRawAttributes()
        ]);
      }
    };
    function resourceFromAttributes(attributes) {
      return ResourceImpl.FromAttributeList(Object.entries(attributes));
    }
    __name(resourceFromAttributes, "resourceFromAttributes");
    exports.resourceFromAttributes = resourceFromAttributes;
    function resourceFromDetectedResource(detectedResource) {
      return new ResourceImpl(detectedResource);
    }
    __name(resourceFromDetectedResource, "resourceFromDetectedResource");
    exports.resourceFromDetectedResource = resourceFromDetectedResource;
    function emptyResource() {
      return resourceFromAttributes({});
    }
    __name(emptyResource, "emptyResource");
    exports.emptyResource = emptyResource;
    function defaultResource() {
      return resourceFromAttributes({
        [semantic_conventions_1.ATTR_SERVICE_NAME]: (0, platform_1.defaultServiceName)(),
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_LANGUAGE]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_LANGUAGE],
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_NAME]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_NAME],
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_VERSION]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_VERSION]
      });
    }
    __name(defaultResource, "defaultResource");
    exports.defaultResource = defaultResource;
    function guardedRawAttributes(attributes) {
      return attributes.map(([k, v]) => {
        if ((0, utils_1.isPromiseLike)(v)) {
          return [
            k,
            v.catch((err) => {
              api_1.diag.debug("promise rejection for resource attribute: %s - %s", k, err);
              return void 0;
            })
          ];
        }
        return [k, v];
      });
    }
    __name(guardedRawAttributes, "guardedRawAttributes");
  }
});

// node_modules/@opentelemetry/resources/build/src/detect-resources.js
var require_detect_resources = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detect-resources.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.detectResources = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var ResourceImpl_1 = require_ResourceImpl();
    var detectResources = /* @__PURE__ */ __name((config = {}) => {
      const resources = (config.detectors || []).map((d) => {
        try {
          const resource = (0, ResourceImpl_1.resourceFromDetectedResource)(d.detect(config));
          api_1.diag.debug(`${d.constructor.name} found resource.`, resource);
          return resource;
        } catch (e) {
          api_1.diag.debug(`${d.constructor.name} failed: ${e.message}`);
          return (0, ResourceImpl_1.emptyResource)();
        }
      });
      return resources.reduce((acc, resource) => acc.merge(resource), (0, ResourceImpl_1.emptyResource)());
    }, "detectResources");
    exports.detectResources = detectResources;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js
var require_EnvDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.envDetector = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var semantic_conventions_1 = (init_esm3(), __toCommonJS(esm_exports2));
    var core_1 = require_src();
    var EnvDetector = class {
      static {
        __name(this, "EnvDetector");
      }
      // Type, attribute keys, and attribute values should not exceed 256 characters.
      _MAX_LENGTH = 255;
      // OTEL_RESOURCE_ATTRIBUTES is a comma-separated list of attributes.
      _COMMA_SEPARATOR = ",";
      // OTEL_RESOURCE_ATTRIBUTES contains key value pair separated by '='.
      _LABEL_KEY_VALUE_SPLITTER = "=";
      _ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.";
      _ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
      /**
       * Returns a {@link Resource} populated with attributes from the
       * OTEL_RESOURCE_ATTRIBUTES environment variable. Note this is an async
       * function to conform to the Detector interface.
       *
       * @param config The resource detection config
       */
      detect(_config) {
        const attributes = {};
        const rawAttributes = (0, core_1.getStringFromEnv)("OTEL_RESOURCE_ATTRIBUTES");
        const serviceName = (0, core_1.getStringFromEnv)("OTEL_SERVICE_NAME");
        if (rawAttributes) {
          try {
            const parsedAttributes = this._parseResourceAttributes(rawAttributes);
            Object.assign(attributes, parsedAttributes);
          } catch (e) {
            api_1.diag.debug(`EnvDetector failed: ${e.message}`);
          }
        }
        if (serviceName) {
          attributes[semantic_conventions_1.ATTR_SERVICE_NAME] = serviceName;
        }
        return { attributes };
      }
      /**
       * Creates an attribute map from the OTEL_RESOURCE_ATTRIBUTES environment
       * variable.
       *
       * OTEL_RESOURCE_ATTRIBUTES: A comma-separated list of attributes describing
       * the source in more detail, e.g. “key1=val1,key2=val2”. Domain names and
       * paths are accepted as attribute keys. Values may be quoted or unquoted in
       * general. If a value contains whitespace, =, or " characters, it must
       * always be quoted.
       *
       * @param rawEnvAttributes The resource attributes as a comma-separated list
       * of key/value pairs.
       * @returns The sanitized resource attributes.
       */
      _parseResourceAttributes(rawEnvAttributes) {
        if (!rawEnvAttributes)
          return {};
        const attributes = {};
        const rawAttributes = rawEnvAttributes.split(this._COMMA_SEPARATOR, -1);
        for (const rawAttribute of rawAttributes) {
          const keyValuePair = rawAttribute.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
          if (keyValuePair.length !== 2) {
            continue;
          }
          let [key, value] = keyValuePair;
          key = key.trim();
          value = value.trim().split(/^"|"$/).join("");
          if (!this._isValidAndNotEmpty(key)) {
            throw new Error(`Attribute key ${this._ERROR_MESSAGE_INVALID_CHARS}`);
          }
          if (!this._isValid(value)) {
            throw new Error(`Attribute value ${this._ERROR_MESSAGE_INVALID_VALUE}`);
          }
          attributes[key] = decodeURIComponent(value);
        }
        return attributes;
      }
      /**
       * Determines whether the given String is a valid printable ASCII string with
       * a length not exceed _MAX_LENGTH characters.
       *
       * @param str The String to be validated.
       * @returns Whether the String is valid.
       */
      _isValid(name) {
        return name.length <= this._MAX_LENGTH && this._isBaggageOctetString(name);
      }
      // https://www.w3.org/TR/baggage/#definition
      _isBaggageOctetString(str) {
        for (let i = 0; i < str.length; i++) {
          const ch = str.charCodeAt(i);
          if (ch < 33 || ch === 44 || ch === 59 || ch === 92 || ch > 126) {
            return false;
          }
        }
        return true;
      }
      /**
       * Determines whether the given String is a valid printable ASCII string with
       * a length greater than 0 and not exceed _MAX_LENGTH characters.
       *
       * @param str The String to be validated.
       * @returns Whether the String is valid and not empty.
       */
      _isValidAndNotEmpty(str) {
        return str.length > 0 && this._isValid(str);
      }
    };
    exports.envDetector = new EnvDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/semconv.js
var require_semconv2 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/semconv.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ATTR_WEBENGINE_VERSION = exports.ATTR_WEBENGINE_NAME = exports.ATTR_WEBENGINE_DESCRIPTION = exports.ATTR_SERVICE_NAMESPACE = exports.ATTR_SERVICE_INSTANCE_ID = exports.ATTR_PROCESS_RUNTIME_VERSION = exports.ATTR_PROCESS_RUNTIME_NAME = exports.ATTR_PROCESS_RUNTIME_DESCRIPTION = exports.ATTR_PROCESS_PID = exports.ATTR_PROCESS_OWNER = exports.ATTR_PROCESS_EXECUTABLE_PATH = exports.ATTR_PROCESS_EXECUTABLE_NAME = exports.ATTR_PROCESS_COMMAND_ARGS = exports.ATTR_PROCESS_COMMAND = exports.ATTR_OS_VERSION = exports.ATTR_OS_TYPE = exports.ATTR_K8S_POD_NAME = exports.ATTR_K8S_NAMESPACE_NAME = exports.ATTR_K8S_DEPLOYMENT_NAME = exports.ATTR_K8S_CLUSTER_NAME = exports.ATTR_HOST_TYPE = exports.ATTR_HOST_NAME = exports.ATTR_HOST_IMAGE_VERSION = exports.ATTR_HOST_IMAGE_NAME = exports.ATTR_HOST_IMAGE_ID = exports.ATTR_HOST_ID = exports.ATTR_HOST_ARCH = exports.ATTR_CONTAINER_NAME = exports.ATTR_CONTAINER_IMAGE_TAGS = exports.ATTR_CONTAINER_IMAGE_NAME = exports.ATTR_CONTAINER_ID = exports.ATTR_CLOUD_REGION = exports.ATTR_CLOUD_PROVIDER = exports.ATTR_CLOUD_AVAILABILITY_ZONE = exports.ATTR_CLOUD_ACCOUNT_ID = void 0;
    exports.ATTR_CLOUD_ACCOUNT_ID = "cloud.account.id";
    exports.ATTR_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
    exports.ATTR_CLOUD_PROVIDER = "cloud.provider";
    exports.ATTR_CLOUD_REGION = "cloud.region";
    exports.ATTR_CONTAINER_ID = "container.id";
    exports.ATTR_CONTAINER_IMAGE_NAME = "container.image.name";
    exports.ATTR_CONTAINER_IMAGE_TAGS = "container.image.tags";
    exports.ATTR_CONTAINER_NAME = "container.name";
    exports.ATTR_HOST_ARCH = "host.arch";
    exports.ATTR_HOST_ID = "host.id";
    exports.ATTR_HOST_IMAGE_ID = "host.image.id";
    exports.ATTR_HOST_IMAGE_NAME = "host.image.name";
    exports.ATTR_HOST_IMAGE_VERSION = "host.image.version";
    exports.ATTR_HOST_NAME = "host.name";
    exports.ATTR_HOST_TYPE = "host.type";
    exports.ATTR_K8S_CLUSTER_NAME = "k8s.cluster.name";
    exports.ATTR_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    exports.ATTR_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    exports.ATTR_K8S_POD_NAME = "k8s.pod.name";
    exports.ATTR_OS_TYPE = "os.type";
    exports.ATTR_OS_VERSION = "os.version";
    exports.ATTR_PROCESS_COMMAND = "process.command";
    exports.ATTR_PROCESS_COMMAND_ARGS = "process.command_args";
    exports.ATTR_PROCESS_EXECUTABLE_NAME = "process.executable.name";
    exports.ATTR_PROCESS_EXECUTABLE_PATH = "process.executable.path";
    exports.ATTR_PROCESS_OWNER = "process.owner";
    exports.ATTR_PROCESS_PID = "process.pid";
    exports.ATTR_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
    exports.ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";
    exports.ATTR_PROCESS_RUNTIME_VERSION = "process.runtime.version";
    exports.ATTR_SERVICE_INSTANCE_ID = "service.instance.id";
    exports.ATTR_SERVICE_NAMESPACE = "service.namespace";
    exports.ATTR_WEBENGINE_DESCRIPTION = "webengine.description";
    exports.ATTR_WEBENGINE_NAME = "webengine.name";
    exports.ATTR_WEBENGINE_VERSION = "webengine.version";
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId.js
var require_getMachineId = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMachineId = void 0;
    var process2 = __require("process");
    var getMachineIdImpl;
    async function getMachineId() {
      if (!getMachineIdImpl) {
        switch (process2.platform) {
          case "darwin":
            getMachineIdImpl = (await import("../../../getMachineId-darwin-LVYPKUBJ.mjs")).getMachineId;
            break;
          case "linux":
            getMachineIdImpl = (await import("../../../getMachineId-linux-GJPBMAFK.mjs")).getMachineId;
            break;
          case "freebsd":
            getMachineIdImpl = (await import("../../../getMachineId-bsd-555KDEXS.mjs")).getMachineId;
            break;
          case "win32":
            getMachineIdImpl = (await import("../../../getMachineId-win-OMTHI32D.mjs")).getMachineId;
            break;
          default:
            getMachineIdImpl = (await import("../../../getMachineId-unsupported-TQAFHKEL.mjs")).getMachineId;
            break;
        }
      }
      return getMachineIdImpl();
    }
    __name(getMachineId, "getMachineId");
    exports.getMachineId = getMachineId;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/utils.js
var require_utils2 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/utils.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalizeType = exports.normalizeArch = void 0;
    var normalizeArch = /* @__PURE__ */ __name((nodeArchString) => {
      switch (nodeArchString) {
        case "arm":
          return "arm32";
        case "ppc":
          return "ppc32";
        case "x64":
          return "amd64";
        default:
          return nodeArchString;
      }
    }, "normalizeArch");
    exports.normalizeArch = normalizeArch;
    var normalizeType = /* @__PURE__ */ __name((nodePlatform) => {
      switch (nodePlatform) {
        case "sunos":
          return "solaris";
        case "win32":
          return "windows";
        default:
          return nodePlatform;
      }
    }, "normalizeType");
    exports.normalizeType = normalizeType;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/HostDetector.js
var require_HostDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/HostDetector.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hostDetector = void 0;
    var semconv_1 = require_semconv2();
    var os_1 = __require("os");
    var getMachineId_1 = require_getMachineId();
    var utils_1 = require_utils2();
    var HostDetector = class {
      static {
        __name(this, "HostDetector");
      }
      detect(_config) {
        const attributes = {
          [semconv_1.ATTR_HOST_NAME]: (0, os_1.hostname)(),
          [semconv_1.ATTR_HOST_ARCH]: (0, utils_1.normalizeArch)((0, os_1.arch)()),
          [semconv_1.ATTR_HOST_ID]: (0, getMachineId_1.getMachineId)()
        };
        return { attributes };
      }
    };
    exports.hostDetector = new HostDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/OSDetector.js
var require_OSDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/OSDetector.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.osDetector = void 0;
    var semconv_1 = require_semconv2();
    var os_1 = __require("os");
    var utils_1 = require_utils2();
    var OSDetector = class {
      static {
        __name(this, "OSDetector");
      }
      detect(_config) {
        const attributes = {
          [semconv_1.ATTR_OS_TYPE]: (0, utils_1.normalizeType)((0, os_1.platform)()),
          [semconv_1.ATTR_OS_VERSION]: (0, os_1.release)()
        };
        return { attributes };
      }
    };
    exports.osDetector = new OSDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ProcessDetector.js
var require_ProcessDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ProcessDetector.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processDetector = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var semconv_1 = require_semconv2();
    var os = __require("os");
    var ProcessDetector = class {
      static {
        __name(this, "ProcessDetector");
      }
      detect(_config) {
        const attributes = {
          [semconv_1.ATTR_PROCESS_PID]: process.pid,
          [semconv_1.ATTR_PROCESS_EXECUTABLE_NAME]: process.title,
          [semconv_1.ATTR_PROCESS_EXECUTABLE_PATH]: process.execPath,
          [semconv_1.ATTR_PROCESS_COMMAND_ARGS]: [
            process.argv[0],
            ...process.execArgv,
            ...process.argv.slice(1)
          ],
          [semconv_1.ATTR_PROCESS_RUNTIME_VERSION]: process.versions.node,
          [semconv_1.ATTR_PROCESS_RUNTIME_NAME]: "nodejs",
          [semconv_1.ATTR_PROCESS_RUNTIME_DESCRIPTION]: "Node.js"
        };
        if (process.argv.length > 1) {
          attributes[semconv_1.ATTR_PROCESS_COMMAND] = process.argv[1];
        }
        try {
          const userInfo = os.userInfo();
          attributes[semconv_1.ATTR_PROCESS_OWNER] = userInfo.username;
        } catch (e) {
          api_1.diag.debug(`error obtaining process owner: ${e}`);
        }
        return { attributes };
      }
    };
    exports.processDetector = new ProcessDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ServiceInstanceIdDetector.js
var require_ServiceInstanceIdDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ServiceInstanceIdDetector.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceInstanceIdDetector = void 0;
    var semconv_1 = require_semconv2();
    var crypto_1 = __require("crypto");
    var ServiceInstanceIdDetector = class {
      static {
        __name(this, "ServiceInstanceIdDetector");
      }
      detect(_config) {
        return {
          attributes: {
            [semconv_1.ATTR_SERVICE_INSTANCE_ID]: (0, crypto_1.randomUUID)()
          }
        };
      }
    };
    exports.serviceInstanceIdDetector = new ServiceInstanceIdDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/index.js
var require_node2 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceInstanceIdDetector = exports.processDetector = exports.osDetector = exports.hostDetector = void 0;
    var HostDetector_1 = require_HostDetector();
    Object.defineProperty(exports, "hostDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return HostDetector_1.hostDetector;
    }, "get") });
    var OSDetector_1 = require_OSDetector();
    Object.defineProperty(exports, "osDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return OSDetector_1.osDetector;
    }, "get") });
    var ProcessDetector_1 = require_ProcessDetector();
    Object.defineProperty(exports, "processDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ProcessDetector_1.processDetector;
    }, "get") });
    var ServiceInstanceIdDetector_1 = require_ServiceInstanceIdDetector();
    Object.defineProperty(exports, "serviceInstanceIdDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ServiceInstanceIdDetector_1.serviceInstanceIdDetector;
    }, "get") });
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/index.js
var require_platform2 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serviceInstanceIdDetector = exports.processDetector = exports.osDetector = exports.hostDetector = void 0;
    var node_1 = require_node2();
    Object.defineProperty(exports, "hostDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return node_1.hostDetector;
    }, "get") });
    Object.defineProperty(exports, "osDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return node_1.osDetector;
    }, "get") });
    Object.defineProperty(exports, "processDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return node_1.processDetector;
    }, "get") });
    Object.defineProperty(exports, "serviceInstanceIdDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return node_1.serviceInstanceIdDetector;
    }, "get") });
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/NoopDetector.js
var require_NoopDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/NoopDetector.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noopDetector = exports.NoopDetector = void 0;
    var NoopDetector = class {
      static {
        __name(this, "NoopDetector");
      }
      detect() {
        return {
          attributes: {}
        };
      }
    };
    exports.NoopDetector = NoopDetector;
    exports.noopDetector = new NoopDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/index.js
var require_detectors = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noopDetector = exports.serviceInstanceIdDetector = exports.processDetector = exports.osDetector = exports.hostDetector = exports.envDetector = void 0;
    var EnvDetector_1 = require_EnvDetector();
    Object.defineProperty(exports, "envDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return EnvDetector_1.envDetector;
    }, "get") });
    var platform_1 = require_platform2();
    Object.defineProperty(exports, "hostDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.hostDetector;
    }, "get") });
    Object.defineProperty(exports, "osDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.osDetector;
    }, "get") });
    Object.defineProperty(exports, "processDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.processDetector;
    }, "get") });
    Object.defineProperty(exports, "serviceInstanceIdDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.serviceInstanceIdDetector;
    }, "get") });
    var NoopDetector_1 = require_NoopDetector();
    Object.defineProperty(exports, "noopDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return NoopDetector_1.noopDetector;
    }, "get") });
  }
});

// node_modules/@opentelemetry/resources/build/src/index.js
var require_src3 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultServiceName = exports.emptyResource = exports.defaultResource = exports.resourceFromAttributes = exports.serviceInstanceIdDetector = exports.processDetector = exports.osDetector = exports.hostDetector = exports.envDetector = exports.detectResources = void 0;
    var detect_resources_1 = require_detect_resources();
    Object.defineProperty(exports, "detectResources", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return detect_resources_1.detectResources;
    }, "get") });
    var detectors_1 = require_detectors();
    Object.defineProperty(exports, "envDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return detectors_1.envDetector;
    }, "get") });
    Object.defineProperty(exports, "hostDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return detectors_1.hostDetector;
    }, "get") });
    Object.defineProperty(exports, "osDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return detectors_1.osDetector;
    }, "get") });
    Object.defineProperty(exports, "processDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return detectors_1.processDetector;
    }, "get") });
    Object.defineProperty(exports, "serviceInstanceIdDetector", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return detectors_1.serviceInstanceIdDetector;
    }, "get") });
    var ResourceImpl_1 = require_ResourceImpl();
    Object.defineProperty(exports, "resourceFromAttributes", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ResourceImpl_1.resourceFromAttributes;
    }, "get") });
    Object.defineProperty(exports, "defaultResource", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ResourceImpl_1.defaultResource;
    }, "get") });
    Object.defineProperty(exports, "emptyResource", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ResourceImpl_1.emptyResource;
    }, "get") });
    var platform_1 = require_platform();
    Object.defineProperty(exports, "defaultServiceName", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.defaultServiceName;
    }, "get") });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/enums.js
var require_enums = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/enums.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExceptionEventName = void 0;
    exports.ExceptionEventName = "exception";
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/Span.js
var require_Span = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/Span.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanImpl = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var core_1 = require_src();
    var semantic_conventions_1 = (init_esm3(), __toCommonJS(esm_exports2));
    var enums_1 = require_enums();
    var SpanImpl = class {
      static {
        __name(this, "SpanImpl");
      }
      // Below properties are included to implement ReadableSpan for export
      // purposes but are not intended to be written-to directly.
      _spanContext;
      kind;
      parentSpanContext;
      attributes = {};
      links = [];
      events = [];
      startTime;
      resource;
      instrumentationScope;
      _droppedAttributesCount = 0;
      _droppedEventsCount = 0;
      _droppedLinksCount = 0;
      name;
      status = {
        code: api_1.SpanStatusCode.UNSET
      };
      endTime = [0, 0];
      _ended = false;
      _duration = [-1, -1];
      _spanProcessor;
      _spanLimits;
      _attributeValueLengthLimit;
      _performanceStartTime;
      _performanceOffset;
      _startTimeProvided;
      /**
       * Constructs a new SpanImpl instance.
       */
      constructor(opts) {
        const now = Date.now();
        this._spanContext = opts.spanContext;
        this._performanceStartTime = core_1.otperformance.now();
        this._performanceOffset = now - (this._performanceStartTime + (0, core_1.getTimeOrigin)());
        this._startTimeProvided = opts.startTime != null;
        this._spanLimits = opts.spanLimits;
        this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
        this._spanProcessor = opts.spanProcessor;
        this.name = opts.name;
        this.parentSpanContext = opts.parentSpanContext;
        this.kind = opts.kind;
        this.links = opts.links || [];
        this.startTime = this._getTime(opts.startTime ?? now);
        this.resource = opts.resource;
        this.instrumentationScope = opts.scope;
        if (opts.attributes != null) {
          this.setAttributes(opts.attributes);
        }
        this._spanProcessor.onStart(this, opts.context);
      }
      spanContext() {
        return this._spanContext;
      }
      setAttribute(key, value) {
        if (value == null || this._isSpanEnded())
          return this;
        if (key.length === 0) {
          api_1.diag.warn(`Invalid attribute key: ${key}`);
          return this;
        }
        if (!(0, core_1.isAttributeValue)(value)) {
          api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
          return this;
        }
        const { attributeCountLimit } = this._spanLimits;
        if (attributeCountLimit !== void 0 && Object.keys(this.attributes).length >= attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
          this._droppedAttributesCount++;
          return this;
        }
        this.attributes[key] = this._truncateToSize(value);
        return this;
      }
      setAttributes(attributes) {
        for (const [k, v] of Object.entries(attributes)) {
          this.setAttribute(k, v);
        }
        return this;
      }
      /**
       *
       * @param name Span Name
       * @param [attributesOrStartTime] Span attributes or start time
       *     if type is {@type TimeInput} and 3rd param is undefined
       * @param [timeStamp] Specified time stamp for the event
       */
      addEvent(name, attributesOrStartTime, timeStamp) {
        if (this._isSpanEnded())
          return this;
        const { eventCountLimit } = this._spanLimits;
        if (eventCountLimit === 0) {
          api_1.diag.warn("No events allowed.");
          this._droppedEventsCount++;
          return this;
        }
        if (eventCountLimit !== void 0 && this.events.length >= eventCountLimit) {
          if (this._droppedEventsCount === 0) {
            api_1.diag.debug("Dropping extra events.");
          }
          this.events.shift();
          this._droppedEventsCount++;
        }
        if ((0, core_1.isTimeInput)(attributesOrStartTime)) {
          if (!(0, core_1.isTimeInput)(timeStamp)) {
            timeStamp = attributesOrStartTime;
          }
          attributesOrStartTime = void 0;
        }
        const attributes = (0, core_1.sanitizeAttributes)(attributesOrStartTime);
        this.events.push({
          name,
          attributes,
          time: this._getTime(timeStamp),
          droppedAttributesCount: 0
        });
        return this;
      }
      addLink(link) {
        this.links.push(link);
        return this;
      }
      addLinks(links) {
        this.links.push(...links);
        return this;
      }
      setStatus(status) {
        if (this._isSpanEnded())
          return this;
        this.status = { ...status };
        if (this.status.message != null && typeof status.message !== "string") {
          api_1.diag.warn(`Dropping invalid status.message of type '${typeof status.message}', expected 'string'`);
          delete this.status.message;
        }
        return this;
      }
      updateName(name) {
        if (this._isSpanEnded())
          return this;
        this.name = name;
        return this;
      }
      end(endTime) {
        if (this._isSpanEnded()) {
          api_1.diag.error(`${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`);
          return;
        }
        this._ended = true;
        this.endTime = this._getTime(endTime);
        this._duration = (0, core_1.hrTimeDuration)(this.startTime, this.endTime);
        if (this._duration[0] < 0) {
          api_1.diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
          this.endTime = this.startTime.slice();
          this._duration = [0, 0];
        }
        if (this._droppedEventsCount > 0) {
          api_1.diag.warn(`Dropped ${this._droppedEventsCount} events because eventCountLimit reached`);
        }
        this._spanProcessor.onEnd(this);
      }
      _getTime(inp) {
        if (typeof inp === "number" && inp <= core_1.otperformance.now()) {
          return (0, core_1.hrTime)(inp + this._performanceOffset);
        }
        if (typeof inp === "number") {
          return (0, core_1.millisToHrTime)(inp);
        }
        if (inp instanceof Date) {
          return (0, core_1.millisToHrTime)(inp.getTime());
        }
        if ((0, core_1.isTimeInputHrTime)(inp)) {
          return inp;
        }
        if (this._startTimeProvided) {
          return (0, core_1.millisToHrTime)(Date.now());
        }
        const msDuration = core_1.otperformance.now() - this._performanceStartTime;
        return (0, core_1.addHrTimes)(this.startTime, (0, core_1.millisToHrTime)(msDuration));
      }
      isRecording() {
        return this._ended === false;
      }
      recordException(exception, time) {
        const attributes = {};
        if (typeof exception === "string") {
          attributes[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE] = exception;
        } else if (exception) {
          if (exception.code) {
            attributes[semantic_conventions_1.ATTR_EXCEPTION_TYPE] = exception.code.toString();
          } else if (exception.name) {
            attributes[semantic_conventions_1.ATTR_EXCEPTION_TYPE] = exception.name;
          }
          if (exception.message) {
            attributes[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE] = exception.message;
          }
          if (exception.stack) {
            attributes[semantic_conventions_1.ATTR_EXCEPTION_STACKTRACE] = exception.stack;
          }
        }
        if (attributes[semantic_conventions_1.ATTR_EXCEPTION_TYPE] || attributes[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE]) {
          this.addEvent(enums_1.ExceptionEventName, attributes, time);
        } else {
          api_1.diag.warn(`Failed to record an exception ${exception}`);
        }
      }
      get duration() {
        return this._duration;
      }
      get ended() {
        return this._ended;
      }
      get droppedAttributesCount() {
        return this._droppedAttributesCount;
      }
      get droppedEventsCount() {
        return this._droppedEventsCount;
      }
      get droppedLinksCount() {
        return this._droppedLinksCount;
      }
      _isSpanEnded() {
        if (this._ended) {
          const error = new Error(`Operation attempted on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`);
          api_1.diag.warn(`Cannot execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`, error);
        }
        return this._ended;
      }
      // Utility function to truncate given value within size
      // for value type of string, will truncate to given limit
      // for type of non-string, will return same value
      _truncateToLimitUtil(value, limit) {
        if (value.length <= limit) {
          return value;
        }
        return value.substring(0, limit);
      }
      /**
       * If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
       * return string with truncated to {@code attributeValueLengthLimit} characters
       *
       * If the given attribute value is array of strings then
       * return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
       *
       * Otherwise return same Attribute {@code value}
       *
       * @param value Attribute value
       * @returns truncated attribute value if required, otherwise same value
       */
      _truncateToSize(value) {
        const limit = this._attributeValueLengthLimit;
        if (limit <= 0) {
          api_1.diag.warn(`Attribute value limit must be positive, got ${limit}`);
          return value;
        }
        if (typeof value === "string") {
          return this._truncateToLimitUtil(value, limit);
        }
        if (Array.isArray(value)) {
          return value.map((val) => typeof val === "string" ? this._truncateToLimitUtil(val, limit) : val);
        }
        return value;
      }
    };
    exports.SpanImpl = SpanImpl;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.js
var require_Sampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamplingDecision = void 0;
    var SamplingDecision;
    (function(SamplingDecision2) {
      SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
      SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision = exports.SamplingDecision || (exports.SamplingDecision = {}));
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.js
var require_AlwaysOffSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOffSampler = void 0;
    var Sampler_1 = require_Sampler();
    var AlwaysOffSampler = class {
      static {
        __name(this, "AlwaysOffSampler");
      }
      shouldSample() {
        return {
          decision: Sampler_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return "AlwaysOffSampler";
      }
    };
    exports.AlwaysOffSampler = AlwaysOffSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.js
var require_AlwaysOnSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOnSampler = void 0;
    var Sampler_1 = require_Sampler();
    var AlwaysOnSampler = class {
      static {
        __name(this, "AlwaysOnSampler");
      }
      shouldSample() {
        return {
          decision: Sampler_1.SamplingDecision.RECORD_AND_SAMPLED
        };
      }
      toString() {
        return "AlwaysOnSampler";
      }
    };
    exports.AlwaysOnSampler = AlwaysOnSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.js
var require_ParentBasedSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParentBasedSampler = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var core_1 = require_src();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    var ParentBasedSampler = class {
      static {
        __name(this, "ParentBasedSampler");
      }
      _root;
      _remoteParentSampled;
      _remoteParentNotSampled;
      _localParentSampled;
      _localParentNotSampled;
      constructor(config) {
        this._root = config.root;
        if (!this._root) {
          (0, core_1.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler_1.AlwaysOnSampler();
        }
        this._remoteParentSampled = config.remoteParentSampled ?? new AlwaysOnSampler_1.AlwaysOnSampler();
        this._remoteParentNotSampled = config.remoteParentNotSampled ?? new AlwaysOffSampler_1.AlwaysOffSampler();
        this._localParentSampled = config.localParentSampled ?? new AlwaysOnSampler_1.AlwaysOnSampler();
        this._localParentNotSampled = config.localParentNotSampled ?? new AlwaysOffSampler_1.AlwaysOffSampler();
      }
      shouldSample(context, traceId, spanName, spanKind, attributes, links) {
        const parentContext = api_1.trace.getSpanContext(context);
        if (!parentContext || !(0, api_1.isSpanContextValid)(parentContext)) {
          return this._root.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
          }
          return this._remoteParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        return this._localParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
      }
      toString() {
        return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
      }
    };
    exports.ParentBasedSampler = ParentBasedSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.js
var require_TraceIdRatioBasedSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceIdRatioBasedSampler = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var Sampler_1 = require_Sampler();
    var TraceIdRatioBasedSampler = class {
      static {
        __name(this, "TraceIdRatioBasedSampler");
      }
      _ratio;
      _upperBound;
      constructor(_ratio = 0) {
        this._ratio = _ratio;
        this._ratio = this._normalize(_ratio);
        this._upperBound = Math.floor(this._ratio * 4294967295);
      }
      shouldSample(context, traceId) {
        return {
          decision: (0, api_1.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? Sampler_1.SamplingDecision.RECORD_AND_SAMPLED : Sampler_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return `TraceIdRatioBased{${this._ratio}}`;
      }
      _normalize(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio))
          return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      }
      _accumulate(traceId) {
        let accumulation = 0;
        for (let i = 0; i < traceId.length / 8; i++) {
          const pos = i * 8;
          const part = parseInt(traceId.slice(pos, pos + 8), 16);
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      }
    };
    exports.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/config.js
var require_config = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/config.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildSamplerFromEnv = exports.loadDefaultConfig = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var core_1 = require_src();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    var ParentBasedSampler_1 = require_ParentBasedSampler();
    var TraceIdRatioBasedSampler_1 = require_TraceIdRatioBasedSampler();
    var DEFAULT_RATIO = 1;
    function loadDefaultConfig() {
      return {
        sampler: buildSamplerFromEnv(),
        forceFlushTimeoutMillis: 3e4,
        generalLimits: {
          attributeValueLengthLimit: (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
          attributeCountLimit: (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128
        },
        spanLimits: {
          attributeValueLengthLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
          attributeCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? 128,
          linkCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_LINK_COUNT_LIMIT") ?? 128,
          eventCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_EVENT_COUNT_LIMIT") ?? 128,
          attributePerEventCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT") ?? 128,
          attributePerLinkCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT") ?? 128
        }
      };
    }
    __name(loadDefaultConfig, "loadDefaultConfig");
    exports.loadDefaultConfig = loadDefaultConfig;
    function buildSamplerFromEnv() {
      const sampler = (0, core_1.getStringFromEnv)("OTEL_TRACES_SAMPLER") ?? "parentbased_always_on";
      switch (sampler) {
        case "always_on":
          return new AlwaysOnSampler_1.AlwaysOnSampler();
        case "always_off":
          return new AlwaysOffSampler_1.AlwaysOffSampler();
        case "parentbased_always_on":
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOnSampler_1.AlwaysOnSampler()
          });
        case "parentbased_always_off":
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOffSampler_1.AlwaysOffSampler()
          });
        case "traceidratio":
          return new TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv());
        case "parentbased_traceidratio":
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv())
          });
        default:
          api_1.diag.error(`OTEL_TRACES_SAMPLER value "${sampler}" invalid, defaulting to "${"parentbased_always_on"}".`);
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOnSampler_1.AlwaysOnSampler()
          });
      }
    }
    __name(buildSamplerFromEnv, "buildSamplerFromEnv");
    exports.buildSamplerFromEnv = buildSamplerFromEnv;
    function getSamplerProbabilityFromEnv() {
      const probability = (0, core_1.getNumberFromEnv)("OTEL_TRACES_SAMPLER_ARG");
      if (probability == null) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      if (probability < 0 || probability > 1) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${probability} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      return probability;
    }
    __name(getSamplerProbabilityFromEnv, "getSamplerProbabilityFromEnv");
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js
var require_utility = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reconfigureLimits = exports.mergeConfig = exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT = void 0;
    var config_1 = require_config();
    var core_1 = require_src();
    exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
    exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
    function mergeConfig(userConfig) {
      const perInstanceDefaults = {
        sampler: (0, config_1.buildSamplerFromEnv)()
      };
      const DEFAULT_CONFIG = (0, config_1.loadDefaultConfig)();
      const target = Object.assign({}, DEFAULT_CONFIG, perInstanceDefaults, userConfig);
      target.generalLimits = Object.assign({}, DEFAULT_CONFIG.generalLimits, userConfig.generalLimits || {});
      target.spanLimits = Object.assign({}, DEFAULT_CONFIG.spanLimits, userConfig.spanLimits || {});
      return target;
    }
    __name(mergeConfig, "mergeConfig");
    exports.mergeConfig = mergeConfig;
    function reconfigureLimits(userConfig) {
      const spanLimits = Object.assign({}, userConfig.spanLimits);
      spanLimits.attributeCountLimit = userConfig.spanLimits?.attributeCountLimit ?? userConfig.generalLimits?.attributeCountLimit ?? (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT;
      spanLimits.attributeValueLengthLimit = userConfig.spanLimits?.attributeValueLengthLimit ?? userConfig.generalLimits?.attributeValueLengthLimit ?? (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
      return Object.assign({}, userConfig, { spanLimits });
    }
    __name(reconfigureLimits, "reconfigureLimits");
    exports.reconfigureLimits = reconfigureLimits;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.js
var require_BatchSpanProcessorBase = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchSpanProcessorBase = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var core_1 = require_src();
    var BatchSpanProcessorBase = class {
      static {
        __name(this, "BatchSpanProcessorBase");
      }
      _exporter;
      _maxExportBatchSize;
      _maxQueueSize;
      _scheduledDelayMillis;
      _exportTimeoutMillis;
      _isExporting = false;
      _finishedSpans = [];
      _timer;
      _shutdownOnce;
      _droppedSpansCount = 0;
      constructor(_exporter, config) {
        this._exporter = _exporter;
        this._maxExportBatchSize = typeof config?.maxExportBatchSize === "number" ? config.maxExportBatchSize : (0, core_1.getNumberFromEnv)("OTEL_BSP_MAX_EXPORT_BATCH_SIZE") ?? 512;
        this._maxQueueSize = typeof config?.maxQueueSize === "number" ? config.maxQueueSize : (0, core_1.getNumberFromEnv)("OTEL_BSP_MAX_QUEUE_SIZE") ?? 2048;
        this._scheduledDelayMillis = typeof config?.scheduledDelayMillis === "number" ? config.scheduledDelayMillis : (0, core_1.getNumberFromEnv)("OTEL_BSP_SCHEDULE_DELAY") ?? 5e3;
        this._exportTimeoutMillis = typeof config?.exportTimeoutMillis === "number" ? config.exportTimeoutMillis : (0, core_1.getNumberFromEnv)("OTEL_BSP_EXPORT_TIMEOUT") ?? 3e4;
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
        if (this._maxExportBatchSize > this._maxQueueSize) {
          api_1.diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
          this._maxExportBatchSize = this._maxQueueSize;
        }
      }
      forceFlush() {
        if (this._shutdownOnce.isCalled) {
          return this._shutdownOnce.promise;
        }
        return this._flushAll();
      }
      // does nothing.
      onStart(_span, _parentContext) {
      }
      onEnd(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
          return;
        }
        this._addToBuffer(span);
      }
      shutdown() {
        return this._shutdownOnce.call();
      }
      _shutdown() {
        return Promise.resolve().then(() => {
          return this.onShutdown();
        }).then(() => {
          return this._flushAll();
        }).then(() => {
          return this._exporter.shutdown();
        });
      }
      /** Add a span in the buffer. */
      _addToBuffer(span) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
          if (this._droppedSpansCount === 0) {
            api_1.diag.debug("maxQueueSize reached, dropping spans");
          }
          this._droppedSpansCount++;
          return;
        }
        if (this._droppedSpansCount > 0) {
          api_1.diag.warn(`Dropped ${this._droppedSpansCount} spans because maxQueueSize reached`);
          this._droppedSpansCount = 0;
        }
        this._finishedSpans.push(span);
        this._maybeStartTimer();
      }
      /**
       * Send all spans to the exporter respecting the batch size limit
       * This function is used only on forceFlush or shutdown,
       * for all other cases _flush should be used
       * */
      _flushAll() {
        return new Promise((resolve, reject) => {
          const promises = [];
          const count = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
          for (let i = 0, j = count; i < j; i++) {
            promises.push(this._flushOneBatch());
          }
          Promise.all(promises).then(() => {
            resolve();
          }).catch(reject);
        });
      }
      _flushOneBatch() {
        this._clearTimer();
        if (this._finishedSpans.length === 0) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error("Timeout"));
          }, this._exportTimeoutMillis);
          api_1.context.with((0, core_1.suppressTracing)(api_1.context.active()), () => {
            let spans;
            if (this._finishedSpans.length <= this._maxExportBatchSize) {
              spans = this._finishedSpans;
              this._finishedSpans = [];
            } else {
              spans = this._finishedSpans.splice(0, this._maxExportBatchSize);
            }
            const doExport = /* @__PURE__ */ __name(() => this._exporter.export(spans, (result) => {
              clearTimeout(timer);
              if (result.code === core_1.ExportResultCode.SUCCESS) {
                resolve();
              } else {
                reject(result.error ?? new Error("BatchSpanProcessor: span export failed"));
              }
            }), "doExport");
            let pendingResources = null;
            for (let i = 0, len = spans.length; i < len; i++) {
              const span = spans[i];
              if (span.resource.asyncAttributesPending && span.resource.waitForAsyncAttributes) {
                pendingResources ??= [];
                pendingResources.push(span.resource.waitForAsyncAttributes());
              }
            }
            if (pendingResources === null) {
              doExport();
            } else {
              Promise.all(pendingResources).then(doExport, (err) => {
                (0, core_1.globalErrorHandler)(err);
                reject(err);
              });
            }
          });
        });
      }
      _maybeStartTimer() {
        if (this._isExporting)
          return;
        const flush = /* @__PURE__ */ __name(() => {
          this._isExporting = true;
          this._flushOneBatch().finally(() => {
            this._isExporting = false;
            if (this._finishedSpans.length > 0) {
              this._clearTimer();
              this._maybeStartTimer();
            }
          }).catch((e) => {
            this._isExporting = false;
            (0, core_1.globalErrorHandler)(e);
          });
        }, "flush");
        if (this._finishedSpans.length >= this._maxExportBatchSize) {
          return flush();
        }
        if (this._timer !== void 0)
          return;
        this._timer = setTimeout(() => flush(), this._scheduledDelayMillis);
        (0, core_1.unrefTimer)(this._timer);
      }
      _clearTimer() {
        if (this._timer !== void 0) {
          clearTimeout(this._timer);
          this._timer = void 0;
        }
      }
    };
    exports.BatchSpanProcessorBase = BatchSpanProcessorBase;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.js
var require_BatchSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchSpanProcessor = void 0;
    var BatchSpanProcessorBase_1 = require_BatchSpanProcessorBase();
    var BatchSpanProcessor = class extends BatchSpanProcessorBase_1.BatchSpanProcessorBase {
      static {
        __name(this, "BatchSpanProcessor");
      }
      onShutdown() {
      }
    };
    exports.BatchSpanProcessor = BatchSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.js
var require_RandomIdGenerator = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = void 0;
    var SPAN_ID_BYTES = 8;
    var TRACE_ID_BYTES = 16;
    var RandomIdGenerator2 = class {
      static {
        __name(this, "RandomIdGenerator");
      }
      /**
       * Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
       * characters corresponding to 128 bits.
       */
      generateTraceId = getIdGenerator(TRACE_ID_BYTES);
      /**
       * Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
       * characters corresponding to 64 bits.
       */
      generateSpanId = getIdGenerator(SPAN_ID_BYTES);
    };
    exports.RandomIdGenerator = RandomIdGenerator2;
    var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
    function getIdGenerator(bytes) {
      return /* @__PURE__ */ __name(function generateId() {
        for (let i = 0; i < bytes / 4; i++) {
          SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
        }
        for (let i = 0; i < bytes; i++) {
          if (SHARED_BUFFER[i] > 0) {
            break;
          } else if (i === bytes - 1) {
            SHARED_BUFFER[bytes - 1] = 1;
          }
        }
        return SHARED_BUFFER.toString("hex", 0, bytes);
      }, "generateId");
    }
    __name(getIdGenerator, "getIdGenerator");
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.js
var require_node3 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = exports.BatchSpanProcessor = void 0;
    var BatchSpanProcessor_1 = require_BatchSpanProcessor();
    Object.defineProperty(exports, "BatchSpanProcessor", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return BatchSpanProcessor_1.BatchSpanProcessor;
    }, "get") });
    var RandomIdGenerator_1 = require_RandomIdGenerator();
    Object.defineProperty(exports, "RandomIdGenerator", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return RandomIdGenerator_1.RandomIdGenerator;
    }, "get") });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.js
var require_platform3 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = exports.BatchSpanProcessor = void 0;
    var node_1 = require_node3();
    Object.defineProperty(exports, "BatchSpanProcessor", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return node_1.BatchSpanProcessor;
    }, "get") });
    Object.defineProperty(exports, "RandomIdGenerator", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return node_1.RandomIdGenerator;
    }, "get") });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.js
var require_Tracer = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tracer = void 0;
    var api = (init_esm2(), __toCommonJS(esm_exports));
    var core_1 = require_src();
    var Span_1 = require_Span();
    var utility_1 = require_utility();
    var platform_1 = require_platform3();
    var Tracer = class {
      static {
        __name(this, "Tracer");
      }
      _sampler;
      _generalLimits;
      _spanLimits;
      _idGenerator;
      instrumentationScope;
      _resource;
      _spanProcessor;
      /**
       * Constructs a new Tracer instance.
       */
      constructor(instrumentationScope, config, resource, spanProcessor) {
        const localConfig = (0, utility_1.mergeConfig)(config);
        this._sampler = localConfig.sampler;
        this._generalLimits = localConfig.generalLimits;
        this._spanLimits = localConfig.spanLimits;
        this._idGenerator = config.idGenerator || new platform_1.RandomIdGenerator();
        this._resource = resource;
        this._spanProcessor = spanProcessor;
        this.instrumentationScope = instrumentationScope;
      }
      /**
       * Starts a new Span or returns the default NoopSpan based on the sampling
       * decision.
       */
      startSpan(name, options = {}, context = api.context.active()) {
        if (options.root) {
          context = api.trace.deleteSpan(context);
        }
        const parentSpan = api.trace.getSpan(context);
        if ((0, core_1.isTracingSuppressed)(context)) {
          api.diag.debug("Instrumentation suppressed, returning Noop Span");
          const nonRecordingSpan = api.trace.wrapSpanContext(api.INVALID_SPAN_CONTEXT);
          return nonRecordingSpan;
        }
        const parentSpanContext = parentSpan?.spanContext();
        const spanId = this._idGenerator.generateSpanId();
        let validParentSpanContext;
        let traceId;
        let traceState;
        if (!parentSpanContext || !api.trace.isSpanContextValid(parentSpanContext)) {
          traceId = this._idGenerator.generateTraceId();
        } else {
          traceId = parentSpanContext.traceId;
          traceState = parentSpanContext.traceState;
          validParentSpanContext = parentSpanContext;
        }
        const spanKind = options.kind ?? api.SpanKind.INTERNAL;
        const links = (options.links ?? []).map((link) => {
          return {
            context: link.context,
            attributes: (0, core_1.sanitizeAttributes)(link.attributes)
          };
        });
        const attributes = (0, core_1.sanitizeAttributes)(options.attributes);
        const samplingResult = this._sampler.shouldSample(context, traceId, name, spanKind, attributes, links);
        traceState = samplingResult.traceState ?? traceState;
        const traceFlags = samplingResult.decision === api.SamplingDecision.RECORD_AND_SAMPLED ? api.TraceFlags.SAMPLED : api.TraceFlags.NONE;
        const spanContext = { traceId, spanId, traceFlags, traceState };
        if (samplingResult.decision === api.SamplingDecision.NOT_RECORD) {
          api.diag.debug("Recording is off, propagating context in a non-recording span");
          const nonRecordingSpan = api.trace.wrapSpanContext(spanContext);
          return nonRecordingSpan;
        }
        const initAttributes = (0, core_1.sanitizeAttributes)(Object.assign(attributes, samplingResult.attributes));
        const span = new Span_1.SpanImpl({
          resource: this._resource,
          scope: this.instrumentationScope,
          context,
          spanContext,
          name,
          kind: spanKind,
          links,
          parentSpanContext: validParentSpanContext,
          attributes: initAttributes,
          startTime: options.startTime,
          spanProcessor: this._spanProcessor,
          spanLimits: this._spanLimits
        });
        return span;
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx ?? api.context.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = api.trace.setSpan(parentContext, span);
        return api.context.with(contextWithSpanSet, fn, void 0, span);
      }
      /** Returns the active {@link GeneralLimits}. */
      getGeneralLimits() {
        return this._generalLimits;
      }
      /** Returns the active {@link SpanLimits}. */
      getSpanLimits() {
        return this._spanLimits;
      }
    };
    exports.Tracer = Tracer;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/MultiSpanProcessor.js
var require_MultiSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/MultiSpanProcessor.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiSpanProcessor = void 0;
    var core_1 = require_src();
    var MultiSpanProcessor = class {
      static {
        __name(this, "MultiSpanProcessor");
      }
      _spanProcessors;
      constructor(_spanProcessors) {
        this._spanProcessors = _spanProcessors;
      }
      forceFlush() {
        const promises = [];
        for (const spanProcessor of this._spanProcessors) {
          promises.push(spanProcessor.forceFlush());
        }
        return new Promise((resolve) => {
          Promise.all(promises).then(() => {
            resolve();
          }).catch((error) => {
            (0, core_1.globalErrorHandler)(error || new Error("MultiSpanProcessor: forceFlush failed"));
            resolve();
          });
        });
      }
      onStart(span, context) {
        for (const spanProcessor of this._spanProcessors) {
          spanProcessor.onStart(span, context);
        }
      }
      onEnd(span) {
        for (const spanProcessor of this._spanProcessors) {
          spanProcessor.onEnd(span);
        }
      }
      shutdown() {
        const promises = [];
        for (const spanProcessor of this._spanProcessors) {
          promises.push(spanProcessor.shutdown());
        }
        return new Promise((resolve, reject) => {
          Promise.all(promises).then(() => {
            resolve();
          }, reject);
        });
      }
    };
    exports.MultiSpanProcessor = MultiSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.js
var require_BasicTracerProvider = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BasicTracerProvider = exports.ForceFlushState = void 0;
    var core_1 = require_src();
    var resources_1 = require_src3();
    var Tracer_1 = require_Tracer();
    var config_1 = require_config();
    var MultiSpanProcessor_1 = require_MultiSpanProcessor();
    var utility_1 = require_utility();
    var ForceFlushState;
    (function(ForceFlushState2) {
      ForceFlushState2[ForceFlushState2["resolved"] = 0] = "resolved";
      ForceFlushState2[ForceFlushState2["timeout"] = 1] = "timeout";
      ForceFlushState2[ForceFlushState2["error"] = 2] = "error";
      ForceFlushState2[ForceFlushState2["unresolved"] = 3] = "unresolved";
    })(ForceFlushState = exports.ForceFlushState || (exports.ForceFlushState = {}));
    var BasicTracerProvider = class {
      static {
        __name(this, "BasicTracerProvider");
      }
      _config;
      _tracers = /* @__PURE__ */ new Map();
      _resource;
      _activeSpanProcessor;
      constructor(config = {}) {
        const mergedConfig = (0, core_1.merge)({}, (0, config_1.loadDefaultConfig)(), (0, utility_1.reconfigureLimits)(config));
        this._resource = mergedConfig.resource ?? (0, resources_1.defaultResource)();
        this._config = Object.assign({}, mergedConfig, {
          resource: this._resource
        });
        const spanProcessors = [];
        if (config.spanProcessors?.length) {
          spanProcessors.push(...config.spanProcessors);
        }
        this._activeSpanProcessor = new MultiSpanProcessor_1.MultiSpanProcessor(spanProcessors);
      }
      getTracer(name, version, options) {
        const key = `${name}@${version || ""}:${options?.schemaUrl || ""}`;
        if (!this._tracers.has(key)) {
          this._tracers.set(key, new Tracer_1.Tracer({ name, version, schemaUrl: options?.schemaUrl }, this._config, this._resource, this._activeSpanProcessor));
        }
        return this._tracers.get(key);
      }
      forceFlush() {
        const timeout = this._config.forceFlushTimeoutMillis;
        const promises = this._activeSpanProcessor["_spanProcessors"].map((spanProcessor) => {
          return new Promise((resolve) => {
            let state;
            const timeoutInterval = setTimeout(() => {
              resolve(new Error(`Span processor did not completed within timeout period of ${timeout} ms`));
              state = ForceFlushState.timeout;
            }, timeout);
            spanProcessor.forceFlush().then(() => {
              clearTimeout(timeoutInterval);
              if (state !== ForceFlushState.timeout) {
                state = ForceFlushState.resolved;
                resolve(state);
              }
            }).catch((error) => {
              clearTimeout(timeoutInterval);
              state = ForceFlushState.error;
              resolve(error);
            });
          });
        });
        return new Promise((resolve, reject) => {
          Promise.all(promises).then((results) => {
            const errors = results.filter((result) => result !== ForceFlushState.resolved);
            if (errors.length > 0) {
              reject(errors);
            } else {
              resolve();
            }
          }).catch((error) => reject([error]));
        });
      }
      shutdown() {
        return this._activeSpanProcessor.shutdown();
      }
    };
    exports.BasicTracerProvider = BasicTracerProvider;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.js
var require_ConsoleSpanExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConsoleSpanExporter = void 0;
    var core_1 = require_src();
    var ConsoleSpanExporter = class {
      static {
        __name(this, "ConsoleSpanExporter");
      }
      /**
       * Export spans.
       * @param spans
       * @param resultCallback
       */
      export(spans, resultCallback) {
        return this._sendSpans(spans, resultCallback);
      }
      /**
       * Shutdown the exporter.
       */
      shutdown() {
        this._sendSpans([]);
        return this.forceFlush();
      }
      /**
       * Exports any pending spans in exporter
       */
      forceFlush() {
        return Promise.resolve();
      }
      /**
       * converts span info into more readable format
       * @param span
       */
      _exportInfo(span) {
        return {
          resource: {
            attributes: span.resource.attributes
          },
          instrumentationScope: span.instrumentationScope,
          traceId: span.spanContext().traceId,
          parentSpanContext: span.parentSpanContext,
          traceState: span.spanContext().traceState?.serialize(),
          name: span.name,
          id: span.spanContext().spanId,
          kind: span.kind,
          timestamp: (0, core_1.hrTimeToMicroseconds)(span.startTime),
          duration: (0, core_1.hrTimeToMicroseconds)(span.duration),
          attributes: span.attributes,
          status: span.status,
          events: span.events,
          links: span.links
        };
      }
      /**
       * Showing spans in console
       * @param spans
       * @param done
       */
      _sendSpans(spans, done) {
        for (const span of spans) {
          console.dir(this._exportInfo(span), { depth: 3 });
        }
        if (done) {
          return done({ code: core_1.ExportResultCode.SUCCESS });
        }
      }
    };
    exports.ConsoleSpanExporter = ConsoleSpanExporter;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.js
var require_InMemorySpanExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InMemorySpanExporter = void 0;
    var core_1 = require_src();
    var InMemorySpanExporter = class {
      static {
        __name(this, "InMemorySpanExporter");
      }
      _finishedSpans = [];
      /**
       * Indicates if the exporter has been "shutdown."
       * When false, exported spans will not be stored in-memory.
       */
      _stopped = false;
      export(spans, resultCallback) {
        if (this._stopped)
          return resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Exporter has been stopped")
          });
        this._finishedSpans.push(...spans);
        setTimeout(() => resultCallback({ code: core_1.ExportResultCode.SUCCESS }), 0);
      }
      shutdown() {
        this._stopped = true;
        this._finishedSpans = [];
        return this.forceFlush();
      }
      /**
       * Exports any pending spans in the exporter
       */
      forceFlush() {
        return Promise.resolve();
      }
      reset() {
        this._finishedSpans = [];
      }
      getFinishedSpans() {
        return this._finishedSpans;
      }
    };
    exports.InMemorySpanExporter = InMemorySpanExporter;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.js
var require_SimpleSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleSpanProcessor = void 0;
    var api_1 = (init_esm2(), __toCommonJS(esm_exports));
    var core_1 = require_src();
    var SimpleSpanProcessor = class {
      static {
        __name(this, "SimpleSpanProcessor");
      }
      _exporter;
      _shutdownOnce;
      _pendingExports;
      constructor(_exporter) {
        this._exporter = _exporter;
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
        this._pendingExports = /* @__PURE__ */ new Set();
      }
      async forceFlush() {
        await Promise.all(Array.from(this._pendingExports));
        if (this._exporter.forceFlush) {
          await this._exporter.forceFlush();
        }
      }
      onStart(_span, _parentContext) {
      }
      onEnd(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
          return;
        }
        const pendingExport = this._doExport(span).catch((err) => (0, core_1.globalErrorHandler)(err));
        this._pendingExports.add(pendingExport);
        pendingExport.finally(() => this._pendingExports.delete(pendingExport));
      }
      async _doExport(span) {
        if (span.resource.asyncAttributesPending) {
          await span.resource.waitForAsyncAttributes?.();
        }
        const result = await core_1.internal._export(this._exporter, [span]);
        if (result.code !== core_1.ExportResultCode.SUCCESS) {
          throw result.error ?? new Error(`SimpleSpanProcessor: span export failed (status ${result})`);
        }
      }
      shutdown() {
        return this._shutdownOnce.call();
      }
      _shutdown() {
        return this._exporter.shutdown();
      }
    };
    exports.SimpleSpanProcessor = SimpleSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.js
var require_NoopSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopSpanProcessor = void 0;
    var NoopSpanProcessor = class {
      static {
        __name(this, "NoopSpanProcessor");
      }
      onStart(_span, _context) {
      }
      onEnd(_span) {
      }
      shutdown() {
        return Promise.resolve();
      }
      forceFlush() {
        return Promise.resolve();
      }
    };
    exports.NoopSpanProcessor = NoopSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/index.js
var require_src4 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/index.js"(exports) {
    "use strict";
    init_esm();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamplingDecision = exports.TraceIdRatioBasedSampler = exports.ParentBasedSampler = exports.AlwaysOnSampler = exports.AlwaysOffSampler = exports.NoopSpanProcessor = exports.SimpleSpanProcessor = exports.InMemorySpanExporter = exports.ConsoleSpanExporter = exports.RandomIdGenerator = exports.BatchSpanProcessor = exports.BasicTracerProvider = void 0;
    var BasicTracerProvider_1 = require_BasicTracerProvider();
    Object.defineProperty(exports, "BasicTracerProvider", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return BasicTracerProvider_1.BasicTracerProvider;
    }, "get") });
    var platform_1 = require_platform3();
    Object.defineProperty(exports, "BatchSpanProcessor", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.BatchSpanProcessor;
    }, "get") });
    Object.defineProperty(exports, "RandomIdGenerator", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return platform_1.RandomIdGenerator;
    }, "get") });
    var ConsoleSpanExporter_1 = require_ConsoleSpanExporter();
    Object.defineProperty(exports, "ConsoleSpanExporter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ConsoleSpanExporter_1.ConsoleSpanExporter;
    }, "get") });
    var InMemorySpanExporter_1 = require_InMemorySpanExporter();
    Object.defineProperty(exports, "InMemorySpanExporter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return InMemorySpanExporter_1.InMemorySpanExporter;
    }, "get") });
    var SimpleSpanProcessor_1 = require_SimpleSpanProcessor();
    Object.defineProperty(exports, "SimpleSpanProcessor", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return SimpleSpanProcessor_1.SimpleSpanProcessor;
    }, "get") });
    var NoopSpanProcessor_1 = require_NoopSpanProcessor();
    Object.defineProperty(exports, "NoopSpanProcessor", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return NoopSpanProcessor_1.NoopSpanProcessor;
    }, "get") });
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    Object.defineProperty(exports, "AlwaysOffSampler", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return AlwaysOffSampler_1.AlwaysOffSampler;
    }, "get") });
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    Object.defineProperty(exports, "AlwaysOnSampler", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return AlwaysOnSampler_1.AlwaysOnSampler;
    }, "get") });
    var ParentBasedSampler_1 = require_ParentBasedSampler();
    Object.defineProperty(exports, "ParentBasedSampler", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return ParentBasedSampler_1.ParentBasedSampler;
    }, "get") });
    var TraceIdRatioBasedSampler_1 = require_TraceIdRatioBasedSampler();
    Object.defineProperty(exports, "TraceIdRatioBasedSampler", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler;
    }, "get") });
    var Sampler_1 = require_Sampler();
    Object.defineProperty(exports, "SamplingDecision", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return Sampler_1.SamplingDecision;
    }, "get") });
  }
});

// src/trigger/youtubeWorkflow.ts
init_esm();

// node_modules/@trigger.dev/python/dist/esm/index.js
init_esm();

// node_modules/@trigger.dev/core/dist/esm/v3/otel/index.js
init_esm();

// node_modules/@trigger.dev/core/dist/esm/v3/otel/tracingSDK.js
init_esm();
var import_host_metrics = __toESM(require_src2(), 1);
var import_sdk_trace_base = __toESM(require_src4(), 1);

// node_modules/@trigger.dev/core/dist/esm/v3/taskContext/otelProcessors.js
init_esm();

// node_modules/@trigger.dev/core/dist/esm/v3/otel/machineId.js
init_esm();
var machineId = getEnvVar("TRIGGER_MACHINE_ID") ?? generateFriendlyId("machine");

// node_modules/@trigger.dev/core/dist/esm/v3/otel/diskIoMetrics.js
init_esm();

// node_modules/@trigger.dev/core/dist/esm/v3/otel/filesystemMetrics.js
init_esm();

// node_modules/@trigger.dev/core/dist/esm/v3/otel/nodejsRuntimeMetrics.js
init_esm();

// node_modules/@trigger.dev/core/dist/esm/v3/otel/tracingSDK.js
var idGenerator = new import_sdk_trace_base.RandomIdGenerator();

// node_modules/@trigger.dev/python/dist/esm/index.js
import assert from "node:assert";
import fs from "node:fs";

// node_modules/tinyexec/dist/main.js
init_esm();
import { createRequire as __tinyexec_cr } from "node:module";
import { spawn as de } from "child_process";
import { normalize as fe } from "path";
import { cwd as he } from "process";
import {
  delimiter as N,
  resolve as qt,
  dirname as It
} from "path";
import { PassThrough as zt } from "stream";
import me from "readline";
var require2 = __tinyexec_cr(import.meta.url);
var St = Object.create;
var $ = Object.defineProperty;
var kt = Object.getOwnPropertyDescriptor;
var Tt = Object.getOwnPropertyNames;
var At = Object.getPrototypeOf;
var Rt = Object.prototype.hasOwnProperty;
var h = /* @__PURE__ */ ((t) => typeof require2 < "u" ? require2 : typeof Proxy < "u" ? new Proxy(t, {
  get: /* @__PURE__ */ __name((e, n) => (typeof require2 < "u" ? require2 : e)[n], "get")
}) : t)(function(t) {
  if (typeof require2 < "u") return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + t + '" is not supported');
});
var l = /* @__PURE__ */ __name((t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), "l");
var $t = /* @__PURE__ */ __name((t, e, n, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of Tt(e))
      !Rt.call(t, s) && s !== n && $(t, s, { get: /* @__PURE__ */ __name(() => e[s], "get"), enumerable: !(r = kt(e, s)) || r.enumerable });
  return t;
}, "$t");
var Nt = /* @__PURE__ */ __name((t, e, n) => (n = t != null ? St(At(t)) : {}, $t(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !t || !t.__esModule ? $(n, "default", { value: t, enumerable: true }) : n,
  t
)), "Nt");
var W = l((Se, H) => {
  "use strict";
  H.exports = z;
  z.sync = Wt;
  var j = h("fs");
  function Ht(t, e) {
    var n = e.pathExt !== void 0 ? e.pathExt : process.env.PATHEXT;
    if (!n || (n = n.split(";"), n.indexOf("") !== -1))
      return true;
    for (var r = 0; r < n.length; r++) {
      var s = n[r].toLowerCase();
      if (s && t.substr(-s.length).toLowerCase() === s)
        return true;
    }
    return false;
  }
  __name(Ht, "Ht");
  function F(t, e, n) {
    return !t.isSymbolicLink() && !t.isFile() ? false : Ht(e, n);
  }
  __name(F, "F");
  function z(t, e, n) {
    j.stat(t, function(r, s) {
      n(r, r ? false : F(s, t, e));
    });
  }
  __name(z, "z");
  function Wt(t, e) {
    return F(j.statSync(t), t, e);
  }
  __name(Wt, "Wt");
});
var X = l((ke, B) => {
  "use strict";
  B.exports = K;
  K.sync = Dt;
  var D = h("fs");
  function K(t, e, n) {
    D.stat(t, function(r, s) {
      n(r, r ? false : M(s, e));
    });
  }
  __name(K, "K");
  function Dt(t, e) {
    return M(D.statSync(t), e);
  }
  __name(Dt, "Dt");
  function M(t, e) {
    return t.isFile() && Kt(t, e);
  }
  __name(M, "M");
  function Kt(t, e) {
    var n = t.mode, r = t.uid, s = t.gid, o = e.uid !== void 0 ? e.uid : process.getuid && process.getuid(), i = e.gid !== void 0 ? e.gid : process.getgid && process.getgid(), a = parseInt("100", 8), c = parseInt("010", 8), u = parseInt("001", 8), f = a | c, p = n & u || n & c && s === i || n & a && r === o || n & f && o === 0;
    return p;
  }
  __name(Kt, "Kt");
});
var U = l((Ae, G) => {
  "use strict";
  var Te = h("fs"), v;
  process.platform === "win32" || global.TESTING_WINDOWS ? v = W() : v = X();
  G.exports = y;
  y.sync = Mt;
  function y(t, e, n) {
    if (typeof e == "function" && (n = e, e = {}), !n) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(r, s) {
        y(t, e || {}, function(o, i) {
          o ? s(o) : r(i);
        });
      });
    }
    v(t, e || {}, function(r, s) {
      r && (r.code === "EACCES" || e && e.ignoreErrors) && (r = null, s = false), n(r, s);
    });
  }
  __name(y, "y");
  function Mt(t, e) {
    try {
      return v.sync(t, e || {});
    } catch (n) {
      if (e && e.ignoreErrors || n.code === "EACCES")
        return false;
      throw n;
    }
  }
  __name(Mt, "Mt");
});
var et = l((Re, tt) => {
  "use strict";
  var g = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", Y = h("path"), Bt = g ? ";" : ":", V = U(), J = /* @__PURE__ */ __name((t) => Object.assign(new Error(`not found: ${t}`), { code: "ENOENT" }), "J"), Q = /* @__PURE__ */ __name((t, e) => {
    let n = e.colon || Bt, r = t.match(/\//) || g && t.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...g ? [process.cwd()] : [],
      ...(e.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(n)
    ], s = g ? e.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", o = g ? s.split(n) : [""];
    return g && t.indexOf(".") !== -1 && o[0] !== "" && o.unshift(""), {
      pathEnv: r,
      pathExt: o,
      pathExtExe: s
    };
  }, "Q"), Z = /* @__PURE__ */ __name((t, e, n) => {
    typeof e == "function" && (n = e, e = {}), e || (e = {});
    let { pathEnv: r, pathExt: s, pathExtExe: o } = Q(t, e), i = [], a = /* @__PURE__ */ __name((u) => new Promise((f, p) => {
      if (u === r.length)
        return e.all && i.length ? f(i) : p(J(t));
      let d = r[u], w = /^".*"$/.test(d) ? d.slice(1, -1) : d, m = Y.join(w, t), b = !w && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + m : m;
      f(c(b, u, 0));
    }), "a"), c = /* @__PURE__ */ __name((u, f, p) => new Promise((d, w) => {
      if (p === s.length)
        return d(a(f + 1));
      let m = s[p];
      V(u + m, { pathExt: o }, (b, Ot) => {
        if (!b && Ot)
          if (e.all)
            i.push(u + m);
          else
            return d(u + m);
        return d(c(u, f, p + 1));
      });
    }), "c");
    return n ? a(0).then((u) => n(null, u), n) : a(0);
  }, "Z"), Xt = /* @__PURE__ */ __name((t, e) => {
    e = e || {};
    let { pathEnv: n, pathExt: r, pathExtExe: s } = Q(t, e), o = [];
    for (let i = 0; i < n.length; i++) {
      let a = n[i], c = /^".*"$/.test(a) ? a.slice(1, -1) : a, u = Y.join(c, t), f = !c && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + u : u;
      for (let p = 0; p < r.length; p++) {
        let d = f + r[p];
        try {
          if (V.sync(d, { pathExt: s }))
            if (e.all)
              o.push(d);
            else
              return d;
        } catch {
        }
      }
    }
    if (e.all && o.length)
      return o;
    if (e.nothrow)
      return null;
    throw J(t);
  }, "Xt");
  tt.exports = Z;
  Z.sync = Xt;
});
var rt = l(($e, _) => {
  "use strict";
  var nt = /* @__PURE__ */ __name((t = {}) => {
    let e = t.env || process.env;
    return (t.platform || process.platform) !== "win32" ? "PATH" : Object.keys(e).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
  }, "nt");
  _.exports = nt;
  _.exports.default = nt;
});
var ct = l((Ne, it) => {
  "use strict";
  var st = h("path"), Gt = et(), Ut = rt();
  function ot(t, e) {
    let n = t.options.env || process.env, r = process.cwd(), s = t.options.cwd != null, o = s && process.chdir !== void 0 && !process.chdir.disabled;
    if (o)
      try {
        process.chdir(t.options.cwd);
      } catch {
      }
    let i;
    try {
      i = Gt.sync(t.command, {
        path: n[Ut({ env: n })],
        pathExt: e ? st.delimiter : void 0
      });
    } catch {
    } finally {
      o && process.chdir(r);
    }
    return i && (i = st.resolve(s ? t.options.cwd : "", i)), i;
  }
  __name(ot, "ot");
  function Yt(t) {
    return ot(t) || ot(t, true);
  }
  __name(Yt, "Yt");
  it.exports = Yt;
});
var ut = l((qe, P) => {
  "use strict";
  var C = /([()\][%!^"`<>&|;, *?])/g;
  function Vt(t) {
    return t = t.replace(C, "^$1"), t;
  }
  __name(Vt, "Vt");
  function Jt(t, e) {
    return t = `${t}`, t = t.replace(/(\\*)"/g, '$1$1\\"'), t = t.replace(/(\\*)$/, "$1$1"), t = `"${t}"`, t = t.replace(C, "^$1"), e && (t = t.replace(C, "^$1")), t;
  }
  __name(Jt, "Jt");
  P.exports.command = Vt;
  P.exports.argument = Jt;
});
var lt = l((Ie, at) => {
  "use strict";
  at.exports = /^#!(.*)/;
});
var dt = l((Le, pt) => {
  "use strict";
  var Qt = lt();
  pt.exports = (t = "") => {
    let e = t.match(Qt);
    if (!e)
      return null;
    let [n, r] = e[0].replace(/#! ?/, "").split(" "), s = n.split("/").pop();
    return s === "env" ? r : r ? `${s} ${r}` : s;
  };
});
var ht = l((je, ft) => {
  "use strict";
  var O = h("fs"), Zt = dt();
  function te(t) {
    let n = Buffer.alloc(150), r;
    try {
      r = O.openSync(t, "r"), O.readSync(r, n, 0, 150, 0), O.closeSync(r);
    } catch {
    }
    return Zt(n.toString());
  }
  __name(te, "te");
  ft.exports = te;
});
var wt = l((Fe, Et) => {
  "use strict";
  var ee = h("path"), mt = ct(), gt = ut(), ne = ht(), re = process.platform === "win32", se = /\.(?:com|exe)$/i, oe = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function ie(t) {
    t.file = mt(t);
    let e = t.file && ne(t.file);
    return e ? (t.args.unshift(t.file), t.command = e, mt(t)) : t.file;
  }
  __name(ie, "ie");
  function ce(t) {
    if (!re)
      return t;
    let e = ie(t), n = !se.test(e);
    if (t.options.forceShell || n) {
      let r = oe.test(e);
      t.command = ee.normalize(t.command), t.command = gt.command(t.command), t.args = t.args.map((o) => gt.argument(o, r));
      let s = [t.command].concat(t.args).join(" ");
      t.args = ["/d", "/s", "/c", `"${s}"`], t.command = process.env.comspec || "cmd.exe", t.options.windowsVerbatimArguments = true;
    }
    return t;
  }
  __name(ce, "ce");
  function ue(t, e, n) {
    e && !Array.isArray(e) && (n = e, e = null), e = e ? e.slice(0) : [], n = Object.assign({}, n);
    let r = {
      command: t,
      args: e,
      options: n,
      file: void 0,
      original: {
        command: t,
        args: e
      }
    };
    return n.shell ? r : ce(r);
  }
  __name(ue, "ue");
  Et.exports = ue;
});
var bt = l((ze, vt) => {
  "use strict";
  var S = process.platform === "win32";
  function k(t, e) {
    return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${e} ${t.command}`,
      path: t.command,
      spawnargs: t.args
    });
  }
  __name(k, "k");
  function ae(t, e) {
    if (!S)
      return;
    let n = t.emit;
    t.emit = function(r, s) {
      if (r === "exit") {
        let o = xt(s, e, "spawn");
        if (o)
          return n.call(t, "error", o);
      }
      return n.apply(t, arguments);
    };
  }
  __name(ae, "ae");
  function xt(t, e) {
    return S && t === 1 && !e.file ? k(e.original, "spawn") : null;
  }
  __name(xt, "xt");
  function le(t, e) {
    return S && t === 1 && !e.file ? k(e.original, "spawnSync") : null;
  }
  __name(le, "le");
  vt.exports = {
    hookChildProcess: ae,
    verifyENOENT: xt,
    verifyENOENTSync: le,
    notFoundError: k
  };
});
var Ct = l((He, E) => {
  "use strict";
  var yt = h("child_process"), T = wt(), A = bt();
  function _t(t, e, n) {
    let r = T(t, e, n), s = yt.spawn(r.command, r.args, r.options);
    return A.hookChildProcess(s, r), s;
  }
  __name(_t, "_t");
  function pe(t, e, n) {
    let r = T(t, e, n), s = yt.spawnSync(r.command, r.args, r.options);
    return s.error = s.error || A.verifyENOENTSync(s.status, r), s;
  }
  __name(pe, "pe");
  E.exports = _t;
  E.exports.spawn = _t;
  E.exports.sync = pe;
  E.exports._parse = T;
  E.exports._enoent = A;
});
var Lt = /^path$/i;
var q = { key: "PATH", value: "" };
function jt(t) {
  for (let e in t) {
    if (!Object.prototype.hasOwnProperty.call(t, e) || !Lt.test(e))
      continue;
    let n = t[e];
    return n ? { key: e, value: n } : q;
  }
  return q;
}
__name(jt, "jt");
function Ft(t, e) {
  let n = e.value.split(N), r = t, s;
  do
    n.push(qt(r, "node_modules", ".bin")), s = r, r = It(r);
  while (r !== s);
  return { key: e.key, value: n.join(N) };
}
__name(Ft, "Ft");
function I(t, e) {
  let n = {
    ...process.env,
    ...e
  }, r = Ft(t, jt(n));
  return n[r.key] = r.value, n;
}
__name(I, "I");
var L = /* @__PURE__ */ __name((t) => {
  let e = t.length, n = new zt(), r = /* @__PURE__ */ __name(() => {
    --e === 0 && n.emit("end");
  }, "r");
  for (let s of t)
    s.pipe(n, { end: false }), s.on("end", r);
  return n;
}, "L");
var Pt = Nt(Ct(), 1);
var x = class extends Error {
  static {
    __name(this, "x");
  }
  result;
  output;
  get exitCode() {
    if (this.result.exitCode !== null)
      return this.result.exitCode;
  }
  constructor(e, n) {
    super(`Process exited with non-zero status (${e.exitCode})`), this.result = e, this.output = n;
  }
};
var ge = {
  timeout: void 0,
  persist: false
};
var Ee = {
  windowsHide: true
};
function we(t, e) {
  return {
    command: fe(t),
    args: e ?? []
  };
}
__name(we, "we");
function xe(t) {
  let e = new AbortController();
  for (let n of t) {
    if (n.aborted)
      return e.abort(), n;
    let r = /* @__PURE__ */ __name(() => {
      e.abort(n.reason);
    }, "r");
    n.addEventListener("abort", r, {
      signal: e.signal
    });
  }
  return e.signal;
}
__name(xe, "xe");
var R = class {
  static {
    __name(this, "R");
  }
  _process;
  _aborted = false;
  _options;
  _command;
  _args;
  _resolveClose;
  _processClosed;
  _thrownError;
  get process() {
    return this._process;
  }
  get pid() {
    return this._process?.pid;
  }
  get exitCode() {
    if (this._process && this._process.exitCode !== null)
      return this._process.exitCode;
  }
  constructor(e, n, r) {
    this._options = {
      ...ge,
      ...r
    }, this._command = e, this._args = n ?? [], this._processClosed = new Promise((s) => {
      this._resolveClose = s;
    });
  }
  kill(e) {
    return this._process?.kill(e) === true;
  }
  get aborted() {
    return this._aborted;
  }
  get killed() {
    return this._process?.killed === true;
  }
  pipe(e, n, r) {
    return be(e, n, {
      ...r,
      stdin: this
    });
  }
  async *[Symbol.asyncIterator]() {
    let e = this._process;
    if (!e)
      return;
    let n = [];
    this._streamErr && n.push(this._streamErr), this._streamOut && n.push(this._streamOut);
    let r = L(n), s = me.createInterface({
      input: r
    });
    for await (let o of s)
      yield o.toString();
    if (await this._processClosed, e.removeAllListeners(), this._thrownError)
      throw this._thrownError;
    if (this._options?.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0)
      throw new x(this);
  }
  async _waitForOutput() {
    let e = this._process;
    if (!e)
      throw new Error("No process was started");
    let n = "", r = "";
    if (this._streamOut)
      for await (let o of this._streamOut)
        r += o.toString();
    if (this._streamErr)
      for await (let o of this._streamErr)
        n += o.toString();
    if (await this._processClosed, this._options?.stdin && await this._options.stdin, e.removeAllListeners(), this._thrownError)
      throw this._thrownError;
    let s = {
      stderr: n,
      stdout: r,
      exitCode: this.exitCode
    };
    if (this._options.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0)
      throw new x(this, s);
    return s;
  }
  then(e, n) {
    return this._waitForOutput().then(e, n);
  }
  _streamOut;
  _streamErr;
  spawn() {
    let e = he(), n = this._options, r = {
      ...Ee,
      ...n.nodeOptions
    }, s = [];
    this._resetState(), n.timeout !== void 0 && s.push(AbortSignal.timeout(n.timeout)), n.signal !== void 0 && s.push(n.signal), n.persist === true && (r.detached = true), s.length > 0 && (r.signal = xe(s)), r.env = I(e, r.env);
    let { command: o, args: i } = we(this._command, this._args), a = (0, Pt._parse)(o, i, r), c = de(
      a.command,
      a.args,
      a.options
    );
    if (c.stderr && (this._streamErr = c.stderr), c.stdout && (this._streamOut = c.stdout), this._process = c, c.once("error", this._onError), c.once("close", this._onClose), n.stdin !== void 0 && c.stdin && n.stdin.process) {
      let { stdout: u } = n.stdin.process;
      u && u.pipe(c.stdin);
    }
  }
  _resetState() {
    this._aborted = false, this._processClosed = new Promise((e) => {
      this._resolveClose = e;
    }), this._thrownError = void 0;
  }
  _onError = /* @__PURE__ */ __name((e) => {
    if (e.name === "AbortError" && (!(e.cause instanceof Error) || e.cause.name !== "TimeoutError")) {
      this._aborted = true;
      return;
    }
    this._thrownError = e;
  }, "_onError");
  _onClose = /* @__PURE__ */ __name(() => {
    this._resolveClose && this._resolveClose();
  }, "_onClose");
};
var ve = /* @__PURE__ */ __name((t, e, n) => {
  let r = new R(t, e, n);
  return r.spawn(), r;
}, "ve");
var be = ve;

// node_modules/@trigger.dev/python/dist/esm/utils/tempFiles.js
init_esm();
import { mkdtempSync, writeFileSync } from "node:fs";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
async function withTempFile(filename, callback, content = "") {
  const tempDir = await mkdtemp(join(tmpdir(), "app-"));
  const tempFile = join(tempDir, filename);
  try {
    await writeFile(tempFile, content, { mode: 384 });
    return await callback(tempFile);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}
__name(withTempFile, "withTempFile");
function createTempFileSync(filename, content = "") {
  const tempDir = mkdtempSync(join(tmpdir(), "app-"));
  const tempFile = join(tempDir, filename);
  writeFileSync(tempFile, content, { mode: 384 });
  return tempFile;
}
__name(createTempFileSync, "createTempFileSync");

// node_modules/@trigger.dev/python/dist/esm/index.js
var python = {
  async run(scriptArgs = [], options = {}) {
    const pythonBin = process.env.PYTHON_BIN_PATH || "python";
    const carrier = carrierFromContext();
    return await logger.trace("python.run()", async (span) => {
      const result = await ve(pythonBin, scriptArgs, {
        ...options,
        nodeOptions: {
          ...options.nodeOptions || {},
          env: {
            ...process.env,
            ...options.env,
            TRACEPARENT: carrier["traceparent"],
            OTEL_RESOURCE_ATTRIBUTES: `${SemanticInternalAttributes.EXECUTION_ENVIRONMENT}=trigger,${Object.entries(taskContext.attributes).map(([key, value]) => `${key}=${value}`).join(",")}`
          }
        },
        throwOnError: false
        // Ensure errors are handled manually
      });
      if (result.exitCode) {
        span.setAttribute("exitCode", result.exitCode);
      }
      if (result.exitCode !== 0) {
        throw new Error(`${scriptArgs.join(" ")} exited with a non-zero code ${result.exitCode}:
${result.stderr}`);
      }
      return result;
    }, {
      attributes: {
        pythonBin,
        args: scriptArgs.join(" "),
        [SemanticInternalAttributes.STYLE_ICON]: "python"
      }
    });
  },
  async runScript(scriptPath, scriptArgs = [], options = {}) {
    assert(scriptPath, "Script path is required");
    assert(fs.existsSync(scriptPath), `Script does not exist: ${scriptPath}`);
    return await logger.trace("python.runScript()", async (span) => {
      span.setAttribute("scriptPath", scriptPath);
      const carrier = carrierFromContext();
      const result = await ve(process.env.PYTHON_BIN_PATH || "python", [scriptPath, ...scriptArgs], {
        ...options,
        nodeOptions: {
          ...options.nodeOptions || {},
          env: {
            ...process.env,
            ...options.env,
            TRACEPARENT: carrier["traceparent"],
            OTEL_RESOURCE_ATTRIBUTES: `${SemanticInternalAttributes.EXECUTION_ENVIRONMENT}=trigger,${Object.entries(taskContext.attributes).map(([key, value]) => `${key}=${value}`).join(",")}`,
            OTEL_LOG_LEVEL: "DEBUG"
          }
        },
        throwOnError: false
      });
      if (result.exitCode) {
        span.setAttribute("exitCode", result.exitCode);
      }
      if (result.exitCode !== 0) {
        throw new Error(`${scriptPath} ${scriptArgs.join(" ")} exited with a non-zero code ${result.exitCode}:
${result.stdout}
${result.stderr}`);
      }
      return result;
    }, {
      attributes: {
        pythonBin: process.env.PYTHON_BIN_PATH || "python",
        scriptPath,
        args: scriptArgs.join(" "),
        [SemanticInternalAttributes.STYLE_ICON]: "python"
      }
    });
  },
  async runInline(scriptContent, options = {}) {
    assert(scriptContent, "Script content is required");
    return await logger.trace("python.runInline()", async (span) => {
      span.setAttribute("contentLength", scriptContent.length);
      return await withTempFile(`script_${Date.now()}.py`, async (tempFilePath) => {
        span.setAttribute("tempFilePath", tempFilePath);
        const carrier = carrierFromContext();
        const pythonBin = process.env.PYTHON_BIN_PATH || "python";
        const result = await ve(pythonBin, [tempFilePath], {
          ...options,
          nodeOptions: {
            ...options.nodeOptions || {},
            env: {
              ...process.env,
              ...options.env,
              TRACEPARENT: carrier["traceparent"],
              OTEL_RESOURCE_ATTRIBUTES: `${SemanticInternalAttributes.EXECUTION_ENVIRONMENT}=trigger,${Object.entries(taskContext.attributes).map(([key, value]) => `${key}=${value}`).join(",")}`
            }
          },
          throwOnError: false
        });
        if (result.exitCode) {
          span.setAttribute("exitCode", result.exitCode);
        }
        if (result.exitCode !== 0) {
          throw new Error(`Inline script exited with a non-zero code ${result.exitCode}:
${result.stderr}`);
        }
        return result;
      }, scriptContent);
    }, {
      attributes: {
        pythonBin: process.env.PYTHON_BIN_PATH || "python",
        contentPreview: scriptContent.substring(0, 100) + (scriptContent.length > 100 ? "..." : ""),
        [SemanticInternalAttributes.STYLE_ICON]: "python"
      }
    });
  },
  // Stream namespace for streaming functions
  stream: {
    run(scriptArgs = [], options = {}) {
      const pythonBin = process.env.PYTHON_BIN_PATH || "python";
      const carrier = carrierFromContext();
      const pythonProcess = ve(pythonBin, scriptArgs, {
        ...options,
        nodeOptions: {
          ...options.nodeOptions || {},
          env: {
            ...process.env,
            ...options.env,
            TRACEPARENT: carrier["traceparent"],
            OTEL_RESOURCE_ATTRIBUTES: `${SemanticInternalAttributes.EXECUTION_ENVIRONMENT}=trigger,${Object.entries(taskContext.attributes).map(([key, value]) => `${key}=${value}`).join(",")}`
          }
        },
        throwOnError: false
      });
      const span = logger.startSpan("python.stream.run()", {
        attributes: {
          pythonBin,
          args: scriptArgs.join(" "),
          [SemanticInternalAttributes.STYLE_ICON]: "python"
        }
      });
      return createAsyncIterableStreamFromAsyncIterable(pythonProcess, {
        transform: /* @__PURE__ */ __name((chunk, controller) => {
          controller.enqueue(chunk);
        }, "transform"),
        flush: /* @__PURE__ */ __name(() => {
          span.end();
        }, "flush")
      });
    },
    runScript(scriptPath, scriptArgs = [], options = {}) {
      assert(scriptPath, "Script path is required");
      assert(fs.existsSync(scriptPath), `Script does not exist: ${scriptPath}`);
      const pythonBin = process.env.PYTHON_BIN_PATH || "python";
      const carrier = carrierFromContext();
      const pythonProcess = ve(pythonBin, [scriptPath, ...scriptArgs], {
        ...options,
        nodeOptions: {
          ...options.nodeOptions || {},
          env: {
            ...process.env,
            ...options.env,
            TRACEPARENT: carrier["traceparent"],
            OTEL_RESOURCE_ATTRIBUTES: `${SemanticInternalAttributes.EXECUTION_ENVIRONMENT}=trigger,${Object.entries(taskContext.attributes).map(([key, value]) => `${key}=${value}`).join(",")}`
          }
        },
        throwOnError: false
      });
      const span = logger.startSpan("python.stream.runScript()", {
        attributes: {
          pythonBin,
          scriptPath,
          args: scriptArgs.join(" "),
          [SemanticInternalAttributes.STYLE_ICON]: "python"
        }
      });
      return createAsyncIterableStreamFromAsyncIterable(pythonProcess, {
        transform: /* @__PURE__ */ __name((chunk, controller) => {
          controller.enqueue(chunk);
        }, "transform"),
        flush: /* @__PURE__ */ __name(() => {
          span.end();
        }, "flush")
      });
    },
    runInline(scriptContent, options = {}) {
      assert(scriptContent, "Script content is required");
      const pythonBin = process.env.PYTHON_BIN_PATH || "python";
      const pythonScriptPath = createTempFileSync(`script_${Date.now()}.py`, scriptContent);
      const carrier = carrierFromContext();
      const pythonProcess = ve(pythonBin, [pythonScriptPath], {
        ...options,
        nodeOptions: {
          ...options.nodeOptions || {},
          env: {
            ...process.env,
            ...options.env,
            TRACEPARENT: carrier["traceparent"],
            OTEL_RESOURCE_ATTRIBUTES: `${SemanticInternalAttributes.EXECUTION_ENVIRONMENT}=trigger,${Object.entries(taskContext.attributes).map(([key, value]) => `${key}=${value}`).join(",")}`
          }
        },
        throwOnError: false
      });
      const span = logger.startSpan("python.stream.runInline()", {
        attributes: {
          pythonBin,
          contentPreview: scriptContent.substring(0, 100) + (scriptContent.length > 100 ? "..." : ""),
          [SemanticInternalAttributes.STYLE_ICON]: "python"
        }
      });
      return createAsyncIterableStreamFromAsyncIterable(pythonProcess, {
        transform: /* @__PURE__ */ __name((chunk, controller) => {
          controller.enqueue(chunk);
        }, "transform"),
        flush: /* @__PURE__ */ __name(() => {
          span.end();
        }, "flush")
      });
    }
  }
};

// src/trigger/youtubeWorkflow.ts
var generateYoutubeInsightsDeck = task({
  id: "generate-youtube-insights-deck",
  run: /* @__PURE__ */ __name(async (payload) => {
    logger.info("Starting YouTube Insights Generation Workflow...");
    const env = {
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      GMAIL_CREDENTIAL_PATH: process.env.GMAIL_CREDENTIAL_PATH || "./credentials.json",
      GMAIL_TOKEN_PATH: process.env.GMAIL_TOKEN_PATH || "./token.json"
    };
    if (!env.YOUTUBE_API_KEY) {
      throw new Error("YOUTUBE_API_KEY is missing from environment variables.");
    }
    logger.info("Phase 1: Scraping YouTube Data...");
    const channelsArg = payload.channels && payload.channels.length > 0 ? ["--channels", ...payload.channels] : ["--find_top_channels", "30"];
    const limitArg = payload.limit ? ["--limit", payload.limit.toString()] : ["--limit", "5"];
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
      message: "Insights workflow completed successfully."
    };
  }, "run")
});
export {
  generateYoutubeInsightsDeck
};
//# sourceMappingURL=youtubeWorkflow.mjs.map
