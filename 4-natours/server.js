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

const tourSchema = new mongoose.Schema({
  name: {  // Object here is the schema-type options
    type: String,
    required: [true, 'A tour must have a name!'], // Array contains error to be shown if required field is missing
    unique: true  // Prevents insertion of two documents with the same name
  },
  rating: {
    type: Number,
    default: 4.5  // Value to be used if field is missing
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price!']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({  // testTour is an instance of the Tour Model
  name: 'The Park Camper',
  price: 997
});

// NB: Code below should be commented out to prevent duplicate insertion!

// testTour.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log('ERROR: ', err);
// });

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}...`);
});
