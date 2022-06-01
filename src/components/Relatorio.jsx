import React from "react";

import "../style/Relatorio.css";

function Relatorio(props) {

    var title = ""

    if(props.avaliado == props.avaliou){
        title = 'AUTOAVALIAÇÃO'
    }else{
        title = 'AVALIAÇÃO DO SUPERIOR'
    }

  return (
    <div className="main-relatorio">
      <table>
        <thead className="title">
          <span>{title}</span>
        </thead>
        <tbody>
          <tr>
            <span className="a">INOVAÇÃO: </span> <td>{props.inovacao}</td>
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
        </tbody>
      </table>
    </div>
  );
}

export default Relatorio;
