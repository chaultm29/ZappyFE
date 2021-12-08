import React, { useState } from 'react'
import LessonServices from '../../services/LessonServices'
import { useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
export default function KanjiDeleteModal({ kanjiDetail }) {
    const history = useHistory();
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const onClickYesButton = () => {
        LessonServices.deleteKanji(kanjiDetail.id).then((response) => {
            if (response.status === 200) {
                setMsgSuccessResponse("Xóa chữ Hán thành công");
            } else {
                setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");

            }
        })
            .catch((error) => {
                setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
            });
    }
    const hideAlert = () => {
        setMsgSuccessResponse("");
        setMsgErrorResponse("");
        history.go(0);
    }
    return (
        <>
            {/* Delete modal */}
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Xóa chữ Hán thành công!" timeout={2000} onConfirm={hideAlert}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Xóa chữ Hán thất bại!" timeout={2000} onConfirm={hideAlert}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewDeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Xác nhận xóa chữ Hán
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc muốn xóa chữ hán "<span class="text-danger">{kanjiDetail.character}</span>" chứ ?
                        </div>
                        <div class="modal-footer border-0">
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Không
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                onClick={onClickYesButton}
                            >
                                Có
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
