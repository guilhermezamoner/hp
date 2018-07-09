var mongoose = require("mongoose");
var User = require("../models/user");
const passport = require('passport');

var userController = {};

userController.edit = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/user/edit", {user: user});
    }
  });
};

userController.update = function(req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password }}, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.render("../views/user/edit", {user: req.body});
    }
    req.flash('success','Sua conta foi atualizada!')
    res.redirect("/");
  });
};

module.exports = userController;
