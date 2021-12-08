import axiosConfig from './axiosConfig';
const getConfig = () => {
    return axiosConfig.get("/awsconfig");
}

const baseURL = "https://zappy-image.s3.ap-southeast-1.amazonaws.com/"
const baseURLAvatar = baseURL + "Avatar/";
const baseURLVocabularyImage = baseURL + "VocabularyImage/";
const baseURLImgForQuestion = baseURL + "ImgForQuestion/";
const baseURLKanjiDes = baseURL + "KanjiDes/";
const baseURLAlphabet = baseURL + "Alphabet/";
const baseURLKanjiGif = baseURL + "KanjiGif/";

export default { getConfig, baseURLAvatar, baseURLVocabularyImage, baseURLImgForQuestion, baseURLKanjiDes, baseURLAlphabet, baseURLKanjiGif };


