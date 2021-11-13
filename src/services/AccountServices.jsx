import axiosConfig from './axiosConfig';
import React from "react";

const ACCOUNT__API_BASE_URL =
 // "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/admin/account";
 "/account";
class AccountService {

  getListAccount() {
    return axiosConfig.get(ACCOUNT__API_BASE_URL);
  }

  addAccount(account) {
    return axiosConfig.post(ACCOUNT__API_BASE_URL, account);
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
}

export default new AccountService();
