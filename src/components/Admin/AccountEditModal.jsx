import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AccountServices from '../../services/AccountServices';
import { useHistory } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import AccountConfirmResetPasswordModal from "./AccountConfirmResetPasswordModal";

export default function AccountEditModal({ accountDetail }) {
  // console.log(`accountDetail`, accountDetail.roleDTO.id);
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [image, setImage] = useState("");
  const [validationMsg, setValidationMsg] = useState('');
  const [msgErrorResponse, setMsgErrorResponse] = useState("");
  const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
  const listRole = [{ id: "2", name: "Content Manager" }, { id: "3", name: "Student" }];
  const history = useHistory();

  useEffect(() => {
    if (typeof (accountDetail) !== "undefined") {
      if (typeof (accountDetail.roleDTO) !== "undefined") {
        setRoleId(accountDetail.roleDTO.id);
        setRoleName(accountDetail.roleDTO.name);
      }

      setUsername(accountDetail.username);
      setDateOfBirth(accountDetail.dateOfBirth);
      setEmail(accountDetail.email);
      setFullname(accountDetail.fullName);
      setPhone(accountDetail.phone);
      setImage(accountDetail.avatar);
    }
    return () => {
    }
  }, [accountDetail])

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    let account = {
      username: username.trim(),
      passwordOld: "",
      passwordNew: "",
      dateOfBirth: dateOfBirth.trim(),
      email: email.trim(),
      fullName: fullname.trim(),
      phone: phone.trim(),
      roleDTO: { id: roleId, name: roleName },
      avatar: image
    };
    AccountServices.editAccount(account, accountDetail.id).then((response) => {
      if (response.status === 200) {
        if (response.data.includes("thành công")) {
          setMsgSuccessResponse(response.data);
        } else if (response.data.includes("tồn tại")) {
          setMsgErrorResponse(response.data);
        }
      }
      else {
        setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
      }
    })
      .catch((error) => {
        setMsgErrorResponse(error);
      });
  };


  const onRoleIdChange = (e) => {
    let selectRoleId = e.target.options[e.target.selectedIndex].value;
    let selectRoleName = e.target.options[e.target.selectedIndex].text;
    setRoleId(selectRoleId);
    setRoleName(selectRoleName);
  }
  const onUsernameChange = (e) => {
    let input = e.target.value;
    setUsername(input);
  }
  const onFullnameChange = (e) => {
    let input = e.target.value;
    setFullname(input);
  }
  const onEmailChange = (e) => {
    let input = e.target.value.toLowerCase();
    setEmail(input);
  }
  const onPhoneChange = (e) => {
    let input = e.target.value;
    setPhone(input);
  }
  const onDateOfBirthChange = (e) => {
    let input = e.target.value;
    setDateOfBirth(input);
  }


  const validateAll = () => {
    setValidationMsg('');
    const msg = {};
    var validateUsername = /^[a-z\d]+$/i;
    var validateFullname = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    var validatePhone = /(0)+([0-9]{9})\b/;
    var inputDate = dateOfBirth.length > 0 ? new Date(dateOfBirth) : "";
    var today = new Date();
    if (roleId.length === 0) {
      msg.roleId = "Vui lòng chọn chức năng";
    }
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
    if (phone.length > 0 && !validatePhone.test(phone)) {
      msg.phone = "Độ dài 10 số, không bao gồm kí tự đặc biệt và dấu cách";
    }
    if (dateOfBirth.length > 0 && inputDate >= today) {
      msg.dob = "Cần chọn ngày sinh nhỏ hơn hiện tại";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  }




  const hideAlertSuccess = () => {
    setMsgSuccessResponse("");
    setMsgErrorResponse("");
    history.go(0);
  }
  const hideAlertError = () => {
    setMsgErrorResponse("");
  }

  return (
    <>
      {/* edit account */}
      <div class="alert-wrapper position-absolute" >
        {msgSuccessResponse !== "" ?
          < SweetAlert success title="Cập nhật tài khoản thành công!" timeout={2000} onConfirm={hideAlertSuccess}>
            {msgSuccessResponse}
          </SweetAlert > : ""}
        {msgErrorResponse !== "" ?
          < SweetAlert danger title="Cập nhật tài khoản thất bại!" timeout={2000} onConfirm={hideAlertError}>
            {msgErrorResponse}
          </SweetAlert > : ""}
      </div>
      <div class="modal fade" id="ViewEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {accountDetail && <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Chỉnh sửa tài khoản
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3" onSubmit={onSubmit}>
                <div class="col-md-6">
                  <label class="form-label">Vai trò<span class="text-danger">*</span></label>
                  <select id="role" class="form-select" onChange={onRoleIdChange} disabled={roleName === "Admin" ? true : false}>
                    {roleName === "Admin" ? <option vale="1">Admin</option> :
                      listRole.map((role) => (
                        <option value={role.id} selected={role.name === roleName}>{role.name}</option>
                      ))
                    }


                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Tài khoản<span class="text-danger">*</span></label>
                  <input name="username" class="form-control" type="text" value={username} onChange={onUsernameChange} />

                </div>
                <div class="col-md-12">
                  <label class="form-label">Họ và tên<span class="text-danger">*</span></label>
                  <input name="fullname" type="text" class="form-control" value={fullname} onChange={onFullnameChange} />

                </div>

                <div class="col-md-6">
                  <label class="form-label">Email<span class="text-danger">*</span></label>
                  <input name="email" type="email" class="form-control" style={{ textTransform: "lowercase" }} value={email} onChange={onEmailChange} />

                </div>
                <div class="col-md-6">
                  <label class="form-label">Số điện thoại<span class="text-danger"></span></label>
                  <input name="phone" type="text" class="form-control" value={phone} onChange={onPhoneChange} />

                </div>
                <div class="col-md-6">
                  <label class="form-label">Ngày sinh</label>
                  <input name="date" class="form-control" type="date" value={dateOfBirth} onChange={onDateOfBirthChange} />
                </div>

                <div class="col-12">
                  <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#ViewResetPasswordModal">Đặt lại mật khẩu</button>

                </div>
                <div class="col-6">
                  <button class="btn btn-secondary w-100" type="button" data-bs-dismiss="modal" aria-label="Close">
                    Không lưu thay đổi
                  </button>
                </div>
                <div class="col-6">
                  <button type="submit" class="btn btn-primary w-100">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>}
      </div>

    </>
  )
    ;
}
