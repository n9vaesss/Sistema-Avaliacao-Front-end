import React from "react";

import "../style/infoUsuario.css";

function infoUsuario(props) {
  //esse componente apenas recebe as informações vinda do banco de dados sobre o usuario, formata e mostra na tela

  return (
    <div className="main-infoUsuario">
      <h1>{props.titulo}</h1>
      <h1>Registro: {props.registro}</h1>
      <h1>Nome: {props.nome}</h1>
      <h1>Cargo: {props.cargo}</h1>
      <h1>Secretaria: {props.secretaria}</h1>
      <h1>Local de trabalho: {props.local}</h1>
    </div>
  );
}

export default infoUsuario;
