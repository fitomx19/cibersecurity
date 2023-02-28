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
        if(correo_existente.length > 0){
            res.status(411).json({mensaje : "Ya existe un usuario con este correo"});
        }else{
            var personData = new Usuario ({
                nombre:nombre,
                perfil:perfil,
                contrasena:password,
                correo: correo,

              })

            const resultado = await personData.save(personData);
        }
         
    }else{
        res.status(415).json({mensaje : "No se mando ninguna peticion"});
    }
    
}

  module.exports = exports;


