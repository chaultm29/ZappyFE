import React, { useState, useEffect } from "react";

export default function TrueFalseQuestion({
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
            : "card-header"}>{index}. Câu hỏi đúng sai</div>
        <div class="card-body">
          <div class="">
            <h5 class="card-title fw-bolder">{record.question}</h5>
            <p class="text-muted m-0 ">Chọn đáp án đúng</p>
          </div>
          <div class="card-text">
            <div class="row row-cols-2">
              {record.option.map((option) => (
                <div class="col">
                  <label class="btn btn-outline-secondary mt-2 w-100 text-start">
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
