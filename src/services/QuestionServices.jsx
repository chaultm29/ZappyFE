import axios from "axios";
import React from "react";

const QUESTION__API_BASE_URL = "http://localhost:3000/bank";

class QuestionServices {
  getListQuestion() {
    return axios.get(QUESTION__API_BASE_URL);
  }
}

export default new QuestionServices();
