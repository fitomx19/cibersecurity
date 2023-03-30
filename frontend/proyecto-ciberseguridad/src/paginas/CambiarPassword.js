import React from 'react'
import { useState,useContext } from 'react'
import { API } from '../config.js'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import SessionContext from "../Context/context";

export default function CambiarPassword() {

    //recuperar de localstorage el usuario
    const usuario = localStorage.getItem("username");

    let [password, setPassword] = useState('');
    let [password2, setPassword2] = useState('');
    let history = useNavigate();

    let enviar = async (e) => {
        e.preventDefault();
        console.log(usuario)
        console.log(password2)
        console.log(password)

        const json = JSON.stringify({
            password: password,
            password2: password2,
            correo: usuario
        })

        console.log(json);

        if(password === '' || password2 === ''){
            alert('Todos los campos son obligatorios');
            return;
        }

        if(password !== password2){
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            let res = await axios.post(`${API}actualizar-contrasena`, json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch((error) => {
                console.log(error);
            }).then((response) => {
                console.log(response);
                history("/");
                
            });
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div  className="container">
            <h1>Hola {usuario}, termina de actualizar tu contraseña</h1>
            <div style={{paddingTop: 20}}>
            <form onSubmit={enviar}>
                <input type="password"  pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$" required value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder="Nueva contraseña"/>
                
                <input type="password" pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$"  required gvalue={password2} onChange={(e) => setPassword2(e.target.value)}  className='form-control' placeholder="Confirmar contraseña"/>
                
                <button className="btn btn-primary">Actualizar</button>
            </form>
            </div>
        </div>
    )
}

