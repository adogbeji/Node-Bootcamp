//jshint esversion:6

const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {  //Extension of EventEmitter class is how the different Node core modules implement events internally
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {  //Event listener/observer
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {  //Event listener/observer
  console.log("Customer Name: Paul");
});

myEmitter.on("newSale", stock => {
  console.log(`There are now ${stock} items left in stock!`);
});

myEmitter.emit("newSale", 9);  //Event Emitter

///////////////////Listening to events emitted from Web Server//////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request reveived!");
  res.end("Request received!");
});

server.on("request", (req, res) => {
  console.log("Another request!");
});

server.on("close", () => {  //The 'close' event is fired when the server closes down
  console.log("Server closed");
});

server.listen(8000, "127.8.0.1", () => {
  console.log("Waiting for requests...");
});
