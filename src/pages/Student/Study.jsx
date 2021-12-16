import React, { Component } from 'react';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import Footer from "../../components/Student/Footer";
import bg from "../../assets/img/bg-home-scene-winter.svg";

class Study extends Component {

    render() {
        return (
            <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
                <Navigation />
                <div className="container mt-2" style={{ backgroundColor: "#fceced", borderRadius: "15px" }}>
                    <div class="row">
                        <Sidebar />
                        <div class="col-md-9">
                            <h1 class="tit">Hướng dẫn học tập cho mọi người</h1>
                            
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Study;