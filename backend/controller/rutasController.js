//creamos el controlador de rutas
// Path: backend\controller\rutasController.js

const { ObjectId } = require("mongodb");
const Usuario = require("../models/Usuario");
const InicioSesion = require("../models/InicioSesion");
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: "variables.env" });

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
    console.log(req.body)
    let exitoso = false;
    let {perfil,password} = req.body;

    const resultado = await Usuario.find({login:perfil,contrasena:password})
    const usuario = await Usuario.find({login:perfil})
    console.log(resultado)
    console.log(usuario)

    const payload = {
        usuario: {
            id: usuario._id
        }
    };


    if(resultado){
        if(resultado.length > 0){
            jwt.sign(payload, process.env.SECRETA, {
                expiresIn: 3600 // 1 hora
            }, (error, token) => {
                if(error) throw error;
                // Mensaje de confirmación
                res.json({ token  });
            });
        exitoso = true;
        }else if(usuario.length > 0){
            res.status(400).json({mensaje : "Contraseña incorrecta"});
        }else{
            res.status(404).json({mensaje : "No se encontraron resultados"});
        }

        //guardar en la base de datos el inicio de sesion


        const inicio = new InicioSesion({
            login:perfil,
            correo:usuario[0]?.correo,
            fecha: new Date(),
            exitoso: exitoso
        })

        const resultadInicio = await inicio.save(inicio);
    
    }else{
        res.status(404).json({mensaje : "No se encontraron resultados"});
    }

}

  module.exports = exports;


