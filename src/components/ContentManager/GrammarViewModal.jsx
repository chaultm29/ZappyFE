import React, { useState } from 'react'

export default function GrammarViewModal({ grammarDetail }) {


    return (
        <>
            {/* view grammar */}
            <div class="modal fade" id="ViewViewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Xem ngữ pháp
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" >
                                <div class="col-md-6">
                                    <label class="form-label">Bài<span class="text-danger">*</span></label>
                                    <select class="form-select">
                                        <option value="" selected disabled>{grammarDetail.lessonName}</option>
                                    </select>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Ngữ pháp<span class="text-danger">*</span></label>
                                    <input name="grammar" type="text" class="form-control" value={grammarDetail.grammar} disabled />
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Giải thích ngữ pháp<span class="text-danger">*</span></label>
                                    <textarea type="text" class="form-control" value={grammarDetail.explanation} disabled />

                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Ý nghĩa<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" value={grammarDetail.grammarMeaning} disabled />
                                </div>

                                <div class="col-12">
                                    <label class="form-label">Ví dụ</label>
                                    <input type="text" class="form-control" value={grammarDetail.example} disabled />
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Nghĩa của ví dụ</label>
                                    <input type="text" class="form-control" value={grammarDetail.exampleMeaning} disabled />
                                </div>
                                <div class="col-8">
                                    <label class="form-label">Hình ảnh minh họa ví dụ</label>
                                </div>
                                <div class="col-4">
                                    <img src={grammarDetail.exampleImageLink} class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
