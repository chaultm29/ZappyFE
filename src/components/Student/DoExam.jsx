import React, { useState, useEffect } from "react";
import QuestionServices from "../../services/QuestionServices.jsx";
import ArrangementQuestion from "./ArrangementQuestion.jsx";
import FillBlankQuestion from "./FillBlankQuestion.jsx";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.jsx";
import TrueFalseQuestion from "./TrueFalseQuestion.jsx";

export default function DoExam() {
  const [listQuestion, setListQuestion] = useState([
    { id: "", type: "", question: "", imgLink: "", option: [], answer: "" },
  ]);
  const [listResult, setListResult] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [numberOfCorrect, setNumberOfCorrect] = useState("");
  const [poportion, setPoportion] = useState("");
  const [point, setPoint] = useState("");

  const onHandleResult = (id, isCorrect) => {
    let result = { id, isCorrect };
    let listABC = listResult.filter((x) => x.id !== result.id);
    setListResult([...listABC, result]);
    console.log(listResult);
  };

  const calculatePoint = () => {
    let count = 0;
    let size = listQuestion.length;
    listResult.forEach((item) => {
      if (item.isCorrect) {
        count++;
      }
    });
    setNumberOfCorrect(count + " / " + size);
    setPoportion((count / size) * 100 + "%");
    setPoint((10 / size) * count + " / " + "10");
  };
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    QuestionServices.getListQuestion()
      .then((res) => {
        setListQuestion(
          res.data.map((item, index) => ({
            id: "Q" + index,
            type: item.type,
            question: item.question,
            imgLink: item.imgLink,
            option: shuffle([...item.incorrect_answers, item.correct_answer]),
            answer: item.correct_answer,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const onClickFinish = () => {
    setIsShow(true);
    calculatePoint();
  };

  const SwitchCase = (record, index) => {
    switch (record.type) {
      case "multiplechoice":
        return (
          <MultipleChoiceQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
          />
        );
      case "arrangement":
        return (
          <ArrangementQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
          />
        );
      case "truefalse":
        return (
          <TrueFalseQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
          />
        );
      case "fillblank":
        return (
          <FillBlankQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
          />
        );
    }
  };

  return (
    <>
      <div id="back-to-top"></div>
      {isShow && (
        <div class="alert alert-success text-center" role="alert">
          Số câu đúng : <span class="fw-bold">{numberOfCorrect}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tỉ lệ đúng :
          <span class="fw-bold"> {poportion}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Số điểm :
          <span class="fw-bold"> {point}</span>
        </div>
      )}
      <button
        class="btn btn-outline-secondary float-end me-5"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i class="fas fa-stream"></i>
      </button>
      <div class="container">
        <div
          class="offcanvas offcanvas-end"
          style={{ width: "15%" }}
          tabindex="-1"
          //data-bs-scroll="true"
          //data-bs-backdrop="false"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Danh sách câu hỏi</h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <a href="#question">Câu question</a>
          </div>
        </div>
        {listQuestion.map((item, index) => SwitchCase(item, index + 1))}

        <div class="w-50 " style={{ margin: "auto" }}>
          <a
            href="#back-to-top"
            class="btn btn-primary w-100 rounded-0 mt-4 mb-4"
            onClick={onClickFinish}
          >
            Xem kết quả
          </a>
        </div>
      </div>
    </>
  );
}
