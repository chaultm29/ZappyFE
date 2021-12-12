import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import AccountServices from '../../services/AccountServices';
import SweetAlert from 'react-bootstrap-sweetalert';
export default function AccountConfirmResetPasswordModal({ username }) {
    const history = useHistory();
    const [msgErrorResponse, setMsgErrorResponse] = useState("");
    const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
    const onClickYesButton = () => {
        AccountServices.resetPassword(username).then((response) => {
            if (response.status === 200) {
                if (response.data.message.includes("thành công")) {
                    setMsgSuccessResponse(response.data.message);
                } else {
                    setMsgErrorResponse(response.data.message);
                }
            }
        })
            .catch((error) => {
                setMsgErrorResponse(error);
            });
    };

    const hideAlertSuccess = () => {
        setMsgSuccessResponse("");
        setMsgErrorResponse("");
        document.getElementById('close-modal').click();

    }
    const hideAlertError = () => {
        setMsgErrorResponse("");
    }
    return (
        <>
            {/* confirm modal */}
            <div class="alert-wrapper position-absolute" >
                {msgSuccessResponse !== "" ?
                    < SweetAlert success title="Đặt lại mật khẩu tài khoản thành công!" timeout={2000} onConfirm={hideAlertSuccess}>
                        {msgSuccessResponse}
                    </SweetAlert > : ""}
                {msgErrorResponse !== "" ?
                    < SweetAlert danger title="Đặt lại mật khẩu tài khoản thất bại!" timeout={2000} onConfirm={hideAlertError}>
                        {msgErrorResponse}
                    </SweetAlert > : ""}
            </div>
            <div class="modal fade" id="ViewResetPasswordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Xác nhận đặt lại mật khẩu
                            </h5>
                            <button
                                id="close-modal"
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc muốn đặt lại mật khẩu của tài khoản "<span class="text-danger">{username}</span>" chứ ?
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
