import React, { useEffect } from "react";

//component Navbar
import Navbar from "../components/Navbar";

import LogoSecundario from "../image/Logo_secundaria.png";
import "../style/Principal.css";

function Principal(props) {
  

  return (
    <div className="principal">
      <Navbar />
      <div className="main-principal">
        <div className="align-principal">
          <img
            src={LogoSecundario}
            alt="Logo secundario"
            className="img-principal"
          />
          <p className="text-principal">
            Prezado servidor seja bem-vindo! Seguem algumas orientações para a
            realização da Avaliação/Análise de Desempenho de 2021 que a partir
            desse ano será realizada de forma eletrônica. O período que será
            avaliado é de 01/12/2021 à 15/11/2022. Os servidores que foram
            admitidos após 01/12/2021 serão avaliados a partir da data de sua
            admissão. O formulário eletrônico deverá ser preenchido, escolhendo
            em cada critério somente uma opção, e que não será concluído se
            ficar algum critério sem preenchimento. Servidor, este formulário é
            de acesso pessoal e intransferível e será monitorado pelo IP do
            computador que está sendo realizado, não devendo ser a avaliação
            realizada por terceiros. Esclarecimentos sobre a avaliação serão
            prestados pela Diretoria de Recursos Humanos.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Principal; //conecta o componente ao redux
