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
                    if (response.data.includes("th??nh c??ng")) {
                        setMsgSuccessResponse(response.data);
                    } else if (response.data.includes("t???n t???i")) {
                        setMsgErrorResponse(response.data);
                    }
                } else {
                    setMsgErrorResponse("???? c?? l???i x???y ra, vui l??ng th??? l???i");
                }
            }).catch((error) => {
                setMsgErrorResponse(error);
            });
        } else {
            setMsgErrorResponse("???? c?? l???i x???y ra, vui l??ng th??? l???i");
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
            msg.typeName = "Vui l??ng ch???n lo???i c??u h???i";
        }
        if (lesson.length === 0) {
            msg.lesson = "Vui l??ng ch???n b??i";
        }
        if (skill.length === 0) {
            msg.skill = "Vui l??ng ch???n k?? n??ng";
        }
        if (question.trim().length === 0) {
            msg.question = "Kh??ng ???????c ????? tr???ng";
        }
        if (answer.length === 0) {
            msg.answer = "C???n ??i???n ?????y ????? c??c ????p ??n";
        } else if (typeName === "Ch???n ????p ??n ????ng" && answer.length !== 4) {
            msg.answer = "C???n ??i???n ?????y ????? c??c ????p ??n";
        } else if (typeName === "????ng/Sai" && answer.length !== 2) {
            msg.answer = "C???n ??i???n ?????y ????? c??c ????p ??n";
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
                    < SweetAlert success title="Th??m c??u h???i th??nh c??ng!" timeout={2000} onConfirm={hideAlertSuccess}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Th??m c??u h???i th???t b???i!" timeout={2000} onConfirm={hideAlertError}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Th??m c??u h???i
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" method="post" onSubmit={onSubmit} autoComplete="none" >
                                <div class="col-8">
                                    <label class="form-label">Lo???i c??u h???i<span class="text-danger">*</span></label>
                                    <select class="form-select" onChange={onChangeQuestionType} id="lesson" autoComplete="none" >
                                        <option value="" selected disabled={resetSelect}>Lo???i c??u h???i</option>
                                        <option value="Ch???n ????p ??n ????ng">Ch???n ????p ??n ????ng</option>
                                        <option value="??i???n v??o ch??? tr???ng">??i???n v??o ch??? tr???ng</option>
                                        <option value="????ng/Sai">????ng/Sai</option>
                                        <option value="S???p x???p c??u">S???p x???p c??u</option>
                                        <option value="N???i t???">N???i t???</option>
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.typeName}</p>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">K?? n??ng<span class="text-danger">*</span></label>

                                    <select id="inputSkill" class="form-select" onChange={onChangeSkill} autoComplete="none">
                                        <option value="" selected disabled={resetSelect}>K?? n??ng</option>
                                        <option value="T??? v???ng">T??? v???ng</option>
                                        <option value="Ng??? ph??p">Ng??? ph??p</option>
                                        <option value="Ch??? H??n">Ch??? H??n</option>

                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.skill}</p>
                                </div>
                                <div class="col-6">
                                    <label for="inputLesson" class="form-label">B??i<span class="text-danger">*</span></label>
                                    <select id="inputLesson" class="form-select" onChange={onChangeLesson} autoComplete="none">
                                        <option value="" selected disabled={resetSelect}>B??i</option>
                                        <option value="B??i 1">B??i 1</option>
                                        <option value="B??i 2">B??i 2</option>
                                        <option value="B??i 3">B??i 3</option>
                                        <option value="B??i 4">B??i 4</option>
                                        <option value="B??i 5">B??i 5</option>
                                        <option value="B??i 6">B??i 6</option>
                                        <option value="B??i 7">B??i 7</option>
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.lesson}</p>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">C??u h???i<span class="text-danger">*</span></label>
                                    <input name="question" type="text" class="form-control" onChange={onChangeQuestion} autoComplete="none" />
                                    <p class="text-danger mb-0">{validationMsg.question}</p>
                                </div>

                                {typeName === "Ch???n ????p ??n ????ng" &&
                                    <>

                                        <div class="col-12">
                                            <label class="form-label">1. ????p ??n<span class="text-success"> ????ng</span><span class="text-danger">*</span></label>
                                            <input type="text" id="1" name="true" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">2. ????p ??n <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                            <input type="text" id="2" name="false" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">3. ????p ??n <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                            <input type="text" id="3" name="false" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">4. ????p ??n <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                            <input type="text" id="4" name="false" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>

                                    </>
                                }
                                {typeName === "????ng/Sai" &&
                                    <>
                                        <div class="col-12">
                                            <label class="form-label">1. ????p ??n<span class="text-success"> ????ng</span><span class="text-danger">*</span></label>
                                            <input type="text" id="1" name="true" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">2. ????p ??n <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                            <input type="text" id="2" name="false" class="form-control" onChange={onChangeAnswer} autoComplete="none" />
                                        </div>
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>
                                    </>
                                }
                                {typeName != "Ch???n ????p ??n ????ng" && typeName !== "????ng/Sai" &&
                                    <>

                                        <div class="col-12">
                                            <label class="form-label">????p ??n<span class="text-danger">*</span></label>
                                            <input type="text" id="1" name="true" class="form-control" onChange={onChangeAnswer} autoComplete="none" />

                                        </div>
                                        <p class="text-danger mb-0">{validationMsg.answer}</p>
                                    </>}


                                <div class="col-8">
                                    <label for="inputImageLink" class="form-label">H??nh ???nh</label>
                                    <input class="d-none" type="file" ref={inputFile} id="inputImageLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    <br />
                                    <input name="imageLink" value={image ? image : "Kh??ng c?? h??nh ???nh"} disabled />

                                </div>
                                <div class="col-4 text-center">
                                    <img src={image ? image : noImage} id="imgAddQuestion" class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                    <a href="javascript:void(0)" onClick={() => inputFile.current.click()}>Thay ?????i</a>
                                    {image && <> <span class="text-muted px-1">  |  </span>
                                        <a href="javascript:void(0)" onClick={() => setImage("")}>X??a b???</a></>}
                                </div>

                                <div class="col-6">
                                    <button type="reset" class="btn btn-secondary w-100" onClick={onReset}>
                                        L??m m???i
                                    </button></div>
                                <div class="col-6">
                                    <button type="button" onClick={() => { if (!validateAll()) return; else document.getElementById("btn-save-hide-add-question").click() }} class="btn btn-primary w-100">
                                        Th??m m???i
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
                                X??c nh???n th??m c??u h???i
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
                            B???n c?? ch???c mu???n th??m c??u h???i n??y ch??? ?
                        </div>
                        <div class="modal-footer border-0">
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#ViewAddModal"
                            >
                                Kh??ng
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                onClick={onSubmit}
                            >
                                C??
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
