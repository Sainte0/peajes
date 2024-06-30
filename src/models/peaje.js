const mongoose = require('mongoose');

const peajeSchema = new mongoose.Schema({
  ubicacion: {
    type: String,
    required: true,
  },
  tarifa: {
    type: Number,
    required: true,
  },
  vehiculos: {
    type: Number,
    required: true,
  },
});

const Peaje = mongoose.model('Peaje', peajeSchema);

module.exports = Peaje;
