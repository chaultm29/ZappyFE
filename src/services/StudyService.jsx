// import axios from "axios";
import axiosConfig from './axiosConfig';


const STUDY_API_BASE_URL = ""
  //"http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com";//
  // "https://backend.zappy-nihongo.com/study";

  class StudyService {

  getHiragana() {
    return axiosConfig.get(STUDY_API_BASE_URL + "/alphabet/hiragana");
  }
  getKatakana() {
    return axiosConfig.get(STUDY_API_BASE_URL + "/alphabet/katakana");
  }

  getKanji(id) {
    return axiosConfig.get(STUDY_API_BASE_URL + "/kanji/lesson/"+id);
  }
  getVocabulary(id) {
    return axiosConfig.get(STUDY_API_BASE_URL + "/vocabulary/lesson/"+id);
  }
  getGrammar(id) {
    return axiosConfig.get(STUDY_API_BASE_URL + "/grammar/lesson/"+id);
  }
  getLesson(skillId){
    return axiosConfig.get(STUDY_API_BASE_URL + "/lesson?skid=" + skillId);
  }
}

export default new StudyService();