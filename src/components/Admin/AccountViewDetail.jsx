import React from "react";

export default function AccountViewDetail(account) {
  return (
    <>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <svg
              class="bd-placeholder-img img-fluid rounded-start"
              width="100%"
              height="250"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Image"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96"></rect>
              <text x="35%" y="50%" fill="#dee2e6" dy=".3em">
                Image
              </text>
            </svg>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Tài khoản : {account.account.username}</h5>
              <p class="card-text">Họ và tên : {account.account.fullName}</p>
              <p class="card-text">Ngày sinh : {account.account.dateOfBirth}</p>
              <p class="card-text">Email : {account.account.email}</p>
              <p class="card-text">Số điện thoại : {account.account.phone}</p>
              <p class="card-text">Vai trò : {account.account.role}</p>

              <p class="card-text">
                <small class="text-muted">Created date : 01/01/2020</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
