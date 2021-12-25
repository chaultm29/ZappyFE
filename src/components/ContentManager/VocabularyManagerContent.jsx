import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import { useHistory } from "react-router-dom";
import LessonServices from "../../services/LessonServices.jsx";
import VocabularyAddModal from "./VocabularyAddModal.jsx";
import VocabularyViewModal from "./VocabularyViewModal.jsx";
import VocabularyEditModal from "./VocabularyEditModal.jsx";
import VocabularyDeleteModal from "./VocabularyDeleteModal.jsx";


export default function VocabularyManagerContent() {
    const [dataVocab, setDataKanji] = useState([]);
    const [vocabDetail, setVocabDetail] = useState([]);
    //   get list vocab
    useEffect(() => {
        LessonServices.getListVocabulary()
            .then((res) => {
                setDataKanji(res.data);
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
                Header: "Bài",
                accessor: "lessonName",
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Từ vựng",
                accessor: "vocabulary",
            },

            {
                Header: "Nghĩa",
                accessor: "meaning",

            },
            {
                Header: "Ví dụ",
                accessor: "example",

            },
            {
                Header: "Thao tác",
                accessor: "vocabularyId",
                Cell: ({ row }) => (<>
                    <button type="button" class="btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#ViewViewModal" id={row.values.vocabularyId} style={{ backgroundColor: "#e98c89", borderColor: "#e98c89" }} onClick={onClickButton}>  <i class="far fa-eye"></i></button>
                    <button type="button" class="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#ViewEditModal" id={row.values.vocabularyId} onClick={onClickButton}> <i class="fas fa-user-edit"></i></button>
                    <button type="button" class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#ViewDeleteModal" id={row.values.vocabularyId} onClick={onClickButton}><i class="far fa-minus-square"></i></button>
                </>)
            },
        ],
        []
    );
    const data = React.useMemo(() => dataVocab, [dataVocab]);

    const onClickGetVocabID = (e) => {
        return e.currentTarget.id;
    }

    const getVocabDetailByID = (vocabId) => {
        LessonServices.getVocabularyByID(vocabId).then((res) => {
            setVocabDetail(res.data)
        });
    }
    const onClickButton = (e) => {
        let vocabId = onClickGetVocabID(e);
        getVocabDetailByID(vocabId);
    }
    return (
        <div class="container-fluid px-4">
            <div className="row">
                <div className="col-sm-9 accountManagerContent-wrapper">
                    {dataVocab.length !== 0 ? <>
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

                {/* Modal */}
                <VocabularyAddModal />
                <VocabularyViewModal vocabDetail={vocabDetail} />
                <VocabularyEditModal vocabDetail={vocabDetail} />
                <VocabularyDeleteModal vocabDetail={vocabDetail} />

                <div className="col-sm-3">
                    <CalendarEmb />

                </div>
            </div>
        </div>
    )
}
