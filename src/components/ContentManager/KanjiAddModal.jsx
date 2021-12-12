import React, { useEffect, useState, useRef } from 'react'

import { useHistory } from "react-router-dom";
import LessonServices from '../../services/LessonServices';
import SweetAlert from 'react-bootstrap-sweetalert';
import S3FileUpload from 'react-s3';
import S3Config from "../../services/S3Config.js";
import noImage from "../../assets/img/noImage.png"

export default function KanjiAddModal() {
    const [character, setCharacter] = useState("");
    const [chinese, setChinese] = useState("");
    const [vietnamese, setVietnamese] = useState("");
    const [description, setDescription] = useState("");
    const [kunyomi, setKunyomi] = useState("");
    const [onyomi, setOnyomi] = useState("");
    const [lessonName, setLessonName] = useState("");
    const [image, setImage] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const [gif, setGif] = useState("");
    const [gifUpload, setGifUpload] = useState("");
    const inputImageFile = useRef(null);
    const inputGifFile = useRef(null);
    const [validationMsg, setValidationMsg] = useState('');
    const [resetSelect, setResetSelect] = useState(true);
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const history = useHistory();
    const [lessonList, setLessonList] = useState(["Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5", "Bài 6", "Bài 7"]);
    const [config, setConfig] = useState({});
    useEffect(() => {
        S3Config.getConfig().then((res) => {
            setConfig({
                bucketName: res.data[0].value,
                dirName: '',
                region: res.data[1].value,
                accessKeyId: res.data[2].value,
                secretAccessKey: res.data[3].value
            })
        });
    }, [])


    const upload = (file, folder) => {
        const msg = {};
        setConfig({ ...config, dirName: folder });
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
        let kanjiAdd = {
            character: character,
            chinese: chinese.toUpperCase(),
            vietnamese: vietnamese,
            description: description,
            kunyomi: kunyomi,
            onyomi: onyomi,
            lessonName: lessonName,
            imageLink: image,
            gifLink: gif
        };
        const uploadImageSuccess = upload(imageUpload, 'KanjiDes');
        const uploadGifSuccess = upload(gifUpload, 'KanjiGif');
        if (uploadImageSuccess && uploadGifSuccess) {
            LessonServices.addKanji(kanjiAdd).then((response) => {
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
                setImage(e.target.files[0].name);
                setImageUpload(e.target.files[0]);
                document.getElementById("imgEdit").src = reader.result;
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const gifHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setGif(e.target.files[0].name);
                setGifUpload(e.target.files[0]);
                document.getElementById("gifEdit").src = reader.result;

            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onChangeLesson = (e) => {
        let lessonUser = e.target.value;
        setLessonName(lessonUser);
        setResetSelect(true);
    }

    const onChangeCharacter = (e) => {
        let characterUser = e.target.value.trim();
        setCharacter(characterUser);
    }

    const onChangeChinese = (e) => {
        let valueUser = e.target.value.trim();
        setChinese(valueUser);
    }
    const onChangeVietnamese = (e) => {
        let valueUser = e.target.value.trim();
        setVietnamese(valueUser);
    }
    const onChangeOnyomi = (e) => {
        let valueUser = e.target.value.trim();
        setOnyomi(valueUser);
    }
    const onChangeKunyomi = (e) => {
        let valueUser = e.target.value.trim();
        setKunyomi(valueUser);
    }

    const onChangeDescription = (e) => {
        let valueUser = e.target.value.trim();
        setDescription(valueUser);
    }

    const validateAll = () => {
        const msg = {};
        var validateCharacter = /[\u4e00-\u9faf]/;
        var validateChinese = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\w]+$/;
        var validateOnyomi = /^[\u30a0-\u30ff,、・/／]+/;
        var validateKunyomi = /^[\u3040-\u309f,、・/／]+/;
        if (lessonName.length === 0) {
            msg.lessonName = "Vui lòng chọn bài";
        }
        if (character.length === 0) {
            msg.character = "Không được để trống";
        }
        else if (character.length > 1) {
            msg.character = "Chỉ chứa 1 ký tự";
        }
        else if (!validateCharacter.test(character)) {
            msg.character = "Chỉ nhập Hán tự";
        }
        if (chinese.length === 0) {
            msg.chinese = "Không được để trống";
        } else if (!validateChinese.test(chinese)) {
            msg.chinese = "Không bao gồm ký tự đặc biệt và dấu cách.";
        }
        if (vietnamese.length === 0) {
            msg.vietnamese = "Không được để trống";
        }
        if (onyomi.length !== 0 && !validateOnyomi.test(onyomi)) {
            msg.onyomi = "Chỉ nhập katakana và các ký tự ,、・/／";
        }
        if (kunyomi.length === 0) {
            msg.kunyomi = "Không được để trống";
        } else if (!validateKunyomi.test(kunyomi)) {
            msg.kunyomi = "Chỉ nhập hiragana và các ký tự ,、・/／";
        }
        if (description.length === 0) {
            msg.description = "Không được để trống";
        }
        if (image.length === 0) {
            msg.image = "Vui lòng chọn 1 ảnh (Định dạng: .png.jpeg.jpg";
        }
        if (gif.length === 0) {
            msg.gif = "Vui lòng chọn 1 ảnh (Định dạng: .gif)";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }
    const onReset = () => {
        setCharacter("");
        setChinese("");
        setVietnamese("");
        setLessonName("");
        setDescription("");
        setGif("");
        setImage("");
        setKunyomi("");
        setOnyomi("");
        setValidationMsg('');
        setResetSelect(false);
        let itemSelect = document.querySelectorAll('select option');
        for (var i = 0; i < itemSelect.length; i++) {
            itemSelect[i].selected = itemSelect[i].defaultSelected;
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

            {/* Edit modal */}
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Thêm chữ Hán thành công!" timeout={2000} onConfirm={hideAlertSuccess}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Thêm chữ Hán thất bại!" timeout={2000} onConfirm={hideAlertError}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Thêm chữ hán
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" onSubmit={onSubmit}>
                                <div class="col-md-3">

                                    <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select id="inputLesson" class="form-select" onChange={onChangeLesson}>
                                        <option value="" disabled={resetSelect} selected>Chọn bài</option>
                                        {lessonList.map((lesson) => (
                                            <option value={lesson}>{lesson}</option>
                                        ))}
                                    </select>
                                    <p class="text-danger mb-0">{validationMsg.lessonName}</p>
                                </div>
                                <div class="col-md-3">
                                    <label for="inputCharacter" class="form-label">Hán tự<span class="text-danger">*</span></label>
                                    <input name="character" type="text" class="form-control" onChange={onChangeCharacter} id="inputCharacter" />
                                    <p class="text-danger mb-0">{validationMsg.character}</p>
                                </div>

                                <div class="col-md-3">

                                    <label for="inputChinese" class="form-label">Âm Hán<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="inputChinese"
                                        style={{ textTransform: "uppercase" }} onChange={onChangeChinese} />
                                    <p class="text-danger mb-0">{validationMsg.chinese}</p>
                                </div>
                                <div class="col-md-3">

                                    <label for="inputVietnamese" class="form-label">Nghĩa<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="inputVietnamese" onChange={onChangeVietnamese} />
                                    <p class="text-danger mb-0">{validationMsg.vietnamese}</p>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputOnyomi" class="form-label">Âm Ôn</label>
                                    <input type="text" class="form-control" id="inputOnyomi" onChange={onChangeOnyomi} />
                                    <p class="text-danger mb-0">{validationMsg.onyomi}</p>
                                </div>
                                <div class="col-md-6">

                                    <label for="inputKunyomi" class="form-label">Âm Kun<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="inputKunyomi" onChange={onChangeKunyomi}
                                    />
                                    <p class="text-danger mb-0">{validationMsg.kunyomi}</p>
                                </div>
                                <div class="col-12">

                                    <label for="inputDescription" class="form-label">Mô tả<span class="text-danger">*</span></label>
                                    <textarea type="text" class="form-control" id="inputDescription"
                                        onChange={onChangeDescription} />
                                    <p class="text-danger mb-0">{validationMsg.description}</p>
                                </div>

                                <div class="col-8">
                                    <label for="inputImageLink" class="form-label">Hình ảnh<span class="text-danger">*</span></label>
                                    <input class="d-none" type="file" ref={inputImageFile} id="inputImageLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    <br />
                                    <input name="imageLink" value={image ? image : "Không có hình ảnh"} disabled />
                                    <p class="text-danger mb-0">{validationMsg.image}</p>
                                </div>
                                <div class="col-4 text-center">
                                    <img src={image ? image : noImage} id="imgEdit" class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                    <a href="javascript:void(0)" onClick={() => inputImageFile.current.click()}>Thay đổi</a>
                                    {image && <> <span class="text-muted px-1">  |  </span>
                                        <a href="javascript:void(0)" onClick={() => setImage("")}>Xóa bỏ</a></>}
                                </div>

                                <div class="col-8">

                                    <label for="inputGifLink" class="form-label">Cách viết<span class="text-danger">*</span></label>
                                    <input class="d-none" type="file" ref={inputGifFile} id="inputGifLink" accept="image/gif" onChange={gifHandler} />
                                    <br />
                                    <input value={gif ? gif : "Không có hình ảnh"} disabled />
                                    <p class="text-danger mb-0">{validationMsg.gif}</p>
                                </div>

                                <div class="col-4 text-center">
                                    <img src={gif ? gif : noImage} id="gifEdit" class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                    <a href="javascript:void(0)" onClick={() => inputGifFile.current.click()}>Thay đổi</a>
                                    {gif && <> <span class="text-muted px-1">  |  </span>
                                        <a href="javascript:void(0)" onClick={() => setGif("")}>Xóa bỏ</a></>}
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
