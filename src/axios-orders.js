import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-app-36a80.firebaseio.com/",
});

export default instance;
