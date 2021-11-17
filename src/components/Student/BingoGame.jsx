import React, { Component } from 'react';
import Navigation from './Navigation';
import './css/bingoGame.css';

class BingoGame extends Component {

    constructor(props) {
        super(props);
        this.generateTitle = this.generateTitle.bind(this);
        this.generateGameboard = this.generateGameboard.bind(this);
        this.bingo = this.bingo.bind(this);
        this.listSelect = []
        
        this.state = {
            currentQuestion : {
                id: 1,
                question: "Tôi là ai?",
                answers: [
                    {
                        id: 1,
                        answer: "tao"
                    },
                    {
                        id: 2,
                        answer: "không phải tao"
                    },
                    {
                        id: 3,
                        answer: "nè"
                    },
                    {
                        id: 4,
                        answer: "hi"
                    }
                ]
            },
            questions: [
                {
                    index: 1,
                    question: {
                        id: 1000,
                        question: "Tôi là ai?",
                        answers: [
                            {
                                id: 1,
                                answer: "tao"
                            },
                            {
                                id: 2,
                                answer: "không phải tao"
                            },
                            {
                                id: 3,
                                answer: "nè"
                            },
                            {
                                id: 4,
                                answer: "hi"
                            }
                        ]
                    }
                }
            ]
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
        box.appendChild(text)
        box.onclick = (e) => this.handleOnClick(e);
        gameboard.appendChild(box)
    }
    var numbertexts = document.getElementsByClassName("numbertext")
    for (var i = 0; i < 25; i++) {
        numbertexts[i].innerHTML = [i + 1]
    }
}
handleOnClick(e) {

    this.addSelectedNumber(e)
    this.displayQuestion()
}

addSelectedNumber(e) {
    //listSelect = [];
    var box = e.target
    box.classList.add("selected")
}
displayQuestion() {
    //sau chuyển thành nút đc chọn
    var textIndex=1;
    if(this.state.questions.index===textIndex){
        document.getElementById("currentQuestion").style.display = "flex";
    }
}
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
                    <div class="selectedQuestion" style={{display: "none"}}>Question for this part:
              
                                
                                <div id = "currentQuestion" class="question"  key={this.state.currentQuestion.id} >
                                    <div>{this.state.currentQuestion.question}</div>

                                    <div class="answer" key={this.state.currentQuestion.answers[0].id}>1.{this.state.currentQuestion.answers[0].answer}</div>
                                    <div class="answer" key={this.state.currentQuestion.answers[1].id}>2.{this.state.currentQuestion.answers[1].answer}</div>
                                    <div class="answer" key={this.state.currentQuestion.answers[2].id}>3.{this.state.currentQuestion.answers[2].answer}</div>
                                    <div class="answer" key={this.state.currentQuestion.answers[3].id}>4.{this.state.currentQuestion.answers[3].answer}</div>
                                </div>
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