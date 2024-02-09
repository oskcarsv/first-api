const Mascota = require('../models/mascotas');

const existeMascotaById = async ( id = '') => {
    const existeMascota = await Mascota.findOne({id});
    if(existeMascota){
        throw new Error(`This pet id ${ id } not exists in database.`);
    }
}

module.exports = {
    existeMascotaById,
}