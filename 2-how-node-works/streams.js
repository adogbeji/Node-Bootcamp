//jshint esversion:6

const fs = require("fs");
const http = require("http");

const server = http.createServer();

//Question: How to read a large text file from File System & send it over to client? 3 Solutions possible!

server.on("request", (req, res) => {
  //Solution 1: save file into variable & send to client
  /*fs.readFile(`${__dirname}/starter/test-file.txt`, "utf-8", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });*/  //Problem: Node must first load the entire file to memory before sending it through. Ok for small local tests, but NOT for producton!

  //Solution 2: Streams-no need to save file data into variable. Data is sent over piece-by-piece
  /*const readable = fs.createReadStream(`${__dirname}/starter/test-file.txt`);
  readable.on("data", chunk => {
    res.write(chunk);  //The response is a writable stream consisting of the data 'chunk' we've written to it
  });

  readable.on("end", () => {
    res.end();  //The 'end' method signals that no more data will be written to this writable stream. Response won't be sent otherwise!!
  });

  readable.on("error", err => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  });*/

  //Solution 3: Use the Node.js pipe() method
  const readable = fs.createReadStream(`${__dirname}/starter/test-file.txt`);
  readable.pipe(res);  //Use pipe() method on readable stream, and then put in a writable stream(ie. response(res))
  //  readableSource.pipe(writableDestination);
});

server.listen(8000, "127.8.0.1", () => {
  console.log("Listening...");
});
