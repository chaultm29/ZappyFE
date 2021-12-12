import React from 'react'
import S3Config from '../../services/S3Config';

export default function KanjiViewModal({ kanjiDetail }) {
    return (
        <>

            {/* View modal */}
            <div class="modal fade" id="ViewViewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Xem chữ Hán
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        {kanjiDetail && <div class="modal-body">
                            <form class="row g-3">
                                <div class="col-md-3">
                                    <label for="inputLesson" class="form-label">Bài</label>
                                    <select id="inputLesson" class="form-select" disabled>
                                        <option selected value={kanjiDetail.lessonName}>{kanjiDetail.lessonName}</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="inputCharacter" class="form-label">Hán tự</label>
                                    <input type="text" class="form-control" id="inputCharacter" placeholder={kanjiDetail.character} disabled />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputChinese" class="form-label">Âm Hán</label>
                                    <input type="text" class="form-control" id="inputChinese" placeholder={kanjiDetail.chinese} disabled />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputVietnamese" class="form-label">Âm Nghĩa</label>
                                    <input type="text" class="form-control" id="inputVietnamese" placeholder={kanjiDetail.vietnamese} disabled />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputOnyomi" class="form-label">Âm Ôn</label>
                                    <input type="text" class="form-control" id="inputOnyomi" placeholder={kanjiDetail.onyomi} disabled />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputKunyomi" class="form-label">Âm Kun</label>
                                    <input type="text" class="form-control" id="inputKunyomi" placeholder={kanjiDetail.kunyomi} disabled />
                                </div>
                                <div class="col-12">
                                    <label for="inputDescription" class="form-label">Mô tả</label>
                                    <textarea type="text" class="form-control" id="inputDescription" placeholder={kanjiDetail.description} disabled />
                                </div>
                                <div class="col-6">
                                    <label for="inputImageLink" class="form-label">Hình ảnh</label>

                                    <img src={S3Config.baseURLKanjiDes + kanjiDetail.imageLink} class="rounded mx-auto d-block" alt="..." width="200px" />
                                </div>
                                <div class="col-6">
                                    <label for="inputImageLink" class="form-label">Cách viết</label>

                                    <img src={S3Config.baseURLKanjiGif + kanjiDetail.gifLink} class="rounded mx-auto d-block" alt="..." width="200px" />
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
