//creamos el controlador de rutas
// Path: backend\controller\rutasController.js

const { ObjectId } = require("mongodb");
const Usuario = require("../models/Usuario");
var mongoose = require('mongoose');


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

exports.registrar = async(req,res) => {
   console.log(req.body)
    if(req.body){
        /*
        nombre: nombre,
          perfil:perfil,
          correo:correo,
          password:password,
          confirmar:confirmar
        */
        let {nombre,perfil,correo,password,confirmar} = req.body;
        console.log(nombre)
        const correo_existente = await Usuario.find({correo:correo})
        console.log(correo_existente)
        if(correo_existente?.length > 0){
            res.status(230).json({mensaje : "Ya existe un usuario con este correo"});
        }else{
           
            var personData = new Usuario ({
                nombre:nombre,
                login:perfil,
                contrasena:password,
                correo: correo,
                perfil: 1,
                activo: true
              })

            const resultado = await personData.save(personData);
            res.status(200).json({success : "Registrado correctamente"});
        }
         
    }else{
        res.status(415).json({mensaje : "No se mando ninguna peticion"});
    }
    
}

exports.iniciarSesion = async(req,res) => {
    //console.log(req.body)

    let {perfil,password} = req.body;

    const resultado = await Usuario.find({login:perfil,contrasena:password})
    const usuario = await Usuario.find({login:perfil})
    console.log(resultado)
    console.log(usuario)
    if(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else if(usuario.length > 0){
            res.status(400).json({mensaje : "Contraseña incorrecta"});
        }else{
            res.status(404).json({mensaje : "No se encontraron resultados"});
        }
    
    }else{
        res.status(404).json({mensaje : "No se encontraron resultados"});
    }

}

  module.exports = exports;


