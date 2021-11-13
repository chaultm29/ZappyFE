import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import Timer from "../../pages/Student/Timer.jsx";
import { useHistory } from "react-router-dom";
import ExamServices from "../../services/ExamServices.jsx";
import ArrangementQuestion from "./ArrangementQuestion.jsx";
import FillBlankQuestion from "./FillBlankQuestion.jsx";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.jsx";
import TrueFalseQuestion from "./TrueFalseQuestion.jsx";

export default function DoExam({ options }) {
  const [listQuestion, setListQuestion] = useState([
    { id: "", type: "", question: "", imgLink: "", option: [], answer: "" },
  ]);
  const [listResult, setListResult] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [listCorrectQuestion, setListCorrectQuestion] = useState([]);
  const [numberOfCorrect, setNumberOfCorrect] = useState("");
  const [poportion, setPoportion] = useState("");
  const [point, setPoint] = useState("");
  const history = useHistory();

  const onHandleResult = (id, answer) => {
    let result = { id, answer };
    let list = listResult.filter((x) => x.id !== result.id);
    setListResult([...list, result]);
  };

  const onClickRefresh = () => {
    history.go(0);
  }

  useEffect(() => {
    ExamServices.getListQuestion(options[0])
      .then((res) => {
        setListQuestion(
          res.data.map((item, index) => ({
            id: item.questionID,
            type: item.typeName,
            question: item.question,
            imgLink: item.imgLink,
            option: item.answer,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);


  const onClickFinish = () => {
    let userSubmit = { username: "", answerDTOs: listResult };
    let list = [];
    ExamServices.getResult(userSubmit).then((res) => {
      list = res.data;
      setListCorrectQuestion(list);
    })
    setIsShow(true);
    let size = listQuestion.length;
    let number = listCorrectQuestion.length;
    setNumberOfCorrect(number + " / " + size);
    setPoportion((number / size) * 100 + "%");
    setPoint((10 / size) * number + " / " + "10");
  };

  const SwitchCase = (record, index) => {
    switch (record.type) {
      case "Nhiều lựa chọn":
        return (
          <MultipleChoiceQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
            isShow={isShow}
            listCorrectQuestion={listCorrectQuestion}
          />
        );
      case "Sắp xếp câu":
        return (
          <ArrangementQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
            isShow={isShow}
            listCorrectQuestion={listCorrectQuestion}
          />
        );
      case "Đúng/Sai":
        return (
          <TrueFalseQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
            isShow={isShow}
            listCorrectQuestion={listCorrectQuestion}
          />
        );
      case "Điền vào chỗ trống":
        return (
          <FillBlankQuestion
            record={record}
            index={index}
            onHandleResult={onHandleResult}
            isShow={isShow}
            listCorrectQuestion={listCorrectQuestion}
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
      <div class="container mx-auto" style={{ width: "98%", backgroundColor: "#fff", borderRadius: "15px " }}>
        <div class="row mt-2">
          <div class="col-9">
            {listQuestion.map((item, index) => (
              SwitchCase(item, index + 1)))
            }
            <div class="w-50" style={{ margin: "auto" }}>
              {isShow ? <a
                href="#back-to-top"
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
                      {isShow && listCorrectQuestion.includes(item.id) ? "col px-1 btn btn-success text-white border border-white"
                        : isShow && !listCorrectQuestion.includes(item.id) ? "col px-1 btn btn-danger border border-white"
                          : "col px-1 btn btn-outline-secondary"}>
                      <a class="text-black" href={"#question" + (index + 1)}>{index + 1}</a>
                    </div>
                  ))}

                </div>
                <div class="w-100 text-center" style={{ margin: "auto" }}>
                  {isShow ? "" : <Timer initialMinute={0} initialSeconds={30} onTimeUp={onClickFinish} />}
                  <a
                    href="#back-to-top"
                    class="btn btn-link w-100"
                    onClick={onClickFinish}
                    style={{ backgroundColor: "#ec9d9d", color: "#fff" }}
                  >
                    Xem kết quả
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}
