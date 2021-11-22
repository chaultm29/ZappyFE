import React, { Component } from "react";
import "./css/alphabet.css";
import kata from "../../assets/img/katakana.jpg";
import hira from "../../assets/img/hiragana.png";
import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import bg from "../../assets/img/bg-home-scene-winter.svg";
import Footer from "../../components/Student/Footer";
import Profile from "../User/Profile";

class Alphabet extends Component {
  render() {
    return (
      <div
        style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom" }}
      >
        <Navigation />
        <div className="container" style={{ backgroundColor: "#fceced", borderRadius: "15px 15px 0px 0px" }}>
          <div class="row mt-2">
            <Sidebar />
            <div class="col-md-9">
              <h1 class="tit"> Bảng chữ cái </h1>
              <div class="content">

                <div class="hira-container shadow" style={{ backgroundColor: "#fff", borderRadius: "15px" }}>
                  <h3 class="pt-2">Bảng chữ cái Hiragana</h3>
                  <img class="p-1" src={hira} alt="hiragana" width="100%" height="auto" />
                </div>
                <br />
                <div class="hira-container shadow mb-3" style={{ backgroundColor: "#fff", borderRadius: "15px" }}>
                  <h3 class="pt-2">Bảng chữ cái Katakana</h3>
                  <img class="p-1" src={kata} alt="hiragana" width="100%" height="auto" />
                </div>
              </div>
              <div class="row">
                <button class="btn btn-danger practice">Luyện tập</button>
              </div>
            </div>
          </div>
        </div>

        <Footer /> 
      </div>
    );
  }
}

export default Alphabet;
