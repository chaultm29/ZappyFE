import React, { useState } from "react";
export default function MultipleChoiceQuestion({
  record,
  index,
  onHandleResult,
  isShow,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  // var correctAnswer = record.answer;

  const onChange = (e) => {
    // setUserAnswer(e.target.id);
    // let userAnswer2 = e.target.id;
    // if (correctAnswer === userAnswer2) {
    //   onHandleResult(record.id, true);
    // } else {
    //   onHandleResult(record.id, false);
    // }
  };

  return (
    <div>
      <div class="card w-50 mt-4" style={{ margin: "auto" }}>
        <div class="card-header">{index}. Nhiều lựa chọn</div>
        <div class="card-body">
          <div class="mh-100">
            <h5 class="card-title fw-bolder">{record.question}</h5>
            <p class="text-muted m-0">Chọn đáp án đúng</p>
          </div>
          <div class="card-text">
            <div class="row row-cols-2">
              {record.option.map((option) => (
                <div class="col">
                  <label
                    class=
                    // option === correctAnswer && isShow
                    //   ? "btn btn-outline-success bg-success bg-opacity-10 mt-2 w-100 text-start"
                    //   : option === u0serAnswer && isShow
                    //     ? "btn btn-outline-danger bg-danger bg-opacity-10 mt-2 w-100 text-start" :
                    "btn btn-outline-secondary mt-2 w-100 text-start"
                    onChange={onChange}
                  >
                    <input
                      type="radio"
                      name={"options" + index}
                      id={option.id}
                      disabled={isShow}
                    />{" "}
                    {option.answer}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
