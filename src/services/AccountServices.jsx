import axios from "axios";
import React from "react";

const ACCOUNT__API_BASE_URL =
  "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/admin/account";
class AccountService {
  getListAccount() {
    return axios.get(ACCOUNT__API_BASE_URL);
  }

  addAccount(account) {
    return axios.post(ACCOUNT__API_BASE_URL, account);
  }
}

export default new AccountService();
