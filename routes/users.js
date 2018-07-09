const express = require('express');
const router = express.Router();
var userController = require("../controllers/userController.js");
const passport = require('passport');
var user = require("../controllers/userController.js");

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
  req.flash('success', 'Você está desconectado');
  res.redirect('/users/login');
});

router.get('/edit/:id',ensureAuthenticated, function(req, res) {
  if(req.user._id == req.params.id){
    user.edit(req, res);
  } else {
    req.flash('danger','Voce não tem permissão para acessar está conta');
    res.redirect('/');
  }
});

router.post('/update/:id', ensureAuthenticated,function(req, res) {
  userController.update(req, res);
});

router.get('/delete/:id', ensureAuthenticated,function(req, res, next) {
  userController.delete(req, res);
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    //console.log(req.users);
    return next();
  } else {
    req.flash('danger', 'Por favor, Faça o Login!');
    res.redirect('/users/login');
  }
}

module.exports = router;
