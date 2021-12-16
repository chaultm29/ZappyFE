import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import AccountAddModal from "./AccountAddModal.jsx";
import AccountServices from "../../services/AccountServices.jsx";
import { useHistory } from "react-router-dom";
import AccountEditModal from "./AccountEditModal.jsx";
import AccountDeleteModal from "./AccountDeleteModal.jsx";
import AccountViewModal from "./AccountViewDetail.jsx";
import AccountConfirmResetPasswordModal from "./AccountConfirmResetPasswordModal.jsx";

export default function AccountManagerContent() {
  const [dataAcc, setDataAcc] = useState([]);
  const [accountDetail, setAccountDetail] = useState([]);

  const onClickGetAccountID = (e) => {
    return e.currentTarget.id;
  }
  const getAccountDetailByID = (accountId) => {
    AccountServices.getAccountByID(accountId).then((res) => {
      setAccountDetail(res.data);
    });
  }
  const onClickButton = (e) => {
    let accountId = onClickGetAccountID(e);
    getAccountDetailByID(accountId);
  }

  // get list account
  useEffect(() => {
    AccountServices.getListAccount()
      .then((res) => {
        setDataAcc(res.data);
      })
      .catch((err) => console.error(err));
  }, []);


  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        id: "row",
        Cell: (row) => { return <>{parseInt(row.row.id) + 1}</> }
      },
      {
        Header: "Tài khoản",
        accessor: "username",
      },
      {
        Header: "Ngày sinh",
        accessor: "dateOfBirth",
        Cell: ({ row }) => (<>{new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', }).format(new Date(row.values.dateOfBirth))}</>)
      },
      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Vai trò",
        accessor: "roleDTO.name",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Thao tác",
        accessor: "id",
        Cell: ({ row }) => (<>
          <button type="button" class="btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#ViewViewModal" id={row.values.id} style={{ backgroundColor: "#e98c89", borderColor: "#e98c89" }} onClick={onClickButton}>  <i class="far fa-eye"></i></button>
          <button type="button" class="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#ViewEditModal" id={row.values.id} onClick={onClickButton}> <i class="fas fa-user-edit"></i></button>
          <button type="button" class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#ViewDeleteModal" id={row.values.id} onClick={onClickButton}><i class="far fa-minus-square"></i></button>
        </>)
      },
    ],
  );
  const data = React.useMemo(() => dataAcc, [dataAcc]);
  return (
    <div class="container-fluid px-4">
      <div className="row">
        <div className="col-sm-9 accountManagerContent-wrapper">

          {dataAcc.length != 0 ? <>
            <button
              class="btn btn-primary"
              id="addbutton"
              data-bs-toggle="modal"
              data-bs-target="#ViewAddModal"
              title="Add">
              Thêm mới
            </button>
            <Table columns={columns} data={data} />

          </> : <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>}
        </div>

        {/* View Modal */}
        <AccountAddModal dataAcc={dataAcc} />
        <AccountViewModal accountDetail={accountDetail} />
        <AccountEditModal accountDetail={accountDetail} />
        <AccountDeleteModal accountDetail={accountDetail} />
        <AccountConfirmResetPasswordModal username={accountDetail.username} />
        <div className="col-sm-3">
          <CalendarEmb />
        </div>
      </div>
    </div>
  );
}
