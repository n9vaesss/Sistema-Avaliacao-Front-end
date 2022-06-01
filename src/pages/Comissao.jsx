import React, { useEffect, useState } from "react";
import FormPerguntas from "../components/FormPerguntas";
import api from "../api/api";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import InfoUsuario from "../components/infoUsuario";
import Relatorio from "../components/Relatorio";

function AvaliacaoSuperior(props) {
  const [listInformacao_usuario, setListInformacaousuario] = useState();
  const [listPermissao, setListPermissao] = useState();
  const [relatorio, setRelatorio] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    try {
      api
        .post("/infoUsuario", {
          reg_usuario: props.reg_usuario,
        })
        .then((response) => {
          setListPermissao(response.data[0].serv_superior);
          if (response.data[0].serv_superior !== 3) {
            navigate("/principal");
          }
        });
    } catch (error) {
      console.log(error);
    }

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
          setRelatorio(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const pegarInfo = (
    ino,
    dis,
    ass,
    comp,
    flex,
    prep,
    rel,
    plan,
    pont,
    cont
  ) => {
    try {
      api
        .post("/insertInfoFormulario", {
          reg1: props.reg_usuario,
          ino: ino,
          dis: dis,
          ass: ass,
          comp: comp,
          flex: flex,
          prep: prep,
          rel: rel,
          plan: plan,
          pont: pont,
          cont: cont,
          reg2: props.reg_superior,
        })
        .then((response) => {
          if (response.data.msg == 0) {
            try {
              api
                .put("/updateChecklist", {
                  reg1: props.reg_superior,
                  direcao: "COMISSAO",
                })
                .then((response) => {
                  if (response.data.msg == 0) {
                    alert("Avaliação do Superior concluida com sucesso!");
                    navigate("/principal");
                  }
                });
            } catch (error) {
              console.log(error);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

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
              titulo={"AVALIAÇÃO DA COMISSAO"}
              anexo={"ANEXO III"}
            ></InfoUsuario>
          );
        })}

      <div className="relatorio">
        {typeof relatorio !== "undefined" &&
          relatorio.map((value) => {
            return (
              <Relatorio
                key={value.registro_id_fk}
                listInfo={relatorio}
                setListInfo={setRelatorio}
                avaliou = {value.registro_id_fk}
                inovacao = {value.sc_inovacao}
                disciplina = {value.sc_disciplina}
                assiduidade = {value.sc_assiduidade}
                compromisso = {value.sc_compromisso_prof}
                flexibilidade = {value.sc_flexibilidade}
                preparo = {value.sc_preparo_prof}
                relacoes = {value.sc_relacoes_interpessoais}
                planejamento = {value.sc_planejamento}
                pontualidade = {value.sc_pontualidade}
                controle = {value.sc_controle_emocional}
              ></Relatorio>
            );
          })}
      </div>

      <FormPerguntas onClick={pegarInfo} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    reg_usuario: state.usuarios.login_usuario,
    reg_superior: state.usuarios.registro_superior,
  };
}

export default connect(mapStateToProps)(AvaliacaoSuperior);
