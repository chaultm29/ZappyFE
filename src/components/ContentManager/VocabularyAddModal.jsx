import React, { useState, useEffect, useRef } from 'react'
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
import noImage from "../../assets/img/noImage.png"
import SweetAlert from 'react-bootstrap-sweetalert';
import S3Config from '../../services/S3Config';
import S3FileUpload from 'react-s3';
export default function VocabularyAddModal() {

    const history = useHistory();
    const inputFile = useRef(null);
    const [lessonName, setLessonName] = useState("");
    const [vocabulary, setVocabulary] = useState("");
    const [meaning, setMeaning] = useState("");
    const [example, setExample] = useState("");
    const [exampleMeaning, setExampleMeaning] = useState("");
    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const [validationMsg, setValidationMsg] = useState('');
    const [resetSelect, setResetSelect] = useState(true);
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const [lessonList, setLessonList] = useState(["Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5", "Bài 6", "Bài 7"]);

    const [config, setConfig] = useState({});

    useEffect(() => {
        S3Config.getConfig().then((res) => {
            setConfig({
                bucketName: res.data[0].value,
                dirName: 'ImgForVocab',
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
        let vocabAdd = {
            lessonName: lessonName,
            vocabulary: vocabulary,
            meaning: meaning,
            imageLink: image,
            example: example,
            exampleMeaning: exampleMeaning,
        };
        const uploadImageSuccess = upload(imageUpload);
        if (uploadImageSuccess) {
            LessonServices.addVocabulary(vocabAdd).then((response) => {
                if (response.status === 200) {
                    if (response.data.includes("thành công")) {
                        setMsgSuccessResponse(response.data);
                    } else if (response.data.includes("tồn tại")) {
                        setMsgErrorResponse(response.data);
                    }
                } else {
                    setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
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
                setImage(e.target.files[0].name);
                document.getElementById("imgAdd").src = reader.result;
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onChangeLesson = (e) => {
        let inputUser = e.target.value;
        setLessonName(inputUser);
        setResetSelect(true);
    }
    const onChangeVocabulary = (e) => {
        let inputUser = e.target.value.trim();
        setVocabulary(inputUser);
    }
    const onChangeMeaning = (e) => {
        let inputUser = e.target.value.trim();
        setMeaning(inputUser);
    }
    const onChangeExample = (e) => {
        let inputUser = e.target.value.trim();
        setExample(inputUser);
    }
    const onChangeExampleMeaning = (e) => {
        let inputUser = e.target.value.trim();
        setExampleMeaning(inputUser);
    }
    const validateAll = () => {
        const msg = {};
        if (lessonName.length === 0) {
            msg.lessonName = "Vui lòng chọn bài";
        }
        if (vocabulary.trim().length === 0) {
            msg.vocabulary = "Không được để trống";
        }
        if (meaning.trim().length === 0) {
            msg.meaning = "Không được để trống";
        } if (example.trim().length === 0) {
            msg.example = "Không được để trống";
        }
        if (exampleMeaning.trim().length === 0) {
            msg.exampleMeaning = "Không được để trống";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }
    const onReset = () => {
        setLessonName("");
        setVocabulary("");
        setExample("");
        setExampleMeaning("");
        setImage("");
        setMeaning("");
        setValidationMsg('');
        setResetSelect(false);
        let lessonSelect = document.querySelectorAll('select option');
        for (var i = 0; i < lessonSelect.length; i++) {
            lessonSelect[i].selected = lessonSelect[i].defaultSelected;
        }
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
            {/* add vocab */}
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Thêm từ vựng thành công!" timeout={2000} onConfirm={hideAlertSuccess}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Thêm từ vựng thất bại!" timeout={2000} onConfirm={hideAlertError}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Thêm từ vựng
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" onSubmit={onSubmit} autoComplete="off" autoComplete="new-password">
                                <div class="col-md-4">
                                    <label class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select class="form-select" onChange={onChangeLesson}>
                                        <option value="" disabled={resetSelect} selected>Chọn bài</option>
                                        {lessonList.map((lesson) => (
                                            <option value={lesson}>{lesson}</option>
                                        ))}
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.lessonName}</p>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Từ vựng<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" onChange={onChangeVocabulary} autoComplete="new-password" />
                                    <p class="text-danger mb-0">{validationMsg.vocabulary}</p>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Nghĩa<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" onChange={onChangeMeaning} />
                                    <p class="text-danger mb-0">{validationMsg.meaning}</p>
                                </div>

                                <div class="col-md-12">
                                    <label class="form-label">Ví dụ<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" onChange={onChangeExample} />
                                    <p class="text-danger mb-0">{validationMsg.example}</p>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Giải thích ví dụ<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" onChange={onChangeExampleMeaning} />
                                    <p class="text-danger mb-0">{validationMsg.exampleMeaning}</p>
                                </div>

                                <div class="col-7">
                                    <label class="form-label">Hình ảnh</label>
                                    <input type="text" class="form-control" value={image ? image : "Không có hình ảnh"} disabled />

                                    <input ref={inputFile} class="d-none" type="file" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />

                                </div>
                                <div class="col-5 text-center">
                                    <img id="imgAdd" src={image ? image : noImage} class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                    <a href="javascript:void(0)" onClick={() => inputFile.current.click()}>Thay đổi</a>
                                    {image && <> <span class="text-muted px-1">  |  </span>
                                        <a href="javascript:void(0)" onClick={() => setImage("")}>Xóa bỏ</a></>}
                                </div>

                                <div class="col-6">
                                    <button type="reset" class="btn btn-secondary w-100" onClick={onReset}>
                                        Làm mới
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button type="button" onClick={() => { if (!validateAll()) return; else document.getElementById("btn-save-hide-add-vocab").click() }} class="btn btn-primary w-100">
                                        Thêm mới
                                    </button>
                                    <button type="button" class="d-none" id="btn-save-hide-add-vocab" data-bs-toggle="modal" data-bs-target="#ViewConfirmAddModal"></button>
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
                                Xác nhận thêm từ vựng
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
                            Bạn có chắc muốn thêm từ vựng này chứ ?
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
