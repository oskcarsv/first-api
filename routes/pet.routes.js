const { Router } = require('express');
const { check } = require('express-validator');

const { existeMascotaById } = require('../helpers/db-validators-pet');

const { mascotasPost, mascotasGet, getMascotaByid, mascotasPut, mascotasDelete } = require('../controllers/mascota.controller');

const router = Router();

router.get("/", mascotasGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
    ], getMascotaByid);

router.post(
    "/",
    [
        check("nombre", "Name is required").not().isEmpty(),
        check("edad", "Age is required").not().isEmpty(),
        check("raza", "Breed is required").not().isEmpty(),
        check("sexo", "Breed is required").not().isEmpty(),
        check("peso", "Breed is required").not().isEmpty(),
    ], mascotasPost);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
    ], mascotasPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
    ], mascotasDelete);

module.exports = router;