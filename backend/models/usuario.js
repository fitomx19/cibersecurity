const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = Schema({
    nombre : String,
    apellido : String,
    email : String,
    password : String,
});

module.exports = mongoose.model("Usuario", Usuario);