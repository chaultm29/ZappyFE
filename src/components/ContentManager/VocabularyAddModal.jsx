import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
export default function VocabularyAddModal() {
    const history = useHistory();
    const [image, setImage] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
    const [gif, setGif] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(`data`, data)
        LessonServices.addVocabulary(data);
        setTimeout(() => {
            history.go(0);
        }, 1000);
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
            {/* add vocab */}
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
                            <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div class="col-md-4">
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
                                <div class="col-md-4">
                                    <label for="inputVocab" class="form-label">Từ vựng<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="inputVocab"
                                        {...register("vocabulary", {
                                            required: "Không được để trống",
                                        })} />
                                    {errors.character && (
                                        <span class="text-danger">{errors.vocabulary.message}</span>
                                    )}
                                </div>
                                <div class="col-md-4">
                                    <label for="inputMeaning" class="form-label">Nghĩa<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="inputMeaning"

                                        {...register("meaning", {
                                            required: "Không được để trống",
                                        })} />
                                    {errors.meaning && (
                                        <span class="text-danger">{errors.meaning.message}</span>
                                    )}
                                </div>

                                <div class="col-md-12">
                                    <label for="inputExample" class="form-label">Ví dụ</label>
                                    <input type="text" class="form-control" id="inputExample"
                                        {...register("example")} />
                                </div>
                                <div class="col-md-12">
                                    <label for="inputExampleMeaning" class="form-label">Giải thích ví dụ</label>
                                    <input type="text" class="form-control" id="inputExampleMeaning"
                                        {...register("inputExampleMeaning")} />

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
                                    <label for="inputExampleLink" class="form-label">Cách viết<span class="text-danger">*</span></label>
                                    <input class="form-control" type="file" id="inputExampleLink" accept="image/gif" onChange={gifHandler}
                                        {...register("exampleLink", {
                                            required: "Vui lòng chọn 1 ảnh (Định dạng: .png.jpeg.jpg)",
                                        })} />
                                    {errors.exampleLink && (
                                        <span class="text-danger">{errors.exampleLink.message}</span>
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
