import axios from "axios";

//faz a conexão com a api

const api = axios.create({ 
    baseURL: "http://localhost:3001",
})

export default api;