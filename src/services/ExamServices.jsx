import axiosConfig from './axiosConfig';

const DOEXAM__API_BASE_URL = "/exam/";

class ExamServices {
  getListQuestion(options) {
    return axiosConfig.post(DOEXAM__API_BASE_URL, options);
  }
}

export default new ExamServices();
