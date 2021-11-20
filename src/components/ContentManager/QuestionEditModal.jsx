import React, { useState } from 'react'

import LessonServices from '../../services/LessonServices';

export default function QuestionEditModal({ questionDetail }) {
    console.log(`questionDetail`, questionDetail.answer !== null)
    const [image, setImage] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [skill, setSkill] = useState("");
    const [lesson, setLesson] = useState("");
    const [question, setQuestion] = useState("");

    // questionDetail.answer
    const [rightAnswer, setRightAnswer] = useState("");
    const [wrongAnswer1, setWrongAnswer1] = useState("");
    const [wrongAnswer2, setWrongAnswer2] = useState("");
    const [wrongAnswer3, setWrongAnswer3] = useState("");
    const onSubmit = (e, data) => {
        e.preventDefault();
        console.log(`data`, data)
    }

    const onChangeQuestionType = (e) => {
        let typeUser = e.target.value;
        setQuestionType(typeUser);
        console.log(`questionType`, questionType);
    }

    const onChangeSkill = (e) => {
        let skillUser = e.target.value;
        setSkill(skillUser);
        console.log(`skill`, skill);
    }

    const onChangeLesson = (e) => {
        let lessonUser = e.target.value;
        setSkill(lessonUser);
        console.log(`lesson`, lesson);
    }

    const onChangeQuestion = (e) => {
        let questionUser = e.target.value;
        setQuestion(questionUser);
        console.log(`question`, question);
    }

    const onChangeRightAnswer = (e) => {
        let rightAnswerUser = e.target.value;
        setRightAnswer(rightAnswerUser);
        console.log(`rightAnswer`, rightAnswer);
    }

    const onChangeWrongAnswer1 = (e) => {
        let wrongAnswerUser1 = e.target.value;
        setWrongAnswer1(wrongAnswerUser1);
        console.log(`wrongAnswer1`, wrongAnswer1);
    }

    const onChangeWrongAnswer2 = (e) => {
        let wrongAnswerUser2 = e.target.value;
        setWrongAnswer2(wrongAnswerUser2);
        console.log(`wrongAnswer2`, wrongAnswer2);
    }

    const onChangeWrongAnswer3 = (e) => {
        let wrongAnswerUser3 = e.target.value;
        setWrongAnswer3(wrongAnswerUser3);
        console.log(`wrongAnswer3`, wrongAnswer3);
    }

    return (
        <>
            {/* edit question */}
            {questionDetail && <div class="modal fade" id="ViewEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Chỉnh sửa câu hỏi
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" onSubmit={onSubmit} >
                                <div class="col-8">
                                    <label class="form-label">Loại câu hỏi<span class="text-danger">*</span></label>
                                    <select class="form-select" onChange={onChangeQuestionType} >
                                        <option value="" selected disabled>{questionDetail.typeName}</option>
                                        <option value="Nhiều lựa chọn">Nhiều lựa chọn</option>
                                        <option value="Điền vào chỗ trống">Điền vào chỗ trống</option>
                                        <option value="Đúng/Sai">Đúng/Sai</option>
                                        <option value="Sắp xếp câu">Sắp xếp câu</option>
                                        <option value="Nối từ">Nối từ</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Kĩ năng<span class="text-danger">*</span></label>
                                    <select id="inputSkill" class="form-select" onChange={onChangeSkill}>
                                        <option value={questionDetail.skillName} selected disabled>{questionDetail.skillName}</option>
                                        <option value="Từ vựng">Từ vựng</option>
                                        <option value="Ngữ pháp">Ngữ pháp</option>
                                        <option value="Chữ Hán">Chữ Hán</option>
                                        <option value="Bảng chữ cái">Bảng chữ cái</option>

                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select id="inputLesson" class="form-select" onChange={onChangeLesson}>
                                        <option value="" selected disabled>{questionDetail.lessonName}</option>
                                        <option value="Bài 1">Bài 1</option>
                                        <option value="Bài 2">Bài 2</option>
                                        <option value="Bài 3">Bài 3</option>
                                        <option value="Bài 4">Bài 4</option>
                                        <option value="Bài 5">Bài 5</option>
                                        <option value="Bài 6">Bài 6</option>
                                        <option value="Bài 7">Bài 7</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Câu hỏi<span class="text-danger">*</span></label>
                                    <input name="question" type="text" class="form-control" value={questionDetail.question} onChange={onChangeQuestion} />

                                </div>

                                {questionDetail.typeName === "Nhiều lựa chọn" &&
                                    <>
                                        {questionDetail.answer.map((item, index) =>
                                            item.correct ?
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                                    <input type="text" name="answer" class="form-control" value={item.answer} disabled />
                                                </div>
                                                :
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                    <input type="text" name="answer" class="form-control" value={item.answer} disabled />
                                                </div>
                                        )}
                                    </>
                                }
                                {questionDetail.typeName === "Đúng/Sai" &&
                                    <>
                                        {questionDetail.answer.map((item, index) =>
                                            item.correct ?
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                                    <input type="text" name="answer" class="form-control" value={item.answer} disabled />
                                                </div>
                                                :
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                    <input type="text" name="answer" class="form-control" value={item.answer} disabled />
                                                </div>
                                        )}
                                    </>
                                }
                                {questionDetail.typeName !== "Nhiều lựa chọn" && questionDetail.typeName !== "Đúng/Sai" &&
                                    <>
                                        <div class="col-12">
                                            <label class="form-label">Đáp án<span class="text-danger">*</span></label>
                                            {/* <input type="text" name="answer" class="form-control" value={questionDetail.answer !== null ? questionDetail.answer[0].answer : ""} disabled /> */}
                                        </div>
                                    </>}

                                <div class="col-8">
                                    <label for="inputImageLink" class="form-label">Hình ảnh</label>
                                    <input class="form-control" type="file" id="inputImageLink" accept="image/jpeg, image/png, image/jpg" />
                                </div>
                                <div class="col-4">
                                    <img src={image} class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
                                </div>

                                <div class="col-6"><button type="reset" class="btn btn-secondary w-100">
                                    Làm mới
                                </button></div>
                                <div class="col-6">
                                    <button type="submit" class="btn btn-primary w-100">
                                        Lưu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            } </>
    )
}
