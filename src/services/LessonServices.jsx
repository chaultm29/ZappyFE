import axios from "axios";


const VOCABULARY__API_BASE_URL =
    "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/vocabulary";
const KANJI__API_BASE_URL =
    "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/kanji";
const GRAMMAR__API_BASE_URL =
    "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/grammar";
const QUESTION__API_BASE_URL =
    "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/question";
class LessonServices {
    //vocabulary

    getListVocabulary() {
        return axios.get(VOCABULARY__API_BASE_URL);
    }

    addVocabulary(vocabulary) {
        return axios.post(VOCABULARY__API_BASE_URL, vocabulary);
    }

    getVocabularyByID(vocabularyId) {
        return axios.get(VOCABULARY__API_BASE_URL + "/" + vocabularyId);
    }

    editVocabulary(vocabulary, vocabularyId) {
        return axios.put(VOCABULARY__API_BASE_URL + "/" + vocabularyId, vocabulary);
    }

    deleteVocabulary(vocabularyId) {
        return axios.delete(VOCABULARY__API_BASE_URL + "/" + vocabularyId);
    }

    // kanji

    getListKanji() {
        return axios.get(KANJI__API_BASE_URL);
    }
    addKanji(kanji) {
        return axios.post(KANJI__API_BASE_URL, kanji);
    }
    getKanjiByID(kanjiId) {
        return axios.get(KANJI__API_BASE_URL + "/" + kanjiId);
    }
    editKanji(kanji, kanjiId) {
        return axios.put(KANJI__API_BASE_URL + "/" + kanjiId, kanji);
    }
    deleteKanji(kanjiId) {
        return axios.delete(KANJI__API_BASE_URL + "/" + kanjiId);
    }

    // grammar
    getListGrammar() {
        return axios.get(GRAMMAR__API_BASE_URL + "/");
    }
    addGrammar(grammar) {
        return axios.post(GRAMMAR__API_BASE_URL + "/", grammar);
    }
    getGrammarByID(grammarId) {
        return axios.get(GRAMMAR__API_BASE_URL + "/" + grammarId);
    }
    editGrammar(grammar, grammarId) {
        return axios.put(GRAMMAR__API_BASE_URL + "/" + grammarId, grammar);
    }
    deleteGrammar(grammarId) {
        return axios.delete(GRAMMAR__API_BASE_URL + "/" + grammarId);
    }

    //question
    getListQuestion() {
        return axios.get(QUESTION__API_BASE_URL + "/");
    }
    addQuestion(question) {
        return axios.post(QUESTION__API_BASE_URL, question);
    }
    getQuestionByID(questionId) {
        return axios.get(QUESTION__API_BASE_URL + "/" + questionId);
    }
    editQuestion(question, questionId) {
        return axios.put(QUESTION__API_BASE_URL + "/" + questionId, question);
    }
    deleteQuestion(questionId) {
        return axios.delete(QUESTION__API_BASE_URL + "/" + questionId);
    }
}

export default new LessonServices();
