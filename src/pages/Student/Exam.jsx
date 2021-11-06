import React, { useState } from "react";
import DoExam from "../../components/Student/DoExam";

export default function Exam() {
  const [typeIds, setTypeIds] = useState([]);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [lessonIds, setLessonIds] = useState([]);
  const [skillIds, setSkillIds] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [validationMsg, setValidationMsg] = useState('');

  const onHandleChangeNumberOfQuestion = (e) => {
    var { value } = e.target;
    setNumberOfQuestion(parseInt(value));
  }

  const onHandleChangeTypeIds = (e) => {
    var { checked, value } = e.target;
    if (checked) {
      setTypeIds([...typeIds, parseInt(value)]);
    } else {
      setTypeIds(typeIds.filter((item) => item !== parseInt(value)));
    }
  }
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
    if (typeIds.length == 0) {
      msg.typeIds = "Vui lòng chọn ít nhất một loại câu hỏi";
    }
    if (lessonIds.length == 0) {
      msg.lessonIds = "Vui lòng chọn ít nhất một bài học";
    }
    if (skillIds.length == 0) {
      msg.skillIds = "Vui lòng chọn ít nhất một kỹ năng";
    }
    if (numberOfQuestion == 0) {
      msg.numberOfQuestion = "Vui lòng chọn số lượng câu hỏi";
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  }


  const onClickStart = (e) => {
    const isValid = validateAll();
    if (!isValid) return;
    setIsStart(true);
  }

  return (
    <>
      {!isStart ? (
        <div class="container">
          <div class="card w-50 mx-auto">
            <div class="card-header">
              <h2>Kiểm tra</h2>
            </div>
            <div class="card-body">
              <h3 class="card-title">Tùy chọn</h3>
              <div class="options">
                <div class="row">
                  <div class="col-4">

                    <h5 class="mt-2">Loại câu hỏi</h5>
                    <p class="text-danger mb-0">{validationMsg.typeIds}</p>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="2" id="checkFillBlank" onChange={onHandleChangeTypeIds} />
                      <label class="form-check-label" for="checkFillBlank">
                        Điền vào chỗ trống
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="1" id="checkMultipleChoice" onChange={onHandleChangeTypeIds}
                      />
                      <label class="form-check-label" for="checkMultipleChoice">
                        Nhiều lựa chọn
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="3" id="checkTrueFalse" onChange={onHandleChangeTypeIds} />
                      <label class="form-check-label" for="checkTrueFalse">
                        Đúng/Sai
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="4" id="checkArrangement" onChange={onHandleChangeTypeIds} />
                      <label class="form-check-label" for="checkArrangement">
                        Sắp xếp câu
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="5" id="checkMatching" onChange={onHandleChangeTypeIds} />
                      <label class="form-check-label" for="checkMatching">
                        Nối từ
                      </label>
                    </div>

                    <h5 class="mt-2">Số lượng câu hỏi</h5>
                    <p class="text-danger mb-0">{validationMsg.numberOfQuestion}</p>
                    <select class="form-select" aria-label="Default select example" onChange={onHandleChangeNumberOfQuestion} required >
                      <option selected disabled hidden>
                        Số lượng câu hỏi
                      </option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                    </select>
                  </div>

                  <div class="col-4">
                    <h5 class="mt-2">Chọn bài</h5>
                    <p class="text-danger mb-0">{validationMsg.lessonIds}</p>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="1" id="bai1" onChange={onHandleChangeLessonIds} />
                      <label class="form-check-label" for="bai1">
                        Bài 1
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="2" id="bai2" onChange={onHandleChangeLessonIds} />
                      <label class="form-check-label" for="bai2">
                        Bài 2
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="3" id="bai3" onChange={onHandleChangeLessonIds} />
                      <label class="form-check-label" for="bai3">
                        Bài 3
                      </label>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="4" id="bai4" onChange={onHandleChangeLessonIds} />
                      <label class="form-check-label" for="bai4">
                        Bài 4
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="5" id="bai5" onChange={onHandleChangeLessonIds} />
                      <label class="form-check-label" for="bai5" >
                        Bài 5
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="6" id="bai6" onChange={onHandleChangeLessonIds} />
                      <label class="form-check-label" for="bai6">
                        Bài 6
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="7" id="bai7" onChange={onHandleChangeLessonIds} />
                      <label class="form-check-label" for="bai7">
                        Bài 7
                      </label>
                    </div>

                  </div>
                  <div class="col-4">
                    <h5 class="mt-2">Học phần</h5>
                    <p class="text-danger mb-0">{validationMsg.skillIds}</p>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="1" id="vocabulary" onChange={onHandleChangeSkillIds} />
                      <label class="form-check-label" for="vocabulary">
                        Từ vựng
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="2" id="grammar" onChange={onHandleChangeSkillIds} />
                      <label class="form-check-label" for="grammar">
                        Ngữ pháp
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="3" id="kanji" onChange={onHandleChangeSkillIds} />
                      <label class="form-check-label" for="kanji">
                        Chữ Hán
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="4" id="alphabet" onChange={onHandleChangeSkillIds} />
                      <label class="form-check-label" for="alphabet">
                        Bảng chữ cái
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" href="#" class="btn btn-primary mt-2 end-0" onClick={onClickStart}>
              Tạo bài kiểm tra mới
            </button>
          </div>
        </div>
      ) : (
        <DoExam
          options={[{ typeIds, numberOfQuestion, lessonIds, skillIds }]}
        />
      )
      }
    </>
  );
}
