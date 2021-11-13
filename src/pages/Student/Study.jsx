import React, { Component } from 'react';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import gif from '../../assets/img/pagebg.gif'
import Card from '../../components/Student/Card';
import Alphabet from "./Alphabet";
import Hiragana from "./Hiragana";
import Katakana from "./Katakana";
import Kanji from "./Kanji";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import bg from "../../assets/img/bg-home-scene-winter.svg";

class Study extends Component {

    render() {
        return (
            <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
                <Navigation />
                <div className="container" style={{ backgroundColor: "#fceced" }}>
                    <div class="row">
                        <Sidebar />
                        <div class="col-md-9">
                        <h1>Hướng dẫn học tập cho mọi người</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Study;