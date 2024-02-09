const { Schema, model} = require('mongoose');
const Usuario = require('../models/usuario');


const MascotaSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'Name of the pet is required']
    },
    edad: {
        type: String,
        required: [true, 'Age of the pet is required'],
    },
    raza: {
        type: String,
        required: [true, 'Breed of the pet is required'],
    },
    sexo: {
        type: String,
        required: [true, 'Sex of the pet is required'],
    },
    peso: {
        type: String,
        required: [true, 'Weigt of the pet is required'],
    },
    estado:{
        type: Boolean,
        default: true
    },
});


module.exports = model('Mascotas', MascotaSchema);