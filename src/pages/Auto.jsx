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

function Auto(props) {
  const [listInformacao_usuario, setListInformacaousuario] = useState(); //criando o estado Informacao_usuario para receber as informações do banco

  let navigate = useNavigate(); //definindo a variavel de redirecionamento de rotas

  useEffect(() => {
    try {
      api
        .post("/infoUsuario", {
          //enviando um req para api com o registro do usuario logado para q o banco de dados retorne as informações do mesmo
          reg_usuario: props.reg_usuario,
        })
        .then((response) => {
          setListInformacaousuario(response.data); //atribuindo o valor de serv_auto_avaliacao ao estado Informacao_usuario
          if(response.data[0].serv_superior == 3){
            navigate("/principal");
          }
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
          reg2: props.reg_usuario,
        })
        .then((response) => {
          if (response.data.msg == 0) {
            try {
              api
                .put("/updateChecklist", {
                  //atualiza o campo de autoavaliacao do banco de dados apos ela ser efetuada
                  reg1: props.reg_usuario,
                  direcao: "AUTOAVALIACAO",
                })
                .then((response) => {
                  if (response.data.msg == 0) {
                    //se tudo der certo ele te redireciona para pagina principal
                    alert("Auto Avaliação concluida com sucesso!");
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
              titulo={"AUTO AVALIAÇÃO DE DESEMPENHO"}
              anexo={"ANEXO I"}
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
  };
}

export default connect(mapStateToProps)(Auto); //conecta o componente ao redux
