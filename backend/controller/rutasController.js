//creamos el controlador de rutas
// Path: backend\controller\rutasController.js

const Usuario = require("../models/Usuario");


exports.home = async (req, res) => {
    const resultado = await Usuario.find();
    if(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(404).json({mensaje : "No se encontraron resultados"});
        }
    }else{
        res.status(404).json({mensaje : "No se encontraron resultados"});
    }
};

  module.exports = exports;


