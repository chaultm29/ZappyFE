import axios from "axios";


const STUDY_API_BASE_URL =
  "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com";
//"https://backend.zappy-nihongo.com";
class StudyService {
  getHiragana() {
    return axios.get(STUDY_API_BASE_URL + "/alphabet/hiragana");
  }
  getKatakana() {
    return axios.get(STUDY_API_BASE_URL + "/alphabet/katakana");
  }

  getKanji(id) {
    return axios.get(STUDY_API_BASE_URL + "/kanji/lesson/" + id);
  }
  getVocabulary(id) {
    return axios.get(STUDY_API_BASE_URL + "/vocabulary/lesson/" + id);
  }
  getGrammar(id) {
    return axios.get(STUDY_API_BASE_URL + "/grammar/lesson/" + id);
  }
  getLesson() {
    return axios.get(STUDY_API_BASE_URL + "/lesson");
  }
}

export default new StudyService();