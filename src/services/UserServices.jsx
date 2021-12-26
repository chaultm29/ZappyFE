import axiosConfig from './axiosConfig';
const USER__API_BASE_URL = "/user";

class UserServices {

    getProfile() {
        return axiosConfig.get(USER__API_BASE_URL + "/profile");
    }
    updateProfile(profile) {
        return axiosConfig.put(USER__API_BASE_URL + "/profile", profile);
    }

    getProgress() {
        return axiosConfig.get("/progress");
    }
    getLevel() {
        return axiosConfig.get(USER__API_BASE_URL + "/level");
    }
    getAchievement() {
        return axiosConfig.get("/achievement");
    }
    checkAchievement() {
        return axiosConfig.get("/achievement/check");
    }
    changePassword(password) {
        return axiosConfig.post("/changePassword", password);
    }
    getRanking(){
        return axiosConfig.get(USER__API_BASE_URL + "/ranking");
    }
}

export default new UserServices();
