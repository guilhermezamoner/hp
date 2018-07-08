let mongoose = require('mongoose');

let petSchema = mongoose.Schema({
  nome:{
    type: String,
    required: true,
    maxlength: 30,
    minlength: 3
  },
  tipo:{
    type: String,
    enum: ['CACHORRO','GATO','OUTROS'],
    required: true
  },
  descricao:{
    type: String,
    required: true
  }
});