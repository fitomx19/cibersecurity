//creamos el controlador de rutas
// Path: backend\controller\rutasController.js
const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");
const Usuario = require("../models/Usuario");
const InicioSesion = require("../models/InicioSesion");
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const HistorialContras = require("../models/registroPasswords");

require("dotenv").config({ path: "variables.env" });
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "nathanael91@ethereal.email", // dirección de correo electrónico desde la que se enviarán los correos electrónicos
    pass: "QcFzHrDJWCYcw7McRR", // contraseña de la dirección de correo electrónico
  },
});

exports.home = async (req, res) => {
  const resultado = await Usuario.find();
  if (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ mensaje: "No se encontraron resultados" });
    }
  } else {
    res.status(404).json({ mensaje: "No se encontraron resultados" });
  }
};

exports.registrar = async (req, res) => {
  console.log(req.body);
  if (req.body) {
    let { nombre, perfil, correo, password, confirmar } = req.body;
    console.log(nombre);
    if (password !== confirmar) {
      res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
      return;
    }
    //cifrar la contraseña
    const salt = await bcryptjs.genSalt(15);
    password = await bcryptjs.hash(password, salt);

    const correo_existente = await Usuario.find({ correo: correo });
    console.log(correo_existente);
    if (correo_existente?.length > 0) {
      res.status(230).json({ mensaje: "Ya existe un usuario con este correo" });
    } else {
      var personData = new Usuario({
        nombre: nombre,
        login: perfil,
        contrasena: password,
        correo: correo,
        perfil: 1,
        activo: true,
      });

      var personData2 = new HistorialContras({
        login: correo,
        contrasenas: [password],
        actualizado: false,
      });

      const resultado = await personData.save(personData);
      const resultado2 = await personData2.save(personData2);
      res.status(200).json({ success: "Registrado correctamente" });
    }
  } else {
    res.status(415).json({ mensaje: "No se mando ninguna peticion" });
  }
};
exports.logueado = async (req, res) => {
  if (!req.session.user) {
    res.status(401).send({ message: "No autorizado" });
  } else {
    res.status(200).send({ message: "Autorizado" });
  }
};

exports.cerrarSesion = async (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: "Sesión finalizada" });
};

exports.iniciarSesion = async (req, res) => {
  let exitoso = false;
  let { perfil, password } = req.body;
  console.log(perfil);
  //desencriptar la contraseña

  const resultado = await Usuario.find({ correo: perfil });
  const resultado2 = await HistorialContras.find({ login: perfil });

  if (resultado) {
    //obtener el campo password de resultado
    
    if (resultado.length > 0) {
      console.log("encontro el correo")
      const passCorrecto = await bcryptjs.compare(
        password,
        resultado[0].contrasena
      );
      console.log(passCorrecto)
      if (passCorrecto) {
        req.session.user = { username: resultado[0].nombre };
        console.log(resultado2);
        if (resultado2.length > 0) {
          console.log("este es->", resultado2[0].actualizado);
          if (resultado2[0].actualizado == true) {
            console.log(resultado2[0].actualizado[0]);
            //actualizar el historial de contraseñas con el parametro actualizado en true
            const resultado3 = await HistorialContras.updateOne(
              { correo: perfil },
              { $set: { actualizado: false } }
            );
            console.log("entro correctamente");
            res.status(201).json({ username: resultado[0].correo });
          }else{
            //login normal
            console.log("entro correctamente")
            var personData = new InicioSesion({
              login: perfil,
              exitoso: true,
            });
            const resultado4 = await personData.save(personData);
            res.status(200).json({ username: resultado[0].correo });
          }
        } else {
          //insertar si fue exitoso el inicio de sesion
          var personData = new InicioSesion({
            login: perfil,
            exitoso: true,
          });
          const resultado4 = await personData.save(personData);
          res.status(200).json({ username: resultado[0].correo });
        }
      } else {
        var personData = new InicioSesion({
          login: perfil,
          exitoso: false,
        });
        const resultado4 = await personData.save(personData);
        res.status(404).json({ mensaje: "Correo/Contraseña Erroneos" });
      }
    } else {
      res.status(404).json({ mensaje: "Correo/Contraseña Erroneos ->" });
    }
  }
};

exports.recuperarContrasena = async (req, res) => {
  console.log(req.body);
  let { correo } = req.body;

  //generar una contraseña aleatoria
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let longitud = 8;
  let contrasena = "";
  for (let i = 0; i < longitud; i++) {
    contrasena += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }

  const resultado = await Usuario.find({ correo: correo });

  if (resultado) {
    if (resultado.length > 0) {
      let mailOptions = {
        from: "nathanael91@ethereal.email",
        to: correo,
        subject: "Recuperación de contraseña",
        text:
          "Hola, solicistaste recuperar tu contraseña, tu nueva contraseña es: " +
          contrasena +
          " , te recomendamos cambiarla lo antes posible",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo electrónico enviado: " + info.response);
          res.json({ mensaje: "Correo enviado correctamente a " + correo });
        }
      });
    }
    //actualizar la contraseña
    const salt = await bcryptjs.genSalt(15);
    contrasena = await bcryptjs.hash(contrasena, salt);
    const resultado2 = await Usuario.updateOne(
      { correo: correo },
      { $set: { contrasena: contrasena } }
    );

    //guardar la contraseña en el historial
    const resultado3 = await HistorialContras.updateOne(
      { login: correo },
      { $push: { contrasenas: contrasena } },
      
    );
    
    const resultado4 = await HistorialContras.updateOne(
      { login: correo },
      { $set: { actualizado: true } }
    );
    

    console.log(resultado2);
    console.log(resultado3)
    console.log(resultado4)
  } else {
    console.log("No se encontraron resultados");
  }
};

exports.actualizarContrasena = async (req, res) => {
  let { password2, password,correo } = req.body;
  console.log(correo);
  if (password !== password2) {
    res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
    return;
  }
  //cifrar la contraseña
  const salt = await bcryptjs.genSalt(15);
  password = await bcryptjs.hash(password, salt);

  //actualizar la contraseña
  const resultado2 = await Usuario.updateOne(
    { correo: correo },
    { $set: { contrasena: password } }
  );

  //si existe la contraseña en el historial no se puede actualizar
  const resultado4 = await HistorialContras.find({ login: correo });
  if (resultado4) {
    if (resultado4.length > 0) {
      console.log(resultado4);
      if (resultado4[0].contrasenas.includes(password)) {
        res.status(400).json({ mensaje: "La contraseña ya existe" });
        return;
      }
    }
  }
  //guardar la contraseña en el historial
  const resultado3 = await HistorialContras.updateOne(
    { login: correo },
    { $push: { contrasenas: password } }
  );

  //guardar la contraseña en Usuario
  const resultado = await Usuario.updateOne(
    { correo: correo },
    { $set: { contrasena: password } }
  );

  const resultado5 = await HistorialContras.updateOne(
    { login: correo },
    { $set: { actualizado: false } }
  );

  console.log(resultado2);

  //regresar un json con el mensaje de que se actualizo correctamente
  res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });
};

module.exports = exports;
