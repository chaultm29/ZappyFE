import axios from 'axios';
const API_URL =

  "http://zappybackend-env.eba-6zuhdgfk.us-east-2.elasticbeanstalk.com";//

// const register = (account) => {
//   return axios.post(API_URL + "/register", {
//     account
//   });
// };
const register = (account) => {
  return axios.post(API_URL + "/register", account);
}


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
          localStorage.setItem("username", JSON.stringify(response.data.username));
          localStorage.setItem("rolename", JSON.stringify(response.data.rolename));
        }
        if (response.data.rolename == "Student") {
          window.location.href = "/home"
        }
        else if (response.data.rolename == "Admin") {
          window.location.href = "/admin/dashboard"
        }
        else if (response.data.rolename == "Content Manager") {
          window.location.href = "/content-mng/question-mng"
        }
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
  localStorage.removeItem("username");
  localStorage.removeItem("rolename");
  window.location.href = '/home';
  //return false;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("username"));
};

const getRoleName = () => {
  return JSON.parse(localStorage.getItem("rolename"));
};

const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getRoleName,
  getToken
};