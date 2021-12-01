import React, { Component } from 'react';
import './css/alphabet.css';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import StudyService from '../../services/StudyService';
import bg from "../../assets/img/bg-home-scene-winter.svg";
import Speech from "../../services/Speech";
class Katakana extends Component {
    constructor(props) {
        super(props)
        this.onUserClickSpeaker = this.onUserClickSpeaker.bind(this);
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
    onUserClickSpeaker = (e) => {
        let input = e.target.id;
        console.log(e.target.id);
        Speech(input);
    };
    render() {
        return (
            <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
                <Navigation />
                <div className="container mt-2" style={{ backgroundColor: "#fceced", borderRadius: "15px"}}>
                    <div class="row">
                        <Sidebar />
                        <div class="col-md-9 mx-auto" style={{ width: "73%" }}>
                            <h1 class="tit"> Cùng nhớ Katakana nào </h1>
                            {
                                this.state.katas.map(
                                    kata =>

                                        <div class="row my-card mx-0 shadow mb-3" key={kata.id}>

                                            <div class="cha">{kata.character}
                                                <span
                                                    class="position-absolute translate-middle p-2 bg-white rounded-circle fs-6 "
                                                    style={{ marginLeft: "100px", marginTop: "30px" }}
                                                >
                                                    <i
                                                        class="fas fa-volume-up fs-5 text-secondary"
                                                        id={kata.character}
                                                        onClick={this.onUserClickSpeaker.bind(this)}
                                                    ></i>
                                                </span></div>

                                            <img src={"https://imgzappybucket.s3.ap-southeast-1.amazonaws.com/Alphabet/" + kata.imageLink} alt="hiragana" />
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