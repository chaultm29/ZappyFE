import React, { useState } from 'react'
import noImage from "../../assets/img/noImage.png"
import S3Config from '../../services/S3Config'
export default function QuestionViewModal({ questionDetail }) {

    return (

        <>
            {/* view question */}
            {questionDetail &&
                <div class="modal fade" id="ViewViewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Xem câu hỏi
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form class="row g-3" >
                                    <div class="col-8">
                                        <label class="form-label">Loại câu hỏi<span class="text-danger">*</span></label>
                                        <select class="form-select" disabled >
                                            <option value="" selected disabled>{questionDetail.typeName}</option>

                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label">Kĩ năng<span class="text-danger">*</span></label>
                                        <select id="inputSkill" class="form-select" disabled>
                                            <option value="" selected disabled>{questionDetail.skillName}</option>


                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <label for="inputLesson" class="form-label">Bài<span class="text-danger">*</span></label>
                                        <select id="inputLesson" class="form-select" disabled>
                                            <option value="" selected disabled>{questionDetail.lessonName}</option>

                                        </select>
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label">Câu hỏi<span class="text-danger">*</span></label>
                                        <input name="question" type="text" class="form-control" value={questionDetail.question} disabled />

                                    </div>

                                    {questionDetail.typeName === "Chọn đáp án đúng" &&
                                        <>
                                            {questionDetail.answer.map((item, index) =>
                                                item.correct ?
                                                    <div class="col-12">
                                                        <label class="form-label">{index + 1}. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                                        <input type="text" name="answer" class="form-control" value={item.answer} disabled />
                                                    </div>
                                                    :
                                                    <div class="col-12">
                                                        <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                        <input type="text" name="answer" class="form-control" value={item.answer} disabled />
                                                    </div>
                                            )}
                                        </>
                                    }
                                    {questionDetail.typeName === "Đúng/Sai" &&
                                        <>
                                            {questionDetail.answer.map((item, index) =>
                                                item.correct ?
                                                    <div class="col-12">
                                                        <label class="form-label">{index + 1}. Đáp án<span class="text-success"> đúng</span><span class="text-danger">*</span></label>
                                                        <input type="text" name="answer" class="form-control" value={item.answer} disabled />
                                                    </div>
                                                    :
                                                    <div class="col-12">
                                                        <label class="form-label">{index + 1}. Đáp án <span class="text-danger"> sai</span><span class="text-danger">*</span></label>
                                                        <input type="text" name="answer" class="form-control" value={item.answer} disabled />
                                                    </div>
                                            )}
                                        </>
                                    }
                                    {questionDetail.typeName !== "Chọn đáp án đúng" && questionDetail.typeName !== "Đúng/Sai" &&
                                        <>
                                            <div class="col-12">
                                                <label class="form-label">Đáp án<span class="text-danger">*</span></label>
                                                <input type="text" name="answer" class="form-control" value={typeof (questionDetail.answer) !== "undefined" ? questionDetail.answer[0].answer : ""} disabled />
                                            </div>
                                        </>}


                                    <div class="col-8">
                                        <label for="inputImageLink" class="form-label">Hình ảnh</label>
                                        {/* <input class="form-control" type="file" id="inputImageLink" accept="image/jpeg, image/png, image/jpg" /> */}
                                    </div>
                                    <div class="col-4">
                                        <img src={questionDetail.imgeLink ? S3Config.baseURLImgForQuestion + questionDetail.imgeLink : noImage} class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
