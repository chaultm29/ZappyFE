import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import { useHistory } from "react-router-dom";
import QuestionAddModal from "./QuestionAddModal.jsx";
import QuestionViewModal from "./QuestionViewModal.jsx";
import QuestionEditModal from "./QuestionEditModal.jsx";
import LessonServices from "../../services/LessonServices.jsx";
import QuestionDeleteModal from "./QuestionDeleteModal.jsx";
import SweetAlert from 'react-bootstrap-sweetalert';

export default function QuestionManagerContent() {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [questionDetail, setQuestionDetail] = useState([]);
  const [msgErrorResponse, setMsgErrorResponse] = useState("");
  const history = useHistory();

  const onClickGetQuestionID = (e) => {
    return e.currentTarget.id;
  }

  const getQuestionDetailByID = (questionId) => {
    LessonServices.getQuestionByID(questionId).then((res) => {
      setQuestionDetail(res.data)
    }).catch((error) => {
      setMsgErrorResponse("Đã có lỗi xảy ra, vui lòng thử lại");
    });
  }
  const onClickButton = (e) => {
    let questionId = onClickGetQuestionID(e);
    getQuestionDetailByID(questionId);
  }



  // get list question
  useEffect(() => {
    LessonServices.getListQuestion()
      .then((res) => {
        setDataQuestion(res.data);
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
        Header: "Loại",
        accessor: "typeName",
        Filter: SelectColumnFilter,
        filter: "includes",
      },

      {
        Header: "Bài",
        accessor: "lessonName",
      },

      {
        Header: "Câu hỏi",
        accessor: "question",

      },
      {
        Header: "Thao tác",
        accessor: "questionID",
        Cell: ({ row }) => (<>
          <button type="button" class="btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#ViewViewModal" id={row.values.questionID} style={{ backgroundColor: "#e98c89", borderColor: "#e98c89" }} onClick={onClickButton}>  <i class="far fa-eye"></i></button>
          <button type="button" class="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#ViewEditModal" id={row.values.questionID} onClick={onClickButton}> <i class="fas fa-user-edit"></i></button>
          <button type="button" class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#ViewDeleteModal" id={row.values.questionID} onClick={onClickButton}><i class="far fa-minus-square"></i></button>
        </>)
      },
    ],
  );
  const data = React.useMemo(() => dataQuestion, [dataQuestion]);
  const hideAlertError = () => {
    setMsgErrorResponse("");
  }

  return (

    <div class="container-fluid px-4">
      <div class="alert-wrapper position-absolute" >
        {msgErrorResponse !== "" ?
          < SweetAlert danger title="Oupppss!" timeout={2000} onConfirm={hideAlertError}>
            {msgErrorResponse}
          </SweetAlert > : ""}
      </div>
      <div className="row">
        <div className="col-sm-9 accountManagerContent-wrapper">
          {dataQuestion.length != 0 ? <>
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
        <QuestionAddModal />
        <QuestionViewModal questionDetail={questionDetail} />
        <QuestionEditModal questionDetail={questionDetail} />
        <QuestionDeleteModal questionDetail={questionDetail} />

        <div className="col-sm-3">

          <CalendarEmb />
        </div>
      </div>
    </div>
  );
}
