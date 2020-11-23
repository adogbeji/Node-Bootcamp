//jshint esversion:6

const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tour-routes");
const userRouter = require("./routes/user-routes");

const app = express();

// 1) Middlewares

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));  // 'dev' is one of many pre-defined string arguments you can pass into morgan function. Also try 'tiny'
}

app.use(express.json());  //This is temporary middleware allowing us to access data sent over to the server via POST requests
app.use(express.static(`${__dirname}/public`));  //For serving static files

app.use((req, res, next) => {  //Adding the 'next()' function as an argument tells Express that we're defining a Middleware
  console.log("Hello from the Middleware!");
  next();  //Always call the 'next()' funciton in all your Middleware, otherwise response won't be sent to client!
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use("/api/v1/tours", tourRouter);  //Route that router middleware will be used on
app.use("/api/v1/users", userRouter);  //Route that router middleware will be used on

module.exports = app;
