
import axiosConfig from './axiosConfig';
class PracticeServices {
    getResult(userAnswer) {
        return axiosConfig.post("exam/practive/", userAnswer);
    }
}
export default new PracticeServices();
