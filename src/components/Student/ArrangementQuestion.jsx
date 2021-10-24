import React from "react";

export default function ArrangementQuestion({ record, index, onHandleResult }) {
  const onHandleChange = (e) => {
    let userAnswer = e.target.value.trim();
    let correctAnswer = record.answer;
    if (correctAnswer === userAnswer) {
      onHandleResult(record.id, true);
    } else {
      onHandleResult(record.id, false);
    }
  };
  return (
    <div id="question">
      <div class="card w-50 mt-4" style={{ margin: "auto" }}>
        <div class="card-header">{index}. Arrangement Question </div>
        <div class="card-body">
          <h5 class="card-title fw-bolder">{record.question}</h5>
          <p class="text-muted m-0">Đáp án của bạn</p>
          <div class="card-text mt-2">
            <input
              type="text"
              class="form-control"
              onChange={onHandleChange}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
