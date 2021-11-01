import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import { useHistory } from "react-router-dom";
import LessonServices from "../../services/LessonServices.jsx";

export default function LessonManagerContent() {
  const [type, setType] = useState("-1");
  const [dataLesson, setDataLesson] = useState([]);
  //   const [accountId, setAccountId] = useState(0);
  //   const [account, setAccount] = useState([]);
  //   const [isDelete, setIsDelete] = useState(false);
  const history = useHistory();


  //   get list lesson
  useEffect(() => {
    LessonServices.getListVocabulary()
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
              // onClick={onUserClickViewButton}
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
              // onClick={onUserClickEditButton}
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
              // onClick={onUserClickDeleteButton}
              >
                <i class="far fa-minus-square"></i>
              </button>
            </div>
          );
          setDataLesson((dataLesson) => [...dataLesson, record]);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // get value from form

  const getData = () => {
    return [...dataLesson];
  };

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "",
  //       accessor: "username",
  //     },
  //     {
  //       Header: "Ngày sinh",
  //       accessor: "dateOfBirth",
  //     },
  //     {
  //       Header: "Email",
  //       accessor: "email",
  //     },

  //     {
  //       Header: "Vai trò",
  //       accessor: "role",
  //       Filter: SelectColumnFilter,
  //       filter: "includes",
  //     },
  //     {
  //       Header: "Thao tác",
  //       accessor: "action",
  //     },
  //   ],
  //   []
  // );
  // const data = React.useMemo(() => getData(), []);
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
          // onClick={onUserClickAddButton}
          >
            Thêm mới
          </button>
          {/* <Table columns={columns} data={dataAcc} /> */}
        </div>

        {/* View Modal */}

        <div className="col-sm-3">
          <CalendarEmb />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
