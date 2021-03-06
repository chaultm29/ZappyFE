import React, { Component } from "react";
import "./css/sidebar.css";
import { withRouter } from "react-router-dom";
import StudyService from "../../services/StudyService";
import UserServices from "../../services/UserServices";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.learning = this.learning.bind(this);
    this.display = this.display.bind(this);
    this.displayLesson = this.displayLesson.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.gotoLesson = this.gotoLesson.bind(this);
    this.state = {
      kanjilessons: [],
      vocalessons: [],
      gramlessons: [],
      currentSkill: "",
      displaySkill: "",
      progress: [],
    };
  }

  renderDefault() {
    var url = window.location.pathname;
    switch (url) {
      case "/study/alphabet":
        this.display();
        break;
      case "/study/hiragana":
        this.learning("hiragana");
        break;
    }
  }

  learning(skill) {
    var text = "Học tập";
    var rightContent = document.getElementsByClassName("rightContent");
    switch (skill) {
      case "huongdan":
        // text = "Hướng dẫn";
        window.location.href = "/study";
        break;
      case "alphabet":
        // text = "Bảng chữ cái";
        this.props.history.push("/study/alphabet");
        break;
      case "hiragana":
        // text = "Hiragana";
        this.props.history.push("/study/hiragana");
        break;
      case "katakana":
        // text = "Katakana";
        this.props.history.push("/study/katakana");
        break;
      case "vocabulary":
        // text = "Từ vựng";

        break;
      case "grammar":
        // text = "Ngữ pháp";
        break;
      case "kanji":
        // text = "Chữ hán";
        break;
    }
    var title = document.getElementById("title");
    if (title != null) title.innerHTML = text;
  }

  display() {
    this.learning("alphabet");
    var elem = document.getElementById("alphabet");
    if (elem.style.display == "none") elem.style.display = "flex";
    else elem.style.display = "none";
  }

  gotoLesson(skill, id) {
    var url = "/study/" + skill + "/lesson/" + id;
    this.props.history.push(url);
    window.location.reload(true);
  }
  displayLesson(skill) {
    if (this.state.displaySkill !== "") {
      var lesson = document.getElementById(this.state.displaySkill + "Lesson");
      if (this.state.displaySkill === skill)
        lesson.style.display = lesson.style.display == "none" ? "flex" : "none";
      else {
        lesson.style.display = "none";
        document.getElementById(skill + "Lesson").style.display = "flex";
        this.state.displaySkill = skill;
      }
    } else {
      document.getElementById(skill + "Lesson").style.display = "flex";
      this.state.displaySkill = skill;
    }
  }

  componentDidMount() {
    StudyService.getLesson(1).then((res) => {
      if (res != null)
        this.setState({ vocalessons: res.data })
    });
    StudyService.getLesson(2).then((res) => {
      if (res != null)
        this.setState({ gramlessons: res.data })
    });
    StudyService.getLesson(3).then((res) => {
      if (res != null)
        this.setState({ kanjilessons: res.data })
    });
    var elem = window.location.pathname.split("/");
    if (elem.length >= 3 && (elem[2] === "vocabulary" || elem[2] === "grammar" || elem[2] === "kanji")) {
      this.state.currentSkill = this.state.displaySkill = elem[2];
      document.getElementById(this.state.currentSkill + "Lesson").style.display = "flex";
    }
    if (elem.length >= 3 && (elem[2] === "alphabet" || elem[2] === "hiragana" || elem[2] === "katakana")) {
      document.getElementById("alphabet").style.display = "flex";
    }

    UserServices.getProgress().then((res) => {
      if (res != null)
        this.setState({ progress: res.data })
    });
  }
  render() {
    return (
      <>
        <div
          class="col-md-3"
          style={{ backgroundColor: "#F9D9D4", borderRadius: "15px 15px 0px 0px", minHeight: "100vh" }}
        >
          <h3
            id="title"
            class="text-lg-center lh-base font-normal text-lg text-decoration-none text-reset mt-2"
          >
            Học tập
          </h3>
          <div class="row ${1| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|} mx-0">
            <div class="col-md-6 box shadow me-2" style={{ width: "48%" }}>
              <div class="percent">
                <svg>
                  <circle cx="70" cy="70" r="55"></circle>
                  <circle cx="70" cy="70" r="55"></circle>
                </svg>
                <div class="numberPro">
                  <h2>
                    {parseInt(this.state.progress.progressAll * (100 / 21))}<span>%</span>
                  </h2>
                </div>
              </div>
              <p class="text">Tiến độ học</p>
            </div>

            <div class="col-md-6 skill shadow" style={{ width: "48%" }}>
              <h4 class="text">Kỹ năng</h4>
              <div class="pro">
                <div class="info">
                  <span>Từ vựng</span>
                </div>
                <div class="progress-line" >
                  <span style={{ width: this.state.progress.vocaProgress * (100 / 7) + "%" }}></span>
                </div>
              </div>
              <div class="pro">
                <div class="info">
                  <span>Ngữ pháp</span>
                </div>
                <div class="progress-line">
                  <span style={{ width: this.state.progress.grammarProgess * (100 / 7) + "%" }}></span>
                </div>
              </div>
              <div class="pro">
                <div class="info">
                  <span>Chữ hán</span>
                </div>
                <div class="progress-line">
                  <span style={{ width: this.state.progress.kanjiProgress * (100 / 7) + "%" }}></span>
                </div>
              </div>
            </div>
          </div>
          <div class="row ${2| ,row-cols-2,row-cols-3, auto,justify-content-md-center,|} mx-0">
            <button
              class="boxBig shadow"
              onClick={() => this.learning("huongdan")}
            >
              <h5> Hướng dẫn trước khi học </h5>
            </button>
          </div>
          <div class="row mx-0 ">
            <button class="boxBig shadow" onClick={this.display}>
              <h5> Bảng chữ cái </h5>
            </button>
          </div>
          <div
            class="row mx-0 "
            id="alphabet"
            style={{
              display: "none",
            }}
          >
            <button
              class="col-md-6 boxTwo shadow box-hiragana me-2"
              style={{ width: "49%" }}
              onClick={() => this.learning("hiragana")}
            >
              <h5>Hiragana</h5>
            </button>
            <button
              class="col-md-6 boxTwo shadow box-katakana"
              style={{ width: "48%" }}
              onClick={() => this.learning("katakana")}
            >
              <h5>Katakana</h5>
            </button>
          </div>
          <div class="row mx-0">
            <button
              class="col-md-4 boxTwo shadow box-vocab me-2"
              style={{ width: "31.33333333%" }}
              onClick={() => this.displayLesson("vocabulary")}
            >
              <h5>Từ vựng</h5>
            </button>
            <button
              class="col-md-4 boxTwo shadow box-grammar me-2"
              style={{ width: "31.33333333%" }}
              onClick={() => this.displayLesson("grammar")}
            >
              <h5>Ngữ pháp</h5>
            </button>
            <button
              class="col-md-4 boxTwo shadow box-kanji"
              style={{ width: "31.33333333%" }}
              onClick={() => this.displayLesson("kanji")}
            >
              <h5>Chữ hán</h5>
            </button>
          </div>

          <div
            id="vocabularyLesson"
            class="row mx-0 mb-2"
            style={{ display: "none" }}
          >
            {this.state.vocalessons.map((lesson) => (
              <button
                class={lesson.isLearnt?"col-md-12 boxBig-btn2 btnLesson": "col-md-12 boxBig-btn btnLesson"}
                key={lesson.id}
                onClick={() => this.gotoLesson("vocabulary", lesson.id)}
                
              >
                <h5>{lesson.lessonName}</h5>
              </button>
            ))}
          </div>
          <div
            id="grammarLesson"
            class="row mx-0 mb-2"
            style={{ display: "none" }}
          >
            {this.state.gramlessons.map((lesson) => (
              <button
                class={lesson.isLearnt?"col-md-12 boxBig-btn2 btnLesson": "col-md-12 boxBig-btn btnLesson"}
                key={lesson.id}
                onClick={() => this.gotoLesson("grammar", lesson.id)}
              >
                <h5>{lesson.lessonName}</h5>
              </button>
            ))}
          </div>
          <div
            id="kanjiLesson"
            class="row mx-0 mb-2"
            style={{ display: "none" }}
          >
            {this.state.kanjilessons.map((lesson) => (
              <button
                class={lesson.isLearnt?"col-md-12 boxBig-btn2 btnLesson": "col-md-12 boxBig-btn btnLesson"}
                key={lesson.id}
                onClick={() => this.gotoLesson("kanji", lesson.id)}
              >
                <h5>{lesson.lessonName}</h5>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Sidebar);
