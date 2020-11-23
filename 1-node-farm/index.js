//jshint esversion:6

const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

//////////////////////////////////////////////FILES/////////////////////////////////////////////////////

// Blocking, synchronous way
// const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `Here's some interesting information about Avocados: ${textIn}.\n created on: 26/11/19`;  //Use the back-tick(``) when using embedded expressions
// fs.writeFileSync("./starter/txt/output.txt", textOut);
// console.log("File successfully written!");

// Non-blocking, asynchronous way
// fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR");  //Example of how you might handle an error!
//
//   fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//
//       fs.writeFile("./starter/txt/final.txt", `${data2}\n${data3}`, (err) => {
//         console.log("Your file has been successfully written!");
//       });
//     });
//   });
// });
// console.log("File being read!");

//////////////////////////////////////////////SERVER/////////////////////////////////////////////////////

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, "utf-8");  //Top-level code is only executed ONCE, fine to use synchronous version!
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const slugs = dataObject.map(el => slugify(el.productName, {lower: true}));

const server = http.createServer((req, res) => {  //Server is created here

  const {query, pathname} = url.parse(req.url, true);

  //Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {"Content-type": "text/html"});

    const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

  //Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {"Content-type": "text/html"});
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

  //API
  } else if (pathname === "/api") {
    res.writeHead(200, {"Content-type": "application/json"});
    res.end(data);

  //Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",  //HTTP header 'Content-type' means that browser is now expecting HTML!
      "My-name": "Ben"  //A custom/made up header
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.8.0.1", () => {
  console.log("Listening to requests on port 8000");  //This listens to incoming requests
});
