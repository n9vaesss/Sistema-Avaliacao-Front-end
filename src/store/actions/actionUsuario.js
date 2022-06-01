import { REG_SUPERIOR_ALTERADO, REG_USUARIO_ALTERADO, REG_ADM_ALTERADO } from "./actionTypes";

//action creator que muda o registro do usuario
export function alterarRegistroUsuario(novoRegistro) {
  return {
    type: REG_USUARIO_ALTERADO,
    payload: novoRegistro,
  };
}

export function alterarRegistroSuperior(novoRegistro) {
  return {
    type: REG_SUPERIOR_ALTERADO,
    payload: novoRegistro,
  };
}

export function alterarRegistroADM(novoRegistro) {
  return {
    type: REG_ADM_ALTERADO,
    payload: novoRegistro,
  };
}

