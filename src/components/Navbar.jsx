import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { connect } from "react-redux";
import "../style/Navbar.css";
import Logo from "../image/Logo_principal.png";

function Navbar(props) {
  let navigate = useNavigate();
  const [listValidacao_Auto, setListValidacao_Auto] = useState();

  useEffect(() => {
    if (props.reg_usuario === undefined) {
      alert("Entre com seu usuario novamente!");
      navigate("/");
    }

    try {
      api
        .post("/infoChecklistAuto", {
          reg1: props.reg_usuario,
          direcao: "AUTO_AVALIACAO",
        })
        .then((response) => {
          setListValidacao_Auto(response.data[0].serv_auto_avaliacao);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClickPrincipal = () => {
    navigate("/principal");
  };

  const handleClickAuto = () => {
    if (listValidacao_Auto === 1) {
      alert("Auto Avaliação ja foi concluida!");
    } else {
      navigate("/auto");
    }
  };

  const handleClickSuperior = () => {
    navigate("/preavaliacao");
  };

  const handleClickComissao = () => {
    navigate("/precomissao");
  };

  const handleClickPainel = () => {
    navigate("/escolha");
  };

  const handleClickRelatorio = () => {
    navigate("/prerelatorio");
  };

  const handleSair = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="main-navbar">
      <button className="button-img-navbar" onClick={handleClickPrincipal}>
        <img src={Logo} alt="" />
      </button>
      <div className="align-button-navbar">
        <button onClick={handleClickAuto}>Autoavaliação</button>
        <button onClick={handleClickSuperior}>Avaliação do Superio</button>
        <button onClick={handleClickComissao}>Comissão</button>
        <button onClick={handleClickPainel}>Painel Administrativo</button>
        <button onClick={handleClickRelatorio}>Relatorio</button>
        <button onClick={handleSair}> Sair </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    reg_usuario: state.usuarios.login_usuario,
  };
}

export default connect(mapStateToProps)(Navbar);
