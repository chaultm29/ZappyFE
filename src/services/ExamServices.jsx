// import axios from "axios";

// const DOEXAM__API_BASE_URL = "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/exam/";
import axiosConfig from './axiosConfig';
class ExamServices {
  getListQuestion(options) {
    return axiosConfig.post("/exam", options);
  }

  getResult(userAnswer) {
    return axiosConfig.post("/exam/result", userAnswer);
  }
}

export default new ExamServices();
