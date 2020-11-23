//jshint esversion:6

const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)  //We must first read data before sending it though; we're outside of Event Loop, so Synchronous code is fine!
);

exports.checkID = (req, res, next, val) => {  //Param Middleware
  console.log(`Tour id is: ${val}`);

  const id = req.params.id * 1;  //This will convert the id from string --> number data type

  if (id > tours.length) {
    return res.status(404).json({  //Return allows us to exit function
      status: "fail",  //Status of 'fail' is sent whenever we have a 400 code
      message: "Invalid ID"
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {  //'Normal' Middleware
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price!"
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",  //Status can either be 'success', 'fail' or 'error'.
    requestedAt: req.requestTime,
    results: tours.length,  //This field isn't essential, but shows client the number of results/objects we are sending
    data: {
      tours: tours  //In ES6, there's no need to specify both key AND value if they have the same name!
    }
  });
};

exports.getTour = (req, res) => {  //Route which can accept a variable(eg.id)
  const id = req.params.id * 1;  //This will convert the id from string --> number data type

  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length-1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);  //Tour consists of body we've sent('req.body') + the new ID we created

  tours.push(newTour);
  fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {  //We must persist the 'newTour' into the file
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    });
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<updated tour here...>"  //Placeholder for updated tour
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({  //Response to delete requests is usually a 204 (No Content)
    status: "success",
    data: null  //Just send 'null' to show that the deleted resouce no longer exists
  });
};
