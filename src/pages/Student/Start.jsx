import React from "react";
import { useState, useEffect } from "react";
import {
  AwesomeButton,
} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";

export default function Start({ isStartedProps, setOptions, setLevel }) {
  const [numberOfQuestion, setNumberOfCard] = useState(null);
  const [lessonIds, setLessonIds] = useState([]);
  const [skillIds, setSkillIds] = useState([]);
  const typeIds = [5];
  const [validationMsg, setValidationMsg] = useState('');

  const onClickStart = (e) => {
    const isValid = validateAll();
    if (!isValid) return;
    isStartedProps(true);
    setOptions([{ typeIds, numberOfQuestion: numberOfQuestion / 2, lessonIds, skillIds }]);
  };

  const onHandleChangeLessonIds = (e) => {
    var { checked, value } = e.target;
    if (checked) {
      setLessonIds([...lessonIds, parseInt(value)]);
    } else {
      setLessonIds(lessonIds.filter((item) => item !== parseInt(value)));
    }
  }

  const onHandleChangeSkillIds = (e) => {
    var { checked, value } = e.target;
    if (checked) {
      setSkillIds([...skillIds, parseInt(value)]);
    } else {
      setSkillIds(skillIds.filter((item) => item !== parseInt(value)));
    }
  }

  const validateAll = () => {
    const msg = {};
    if (lessonIds.length == 0) {
      msg.lessonIds = "Vui lòng chọn ít nhất một bài học";
    }
    if (skillIds.length == 0) {
      msg.skillIds = "Bạn cần chọn ít nhất một kĩ năng";
    }
    if (numberOfQuestion === null) {
      msg.option = "Bạn cần chọn mức độ";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  }

  return (
    <div className="container mt-2" >
      <div class="card mx-auto text-center mb-3" role="start">
        <div class="card-body">
          <h4 class="card-title fw-bold">CHỌN ĐỘ KHÓ</h4>
          <p class="text-muted">Ở mỗi mức độ, số lượng thẻ sẽ thay đổi</p>
          <p class="text-danger mb-0">{validationMsg.option}</p>
          <div class="row row-cols-3">
            <div class="col my-1 setting-container">
              <input
                type="radio"
                name="radioCheck"
                class="d-none"
                id="radioEasy"
                onClick={() => { setNumberOfCard(12); setLevel(12); }}
              ></input>
              <label
                for="radioEasy"
                class="border border-dark w-100 h-100 rounded"
              >
                DỄ
                <h2>12</h2>
              </label>
            </div>
            <div class="col my-1 setting-container">
              <input
                type="radio"
                name="radioCheck"
                class="d-none"
                id="radioMedium"
                onClick={() => { setNumberOfCard(18); setLevel(18); }}
              ></input>
              <label
                for="radioMedium"
                class="border border-dark w-100 h-100 rounded"
              >
                THƯỜNG
                <h2>18</h2>
              </label>
            </div>

            <div class="col my-1 setting-container">
              <input
                type="radio"
                name="radioCheck"
                class="d-none"
                id="radioHard"
                onClick={() => { setNumberOfCard(24); setLevel(24) }}
              ></input>
              <label
                for="radioHard"
                class="border border-dark w-100 h-100 rounded"
              >
                KHÓ
                <h2>24</h2>
              </label>
            </div>
            <div className="col-md-6 mt-3">
              <h5 class="card-title fw-bold">CHỌN BÀI</h5>
              <p class="text-muted">Nội dung tương ứng của từng bài sẽ ở mặt sau của thẻ</p>
              <p class="text-danger mb-0">{validationMsg.lessonIds}</p>
              <div class="row row-cols-2">
                <div class="col">
                  <div class="cntr">
                    <input class="hidden-xs-up d-none" id="cbx1" value="1" type="checkbox" onChange={onHandleChangeLessonIds} />
                    <label class="cbx" for="cbx1"></label>
                    <label class="lbl" for="cbx1">Bài 1</label>
                  </div>
                  <div class="cntr">
                    <input class="hidden-xs-up d-none" id="cbx2" value="2" type="checkbox" onChange={onHandleChangeLessonIds} />
                    <label class="cbx" for="cbx2"></label>
                    <label class="lbl" for="cbx2">Bài 2</label>
                  </div>
                  <div class="cntr">
                    <input class="hidden-xs-up d-none" id="cbx3" value="3" type="checkbox" onChange={onHandleChangeLessonIds} />
                    <label class="cbx" for="cbx3"></label>
                    <label class="lbl" for="cbx3">Bài 3</label>
                  </div>
                  <div class="cntr">
                    <input class="hidden-xs-up d-none" id="cbx4" value="4" type="checkbox" onChange={onHandleChangeLessonIds} />
                    <label class="cbx" for="cbx4"></label>
                    <label class="lbl" for="cbx4">Bài 4</label>
                  </div>
                </div>
                <div class="col">
                  <div class="cntr">
                    <input class="hidden-xs-up d-none" id="cbx5" value="5" type="checkbox" onChange={onHandleChangeLessonIds} />
                    <label class="cbx" for="cbx5"></label>
                    <label class="lbl" for="cbx5">Bài 5</label>
                  </div>
                  <div class="cntr">
                    <input class="hidden-xs-up d-none" id="cbx6" value="6" type="checkbox" onChange={onHandleChangeLessonIds} />
                    <label class="cbx" for="cbx6"></label>
                    <label class="lbl" for="cbx6">Bài 6</label>
                  </div>
                  <div class="cntr">
                    <input class="hidden-xs-up d-none" id="cbx7" value="7" type="checkbox" onChange={onHandleChangeLessonIds} />
                    <label class="cbx" for="cbx7"></label>
                    <label class="lbl" for="cbx7">Bài 7</label>
                  </div>
                </div>
              </div>


            </div>
            <div className="col-md-6 mt-3">
              <h5 class="card-title fw-bold">CHỌN KĨ NĂNG</h5>
              <p class="text-muted">Bao gồm kĩ năng muốn củng cố</p>
              <p class="text-danger mb-0">{validationMsg.skillIds}</p>
              <div class="wrapper mx-auto" style={{ width: "20%" }}>
                <div class="cntr text-start mx-1">
                  <input class="hidden-xs-up d-none" id="cbxVocab" value="1" type="checkbox" onChange={onHandleChangeSkillIds} />
                  <label class="cbx" for="cbxVocab"></label>
                  <label class="lbl" for="cbxVocab">Từ vựng</label>
                </div>
                <div class="cntr text-start mx-1">
                  <input class="hidden-xs-up d-none" id="cbxGrammar" value="2" type="checkbox" onChange={onHandleChangeSkillIds} />
                  <label class="cbx" for="cbxGrammar"></label>
                  <label class="lbl" for="cbxGrammar">Ngữ pháp</label>
                </div>
                <div class="cntr text-start mx-1">
                  <input class="hidden-xs-up d-none" id="cbxKanji" value="3" type="checkbox" onChange={onHandleChangeSkillIds} />
                  <label class="cbx" for="cbxKanji"></label>
                  <label class="lbl" for="cbxKanji">Chữ hán</label>
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
            <AwesomeButton type="secondary" onPress={onClickStart}><span class="text-light">BẮT ĐẦU</span></AwesomeButton>
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
                      Ghi luật  đây nè
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </p>
        </div>
      </div>
    </div>
  );
}
