const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8086;

const server = http.createServer((req, res) => {
  const filePath =
    req.url === "/"
      ? path.join(__dirname, "Front", "login.html")
      : path.join(__dirname, "Front", req.url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 404;
      res.end("Archivo no encontrado");
    } else {
      res.statusCode = 200;
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});