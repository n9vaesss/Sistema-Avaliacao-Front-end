import React from "react";

function RelatorioFinalComponents(props) {
  var title = "";

  if (props.avaliado == props.avaliou) {
    title = "AUTOAVALIAÇÃO";
  } else if (props.avaliou == 1110) {
    title = "COMISSÃO";
  } else {
    title = "AVALIAÇÃO DO SUPERIOR";
  }

  var total =
    props.inovacao +
    props.disciplina +
    props.assiduidade +
    props.compromisso +
    props.flexibilidade +
    props.preparo +
    props.relacoes +
    props.planejamento +
    props.pontualidade +
    props.controle;

  var nota = "";

  if (total <= 7) {
    nota = "Insuficiente";
  } else if (total <= 16) {
    nota = "Regular";
  } else if (total <= 22) {
    nota = "Bom";
  } else if (total <= 26) {
    nota = "Muito Bom";
  } else if (total <= 30) {
    nota = "Otimo";
  }

  return (
    <>
      <table>
        <thead>
          <span className="a">{title}</span>
        </thead>
        <tbody>
          <tr>
            <span>INOVAÇÃO: </span> <td>{props.inovacao}</td>
          </tr>
          <tr>
            <span>DISCIPLINA: </span> <td>{props.disciplina}</td>
          </tr>
          <tr>
            <span>ASSIDUIDADE: </span> <td>{props.assiduidade}</td>
          </tr>
          <tr>
            <span>COMPROMISSO PROFISSIONAL: </span> <td>{props.compromisso}</td>
          </tr>
          <tr>
            <span>FLEXIBILIDADE: </span> <td>{props.flexibilidade}</td>
          </tr>
          <tr>
            <span>PREPARO PROFISSIONAL: </span> <td>{props.preparo}</td>
          </tr>
          <tr>
            <span>RELAÇÕES INTERPESSOAIS: </span> <td>{props.relacoes}</td>
          </tr>
          <tr>
            <span>PLANEJAMENTO: </span> <td>{props.planejamento}</td>
          </tr>
          <tr>
            <span>PONTUALIDADE: </span> <td>{props.pontualidade}</td>
          </tr>
          <tr>
            <span>CONTROLE EMOCIONAL: </span> <td>{props.controle}</td>
          </tr>
          <tr>
            <span className="a">NOTA DA {title}: </span> <td className="a">{nota}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default RelatorioFinalComponents;
