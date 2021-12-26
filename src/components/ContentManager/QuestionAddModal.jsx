import React, { useState, useEffect, useRef } from 'react'
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
import S3FileUpload from 'react-s3';
import noImage from "../../assets/img/noImage.png"
import SweetAlert from 'react-bootstrap-sweetalert';
import S3Config from '../../services/S3Config.js';

export default function QuestionAddModal() {
    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const [typeName, setTypeName] = useState("");
    const [skill, setSkill] = useState("");
    const [lesson, setLesson] = useState("");
    const [question, setQuestion] = useState("");
    // questionDetail.answer
    const [answer, setAnswer] = useState([]);
    const [validationMsg, setValidationMsg] = useState('');
    const [resetSelect, setResetSelect] = useState(true);
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const history = useHistory();
    const inputFile = useRef(null);


    const [config, setConfig] = useState({});
    useEffect(() => {
        S3Config.getConfig().then((res) => {
            setConfig({
                bucketName: res.data[0].value,
                dirName: 'ImgForQuestion',
                region: res.data[1].value,
                accessKeyId: res.data[2].value,
                secretAccessKey: res.data[3].value
            })
        });
    }, [])
    const upload = (file) => {
        const msg = {};
        S3FileUpload.uploadFile(file, config).then((data) => {
        }).catch((err) => {
            msg.err = err;
        })
        if (Object.keys(msg).length === 1) return false;
        return true;
    }
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageUpload(e.target.files[0]);
                setImage(e.target.files[0].name);
                document.getElementById("imgAddQuestion").src = reader.result;
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    const onReset = () => {
        setImage("");
        setImageUpload("");
        setTypeName("");
        setSkill("");
        setLesson("");
        setLesson("");
        setQuestion("");
        setAnswer([]);
        setValidationMsg('');
        setResetSelect(false);
        let lessonSelect = document.querySelectorAll('select option');
        for (var i = 0; i < lessonSelect.length; i++) {
            lessonSelect[i].selected = lessonSelect[i].defaultSelected;
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        let questionAdd = {
            typeName: typeName,
            lessonName: lesson,
            skillName: skill,
            question: question,
            answer: answer.map(({ id, ...items }) => items),
            imgeLink: image
        };
        const uploadImageSuccess = upload(imageUpload);
        if (uploadImageSuccess) {
            LessonServices.addQuestion(questionAdd).then((response) => {
                if (response.status === 200) {
                    if (response.data.includes("thành công")) {
                        setMsgSuccessResponse(response.data);
                    } else if (response.data.includes("tồn tại")) {
                        setMsgErrorResponse(response.data);
                    }
                } else {
                    setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
                }
            }).catch((error) => {
                setMsgErrorResponse(error);
            });
        } else {
            setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
        }
    };

    const onChangeQuestionType = (e) => {
        let typeUser = e.target.value;
        setTypeName(typeUser);
        setResetSelect(true);

    }

    const onChangeSkill = (e) => {
        let skillUser = e.target.value;
        setSkill(skillUser);
        setResetSelect(true);
    }
    const onChangeLesson = (e) => {
        let lessonUser = e.target.value;
        setLesson(lessonUser);
        setResetSelect(true);
    }

    const onChangeQuestion = (e) => {
        let questionUser = e.target.value.trim();
        setQuestion(questionUser);
    }

    const onChangeAnswer = (e) => {
        let { id, name, value } = e.target;
        let userAnswer = { id: parseInt(id), correct: name === "true" ? true : false, image_link: "", answer: value.trim() }
        let listAnswer = answer.filter((x) => x.id !== userAnswer.id || x.answer === "");
        if (value !== "") {
            setAnswer([...listAnswer, userAnswer]);
        }
        else {
            setAnswer(listAnswer);
        }
    }

    const validateAll = () => {
        setValidationMsg('');
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
        if (question.trim().length === 0) {
            msg.question = "Không được để trống";
        }
        if (answer.length === 0) {
            msg.answer = "Cần điền đầy đủ các đáp án";
        } else if (typeName === "Chọn đáp án đúng" && answer.length !== 4) {
            msg.answer = "Cần điền đầy đủ các đáp án";
        } else if (typeName === "Đúng/Sai" && answer.length !== 2) {
            msg.answer = "Cần điền đầy đủ các đáp án";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }
    const hideAlertSuccess = () => {
        setMsgSuccessResponse("");
        setMsgErrorResponse("");
        history.go(0);
    }
    const hideAlertError = () => {
        setMsgErrorResponse("");
    }
    return (
        <>
            {/* add question */}
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Thêm câu hỏi thành công!" timeout={2000} onConfirm={hideAlertSuccess}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Thêm câu hỏi thất bại!" timeout={2000} onConfirm={hideAlertError}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
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
                                    <select class="form-select" onChange={onChangeQuestionType} id="lesson" autoComplete="none" >
                                        <option value="" selected disabled={resetSelect}>Loại câu hỏi</option>
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
                                        <option value="" selected disabled={resetSelect}>Kĩ năng</option>
                                        <option value="Từ vựng">Từ vựng</option>
                                        <option value="Ngữ pháp">Ngữ pháp</option>
                                        <option value="Chữ Hán">Chữ Hán</option>

                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.skill}</p>
                                </div>
                                <div class="col-6">
                                    <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select id="inputLesson" class="form-select" onChange={onChangeLesson} autoComplete="none">
                                        <option value="" selected disabled={resetSelect}>Bài</option>
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

                                        </div>
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>
                                    </>}


                                <div class="col-8">
                                    <label for="inputImageLink" class="form-label">Hình ảnh</label>
                                    <input class="d-none" type="file" ref={inputFile} id="inputImageLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    <br />
                                    <input name="imageLink" value={image ? image : "Không có hình ảnh"} disabled />

                                </div>
                                <div class="col-4 text-center">
                                    <img src={image ? image : noImage} id="imgAddQuestion" class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                    <a href="javascript:void(0)" onClick={() => inputFile.current.click()}>Thay đổi</a>
                                    {image && <> <span class="text-muted px-1">  |  </span>
                                        <a href="javascript:void(0)" onClick={() => setImage("")}>Xóa bỏ</a></>}
                                </div>

                                <div class="col-6">
                                    <button type="reset" class="btn btn-secondary w-100" onClick={onReset}>
                                        Làm mới
                                    </button></div>
                                <div class="col-6">
                                    <button type="button" onClick={() => { if (!validateAll()) return; else document.getElementById("btn-save-hide-add-question").click() }} class="btn btn-primary w-100">
                                        Thêm mới
                                    </button>
                                    <button type="button" class="d-none" id="btn-save-hide-add-question" data-bs-toggle="modal" data-bs-target="#ViewConfirmAddModal"></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ViewConfirmAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Xác nhận thêm câu hỏi
                            </h5>
                            <button
                                id="close-modal"
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc muốn thêm câu hỏi này chứ ?
                        </div>
                        <div class="modal-footer border-0">
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#ViewAddModal"
                            >
                                Không
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                onClick={onSubmit}
                            >
                                Có
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
