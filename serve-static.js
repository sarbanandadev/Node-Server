const http = require("http");
const url = require("url");
const fs = require("fs");

// const lookup = require("mime-types").lookup;

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  // if (path == "") {
  //   path = "index.html";
  // }
  if (path == "") {
    path = "index.html";
  }
  //  else if (path == "about") {
  //   path = "about.html";
  // } else if (path == "contact") {
  //   path = "contact.html";
  // } else {
  //   path = "404.html";
  // }
  console.log(`Requested path ${path} `);

  let file = __dirname + "/public/" + path;
  fs.readFile(file, function (err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      // let mime = lookup(path);
      // res.writeHead(200, { "Content-type": mime });
      switch (path) {
        case "style.css":
          res.writeHead(200, { "Content-type": "text/css" });
          break;
        case "main.js":
          res.writeHead(200, { "Content-type": "application/javascript" });
          break;
        case "index.html":
          res.writeHead(200, { "Content-type": "text/html" });
      }
      res.end(content);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listening on port localhost:3000");
});
