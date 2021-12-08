import React, { useState } from 'react'
import LessonServices from '../../services/LessonServices'
import { useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
export default function VocabularyDeleteModal({ vocabDetail }) {
    const history = useHistory();
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const onClickYesButton = () => {
        LessonServices.deleteVocabulary(vocabDetail.id).then((response) => {
            if (response.status === 200) {
                setMsgSuccessResponse("Xóa từ vựng thành công");
            } else {
                setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");

            }

        })
            .catch((error) => {
                setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
            });
    };
    const hideAlert = () => {
        setMsgSuccessResponse("");
        setMsgErrorResponse("");
        history.go(0);
    }
    return (
        <>
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Xóa từ vựng thành công!" timeout={2000} onConfirm={hideAlert}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Xóa từ vựng thất bại!" timeout={2000} onConfirm={hideAlert}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewDeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Xác nhận xóa từ vựng
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc muốn xóa từ vựng "<span class="text-danger">{vocabDetail.vocabulary}</span>" chứ ?
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
