const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "app.log");


function writeLog(level, message) {
  const now = new Date();
  const witaTime = now.toLocaleString("id-ID", { timeZone: "Asia/Makassar" });

  const log = `[${level}] ${witaTime} - ${message}\n`;
  fs.appendFileSync(logFile, log);
}

module.exports = {
  info: (message) => writeLog("INFO", message),
  warning: (message) => writeLog("WARNING", message),
  error: (message) => writeLog("ERROR", message)
};
