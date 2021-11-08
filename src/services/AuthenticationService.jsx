import axiosConfig from './axiosConfig';
const API_URL =
"https://backend.zappy-nihongo.com/";//

const register = (username, email, password) => {
    return axiosConfig.post(API_URL + "register", {
      username,
      email,
      password,
    });
  };
  
  const login = (username, password) => {
    return axiosConfig
      .post(API_URL + "login", {
        username,
        password
      })
      .then((response) => {
          console.log(response.data.token);
          console.log(response.data)
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify("Bearer "+ response.data.token));
        }
  
        return response.data;
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