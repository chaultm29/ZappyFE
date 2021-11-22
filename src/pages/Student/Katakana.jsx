import React, { Component } from 'react';
import './css/alphabet.css';
import a from '../../assets/img/1.png';
import hirag from '../../assets/img/hiragana.png';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import gif from '../../assets/img/pagebg.gif';
import StudyService from '../../services/StudyService';
import bg from "../../assets/img/bg-home-scene-winter.svg";
class Katakana extends Component {
    constructor(props) {
        super(props)
        this.state = {
            katas: []
        }
    }
    componentDidMount() {
        StudyService.getKatakana().then((res) => {
            this.setState({ katas: res.data })
            if (res.data == "") {
                window.location.href = "/notfound"
            }
        });
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
                <Navigation />
                <div className="container" style={{ backgroundColor: "#fceced" }}>
                    <div class="row">
                        <Sidebar />
                        <div class="col-md-8">
                            <h1 class="tit"> Cùng nhớ Katakana nào </h1>
                            {
                                this.state.katas.map(
                                    kata =>

                                        <div class="row my-card mx-0 shadow mb-3" key={kata.id}>

                                            <div class="cha">{kata.character}</div>
                                            <img src={require(`../../assets/img/Alphabet/${kata.imageLink}`).default} alt="hiragana" />
                                            <div class="des">{kata.description}</div>
                                        </div>
                                )}
                            {/* <div class="row">
                                <button class="btn btn-danger practice">Luyện tập</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Katakana;