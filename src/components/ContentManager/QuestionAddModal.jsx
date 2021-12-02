import React, { useState } from 'react'

import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
import S3FileUpload from 'react-s3';

export default function QuestionAddModal() {
    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const [typeName, setTypeName] = useState("");
    const [skill, setSkill] = useState("");
    const [lesson, setLesson] = useState("");
    const [question, setQuestion] = useState("");
    const [validationMsg, setValidationMsg] = useState('');

    const history = useHistory();


    const config = {
        bucketName: 'imgzappybucket',
        dirName: 'Avatar', /* optional */
        region: 'ap-southeast-1',
        accessKeyId: 'AKIAUTRYR6GNCV4DERUF',
        secretAccessKey: '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'
    }

    // questionDetail.answer
    const [answer, setAnswer] = useState([]);
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageUpload(e.target.files[0]);
                setImage(e.target.files[0].name);
                document.getElementById("img").src = reader.result;
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const upload = () => {
        S3FileUpload.uploadFile(imageUpload, config).then((data) => {
            console.log(data.location);
        }).catch((err) => {
            alert(err);
        })
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        let questionAdd = {
            typeName: typeName,
            lessonName: lesson,
            skillName: skill,
            question: question,
            answer: answer.map(({ id, ...items }) => items),
            imgeLink: image
        };
        upload();
        LessonServices.addQuestion(questionAdd).then((res) => {
            console.log(`res`, res);
        });
        // setTimeout(() => {
        //     history.go(0);
        // }, 1000);
    }


    const onChangeQuestionType = (e) => {
        let typeUser = e.target.value;
        setTypeName(typeUser);
        console.log(`type`, typeName)
    }

    const onChangeSkill = (e) => {
        let skillUser = e.target.value;
        setSkill(skillUser);
        console.log(`skill`, skill)
    }

    const onChangeLesson = (e) => {
        let lessonUser = e.target.value;
        setLesson(lessonUser);
        console.log(`lesson`, lesson)
    }

    const onChangeQuestion = (e) => {
        let questionUser = e.target.value;
        setQuestion(questionUser);
        console.log(`question`, question)
    }

    const onChangeAnswer = (e) => {
        let { id, name, value } = e.target;
        let userAnswer = { id: parseInt(id), correct: name === "true" ? true : false, image_link: "", answer: value.trim() }
        let listAnswer = answer.filter((x) => x.id !== userAnswer.id);
        setAnswer([...listAnswer, userAnswer]);
        console.log(`answer`, answer)
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
            {/* add question */}
            <div class="modal fade" id="ViewAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Thêm câu hỏi
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" method="post" onSubmit={onSubmit} autoComplete="none" >
                                <div class="col-8">
                                    <label class="form-label">Loại câu hỏi<span class="text-danger">*</span></label>
                                    <select class="form-select" onChange={onChangeQuestionType} autoComplete="none" >
                                        <option value="" selected disabled>Loại câu hỏi</option>
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

                                    <select id="inputSkill" class="form-select" onChange={onChangeSkill} autoComplete="none">
                                        <option value="" selected disabled>Kĩ năng</option>
                                        <option value="Từ vựng">Từ vựng</option>
                                        <option value="Ngữ pháp">Ngữ pháp</option>
                                        <option value="Chữ Hán">Chữ Hán</option>

                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.skill}</p>
                                </div>
                                <div class="col-6">
                                    <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select id="inputLesson" class="form-select" onChange={onChangeLesson} autoComplete="none">
                                        <option value="" selected disabled>Bài</option>
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
                                    <input name="question" type="text" class="form-control" onChange={onChangeQuestion} autoComplete="none" />
                                    <p class="text-danger mb-0">{validationMsg.question}</p>
                                </div>

                                {typeName === "Chọn đáp án đúng" &&
                                    <>

                                        <div class="col-12">
                                            <label class="form-label">1. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                            <input type="text" id="1" name="true" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">2. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                            <input type="text" id="2" name="false" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">3. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                            <input type="text" id="3" name="false" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">4. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                            <input type="text" id="4" name="false" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>

                                    </>
                                }
                                {typeName === "Đúng/Sai" &&
                                    <>
                                        <div class="col-12">
                                            <label class="form-label">1. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                            <input type="text" id="1" name="true" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">2. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                            <input type="text" id="2" name="false" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>
                                    </>
                                }
                                {typeName != "Chọn đáp án đúng" && typeName !== "Đúng/Sai" &&
                                    <>

                                        <div class="col-12">
                                            <label class="form-label">Đáp án<span class="text-danger">*</span></label>
                                            <input type="text" id="1" name="true" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                            <p class="text-danger mb-0">{validationMsg.answer}</p>
                                        </div>
                                    </>}


                                <div class="col-8">
                                    <label for="inputImageLink" class="form-label">Hình ảnh</label>
                                    <input class="form-control" type="file" id="inputImageLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                </div>
                                <div class="col-4">
                                    <img src={image} id="img" class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
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
        </>
    )
}
