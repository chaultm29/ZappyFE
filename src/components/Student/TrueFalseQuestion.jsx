import React from "react";

export default function TrueFalseQuestion({ record, index, onHandleResult }) {
  const onChange = (e) => {
    let userAnswer = e.target.id;
    let correctAnswer = record.answer;
    if (correctAnswer === userAnswer) {
      onHandleResult(record.id, true);
    } else {
      onHandleResult(record.id, false);
    }
  };
  return (
    <div>
      <div class="card w-50 mt-4" style={{ margin: "auto" }}>
        <div class="card-header">{index}. True False Question</div>
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
                      name="options"
                      id={option}
                      onChange={onChange}
                    />{" "}
                    {option}
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
