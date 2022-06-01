import React, { useState, useEffect } from "react";

//redux
import { connect } from "react-redux";

//api
import api from "../api/api";

//rotas
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Logo from "../image/Logo_secundaria.png";
import ButtoSearch from "../components/ButtoSearch";

function PrePainelADM(props) {
  const [listSearch, setListSearch] = useState();
  const [listInfoButton, setListInfoButton] = useState();
  const [listPermissao, setListPermissao] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    try {
      api
        .post("/infoUsuario", {
          reg_usuario: props.reg_usuario,
        })
        .then((response) => {
          setListPermissao(response.data[0].serv_superior);
          console.log(response.data[0].serv_superior)
          if (response.data[0].serv_superior !== 3) {
            navigate("/principal");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const params = "%" + listSearch + "%";
    const direcao = "COMISSAO";

    try {
      api
        .post("/botaoPesquisa", {
          reg1: props.reg_usuario,
          params: params,
          direcao: direcao,
        })
        .then((response) => {
          setListInfoButton(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [listSearch]);

  return (
    <div>
      <Navbar />
      <div className="main-preAvaliacao">
        <img src={Logo} alt="" className="main-image-preAvaliacao" />
        <h1>Painel de Administração</h1>
        <input
          type="text"
          placeholder="Insira o nome, registro ou secretaria do funcionario que deseja avaliar"
          className="main-input-preAvaliacao"
          value={listSearch}
          onChange={(ev) => setListSearch(ev.target.value)}
        />
      </div>

      {typeof listInfoButton !== "undefined" &&
        listInfoButton.map((values) => {
          return (
            <ButtoSearch
              key={values.id}
              listInfoButton={listInfoButton}
              setListInfoButton={setListInfoButton}
              nome={values.serv_nome}
              secretaria={values.serv_secretaria}
              registro={values.registro_id_pk}
              caminho="painelatt"
            />
          );
        })}
    </div>
  );
}


function mapStateToProps(state) {
    return {
      reg_usuario: state.usuarios.login_usuario, //atribui a props.reg_usuarios o valor do estado de usuarios.registro_superior
    };
}

export default connect(mapStateToProps)(PrePainelADM);
