// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const PORT = 3000;
// http
//   .createServer(function (request, response) {
//     const url = request.url.toLowerCase();
//     if (url == "/") {
//       render("/public/index.html", response);
//     } else if (url == "/about") {
//       render("/public/about.html", response);
//     } else if (url == "/contact") {
//       render("/public/contact.html", response);
//     } else {
//       render("/public/404.html", response);
//     }
//   })
//   .listen(PORT, function () {
//     console.log(`Server is running http://localhost:${PORT}`);
//   });

// function render(filePath = String(), response) {
//   const file = path.join(__dirname, filePath);
//   const stat = fs.statSync(file);
//   response.writeHead(200, {
//     "Content-Type": "text/html",
//     "Content-Length": stat.size,
//   });
//   const readStream = fs.createReadStream(file);
//   readStream.pipe(response);
// }

// ======================================================================================

const http = require("http");
const fs = require("fs");
const path = require("path");

function send404(response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("Error 404: Resource not found.");
  response.end();
}

const mimeLookup = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
};

const server = http
  .createServer((req, res) => {
    if (req.method == "GET") {
      let fileurl;
      if (req.url == "/") {
        fileurl = "/public/index.html";
      } else if (req.url == "/about") {
        fileurl = "/public/about.html";
      } else if (req.url == "/contact") {
        fileurl = "/public/contact.html";
      } else {
        fileurl = "/public/404.html";
      }
      let filepath = path.resolve("./" + fileurl);

      let fileExt = path.extname(filepath);
      let mimeType = mimeLookup[fileExt];

      if (!mimeType) {
        send404(res);
        return;
      }
      fs.exists(filepath, (exists) => {
        if (!exists) {
          send404(res);
          return;
        }
        res.writeHead(200, { "Content-Type": mimeType });
        fs.createReadStream(filepath).pipe(res);
      });
    }
  })
  .listen(3000);
console.log("Server running at port 3000");
