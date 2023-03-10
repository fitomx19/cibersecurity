const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = Schema({
    login : String,
    contrasena : String,
    nombre : String,
    perfil : Number,
    correo : String,
    activo : Boolean
});

module.exports = mongoose.model("Usuario", Usuario);