import axios from "axios";


const QUESTION__API_BASE_URL = "http://localhost:3000/bank";

class ExamServices {
  getListQuestion() {
    return axios.get(QUESTION__API_BASE_URL);
  }
}

export default new ExamServices();
