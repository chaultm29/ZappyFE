import React, { Component } from 'react';
import {
    AwesomeButton,
} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import BingoGame from './BingoGame';

class BingoSetting extends Component {

    constructor(props) {
        super(props);
        this.selectLevel = this.selectLevel.bind(this);
        this.onClickStart = this.onClickStart.bind(this);
        this.onHandleChangeLessonIds = this.onHandleChangeLessonIds.bind(this);
        this.state = {
            isSetting: true,
            time: 0,
            lessons: [],
            messageValidate : "",
            messageValidate2 : "",
        }
    }

    //select lesson 
    onHandleChangeLessonIds = (e) => {
        // e.preventDefault();
        var { checked, value } = e.target;
        if (checked) {
            this.state.lessons.push(parseInt(value));
        } else {
            this.state.lessons = this.state.lessons.filter((item) => item !== parseInt(value));
        }
    }

    //select level
    selectLevel(level) {
        switch (level) {
            case "easy":
                this.state.time = 660;
                break;
            case "medium":
                this.state.time = 540;
                break;
            case "hard":
                this.state.time = 420;
        }
    }

    onClickStart() {
        if (this.state.time === 0) {
            this.setState({ messageValidate: "Vui lòng chọn độ khó" })
        }
        if (this.state.lessons.length === 0) {
            this.setState({ messageValidate2: "Vui lòng chọn bài học" })
        }
        if(this.state.time !== 0&&this.state.lessons.length !== 0){
            this.setState({ isSetting: false })
            console.log(this.state.isSetting)
        }
    }


    render() {
        return (
            <>
            {this.state.isSetting ? <div className="container mt-2" >
                <div class="card mx-auto text-center mb-3" role="start">
                    <div class="card-body">
                        <h4 class="card-title fw-bold">CHỌN ĐỘ KHÓ</h4>
                        <p class="text-muted">Ở mỗi mức độ, thời gian sẽ thay đổi</p>
                        <p class="text-danger mb-0" id="dangerTime" >{this.state.messageValidate}</p>
                        <div class="row row-cols-3">
                            <div class="col my-1 setting-container">
                                <input
                                    type="radio"
                                    name="radioCheck"
                                    class="d-none"
                                    id="radioEasy"
                                    onClick={() => this.selectLevel("easy")}
                                ></input>
                                <label
                                    for="radioEasy"
                                    class="border border-dark w-100 h-100 rounded"
                                >
                                    DỄ
                <h2>11 phút</h2>
                                </label>
                            </div>
                            <div class="col my-1 setting-container">
                                <input
                                    type="radio"
                                    name="radioCheck"
                                    class="d-none"
                                    id="radioMedium"
                                    onClick={() => this.selectLevel("medium")}
                                ></input>
                                <label
                                    for="radioMedium"
                                    class="border border-dark w-100 h-100 rounded"
                                >
                                    THƯỜNG
                <h2>9 phút</h2>
                                </label>
                            </div>

                            <div class="col my-1 setting-container">
                                <input
                                    type="radio"
                                    name="radioCheck"
                                    class="d-none"
                                    id="radioHard"
                                    onClick={() => this.selectLevel("hard")}
                                ></input>
                                <label
                                    for="radioHard"
                                    class="border border-dark w-100 h-100 rounded"
                                >
                                    KHÓ
                <h2>7 phút</h2>
                                </label>
                            </div>
                            {/* <div class="col-md-3 my-1 setting-container">
              <input
                type="radio"
                name="radioCheck"
                class="d-none"
                id="radioVeryHard"
                onClick={() => setNumberOfCard(30)}
              ></input>
              <label
                for="radioVeryHard"
                class="border border-dark w-100 h-100 rounded"
              >
                RẤT KHÓ
                <h2>30</h2>
              </label>
            </div> */}

                            <div className="col-md-6 mt-3">
                                <h5 class="card-title fw-bold">CHỌN BÀI</h5>
                                <p class="text-muted">Nội dung tương ứng của từng bài sẽ ở mặt sau của thẻ</p>
                                <p class="text-danger mb-0" id="dangerLessons">{this.state.messageValidate2}</p>
                                <div class="row row-cols-2">
                                    <div class="col">
                                        <div class="cntr">
                                            <input class="hidden-xs-up d-none" id="cbx1" value="1" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                            <label class="cbx" for="cbx1"></label>
                                            <label class="lbl" for="cbx1">Bài 1</label>
                                        </div>
                                        <div class="cntr">
                                            <input class="hidden-xs-up d-none" id="cbx2" value="2" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                            <label class="cbx" for="cbx2"></label>
                                            <label class="lbl" for="cbx2">Bài 2</label>
                                        </div>
                                        <div class="cntr">
                                            <input class="hidden-xs-up d-none" id="cbx3" value="3" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                            <label class="cbx" for="cbx3"></label>
                                            <label class="lbl" for="cbx3">Bài 3</label>
                                        </div>
                                        <div class="cntr">
                                            <input class="hidden-xs-up d-none" id="cbx4" value="4" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                            <label class="cbx" for="cbx4"></label>
                                            <label class="lbl" for="cbx4">Bài 4</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="cntr">
                                            <input class="hidden-xs-up d-none" id="cbx5" value="5" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                            <label class="cbx" for="cbx5"></label>
                                            <label class="lbl" for="cbx5">Bài 5</label>
                                        </div>
                                        <div class="cntr">
                                            <input class="hidden-xs-up d-none" id="cbx6" value="6" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                            <label class="cbx" for="cbx6"></label>
                                            <label class="lbl" for="cbx6">Bài 6</label>
                                        </div>
                                        <div class="cntr">
                                            <input class="hidden-xs-up d-none" id="cbx7" value="7" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                            <label class="cbx" for="cbx7"></label>
                                            <label class="lbl" for="cbx7">Bài 7</label>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <p class="card-text mt-2">
                            {/* <div class="start-button-container">
              <button className="start-button" onClick={onClickStart}>
                BẮT ĐẦU
              </button>   
            </div> */}
                            <AwesomeButton type="secondary" onPress={() => this.onClickStart()} ><span class="text-light">BẮT ĐẦU</span></AwesomeButton>
                        </p>
                    </div>
                </div>
            </div> : <BingoGame time={this.state.time} lessons={this.state.lessons} />}
            </>
        );
    }
}

export default BingoSetting;