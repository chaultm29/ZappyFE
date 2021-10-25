import React, { Component } from 'react';
import './css/sidebar.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router';
import StudyService from '../../services/StudyService';
import Kanji from '../../pages/Student/Kanji';
// import Hiragana from './Hiragana';
// import Alphabet from './Alphabet';

class Sidebar extends Component {

    constructor(props) {
        super(props);   
        this.learning = this.learning.bind(this);
        this.display = this.display.bind(this);
        this.displayLesson = this.displayLesson.bind(this);
        this.renderDefault = this.renderDefault.bind(this);
        this.gotoLesson = this.gotoLesson.bind(this);
        this.state = {
            lessons: [],
            currentSkill: "",
            displaySkill: ""
        }
    }

    renderDefault() {
        var url = window.location.pathname;
        switch (url) {
            case '/study/alphabet':
                this.display();
                break;
            case '/study/hiragana':
                this.learning('hiragana');
                break;

        }
    }

    learning(skill) {
        var text = 'Hướng dẫn';
        var rightContent = document.getElementsByClassName("rightContent")
        switch (skill) {
            case 'huongdan':
                text = 'Hướng dẫn';
                break;
            case 'alphabet':
                text = 'Bảng chữ cái';
                this.props.history.push('/study/alphabet');
                break;
            case 'hiragana':
                text = 'Hiragana';
                this.props.history.push('/study/hiragana');
                break;
            case 'katakana':
                text = 'Katakana';
                this.props.history.push('/study/katakana');
                break;
            case 'vocabulary':
                text = 'Từ vựng';
                
                break;
            case 'grammar':
                text = 'Ngữ pháp';
                break;
            case 'kanji':
                text = 'Chữ hán';
                break;

        }
        var title = document.getElementById("title")
        if (title != null) title.innerHTML = text;
    }

    display() {
        this.learning("alphabet");
        var elem = document.getElementById("alphabet");
        if (elem.style.display == "none") elem.style.display = "flex"
        else elem.style.display = "none"

    }

    gotoLesson(skill, id) {
        var url = "/study/" + skill + "/lesson/" + id
        this.props.history.push(url)
        window.location.reload(true)
    }
    displayLesson(skill) {
        if (this.state.displaySkill !== "") {
            var lesson = document.getElementById(this.state.displaySkill + "Lesson")
            if (this.state.displaySkill === skill)
                lesson.style.display = lesson.style.display == "none" ? "flex" : "none";
            else {
                lesson.style.display = "none";
                document.getElementById(skill + "Lesson").style.display = "flex";
                this.state.displaySkill = skill;
            }
        } else {
            document.getElementById(skill + "Lesson").style.display = "flex";
            this.state.displaySkill = skill;
        }
    }
    componentDidMount() {
        StudyService.getLesson().then((res) => {
            this.setState({ lessons: res.data })
        });
        var elem = window.location.pathname.split("/");
        if (elem.length >= 3 && (elem[2] === "vocabulary" || elem[2] === "grammar" || elem[2] === "kanji")) {
            this.state.currentSkill = this.state.displaySkill = elem[2];
            document.getElementById(this.state.currentSkill + "Lesson").style.display = "flex";
        }
        if(elem.length>=3 && (elem[2] === "alphabet" || elem[2] === "hiragana" || elem[2] === "katakana")){
            document.getElementById("alphabet").style.display = "flex";
        }

    }

    render() {
        return (
            <>
            <div class="col-md-4">

                <h3 id="title" class="text-lg-center lh-base font-normal text-lg text-decoration-none text-reset">
                    Hướng dẫn
                    </h3>
                <div class="row ${1| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}">

                    <div class="col-md-6 box">

                        <div class="percent">
                            <svg>
                                <circle cx="70" cy="70" r="55"></circle>
                                <circle cx="70" cy="70" r="55"></circle>
                            </svg>
                            <div class="number">
                                <h2>87<span>%</span></h2>
                            </div>
                        </div>
                        <h4 class="text">Tiến độ học</h4>

                    </div>

                    <div class="col-md-6 skill">
                        <h4 class="text">Kỹ năng</h4>
                        <div class="pro">
                            <div class="info">
                                <span>Bảng chữ cái</span>
                            </div>
                            <div class="progress-line"><span></span></div>
                        </div>
                        <div class="pro">
                            <div class="info">
                                <span>Từ vựng</span>
                            </div>
                            <div class="progress-line"><span></span></div>
                        </div>
                        <div class="pro">
                            <div class="info">
                                <span>Ngữ pháp</span>
                            </div>
                            <div class="progress-line"><span></span></div>
                        </div>
                        <div class="pro">
                            <div class="info">
                                <span>Chữ hán</span>
                            </div>
                            <div class="progress-line"><span></span></div>
                        </div>
                    </div>

                </div>
                <div class="row ${2| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|}">
                    <button class="boxBig" onClick={() => this.learning('huongdan')}>
                        <h3> Hướng dẫn trước khi học </h3>
                    </button>
                </div>
                <div class="row">
                    <button class="boxBig" onClick={this.display}>
                        <h3> Bảng chữ cái </h3>
                    </button>
                </div>
                <div class="row" id="alphabet" style={{ display: "none" }} >
                    <button class="col-md-6 boxTwo" onClick={() => this.learning('hiragana')}><h3>Hiragana</h3></button>
                    <button class="col-md-6 boxTwo" onClick={() => this.learning('katakana')}><h3>Katakana</h3></button>
                </div>
                <div class="row">
                    <button class="col-md-4 boxTwo" onClick={() => this.displayLesson('vocabulary')}>
                        <h3>Từ vựng</h3>
                    </button>
                    <button class="col-md-4 boxTwo" onClick={() => this.displayLesson('grammar')}><h3>Ngữ pháp</h3></button>
                    <button class="col-md-4 boxTwo" onClick={() => this.displayLesson('kanji')}><h3>Chữ hán</h3></button>
                </div>

                <div id="vocabularyLesson" class="row" style={{ display: "none" }}>
                    {this.state.lessons.map(
                        lesson =>
                            <button class="col-md-12 boxBig btnLesson" key={lesson.id} onClick={() => this.gotoLesson("vocabulary", lesson.id)}>
                                <h3>{lesson.lessonName}</h3>
                            </button>
                    )}
                </div>
                <div id="grammarLesson" class="row" style={{ display: "none" }}>
                    {this.state.lessons.map(
                        lesson =>
                            <button class="col-md-12 boxBig btnLesson" key={lesson.id} onClick={() => this.gotoLesson("grammar", lesson.id)}>
                                <h3>{lesson.lessonName}</h3></button>
                    )}
                </div>
                <div id="kanjiLesson" class="row" style={{ display: "none" }}>
                    {this.state.lessons.map(
                        lesson =>
                            <button class="col-md-12 boxBig btnLesson" key={lesson.id} onClick={() => this.gotoLesson("kanji", lesson.id)}>
                                <h3>{lesson.lessonName}</h3></button>
                    )}
                </div>
            </div>

            </>

        );
    }
}

export default withRouter(Sidebar);