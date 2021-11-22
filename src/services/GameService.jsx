import axiosConfig from './axiosConfig';

class GameService{
    getCurrentQuestion(listQuestionId){
        return axiosConfig.post("/game/bingo/currentQuestion", listQuestionId);
    }
}


function fetchCurrentQuestion (listQuestionId) {
    return fetch("http://localhost:5000/game/bingo/currentQuestion", 
        {
            method : 'POST',
            headers : { 'Content-Type': 'application/json', 'Authorization': JSON.parse(localStorage.getItem("token"))},
            body : JSON.stringify(listQuestionId)
    }).then((res) => res.json())
}

function fetchResultQuestion (questionId, answerId) {
    return fetch("http://localhost:5000/game/bingo/result/" + questionId + "/" + answerId, 
        {
            method : 'POST',
            headers : { 'Content-Type': 'application/json', 'Authorization': JSON.parse(localStorage.getItem("token"))},
    }).then((res) => res.json())
}

export default {
    fetchCurrentQuestion, 
    fetchResultQuestion,
    GameService
};