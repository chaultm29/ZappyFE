import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";
import AccountModal from "./AccountModal.jsx";

export default function AccountManagerContent() {
  const [type, setType] = useState("-1");
  const onUserClickButton = (e) => {
    setType(e.currentTarget.value);
    console.log(type);
  };

  return (
    <div class="container-fluid px-4">
      <div className="row">
        <div className="col-sm-9 accountManagerContent-wrapper">
          <button
            class="btn btn-primary"
            id="addbutton"
            data-bs-toggle="modal"
            data-bs-target="#ViewModal"
            value="0"
            title="Add"
            onClick={onUserClickButton}
          >
            <span class="fa fa-plus-square"></span>
          </button>

          <table id="account-table" class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>$320,800</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                    value="1"
                    onClick={onUserClickButton}
                  >
                    <i class="far fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                    value="2"
                    onClick={onUserClickButton}
                  >
                    <i class="fas fa-user-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                    value="3"
                    onClick={onUserClickButton}
                  >
                    <i class="far fa-minus-square"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Garrett Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>$170,750</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="far fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="fas fa-user-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="far fa-minus-square"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Ashton Cox</td>
                <td>Junior Technical Author</td>
                <td>San Francisco</td>
                <td>$86,000</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="far fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="fas fa-user-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="far fa-minus-square"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Cedric Kelly</td>
                <td>Senior Javascript Developer</td>
                <td>Edinburgh</td>
                <td>$433,060</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="far fa-eye"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="fas fa-user-edit"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#ViewModal"
                  >
                    <i class="far fa-minus-square"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        <AccountModal type={type} />
        <div className="col-sm-3">
          <CalendarEmb />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
