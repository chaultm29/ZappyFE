import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
export default function GrammarAddModal() {
    const history = useHistory();
    const [image, setImage] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
    const [gif, setGif] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(`data`, data)
        LessonServices.addGrammar(data);
        setTimeout(() => {
            history.go(0);
        }, 1000);

    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
                document.getElementById("imageFieldHidden").value = e.target.files[0].name;
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
            {/* add grammar */}
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
                            <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div class="col-md-6">
                                    <label class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select class="form-select"  {...register("lessonName", {
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
                                <div class="col-md-12">
                                    <label class="form-label">Ngữ pháp<span class="text-danger">*</span></label>
                                    <input name="grammar" type="text" class="form-control"
                                        {...register("grammar", {
                                            required: "Không được để trống",
                                        })} />
                                    {errors.grammar && (
                                        <span class="text-danger">{errors.grammar.message}</span>
                                    )}
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Giải thích ngữ pháp<span class="text-danger">*</span></label>
                                    <textarea type="text" class="form-control"

                                        {...register("explanation", {
                                            required: "Không được để trống",
                                        })} />
                                    {errors.explanation && (
                                        <span class="text-danger">{errors.explanation.message}</span>
                                    )}
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Ý nghĩa<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control"
                                        {...register("grammarMeaning", {
                                            required: "Không được để trống"
                                        })} />
                                    {errors.grammarMeaning && (
                                        <span class="text-danger">{errors.grammarMeaning.message}</span>
                                    )}
                                </div>

                                <div class="col-12">
                                    <label class="form-label">Ví dụ</label>
                                    <input type="text" class="form-control" {...register("example")} />

                                </div>
                                <div class="col-12">
                                    <label class="form-label">Nghĩa của ví dụ</label>
                                    <input type="text" class="form-control" {...register("exampleMeaning")} />
                                </div>
                                <div class="col-8">
                                    <label class="form-label">Hình ảnh minh họa ví dụ</label>
                                    <input class="form-control" type="file" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler}
                                    />
                                    <input id="imageFieldHidden"
                                        {...register("exampleImageLink")} />
                                </div>
                                <div class="col-4">
                                    <img src={image} class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
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
