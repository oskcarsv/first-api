const { Schema, model} = require('mongoose');

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
        required: [true, 'Wight of the pet is required'],
    },
    img:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


module.exports = model('Mascotas', MascotaSchema);