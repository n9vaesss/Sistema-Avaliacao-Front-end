import React, { useState, useEffect } from "react";

//api
import api from "../api/api";

//redux
import { connect } from "react-redux";

//rotas
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../style/PreAvaliacao.css";
import Logo from "../image/Logo_secundaria.png";
import ButtoSearch from "../components/ButtoSearch";

function PreAvaliacao(props) {
  let navigate = useNavigate(); //definindo a variavel de redirecionamento de rotas

  const [listSearch, setListSearch] = useState(); //estado que vai receber e modificar o valor vindo do input de pesquisa
  const [listInfoButton, setListInfoButton] = useState(); //criando o estado Informacao_usuario para receber as informações do banco
  const [listPermissao, setListPermissao] = useState();

  useEffect(() => {
    try {
      api
        .post("/infoUsuario", {
          reg_usuario: props.reg_usuario,
        })
        .then((response) => {
          setListPermissao(response.data[0].serv_superior);
          if (response.data[0].serv_superior !== 2) {
            navigate("/principal");
          }
        });
    } catch (error) {
      console.log(error);
    }

    const params = "%" + listSearch + "%"; // essa linha de codigo é responsavel por adicionar o % antes e depois das informações vindas do Search para quando for fazer a pesquisa no banco de dados ele procurar por nomes parecidos

    const direcao = "AVALIACAO_SUPERIOR";

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
        <h1>AVALIAÇÃO DO SUPERIOR</h1>
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
              caminho="/avaliacao"
            />
          );
        })}

      {listSearch === undefined && (
        <h2 className="text-preAvaliacao">
          Digite na barra de pesquisa REGISTRO/ NOME/ SECRETARIA de um
          funcionario!
        </h2>
      )}
      {listSearch === "" && (
        <h2 className="text-preAvaliacao">
          Digite na barra de pesquisa REGISTRO/ NOME/ SECRETARIA de um
          funcionario!
        </h2>
      )}
    </div>
  );
}

//acessa os states via props do storeconfig
function mapStateToProps(state) {
  return {
    reg_usuario: state.usuarios.login_usuario, //atribui a props.reg_usuarios o valor do estado de usuarios.login_usuario
  };
}

export default connect(mapStateToProps)(PreAvaliacao);
