import React, { useState } from "react";

import "../style/PainelADM.css";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
//rotas
import { useNavigate } from "react-router-dom";

function PainelADM(props) {

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

  const handleInsert = (values) => {
    try {
      api
        .post("/infoCRUD", {
          direcao: "INSERIR",
          registro: valueRegistro,
          Nome: valueNome,
          cpf: valueCPF,
          cargo: valueCargo,
          emprego: valueEmprego,
          secretaria: valueSecretaria,
          data: valueData,
          acesso: valueAcesso,
          superior: valueSuperior,
          cargo_origem: valueCargoOrigem,
          local: valueLocal,
        })
        .then((response) => {
          alert("Usuario Inserido com sucesso!")
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
                onChange={(e) => setvalueCPF(e.target.value)}
              />
              <Field
                type="text"
                name="validacao"
                placeholder="Registro"
                value={valueRegistro}
                onChange={(e) => setvalueRegistro(e.target.value)}
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
                onChange={(e) => setvalueData(e.target.value)}
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
                onChange={(e) => setvalueCargoOrigem(e.target.value)}
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
              Inserir usuario
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}


export default (PainelADM);
