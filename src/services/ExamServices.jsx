import axios from "axios";


const DOEXAM__API_BASE_URL = "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/exam/";

class ExamServices {
  getListQuestion(options) {
    return axios.post(DOEXAM__API_BASE_URL, options);
  }
}

export default new ExamServices();
