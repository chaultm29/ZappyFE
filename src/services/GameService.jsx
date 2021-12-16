import axiosConfig from './axiosConfig';

const API_BASE_URL = "https://backend.zappy-js.com";
class GameService {
    getCurrentQuestion(listQuestionId) {
        return axiosConfig.post("/game/bingo/currentQuestion", listQuestionId);
    }

    // saveGame(gameName, timeCreated, timePlayed, score){
    //     return axiosConfig.post("/game/saving");
    // }
    // getRecord() {
    //     return axiosConfig.get("/game/record");
    // }
}
function getRecord() {
    return axiosConfig.get("/game/record");
}

function fetchSaveGame(_activityId, _gameName, _timeCreated, _timePlayed, _score) {
    let gameRecord = {
        activityId: _activityId,
        gameName: _gameName,
        timeCreated: _timeCreated,
        timePlayed: _timePlayed,
        score: _score
    }
    //return fetch("http://zappybackend-env.eba-6zuhdgfk.us-east-2.elasticbeanstalk.com/game/saving",
    return fetch(API_BASE_URL+ "/game/saving",
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
     //return fetch("http://zappybackend-env.eba-6zuhdgfk.us-east-2.elasticbeanstalk.com/game/bingo/currentQuestion",
    return fetch( API_BASE_URL + "/game/bingo/currentQuestion",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': JSON.parse(localStorage.getItem("token")) },
            body: JSON.stringify(list)
        }).then((res) => res.json())
}

function fetchResultQuestion(questionId, answerId) {
     //return fetch("http://localhost:5000/game/bingo/result/" + questionId + "/" + answerId, 
    return fetch(API_BASE_URL+ "/game/bingo/result/" + questionId + "/" + answerId,
    //return fetch("http://zappybackend-env.eba-6zuhdgfk.us-east-2.elasticbeanstalk.com/game/bingo/result/" + questionId + "/" + answerId,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': JSON.parse(localStorage.getItem("token")) },
        }).then((res) => res.json())
}

export default {
    
    fetchSaveGame,
    fetchCurrentQuestion,
    fetchResultQuestion,
    getRecord,
    GameService
};