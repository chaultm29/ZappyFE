import React, { Component } from 'react';
import './css/grammar.css';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import Footer from '../../components/Student/Footer';
import bg from "../../assets/img/bg-home-scene-winter.svg";
import StudyService from '../../services/StudyService';
import S3Config from "../../services/S3Config";
class Grammar extends Component {
    constructor(props) {
        super(props)
        this.gotoPractice = this.gotoPractice.bind(this);
        this.state = {
            grammars: [],
            id: this.props.match.params.id
        }
    }

    gotoPractice() {
        this.props.history.push("/study/practice/grammar/" + this.props.match.params.id);
    }

    componentDidMount() {
        StudyService.getGrammar(this.state.id).then((res) => {
            this.setState({ grammars: res.data })
            if (res.data == "") {
                window.location.href = "/notfound"
            }
        });
    }
    render() {
        return (
            <div
                style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom" }}>
                <Navigation />
                <div className="container mt-2" style={{ backgroundColor: "#fceced", borderRadius: "15px" }}>
                    <div class="row">
                        <Sidebar />
                        <div class="col-md-8 mx-auto">
                            <h1 class="tit"> Ngữ pháp </h1>
                            <div id="accordion">
                                {
                                    this.state.grammars.map(
                                        (grammar, index) =>
                                            <div class="card shadow mb-2" key={index + 1}>
                                                <div class="card-header text-start bg-white">
                                                    <a class="collapsed btn text-start" data-bs-toggle="collapse" href={"#collapse" + grammar.id}>
                                                        {index + 1}. {grammar.grammar} : {grammar.grammarMeaning}
                                                    </a>
                                                </div>
                                                <div id={"collapse" + grammar.id} class="collapse" data-bs-parent="#accordion">
                                                    <div class="card-body">
                                                        <div>{grammar.explanation}</div>
                                                        <div>{grammar.example}</div>
                                                        <div>{grammar.exampleMeaning}</div>
                                                        <div class="vocabulary-image">
                                                            <img src={S3Config.baseURLImgForGrammar + grammar.exampleImageLink} width="300px" alt="không có hình ảnh" />
                                                            {/* <img src={require(`../../assets/img/KanjiDes/1.png`).default} alt="hiragana" /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    )}
                            </div>
                            <div class="row">
                                <button class="btn btn-danger practice" onClick={this.gotoPractice}>Luyện tập</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>?
            </div>
        );
    }
}

export default Grammar;