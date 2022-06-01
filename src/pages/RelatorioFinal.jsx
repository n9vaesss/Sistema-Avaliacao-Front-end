import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import api from "../api/api";
import Navbar from "../components/Navbar";
import RelatorioFinalComponents from "../components/RelatorioFinalComponents";
import InfoUsuario from "../components/infoUsuario";
import "../style/RelatorioFinal.css";

function RelatorioFinal(props) {
  const [listInformacao_usuario, setListInformacaousuario] = useState();
  const [relatorio, setRelatorio] = useState();

  useEffect(() => {
    try {
      api
        .post("/infoUsuario", {
          reg_usuario: props.reg_superior,
        })
        .then((response) => {
          setListInformacaousuario(response.data);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      api
        .post("/relatorio", {
          reg_superior: props.reg_superior,
        })
        .then((response) => {
          console.log(response.data);
          setRelatorio(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="main-relatorio-final">
        {typeof listInformacao_usuario !== "undefined" &&
          listInformacao_usuario.map((value) => {
            return (
              <InfoUsuario
                key={value.registro_id_pk}
                listInfo={listInformacao_usuario}
                setListInfo={setListInformacaousuario}
                registro={value.registro_id_pk}
                nome={value.serv_nome}
                cargo={value.serv_cargo}
                secretaria={value.serv_secretaria}
                local={value.serv_local_trabalho}
                titulo={"RELATORIO DE DESEMPENHO"}
              ></InfoUsuario>
            );
          })}

        {typeof relatorio !== "undefined" &&
          relatorio.map((value) => {
            return (
              <RelatorioFinalComponents
                key={value.registro_id_fk}
                listInfo={relatorio}
                setListInfo={setRelatorio}
                avaliou={value.registro_id_fk}
                inovacao={value.sc_inovacao}
                disciplina={value.sc_disciplina}
                assiduidade={value.sc_assiduidade}
                compromisso={value.sc_compromisso_prof}
                flexibilidade={value.sc_flexibilidade}
                preparo={value.sc_preparo_prof}
                relacoes={value.sc_relacoes_interpessoais}
                planejamento={value.sc_planejamento}
                pontualidade={value.sc_pontualidade}
                controle={value.sc_controle_emocional}
                avaliado = {value.sc_funcionario_avaliado}
              ></RelatorioFinalComponents>
            );
          })}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    reg_superior: state.usuarios.registro_superior,
  };
}

export default connect(mapStateToProps)(RelatorioFinal);
