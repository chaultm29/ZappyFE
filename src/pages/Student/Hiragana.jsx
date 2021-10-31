import React, { Component } from 'react';
import './css/alphabet.css';
import a from '../../assets/img/1.png';
import hirag from '../../assets/img/hiragana.png';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import gif from '../../assets/img/pagebg.gif';
import StudyService from '../../services/StudyService'

class Hiragana extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hiras: []
               
        }
    }
    componentDidMount(){
        StudyService.getHiragana().then((res) =>{
            this.setState({hiras:res.data})
    });
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${gif})`, backgroundColor: "#ff9999" }}>
                <Navigation />
                <div className="container" style={{ backgroundColor: "#fceced" }}>
                    <div class="row">
                        <Sidebar />

                        <div class="col-md-9">
                            <h1 class="tit"> Cùng nhớ Hiragana nào </h1>
                            {
                                this.state.hiras.map(
                                    hira =>

                                        <div class="row my-card" key={hira.id}>

                                            <div class="cha">{hira.character}</div>
                                            <img src={require(`../../assets/img/Alphabet/${hira.imageLink}`).default} alt="hiragana" />
                                            <div class="des">{hira.description}</div>
                                        </div>
                                )}
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

export default Hiragana;