import React, { useState, useEffect, useRef } from "react";
import Timer from "../../pages/Student/Timer.jsx";
import { useHistory, useLocation } from "react-router-dom";
import ExamServices from "../../services/ExamServices.jsx";
import ArrangementQuestion from "./ArrangementQuestion.jsx";
import FillBlankQuestion from "./FillBlankQuestion.jsx";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.jsx";
import TrueFalseQuestion from "./TrueFalseQuestion.jsx";
import PracticeServices from "../../services/PracticeServices.jsx";
import UserServices from "../../services/UserServices.jsx";
import SweetAlert from 'react-bootstrap-sweetalert';

export default function DoExam({ options }) {
  const [listQuestion, setListQuestion] = useState([
    { id: "", type: "", question: "", imgLink: "", option: [], answer: "" },
  ]);
  const [listResult, setListResult] = useState([]);

  const [isShow, setIsShow] = useState(false);
  const [isPractice, setIsPractice] = useState(false);
  const [listCorrectQuestion, setListCorrectQuestion] = useState([]);
  const [listCorrectAnswer, setListCorrectAnswer] = useState([]);
  const [listCorrectQuestionIds, setListCorrectQuestionIds] = useState([]);
  const [hasAchievement, setHasAchievement] = useState([]);
  const history = useHistory();
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);


  const location = useLocation();
  const onHandleResult = (id, answer) => {
    let result = { id, answer };
    let list = listResult.filter((x) => x.id !== result.id || x.answer == "");
    if (answer !== "") {
      setListResult([...list, result]);
    } else {
      setListResult(list)
    }


  };


  const onClickRefresh = () => {
    history.go(0);
  }

  useEffect(() => {
    if (location.pathname.includes("exam")) {
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
    }
    if (location.pathname.includes("practice")) {
      PracticeServices.getListQuestion(options[0])
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
      setIsPractice(true);
    }
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
        setListCorrectQuestionIds(res.data.questionIds);
        console.log(`res`, res);
      })
      setIsPractice(true);
    }
    setTimeout(() => {
      UserServices.checkAchievement().then((res) => {
        setHasAchievement(res.data);
        // setHasAchievement([{ name: "Th??? s??n level", desciption: "?????t 5000 ??i???m (Lv9)" }])
      })
    }, 1000);
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
      case "Ch???n ????p ??n ????ng":
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
      case "S???p x???p c??u":
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
      case "????ng/Sai":
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
      case "??i???n v??o ch??? tr???ng":
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
  const hideAlert = () => {
    setHasAchievement([]);
  }

  return (
    <>
      <div class="alert-wrapper position-absolute" >
        {hasAchievement.length !== 0 ?
          <> {hasAchievement.map((item) => (
            < SweetAlert success title="Ch??c m???ng b???n ?????t ???????c th??nh t???u m???i!" onConfirm={hideAlert}>
              <h3> {item.name}</h3>
              <h4>{item.desciption}</h4>
            </SweetAlert >
          ))}
          </> : ""}
      </div>
      <div id="back-to-top"></div>
      {isShow && (
        <div class="alert alert-success text-center" role="alert">
          S??? c??u ????ng : <span class="fw-bold">{numberOfCorrect}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; T??? l??? ????ng :
          <span class="fw-bold"> {proportion}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; S??? ??i???m :
          <span class="fw-bold"> {point}</span>
        </div>
      )}
      <div class="container mx-auto" style={{ width: "98%", backgroundColor: "#fff", borderRadius: "15px " }}>
        <div class="row mt-2">
          <div class="col-9">
            {listQuestion.length > 0 ? listQuestion.map((item, index) => (
              SwitchCase(item, index + 1))) : "Kh??ng c?? d??? li???u"
            }
            <div class="w-50" style={{ margin: "auto" }}>
              {isShow ? <a
                class="btn w-100 mt-4 mb-4"
                onClick={onClickRefresh}
                style={{ backgroundColor: "#ec9d9d", color: "#fff" }}
              >
                T???o b??i ki???m tra m???i
              </a> : <a
                href="#back-to-top"
                class="btn w-100 mt-4 mb-4"
                onClick={onClickFinish}
                style={{ backgroundColor: "#ec9d9d", color: "#fff" }}
              >
                Xem k???t qu???
              </a>}
            </div>
          </div>
          <div class="col-3">
            <div class="card bg-light mb-3 mt-4 sticky-top">
              <div class="card-header">Danh s??ch c??u h???i</div>
              <div class="card-body">
                <div class="row row-cols-5">
                  {listQuestion.map((item, index) => (
                    <div class={!isPractice && isShow ?
                      (isShow && listCorrectQuestion.includes(item.id)
                        ? "col px-1 btn btn-success text-white border border-white"
                        : !listCorrectQuestion.includes(item.id)
                          ? "col px-1 btn btn-danger border border-white" : "col px-1 btn btn-outline-secondary")
                      : isPractice && isShow
                        ? (isShow && listCorrectQuestionIds.includes(item.id)
                          ? "col px-1 btn btn-success text-white border border-white"
                          : !listCorrectQuestionIds.includes(item.id)
                            ? "col px-1 btn btn-danger border border-white" : "col px-1 btn btn-outline-secondary")
                        : !isShow && listResult.map(a => a.id).includes(item.id)
                          ? "col px-1 btn btn-primary border border-white"
                          : "col px-1 btn btn-outline-secondary"}
                    >
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
                    T???o b??i ki???m tra m???i

                  </a> : <>
                    {!isPractice && <Timer minutes={minutes} seconds={seconds}
                      setMinutes={setMinutes} setSeconds={setSeconds}
                      onTimeUp={onClickFinish} />}
                    <a
                      href="#back-to-top"
                      class="btn btn-link w-100 mt-2 text-decoration-none"
                      onClick={onClickFinish}
                      style={{ backgroundColor: "#ec9d9d", color: "#fff" }}
                    >
                      Xem k???t qu???
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
