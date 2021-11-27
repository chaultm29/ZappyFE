import React, { useState } from "react";
import Navigation from "../../components/Student/Navigation";
import bg from "../../assets/img/bg-home-scene-winter.svg";
import BingoGame from "../../components/Student/BingoGame";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import GameService from "../../services/GameService";


export default function PlayGame() {
    const [listHistory, setListHistory] = useState([]);
    const DATE_OPTIONS = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const onClickShowHistory = () => {
        GameService.getRecord().then((res) => setListHistory(res.data));
    }
    return (
        <div
            style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom" }}>
            <Navigation />
            <div className="container" style={{ backgroundColor: "#fceced", borderRadius: "15px 15px 0px 0px", minHeight: "100vh" }}>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <h1 class="tit"> Danh sách game </h1>
                        <div class="button-history d-md-flex justify-content-md-end mt-3">
                            <button class="btn btn-secondary me-md-2 rounded-pill" type="button" data-bs-toggle="modal" data-bs-target="#historyModal" onClick={onClickShowHistory}>Xem lịch sử</button>
                        </div>

                        {/* Modal  */}
                        <div class="modal fade" id="historyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Lịch sử chơi game</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <table class="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Tên game</th>
                                                    <th scope="col">Điểm</th>
                                                    <th scope="col">Thời lượng</th>
                                                    <th scope="col">Thời gian</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listHistory.length > 0 ? (listHistory.map((history, index) => (
                                                    <>
                                                        <tr key={index}>
                                                            <th scope="row">{index}</th>
                                                            <td>{history.gameName}</td>
                                                            <td>{history.score}</td>
                                                            <td class="text-center">{parseInt(history.timePlayed / 60) + ":" + (history.timePlayed % 60 < 10 ? "0" + history.timePlayed % 60 : history.timePlayed % 60)}</td>
                                                            <td>{new Date(history.timeCreated).toLocaleDateString("vi-VN", DATE_OPTIONS)}</td>
                                                        </tr>
                                                    </>
                                                ))) : ""}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-2 mt-3">
                            <div className="col">
                                <div class="card mb-3 shadow">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            {/* <img src="..." class="img-fluid rounded-start" alt="..." /> */}
                                            <svg class="bd-placeholder-img img-fluid rounded-start" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="43%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">Bingo Game</h5>
                                                <p class="card-text">Ghi cái mô tả vào đây :))</p>
                                                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}

                                                <div class="d-md-flex justify-content-md-end">
                                                    <Link to="/game" class="btn btn-danger me-3"> Chơi game </Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div class="card mb-3 shadow">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            {/* <img src="..." class="img-fluid rounded-start" alt="..." /> */}
                                            <svg class="bd-placeholder-img img-fluid rounded-start" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="43%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">Memory Game</h5>
                                                <p class="card-text">Là cái game khó ẻ, chưa kịp đọc đã bắt nhớ</p>
                                                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                                <div class="d-md-flex justify-content-md-end">
                                                    <Link to="/testMemory" class="btn btn-danger me-3"> Chơi game </Link>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="col">
                                <div class="card mb-3 shadow">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            {/* <img src="..." class="img-fluid rounded-start" alt="..." /> */}
                                            <svg class="bd-placeholder-img img-fluid rounded-start" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="43%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">Bingo Game</h5>
                                                <p class="card-text">Ghi cái mô tả vào đây :))</p>
                                                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}

                                                <div class="d-md-flex justify-content-md-end">
                                                    <button class="btn btn-danger me-3">Chơi game</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div class="card mb-3 shadow">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            {/* <img src="..." class="img-fluid rounded-start" alt="..." /> */}
                                            <svg class="bd-placeholder-img img-fluid rounded-start" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="43%" y="50%" fill="#dee2e6" dy=".3em">Image</text></svg>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">Memory Game</h5>
                                                <p class="card-text">Là cái game khó ẻ, chưa kịp đọc đã bắt nhớ</p>
                                                {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                                <div class="d-md-flex justify-content-md-end">
                                                    <button class="btn btn-danger me-3">Chơi game</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
