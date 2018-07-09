const express = require('express');
const router = express.Router();
var userController = require("../controllers/userController.js");
const passport = require('passport');

// Bring in User Model
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Proccess
router.post('/register', function(req, res){
  userController.register(req, res);
});

// Login Form
router.get('/login', function(req, res){
  res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

router.get('/edit/:id', function(req, res) {
  userController.edit(req, res);
});

router.post('/update/:id', function(req, res) {
  userController.update(req, res);
});

router.get('/delete/:id', function(req, res, next) {
  userController.delete(req, res);
});

module.exports = router;
