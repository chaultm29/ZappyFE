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
        if (response.data.includes("th??nh c??ng")) {
          setMsgSuccessResponse(response.data);
        } else if (response.data.includes("t???n t???i")) {
          setMsgErrorResponse(response.data);
        }
      }
      else {
        setMsgErrorResponse("???? c?? l???i x???y ra, vui l??ng th??? l???i");
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
    var validateFullname = /^[a-zA-Z_????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s]+$/;
    var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    var validatePhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    var inputDate = dateOfBirth.length > 0 ? new Date(dateOfBirth) : "";
    var today = new Date();
    if (roleId.length === 0) {
      msg.roleId = "Vui l??ng ch???n ch???c n??ng";
    }
    if (username.trim().length === 0) {
      msg.username = "Kh??ng ???????c ????? tr???ng";
    } else if (!validateUsername.test(username)) {
      msg.username = "Kh??ng bao g???m d???u c??ch ho???c k?? t??? ?????c bi???t ";
    } else if (username.trim().length < 4 || username.trim().length > 20) {
      msg.username = "????? d??i t??? 4-20 k?? t???";
    }
    if (fullname.trim().length === 0) {
      msg.fullname = "Kh??ng ???????c ????? tr???ng";
    } else if (!validateFullname.test(fullname.trim())) {
      msg.fullname = "Kh??ng ???????c bao g???m s??? v?? k?? t??? ?????c bi???t";
    } else if (fullname.length < 1 || fullname.length > 50) {
      msg.fullname = "????? d??i t??? 1-50 k?? t???";
    }
    if (email.trim().length === 0) {
      msg.email = "Kh??ng ???????c ????? tr???ng";
    } else if (!validateEmail.test(email)) {
      msg.email = "C???n bao g???m '@ .' v?? kh??ng ???????c ch???a d???u c??ch";
    }
    if (phone.trim().length > 0 && !validatePhone.test(phone)) {
      msg.phone = "S??? ??i???n tho???i kh??ng t???n t???i";
    }
    if (dateOfBirth.length > 0 && inputDate >= today) {
      msg.dob = "C???n ch???n ng??y sinh nh??? h??n hi???n t???i";
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
          < SweetAlert success title="C???p nh???t t??i kho???n th??nh c??ng!" timeout={2000} onConfirm={hideAlertSuccess}>
            {msgSuccessResponse}
          </SweetAlert > : ""}
        {msgErrorResponse !== "" ?
          < SweetAlert danger title="C???p nh???t t??i kho???n th???t b???i!" timeout={2000} onConfirm={hideAlertError}>
            {msgErrorResponse}
          </SweetAlert > : ""}
      </div>
      <div class="modal fade" id="ViewEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {accountDetail && <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ch???nh s???a t??i kho???n
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Vai tr??<span class="text-danger">*</span></label>
                  <select id="role" class="form-select" onChange={onRoleIdChange} disabled={roleName === "Admin" ? true : false}>
                    {roleName === "Admin" ? <option vale="1">Admin</option> :
                      listRole.map((role) => (
                        <option value={role.id} selected={role.name === roleName}>{role.name}</option>
                      ))
                    }
                  </select>
                  <p class="text-danger mb-0">{validationMsg.roleId}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">T??i kho???n<span class="text-danger">*</span></label>
                  <input name="username" class="form-control" type="text" value={username} onChange={onUsernameChange} disabled />
                  <p class="text-danger mb-0">{validationMsg.username}</p>
                </div>
                <div class="col-md-12">
                  <label class="form-label">H??? v?? t??n<span class="text-danger">*</span></label>
                  <input name="fullname" type="text" class="form-control" value={fullname} onChange={onFullnameChange} />
                  <p class="text-danger mb-0">{validationMsg.fullname}</p>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Email<span class="text-danger">*</span></label>
                  <input name="email" type="email" class="form-control" style={{ textTransform: "lowercase" }} value={email} onChange={onEmailChange} />
                  <p class="text-danger mb-0">{validationMsg.email}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">S??? ??i???n tho???i<span class="text-danger"></span></label>
                  <input name="phone" type="text" class="form-control" value={phone} onChange={onPhoneChange} />
                  <p class="text-danger mb-0">{validationMsg.phone}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Ng??y sinh</label>
                  <input name="date" class="form-control" type="date" value={dateOfBirth} onChange={onDateOfBirthChange} />
                  <p class="text-danger mb-0">{validationMsg.dob}</p>
                </div>

                <div class="col-12">
                  <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#ViewResetPasswordModal">?????t l???i m???t kh???u</button>

                </div>
                <div class="col-6">
                  <button class="btn btn-secondary w-100" type="button" data-bs-dismiss="modal" aria-label="Close">
                    Kh??ng l??u thay ?????i
                  </button>
                </div>
                <div class="col-6">
                  <button type="button" onClick={() => { if (!validateAll()) return; else document.getElementById("btn-save-hide-edit-acc").click() }} class="btn btn-primary w-100">
                    L??u thay ?????i
                  </button>
                  <button type="button" class="d-none" id="btn-save-hide-edit-acc" data-bs-toggle="modal" data-bs-target="#ViewConfirmEditModal"></button>
                </div>
              </form>
            </div>
          </div>
        </div>}
      </div>
      <div class="modal fade" id="ViewConfirmEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                X??c nh???n ch???nh s???a t??i kho???n
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
              B???n c?? ch???c mu???n ch???nh s???a t??i kho???n n??y ch??? ?
            </div>
            <div class="modal-footer border-0">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#ViewConfirmEditModal"
              >
                Kh??ng
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={onSubmit}
              >
                C??
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
    ;
}
