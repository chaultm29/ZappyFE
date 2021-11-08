import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import LessonServices from '../../services/LessonServices';

export default function KanjiAddModal() {
    const [image, setImage] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
    const [gif, setGif] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(`data`, data)
        LessonServices.addKanji(data);
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const gifHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setGif(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <>
            {/* add kanji */}
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
                            <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div class="col-md-3">
                                    <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select id="inputLesson" class="form-select"  {...register("lessonName", {
                                        required: "Không được để trống"
                                    })}>
                                        <option value="" selected disabled>Bài học</option>
                                        <option value="Bài 1">Bài 1</option>
                                        <option value="Bài 2">Bài 2</option>
                                        <option value="Bài 3">Bài 3</option>
                                        <option value="Bài 4">Bài 4</option>
                                        <option value="Bài 5">Bài 5</option>
                                        <option value="Bài 6">Bài 6</option>
                                        <option value="Bài 7">Bài 7</option>
                                    </select>
                                    {errors.lessonName && (
                                        <span class="text-danger">{errors.lessonName.message}</span>
                                    )}
                                </div>
                                <div class="col-md-3">
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
                                    <input class="form-control" type="file" id="inputImageLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler}
                                        {...register("imageLink", {
                                            required: "Vui lòng chọn 1 ảnh (Định dạng: .png.jpeg.jpg)",
                                        })}
                                    />
                                    {errors.imageLink && (
                                        <span class="text-danger">{errors.imageLink.message}</span>
                                    )}
                                </div>
                                <div class="col-4">
                                    <img src={image} class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
                                </div>
                                <div class="col-8">
                                    <label for="inputGifLink" class="form-label">Cách viết<span class="text-danger">*</span></label>
                                    <input class="form-control" type="file" id="inputGifLink" accept="image/gif" onChange={gifHandler}
                                        {...register("gifLink", {
                                            required: "Vui lòng chọn 1 ảnh (Định dạng: .gif)",
                                        })} />
                                    {errors.gifLink && (
                                        <span class="text-danger">{errors.gifLink.message}</span>
                                    )}
                                </div>
                                <div class="col-4">
                                    <img src={gif} class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
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
