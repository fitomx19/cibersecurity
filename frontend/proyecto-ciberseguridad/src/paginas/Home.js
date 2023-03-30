import React, { useContext, useState, useEffect } from "react";
import SessionContext from "../Context/context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../config";

function Home() {
  const { logged, setLogged } = useContext(SessionContext);
  console.log(logged);
  let history = useNavigate();

  //recuperar de localstorage el usuario
  const usuario = localStorage.getItem("username");

  useEffect(() => {
    if (usuario === null) {
      history("/");
    }else{
      setLogged(usuario);
      console.log("Esta loguado ", logged);
    }
    let status = 0;
    const interval = setInterval(() => {
      axios
        .get(`${API}logueado`)
        .then((response) => (status = response.status))
        .catch((error) => console.log(error));
      if (status === 200) {
        setLogged(usuario);
      } else {
        setLogged(null);
        //eliminar de localstorage
        localStorage.removeItem("username");
        history("/");
      }
    }, 10000); // Intervalo de 1 minuto (en milisegundos)

    return () => clearInterval(interval);
  }, []);

  let cerrarSesion = async () => {
    let cerrar = window.confirm("¿Desea cerrar sesion?");
    if (cerrar === false) {
      return;
    }

    let res = await axios
      .get(`${API}cerrar-sesion`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.log("error");
      })
      .then((response) => {
        if (response) {
          setLogged(null);
          //eliminar de localstorage
          localStorage.removeItem("username");
          history("/");
        }
      });
  };

  return (
    <div class="container">
      <div class="jumbotron">
        <h3>Bienvenido {logged}</h3>
        <p>Tienes acceso a la aplicacion</p>
      </div>
      <button className="btn btn-success" onClick={() => cerrarSesion()}>
        Cerrar Sesion
      </button>
    </div>
  );
}

export default Home;
