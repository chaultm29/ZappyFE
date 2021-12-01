import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import { useHistory } from "react-router-dom";
import QuestionAddModal from "./QuestionAddModal.jsx";
import QuestionViewModal from "./QuestionViewModal.jsx";
import QuestionEditModal from "./QuestionEditModal.jsx";
import LessonServices from "../../services/LessonServices.jsx";
import QuestionDeleteModal from "./QuestionDeleteModal.jsx";

export default function QuestionManagerContent() {
  const [dataQuestion, setDataQuestion] = useState([]);
  const [questionDetail, setQuestionDetail] = useState([]);

  const history = useHistory();

  const onClickGetQuestionID = (e) => {
    return e.currentTarget.id;
  }

  const getQuestionDetailByID = (questionId) => {
    LessonServices.getQuestionByID(questionId).then((res) => {
      setQuestionDetail(res.data)
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
        res.data.map((record) => {
          record.action = (
            <div>
              <button
                type="button"
                class="btn btn-primary mx-1"
                data-bs-toggle="modal"
                data-bs-target="#ViewViewModal"
                value="1"
                id={record.questionID}
                onClick={onClickButton}
              >
                <i class="far fa-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-success mx-1"
                data-bs-toggle="modal"
                data-bs-target="#ViewEditModal"
                value="2"
                id={record.questionID}
                onClick={onClickButton}
              >
                <i class="fas fa-user-edit"></i>
              </button>
              <button
                type="button"
                class="btn btn-danger mx-1"
                data-bs-toggle="modal"
                data-bs-target="#ViewDeleteModal"
                value="3"
                id={record.questionID}
                onClick={onClickButton}
              >
                <i class="far fa-minus-square"></i>
              </button>
            </div>
          );
          setDataQuestion((dataQuestion) => [...dataQuestion, record]);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  // get value from form

  const getData = () => {
    return [...dataQuestion];
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "questionID",
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
        accessor: "action",
      },
    ],
    []
  );
  const data = React.useMemo(() => dataQuestion, [dataQuestion]);
  return (
    <div class="container-fluid px-4">
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
          <Schedule />
        </div>
      </div>
    </div>
  );
}
