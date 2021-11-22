import React, { useEffect, useState } from 'react'

import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";

export default function QuestionEditModal({ questionDetail }) {
    const [image, setImage] = useState("");
    const [typeName, setTypeName] = useState("");
    const [skill, setSkill] = useState("");
    const [lesson, setLesson] = useState("");
    const [question, setQuestion] = useState("");
    const history = useHistory();
    const [validationMsg, setValidationMsg] = useState('');

    // questionDetail.answer
    const [answer, setAnswer] = useState([]);
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
                setImage(e.target.files[0].name);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(() => {
        if (typeof (questionDetail) !== "undefined") {
            setTypeName(questionDetail.typeName);
            setSkill(questionDetail.skillName);
            setLesson(questionDetail.lessonName);
            setQuestion(questionDetail.question);
            setAnswer(questionDetail.answer);
            setImage(questionDetail.imgeLink);
        }
        return () => {
        }
    }, [questionDetail])

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        let questionUpdate = {
            questionID: questionDetail.questionID,
            typeName: typeName,
            lessonName: lesson,
            skillName: skill,
            question: question,
            answer: answer,
            imgeLink: image
        };
        LessonServices.editQuestion(questionUpdate, questionDetail.questionID);
        setTimeout(() => {
            history.go(0);
        }, 1000);

    }

    const onChangeQuestionType = (e) => {
        let typeUser = e.target.value;
        setTypeName(typeUser);
    }

    const onChangeSkill = (e) => {
        let skillUser = e.target.value;
        setSkill(skillUser);
    }

    const onChangeLesson = (e) => {
        let lessonUser = e.target.value;
        setLesson(lessonUser);
    }

    const onChangeQuestion = (e) => {
        let questionUser = e.target.value;
        setQuestion(questionUser);
    }

    const onChangeAnswer = (e) => {
        let { id, name, value } = e.target;
        let userAnswer = { id: parseInt(id), correct: name === "true" ? true : false, image_link: questionDetail.answer[0].image_link, answer: value }
        let listAnswer = answer.filter((x) => x.id !== userAnswer.id);
        setAnswer([...listAnswer, userAnswer]);
    }
    const validateAll = () => {
        const msg = {};
        if (typeName.length === 0) {
            msg.typeName = "Vui lòng chọn loại câu hỏi";
        }
        if (lesson.length === 0) {
            msg.lesson = "Vui lòng chọn bài";
        }
        if (skill.length === 0) {
            msg.skill = "Vui lòng chọn kĩ năng";
        }
        if (question.length === 0) {
            msg.question = "Không được để trống";
        }
        if (answer.length === 0) {
            msg.answer = "Không được để trống";
        } else if (typeName === "Chọn đáp án đúng" && answer.length !== 4) {
            msg.answer = "Không được để trống";
        } else if (typeName === "Đúng/Sai" && answer.length !== 2) {
            msg.answer = "Không được để trống";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
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
                            <form class="row g-3" method="post" onSubmit={onSubmit} autocomplete="off" >
                                <div class="col-8">
                                    <label class="form-label">Loại câu hỏi<span class="text-danger">*</span></label>
                                    <select class="form-select" name="typeName" onChange={onChangeQuestionType} value={typeName} autocomplete="off" disabled>
                                        <option value="Chọn đáp án đúng">Chọn đáp án đúng</option>
                                        <option value="Điền vào chỗ trống">Điền vào chỗ trống</option>
                                        <option value="Đúng/Sai">Đúng/Sai</option>
                                        <option value="Sắp xếp câu">Sắp xếp câu</option>
                                        <option value="Nối từ">Nối từ</option>
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.typeName}</p>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Kĩ năng<span class="text-danger">*</span></label>
                                    <select id="inputSkill" class="form-select" value={skill} onChange={onChangeSkill}>
                                        <option value="Từ vựng">Từ vựng</option>
                                        <option value="Ngữ pháp">Ngữ pháp</option>
                                        <option value="Chữ Hán">Chữ Hán</option>

                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.skill}</p>
                                </div>
                                <div class="col-6">
                                    <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select id="inputLesson" class="form-select" value={lesson} onChange={onChangeLesson}>
                                        <option value="Bài 1">Bài 1</option>
                                        <option value="Bài 2">Bài 2</option>
                                        <option value="Bài 3">Bài 3</option>
                                        <option value="Bài 4">Bài 4</option>
                                        <option value="Bài 5">Bài 5</option>
                                        <option value="Bài 6">Bài 6</option>
                                        <option value="Bài 7">Bài 7</option>
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.lesson}</p>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Câu hỏi<span class="text-danger">*</span></label>
                                    <input name="question" type="text" class="form-control" defaultValue={question} onChange={onChangeQuestion} />

                                </div>

                                {typeName === "Chọn đáp án đúng" &&
                                    <>
                                        {questionDetail.answer.map((item, index) =>
                                            item.correct ?
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" defaultValue={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                                :
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" defaultValue={item.answer} onChange={onChangeAnswer} />
                                                </div>

                                        )}
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>
                                    </>
                                }
                                {typeName === "Đúng/Sai" &&
                                    <>
                                        {questionDetail.answer.map((item, index) =>
                                            item.correct ?
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" defaultValue={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                                :
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" defaultValue={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                        )}
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>
                                    </>
                                }
                                {typeName !== "Chọn đáp án đúng" && typeName !== "Đúng/Sai" &&
                                    <>
                                        {typeof (questionDetail.answer) !== "undefined" ? questionDetail.answer.map((item, index) =>
                                            item.correct ?
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" defaultValue={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                                :
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" defaultValue={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                        ) : ""}
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>
                                    </>}

                                <div class="col-8">
                                    <label class="form-label">Hình ảnh</label>
                                    <input class="collapse collapse-horizontal" id="inputImgLink" class="form-control" type="file" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                </div>
                                <div class="col-4 text-center">
                                    <img src={image} class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                    <a data-bs-toggle="collapse" href="#inputImgLink" aria-expanded="false" aria-controls="inputImgLink">Thay đổi</a>
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
