import React, { Component } from 'react';
import './css/alphabet.css';
import a from '../../assets/img/1.png';
import hirag from '../../assets/img/hiragana.png';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import gif from '../../assets/img/pagebg.gif'
class Katakana extends Component {
    constructor(props){
        super(props)
        this.state = {
            katas: [
            {
                id: 1,
                character: 'あ',
                imageLink: '1',
                description: 'ahihihihihihihi tui nè'
            },
            {
                id: 2,
                character: 'い',
                imageLink: '1',
                description: 'ahihihihihihihi tui nè'
            }
        ]
        }
    }
    render() {
        return (
            <div style={{ backgroundImage: `url(${gif})`, backgroundColor: "#ff9999" }}>
                <Navigation />
                <div className="container" style={{ backgroundColor: "#fceced" }}>
                    <div class="row">
                        <Sidebar />
            <div class="col-md-8">
                <h1 class="tit"> Cùng nhớ Katakana nào </h1>
                {
                    this.state.katas.map(
                        kata =>
                
                <div class="row my-card" key={kata.id}>
                    
                        <div class="cha">{kata.character}</div>
                        <img src={require(`../../assets/img/${kata.imageLink}.png`).default} alt="hiragana"/>
                        <div class="des">{kata.description}</div>
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

export default Katakana;