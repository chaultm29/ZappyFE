import React from "react";
import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import bg from "../../assets/img/bg-home-scene-winter.svg";

export default function PlayGame() {
    return (
        <div
            style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom" }}>
            <Navigation />
            <div className="container" style={{ backgroundColor: "#fceced", borderRadius: "15px 15px 0px 0px", minHeight: "100vh" }}>
                <div class="row mt-2">
                    <div class="col-md-12">
                        <h1 class="tit"> Danh sách game </h1>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="button-history d-md-flex justify-content-md-end mt-3">
                            <button class="btn btn-secondary me-md-2 rounded-pill" type="button">Xem lịch sử</button>
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
