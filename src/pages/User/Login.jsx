import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import AuthenticationService from "../../services/AuthenticationService";

export default function Login() {
    const [msgLogin, setMsgLogin] = useState();
    const [site, setSite] = useState("Login");
    const [email, setEmail] = useState("");
    const [validationMsg, setValidationMsg] = useState('');
    const [submitMailMsg, setSubmitMailMsg] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        AuthenticationService.login(data.username, data.password).then((response) => {
        }).catch((error) => {
            if (error.toString().includes("401")) {
                setMsgLogin("Sai tài khoản hoặc mật khẩu");
            }
        })
    }
    const onOptionChange = (e) => {
        let option = e.target.href;
        setSite(option);
    }
    const onEmailChange = (e) => {
        let input = e.target.value;
        setEmail(input);
    }

    const validateAll = () => {
        const msg = {};
        var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (email.length === 0) {
            msg.email = "Không được để trống";
        } else if (!validateEmail.test(email)) {
            msg.email = "Cần bao gồm '@ .' và không được chứa dấu cách";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }
    const onSubmitEmail = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        AuthenticationService.forgotPassword(email).then((res) => {
            setSubmitMailMsg(res.data);
        })
    }


    return (
        <>

            <div
                class="modal fade"
                id="loginModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered" role="modal">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0">
                            <button
                                type="button"
                                class="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            {site.includes("Login") &&
                                <>
                                    <div class="form-title text-center">
                                        <h4>Đăng nhập</h4>
                                    </div>
                                    <div class="d-flex flex-column text-center">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div class="form-group input-group mb-0">
                                                <div class="input-group-prepend d-flex">
                                                    <span class="input-group-text">
                                                        {" "}
                                                        <i class="fas fa-user-circle"></i>{" "}
                                                    </span>
                                                </div>
                                                <input
                                                    name="username"
                                                    class="form-control"
                                                    placeholder="Tên tài khoản"
                                                    type="text"
                                                    {...register("username", {
                                                        required: "Không được để trống",
                                                        minLength: { value: 4, message: "Chưa đủ độ dài" },
                                                        maxLength: { value: 20, message: "Quá dài" },
                                                        pattern: {
                                                            value: /^[a-z\d]+$/i,
                                                            message: "Không đúng định dạng",
                                                        },
                                                    })}
                                                />
                                            </div>
                                            <div class="text-start mb-2">
                                                {errors.username && (
                                                    <span class="text-danger">{errors.username.message}</span>
                                                )}
                                            </div>

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
                                                    {...register("password", {
                                                        required: "Không được để trống",
                                                        minLength: { value: 6, message: "Chưa đủ độ dài" },
                                                        maxLength: { value: 20, message: "Quá dài" },
                                                        pattern: {
                                                            value: /^[a-z\d\S]+$/i,
                                                            message: "Không được nhập dấu cách",
                                                        },
                                                    })}
                                                />
                                            </div>

                                            <div class="text-start mb-2">
                                                {errors.password && (
                                                    <span class="text-danger">{errors.password.message}</span>
                                                )}
                                            </div>
                                            {msgLogin && <span class="text-danger mt-2">{msgLogin}</span>}

                                            <button
                                                type="submit"
                                                id="buttonLogin"
                                                class="btn btn-block mt-0 w-100"
                                            >
                                                Đăng nhập
                                            </button>

                                        </form>

                                        <div class="text-center text-muted delimiter">
                                            Hoặc sử dụng phương thức khác
                                        </div>
                                        <div class="d-flex justify-content-center social-buttons">
                                            <button
                                                type="button"
                                                class="btn btn-secondary btn-round"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Twitter"
                                            >
                                                <i class="fab fa-twitter"></i>
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-secondary btn-round"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Facebook"
                                            >
                                                <i class="fab fa-facebook"></i>
                                            </button>
                                            <button
                                                type="button"
                                                class="btn btn-secondary btn-round"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Linkedin"
                                            >
                                                <i class="fab fa-linkedin"></i>
                                            </button>
                                        </div>
                                        <div class="text-center fst-italic fst-normal">
                                            <a href="#forgotPassword" onClick={onOptionChange}>quên mật khẩu ? </a>
                                        </div>
                                    </div>
                                </>
                            }
                            {site.includes("forgotPassword") &&
                                <>
                                    <div class="form-title text-center">
                                        <h4>Quên mật khẩu</h4>
                                    </div>
                                    <div class="d-flex flex-column text-center">
                                        <form onSubmit={onSubmitEmail}>
                                            <div class="form-group input-group mb-0">
                                                <div class="input-group-prepend d-flex">
                                                    <span class="input-group-text">
                                                        {" "}
                                                        <i class="fa fa-envelope"></i>{" "}
                                                    </span>
                                                </div>
                                                <input
                                                    name="email"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Nhập email của bạn"
                                                    onChange={onEmailChange}
                                                />
                                            </div>
                                            <div class="text-start mb-2">
                                                <p class="text-danger mb-0">{validationMsg.email}</p>
                                            </div>
                                            <div class="text-start mb-2">
                                                <p class="text-danger mb-0">{submitMailMsg}</p>
                                            </div>
                                            <div class="form-group">
                                                <button
                                                    type="submit"
                                                    id="buttonLogin"
                                                    class="btn btn-block w-100">
                                                    Tiếp tục
                                                </button>
                                            </div>
                                            <div class="text-center fst-italic fst-normal mt-2">
                                                <a href="#Login" onClick={onOptionChange}>Quay về đăng nhập</a>
                                            </div>
                                        </form>
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
