import React, { Component } from "react";
import "./css/alphabet.css";
import a from "../../assets/img/1.png";
import hirag from "../../assets/img/hiragana.png";
import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import gif from "../../assets/img/pagebg.gif";
import StudyService from "../../services/StudyService";
import Speech from "../../services/Speech";

class Hiragana extends Component {
  constructor(props) {
    super(props);
    this.onUserClickSpeaker = this.onUserClickSpeaker.bind(this);
    this.state = {
      hiras: [],
    };
  }
  componentDidMount() {
    StudyService.getHiragana().then((res) => {
      this.setState({ hiras: res.data });
    });
  }
  onUserClickSpeaker = (e) => {
    let input = e.target.id;
    console.log(e.target.id);
    Speech(input);
  };
  render() {
    return (
      <div
      // style={{ backgroundImage: `url(${gif})`, backgroundColor: "#ff9999" }}
      >
        <Navigation />
        <div
          className="container mt-2"
          style={{ backgroundColor: "#fceced", borderRadius: "15px" }}
        >
          <div class="row">
            <Sidebar />

            <div class="col-md-9 mx-auto" style={{ width: "73%" }}>
              <h1 class="tit"> Cùng nhớ Hiragana nào </h1>
              {this.state.hiras.map((hira) => (
                <div class="row my-card mx-0 shadow mb-3" key={hira.id}>
                  <div class="cha">
                    {hira.character}
                    <span
                      class="position-absolute translate-middle p-2 bg-white rounded-circle fs-6 "
                      style={{ marginLeft: "100px", marginTop: "30px" }}
                    >
                      <i
                        class="fas fa-volume-up fs-5 text-secondary"
                        id={hira.character}
                        onClick={this.onUserClickSpeaker.bind(this)}
                      ></i>
                    </span>
                  </div>
                  <img
                    src={
                      require(`../../assets/img/Alphabet/${hira.imageLink}`)
                        .default
                    }
                    alt="hiragana"
                  />
                  <div class="des">{hira.description}</div>

                </div>
              ))}
              {/* <div class="row">
                <button class="btn btn-danger practice">Luyện tập</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hiragana;
