var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.createReadStream("./index.html").pipe(res);
    }
    if (req.url === "/posting" && req.method == "POST") {
      var rawData = "";
      req.on("data", function (data) {
        rawData += data;
      });

      req.on("end", function () {
        var inputData = new URLSearchParams(rawData);

        res.writeHead(200, { "Content-Type": "text/html" });

        let tableData = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
                    body {
                left: 50%;
                top: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
              }
              table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid;
              }
        
              tr,
              td {
                border: 1px solid;
                color: blue;
                padding: 15px;
              }
              h1 {
                color: blue;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <h1><u>User Submitted Details</u></h1>
            <table>
              <tr >
                <td ">Name:</td>
                <td ">${inputData.get("username")}</td>
              </tr>
              <tr ">
                <td ">Password:</td>
                <td ">${inputData.get("password")}</td>
              </tr>
              <tr >
                <td >Age:</td>
                <td >${inputData.get("age")}</td>
              </tr>
              <tr >
                <td >Mobile Number:</td>
                <td >${inputData.get("mnumber")}</td>
              </tr>
              <tr >
                <td >Email:</td>
                <td >${inputData.get("email")}</td>
              </tr>
              <tr >
                <td >Gender:</td>
                <td >${inputData.get("gender")}</td>
              </tr>
              <tr >
                <td >State:</td>
                <td >${inputData.get("event")}</td>
              </tr>
              <tr >
                <td >Skills:</td>
                <td >${inputData.get("skills")}</td>
              </tr>
            </table>
          </body>
        </html>
        `;
        res.write(tableData);
        res.end();
      });
    }
  })
  .listen(2000);
