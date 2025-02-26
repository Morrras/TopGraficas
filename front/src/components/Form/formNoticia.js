import React, { useState, useEffect } from "react";
import useNoticia from "../../hooks/useNoticia";
import { Link } from "wouter";
import Spinner from "../Spinner";
import SimpleFileUpload from "react-simple-file-upload";
import getServices from "../../services/buscar";

export default function Formnoticia({ noticia_id }) {
  const [titulo, setTitulo] = useState("");
  const [informacion, setInformacion] = useState("");
  const [imagen, setImagen] = useState("");
  const [imagenEdit, setImagenEdit] = useState("");
  const keyword = "noticia";
  const {
    isLoadingNoticia,
    hasErrorNoticia,
    postNoticia,
    putNoticia,
    isSubmit,
  } = useNoticia();
  const [errorTitulo, setErrorTitulo] = useState("");
  const [errorInformacion, setErrorInformacion] = useState("");
  const [errorImagen, setErrorImagen] = useState("");
  const [formValido, setFormValido] = useState(false);

  useEffect(() => {
    if (noticia_id) {
      getServices({ keyword, id: noticia_id }).then((noticia) => {
        setTitulo(noticia.titulo);
        setInformacion(noticia.informacion);
        setImagenEdit(noticia.imagen);
        setErrorTitulo(false);
        setErrorImagen(false);
        setErrorInformacion(false);
      });
    }
  }, [noticia_id]);

  const handleChange = (target) => {
    if (target.name === "titulo") {
      setTitulo(target.value);
      if (target.value.length > 3 && target.value.length < 50) {
        setErrorTitulo(false);
      } else {
        setErrorTitulo(true);
      }
    }
    if (target.name === "informacion") {
      setInformacion(target.value);
      if (target.value.length > 3 && target.value.length < 9999) {
        setErrorInformacion(false);
      } else {
        setErrorInformacion(true);
      }
    }
  };

  const handleUpload = (url) => {
    if (url !== "") {
      setErrorImagen(false);
      setImagen(url);
    }
  };

  useEffect(() => {
    setFormValido(
      errorTitulo === false &&
        errorInformacion === false &&
        errorImagen === false
    );
  }, [handleChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValido) {
      noticia_id
        ? putNoticia({
            noticia_id,
            titulo,
            informacion,
            imagen: imagen ? imagen : imagenEdit,
          })
        : postNoticia({
            titulo,
            informacion,
            imagen: imagen,
          });

      if (!noticia_id) {
        setTitulo("");
        setInformacion("");
        setImagen("");
      }

      setFormValido(false);
    }
  };

  return (
    <>
      {isLoadingNoticia && <Spinner />}
      {hasErrorNoticia && (
        <div className="alert alert-danger">Datos incorrectos</div>
      )}
      {isSubmit && !hasErrorNoticia && (
        <div className="alert alert-success">
          {noticia_id
            ? "Noticia modificada correctamente"
            : "Noticia publicada correctamente"}
        </div>
      )}
      {!isLoadingNoticia && (
        <div className="wrapper fadeInDown">
          <div className="container w-50 border p-4 mt-4 formContent">
            <h1 className="text-center fadeIn first">
              {noticia_id ? "Editar noticia" : "Publicar noticia"}
            </h1>
            <form
              className="row g-3"
              name="publicar-noticia"
              onSubmit={handleSubmit}
            >
              <div className="col-md-12">
                {errorTitulo && (
                  <div className="alert alert-danger">
                    Obligatorio, mas de 3 caracteres y menos de 50
                  </div>
                )}
                <label htmlFor="inputTitulo" className="form-label">
                  Titulo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  id="inputTitulo"
                  value={titulo}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-md-12">
                {errorInformacion && (
                  <div className="alert alert-danger">
                    Obligatorio, mas de 3 caracteres y menos de 10000
                  </div>
                )}
                <label htmlFor="textareaInformacion" className="form-label">
                  Información
                </label>
                <textarea
                  className="form-control"
                  name="informacion"
                  id="textareaInformacion"
                  value={informacion}
                  onChange={(e) => handleChange(e.target)}
                />
              </div>
              <div className="col-12">
                {errorImagen && (
                  <div className="alert alert-danger">Obligatorio</div>
                )}
                <label htmlFor="inputImagen" className="form-label"></label>
                {imagenEdit && (
                  <img
                    src={imagen ? imagen : imagenEdit}
                    className="form-control"
                    alt="Imagen grafica"
                  />
                )}
                <SimpleFileUpload
                  apiKey="268ccedd024fa995abe1240d0bfd8298"
                  name="imagen"
                  id="inputImagen"
                  onSuccess={handleUpload}
                />
              </div>
              <div className="col-6 form-control text-center d-flex border-0">
                {formValido ? (
                  <input
                    type="submit"
                    className="fadeIn fourth form-control ms-4 p-2 submit"
                    value={noticia_id ? "Editar" : "Publicar"}
                  />
                ) : (
                  <input
                    type="submit"
                    className="fadeIn fourth disabled form-control ms-4 p-2 submit"
                    value={noticia_id ? "Editar" : "Publicar"}
                  />
                )}
                <Link className="fadeIn fourth" to="/graficas">
                  <input
                    type="button"
                    className="fadeIn fourth form-control ms-0 p-2"
                    value="volver"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
