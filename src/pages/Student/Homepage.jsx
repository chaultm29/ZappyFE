import React, { Component } from 'react';
import Navigation from "../../components/Student/Navigation";
import Sidebar from '../../components/Student/Sidebar';
import bg from "../../assets/img/bg-home-scene-winter.svg";
class Homepage extends Component {
    render() {
        return (
            <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
            <Navigation/>
            
            </div>
        );
    }
}

export default Homepage;