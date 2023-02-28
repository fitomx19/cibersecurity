import './App.css';
import styled from "styled-components";
import { useState } from 'react';
import { API } from './config';
import axios from 'axios';

function App() {
  const [nombre, setNombre] = useState("");
  const [perfil, setPerfil] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");


  let handleSubmit = async (e) => {
    e.preventDefault();

    const json = JSON.stringify({
      nombre: nombre,
      perfil:perfil,
      correo:correo,
      password:password,
      confirmar:confirmar
    });

    console.log(json)

    try {
      let res = await axios.post(`${API}registrar`, json ,{
        headers: {
        
          'Content-Type': 'application/json'
        }
      });
      console.log(nombre,perfil,correo,password,confirmar)
 
      console.log(res.data.data); // '{"answer":42}'
      console.log(res.data.headers['Content-Type'])
    } catch (err) {
      console.log(err);
    } 
    
  };

  return (
    <div className="App">
     
     <h3>Registro</h3>
          <div className='Form-Content'>
            <form onSubmit={handleSubmit} >
              <div className='InputForm'>
                <label>Nombre:</label>
                <div className='InputForm'>
                  <input type='text' value={nombre}  onChange={(e) => setNombre(e.target.value)}></input>
                </div>
                <label>Perfil:</label>
                <div className='InputForm'>
                  <input type='text' value={perfil}  onChange={(e) => setPerfil(e.target.value)}></input>
                </div>
                <label>Correo:</label>
                <div className='InputForm'>
                  <input type='text' value={correo}  onChange={(e) => setCorreo(e.target.value)}></input>
                </div>
                <label>Contraseña:</label>
                <div className='InputForm'>
                  <input type='password' value={password}  onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <label>Confirmar contraseña:</label>
                <div className='InputForm'>
                  <input type='password' value={confirmar}  onChange={(e) => setConfirmar(e.target.value)}></input>
                </div>
                <button>Registrarse</button>
              </div>
            </form>
          </div>
        
      
      
    </div>
  );
}

export default App;
