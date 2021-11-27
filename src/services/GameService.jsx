import axiosConfig from './axiosConfig';

const API_BASE_URL = "http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com";
class GameService {
    getCurrentQuestion(listQuestionId) {
        return axiosConfig.post("/game/bingo/currentQuestion", listQuestionId);
    }

    // saveGame(gameName, timeCreated, timePlayed, score){
    //     return axiosConfig.post("/game/saving");
    // }
    getRecord() {
        return axiosConfig.get("/game/record");
    }
}

function fetchSaveGame(_gameName, _timeCreated, _timePlayed, _score) {
    let gameRecord = {
        gameName : _gameName,
        timeCreated : _timeCreated,
        timePlayed : _timePlayed,
        score : _score
    }
    return fetch("http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/game/saving",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': JSON.parse(localStorage.getItem("token")) },
            body: JSON.stringify(gameRecord)
        }).then((res) => res.json())
}

function fetchCurrentQuestion(listQuestionId, listLessonId) {
    let list = {
        questionIds : listQuestionId,
        lessonIds : listLessonId
    }
     //return fetch("http://localhost:5000/game/bingo/currentQuestion",
    return fetch("http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/game/bingo/currentQuestion",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': JSON.parse(localStorage.getItem("token")) },
            body: JSON.stringify(list)
        }).then((res) => res.json())
}

function fetchResultQuestion(questionId, answerId) {
    // return fetch("http://localhost:5000/game/bingo/result/" + questionId + "/" + answerId, 
    return fetch("http://springbootzappy-env.eba-iqgf4tse.us-east-2.elasticbeanstalk.com/game/bingo/result/" + questionId + "/" + answerId,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': JSON.parse(localStorage.getItem("token")) },
        }).then((res) => res.json())
}

export default {
    
    fetchSaveGame,
    fetchCurrentQuestion,
    fetchResultQuestion,
    GameService
};