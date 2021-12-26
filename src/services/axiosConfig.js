import axios from "axios";
import { AxiosResponse, AxiosError } from 'axios'
const instance = axios.create({

 baseURL: "http://localhost:5000"
  //baseURL: "https://backend.zappy-nihongo.com"
  //baseURL: "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com"

//baseURL: "https://backend.zappy-js.com"
  //baseURL: "http://zappybackend-env.eba-6zuhdgfk.us-east-2.elasticbeanstalk.com"
})
instance.defaults.headers.common["Authorization"] = JSON.parse(localStorage.getItem("token"));
//instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

instance.interceptors.response.use(
  (response) => {
    // if(response.data=="") window.location.href = '/notfound' 
    return response

  },

  (error) => {
    if (error.message.includes('401')) {
      window.location.href = '/home'
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("rolename");
    }
    if (error.message.includes('403')) {
      // return {
      //   statusCode: '403',
      //   message: 'Access denied'
      // }
      window.location.href = '/home'
    }
    if (error.message.includes('ERR_FAILED')) {
      window.location.href = '/study'
    }
  }
)




// axios.get('*')
//   .then((response: AxiosResponse) => {
//     // Handle response
//   })
//   .catch((reason: AxiosError) => {
//     if (reason.response!.status === 400) {
//       // Handle 400
//     } else {
//       // Handle else
//     }
//     console.log(reason.message)
//   })

export default instance;


    // export default function authHeader() {
    //     const user = JSON.parse(localStorage.getItem('user'));

    //     if (user && user.accessToken) {
    //       return { Authorization: 'Bearer ' + user.accessToken };
    //     } else {
    //       return {};
    //     }
    //   }