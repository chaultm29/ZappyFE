import axios from 'axios';
const API_URL =

  // "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com";//
 //"http://zappybackend-env.eba-6zuhdgfk.us-east-2.elasticbeanstalk.com"
 "https://backend.zappy-js.com"
//"http://localhost:5000"
// const register = (account) => {
//   return axios.post(API_URL + "/register", {
//     account
//   });
// };
const register = (account) => {
  return axios.post(API_URL + "/register", account);
}
const forgotPassword = (email) => {
  return axios.put(API_URL + "/forgotPassword?email=" + email);
}
const checkEmailTokenOnURL = (email, token) => {
  return axios.get(API_URL + "/forgotPassword?email=" + email + "&token=" + token);
}
const changePasswordInCaseOK = (email, token, userPass) => {
  return axios.post(API_URL + "/forgotPassword?email=" + email + "&token=" + token, userPass);
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
          window.location.href = "/admin/acc-mng"
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
  forgotPassword,
  checkEmailTokenOnURL,
  changePasswordInCaseOK,
  login,
  logout,
  getCurrentUser,
  getRoleName,
  getToken
};