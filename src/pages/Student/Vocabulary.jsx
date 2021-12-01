import React, { Component } from 'react';
import './css/vocabulary.css';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import bg from "../../assets/img/bg-home-scene-winter.svg";
import StudyService from '../../services/StudyService';
import Speech from "../../services/Speech";

class Vocabulary extends Component {
    constructor(props) {
        super(props)
        this.changeToCard = this.changeToCard.bind(this);
        this.gotoPractice = this.gotoPractice.bind(this);
        //this.addCardDatas = this.addCardDatas.bind(this);
        this.state = {
            vocabularies: [],
            //cardDatas : [],
            index: 0,
            id: this.props.match.params.id

        }

    }
    onUserClickSpeaker = (e) => {
        let input = e.target.id;
        Speech(input);
    };

    gotoPractice() {
        this.props.history.push("/study/practice/vocabulary/" + this.props.match.params.id);
    }


    // addCardDatas(){
    //     for(var i  = 0; i< this.state.vocabularies.length; i++){
    //         var cardData = 
    //             {
    //               front: {
    //                 text: this.state.vocabularies[i].voca,
    //                 image: this.state.vocabularies[i].imageLink,
    //               },
    //               back: {
    //                 text: this.state.vocabularies[i].meaning,
    //               }
    //             }

    //           this.state.cardDatas.push(cardData);
    //     }
    // }
    changeToCard(i) {
        var lengthMax = this.state.vocabularies.length;
        var currIndex = this.state.index;
        var nextIndex = this.state.index += i;
        var cards = document.getElementsByClassName("vocabulary-card")
        if (nextIndex === lengthMax) {
            cards[this.state.index - 1].style.display = "none";
            document.getElementById("finishLearning").style.display = "flex";
            document.getElementById("nextButton").disabled = true;
        }

        else if (nextIndex < 0) {
            this.state.index = lengthMax - 1;
            cards[currIndex].style.display = "none"
            cards[this.state.index].style.display = "flex"
        }

        else {
            if (currIndex === lengthMax) {
                document.getElementById("finishLearning").style.display = "none";
                document.getElementById("nextButton").disabled = false;
            }
            cards[currIndex].style.display = "none"
            cards[this.state.index].style.display = "flex"
        }
        this.countProgress();
    }

    countProgress() {
        var lengthMax = this.state.vocabularies.length;
        var currentIndex = this.state.index;
        var progress = ((currentIndex + 1) / lengthMax) * 100;
        document.getElementById("progress-vocabulary").setAttribute("aria-valuenow", progress);
        document.getElementById("progress-vocabulary").style.width = progress + "%";
    }
    // changeToCard(i) {
    //     var lengthMax = this.state.vocabularies.length;
    //     var currIndex = this.state.index;
    //     var nextIndex = this.state.index += i;
    //     if (nextIndex >= lengthMax) { this.state.index = 0; }
    //     else if (nextIndex < 0) { this.state.index = lengthMax - 1; }
    //     var cards = document.getElementsByClassName("vocabulary-card")
    //     cards[currIndex].style.display = "none"
    //     cards[this.state.index].style.display = "flex"
    // }

    componentDidMount() {
        //this.addCardDatas();this.setState({ kanjis: res.data })
        StudyService.getVocabulary(this.state.id).then((res) => {
            this.setState({ vocabularies: res.data })
            console.log(res);
            if (res.data != "") {
                var cards = document.getElementsByClassName("vocabulary-card")
                cards[this.state.index].style.display = "flex"
            } else {
                window.location.href = "/notfound"
            }
        });

    }
    render() {
        return (
            <div>
                <div
                    style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom" }}>
                    <Navigation />
                    <div className="container mt-2" style={{ backgroundColor: "#fceced", borderRadius: "15px" }}>
                        <div class="row">
                            <Sidebar />
                            <div class="col-md-9 mx-auto" style={{ width: "73%" }}>
                                <h1 class="tit"> Vocabulary </h1>
                                {/* <div class= "row"><FlashcardComponent dataSource={cardDatas}/></div> */}

                                {
                                    this.state.vocabularies.map(
                                        vocabulary =>
                                            <div class="row vocabulary-card shadow mx-auto" key={vocabulary.id}>
                                                <div class="box-inner">
                                                    <div class="box-front">
                                                        <div class="cha">{vocabulary.vocabulary}
                                                            <span
                                                                class="position-absolute translate-middle p-2 bg-white ms-4 rounded-circle fs-6 "
                                                                style={{ top: "30px" }}>
                                                                <i
                                                                    class="fas fa-volume-up fs-5 text-secondary"
                                                                    id={vocabulary.vocabulary}
                                                                    onClick={this.onUserClickSpeaker.bind(this)}
                                                                ></i>
                                                            </span></div>
                                                        <div class="example">{vocabulary.example}
                                                            <span
                                                                class="position-absolute translate-middle p-2 bg-white ms-4 rounded-circle fs-6 "
                                                                style={{}}>
                                                                <i
                                                                    class="fas fa-volume-up fs-6 text-secondary"
                                                                    id={vocabulary.example}
                                                                    onClick={this.onUserClickSpeaker.bind(this)}
                                                                ></i>
                                                            </span>
                                                        </div>
                                                        <div class="vocabulary-image"><img src={require(`../../assets/img/KanjiDes/1.png`).default} alt="hiragana" /></div>

                                                    </div>
                                                    <div class="box-back">
                                                        <div class="meaning">{vocabulary.meaning}
                                                        </div>
                                                        <div class="exampleMean">{vocabulary.exampleMeaning}</div>
                                                    </div>
                                                </div>
                                            </div>
                                    )}<div id="finishLearning" class="vocabulary-card" style={{ display: "none" }}>
                                    <p>Bạn đã xong phần học rồi đó. Vào luyện tập ngay</p>
                                    <button>Luyện tập</button>
                                </div>
                                <div>


                                    <button id="prevButton" class="btn btn-secondary prev" onClick={() => this.changeToCard(-1)}>Quay lại</button>
                                    <button id="nextButton" class="btn btn-primary next" onClick={() => this.changeToCard(1)}>Tiếp theo</button>
                                </div>
                                <div class="progress prog">
                                    <div class="progress-bar bg-info" id="progress-vocabulary" role="progressbar" style={{ width: "0%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                {
                                    this.state.vocabularies.map(
                                        vocabulary =>

                                            <div class="row my-card shadow mt-2" key={vocabulary.id}>
                                                <div class="voca">{vocabulary.vocabulary}</div>
                                                <div class="des">{vocabulary.meaning}</div>
                                            </div>
                                    )}
                                <div class="row">
                                    <button class="btn btn-danger practice" onClick={this.gotoPractice}>Luyện tập</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vocabulary;