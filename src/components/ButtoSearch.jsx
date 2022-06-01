import React from "react";

//rotas
import { useNavigate } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { alterarRegistroSuperior } from "../store/actions/actionUsuario";

//style
import "../style/ButtonSearch.css";

function ButtoSearch(props) {
  let navigate = useNavigate(); //definindo a variavel de redirecionamento de rotas

  const handleSubmitRegSup = () => {
    //altera o valor do reducer registro_superior para o valor recebido de props.registro e redireciona para o caminho especificado
    props.alterarSuperior(props.registro);
    navigate(props.caminho);
  };

  return (
    <div className="main-align-buttonSearch">
      <button className="main-buttonSearch" onClick={handleSubmitRegSup}>
        {props.nome} - {props.registro} - {props.secretaria}{" "}
      </button>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  //usado para modificar o estado do reducer registro_superior
  return {
    alterarSuperior(novoRegistro) {
      const action = alterarRegistroSuperior(novoRegistro);
      dispatch(action);
    },
  };
}

export default connect(null, mapDispatchToProps)(ButtoSearch); //conecta o componente ao redux
