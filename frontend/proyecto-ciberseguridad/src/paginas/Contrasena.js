import React, { useState } from "react";
import axios from "axios";
import { API } from "../config";

function Contrasena   ()  {
  let [correo, setCorreo] = useState("");

  let enviar = async (e) => {
    e.preventDefault();
    console.log("entro a enviar");
    const json = JSON.stringify({
      correo: correo,
    });
    console.log(json);

    try {
      let res = await axios.post(`${API}recuperar-contrasena`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      if (res.data.mensaje) {
        alert(res.data.mensaje);
      } else {
        alert("No se pudo enviar la contraseña");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form onSubmit={enviar}>
              <h1>Contraseña</h1>
              <p>Se enviara a tu correo tu contraseña</p>

              <div className="form-group">
                <label htmlFor="contrasena">correo</label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  placeholder="Correo registrado"
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contrasena;
