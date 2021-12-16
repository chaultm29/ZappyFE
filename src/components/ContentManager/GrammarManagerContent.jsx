
import React, { useState, useEffect } from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Table, { SelectColumnFilter } from "../UI/Table.jsx";
import { useHistory } from "react-router-dom";
import LessonServices from "../../services/LessonServices.jsx";
import GrammarAddModal from "./GrammarAddModal.jsx";
import GrammarViewModal from "./GrammarViewModal.jsx";
import GrammarEditModal from "./GrammarEditModal.jsx";
import GrammarDeleteModal from "./GrammarDeleteModal.jsx";

export default function GrammarManagerContent() {
    const [dataGrammar, setDataGrammar] = useState([]);
    const [grammarDetail, setGrammarDetail] = useState([]);

    const onClickGetGrammarID = (e) => {
        return e.currentTarget.id;
    }
    const getGrammarDetailByID = (grammarId) => {
        LessonServices.getGrammarByID(grammarId).then((res) => {
            setGrammarDetail(res.data)
        });
    }
    const onClickButton = (e) => {
        let grammarId = onClickGetGrammarID(e);
        getGrammarDetailByID(grammarId);
    }

    //   get list grammar
    useEffect(() => {
        LessonServices.getListGrammar()
            .then((res) => {
                setDataGrammar(res.data)
            })
            .catch((err) => console.error(err));
    }, []);
    const getData = () => {
        return [...dataGrammar];
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
                Header: "Ngữ pháp",
                accessor: "grammar",
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
                    {dataGrammar.length != 0 ? <>
                        <button
                            class="btn btn-primary"
                            id="addbutton"
                            data-bs-toggle="modal"
                            data-bs-target="#ViewAddModal"
                            title="Add">
                            Thêm mới
                        </button>
                        <Table columns={columns} data={dataGrammar} />

                    </> : <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                </div>

                {/* Modal */}
                <GrammarAddModal />
                <GrammarViewModal grammarDetail={grammarDetail} />
                <GrammarEditModal grammarDetail={grammarDetail} />
                <GrammarDeleteModal grammarDetail={grammarDetail} />

                <div className="col-sm-3">
                    <CalendarEmb />

                </div>
            </div>
        </div>
    )
}
