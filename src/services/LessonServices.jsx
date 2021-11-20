import axiosConfig from './axiosConfig';

const VOCABULARY__API_BASE_URL = "/vocabulary";
const KANJI__API_BASE_URL = "/kanji";
const GRAMMAR__API_BASE_URL = "/grammar";
const QUESTION__API_BASE_URL = "/question";
class LessonServices {
    //vocabulary
    getListVocabulary() {
        return axiosConfig.get(VOCABULARY__API_BASE_URL);
    }

    addVocabulary(vocabulary) {
        return axiosConfig.post(VOCABULARY__API_BASE_URL, vocabulary);
    }

    getVocabularyByID(vocabularyId) {
        return axiosConfig.get(VOCABULARY__API_BASE_URL + "/" + vocabularyId);
    }

    editVocabulary(vocabulary, vocabularyId) {
        return axiosConfig.put(VOCABULARY__API_BASE_URL + "/" + vocabularyId, vocabulary);
    }

    deleteVocabulary(vocabularyId) {
        return axiosConfig.delete(VOCABULARY__API_BASE_URL + "/" + vocabularyId);
    }

    // kanji

    getListKanji() {
        return axiosConfig.get(KANJI__API_BASE_URL);
    }
    addKanji(kanji) {
        return axiosConfig.post(KANJI__API_BASE_URL, kanji);
    }
    getKanjiByID(kanjiId) {
        return axiosConfig.get(KANJI__API_BASE_URL + "/" + kanjiId);
    }
    editKanji(kanji, kanjiId) {
        return axiosConfig.put(KANJI__API_BASE_URL + "/" + kanjiId, kanji);
    }
    deleteKanji(kanjiId) {
        return axiosConfig.delete(KANJI__API_BASE_URL + "/" + kanjiId);
    }

    // grammar
    getListGrammar() {
        return axiosConfig.get(GRAMMAR__API_BASE_URL + "/");
    }
    addGrammar(grammar) {
        return axiosConfig.post(GRAMMAR__API_BASE_URL + "/", grammar);
    }
    getGrammarByID(grammarId) {
        return axiosConfig.get(GRAMMAR__API_BASE_URL + "/" + grammarId);
    }
    editGrammar(grammar, grammarId) {
        return axiosConfig.put(GRAMMAR__API_BASE_URL + "/" + grammarId, grammar);
    }
    deleteGrammar(grammarId) {
        return axiosConfig.delete(GRAMMAR__API_BASE_URL + "/" + grammarId);
    }

    //question
    getListQuestion() {
        return axiosConfig.get(QUESTION__API_BASE_URL + "/");
    }
    addQuestion(question) {
        return axiosConfig.post(QUESTION__API_BASE_URL, question);
    }
    getQuestionByID(questionId) {
        return axiosConfig.get(QUESTION__API_BASE_URL + "/" + questionId);
    }
    editQuestion(question, questionId) {
        return axiosConfig.put(QUESTION__API_BASE_URL + "/" + questionId, question);
    }
    deleteQuestion(questionId) {
        return axiosConfig.delete(QUESTION__API_BASE_URL + "/" + questionId);
    }
}

export default new LessonServices();
