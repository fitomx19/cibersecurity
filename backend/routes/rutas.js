const express = require("express");
const router = express.Router();
//importamos el controlador
const rutasController = require('../controller/rutasController')

//creamos las rutas
router.get('/', rutasController.home)

router.post('/registrar', rutasController.registrar)

router.post('/iniciar-sesion', rutasController.iniciarSesion)

router.get('/cerrar-sesion' , rutasController.cerrarSesion)

router.get('/logueado', rutasController.logueado)

router.post('/recuperar-contrasena', rutasController.recuperarContrasena)

router.post('/actualizar-contrasena', rutasController.actualizarContrasena)

module.exports = router;