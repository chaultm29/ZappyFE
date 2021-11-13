import React, { useState } from "react";
export default function MultipleChoiceQuestion({
  record,
  index,
  onHandleResult,
  isShow,
  listCorrectQuestion
}) {

  var isCorrect = listCorrectQuestion.includes(record.id);
  const onHandleChange = (e) => {
    let id = record.id;
    let value = e.target.value;
    onHandleResult(id, value);
  }

  return (
    <div id={"question" + index}>
      <div class="card w-100 mt-4">
        <div class={isShow && isCorrect ? "card-header bg-success text-white"
          : isShow && !isCorrect ? "card-header bg-danger text-white"
            : "card-header"}>{index}. Nhiều lựa chọn</div>
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
                    onChange={onHandleChange}
                  >
                    <input
                      type="radio"
                      name={"options" + index}
                      value={option.answer}
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
