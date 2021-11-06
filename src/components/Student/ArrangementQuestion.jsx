import React, { useState } from "react";

export default function ArrangementQuestion({
  record,
  index,
  onHandleResult,
  isShow,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  var correctAnswer = record.answer;
  const onHandleChange = (e) => {
    setUserAnswer(e.target.value.trim());
    let userAnswer2 = e.target.value.trim();
    if (correctAnswer === userAnswer2) {
      onHandleResult(record.id, true);
    } else {
      onHandleResult(record.id, false);
    }
  };
  return (
    <div id="question">
      <div class="card w-50 mt-4" style={{ margin: "auto" }}>
        <div class="card-header">{index}. Sắp xếp câu </div>
        <div class="card-body">
          <h5 class="card-title fw-bolder">{record.question}</h5>
          <p class="text-muted m-0">Đáp án của bạn</p>
          <div class="card-text mt-2">
            <input
              type="text"
              class=
              // userAnswer === correctAnswer && isShow
              //   ? "form-control border-success bg-success bg-opacity-10"
              //   : userAnswer !== correctAnswer && isShow
              //   ? "form-control border-danger bg-danger bg-opacity-10" :
              "form-control"
              onChange={onHandleChange}
              disabled={isShow}
            ></input>
            {/* {isShow && (
              <>
                {" "}
                <p class="text-muted mt-2 m-0">Đáp án đúng</p>
                <h5 class="mb-0"> {record.answer} </h5>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
