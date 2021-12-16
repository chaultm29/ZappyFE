import React, { useEffect, useState, useRef } from 'react'
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import S3Config from '../../services/S3Config';
import S3FileUpload from 'react-s3';
import noImage from "../../assets/img/noImage.png"
export default function KanjiEditModal({ kanjiDetail }) {

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
    const history = useHistory();
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const [lessonList, setLessonList] = useState(["Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5", "Bài 6", "Bài 7"]);

    const [configImg, setConfigImg] = useState({});
    const [configGif, setConfigGif] = useState({});
    useEffect(() => {
        S3Config.getConfig().then((res) => {
            setConfigImg({
                bucketName: res.data[0].value,
                dirName: 'KanjiDes',
                region: res.data[1].value,
                accessKeyId: res.data[2].value,
                secretAccessKey: res.data[3].value
            })
        });
        S3Config.getConfig().then((res) => {
            setConfigGif({
                bucketName: res.data[0].value,
                dirName: 'KanjiGif',
                region: res.data[1].value,
                accessKeyId: res.data[2].value,
                secretAccessKey: res.data[3].value
            })
        });
    }, [])



    const uploadImg = (file) => {
        const msg = {};
        S3FileUpload.uploadFile(file, configImg).then((data) => {
        }).catch((err) => {
            msg.err = err;
        })
        if (Object.keys(msg).length === 1) return false;
        return true;
    }
    const uploadGif = (file) => {
        const msg = {};
        S3FileUpload.uploadFile(file, configGif).then((data) => {
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
        let kanjiUpdate = {
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
        const uploadImageSuccess = uploadImg(imageUpload);
        const uploadGifSuccess = uploadGif(gifUpload);
        if (uploadImageSuccess && uploadGifSuccess) {
            LessonServices.editKanji(kanjiUpdate, kanjiDetail.id).then((response) => {
                if (response.status === 200) {
                    setMsgSuccessResponse("Sửa chữ Hán thành công");
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

    useEffect(() => {
        if (typeof (kanjiDetail) !== "undefined") {
            setCharacter(kanjiDetail.character);
            setChinese(kanjiDetail.chinese);
            setDescription(kanjiDetail.description);
            setGif(kanjiDetail.gifLink);
            setImage(kanjiDetail.imageLink);
            setKunyomi(kanjiDetail.kunyomi);
            setOnyomi(kanjiDetail.onyomi);
            setLessonName(kanjiDetail.lessonName);
            setVietnamese(kanjiDetail.vietnamese);
        }
        return () => {
        }
    }, [kanjiDetail])

    const onChangeLesson = (e) => {
        let lessonUser = e.target.value;
        setLessonName(lessonUser);
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
                    < SweetAlert success title="Sửa chữ Hán thành công!" timeout={2000} onConfirm={hideAlertSuccess}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Sửa chữ hán thất bại!" timeout={2000} onConfirm={hideAlertError}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Chỉnh sửa chữ hán
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {kanjiDetail &&
                            <div class="modal-body">
                                <form class="row g-3" onSubmit={onSubmit}>
                                    <div class="col-md-3">

                                        <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                        <select id="inputLesson" class="form-select" onChange={onChangeLesson}>
                                            {lessonList.map((lesson) => (
                                                <option value={lesson} selected={lesson === lessonName}>{lesson}</option>
                                            ))}
                                        </select>
                                        <p class="text-danger mb-0">{validationMsg.lessonName}</p>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="inputCharacter" class="form-label">Hán tự<span class="text-danger">*</span></label>
                                        <input name="character" type="text" class="form-control" value={character} onChange={onChangeCharacter} id="inputCharacter" />
                                        <p class="text-danger mb-0">{validationMsg.character}</p>
                                    </div>

                                    <div class="col-md-3">

                                        <label for="inputChinese" class="form-label">Âm Hán<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="inputChinese"
                                            style={{ textTransform: "uppercase" }} value={chinese} onChange={onChangeChinese} />
                                        <p class="text-danger mb-0">{validationMsg.chinese}</p>
                                    </div>
                                    <div class="col-md-3">

                                        <label for="inputVietnamese" class="form-label">Nghĩa<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="inputVietnamese" value={vietnamese} onChange={onChangeVietnamese} />
                                        <p class="text-danger mb-0">{validationMsg.vietnamese}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="inputOnyomi" class="form-label">Âm Ôn</label>
                                        <input type="text" class="form-control" id="inputOnyomi" value={onyomi} onChange={onChangeOnyomi} />
                                        <p class="text-danger mb-0">{validationMsg.onyomi}</p>
                                    </div>
                                    <div class="col-md-6">

                                        <label for="inputKunyomi" class="form-label">Âm Kun<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="inputKunyomi" value={kunyomi} onChange={onChangeKunyomi}
                                        />
                                        <p class="text-danger mb-0">{validationMsg.kunyomi}</p>
                                    </div>
                                    <div class="col-12">

                                        <label for="inputDescription" class="form-label">Mô tả<span class="text-danger">*</span></label>
                                        <textarea type="text" class="form-control" id="inputDescription"
                                            value={description} onChange={onChangeDescription} />
                                        <p class="text-danger mb-0">{validationMsg.description}</p>
                                    </div>

                                    <div class="col-8">
                                        <label for="inputImageLink" class="form-label">Hình ảnh<span class="text-danger">*</span></label>
                                        <input class="d-none" type="file" ref={inputImageFile} id="inputImageLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                        <br />
                                        <input name="imageLink" value={image ? image : "Không có hình ảnh"} class="form-control" disabled />
                                        <p class="text-danger mb-0">{validationMsg.image}</p>
                                    </div>
                                    <div class="col-4 text-center">
                                        <img src={image ? S3Config.baseURLKanjiDes + image : noImage} id="imgEdit" class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                        <a href="javascript:void(0)" onClick={() => inputImageFile.current.click()}>Thay đổi</a>
                                        {image && <> <span class="text-muted px-1">  |  </span>
                                            <a href="javascript:void(0)" onClick={() => setImage("")}>Xóa bỏ</a></>}
                                    </div>

                                    <div class="col-8">

                                        <label for="inputGifLink" class="form-label">Cách viết<span class="text-danger">*</span></label>
                                        <input class="d-none" type="file" ref={inputGifFile} id="inputGifLink" accept="image/gif" onChange={gifHandler} />
                                        <br />
                                        <input value={gif ? gif : "Không có gif"} class="form-control" disabled />
                                        <p class="text-danger mb-0">{validationMsg.gif}</p>
                                    </div>

                                    <div class="col-4 text-center">
                                        <img src={gif ? S3Config.baseURLKanjiGif + gif : noImage} id="gifEdit" class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                        <a href="javascript:void(0)" onClick={() => inputGifFile.current.click()}>Thay đổi</a>
                                        {gif && <> <span class="text-muted px-1">  |  </span>
                                            <a href="javascript:void(0)" onClick={() => setGif("")}>Xóa bỏ</a></>}
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
