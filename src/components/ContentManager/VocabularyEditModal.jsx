import React, { useState, useEffect, useRef } from 'react'
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
import noImage from "../../assets/img/noImage.png"
import SweetAlert from 'react-bootstrap-sweetalert';
export default function VocabularyEditModal({ vocabDetail }) {
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
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const [lessonList, setLessonList] = useState(["Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5", "Bài 6", "Bài 7"]);

    useEffect(() => {
        if (typeof (vocabDetail) !== "undefined") {
            setLessonName(vocabDetail.lessonName);
            setVocabulary(vocabDetail.vocabulary);
            setExample(vocabDetail.example);
            setExampleMeaning(vocabDetail.exampleMeaning);
            setMeaning(vocabDetail.meaning);
            setImage(vocabDetail.imageLink);
        }
        return () => {
        }
    }, [vocabDetail])
    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        let vocabUpdate = {
            lessonName: lessonName,
            vocabulary: vocabulary,
            meaning: meaning,
            imageLink: image,
            example: example,
            exampleMeaning: exampleMeaning,
        };

        LessonServices.editVocabulary(vocabUpdate, vocabDetail.id).then((response) => {
            if (response.status === 200) {
                setMsgSuccessResponse("Cập nhật thành công");
            } else {
                setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
            }

        })
            .catch((error) => {
                setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
            });
    };
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageUpload(e.target.files[0]);
                setImage(e.target.files[0].name);
                document.getElementById("imgEditVocab").src = reader.result;
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onChangeLesson = (e) => {
        let inputUser = e.target.value;
        setLessonName(inputUser);
    }
    const onChangeVocabulary = (e) => {
        let inputUser = e.target.value;
        setVocabulary(inputUser);
    }
    const onChangeMeaning = (e) => {
        let inputUser = e.target.value;
        setMeaning(inputUser);
    }
    const onChangeExample = (e) => {
        let inputUser = e.target.value;
        setExample(inputUser);
    }
    const onChangeExampleMeaning = (e) => {
        let inputUser = e.target.value;
        setExampleMeaning(inputUser);
    }
    const validateAll = () => {
        const msg = {};
        if (lessonName.length === 0) {
            msg.lessonName = "Vui lòng chọn bài";
        }
        if (vocabulary.length === 0) {
            msg.vocabulary = "Không được để trống";
        }
        if (meaning.length === 0) {
            msg.meaning = "Không được để trống";
        } if (example.length === 0) {
            msg.example = "Không được để trống";
        }
        if (exampleMeaning.length === 0) {
            msg.exampleMeaning = "Không được để trống";
        }
        if (image.length === 0) {
            msg.image = "Vui lòng chọn 1 ảnh (Định dạng: .png.jpeg.jpg)";
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

    return (
        <>
            {/* add vocab */}
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Cập nhật từ vựng thành công!" timeout={2000} onConfirm={hideAlert}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Cập nhật từ vựng thất bại!" timeout={2000} onConfirm={hideAlert}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Chỉnh sửa từ vựng
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {vocabDetail && <div class="modal-body">
                            <form class="row g-3" onSubmit={onSubmit} autoComplete="off" autoComplete="new-password">
                                <div class="col-md-4">
                                    <label class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select class="form-select" onChange={onChangeLesson}>
                                        {lessonList.map((lesson) => (
                                            <option value={lesson} selected={lesson === lessonName}>{lesson}</option>
                                        ))}
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.lessonName}</p>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Từ vựng<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" value={vocabulary} onChange={onChangeVocabulary} autoComplete="new-password" />
                                    <p class="text-danger mb-0">{validationMsg.vocabulary}</p>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Nghĩa<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" value={meaning} onChange={onChangeMeaning} />
                                    <p class="text-danger mb-0">{validationMsg.meaning}</p>
                                </div>

                                <div class="col-md-12">
                                    <label class="form-label">Ví dụ<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" value={example} onChange={onChangeExample} />
                                    <p class="text-danger mb-0">{validationMsg.example}</p>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Giải thích ví dụ<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" value={exampleMeaning} onChange={onChangeExampleMeaning} />
                                    <p class="text-danger mb-0">{validationMsg.exampleMeaning}</p>
                                </div>

                                <div class="col-7">
                                    <label class="form-label">Hình ảnh<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" value={image} disabled />

                                    <input ref={inputFile} class="d-none" type="file" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    <p class="text-danger mb-0">{validationMsg.image}</p>
                                </div>
                                <div class="col-5 text-center">
                                    <img id="imgEditVocab" src={image ? image : noImage} class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
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
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
