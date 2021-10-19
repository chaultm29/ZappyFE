import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import AccountModal from "./AccountModal.jsx";
import AccountServices from "../../services/AccountServices.jsx";
import { useHistory } from "react-router-dom";

export default function AccountManagerContent() {
  const [type, setType] = useState("-1");
  const [dataAcc, setDataAcc] = useState([]);
  const [accountId, setAccountId] = useState(0);
  const [account, setAccount] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const history = useHistory();

  const onUserClickAddButton = (e) => {
    setType(e.currentTarget.value);
  };
  const onSubmitDataAccount = (submitData) => {
    if (submitData.id) {
      AccountServices.editAccount(submitData, submitData.id);
      history.go(0);
    } else {
      AccountServices.addAccount(submitData);
      history.go(0);
    }
  };

  // view account
  const onUserClickViewButton = (e) => {
    setType(e.currentTarget.value);
    setAccountId(e.currentTarget.id);
  };
  useEffect(() => {
    if (accountId > 0) {
      AccountServices.getAccountByID(accountId).then((res) => {
        setAccount(res.data);
      });
    }
  }, [accountId]);

  const onUserClickEditButton = (e) => {
    setAccountId(e.currentTarget.id);
    setType(e.currentTarget.value);
  };

  const onUserClickDeleteButton = (e) => {
    setType(e.currentTarget.value);
    setAccountId(e.currentTarget.id);
  };
  useEffect(() => {
    if (isDelete) {
      AccountServices.deleteAccount(accountId);
      history.go(0);
    }
  }, [isDelete]);

  // get list account
  useEffect(() => {
    AccountServices.getListAccount()
      .then((res) => {
        res.data.map((record) => {
          record.action = (
            <div>
              <button
                type="button"
                class="btn btn-primary mx-1"
                data-bs-toggle="modal"
                data-bs-target="#ViewModal"
                value="1"
                id={record.id}
                onClick={onUserClickViewButton}
              >
                <i class="far fa-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-success mx-1"
                data-bs-toggle="modal"
                data-bs-target="#ViewModal"
                value="2"
                id={record.id}
                onClick={onUserClickEditButton}
              >
                <i class="fas fa-user-edit"></i>
              </button>
              <button
                type="button"
                class="btn btn-danger mx-1"
                data-bs-toggle="modal"
                data-bs-target="#ViewModal"
                value="3"
                id={record.id}
                onClick={onUserClickDeleteButton}
              >
                <i class="far fa-minus-square"></i>
              </button>
            </div>
          );
          setDataAcc((dataAcc) => [...dataAcc, record]);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // get value from form

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
            onClick={onUserClickAddButton}
          >
            <span class="fa fa-plus-square"></span>
          </button>
          <Table columns={columns} data={dataAcc} />
        </div>

        {/* View Modal */}
        <AccountModal
          type={type}
          onSubmitDataAccount={onSubmitDataAccount}
          account={account}
          setIsDelete={setIsDelete}
        />
        <div className="col-sm-3">
          <CalendarEmb />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
