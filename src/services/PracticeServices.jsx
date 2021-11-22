
import axiosConfig from './axiosConfig';
class PracticeServices {
    getResult(userAnswer) {
        return axiosConfig.post("/practice/result", userAnswer);
    }
}
export default new PracticeServices();
