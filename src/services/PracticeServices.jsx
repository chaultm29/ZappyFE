
import axiosConfig from './axiosConfig';
class PracticeServices {
    getListQuestion(options) {
        return axiosConfig.post("/practice", options);
    }
    getResult(userAnswer) {
        return axiosConfig.post("/practice/result", userAnswer);
    }
}
export default new PracticeServices();
