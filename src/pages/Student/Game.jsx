import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import bg from "../../assets/img/bg-home-scene-winter.svg";
import React, { Component } from 'react';
import BingoGame from "../../components/Student/BingoGame";

class Game extends Component {
    render() {
        return (
            <div
                style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}
            >
                <Navigation />
                <div className="container" style={{ backgroundColor: "#fceced", borderRadius: "15px 15px 0px 0px", minHeight: "100vh" }}>
                    <BingoGame />
                </div>
            </div>
        );
    }
}

export default Game;