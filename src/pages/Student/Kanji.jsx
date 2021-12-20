import React, { Component } from "react";
import "./css/kanji.css";
import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import StudyService from "../../services/StudyService";
import Speech from "../../services/Speech";
import bg from "../../assets/img/bg-home-scene-winter.svg";
class Kanji extends Component {
  constructor(props) {
    super(props)
    this.changeToCard = this.changeToCard.bind(this);
    this.countProgress = this.countProgress.bind(this);
    this.gotoPractice = this.gotoPractice.bind(this);
    this.onUserClickSpeaker = this.onUserClickSpeaker.bind(this);
    this.state = {
      kanjis: [],
      index: 0,
      id: this.props.match.params.id
    };
  }

  gotoPractice() {
    this.props.history.push("/study/practice/kanji/" + this.props.match.params.id);
  }

  changeToCard(i) {
    var lengthMax = this.state.kanjis.length;
    var currIndex = this.state.index;
    var nextIndex = this.state.index += i;
    var cards = document.getElementsByClassName("kanji-card")
    if (nextIndex === lengthMax) {
      cards[this.state.index - 1].style.display = "none";
      document.getElementById("finishLearning").style.display = "flex";
      document.getElementById("nextButton").disabled = true;
    }

    else if (nextIndex < 0) {
      this.state.index = lengthMax - 1;
      cards[currIndex].style.display = "none"
      cards[this.state.index].style.display = "flex"
    }

    else {
      if (currIndex === lengthMax) {
        document.getElementById("finishLearning").style.display = "none";
        document.getElementById("nextButton").disabled = false;
      }
      cards[currIndex].style.display = "none"
      cards[this.state.index].style.display = "flex"
    }
    this.countProgress();
  }

  countProgress() {
    var lengthMax = this.state.kanjis.length;
    var currentIndex = this.state.index;
    var progress = ((currentIndex + 1) / lengthMax) * 100;
    document.getElementById("progress-kanji").setAttribute("aria-valuenow", progress);
    document.getElementById("progress-kanji").style.width = progress + "%";
  }

  componentDidMount() {
    StudyService.getKanji(this.state.id).then((res) => {
      this.setState({ kanjis: res.data })
      console.log(res);
      if (res.data != "") {
        var cards = document.getElementsByClassName("kanji-card")
        cards[this.state.index].style.display = "flex"
      }
      else {
        window.location.href = "/notfound"
      }
    });
  }

  onUserClickSpeaker = (e) => {
    let input = e.target.id;
    console.log(e.target.id);
    Speech(input);
  };

  render() {
    return (
      // <div style={{ backgroundImage: `url(${gif})`, backgroundColor: "#ff9999" }}>
      <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
        <Navigation />
        <div
          className="container"
          style={{ backgroundColor: "#fceced", borderRadius: "15px" }}
        >
          <div class="row mt-2 d-flex">
            <Sidebar />
            <div class="col-md-9 mx-auto" style={{ width: "72%" }}>
              <h1 class="tit mt-2"> Kanji </h1>
              {
                this.state.kanjis.map(
                  kanji =>
                    <div class="row kanji-card" key={kanji.id}>
                      <div class="cha col-md-4">{kanji.character}</div>
                      <div class="kanji-attribute col-md-4">
                        <ul>
                          {kanji.onyomi && <><li>Âm on: <span>{kanji.onyomi}</span> <span
                            class=" p-2 bg-white ms-4 rounded-circle fs-6 "
                            style={{ top: "30px" }}>
                            <i
                              class="fas fa-volume-up fs-5 text-secondary"
                              id={kanji.onyomi}
                              onClick={this.onUserClickSpeaker.bind(this)}
                            ></i>
                          </span></li> </>}
                          {kanji.kunyomi && <> <li>Âm kun: <span>{kanji.kunyomi}</span> <span
                            class=" p-2 bg-white ms-4 rounded-circle fs-6 "
                            style={{ top: "30px" }}>
                            <i
                              class="fas fa-volume-up fs-5 text-secondary"
                              id={kanji.kunyomi}
                              onClick={this.onUserClickSpeaker.bind(this)}
                            ></i>
                          </span></li> </>}
                          <li>Nghĩa: <span>{kanji.chinese}</span></li>
                          <li>Giải nghĩa: <span>{kanji.vietnamese}</span></li>
                        </ul>
                      </div>
                      {/* <div class="kanji-gif"><img src={require(`https://imgzappybucket.s3.ap-southeast-1.amazonaws.com/KanjiGif/${kanji.gifLink == "" ? "1.gif" : kanji.gifLink}`).default} alt="hiragana" /></div> */}
                      <div class="kanji-gif col-md-4"><img src={"https://zappy-image.s3.ap-southeast-1.amazonaws.com/KanjiGif/" + kanji.gifLink} alt="hiragana" /></div>
                      <div class="letgo">Cùng nhớ nào ^^</div>
                      <div class="des">{kanji.description}</div>
                      <div class="kanji-image"><img src={"https://zappy-image.s3.ap-southeast-1.amazonaws.com/KanjiDes/" + kanji.imageLink} alt="hiragana" /></div>
                      {/* <div class="kanji-image"><img src={require(`https://imgzappybucket.s3.ap-southeast-1.amazonaws.com/KanjiDes/${kanji.imageLink == "" ? "1.png" : kanji.imageLink}`).default} alt="hiragana" /></div> */}
                    </div>

                )}
              <div id="finishLearning" class="kanji-card" style={{ display: "none" }}>
                <p>Bạn đã xong phần học rồi đó. Vào luyện tập ngay</p>
                <button onClick={this.gotoPractice}>Luyện tập</button>
              </div>
              <div>
                <button id="prevButton" class="btn btn-secondary prev" onClick={() => this.changeToCard(-1)}>Quay lại</button>
                <button id="nextButton" class="btn btn-primary next" onClick={() => this.changeToCard(1)}>Tiếp theo</button>
              </div>
              <div class="progress prog">
                <div class="progress-bar bg-info" id="progress-kanji" role="progressbar" style={{ width: "10%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="row">
                <button class="btn btn-danger practice" onClick={this.gotoPractice}>Luyện tập</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Kanji;
