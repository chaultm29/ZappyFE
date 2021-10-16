import { Immutable } from '@babel/types';
import { _ } from '@babel/types';
import React, { Component } from 'react';
import './css/kanji.css';
import i from '../../assets/img/意.gif';
import a from '../../assets/img/1.png';
class Kanji extends Component {
    constructor(props){
        super(props)
        this.state = {
            kanjis: [
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
            <div class="col-md-8">
                <h1 class="tit"> Kanji </h1>
                <div class="row my-card">
                    <div class="cha">意</div>
                    <div class="kanji-attribute">
                        <ul>
                            <li>Âm on: <span>お</span></li>
                            <li>Âm kun: <span>お</span></li>
                            <li>Âm hán: <span>Ý</span></li>
                            <li>Âm nghĩa: <span>Ý chí</span></li>
                        </ul>
                    </div>
                    <div class="kanji-gif"><img src={i} alt="hiragana" /></div>

                    <div class="letgo">Cùng nhớ nào ^^</div>
                    <div class="des">ÂM THANH (音) phát ra từ trong TIM(心) chính là Ý (意) của mình.</div>
                    <div class="kanji-image"><img src={a} alt="hiragana" /></div>
                </div>
                <div>
                    <button class="btn btn-secondary prev">Quay lại</button>
                    <button class="btn btn-primary next">Tiếp theo</button>
                </div>
                <div class="progress prog">
                    <div class="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="row">
                    <button class="btn btn-danger practice">Luyện tập</button>
                </div>
            </div>

        );
    }
}

export default Kanji;