import { createStore, combineReducers } from "redux";
import reducerUsuario from "./reducer/reducerUsuario";

const reducers = combineReducers({
  usuarios: reducerUsuario,
});

function storeConfig() {
  return createStore(reducers);
}

export default storeConfig;
