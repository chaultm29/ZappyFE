import React, { useRef, useState } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import AccountServices from "../../services/AccountServices";
import AuthenticationService from "../../services/AuthenticationService";


export default function Register() {

  const [roleId, setRoleId] = useState(3);
  const [roleName, setRoleName] = useState("Student");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [validationMsg, setValidationMsg] = useState('');
  const [msgErrorResponse, setMsgErrorResponse] = useState("");
  const [msgSuccessResponse, setMsgSuccessResponse] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    let account = { username: username, passwordOld: "", passwordNew: password, dateOfBirth: dateOfBirth, email: email, fullName: fullname, phone: phone, roleDTO: { id: roleId, name: roleName }, avatar: "default.png" };
    AuthenticationService.register(account).then((response) => {

      if (response.status === 200) {
        if (response.data.includes("thành công")) {
          setMsgSuccessResponse(response.data);
        } else if (response.data.includes("đã tồn tại")) {
          setMsgErrorResponse(response.data);
        }
      }
    }
    )
      .catch((error) => {
        setMsgErrorResponse(error);
      });
  }

  const onUsernameChange = (e) => {
    let input = e.target.value.toLowerCase().trim();
    setUsername(input);
  }
  const onFullnameChange = (e) => {
    let input = e.target.value.toUpperCase().trim();
    setFullname(input);
  }
  const onEmailChange = (e) => {
    let input = e.target.value.trim();
    setEmail(input);
  }
  const onPhoneChange = (e) => {
    let input = e.target.value.trim();
    setPhone(input);
  }
  const onDateOfBirthChange = (e) => {
    let input = e.target.value;
    setDateOfBirth(input);
  }

  const onPasswordChange = (e) => {
    let input = e.target.value.trim();
    setPassword(input);
  }
  const onRepasswordChange = (e) => {
    let input = e.target.value.trim();
    setRepassword(input);
  }

  const validateAll = () => {
    const msg = {};
    var validateUsername = /^[a-z\d]+$/i;
    var validateFullname = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    var validatePhone = /(0)+([0-9]{9})\b/;
    var inputDate = new Date(dateOfBirth);
    var validatePassword = /^[a-z\d\S]+$/i;
    var today = new Date();
    if (username.length === 0) {
      msg.username = "Không được để trống";
    } else if (!validateUsername.test(username)) {
      msg.username = "Không bao gồm dấu cách hoặc kí tự đặc biệt ";
    } else if (username.length < 4 || username.length > 20) {
      msg.username = "Độ dài từ 4-20 kí tự";
    }
    if (fullname.length === 0) {
      msg.fullname = "Không được để trống";
    } else if (!validateFullname.test(fullname)) {
      msg.fullname = "Không được bao gồm số và kí tự đặc biệt";
    } else if (fullname.length < 1 || fullname.length > 50) {
      msg.fullname = "Độ dài từ 1-50 kí tự";
    }
    if (email.length === 0) {
      msg.email = "Không được để trống";
    } else if (!validateEmail.test(email)) {
      msg.email = "Cần bao gồm '@ .' và không được chứa dấu cách";
    }
    if (phone.length === 0) {
      msg.phone = "Không được để trống";
    }
    else if (!validatePhone.test(phone)) {
      msg.phone = "Độ dài 10 số, không bao gồm kí tự đặc biệt và dấu cách";
    }
    if (dateOfBirth.length === 0) {
      msg.dob = "Không được để trống";
    } else if (inputDate > today) {
      msg.dob = "Cần chọn ngày sinh nhỏ hơn hiện tại";
    }
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

  const hideAlertSuccess = () => {
    setMsgSuccessResponse("");
    setMsgErrorResponse("");
    AuthenticationService.login(username, password)
  }
  const hideAlertError = () => {
    setMsgSuccessResponse("");
    setMsgErrorResponse("");
  }

  return (
    <div>
      {msgSuccessResponse !== "" ?
        < SweetAlert success title="Tạo tài khoản thành công!" timeout={2000} onConfirm={hideAlertSuccess}>
          {msgSuccessResponse}
        </SweetAlert > : ""}
      {msgErrorResponse !== "" ?
        < SweetAlert danger title="Tạo tài khoản thất bại!" timeout={2000} onConfirm={hideAlertError}>
          {msgErrorResponse}
        </SweetAlert > : ""}
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
                type="reset"
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
                <form onSubmit={onSubmit} autoComplete="off" autoComplete="none">
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
                      onChange={onFullnameChange}
                    />
                  </div>
                  <div class="text-start mb-2">
                    <p class="text-danger mb-0">{validationMsg.fullname}</p>
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
                      onChange={onEmailChange}
                    />
                  </div>
                  <div class="text-start mb-2">
                    <p class="text-danger mb-0">{validationMsg.email}</p>
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
                      onChange={onPhoneChange}
                    />
                  </div>
                  <div class="text-start mb-2">
                    <p class="text-danger mb-0">{validationMsg.phone}</p>
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
                      onChange={onDateOfBirthChange}
                    />
                  </div>
                  <div class="text-start mb-2">
                    <p class="text-danger mb-0">{validationMsg.dob}</p>
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
                      onChange={onUsernameChange}
                    />
                  </div>
                  <div class="text-start mb-2">
                    <p class="text-danger mb-0">{validationMsg.username}</p>
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
                      class="btn btn-block w-100"
                    >
                      Đăng kí
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
