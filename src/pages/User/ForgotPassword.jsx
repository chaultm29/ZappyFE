import React, { useState, useEffect } from 'react'
import Navigation from "../../components/Student/Navigation";
import bg from "../../assets/img/bg-home-scene-winter.svg";
import { useHistory } from "react-router-dom";
import AuthenticationService from '../../services/AuthenticationService';
export default function ForgotPassword() {
    const history = useHistory();
    let email = new URLSearchParams(history.location.search).get('email');
    let token = new URLSearchParams(history.location.search).get('token');
    const [isResponseOk, setIsResponseOk] = useState(false);
    const [submitNewPasswordMsg, setSubmitNewPasswordMsg] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [validationMsg, setValidationMsg] = useState('');
    console.log(`email,token`, email, token);
    useEffect(() => {
        if (!email || !token) {
            window.location.href = "*"
        } else {
            AuthenticationService.checkEmailTokenOnURL(email, token).then((res) => {
                console.log(`res`, res)
                if (res.data == "OK") {
                    setIsResponseOk(true);
                } else {
                    window.location.href = "*"
                }
            })
        }
    }, [email, token])

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        let userPass = { newPassword: password, oldPassword: "" }
        AuthenticationService.changePasswordInCaseOK(email, token, userPass).then((res) => setSubmitNewPasswordMsg(res.data));
    }

    const onPasswordChange = (e) => {
        let input = e.target.value;
        setPassword(input);
    }
    const onRepasswordChange = (e) => {
        let input = e.target.value;
        setRepassword(input);
    }
    const validateAll = () => {
        const msg = {};
        var validatePassword = /^[a-z\d\S]+$/i;
        if (password.length === 0) {
            msg.password = "Không được để trống";
        } else if (password.length < 8 || password.length > 20) {
            msg.password = "Độ dài từ 8-20 kí tự"
        } else if (!validatePassword.test(password)) {
            msg.password = "Không được chứa dấu cách";
        }
        if (repassword.length === 0) {
            msg.repassword = "Không được để trống";
        } else if (repassword !== password) {
            msg.repassword = "Mật khẩu không khớp";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    return (
        <div
            style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
            <Navigation />
            {isResponseOk && <div class="modal-dialog modal-dialog-centered" role="modal">
                <div class="modal-content">
                    <div class="modal-body">
                        {!submitNewPasswordMsg ? <>
                            <div class="form-title text-center mt-2">
                                <h4>Đổi mật khẩu</h4>
                            </div>
                            <div class="d-flex flex-column text-center">
                                <form onSubmit={onSubmit}>
                                    <div class="form-group input-group mb-0">
                                        <div class="input-group-prepend d-flex">
                                            <span class="input-group-text">
                                                {" "}
                                                <i class="fa fa-lock"></i>{" "}
                                            </span>
                                        </div>
                                        <input
                                            name="password"
                                            class="form-control"
                                            placeholder="Mật khẩu"
                                            type="password"
                                            onChange={onPasswordChange}
                                        />
                                    </div>
                                    <div class="text-start mb-2">
                                        <p class="text-danger mb-0">{validationMsg.password}</p>
                                    </div>
                                    <div class="form-group input-group mb-0">
                                        <div class="input-group-prepend d-flex">
                                            <span class="input-group-text">
                                                {" "}
                                                <i class="fa fa-lock"></i>{" "}
                                            </span>
                                        </div>
                                        <input
                                            name="password_repeat"
                                            class="form-control"
                                            placeholder="Nhập lại mật khẩu"
                                            type="password"
                                            onChange={onRepasswordChange}
                                        />
                                    </div>
                                    <div class="text-start mb-2">
                                        <p class="text-danger mb-0">{validationMsg.repassword}</p>
                                    </div>
                                    <div class="form-group">
                                        <button
                                            type="submit"
                                            id="buttonLogin"
                                            class="btn btn-block w-100">
                                            Tiếp tục
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </> : <>
                            <div class="text-start mb-2">
                                <p class="text-danger mb-0">{submitNewPasswordMsg}</p>
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
