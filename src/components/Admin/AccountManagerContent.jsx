import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import AccountModal from "./AccountModal.jsx";

export default function AccountManagerContent() {
  const [type, setType] = useState("-1");
  const onUserClickButton = (e) => {
    setType(e.currentTarget.value);
    console.log(type);
  };
  const getData = () => {
    const data = [
      {
        name: "Jane Cooper",
        email: "jane.cooper@example.com",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        status: "Active",
        role: "Admin",
        imgUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
        action: (
          <div>
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
          </div>
        ),
      },
      {
        name: "Cody Fisher",
        email: "cody.fisher@example.com",
        title: "Product Directives Officer",
        department: "Intranet",
        status: "Active",
        role: "Owner",
        imgUrl:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Esther Howard",
        email: "esther.howard@example.com",
        title: "Forward Response Developer",
        department: "Directives",
        status: "Active",
        role: "Member",
        imgUrl:
          "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Jenny Wilson",
        email: "jenny.wilson@example.com",
        title: "Central Security Manager",
        department: "Program",
        status: "Active",
        role: "Member",
        imgUrl:
          "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Kristin Watson",
        email: "kristin.watson@example.com",
        title: "Lean Implementation Liaison",
        department: "Mobility",
        status: "Active",
        role: "Admin",
        imgUrl:
          "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Cameron Williamson",
        email: "cameron.williamson@example.com",
        title: "Internal Applications Engineer",
        department: "Security",
        status: "Active",
        role: "Member",
        imgUrl:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
    ];
    return [...data, ...data, ...data];
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );
  const data = React.useMemo(() => getData(), []);
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
          <Table columns={columns} data={data} />

          {/* <table id="account-table" class="table table-striped">
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
          </table> */}
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
