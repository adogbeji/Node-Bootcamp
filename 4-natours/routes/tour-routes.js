//jshint esversion:6

const express = require("express");

const tourController = require("./../controllers/tour-controller");

const router = express.Router();  //Router for 'Tours' resource

// router.param("id", tourController.checkID);

//Tours resource
router
.route("/")
.get(tourController.getAllTours)
.post(tourController.createTour);


router
.route("/:id")
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;  //Exporting the router
