import React from "react";

import { Link } from "wouter";

import deleteNoticia from "../../services/Noticia/deleteNoticia";

import useUser from "../../hooks/useUser";
import Spinner from "../Spinner";

const endpoint = "http://127.0.0.1:8000/api";

const srcImagen = (imagen) => {
  return `${endpoint}/imagen/${imagen}`;
};

export default function Noticia({
  id,
  titulo,
  informacion,
  imagen,
  created_at,
}) {
  let fecha = new Date(created_at);

  const { isLoginLoading, isLogged } = useUser();

  return (
    <div className="col">
      <div className="card flex-row">
        <img
          src={srcImagen(imagen)}
          className="card-img-top w-50"
          alt="Imagen de la noticia"
        ></img>
        <div className="card-body col w-50 ms-3 mx-3">
          <h5 className="card-title row justify-content-center">{titulo}</h5>
          <div className="card-text row ms-3">
            <p className="row text-break justify-content-center">
              Informacion: {informacion}
            </p>
            <small className="text-muted row justify-content-center">
              Publicado el {fecha.getDay()}/{fecha.getMonth()}/
              {fecha.getFullYear()}
            </small>
          </div>
          {isLoginLoading && <Spinner height="50px" />}
          {!isLoginLoading && sessionStorage.getItem("isAdmin") === "1" && (
            <div className="card-footer my-3">
              <Link to={`/noticia/editar/${id}`}>
                <i
                  class="bi bi-wrench-adjustable-circle mx-3"
                  type="button"
                ></i>
              </Link>
              <i
                class="bi bi-x-circle"
                type="button"
                onClick={() => deleteNoticia(id)}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
