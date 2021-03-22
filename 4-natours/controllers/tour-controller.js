//jshint esversion:6
// jshint esversion:8

const Tour = require('./../models/tour-model');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",  //Status can either be 'success', 'fail' or 'error'.
      results: tours.length,  //This field isn't essential, but shows client the number of results/objects we are sending
      data: {
        tours: tours  //In ES6, there's no need to specify both key AND value if they have the same name!
      }
    });
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {  //Route which can accept a variable(eg.id)
  try {
    const tour = await Tour.findById(req.params.id);
    // MongoDB equivalent:- Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: {
        tour
      }
    });
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
  // const newTour = new Tour({});
  // newTour.save();

  const newTour = await Tour.create(req.body);  // req.body is the data that comes with POST request

  res.status(201).json({
    status: "success",
      data: {
        tour: newTour
       }
   });
 } catch (err) {
   res.status(400).json({
     status: 'fail',
     message: 'Invalid data sent!'
   });
 }
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
