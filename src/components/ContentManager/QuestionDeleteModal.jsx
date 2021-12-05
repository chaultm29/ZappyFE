import React, { useState } from 'react'
import LessonServices from '../../services/LessonServices'
import { useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
export default function QuestionDeleteModal({ questionDetail }) {
    const history = useHistory();
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const onClickYesButton = () => {
        console.log(`questionDetail.id`, questionDetail.questionID)
        LessonServices.deleteQuestion(questionDetail.questionID).then((response) => {
            if (response.status === 200) {
                setMsgSuccessResponse("Xóa câu hỏi thành công");
            }
            else {
                setMsgErrorResponse("Xóa câu hỏi thất bại");
            }
        }
        ).catch((error) => {
            setMsgErrorResponse(error);
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
                    < SweetAlert success title="Xóa câu hỏi thành công!" timeout={2000} onConfirm={hideAlert}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Xóa câu hỏi thất bại!" timeout={2000} onConfirm={hideAlert}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewDeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Xác nhận xóa câu hỏi
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc muốn xóa câu hỏi "<span class="text-danger">{questionDetail.question}</span>" chứ ?
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
