let mongoose = require('mongoose');

// Passeio Schema
let PasseiosSchema =  mongoose.Schema({
  pet:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: false
  },
  dono_pet:{
    type: String,
    required: true
  },
  andador:{
    type: String,
    required: false
  },
  valor_passeio:{
    type: String,
    required: true
  },
  situacao:{
    type: String,
    required: true
  }
});

let Passeios = module.exports = mongoose.model('Passeios', PasseiosSchema);
