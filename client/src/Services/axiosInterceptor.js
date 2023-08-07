import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  responseType: 'json',
  timeout: 2000,
})

export default instance