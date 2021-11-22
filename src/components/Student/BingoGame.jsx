import React, { Component } from 'react';
import Navigation from './Navigation';
import './css/bingoGame.css';
import GameService from '../../services/GameService';

class BingoGame extends Component {

    constructor(props) {
        super(props);
        this.generateTitle = this.generateTitle.bind(this);
        this.generateGameboard = this.generateGameboard.bind(this);
        this.bingo = this.bingo.bind(this);
        

        this.state = {
            currentQuestion: null,
            listQuestionId:[1],
            questions: [],
            listCheckAnswer: []
        }
        
    }
    generateTitle() {
        var titleString = "ZAPPY"
        var title = document.getElementById("title")
        if (title != null) {
            for (var i = 0; i < titleString.length; i++) {
                var box = document.createElement("div")
                box.classList.add("square")
                var text = document.createElement("div")
                text.classList.add("title")
                text.innerHTML = titleString[i]
                box.appendChild(text)
                title.appendChild(box)
            }
        }
    }
    generateGameboard() {
        var gameboard = document.getElementById("gameboard")
        for (var i = 0; i < 25; i++) {
            var box = document.createElement("div")
            box.classList.add("square", "number")
            box.setAttribute("id", "box " + i)
            var text = document.createElement("div")
            text.classList.add("numbertext")
            text.innerHTML = [i + 1]
            box.appendChild(text)
            box.onclick = (e) => this.handleOnClick(e);
            gameboard.appendChild(box)
        }
    }

    handleOnClick(e) {
        this.addSelectedNumber(e)
        this.displayQuestion(e)
        this.setState({state:this.state})
    }

    checkResult(answerId){
        GameService.fetchResultQuestion(this.state.currentQuestion.id, answerId).then((data) =>{
           if (data){
               
           }

        })
    }
    addSelectedNumber(e) {
        //listSelect = [];
        var box = e.target
        box.classList.add("selected")
    }
    
    async displayQuestion(e) {
        //sau chuyển thành nút đc chọn
        e.preventDefault()
        var box = e.target
        var textIndex = box.innerHTML;
        var check = false;
        for (var i = 0; i < this.state.questions.length; i++) {
            if (this.state.questions[i].index === textIndex) {
                this.state.currentQuestion = this.state.questions[i].question;
                check = true;
                break;
            }
        }
        if(!check){
            //call api to call question and set into question index.
            GameService.fetchCurrentQuestion(this.state.listQuestionId).then(data => {
                console.log(data)
                this.setState({currentQuestion: data })
                this.state.questions.push({index:textIndex, question: this.state.currentQuestion});
                this.state.listQuestionId.push(this.state.currentQuestion.questionID)
            })

            //this.getCurrentQuestion3(this.state.listQuestionId, textIndex)
           
            
        }
        document.getElementById("currentQuestion").style.display = "relative";
    }

    // getCurrentQuestion3 = (listQuestionId, textIndex) => {
    //     fetch("http://localhost:5000/game/bingo/currentQuestion", 
    //         {
    //             method : 'POST',
    //             headers : { 'Content-Type': 'application/json', 'Authorization': JSON.parse(localStorage.getItem("token"))},
    //             body : JSON.stringify(listQuestionId)
    //     }).then((res) => res.json())
    //     .then(data => {
    //         this.setState({currentQuestion: data })
    //         this.state.questions.push({index:textIndex, question: this.state.currentQuestion});
    //         this.state.listQuestionId.push(this.state.currentQuestion.questionID)
    //     })
    // }
     
    bingo() {
        var type = document.getElementById("goal").value
        var check = false
        switch (type) {
            case "horizontal":
                check = this.checkHorizontal()
                break;
            case "vertical":
                check = this.checkVertical()
                break;
            case "diagonal":
                check = this.checkDiagonal()
                break;
        }
        if (check) alert("Congratulate! BINGO!")
        else alert("No! You are not bingo!")
    }
    checkHorizontal() {
        for (var i = 0; i < 5; i++) {
            var check = true
            for (var j = 0; j < 5; j++) {
                if (this.listSelect[5 * i + j] == false) {
                    check = false
                    break
                }
            }
            if (check) return true
        }
        return false
    }

    checkVertical() {
        for (var i = 0; i < 5; i++) {
            var check = true
            for (var j = 0; j < 5; j++) {
                if (this.listSelect[i + 5 * j] == false) {
                    check = false
                    break
                }
            }
            if (check) return true
        }
        return false
    }

    checkDiagonal() {
        return this.checkLeftDiagonal() || this.checRightDiagonal()
    }

    checkLeftDiagonal() {
        for (var i = 0; i < 5; i++) {
            if (this.listSelect[i + 5 * i] == false) {
                return false
            }
        }
        return true
    }

    checRightDiagonal() {
        for (var i = 0; i < 5; i++) {
            if (this.listSelect[5 * (i + 1) - (i + 1)] == false) {
                return false
            }
        }
        return true
    }
 
    componentDidMount() {
        this.generateTitle();
        this.generateGameboard();         
    }

    render() {
        return (
            <>
            <div class="container">
                <div class="gamearea">
                    <div id="title">
                    </div>

                    <div id="gameboard">

                    </div>
                </div>
                <div class="control">
                    <div class="content">
                        <div class="numbertext" id="currentNumber">
                            70
                </div>
                {/* <div class="selectedQuestion" id="currentQuestion" style={{ display: "none" }}>Question for this part: */}
                        <div class="selectedQuestion" id="currentQuestion">Question for this part:
                       {this.state.currentQuestion!=null?

                                (<div class="question" key={this.state.currentQuestion.id} >
                                <div>{this.state.currentQuestion.question}</div>
                                {this.state.currentQuestion.answers.map(
                                    answer =>
                                <button class="answer" id={"answer " +answer.id} key={answer.id} onClick={()=>this.checkResult(answer.id)}>{answer.answer}</button>                                
                                )}
                            </div>):""}
                        </div>
                        {/* <button onclick="nextNumber()"> Next Number</button>
                        <div class="label">Goal</div>
                        <select name="goal" id="goal">
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                            <option value="diagonal">Diagonal</option>
                        </select>
                        <button onclick={() => this.bingo()}> Bingo !</button> */}
                    </div>
                    {/* <button class="newgame" onclick="newGame()">New game</button> */}
                </div>
            </div>

            </>
        );
    }
}

export default BingoGame;