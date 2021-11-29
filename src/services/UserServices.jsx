import axiosConfig from './axiosConfig';
const USER__API_BASE_URL = "/user";

class UserServices {

    getProfile() {
        return axiosConfig.get(USER__API_BASE_URL + "/profile");
    }
    updateProfile(profile) {
        return axiosConfig.put(USER__API_BASE_URL + "/profile", profile);
    }

}

export default new UserServices();
