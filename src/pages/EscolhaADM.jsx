import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import api from "../api/api";
//redux
import { connect } from "react-redux";
import '../style/Escolha.css'
import Logo from '../image/Logo_secundaria.png'
//rotas
import { useNavigate } from "react-router-dom";

function EscolhaADM(props) {

    let navigate = useNavigate();

    useEffect(() => {
        try {
          api
            .post("/infoUsuario", {
              //enviando um req para api com o registro do usuario logado para q o banco de dados retorne as informações do mesmo
              reg_usuario: props.reg_usuario,
            })
            .then((response) => {
              if(response.data[0].serv_superior !== 3){
                navigate("/principal");
              }
            });
        } catch (error) {
          console.log(error);
        }
      }, []);

    return (
        <div>
            <Navbar/>
            <div className='div-escolha'>
                <img src={Logo} alt="" />
                <h1>Painel Administrativo</h1>
                <button onClick={() => navigate("/painelInsert")}>Inserir novo usuario</button>
                <button onClick={() => navigate("/prepainel")}>Atalizar usuario</button>
            </div>
        </div>
    );
}

//acessa os states via props do storeconfig
function mapStateToProps(state) {
    return {
      reg_usuario: state.usuarios.login_usuario, //atribui a props.reg_usuarios o valor do estado de usuarios.login_usuario
    };
  }
  
  export default connect(mapStateToProps)(EscolhaADM); //conecta o componente ao redux