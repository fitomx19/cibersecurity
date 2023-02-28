const express = require("express");
const router = express.Router();
//importamos el controlador
const rutasController = require('../controller/rutasController')

//creamos las rutas
router.get('/', rutasController.home)

router.post('/registrar', rutasController.registrar)


module.exports = router;