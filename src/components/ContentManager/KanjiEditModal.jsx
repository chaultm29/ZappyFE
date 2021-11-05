import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";

export default function KanjiEditModal({ kanjiDetail }) {
    const [image, setImage] = useState("");
    const [gif, setGif] = useState("");
    const history = useHistory();

    const [lessonList, setLessonList] = useState(["Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5", "Bài 6", "Bài 7"]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({});
    const onSubmit = (data) => {
        console.log(data);
        LessonServices.editKanji(data, kanjiDetail.id);
        setTimeout(() => {
            history.go(0);
        }, 1000);
    }

    const onHandleChange = (e) => {
        console.log(e.target.id);
    }
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
                document.getElementById("imageFieldHidden").value = e.target.files[0].name;
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const gifHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setGif(reader.result);
                console.log(reader.result);
                document.getElementById("gifFieldHidden").value = e.target.files[0].name;
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <>

            {/* Edit modal */}
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
                                <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                    <div class="col-md-3">
                                        {setValue("lessonName", kanjiDetail.lessonName)}
                                        <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                        <select id="inputLesson" class="form-select"
                                            {...register("lessonName", {
                                                required: "Không được để trống"
                                            })}
                                        // onChange={(e) => { document.getElementById("inputLessonNameHidden").value = e.target.value }}
                                        >
                                            <option value={kanjiDetail.lessonName} selected hidden>{kanjiDetail.lessonName}</option>
                                            {lessonList.map((lesson) => (
                                                <option value={lesson} selected={lesson == kanjiDetail.lessonName}>{lesson}</option>
                                            ))}
                                        </select>
                                        {errors.lessonName && (
                                            <span class="text-danger">{errors.lessonName.message}</span>
                                        )}
                                        {/* <input name="lessonName" type="text" id="inputLessonNameHidden" class=""
                                            {...register("lessonName", {
                                                required: "Không được để trống"
                                            })} /> */}
                                    </div>
                                    <div class="col-md-3">
                                        {setValue("character", kanjiDetail.character)}
                                        <label for="inputCharacter" class="form-label">Hán tự<span class="text-danger">*</span></label>
                                        <input name="character" type="text" class="form-control" id="inputCharacter"
                                            {...register("character", {
                                                required: "Không được để trống",
                                                maxLength: { value: 1, message: "Chỉ chứa 1 ký tự" },
                                                pattern: {
                                                    value: /[\u4e00-\u9faf]/,
                                                    message: "Chỉ nhập Hán tự",
                                                },
                                            })} />
                                        {errors.character && (
                                            <span class="text-danger">{errors.character.message}</span>
                                        )}
                                    </div>
                                    <div class="col-md-3">
                                        {setValue("chinese", kanjiDetail.chinese)}
                                        <label for="inputChinese" class="form-label">Âm Hán<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="inputChinese"
                                            style={{ textTransform: "uppercase" }}
                                            {...register("chinese", {
                                                required: "Không được để trống",
                                                pattern: {
                                                    value: /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\w]+$/,
                                                    message: "Không bao gồm ký tự đặc biệt và dấu cách.",
                                                },
                                            })} />
                                        {errors.chinese && (
                                            <span class="text-danger">{errors.chinese.message}</span>
                                        )}
                                    </div>
                                    <div class="col-md-3">
                                        {setValue("vietnamese", kanjiDetail.vietnamese)}
                                        <label for="inputVietnamese" class="form-label">Nghĩa<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="inputVietnamese"
                                            {...register("vietnamese", {
                                                required: "Không được để trống"
                                            })} />
                                        {errors.vietnamese && (
                                            <span class="text-danger">{errors.vietnamese.message}</span>
                                        )}
                                    </div>
                                    <div class="col-md-6">
                                        {setValue("onyomi", kanjiDetail.onyomi)}
                                        <label for="inputOnyomi" class="form-label">Âm Ôn</label>
                                        <input type="text" class="form-control" id="inputOnyomi"
                                            {...register("onyomi", {
                                                pattern: {
                                                    value: /^[\u30a0-\u30ff,、・/／]+/,
                                                    message: "Chỉ nhập katakana và các ký tự ,、・/／",
                                                },
                                            })} />
                                        {errors.onyomi && (
                                            <span class="text-danger">{errors.onyomi.message}</span>
                                        )}

                                    </div>
                                    <div class="col-md-6">
                                        {setValue("kunyomi", kanjiDetail.kunyomi)}
                                        <label for="inputKunyomi" class="form-label">Âm Kun<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="inputKunyomi"
                                            {...register("kunyomi", {
                                                required: "Không được để trống",
                                                pattern: {
                                                    value: /^[\u3040-\u309f,、・/／]+/,
                                                    message: "Chỉ nhập hiragana và các ký tự ,、・/／",
                                                },
                                            })} />
                                        {errors.kunyomi && (
                                            <span class="text-danger">{errors.kunyomi.message}</span>
                                        )}
                                    </div>
                                    <div class="col-12">
                                        {setValue("description", kanjiDetail.description)}
                                        <label for="inputDescription" class="form-label">Mô tả<span class="text-danger">*</span></label>
                                        <textarea type="text" class="form-control" id="inputDescription"
                                            {...register("description", {
                                                required: "Không được để trống",
                                            })} />
                                        {errors.description && (
                                            <span class="text-danger">{errors.description.message}</span>
                                        )}
                                    </div>

                                    <div class="col-8">
                                        <label for="inputImageLink" class="form-label">Hình ảnh<span class="text-danger">*</span></label>
                                        <input class="form-control collapse collapse-horizontal" type="file" id="inputImageLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                        {setValue("imageLink", kanjiDetail.imageLink)}
                                        <input name="imageLink" id="imageFieldHidden"
                                            {...register("imageLink", {
                                                required: "Vui lòng chọn 1 ảnh (Định dạng: .png.jpeg.jpg)"
                                            })} />

                                        {errors.imageLink && (
                                            <span class="text-danger">{errors.imageLink.message}</span>
                                        )}
                                    </div>
                                    <div class="col-4 text-center">
                                        <img src={image} class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                        <a data-bs-toggle="collapse" href="#inputImageLink" aria-expanded="false" aria-controls="inputImageLink">Thay đổi</a>
                                    </div>
                                    <div class="col-8">
                                        {setValue("gifLink", kanjiDetail.gifLink)}
                                        <label for="inputGifLink" class="form-label">Cách viết<span class="text-danger">*</span></label>
                                        <input class="form-control collapse collapse-horizontal" type="file" id="inputGifLink" accept="image/gif" onChange={gifHandler} />
                                        {errors.gifLink && (
                                            <span class="text-danger">{errors.gifLink.message}</span>
                                        )}
                                        <input id="gifFieldHidden"
                                            {...register("gifLink", {
                                                required: "Vui lòng chọn 1 ảnh (Định dạng: .gif)",
                                            })} />
                                    </div>

                                    <div class="col-4 text-center">
                                        <img src={gif} class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />
                                        <a data-bs-toggle="collapse" href="#inputGifLink" aria-expanded="false" aria-controls="inputGifLink">Thay đổi</a>
                                    </div>
                                    <div class="col-6"><button type="reset" class="btn btn-secondary w-100">
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
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
