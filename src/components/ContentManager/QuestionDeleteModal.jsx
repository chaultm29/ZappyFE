import React from 'react'
import LessonServices from '../../services/LessonServices'
import { useHistory } from "react-router-dom";
export default function QuestionDeleteModal({ questionDetail }) {
    const history = useHistory();
    const onClickYesButton = () => {
        console.log(`questionDetail.id`, questionDetail.questionID)
        LessonServices.deleteQuestion(questionDetail.questionID);
        // setTimeout(() => {
        //     history.go(0);
        // }, 1000);
    }
    return (
        <>
            {/* Delete modal */}
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