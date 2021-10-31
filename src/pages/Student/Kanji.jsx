import React, { Component } from "react";
import "./css/kanji.css";
import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import gif from "../../assets/img/pagebg.gif";
import StudyService from "../../services/StudyService";
class Kanji extends Component {
  constructor(props) {
    super(props);
    this.changeToCard = this.changeToCard.bind(this);
    this.state = {
      kanjis: [],
      index: 0,
      id: this.props.match.params.id,
    };
  }
  changeToCard(i) {
    var lengthMax = this.state.kanjis.length;
    var currIndex = this.state.index;
    var nextIndex = (this.state.index += i);
    if (nextIndex >= lengthMax) {
      this.state.index = 0;
    } else if (nextIndex < 0) {
      this.state.index = lengthMax - 1;
    }
    var cards = document.getElementsByClassName("kanji-card");
    cards[currIndex].style.display = "none";
    cards[this.state.index].style.display = "flex";
  }

  componentDidMount() {
    StudyService.getKanji(this.state.id).then((res) => {
      this.setState({ kanjis: res.data });
      var cards = document.getElementsByClassName("kanji-card");
      cards[this.state.index].style.display = "flex";
    });
  }

  render() {
    return (
      // <div style={{ backgroundImage: `url(${gif})`, backgroundColor: "#ff9999" }}>
      <div>
        <Navigation />
        <div
          className="container"
          style={{ backgroundColor: "#fceced", borderRadius: "15px" }}
        >
          <div class="row mt-2 d-flex">
            <Sidebar />
            <div class="col-md-9 mx-auto" style={{ width: "72%" }}>
              <h1 class="tit mt-2"> Kanji </h1>
              {this.state.kanjis.map((kanji) => (
                <div class="row kanji-card shadow" key={kanji.id}>
                  <div class="cha">{kanji.character}</div>
                  <div class="kanji-attribute">
                    <ul>
                      <li>
                        Âm on: <span>{kanji.onyomi}</span>
                      </li>
                      <li>
                        Âm kun: <span>{kanji.kunyomi}</span>
                      </li>
                      <li>
                        Âm hán: <span>{kanji.chinese}</span>
                      </li>
                      <li>
                        Âm nghĩa: <span>{kanji.vietnamese}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="kanji-gif">
                    <img
                      src={
                        require(`../../assets/img/KanjiGif/${
                          kanji.gifLink == "" ? "1.gif" : kanji.gifLink
                        }`).default
                      }
                      alt="hiragana"
                    />
                  </div>
                  <div class="letgo">Cùng nhớ nào ^^</div>
                  <div class="des">{kanji.description}</div>
                  <div class="kanji-image">
                    <img
                      src={
                        require(`../../assets/img/KanjiDes/${
                          kanji.imageLink == "" ? "1.png" : kanji.imageLink
                        }`).default
                      }
                      alt="hiragana"
                    />
                  </div>
                </div>
              ))}
              <div>
                <button
                  class="btn btn-secondary prev"
                  onClick={() => this.changeToCard(-1)}
                >
                  Quay lại
                </button>
                <button
                  class="btn btn-primary next"
                  onClick={() => this.changeToCard(1)}
                >
                  Tiếp theo
                </button>
              </div>
              <div class="progress prog">
                <div
                  class="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: "50%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
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

export default Kanji;
