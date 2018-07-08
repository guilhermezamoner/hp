var express = require('express');
var router = express.Router();
var pet = require("../controllers/petController.js");

// Get all pets
router.get('/', function(req, res) {
  pet.list(req, res);
});

// Get single pet by id
router.get('/show/:id', function(req, res) {
  pet.show(req, res);
});

// Create pet
router.get('/create', function(req, res) {
  pet.create(req, res);
});

// Save pet
router.post('/save', function(req, res) {
  pet.save(req, res);
});

// Edit pet
router.get('/edit/:id', function(req, res) {
  pet.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  pet.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  pet.delete(req, res);
});

module.exports = router;