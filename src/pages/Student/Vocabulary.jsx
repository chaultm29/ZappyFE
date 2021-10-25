import React, { Component } from 'react';
import './css/vocabulary.css';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import gif from '../../assets/img/pagebg.gif'
import StudyService from '../../services/StudyService';

class Vocabulary extends Component {
    constructor(props) {
        super(props)
        this.changeToCard = this.changeToCard.bind(this);
        //this.addCardDatas = this.addCardDatas.bind(this);
        this.state = {
            vocabularies: [],
            //cardDatas : [],
            index: 0,
            id:this.props.match.params.id

        }

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
        if (nextIndex >= lengthMax) { this.state.index = 0; }
        else if (nextIndex < 0) { this.state.index = lengthMax - 1; }
        var cards = document.getElementsByClassName("vocabulary-card")
        cards[currIndex].style.display = "none"
        cards[this.state.index].style.display = "flex"
    }

    componentDidMount() {
        //this.addCardDatas();this.setState({ kanjis: res.data })
        StudyService.getVocabulary(this.state.id).then((res) => {
            this.setState({ vocabularies: res.data })
            var cards = document.getElementsByClassName("vocabulary-card")
            cards[this.state.index].style.display = "flex"
        });

    }
    render() {
        return (
            <div>
                <div style={{ backgroundImage: `url(${gif})`, backgroundColor: "#ff9999" }}>
                    <Navigation />
                    <div className="container" style={{ backgroundColor: "#fceced" }}>
                        <div class="row">
                            <Sidebar />
                            <div class="col-md-8">
                                <h1 class="tit"> Vocabulary </h1>
                                {/* <div class= "row"><FlashcardComponent dataSource={cardDatas}/></div> */}

                                {
                                    this.state.vocabularies.map(
                                        vocabulary =>
                                            <div class="row vocabulary-card" key={vocabulary.id}>
                                                <div class="box-inner">
                                                    <div class="box-front">
                                                        <div class="cha">{vocabulary.vocabulary}</div>
                                                        <div class="example">{vocabulary.example}</div>
                                                        <div class="vocabulary-image"><img src={require(`../../assets/img/KanjiDes/1.png`).default} alt="hiragana" /></div>

                                                    </div>
                                                    <div class="box-back">
                                                        <div class="meaning">{vocabulary.meaning}</div>
                                                        <div class="exampleMean">{vocabulary.exampleMeaning}</div>
                                                    </div>
                                                </div>
                                            </div>
                                    )}
                                <div>

                                    <button class="btn btn-secondary prev" onClick={() => this.changeToCard(-1)}>Quay lại</button>
                                    <button class="btn btn-primary next" onClick={() => this.changeToCard(1)}>Tiếp theo</button>
                                </div>
                                <div class="progress prog">
                                    <div class="progress-bar bg-info" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                {
                                    this.state.vocabularies.map(
                                        vocabulary =>

                                            <div class="row my-card" key={vocabulary.id}>

                                                <div class="voca">{vocabulary.vocabulary}</div>
                                                <div class="des">{vocabulary.meaning}</div>

                                            </div>
                                    )}
                                <div class="row">
                                    <button class="btn btn-danger practice">Luyện tập</button>
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