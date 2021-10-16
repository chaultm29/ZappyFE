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

class Study extends Component {

    render() {
        return (
            <div style={{ backgroundImage: `url(${gif})`, backgroundColor: "pink" }}>
                <Navigation />
                <div className="container" style={{ backgroundColor: "#fceced" }}>
                    <div class="row">
                        <Sidebar />
                        {/* <Router>
                            <Switch>
                                <Route path="/study/alphabet" component={Alphabet}></Route>
                                <Route path="/study/hiragana" component={Hiragana}></Route>
                                <Route path="/study/katakana" component={Katakana}></Route>
                                <Route path="/study/kanji" component={Kanji}></Route>
                            </Switch>
                        </Router> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Study;