import React, { useEffect, useState, useRef } from 'react'
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import S3Config from '../../services/S3Config';
import S3FileUpload from 'react-s3';
import noImage from "../../assets/img/noImage.png"

export default function QuestionEditModal({ questionDetail }) {
    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const [typeName, setTypeName] = useState("");
    const [skill, setSkill] = useState("");
    const [lesson, setLesson] = useState("");
    const [question, setQuestion] = useState("");
    const history = useHistory();
    const [validationMsg, setValidationMsg] = useState('');
    const [resetSelect, setResetSelect] = useState(true);
    const inputFile = useRef(null);
    const [lessonList, setLessonList] = useState(["Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5", "Bài 6", "Bài 7"]);
    const [skillList, setSkillList] = useState(["Từ vựng", "Ngữ pháp", "Chữ Hán"]);
    const [typeList, setTypeList] = useState(["Chọn đáp án đúng", "Điền vào chỗ trống", "Đúng/Sai", "Nối từ"])
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    // questionDetail.answer
    const [answer, setAnswer] = useState([]);
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
                document.getElementById("imgEditQuestion").src = reader.result;
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
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
        // let answers = answer.map((item) => { return { ...item, answer: item.answer.trim() }});
        if (!isValid) return;
        let questionUpdate = {
            questionID: questionDetail.questionID,
            typeName: typeName,
            lessonName: lesson,
            skillName: skill,
            question: question.trim(),
            answer: answer.map((item) => { return { ...item, answer: item.answer.trim() } }),
            imgeLink: image
        };
        const uploadImageSuccess = upload(imageUpload);
        if (uploadImageSuccess) {
            LessonServices.editQuestion(questionUpdate, questionDetail.questionID).then((response) => {
                if (response.status === 200) {
                    setMsgSuccessResponse("Sửa câu hỏi thành công");
                } else {
                    setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
                }
            })
                .catch((error) => {
                    setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
                });
        } else {
            setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
        }
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
        let { id, value } = e.target;
        const answers = answer.slice();
        answers.map((item) => {
            if (item.id == id) {
                item.answer = value;
            }
        })
        setAnswer(answers);
    }

    const validateAll = () => {
        const msg = {};
        const answers = answer.filter((x) => x.answer !== "");
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
            msg.answer = "Cần điền đầy đủ các đáp án";

        } else if (typeName === "Chọn đáp án đúng" && answers.length !== 4) {
            msg.answer = "Cần điền đầy đủ các đáp án";
        } else if (typeName === "Đúng/Sai" && answers.length !== 2) {
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
            {/* edit question */}
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Sửa câu hỏi thành công!" timeout={2000} onConfirm={hideAlertSuccess}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Sửa câu hỏi thất bại!" timeout={2000} onConfirm={hideAlertError}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
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
                                        {skillList.map((skill) => (
                                            <option value={skill}>{skill}</option>
                                        ))}
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.skill}</p>
                                </div>
                                <div class="col-6">
                                    <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select id="inputLesson" class="form-select" value={lesson} onChange={onChangeLesson}>
                                        {lessonList.map((lesson) => (
                                            <option value={lesson}>{lesson}</option>
                                        ))}
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.lesson}</p>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Câu hỏi<span class="text-danger">*</span></label>
                                    <input name="question" type="text" class="form-control" value={question} onChange={onChangeQuestion} />
                                    <p class="text-danger mb-0">{validationMsg.question}</p>
                                </div>

                                {typeName === "Chọn đáp án đúng" &&
                                    <>
                                        {questionDetail.answer.map((item, index) =>
                                            item.correct ?
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" value={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                                :
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" value={item.answer} onChange={onChangeAnswer} />
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
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" value={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                                :
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" value={item.answer} onChange={onChangeAnswer} />
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
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" value={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                                :
                                                <div class="col-12">
                                                    <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                    <input type="text" id={item.id} name={(item.correct).toString()} class="form-control" value={item.answer} onChange={onChangeAnswer} />
                                                </div>
                                        ) : ""}
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>
                                    </>}

                                <div class="col-7">
                                    <label class="form-label">Hình ảnh</label>
                                    <input type="text" class="form-control" value={image ? image : "Không có hình ảnh"} disabled />
                                    <input ref={inputFile} class="d-none" type="file" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                </div>
                                <div class="col-5 text-center">
                                    <img id="imgEditQuestion" src={image ? S3Config.baseURLImgForQuestion + image : noImage} class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                    <a href="javascript:void(0)" onClick={() => inputFile.current.click()}>Thay đổi</a>
                                    {image && <> <span class="text-muted px-1">  |  </span>
                                        <a href="javascript:void(0)" onClick={() => setImage("")}>Xóa bỏ</a></>}
                                </div>

                                <div class="col-6">
                                    <button class="btn btn-secondary w-100" type="button" data-bs-dismiss="modal" aria-label="Close">
                                        Không lưu thay đổi
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button type="submit" class="btn btn-primary w-100">
                                        Lưu thay đổi
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
