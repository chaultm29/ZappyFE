import React, { useState, useEffect } from "react";

export default function TrueFalseQuestion({
  record,
  index,
  onHandleResult,
  isShow,
  listCorrectQuestion,
  isPractice,
  listCorrectAnswer
}) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  const onHandleChange = (e) => {
    let id = record.id;
    let value = e.target.value;
    setUserAnswer(e.target.value);
    onHandleResult(id, value);
  }



  useEffect(() => {
    if (!isPractice && isShow) {
      setIsCorrect(listCorrectQuestion.includes(record.id));
    }
    return () => {
    }
  }, [listCorrectQuestion])
  useEffect(() => {
    if (isPractice && isShow) {
      listCorrectAnswer.correct.map((answer) => {
        if (answer.id === record.id && answer.answer === userAnswer) {
          setIsCorrect(true);
          setCorrectAnswer(answer.answer);
        }
        if (answer.id === record.id) {
          setCorrectAnswer(answer.answer);
        }
      })
    }
    return () => {
    }
  }, [listCorrectAnswer])
  return (
    <div id={"question" + index}>
      <div class="card w-100 mt-4">
        <div class={isShow && isCorrect ? "card-header bg-success text-white"
          : isShow && !isCorrect ? "card-header bg-danger text-white"
            : "card-header"}>{index}. Câu hỏi đúng sai</div>
        <div class="card-body">
          <div class="">
            <h5 class="card-title fw-bolder">{record.question}</h5>
            {record.imgLink ? <img src={record.imgLink} class="rounded" alt="..." width="400px" /> : ""}
            <p class="text-muted m-0 ">Chọn đáp án đúng</p>
          </div>
          <div class="card-text">
            <div class="row row-cols-2">
              {record.option.map((option) => (
                <div class="col">
                  <label
                    class={isShow && isPractice && option.answer === correctAnswer ? "btn btn-outline-success bg-success bg-opacity-10 mt-2 w-100 text-start" :
                      isShow && isPractice && !isCorrect && option.answer === userAnswer ? "btn btn-outline-danger bg-danger bg-opacity-10 mt-2 w-100 text-start" :
                        "btn btn-outline-secondary mt-2 w-100 text-start"}>
                    <input
                      type="radio"
                      name={"options" + index}
                      onChange={onHandleChange}
                      disabled={isShow}
                      value={option.answer}
                    />{" "}
                    {option.answer}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
