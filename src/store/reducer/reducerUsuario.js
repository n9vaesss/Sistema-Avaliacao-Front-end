import {
  REG_SUPERIOR_ALTERADO,
  REG_USUARIO_ALTERADO,
  REG_ADM_ALTERADO
} from "../actions/actionTypes";

const estadoInicial = {
  login_usuario: undefined,
  registro_superior: undefined,
  registro_adm: undefined,
};

export default function (state = estadoInicial, action) {
  switch (action.type) {
    case REG_USUARIO_ALTERADO:
      return {
        ...state,
        login_usuario: action.payload,
      };
    case REG_SUPERIOR_ALTERADO:
      return {
        ...state,
        registro_superior: action.payload,
      };
      case REG_ADM_ALTERADO:
      return {
        ...state,
        registro_adm: action.payload,
      };
    default:
      return state;
  }
}
