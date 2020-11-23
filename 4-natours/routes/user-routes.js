//jshint esversion:6

const express = require("express");

const userController = require("./../controllers/user-controller");

const router = express.Router();  //Router for 'Users' resource

//Users resource
router
.route("/")
.get(userController.getAllUsers)
.post(userController.createUser);

router
.route("/:id")
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;  //Exporting the router
