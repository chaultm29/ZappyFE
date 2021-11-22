import React, { useState, useEffect } from "react";

export default function FillBlankQuestion({
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
    let value = e.target.value.trim();
    setUserAnswer(value);
    onHandleResult(record.id, value);
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
            : "card-header"}>{index}. Điền vào chỗ trống </div>
        <div class="card-body">
          <h5 class="card-title fw-bolder">{record.question}</h5>
          <div class="text-center">
            {record.imgLink ? <img src={record.imgLink} class="rounded" alt="..." width="400px" /> : ""}
          </div>
          <p class="text-muted m-0">Đáp án của bạn</p>
          <div class="card-text mt-2">
            <input
              type="text"
              class={
                isShow && isPractice && userAnswer.toLowerCase().trim() === correctAnswer ? "form-control border-success bg-success bg-opacity-10"
                  : isShow && isPractice && !isCorrect ? "form-control border-danger bg-danger bg-opacity-10" :
                    "form-control"
              }
              onChange={onHandleChange}
              disabled={isShow}
            ></input>
            {isShow && isPractice && !isCorrect && (
              <>
                {" "}
                <p class="text-muted mt-2 m-0">Đáp án đúng</p>
                <h5 class="mb-0 text-success"> {correctAnswer} </h5>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
