import React, { Component } from 'react';
import {
    AwesomeButton,
} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import BingoGame from './BingoGame';
import './css/bingosetting.css';
import Sound from 'react-sound';
import jinglebell from '../../assets/sound/jingle-bell.mp3'

class BingoSetting extends Component {

    constructor(props) {
        super(props);
        this.selectLevel = this.selectLevel.bind(this);
        this.onClickStart = this.onClickStart.bind(this);
        this.onHandleChangeLessonIds = this.onHandleChangeLessonIds.bind(this);
        this.state = {
            isSetting: true,
            bonus: 0,
            time: 0,
            lessons: [],
            messageValidate: "",
            messageValidate2: "",
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
                this.state.bonus = 2;
                break;
            case "medium":
                this.state.time = 540;
                this.state.bonus = 4;
                break;
            case "hard":
                this.state.time = 420;
                this.state.bonus = 10;
        }
    }

    onClickStart() {
        if (this.state.time === 0) {
            this.setState({ messageValidate: "Vui lòng chọn độ khó" })
        }
        if (this.state.lessons.length === 0) {
            this.setState({ messageValidate2: "Vui lòng chọn bài học" })
        }
        if (this.state.time !== 0 && this.state.lessons.length !== 0) {
            this.setState({ isSetting: false })
            console.log(this.state.isSetting)
        }
    }




    render() {
        return (
            <>
                <Sound url={jinglebell}
                    //url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    playStatus={Sound.status.PLAYING}
                    //playFromPosition={300}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.handleSongFinishedPlaying}
                    volume={10}
                    loop={true}
                />
                {/* <div class="gameName"> Bingo Game </div> */}
                {this.state.isSetting ? <div className="containerBingo mt-2" >
                    <div class="card mx-auto text-center mb-3">
                        <div class="card-body" id="settingContent">
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


                                <div className="col-md-12 mt-3">
                                    <h5 class="card-title fw-bold">CHỌN BÀI</h5>
                                    <p class="text-muted">Câu hỏi sẽ là nội dung tương ứng của các bài</p>
                                    <p class="text-danger mb-0" id="dangerLessons">{this.state.messageValidate2}</p>
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-evenly">
                                            <div class="cntr">
                                                <input class="hidden-xs-up d-none" id="cbx1" value="1" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                                <label class="cbx" for="cbx1"></label>
                                                <label class="lbl fw-bold" for="cbx1">Bài 1</label>
                                            </div>
                                            <div class="cntr">
                                                <input class="hidden-xs-up d-none" id="cbx2" value="2" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                                <label class="cbx" for="cbx2"></label>
                                                <label class="lbl fw-bold" for="cbx2">Bài 2</label>
                                            </div>
                                            <div class="cntr">
                                                <input class="hidden-xs-up d-none" id="cbx3" value="3" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                                <label class="cbx" for="cbx3"></label>
                                                <label class="lbl fw-bold" for="cbx3">Bài 3</label>
                                            </div>
                                            <div class="cntr">
                                                <input class="hidden-xs-up d-none" id="cbx4" value="4" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                                <label class="cbx" for="cbx4"></label>
                                                <label class="lbl fw-bold" for="cbx4">Bài 4</label>
                                            </div>
                                            <div class="cntr">
                                                <input class="hidden-xs-up d-none" id="cbx5" value="5" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                                <label class="cbx" for="cbx5"></label>
                                                <label class="lbl fw-bold" for="cbx5">Bài 5</label>
                                            </div>
                                            <div class="cntr">
                                                <input class="hidden-xs-up d-none" id="cbx6" value="6" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                                <label class="cbx" for="cbx6"></label>
                                                <label class="lbl fw-bold" for="cbx6">Bài 6</label>
                                            </div>
                                            <div class="cntr">
                                                <input class="hidden-xs-up d-none" id="cbx7" value="7" type="checkbox" onChange={this.onHandleChangeLessonIds} />
                                                <label class="cbx" for="cbx7"></label>
                                                <label class="lbl fw-bold" for="cbx7">Bài 7</label>
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
                                <div class="count-policy position-absolute bottom-0 end-0 mb-3 me-3" >
                                    <button type="button" id="popoverExample" class="btn btn-link text-danger" data-bs-toggle="modal" data-bs-target="#tutorial">
                                        Luật chơi
                                    </button>
                                    <div class="modal fade" id="tutorial" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Luật chơi</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body text-start">
                                                    <div>Trò chơi này gồm 25 câu hỏi được xếp thành một hình vuông 5x5</div>

                                                    <div>Chọn một câu hỏi để trả lời</div>

                                                    <div>Mỗi câu trả lời đúng sẽ được 100 điểm, trả lời sai sẽ không nhận được điểm</div>

                                                    <div>Đối với mức độ khó:</div>
                                                    <div>Thời gian chơi game: 7 phút. </div>
                                                    <div>Nếu thắng vẫn còn thời gian thì bạn sẽ nhận được điểm thưởng. Điểm thưởng tương ứng là 10 điểm 1s</div>
                                                    <div>Đối với mức độ trung bình</div>
                                                    Thời gian chơi game: 9 phút.
                                                    Nếu thắng vẫn còn thời gian thì bạn sẽ nhận được điểm thưởng. Điểm thưởng tương ứng là 4 điểm 1s
                                                    <div>Đối với mức độ dễ</div>
                                                    Thời gian chơi game: 11 phút.
                                                    Nếu thắng vẫn còn thời gian thì bạn sẽ nhận được điểm thưởng. Điểm thưởng tương ứng là 2 điểm 1s
                                                    <div>Lưu ý: khi bạn trả lời xong 1 câu (dù đúng hay sai) cũng không thể xem lại câu hỏi đó. Vì vậy, hãy trả lời cho thật cẩn thận nha</div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </p>
                        </div>
                    </div>
                </div> : <BingoGame time={this.state.time} lessons={this.state.lessons} bonus={this.state.bonus} />}

            </>
        );
    }
}

export default BingoSetting;