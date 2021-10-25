import React, { useState } from "react";
import DoExam from "../../components/Student/DoExam";

export default function Exam() {
  const [questionType, setQuestionType] = useState([]);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [isStart, setIsStart] = useState(false);

  const onHandleChange = (e) => {
    var { name, checked, value } = e.target;
    setNumberOfQuestion(value);
    if (checked) {
      setQuestionType([...questionType, name]);
    } else {
      setQuestionType(questionType.filter((question) => question !== name));
    }
  };

  return (
    <>
      {!isStart ? (
        <div class="container">
          <div class="card">
            <div class="card-header">
              <h2>Kiểm tra</h2>
            </div>
            <div class="card-body">
              <h3 class="card-title">Tùy chọn</h3>
              <div class="mb-2">
                <div class="form-check">
                  <input
                    name="fillblank"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkFillBlank"
                    onChange={onHandleChange}
                  />
                  <label class="form-check-label" for="checkFillBlank">
                    Điền vào chỗ trống
                  </label>
                </div>
                <div class="form-check">
                  <input
                    name="multiplechoice"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkMultipleChoice"
                    onChange={onHandleChange}
                  />
                  <label class="form-check-label" for="checkMultipleChoice">
                    Nhiều lựa chọn
                  </label>
                </div>
                <div class="form-check">
                  <input
                    name="truefalse"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkTrueFalse"
                    onChange={onHandleChange}
                  />
                  <label class="form-check-label" for="checkTrueFalse">
                    Đúng/Sai
                  </label>
                </div>
                <div class="form-check">
                  <input
                    name="arrangement"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkArrangement"
                    onChange={onHandleChange}
                  />
                  <label class="form-check-label" for="checkArrangement">
                    Sắp xếp câu
                  </label>
                </div>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={onHandleChange}
                  required
                >
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
                <button
                  type="button"
                  href="#"
                  class="btn btn-primary mt-2 end-0"
                  onClick={() => setIsStart(true)}
                >
                  Tạo bài kiểm tra mới
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DoExam
          questionType={questionType}
          numberOfQuestion={numberOfQuestion}
        />
      )}
    </>
  );
}
