import React, { useState, useRef, useEffect } from 'react'
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
import noImage from "../../assets/img/noImage.png"
import SweetAlert from 'react-bootstrap-sweetalert';
import S3FileUpload from 'react-s3';
import S3Config from "../../services/S3Config.js";
export default function GrammarAddModal() {
    const history = useHistory();
    const [lessonName, setLessonName] = useState("");
    const [grammar, setGrammar] = useState("");
    const [explanation, setExplanation] = useState("");
    const [grammarMeaning, setGrammarMeaning] = useState("");
    const [example, setExample] = useState("");
    const [exampleImageLink, setExampleImageLink] = useState("");
    const [exampleMeaning, setExampleMeaning] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const inputImageFile = useRef(null);
    const [lessonList, setLessonList] = useState(["Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5", "Bài 6", "Bài 7"]);
    const [validationMsg, setValidationMsg] = useState('');
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const [resetSelect, setResetSelect] = useState(true);
    const [config, setConfig] = useState({});

    useEffect(() => {
        S3Config.getConfig().then((res) => {
            setConfig({
                bucketName: res.data[0].value,
                dirName: 'Avatar',
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
    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        let grammarAdd = {
            lessonName: lessonName,
            grammar: grammar,
            explanation: explanation,
            grammarMeaning: grammarMeaning,
            example: example,
            exampleImageLink: exampleImageLink,
            exampleMeaning: exampleMeaning,
        };
        const uploadImageSuccess = upload(imageUpload);
        if (uploadImageSuccess) {
            LessonServices.addGrammar(grammarAdd).then((response) => {
                if (response.status === 200) {
                    if (response.data.includes("thành công")) {
                        setMsgSuccessResponse(response.data);
                    } else if (response.data.includes("tồn tại")) {
                        setMsgErrorResponse(response.data);
                    }
                }
            })
                .catch((error) => {
                    setMsgErrorResponse(error);
                });
        } else {
            setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
        }
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageUpload(e.target.files[0]);
                setExampleImageLink(e.target.files[0].name);
                document.getElementById("imgAddGrammar").src = reader.result;
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const onChangeLesson = (e) => {
        let valueUser = e.target.value;
        setLessonName(valueUser);
        setResetSelect(true);
    }

    const onChangeGrammar = (e) => {
        let valueUser = e.target.value;
        setGrammar(valueUser);
    }

    const onChangeExplanation = (e) => {
        let valueUser = e.target.value;
        setExplanation(valueUser);
    }

    const onChangeGrammarMeaning = (e) => {
        let valueUser = e.target.value;
        setGrammarMeaning(valueUser);
    }

    const onChangeExample = (e) => {
        let valueUser = e.target.value;
        setExample(valueUser);
    }

    const onChangeExampleMeaning = (e) => {
        let valueUser = e.target.value;
        setExampleMeaning(valueUser);
    }

    const validateAll = () => {
        setValidationMsg('');
        const msg = {};
        if (lessonName.length === 0) {
            msg.lessonName = "Vui lòng chọn bài";
        }
        if (grammar.length === 0) {
            msg.grammar = "Không được để trống";
        }
        if (explanation.length === 0) {
            msg.explanation = "Không được để trống";
        }
        if (grammarMeaning.length === 0) {
            msg.grammarMeaning = "Không được để trống";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }
    const hideAlert = () => {
        setMsgSuccessResponse("");
        setMsgErrorResponse("");
        history.go(0);
    }
    const onReset = () => {
        setLessonName("");
        setGrammar("");
        setExample("");
        setExplanation("");
        setExampleImageLink("");
        setGrammarMeaning("");
        setExampleMeaning("");
        setValidationMsg('');
        setResetSelect(false);
        let itemSelect = document.querySelectorAll('select option');
        for (var i = 0; i < itemSelect.length; i++) {
            itemSelect[i].selected = itemSelect[i].defaultSelected;
        }
    }

    return (
        <>
            {/* add grammar */}
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Thêm ngữ pháp thành công!" timeout={2000} onConfirm={hideAlert}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Thêm ngữ pháp thất bại!" timeout={2000} onConfirm={hideAlert}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Thêm ngữ pháp
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" onSubmit={onSubmit}>
                                <div class="col-md-6">

                                    <label class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select class="form-select" onChange={onChangeLesson}>
                                        <option value="" selected disabled={resetSelect}>Chọn bài</option>
                                        {lessonList.map((lesson) => (
                                            <option value={lesson} selected>{lesson}</option>
                                        ))}
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.lessonName}</p>
                                </div>
                                <div class="col-md-12">

                                    <label class="form-label">Ngữ pháp<span class="text-danger">*</span></label>
                                    <input name="grammar" type="text" class="form-control" onChange={onChangeGrammar} />
                                    <p class="text-danger mb-0">{validationMsg.grammar}</p>
                                </div>
                                <div class="col-md-12">

                                    <label class="form-label">Giải thích ngữ pháp<span class="text-danger">*</span></label>
                                    <textarea type="text" class="form-control" onChange={onChangeExplanation} />
                                    <p class="text-danger mb-0">{validationMsg.explanation}</p>
                                </div>
                                <div class="col-md-12">

                                    <label class="form-label">Ý nghĩa<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" onChange={onChangeGrammarMeaning} />
                                    <p class="text-danger mb-0">{validationMsg.grammarMeaning}</p>
                                </div>

                                <div class="col-12">

                                    <label class="form-label">Ví dụ</label>
                                    <input type="text" class="form-control" onChange={onChangeExample} />

                                </div>
                                <div class="col-12">

                                    <label class="form-label">Nghĩa của ví dụ</label>
                                    <input type="text" class="form-control" onChange={onChangeExampleMeaning} />
                                </div>
                                <div class="col-8">
                                    <label for="inputImgLink" class="form-label">Hình ảnh</label>
                                    <input class="d-none" type="file" ref={inputImageFile} id="inputImgLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    <br />
                                    <input name="imageLink" value={exampleImageLink ? exampleImageLink : "Không có hình ảnh"} disabled />

                                </div>

                                <div class="col-4 text-center">
                                    <img src={exampleImageLink ? exampleImageLink : noImage} id="imgAddGrammar" class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                    <a href="javascript:void(0)" onClick={() => inputImageFile.current.click()}>Thay đổi</a>
                                    {exampleImageLink && <> <span class="text-muted px-1">  |  </span>
                                        <a href="javascript:void(0)" onClick={() => setExampleImageLink("")}>Xóa bỏ</a></>}
                                </div>
                                <div class="col-6"><button type="reset" class="btn btn-secondary w-100" onClick={onReset}>
                                    Làm mới
                                </button>
                                </div>
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
