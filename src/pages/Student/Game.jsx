import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import Footer from "../../components/Student/Footer";
import bg from "../../assets/img/bg-home-scene-winter.svg";
import React, { Component } from 'react';
import BingoGame from "../../components/Student/BingoGame";
import BingoSetting from "../../components/Student/BingoSetting";

class Game extends Component {
    constructor(props){
        super(props);
         
    }
    
    render() {
        return (
            <div
                style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}
            >
                <Navigation />
                <div className="container" style={{ backgroundColor: "#fceced", borderRadius: "15px 15px 0px 0px", minHeight: "100vh", display:"flex" }}>
                    <BingoSetting/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Game;