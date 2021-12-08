import React, { Component } from 'react';
import Navigation from './Navigation';
import './css/bingoGame.css';
import GameService from '../../services/GameService';
import bingoGif from '../../assets/img/bingo1.gif';

class BingoGame extends Component {

    constructor(props) {
        super(props);
        this.generateTitle = this.generateTitle.bind(this);
        this.generateGameboard = this.generateGameboard.bind(this);
        this.bingo = this.bingo.bind(this);

        this.timer = 0;
        // this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

        this.state = {
            score: 0,
            currentIndex: -1,
            currentQuestion: null,
            listQuestionId: [],
            questions: [],
            listCheckAnswer: [],
            time: {}, seconds: 300,
            initseconds: 300,
            isFinish: false
        }

    }
    generateTitle() {
        var titleString = "12345"
        var title = document.getElementById("title")
        if (title != null) {
            for (var i = 0; i < 5; i++) {
                var box = document.createElement("div")
                box.classList.add("word" + i)
                var text = document.createElement("div")
                text.classList.add("title")
                //text.innerHTML = titleString[i]
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
            var text = document.createElement("div")
            text.classList.add("numbertext")
            text.setAttribute("id", "box " + i)
            text.innerHTML = [i + 1]
            box.appendChild(text)
            box.onclick = (e) => this.handleOnClick(e);
            gameboard.appendChild(box)
            this.state.listCheckAnswer.push(-1);
        }
    }

    handleOnClick(e) {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
        // var myMusic = new Sound("game-level.wav");
        // myMusic.play();
        this.addSelectedNumber(e)
        this.displayQuestion(e)
        this.setState({ state: this.state })
    }

    checkResult(e, questionId, answerId) {
        GameService.fetchResultQuestion(questionId, answerId).then((data) => {
            console.log(data)
            if (data) {
                this.state.listCheckAnswer[this.state.currentIndex] = 1
                e.target.classList.add("correct");
                document.getElementById("box " + (this.state.currentIndex)).classList.add("correct")
                this.setState({ state: this.state.score += 100 })
            } else {
                this.state.listCheckAnswer[this.state.currentIndex] = 0
                e.target.classList.add("incorrect");
                document.getElementById("box " + (this.state.currentIndex)).classList.add("incorrect")
            }
            var buttons = document.getElementsByClassName("answer");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
            this.bingo();
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
        var box = e.target.id.split(" ")[1]
        if (this.state.listCheckAnswer[box] == -1) {
            this.state.currentIndex = box;
            var check = false;
            for (var i = 0; i < this.state.questions.length; i++) {
                if (this.state.questions[i].index === this.state.currentIndex) {
                    this.state.currentQuestion = this.state.questions[i].question;
                    check = true;
                    break;
                }
            }
            if (!check) {
                //call api to call question and set into question index.
                GameService.fetchCurrentQuestion(this.state.listQuestionId, this.props.lessons).then(data => {
                    console.log(data)
                    this.setState({ currentQuestion: data })
                    this.state.questions.push({ index: this.state.currentIndex, question: this.state.currentQuestion });
                    this.state.listQuestionId.push(this.state.currentQuestion.questionID)
                })

                //this.getCurrentQuestion3(this.state.listQuestionId, textIndex)
            }
            document.getElementById("currentQuestion").style.display = "relative";
        }
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
        var check = this.checkHorizontal() || this.checkVertical() || this.checkDiagonal()
        if (check) {

            clearInterval(this.timer);
            //console.log("time " + this.state.seconds)

            // disable button after win
            var buttons = document.getElementsByClassName("square number");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = null;
            }
            this.setState({ score: this.state.score + this.state.seconds * this.props.bonus, isFinish: true })

            //this.setState({ state: this.state.score += 100 })
            // document.getElementById("isFinish").style.display = "relative";
            GameService.fetchSaveGame(2, "Bingo Game", "", (this.state.initseconds - this.state.seconds), this.state.score)
        }
        else if (this.state.seconds == 0) {

            var buttons = document.getElementsByClassName("square number");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = null;
            }
            this.setState({ isFinish: true })
            GameService.fetchSaveGame("Bingo Game", "", (this.state.initseconds - this.state.seconds), this.state.score)
        }
    }

    checkHorizontal() {
        for (var i = 0; i < 5; i++) {
            var check = true
            for (var j = 0; j < 5; j++) {
                if (this.state.listCheckAnswer[5 * i + j] != 1) {
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
                if (this.state.listCheckAnswer[i + 5 * j] != 1) {
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
            if (this.state.listCheckAnswer[i + 5 * i] != 1) {
                return false
            }
        }
        return true
    }

    checRightDiagonal() {
        for (var i = 0; i < 5; i++) {
            if (this.state.listCheckAnswer[5 * (i + 1) - (i + 1)] != 1) {
                return false
            }
        }
        return true
    }

    //Time zone

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    // startTimer() {
    //     if (this.timer == 0 && this.state.seconds > 0) {
    //         this.timer = setInterval(this.countDown, 1000);
    //     }
    // }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
            this.bingo();
        }
    }

    componentDidMount() {
        this.generateTitle();
        this.generateGameboard();

        //time
        //check time theo level
        this.state.initseconds = this.props.time;
        console.log(this.props.lessons)
        this.state.seconds = this.state.initseconds
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });

    }

    render() {
        return (
            <div class="inner-container">
                <div class="gameplay">
                    {this.state.isFinish ?
                        <div class="overlay-text visible" id="isFinish">
                            <div class="game-over">Chúc mừng bạn đã hoàn thành game này</div>
                            <div class="result">
                                <h4>Tổng điểm : {this.state.score}</h4>
                                <h4>Thời gian chơi : {this.state.initseconds - this.state.seconds} giây</h4>
                                <div class="bingo-gif"><img src={bingoGif} alt="image" /></div>
                                {/* <h4>Tổng điểm : {total}</h4> */}
                            </div>
                            <br />
                            <div class="text-play-again" onClick={() => window.location.reload()}  >Click vào đây để chơi lại </div>

                        </div> : ""}

                    <div class="content">
                        {/* <div class="numbertext" id="currentNumber">
                            Điểm:  {this.state.score}
                        </div> */}
                        <div id="timer" class="flex-wrap d-flex justify-content-start">
                            <div  class="align-items-center flex-column d-flex justify-content-center">{this.state.score}<span>Điểm</span></div>
                        </div>
                        {/* <button onClick={this.startTimer}>Start</button> */}
                        {/* timer */}
                        {/* <div class="timer">Thời gian: :</div> */}
                        <div id="timer" class="flex-wrap d-flex justify-content-end">
                            <div id="minutes" class="align-items-center flex-column d-flex justify-content-center">{this.state.time.m}<span>minutes</span></div>
                            {/* <div id ="dotBetween">:</div> */}
                            <div id="seconds" class="align-items-center flex-column d-flex justify-content-center">{this.state.time.s}<span>seconds</span></div>
                        </div>
                        {/* timer end */}
                    </div>
                    <div class="gamearea">
                        <div id="title">
                        </div>

                        <div id="gameboard">

                        </div>
                    </div>
                    <div class="control">
                        <div class="content">


                            {/* <div class="selectedQuestion" id="currentQuestion" style={{ display: "none" }}>Question for this part: */}
                            <div class="selectedQuestion" id="currentQuestion">Question for this part:
                       {this.state.currentQuestion != null ?

                                    (<div class="question" key={this.state.currentQuestion.questionID} >
                                        <div class="questionField">{this.state.currentQuestion.question}</div>

                                        {this.state.currentQuestion.imageLink ? <div><img class="imgBingo" src={"https://imgzappybucket.s3.ap-southeast-1.amazonaws.com/AnhCauHoi/" + this.state.currentQuestion.imageLink} alt="hiragana" /></div> : ""}
                                        {this.state.currentQuestion.answers.map(
                                            answer =>
                                                <button class="answer" id={"answer " + answer.id} key={answer.id} onClick={(e) => this.checkResult(e, this.state.currentQuestion.questionID, answer.id)}>{answer.answer}</button>
                                        )}
                                    </div>) : ""}
                            </div>
                            {/* <div class="finishGame">
                                    <div class="bingo-gif"><img src={bingoGif} alt="image" /></div>
                                    <div class="congrat">Chúc mừng bạn đã hoàn thành game này</div>
                                </div> */}
                            {/* <button onclick="nextNumber()"> Next Number</button>
                        <div class="label">Goal</div> */}
                            {/* <select name="goal" id="goal">
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                            <option value="diagonal">Diagonal</option>
                        </select>
                        <button onclick={() => this.bingo()}> Bingo !</button> */}
                        </div>
                        {/* <button class="newgame" onclick="newGame()">New game</button> */}
                    </div>
                </div>
            </div>
        );
    }
}


export default BingoGame;