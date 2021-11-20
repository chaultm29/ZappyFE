import React, { useRef } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <div
        class="modal fade"
        id="registerModal"
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
              <div class="form-title text-center">
                <h4>Đăng kí</h4>
              </div>

              <div class="d-flex flex-column text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-group input-group mb-0">
                    <div class="input-group-prepend d-flex">
                      <span class="input-group-text">
                        {" "}
                        <i class="fa fa-user"></i>{" "}
                      </span>
                    </div>
                    <input
                      name="fullname"
                      class="form-control"
                      placeholder="Họ và tên"
                      type="text"
                      style={{ textTransform: "uppercase" }}
                      {...register("fullname", {
                        required: "Không được để trống",
                        minLength: { value: 3, message: "Chưa đủ độ dài" },
                        maxLength: { value: 50, message: "Quá dài" },
                        pattern: {
                          value:
                            /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
                          message: "Không đúng định dạng",
                        },
                      })}
                    />
                  </div>
                  <div class="text-start mb-2">
                    {errors.fullname && (
                      <span class="text-danger">{errors.fullname.message}</span>
                    )}
                  </div>

                  <div class="form-group input-group mb-0">
                    <div class="input-group-prepend d-flex">
                      <span class="input-group-text">
                        {" "}
                        <i class="fa fa-envelope"></i>{" "}
                      </span>
                    </div>
                    <input
                      name="email"
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      {...register("email", {
                        required: "Không được để trống",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Không đúng định dạng",
                        },
                      })}
                    />
                  </div>
                  <div class="text-start mb-2">
                    {errors.email && (
                      <span class="text-danger">{errors.email.message}</span>
                    )}
                  </div>
                  <div class="form-group input-group mb-0">
                    <div class="input-group-prepend d-flex">
                      <span class="input-group-text">
                        {" "}
                        <i class="fa fa-phone"></i>{" "}
                      </span>
                    </div>

                    <input
                      name="phoneNumber"
                      class="form-control"
                      placeholder="Số điện thoại"
                      type="text"
                      {...register("phoneNumber", {
                        pattern: {
                          value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
                          message: "Không đúng định dạng",
                        },
                      })}
                    />
                  </div>
                  <div class="text-start mb-2">
                    {errors.phoneNumber && (
                      <span class="text-danger">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                  </div>
                  <div class="form-group input-group mb-0">
                    <div class="input-group-prepend d-flex">
                      <span class="input-group-text">
                        {" "}
                        <i class="fas fa-calendar-day"></i>{" "}
                      </span>
                    </div>

                    <input
                      name="dateOfBirth"
                      class="form-control"
                      placeholder="Ngày sinh"
                      type="date"
                    />
                  </div>
                  <div class="text-start mb-2"></div>
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
                        minLength: { value: 1, message: "Chưa đủ độ dài" },
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
                      {...register("password_repeat", {
                        validate: (value) =>
                          value === password.current || "Mật khẩu không khớp",
                      })}
                    />
                  </div>
                  <div class="text-start mb-2">
                    {errors.password_repeat && (
                      <span class="text-danger">
                        {errors.password_repeat.message}
                      </span>
                    )}
                  </div>
                  <div class="form-group">
                    <button
                      type="submit"
                      id="buttonLogin"
                      class="btn btn-block w-100"
                    >
                      Đăng kí
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div class="modal-footer d-flex justify-content-center">
              <div class="signup-section">
                Đã có tài khoản?{" "}
                <a
                  onClick={onClick}
                  data-target="#loginModal"
                  style={{ color: "#F6B0A6", cursor: "pointer" }}
                >
                  {" "}
                  Đăng nhập
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
