const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'Name is required']
    },
    correo: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

/*UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario} = this.Object();
    return usuario;
}*/

module.exports = model('Usuario', UsuarioSchema);