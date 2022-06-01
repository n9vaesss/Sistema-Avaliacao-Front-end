import React, { useEffect, useState } from "react";

//componente do formulario principal
import FormPerguntas from "../components/FormPerguntas";

//api
import api from "../api/api";

//redux
import { connect } from "react-redux";

//rotas
import { useNavigate } from "react-router-dom";

//componentes
import Navbar from "../components/Navbar";
import InfoUsuario from "../components/infoUsuario";

function AvaliacaoSuperior(props) {
  const [listInformacao_usuario, setListInformacaousuario] = useState(); //criando o estado Informacao_usuario para receber as informações do banco
  const [listPermissao, setListPermissao] = useState();

  let navigate = useNavigate(); //definindo a variavel de redirecionamento de rotas

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


    

    try {
      api
        .post("/infoUsuario", {
          //enviando uma req para pegar as informações do banco sobre a pessoa q sera avaliada pelo superior
          reg_usuario: props.reg_superior,
        })
        .then((response) => {
          setListInformacaousuario(response.data); //atribuindo o valor de serv_auto_avaliacao ao estado Informacao_usuario
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
    //recebe os valores das variaveis do compoenete FormPerguntas
    try {
      api
        .post("/insertInfoFormulario", {
          // enviando uma as variaveis trazidas do FormPerguntas e armazenando elas no banco de dados
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
                  //atualiza o campo de avaliação do superior do banco de dados apos ela ser efetuada
                  reg1: props.reg_superior,
                  direcao: "AVALIACAO_DO_SUPERIOR",
                })
                .then((response) => {
                  if (response.data.msg == 0) {
                    //se tudo der certo ele te redireciona para pagina principal
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
          //para cada valor retornado do banco de dados e armazenado no estado Informacao_usuario ele envia as informações para o omponente InfoUsuario

          return (
            <InfoUsuario
              key={value.registro_id_pk}
              listInfo={listInformacao_usuario}
              setListInfo={setListInformacaousuario}
              nome={value.serv_nome}
              cargo={value.serv_cargo}
              secretaria={value.serv_secretaria}
              local={value.serv_local_trabalho}
              titulo={"AVALIAÇÃO DO SUPERIOR DE DESEMPENHO"}
              anexo={"ANEXO II"}
            ></InfoUsuario>
          );
        })}

      <FormPerguntas
        onClick={pegarInfo} /* recebe os valores do componente FormPerguntas*/
      />
    </div>
  );
}

//acessa os states via props do storeconfig
function mapStateToProps(state) {
  return {
    reg_usuario: state.usuarios.login_usuario, //atribui a props.reg_usuarios o valor do estado de usuarios.login_usuario
    reg_superior: state.usuarios.registro_superior, //atribui a props.reg_usuarios o valor do estado de usuarios.registro_superior
  };
}

export default connect(mapStateToProps)(AvaliacaoSuperior); //conecta o componente ao redux
