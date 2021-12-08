import React, { useState, useEffect, useRef } from "react";
import Timer from "../../pages/Student/Timer.jsx";
import { useHistory, useLocation } from "react-router-dom";
import ExamServices from "../../services/ExamServices.jsx";
import ArrangementQuestion from "./ArrangementQuestion.jsx";
import FillBlankQuestion from "./FillBlankQuestion.jsx";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.jsx";
import TrueFalseQuestion from "./TrueFalseQuestion.jsx";
import PracticeServices from "../../services/PracticeServices.jsx";

export default function DoExam({ options }) {
  const [listQuestion, setListQuestion] = useState([
    { id: "", type: "", question: "", imgLink: "", option: [], answer: "" },
  ]);
  const [listResult, setListResult] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [isPractice, setIsPractice] = useState(false);
  const [listCorrectQuestion, setListCorrectQuestion] = useState([]);
  const [listCorrectAnswer, setListCorrectAnswer] = useState([]);
  const history = useHistory();
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);


  const location = useLocation();
  const onHandleResult = (id, answer) => {
    let result = { id, answer };
    let list = listResult.filter((x) => x.id !== result.id);
    setListResult([...list, result]);
  };

  // const onHandlePracticeResult = (id, isCorrect) => {
  //   let result = { id, isCorrect };
  //   let list = [];
  //   list.push(result);
  //   setListPracticeResult(list);
  //   console.log(`listPracticeResult`, listPracticeResult);
  // }


  const onClickRefresh = () => {
    history.go(0);
  }

  useEffect(() => {
    ExamServices.getListQuestion(options[0])
      .then((res) => {
        setListQuestion(
          res.data.listQuestions.map((item, index) => ({
            id: item.questionID,
            type: item.typeName,
            question: item.question,
            imgLink: item.imgeLink,
            option: item.answer,
          }))
        );
        setMinutes(parseInt(res.data.time / 60));
        setSeconds(Math.ceil(res.data.time % 60));
      })
      .catch((err) => console.error(err));
  }, []);


  const onClickFinish = () => {
    let list = listResult;
    let listFilter = listQuestion.filter(({ id: id1 }) => !listResult.some(({ id: id2 }) => id2 === id1));
    listFilter.map((data) => {
      let result = { id: data.id, answer: "" };
      list.push(result);
    })
    setListResult(list);
    let userSubmit = { username: "", answerDTOs: listResult };
    if (location.pathname.includes("exam")) {
      ExamServices.getResult(userSubmit).then((res) => {
        if (res != null) {
          setListCorrectQuestion(res.data);
        } else {
          window.location.href = "/notfound"
        }
      })
    }
    if (location.pathname.includes("practice")) {
      PracticeServices.getResult(userSubmit).then((res) => {
        setListCorrectAnswer(res.data);
      })
      setIsPractice(true);
    }
    setIsShow(true);
  };
  const [numberOfCorrect, setNumberOfCorrect] = useState("");
  const [proportion, setProportion] = useState("")
  const [point, setPoint] = useState("");
  useEffect(() => {
    setNumberOfCorrect(isPractice ? listCorrectAnswer.numberOfCorrect + " / " + listCorrectAnswer.correct.length : listCorrectQuestion.length + " / " + listQuestion.length);
    setProportion(isPractice ? listCorrectAnswer.score + "%" : Math.round(((listCorrectQuestion.length / listQuestion.length) * 100)) + " % ");
    setPoint(isPractice ? listCorrectAnswer.score + " / 100" : Math.round(((listCorrectQuestion.length / listQuestion.length) * 100)) + " / 100");
    return () => {
    }
  }, [listCorrectAnswer, listCorrectQuestion])




  const SwitchCase = (record, index) => {
    switch (record.type) {
      case "Chọn đáp án đúng":
        return (
          <MultipleChoiceQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
            isShow={isShow}
            isPractice={isPractice}
            listCorrectQuestion={listCorrectQuestion}
            listCorrectAnswer={listCorrectAnswer}
          />
        );
      case "Sắp xếp câu":
        return (
          <ArrangementQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
            isShow={isShow}
            isPractice={isPractice}
            listCorrectQuestion={listCorrectQuestion}
            listCorrectAnswer={listCorrectAnswer}
          />
        );
      case "Đúng/Sai":
        return (
          <TrueFalseQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
            isShow={isShow}
            isPractice={isPractice}
            listCorrectQuestion={listCorrectQuestion}
            listCorrectAnswer={listCorrectAnswer}
          />
        );
      case "Điền vào chỗ trống":
        return (
          <FillBlankQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
            isShow={isShow}
            isPractice={isPractice}
            listCorrectQuestion={listCorrectQuestion}
            listCorrectAnswer={listCorrectAnswer}
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
          <span class="fw-bold"> {proportion}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Số điểm :
          <span class="fw-bold"> {point}</span>
        </div>
      )}
      <div class="container mx-auto" style={{ width: "98%", backgroundColor: "#fff", borderRadius: "15px " }}>
        <div class="row mt-2">
          <div class="col-9">
            {listQuestion.length > 0 ? listQuestion.map((item, index) => (
              SwitchCase(item, index + 1))) : "Không có dữ liệu"
            }
            <div class="w-50" style={{ margin: "auto" }}>
              {isShow ? <a
                class="btn w-100 mt-4 mb-4"
                onClick={onClickRefresh}
                style={{ backgroundColor: "#ec9d9d", color: "#fff" }}
              >
                Tạo bài kiểm tra mới
              </a> : <a
                href="#back-to-top"
                class="btn w-100 mt-4 mb-4"
                onClick={onClickFinish}
                style={{ backgroundColor: "#ec9d9d", color: "#fff" }}
              >
                Xem kết quả
              </a>}
            </div>
          </div>
          <div class="col-3">
            <div class="card bg-light mb-3 mt-4 sticky-top">
              <div class="card-header">Danh sách câu hỏi</div>
              <div class="card-body">
                <div class="row row-cols-5">
                  {listQuestion.map((item, index) => (
                    <div class=
                      {!isPractice && isShow ? (isShow && listCorrectQuestion.includes(item.id) ? "col px-1 btn btn-success text-white border border-white"
                        : !listCorrectQuestion.includes(item.id) ? "col px-1 btn btn-danger border border-white"
                          : "col px-1 btn btn-outline-secondary") :
                        "col px-1 btn btn-outline-secondary"}>
                      <a class="text-black" href={"#question" + (index + 1)}>{index + 1}</a>
                    </div>
                  ))}

                </div>
                <div class="w-100 text-center" style={{ margin: "auto" }}>
                  {isShow ? <a
                    class="btn btn-link w-100 mt-2 text-decoration-none"
                    onClick={onClickRefresh}
                    style={{ backgroundColor: "#ec9d9d", color: "#fff" }}
                  >
                    Tạo bài kiểm tra mới

                  </a> : <>
                    <Timer minutes={minutes} seconds={seconds}
                      setMinutes={setMinutes} setSeconds={setSeconds}
                      onTimeUp={onClickFinish} />
                    <a
                      href="#back-to-top"
                      class="btn btn-link w-100 mt-2 text-decoration-none"
                      onClick={onClickFinish}
                      style={{ backgroundColor: "#ec9d9d", color: "#fff" }}
                    >
                      Xem kết quả
                    </a></>}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
