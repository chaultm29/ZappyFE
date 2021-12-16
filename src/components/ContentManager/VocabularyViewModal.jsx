import React, { useState } from 'react'

import noImage from "../../assets/img/noImage.png"
import S3Config from '../../services/S3Config'
export default function VocabularyViewModal({ vocabDetail }) {

    return (
        <>
            {/* view vocab */}
            <div class="modal fade" id="ViewViewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Xem từ vựng
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3">
                                <div class="col-md-4">
                                    <label class="form-label">Bài</label>
                                    <select class="form-select" disabled>
                                        <option selected disabled>{vocabDetail.lessonName}</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Từ vựng</label>
                                    <input type="text" class="form-control" value={vocabDetail.vocabulary} disabled />

                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Nghĩa</label>
                                    <input type="text" class="form-control" value={vocabDetail.meaning} disabled />
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Ví dụ</label>
                                    <input type="text" class="form-control" value={vocabDetail.example} disabled />
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Giải thích ví dụ</label>
                                    <input type="text" class="form-control" value={vocabDetail.exampleMeaning} disabled />
                                </div>
                                <div class="col-7">
                                    <label class="form-label">Hình ảnh<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" value={vocabDetail.imageLink} disabled />


                                </div>
                                <div class="col-5 text-center">
                                    <img id="imgEdit" src={vocabDetail.imageLink ? S3Config.baseURLVocabulary + vocabDetail.imageLink : noImage} class="rounded img-thumbnail mx-auto d-block" width="100px" height="100px" />


                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
