//jshint esversion:6

const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const app = require("./app");

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModifiy: false
})
.then(() => { // connect() method returns promise that has access to connection object
  // console.log(con.connections);
  console.log('MongoDB Connected!');
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}...`);
});
