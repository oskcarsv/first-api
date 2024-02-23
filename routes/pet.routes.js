const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeMascotaById } = require('../helpers/db-validators-pet');

const { mascotasPost, mascotasGet, getMascotaByid, mascotasPut, mascotasDelete } = require('../controllers/mascota.controller');

const router = Router();

router.get("/", mascotasGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos,
    ], getMascotaByid);

router.post(
    "/",
    [
        check("nombre", "Name is required").not().isEmpty(),
        check("edad", "Age is required").not().isEmpty(),
        check("raza", "Breed is required").not().isEmpty(),
        check("sexo", "SEx is required").not().isEmpty(),
        check("peso", "Height is required").not().isEmpty(),
        validarCampos,
    ], mascotasPost);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos,
    ], mascotasPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos,
    ], mascotasDelete);

module.exports = router;