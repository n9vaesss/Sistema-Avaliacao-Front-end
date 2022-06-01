import React, { useEffect, useState } from "react";

import "../style/PainelADM.css";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
//rotas
import { useNavigate } from "react-router-dom";
//redux
import { connect } from "react-redux";

function PainelAtt(props) {

  let navigate = useNavigate();

  const [valueNome, setvalueNome] = useState();
  const [valueCPF, setvalueCPF] = useState();
  const [valueRegistro, setvalueRegistro] = useState();
  const [valueCargo, setvalueCargo] = useState();
  const [valueEmprego, setvalueEmprego] = useState();
  const [valueSecretaria, setvalueSecretaria] = useState();
  const [valueData, setvalueData] = useState();
  const [valueAcesso, setvalueAcesso] = useState();
  const [valueSuperior, setvalueSuperior] = useState();
  const [valueCargoOrigem, setvalueCargoOrigem] = useState();
  const [valueLocal, setvalueLocal] = useState();

  useEffect(() => {
    try {
      api
        .post("/reqInput", {
          registro: props.registro_superior,
        })
        .then((response) => {
          setvalueNome(response.data[0].serv_nome);
          setvalueCPF(response.data[0].serv_cpf);
          setvalueRegistro(response.data[0].registro_id_pk);
          setvalueCargo(response.data[0].serv_cargo);
          setvalueEmprego(response.data[0].serv_emprego);
          setvalueSecretaria(response.data[0].serv_secretaria);
          setvalueData(response.data[0].serv_dt_adm.split("T", 1));
          setvalueAcesso(response.data[0].serv_superior);
          setvalueSuperior(response.data[0].serv_superior_1);
          setvalueCargoOrigem(response.data[0].serv_cargo_origem);
          setvalueLocal(response.data[0].serv_local_trabalho);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleInsert = (values) => {
    try {
      api
        .put("/updateinfo", {
          Nome: valueNome,
          registro : valueRegistro,
          cargo: valueCargo,
          emprego: valueEmprego,
          secretaria: valueSecretaria,
          acesso: valueAcesso,
          superior: valueSuperior,
          local: valueLocal,
        })
        .then((response) => {
          alert("Usuario Atualizado com sucesso")
          navigate("/principal")
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="main-painel">
        <Formik initialValues={{}} onSubmit={handleInsert}>
          <Form>
            <div className="div-input-painel">
              <Field
                type="text"
                name="nome"
                placeholder="Nome"
                value={valueNome}
                onChange={(e) => setvalueNome(e.target.value)}
              />
              <Field
                type="text"
                name="cpf"
                placeholder="CPF"
                value={valueCPF}
                readonly
              />
              <Field
                type="text"
                name="validacao"
                placeholder="Registro"
                value={valueRegistro}
                readonly
              />
              <Field
                type="text"
                name="cargo"
                placeholder="Cargo"
                value={valueCargo}
                onChange={(e) => setvalueCargo(e.target.value)}
              />
              <Field
                type="text"
                name="emprego"
                placeholder="Emprego"
                value={valueEmprego}
                onChange={(e) => setvalueEmprego(e.target.value)}
              />
              <Field
                type="text"
                name="secretaria"
                placeholder="Secretaria"
                value={valueSecretaria}
                onChange={(e) => setvalueSecretaria(e.target.value)}
              />
              <Field
                type="date"
                name="data"
                readonly
                value={valueData}
              />

              <Field
                as="select"
                name="acesso"
                onChange={(e) => setvalueAcesso(e.target.value)}
                value={valueAcesso}
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </Field>

              <Field
                type="text"
                name="superior"
                placeholder="Superior"
                value={valueSuperior}
                onChange={(e) => setvalueSuperior(e.target.value)}
              />
              <Field
                type="text"
                name="comissao"
                placeholder="Comissão"
                value="1110"
              />
              <Field
                type="text"
                name="cargo_origem"
                placeholder="Cargo de origem"
                value={valueCargoOrigem}
                readonly
              />
              <Field
                type="text"
                name="local"
                placeholder="Local de trabalho"
                value={valueLocal}
                onChange={(e) => setvalueLocal(e.target.value)}
              />
            </div>
            <button className="button-painelADM" type="submit">
              Atualizar usuario
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

//acessa os states via props do storeconfig
function mapStateToProps(state) {
    return {
        registro_superior: state.usuarios.registro_superior //atribui a props.reg_usuarios o valor do estado de usuarios.login_usuario
    };
  }
  
export default connect(mapStateToProps)(PainelAtt); //conecta o componente ao redux
