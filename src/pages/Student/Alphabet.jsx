import React, { Component } from "react";
import "./css/alphabet.css";
import kata from "../../assets/img/katakana.jpg";
import hira from "../../assets/img/hiragana.png";
import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import gif from "../../assets/img/pagebg.gif";

class Alphabet extends Component {
  render() {
    return (
      <div
      //  style={{ backgroundImage: `url(${gif})`, backgroundColor: "#ff9999" }}
      >
        <Navigation />
        <div className="container">
          <div class="row mt-2">
            <Sidebar />

            <div class="col-md-9">
              <h1 class="tit"> Bảng chữ cái </h1>
              <div class="content">
                <h3>Bảng chữ cái Hiragana</h3>
                <img src={hira} alt="hiragana" width="100%" height="auto" />
                <h3>Bảng chữ cái Katakana</h3>
                <img src={kata} alt="hiragana" width="100%" height="auto" />
              </div>
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

export default Alphabet;
