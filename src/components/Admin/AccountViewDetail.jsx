import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AccountServices from '../../services/AccountServices';
import { useHistory } from "react-router-dom";

export default function AccountViewModal({ accountDetail }) {

  return (
    <>
      {/* view account */}
      <div class="modal fade" id="ViewViewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Xem tài khoản
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Vai trò<span class="text-danger">*</span></label>
                  <select id="role" class="form-select" disabled>
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
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
    ;
}
