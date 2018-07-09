const express = require('express');
const router = express.Router();

// Passeios Model
let Passeios = require('../models/passeios');
// User Model
let User = require('../models/user');

var passeios = require("../controllers/passeiosController.js");


// Add Route
router.get('/add',ensureAuthenticated, function(req, res){
  passeios.getPets(req, res);

});

// Add Submit POST Route
router.post('/add',ensureAuthenticated, function(req, res){
  req.checkBody('pet','Pet é requerido').notEmpty();
  req.checkBody('body','Descrição é  requerida').notEmpty();
  req.checkBody('valor_passeio','Valor do Passeio é requerido').notEmpty();
  req.checkBody('situacao','Status do passeio é requerido').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('../views/passeio/add_passeios', {
      title:'Novo Passeio',
      errors:errors
    });
  } else {
    passeios.create(req, res);
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Passeios.findById(req.params.id, function(err, passeios){
    if(passeios.dono_pet != req.user._id){
      req.flash('danger', 'Não Autorizado');
      res.redirect('/');
    }
    res.render('../views/passeio/edit_passeios', {
      title:'Editar Passeio',
      passeios:passeios
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  //console.log("chegou");
  passeios.edit(req, res);
});

// Delete Paseio
router.get('/delete/:id', ensureAuthenticated,function(req, res){
    passeios.delete(req, res);
  });

// obter passeio
router.get('/:id', function(req, res){
  Passeios.findById(req.params.id, function(err, passeios){
    User.findById(passeios.dono_pet, function(err, user){
      res.render('../views/passeio/passeio', {
        passeios:passeios,
        dono_pet: user.name
      });
    });
  });
});

// obter passeios do usuario
router.get('/list/:id', ensureAuthenticated,function(req, res){
  Passeios.find({dono_pet: req.params.id}).exec(function(err, passeios){
    if(err){
      console.log(err);
    } else {
      //console.log(passeios);
      res.render('../views/passeio/list', {
        title:'Meus Passeios',
        passeios: passeios
      });
    }
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Por favor, Faça o Login!');
    res.redirect('/users/login');
  }
}

module.exports = router;
