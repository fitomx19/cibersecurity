const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InicioSesion = Schema({
    login : String,
    correo : String,
    fecha: Date,
    exitoso: Boolean
});

module.exports = mongoose.model("InicioSesion", InicioSesion);