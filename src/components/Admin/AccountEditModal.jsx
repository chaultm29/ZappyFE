import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AccountServices from '../../services/AccountServices';
import { useHistory } from "react-router-dom";

export default function AccountEditModal({ accountDetail }) {
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [validationMsg, setValidationMsg] = useState('');
  const history = useHistory();


  const onSubmit = (e) => {
    e.preventDefault();
    let account = {
      username: accountDetail.username
      , dateOfBirth: accountDetail.dateOfBirth, email: accountDetail.email, fullName: accountDetail.fullName, phone: accountDetail.phone, roleDTO: { id: document.getElementById("role").options[document.getElementById("role").selectedIndex].value, name: document.getElementById("role").options[document.getElementById("role").selectedIndex].text }, avatar: accountDetail.avatar
    };
    console.log(`data`, account);

    // AccountServices.editAccount(account, accountDetail.id);
    // setTimeout(() => {
    //   history.go(0);
    // }, 1000);


  }

  const onResetPassword = () => {

    AccountServices.resetPassword(accountDetail.username);
  }
  // const imageHandler = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImage(reader.result);
  //       document.getElementById("imageFieldHidden").value = e.target.files[0].name;
  //     }
  //   }
  //   reader.readAsDataURL(e.target.files[0]);
  // }

  const onRoleIdChange = (e) => {
    let selectRoleId = e.target.options[e.target.selectedIndex].value;
    let selectRoleName = e.target.options[e.target.selectedIndex].text;
    setRoleId(selectRoleId);
    setRoleName(selectRoleName);
  }

  return (
    <>
      {/* edit account */}
      <div class="modal fade" id="ViewEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Sửa tài khoản
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Vai trò<span class="text-danger">*</span></label>
                  <select id="role" class="form-select" onChange={onRoleIdChange}>
                    {typeof accountDetail.roleDTO !== 'undefined' ? <option value={accountDetail.roleDTO.id} selected disabled>{accountDetail.roleDTO.name}</option> : ""}
                    <option value="2">Content Manager</option>
                    <option value="3">Student</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Tài khoản<span class="text-danger">*</span></label>
                  <input name="username" class="form-control" type="text" defaultValue={accountDetail.username} disabled />

                </div>
                <div class="col-md-12">
                  <label class="form-label">Họ và tên<span class="text-danger">*</span></label>
                  <input name="fullname" type="text" class="form-control" defaultValue={accountDetail.fullName} disabled />

                </div>

                <div class="col-md-6">
                  <label class="form-label">Email<span class="text-danger">*</span></label>
                  <input name="email" type="email" class="form-control" defaultValue={accountDetail.email} disabled />

                </div>
                <div class="col-md-6">
                  <label class="form-label">Số điện thoại<span class="text-danger"></span></label>
                  <input name="phone" type="text" class="form-control" defaultValue={accountDetail.phone} disabled />

                </div>
                <div class="col-md-6">
                  <label class="form-label">Ngày sinh<span class="text-danger">*</span></label>
                  <input name="date" class="form-control" type="date" value={accountDetail.dateOfBirth} disabled />

                </div>

                <div class="col-8">
                  <label class="form-label">Ảnh đại diện</label>
                  {/* <input class="form-control" type="file" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} disabled/>
                  <input id="imageFieldHidden" class="d-none" onChange={onImageChange} /> */}
                </div>
                <div class="col-4">
                  <img src={accountDetail.avatar} class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
                </div>
                <div class="col-12">
                  <button type="button" class="btn btn-link ps-0" onClick={onResetPassword}>Đặt lại mật khẩu</button>
                </div>
                <div class="col-6"><button type="reset" class="btn btn-secondary w-100">
                  Làm mới
                </button></div>
                <div class="col-6">
                  <button type="submit" class="btn btn-primary w-100" onClick={onSubmit}>
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
    ;
}
