import axios from "axios";

const instance = axios.create({
    //baseURL: "https://backend.zappy-nihongo.com"
    baseURL: "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com"
})
    instance.defaults.headers.common["Authorization"] = JSON.parse(localStorage.getItem("token"));
    //instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    export default instance;

    // export default function authHeader() {
    //     const user = JSON.parse(localStorage.getItem('user'));
      
    //     if (user && user.accessToken) {
    //       return { Authorization: 'Bearer ' + user.accessToken };
    //     } else {
    //       return {};
    //     }
    //   }