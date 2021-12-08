import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import LessonServices from "../../services/LessonServices.jsx";
import KanjiViewModal from "./KanjiViewModal.jsx";
import KanjiAddModal from "./KanjiAddModal.jsx";
import KanjiEditModal from "./KanjiEditModal.jsx";
import KanjiDeleteModal from "./KanjiDeleteModal.jsx";




export default function KanjiManagerContent() {
  const [dataKanji, setDataKanji] = useState([]);
  const [kanjiDetail, setKanjiDetail] = useState([]);



  const onClickGetKanjiID = (e) => {
    return e.currentTarget.id;
  }

  const getKanjiDetailByID = (kanjiId) => {
    LessonServices.getKanjiByID(kanjiId).then((res) => {
      setKanjiDetail(res.data)
    });
  }
  const onClickButton = (e) => {
    let kanjiId = onClickGetKanjiID(e);
    getKanjiDetailByID(kanjiId);
  }

  //   get list kanji
  useEffect(() => {
    LessonServices.getListKanji()
      .then((res) => {
        setDataKanji(res.data)
      })
      .catch((err) => console.error(err));
  }, []);




  const getData = () => {
    return [...dataKanji];
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        id: "row",
        Cell: (row) => { return <>{parseInt(row.row.id) + 1}</> }
      },
      {
        Header: "Bài",
        accessor: "lessonName",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Hán tự",
        accessor: "character",
      },

      {
        Header: "Âm Hán",
        accessor: "chinese",

      },
      {
        Header: "Nghĩa",
        accessor: "vietnamese",

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
    []
  );
  const data = React.useMemo(() => getData(), []);


  return (
    <div class="container-fluid px-4">
      <div className="row">
        <div className="col-sm-9 accountManagerContent-wrapper">
          {dataKanji.length != 0 ? <>
            <button
              class="btn btn-primary"
              id="addbutton"
              data-bs-toggle="modal"
              data-bs-target="#ViewAddModal"
              title="Add">
              Thêm mới
            </button>
            <Table columns={columns} data={dataKanji} />

          </> : <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>}
        </div>

        {/* Modal */}
        <KanjiAddModal />
        <KanjiViewModal kanjiDetail={kanjiDetail} />
        <KanjiEditModal kanjiDetail={kanjiDetail} />
        <KanjiDeleteModal kanjiDetail={kanjiDetail} />

        <div className="col-sm-3">
          <CalendarEmb />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
