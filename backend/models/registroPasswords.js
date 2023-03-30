const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorialContras = Schema({
    login : String,
    contrasenas : [String],
    cambio_reciente : Boolean,
    actualizado : Boolean,
});

module.exports = mongoose.model("HistorialContras", HistorialContras);