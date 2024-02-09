const { response, json } = require('express');
const Mascota = require('../models/mascotas');

const mascotasPost = async (req, res) =>{
    const { nombre, edad, raza, sexo, peso } = req.body;
    const mascota = new Mascota({nombre, edad, raza, sexo, peso});

    await mascota.save();
    res.status(200).json({
        mascota
    });
}

const mascotasGet = async (req, res = response ) => {
    const { limite, desde } = req.query;
    const query = { estado: true};

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
} 

const getMascotaByid = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}


const mascotasPut = async (req, res) => {
    const { id } = req.params;
    const { _id, edad, raza, ...resto} = req.body;

    await Mascota.findByIdAndUpdate(id, resto);

    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: 'User updated successfullys',
        mascota
    })
}

const mascotasDelete = async (req, res) => {
    const {id} = req.params;
    await Mascota.findByIdAndUpdate(id,{estado: false});

    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: 'User deleted successfullys',
        mascota
    });
}



module.exports = {
    mascotasPost,
    mascotasGet,
    getMascotaByid,
    mascotasPut,
    mascotasDelete
}
