
import styled from "styled-components";
import { useState } from 'react';
import { API } from '../config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom';
import { Link , useNavigate} from "react-router-dom";

function Login() {
  const [nombre, setNombre] = useState("");
  const [perfil, setPerfil] = useState("");
  const [perfil2, setPerfil2] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje,setMensaje] = useState("");
  const [alerta,setAlerta] = useState("");

  
  let history = useNavigate()


  let iniciarSesion = async (e) => {
    e.preventDefault();
    const json = JSON.stringify({
      perfil:perfil2,
      password:password2
    });
    console.log(json)
    if(perfil2 === "" || password2 === ""){
      setAlerta("Todos los campos son obligatorios 2");
      //esperar 3 segundos
      setTimeout(() => {
        setAlerta("");
      }, 3000);
      return;
    }

    try {

      let res = await axios.post(`${API}iniciar-sesion`, json ,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data)
      if(res.data.mensaje){
        setAlerta(res.data.mensaje);
      }else{
        setAlerta("");
        setMensaje("Usuario encontrado correctamente");
        //mandar a la pagina de home
        history('/home')
      }

    } catch (error) {
      console.log(error)
    }
  }

  let handleSubmit = async (e) => {
    e.preventDefault();

    const json = JSON.stringify({
      nombre: nombre,
      perfil:perfil,
      correo:correo,
      password:password,
      confirmar:confirmar
    });

    if(password !== confirmar){
      setAlerta("Las contraseñas no coinciden");
      return;
    }
    if(nombre === "" || perfil === "" || correo === "" || password === "" || confirmar === ""){
      setAlerta("Todos los campos son obligatorios");
      //esperar 3 segundos
      setTimeout(() => {
        setAlerta("");
      }, 3000);
      return;
    }

    try {
      let res = await axios.post(`${API}registrar`, json ,{
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.data)
      if(res.data.mensaje){
        setNombre("");
        setPerfil("");
        setCorreo("");
        setPassword("");
        setConfirmar("");
        setAlerta(res.data.mensaje);
        
      }else{
        console.log("registrado ->")
        setNombre("");
        setPerfil("");
        setCorreo("");
        setPassword("");
        setConfirmar("");
        setAlerta("");
        setMensaje("Usuario Registrado correctamente");
      }

      //limpiar campos

    } catch (err) {
      console.log(err);
    } 
    
  };

  return (
    <div className="App">
      {mensaje && <div className="alert alert-success" role="alert">{mensaje}</div>}
      {alerta && <div className="alert alert-danger" role="alert">{alerta}</div>}
      <h3>Registro/Inicio Sesion</h3>
      <div class="container-fluid">
        <div class="row">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="InputForm">
                <label>Nombre:</label>
                <div className="InputForm">
                  <input
                    type="text"
                    value={nombre}
                    required
                    onChange={(e) => setNombre(e.target.value)}
                  ></input>
                </div>
                <label>Nombre Usuario:</label>
                <div className="InputForm">
                  <input
                    type="text"
                    value={perfil}
                    required
                    onChange={(e) => setPerfil(e.target.value)}
                  ></input>
                </div>
                <label>Correo:</label>
                <div className="InputForm">
                  <input
                    type="text"
                    required
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  ></input>
                </div>
                <label>Contraseña:</label>
                <div className="InputForm">
                  <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <label>Confirmar contraseña:</label>
                <div className="InputForm">
                  <input
                    type="password"
                    required
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                  ></input>
                </div>
                <div className='py-3'>
                <button className="btn btn-primary form-control">Registrarse</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-6">
            <form onSubmit={iniciarSesion}>
            <label>Correo:</label>
              <div className="InputForm">
                
                <div className="InputForm">
                  <input  value={perfil2} onChange={(e) => setPerfil2(e.target.value)} type="text"></input>
                </div>
                <label>Contraseña:</label>
                <div className="InputForm">
                  
                  <input  value={password2} onChange={(e) => setPassword2(e.target.value)} type="password"></input>
                </div>
                <div className='py-3'> 
                <button className="btn btn-secondary form-control">Iniciar Sesion</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
