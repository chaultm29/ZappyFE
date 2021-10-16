import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import AccountModal from "./AccountModal.jsx";
import AccountServices from "../../services/AccountServices.jsx";

export default function AccountManagerContent() {
  const [type, setType] = useState("-1");
  const [dataAcc, setDataAcc] = useState([]);

  const onUserClickButton = (e) => {
    setType(e.currentTarget.value);
    console.log(type);
  };

  useEffect(() => {
    AccountServices.getListAccount()
      .then((res) => {
        res.data.map((record) => {
          record.action = (
            <div>
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
            </div>
          );
          setDataAcc((dataAcc) => [...dataAcc, record]);
          console.log(dataAcc);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const addAccount = (account) => {
    AccountServices.addAccount(account);
  };

  const onSubmitDataInContent = (submitData) => {
    console.log("Content", submitData);
    addAccount(submitData);
  };
  const getData = () => {
    return [...dataAcc];
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Enabled",
        accessor: "enable",
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
          <Table columns={columns} data={dataAcc} />
        </div>

        {/* View Modal */}
        <AccountModal
          type={type}
          onSubmitDataInContent={onSubmitDataInContent}
        />
        <div className="col-sm-3">
          <CalendarEmb />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
