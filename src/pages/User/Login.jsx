import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import validator from "validator";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <button
        type="button"
        id="buttonLogin"
        class="btn"
        data-toggle="modal"
        data-target="#loginModal"
      >
        Đăng nhập
      </button>

      <div
        class="modal fade"
        id="loginModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header border-bottom-0">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-title text-center">
                <h4>Đăng nhập</h4>
              </div>
              <div class="d-flex flex-column text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-group input-group mb-0">
                    <div class="input-group-prepend">
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
                    <div class="input-group-prepend">
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
                        minLength: { value: 8, message: "Chưa đủ độ dài" },
                        maxLength: { value: 20, message: "Quá dài" },
                        pattern: {
                          value: /^[a-z\d]+$/i,
                          message: "Không đúng định dạng",
                        },
                      })}
                    />
                  </div>

                  <div class="text-start mb-2">
                    {errors.password && (
                      <span class="text-danger">{errors.password.message}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    id="buttonLogin"
                    class="btn btn-block mt-0"
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
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <div class="signup-section">
                Chưa có tài khoản?{" "}
                <a href="#a" style={{ color: "#F6B0A6" }}>
                  {" "}
                  Đăng kí
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
