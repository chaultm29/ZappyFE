import React, { Component } from 'react';
import './css/grammar.css';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import gif from '../../assets/img/pagebg.gif';
import StudyService from '../../services/StudyService'
class Grammar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grammars: [],
            id: this.props.match.params.id
        }
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
            <div style={{ backgroundImage: `url(${gif})`, backgroundColor: "#ff9999" }}>
                <Navigation />
                <div className="container" style={{ backgroundColor: "#fceced" }}>
                    <div class="row">
                        <Sidebar />
                        <div class="col-md-8">
                            <h1 class="tit"> Ngữ pháp </h1>
                            <div id="accordion">
                                {
                                    this.state.grammars.map(
                                        grammar =>
                                            <div class="card" key={grammar.id}>
                                                <div class="card-header">
                                                    <a class="collapsed btn" data-bs-toggle="collapse" href={"#collapse" + grammar.id}>
                                                        {grammar.grammar} : {grammar.grammarMeaning}
                                                    </a>
                                                </div>
                                                <div id={"collapse" + grammar.id} class="collapse" data-bs-parent="#accordion">
                                                    <div class="card-body">
                                                        <div>{grammar.explanation}</div>
                                                        <div>{grammar.example}</div>
                                                        <div>{grammar.exampleMeaning}</div>
                                                        <div class="vocabulary-image"><img src={require(`../../assets/img/KanjiDes/1.png`).default} alt="hiragana" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                    )}
                            </div>
                            <div class="row">
                                <button class="btn btn-danger practice">Luyện tập</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Grammar;