var mongoose = require("mongoose");
var Passeios = require("../models/passeios");
var Pets = require("../models/pet");
const passport = require('passport');
let User = require('../models/user');
var passeiosController = {};

passeiosController.getPets = function(req, res) {
  Pets.find({dono: req.user._id}).exec(function (err, pets) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      //console.log(pets);
      res.render('../views/passeio/add_passeios', {
        title:'Novo Passeio',
        pets: pets
      });
    }
  });
};

passeiosController.create = function(req, res) {
    let passeio = new Passeios();
    passeio.pet = req.body.pet;
    passeio.body = req.body.body;
    passeio.dono_pet = req.user._id;
    passeio.andador = "";
    passeio.valor_passeio = req.body.valor_passeio;
    passeio.situacao = req.body.situacao;

    passeio.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Passeio Adicionado!');
        res.redirect('/passeios/list/'+req.user._id);
      }
    });
};

passeiosController.edit = function(req, res) {
  let passeio = {};
  passeio.pet = req.body.pet;
  passeio.body = req.body.body;
  passeio.dono_pet = req.user._id;
  passeio.andador = "";
  passeio.valor_passeio = req.body.valor_passeio;
  passeio.situacao = req.body.situacao;

  let query = {_id:req.params.id}

  Passeios.update(query, passeio, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Passeio Atualizado');
      res.redirect('/passeios/list/'+req.user._id);
    }
  });
};

passeiosController.delete = function(req, res) {
  //console.log("chegou");
  let query = {_id:req.params.id}

  Passeios.findById(req.params.id, function(err, passeio){
      Passeios.remove(query, function(err){
        if(err){
          console.log(err);
        }
        req.flash('Success','Passeio excluido!');
        res.redirect('/passeios/list/'+ req.user._id);
      });
    });
};

module.exports = passeiosController;
