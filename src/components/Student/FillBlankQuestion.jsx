import React, { useState } from "react";

export default function FillBlankQuestion({
  record,
  index,
  onHandleResult,
  isShow,
  listCorrectQuestion
}) {

  var isCorrect = listCorrectQuestion.includes(record.id);
  const onHandleChange = (e) => {
    let userAnswer = e.target.value.trim();
    onHandleResult(record.id, userAnswer);
  }

  return (
    <div id={"question" + index}>
      <div class="card w-100 mt-4">
        <div class={isShow && isCorrect ? "card-header bg-success text-white"
          : isShow && !isCorrect ? "card-header bg-danger text-white"
            : "card-header"}>{index}. Điền vào chỗ trống </div>
        <div class="card-body">
          <h5 class="card-title fw-bolder">{record.question}</h5>
          <p class="text-muted m-0">Đáp án của bạn</p>
          <div class="card-text mt-2">
            <input
              type="text"
              class={
                "form-control"
              }
              onChange={onHandleChange}
              disabled={isShow}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
