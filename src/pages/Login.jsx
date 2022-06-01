import React from "react";

//rotas
import { useNavigate } from "react-router-dom";

//form
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

//icons
import { GrLock } from "react-icons/gr";
import { GrLogin } from "react-icons/gr";

//api
import api from "../api/api";

//redux
import { connect } from "react-redux";
import { alterarRegistroUsuario } from "../store/actions/actionUsuario";

//style
import LogoSecundario from "../image/Logo_secundaria.png";
import Avatar from "../image/avatar.png";
import "../style/Login.css";

//valiadando dados antes de mandar a req
const validationLogin = yup.object().shape({
  login: yup
    .string()
    .min(4, "Minimo de 4 caracteres")
    .max(20, "Maximo de 20 caracteres")
    .required("Campo obrogatorio!"),
  password: yup
    .string()
    .min(11, "Minimo de 11 caracteres")
    .max(20, "Maximo de 20 caracteres")
    .required("Campo obrogatorio!"),
});

function Login(props) {
  let navigate = useNavigate(); //definindo a variavel de redirecionamento de rotas

  //enviando os dados do formulario de login e redirecinando para a pagina inicial
  const HandleSubmitLogin = async (values) => {
    try {
      await api
        .post("/login", {
          login: values.login,
          password: values.password,
        })
        .then((response) => {
          if (response.data.msg === 0) {
            alert("Usuario ou senha invalidos");
          } else {
            props.alterarRegistro(response.data[0].registro_id_pk); //caso o login ocorra com sucesso sera armazenado o valor de registro do usuario logado no estado registro_superior localizado nos reducers
            navigate("/principal"); //redireciona para pagina inicial
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-login">
      <div className="aling-login">
        <div className="left-login">
          <img
            src={LogoSecundario}
            alt="Logo Principal"
            className="img-login"
          />
        </div>
 
        <div className="right-login">
          <Formik
            initialValues={{}}
            onSubmit={
              HandleSubmitLogin
            } /* quando o formulario foi enviado ativa a função */
            validationSchema={
              validationLogin
            } /* chama a função para validação */
          >
            <Form className="form-login">
              <img src={Avatar} alt="Avatar" />

              <h1>AVALIAÇÃO/ ANÁLISE DE DESEMPENHO</h1>

              <div>
                <div className="input-login">
                  <GrLogin className="icon-login" />
                  <Field name="login" placeholder="Registro" />
                </div>
                <ErrorMessage /* exibe a menssagem de erro */
                  component="span"
                  name="login"
                  className="form-error"
                />
              </div>

              <div>
                <div className="input-login">
                  <GrLock className="icon-login" />
                  <Field name="password" placeholder="Senha" type="password" />
                </div>
                <ErrorMessage /* exibe a menssagem de erro */
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>

              <button
                type="submit"
                className="button-login" /* dispara o submit do formik */
              >
                Enviar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    alterarRegistro(novoRegistro) {
      const action = alterarRegistroUsuario(novoRegistro);
      dispatch(action);
    },
  };
}

export default connect(null, mapDispatchToProps)(Login);
