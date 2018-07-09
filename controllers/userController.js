var mongoose = require("mongoose");
var User = require("../models/user");
const passport = require('passport');
const bcrypt = require('bcryptjs');

var userController = {};

userController.register = function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Nome é obrigatório!').notEmpty();
  req.checkBody('email', 'Email é obrigatório!').notEmpty();
  req.checkBody('email', 'Email não válido!').isEmail();
  req.checkBody('username', 'Username é obrigatório!').notEmpty();
  req.checkBody('password', 'Senha é obrigatório!').notEmpty();
  req.checkBody('password2', 'Senhas não conferem!').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
};

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

userController.delete = function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Usuário Deletado!");
      res.redirect("/");
    }
  });
};

module.exports = userController;
