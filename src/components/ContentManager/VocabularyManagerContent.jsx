import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";
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
                res.data.map((record) => {
                    record.action = (
                        <div>
                            <button
                                type="button"
                                class="btn btn-primary mx-1"
                                data-bs-toggle="modal"
                                data-bs-target="#ViewViewModal"
                                id={record.vocabularyId}
                                onClick={onClickButton}
                            >
                                <i class="far fa-eye"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-success mx-1"
                                data-bs-toggle="modal"
                                data-bs-target="#ViewEditModal"
                                id={record.vocabularyId}
                                onClick={onClickButton}
                            >
                                <i class="fas fa-user-edit"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger mx-1"
                                data-bs-toggle="modal"
                                data-bs-target="#ViewDeleteModal"
                                id={record.vocabularyId}
                                onClick={onClickButton}
                            >
                                <i class="far fa-minus-square"></i>
                            </button>
                        </div>
                    );
                    setDataKanji((dataVocab) => [...dataVocab, record]);
                });
            })
            .catch((err) => console.error(err));
    }, []);
    const getData = () => {
        return [...dataVocab];
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "vocabularyId",
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
                accessor: "action",
            },
        ],
        []
    );
    const data = React.useMemo(() => getData(), []);

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
        console.log(vocabId);
        getVocabDetailByID(vocabId);
    }
    return (
        <div class="container-fluid px-4">
            <div className="row">
                <div className="col-sm-9 accountManagerContent-wrapper">
                    {dataVocab.length != 0 ? <>
                        <button
                            class="btn btn-primary"
                            id="addbutton"
                            data-bs-toggle="modal"
                            data-bs-target="#ViewAddModal"
                            title="Add">
                            Thêm mới
                        </button>
                        <Table columns={columns} data={dataVocab} />

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
                    <Schedule />
                </div>
            </div>
        </div>
    )
}
