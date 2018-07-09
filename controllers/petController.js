var mongoose = require("mongoose");
var Pet = require("../models/pet");

var petController = {};

// Show list of pet
petController.list = function(req, res) {
  Pet.find({dono : req.user._id}, function (err, pets) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pet/index", {
        title:'Meus Pets',
        pets: pets
      });
    }
  });
};

// Show pet by id
petController.show = function(req, res) {
  Pet.findOne({_id: req.params.id}).exec(function (err, pet) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pet/pet", {pet: pet});
    }
  });
};

// Create new pet
petController.create = function(req, res) {
  res.render('../views/pet/add_pet', {
    title:'Adicionar Pet'
  });
};

// Save new pet
petController.save = function(req, res) {
  let pet = new Pet();
  pet.nome = req.body.nome;
  pet.tipo = req.body.tipo;
  pet.descricao = req.body.descricao;
  pet.dono = req.user._id;

  pet.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/pet/add_pet");
    } else {
      req.flash('sucesso','Pet adicionado!');
      res.redirect('/');
    }
  });
};

// Edit an pet
petController.edit = function(req, res) {
  Pet.findOne({_id: req.params.id}).exec(function (err, pet) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pet/edit", {pet: pet});
    }
  });
};

// Update an pet
petController.update = function(req, res) {
  Pet.findByIdAndUpdate(req.params.id, 
    { $set: 
     { 
      nome: req.body.name, 
      descricao: req.body.address, 
      tipo: req.body.tipo, 
      dono: req.user._id
     }
    }, 
      { new: true }, function (err, pet) {
    if (err) {
      console.log(err);
      res.render("../views/pet/edit", {pet: req.body});
    }
    res.redirect("/pet/show/"+pet._id);
  });
};

// Delete an pet
petController.delete = function(req, res) {
  Pet.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Pet deleted!");
      res.redirect("/pet");
    }
  });
};

module.exports = petController;