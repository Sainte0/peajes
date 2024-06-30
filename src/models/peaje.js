const mongoose = require('mongoose')

const peajeSchema = new mongoose.Schema({
  patente: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  tarifa: {
    type: Number,
    required: true,
  },
  tipo_vehiculo: {
    type: String,
    required: true,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
})

const Peaje = mongoose.model('Peaje', peajeSchema)

module.exports = Peaje
