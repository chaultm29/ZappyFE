import axios from 'axios';
const API_URL =
  "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com";//

const register = (username, email, password) => {
  return axios.post(API_URL + "/register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data.token);
        console.log(response.data)
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify("Bearer " + response.data.token));
        }
        return response.data;
      } else {
        console.log("No")
        return {
          message: 'Login failed'

        }
      }
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};