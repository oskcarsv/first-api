const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const Role = require('../models/role');


const usuariosPost = async (req, res) =>{
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

const usuariosGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
} 

const getUsuarioByid = async (req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    await Usuario.findByIdAndUpdate(id, resto);

    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        msg: 'User updated successfullys',
        usuario
    })
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params;
    await Usuario.findByIdAndUpdate(id,{estado: false});

    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        msg: 'User deleted successfullys',
        usuario
    });
}


const login = async (req, res) => {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({correo});

    if(!usuario){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
    }

    if(!usuario.estado){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
        });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if(!validPassword){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
        });
    }

    res.status(200).json({
        msg: 'Login success'
    });
}


module.exports = {
    usuariosDelete,
    usuariosPost,
    usuariosGet,
    getUsuarioByid,
    usuariosPut,
    login
}