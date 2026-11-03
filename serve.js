/* Tiny zero-dependency preview server.
   Run from this folder:  node serve.js   → http://localhost:8099
   (Any static server works too: `npx serve .` or `python -m http.server`) */
const http = require("http");
const fs = require("fs");
const path = require("path");
const https = require("https");

// The OMS careers API sends no CORS headers yet, so the careers form on
// localhost calls /oms-careers/... and this server forwards it to OMS.
const OMS_CAREERS = "https://oms.kaizeninfotech.com/API/api/public/careers";

function proxyCareers(req, res) {
  const target = new URL(OMS_CAREERS + req.url.slice("/oms-careers".length));
  const headers = { accept: req.headers.accept || "application/json" };
  if (req.headers["content-type"]) headers["content-type"] = req.headers["content-type"];
  if (req.headers["content-length"]) headers["content-length"] = req.headers["content-length"];
  const up = https.request(target, { method: req.method, headers }, (r) => {
    res.writeHead(r.statusCode, { "Content-Type": r.headers["content-type"] || "application/json" });
    r.pipe(res);
  });
  up.on("error", () => {
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, data: null, error: { code: "proxy_error", message: "Could not reach the careers service." } }));
  });
  req.pipe(up);
}

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8099;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    if (req.url === "/oms-careers" || req.url.startsWith("/oms-careers/") || req.url.startsWith("/oms-careers?")) return proxyCareers(req, res);
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath.endsWith("/")) urlPath += "index.html";

    // Resolve inside ROOT only — no path traversal out of the site folder
    const file = path.normalize(path.join(ROOT, urlPath));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, () => console.log(`Kaizen site → http://localhost:${PORT}`));
