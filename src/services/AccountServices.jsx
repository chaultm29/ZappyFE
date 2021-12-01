import axiosConfig from './axiosConfig';
const ACCOUNT__API_BASE_URL = "/account";

class AccountService {

  getListAccount() {
    return axiosConfig.get(ACCOUNT__API_BASE_URL);
  }

  addAccount(account) {
    return axiosConfig.post(ACCOUNT__API_BASE_URL + "/", account);
  }

  getAccountByID(accountId) {
    return axiosConfig.get(ACCOUNT__API_BASE_URL + "/" + accountId);
  }

  editAccount(account, accountId) {
    return axiosConfig.put(ACCOUNT__API_BASE_URL + "/" + accountId, account);
  }

  deleteAccount(accountId) {
    return axiosConfig.delete(ACCOUNT__API_BASE_URL + "/" + accountId);
  }

  resetPassword(username) {
    return axiosConfig.post("/resetaccount/" + username);
  }
}

export default new AccountService();
