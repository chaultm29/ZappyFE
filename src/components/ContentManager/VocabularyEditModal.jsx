import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import LessonServices from '../../services/LessonServices';
import { useHistory } from "react-router-dom";
export default function VocabularyEditModal({ vocabDetail }) {

    const history = useHistory();
    const [image, setImage] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
    const [gif, setGif] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [lessonList, setLessonList] = useState(["Bài 1", "Bài 2", "Bài 3", "Bài 4", "Bài 5", "Bài 6", "Bài 7"]);
    const onSubmit = (data) => {
        console.log(`data`, data)
        LessonServices.editVocabulary(data, vocabDetail.vocabularyId);
        setTimeout(() => {
            history.go(0);
        }, 1000);
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
                document.getElementById("imageFieldHidden").value = e.target.files[0].name;
                document.getElementById("imageFieldHidden").focus();
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const gifHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setGif(reader.result);
                document.getElementById("imageExampleFieldHidden").value = e.target.files[0].name;
            }
        }
        reader.readAsDataURL(e.target.files[0]);

    }
    return (
        <>
            {/* add vocab */}
            <div class="modal fade" id="ViewEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Thêm từ vựng
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {vocabDetail && <div class="modal-body">
                            <form class="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div class="col-md-4">
                                    {setValue("lessonName", vocabDetail.lessonName)}
                                    <label class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select class="form-select"
                                        {...register("lessonName", {
                                            required: "Không được để trống"
                                        })}>
                                        <option value={vocabDetail.lessonName} selected hidden>{vocabDetail.lessonName}</option>
                                        {lessonList.map((lesson) => (
                                            <option value={lesson} selected={lesson == vocabDetail.lessonName}>{lesson}</option>
                                        ))}
                                    </select>
                                    {errors.lessonName && (
                                        <span class="text-danger">{errors.lessonName.message}</span>
                                    )}
                                </div>
                                <div class="col-md-4">
                                    {setValue("vocabulary", vocabDetail.vocabulary)}
                                    <label class="form-label">Từ vựng<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control"
                                        {...register("vocabulary", {
                                            required: "Không được để trống",
                                        })} />
                                    {errors.character && (
                                        <span class="text-danger">{errors.vocabulary.message}</span>
                                    )}
                                </div>
                                <div class="col-md-4">
                                    {setValue("meaning", vocabDetail.meaning)}
                                    <label class="form-label">Nghĩa<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control"

                                        {...register("meaning", {
                                            required: "Không được để trống",
                                        })} />
                                    {errors.meaning && (
                                        <span class="text-danger">{errors.meaning.message}</span>
                                    )}
                                </div>

                                <div class="col-md-12">
                                    {setValue("example", vocabDetail.example)}
                                    <label class="form-label">Ví dụ</label>
                                    <input type="text" class="form-control"
                                        {...register("example")} />
                                </div>
                                <div class="col-md-12">
                                    {setValue("exampleMeaning", vocabDetail.exampleMeaning)}
                                    <label class="form-label">Giải thích ví dụ</label>
                                    <input type="text" class="form-control"
                                        {...register("exampleMeaning")} />
                                </div>



                                <div class="col-8">
                                    <label for="inputImageLink" class="form-label">Hình ảnh<span class="text-danger">*</span></label>
                                    <input class="form-control collapse collapse-horizontal" type="file" id="inputImageLink" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    {setValue("imageLink", vocabDetail.imageLink)}
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
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
