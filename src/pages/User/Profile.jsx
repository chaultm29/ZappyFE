

import React, { Component } from 'react'

export default class Profile extends Component {
    render() {


        return (
            <>
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#profileModal"
                >
                    Infomation
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#achievemnentModal"
                >
                    Achievement
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#progressModal"
                >
                    Progress
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#friendModal"
                >
                    Friend
                </button>
                {/* Profile Modal */}
                <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Tài khoản</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row g-0 h-50">
                                    <div class="col-md-4 border-end">
                                        <div class="avatar h-50 w-100 text-center" >
                                            <svg class="bd-placeholder-img rounded mx-auto d-block" width="200" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 200x200" preserveAspectRatio="xMidYMid slice" focusable="false">
                                                <title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect>
                                            </svg>
                                            {/* <img src="..." class="img-fluid rounded mx-auto d-block" alt="..." /> */}
                                            {/* <br /> */}
                                            <a href="" class="mx-auto">Thay đổi ảnh đại diện</a>
                                        </div>
                                        <div id="scollspy" class="menu list-group list-group-item-action">
                                            <a href="#account" type="button" class="list-group-item list-group-item-action active px-2" aria-current="true">
                                                <i class="fas fa-user"></i> Thông tin tài khoản
                                            </a>
                                            <a href="#achievement" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-award"></i> Thành tựu</a>
                                            <a href="#progress" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-chart-line"></i> Tiến độ học tập</a>
                                            <a href="#friend" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-user-friends"></i> Bạn bè</a>

                                        </div>

                                        {/*  do data vao phan input tuong ung, cu phap : value = "..." */}
                                    </div>
                                    <div class="col-md-8 overflow-auto h-50">
                                        <div class="card-body" data-bs-spy="scroll" data-bs-target="#scrollspy" data-bs-offset="0" tabindex="0">
                                            <h3 class="text-center">Thông tin tài khoản</h3>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Họ và tên
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Email
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Tên tài khoản
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Ngày sinh
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Số điện thoại
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-12 text-center">
                                                    <button type="button" class="btn btn-light">Cập nhật</button>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <button type="button" class="btn btn-link">Cập nhật mật khẩu</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievement Modal */}
                <div class="modal fade" id="achievemnentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Tài khoản</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row g-0">
                                    <div class="col-md-4 border-end  overflow-auto">
                                        <div class="avatar h-50 w-100 text-center" >
                                            <svg class="bd-placeholder-img rounded mx-auto d-block" width="200" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 200x200" preserveAspectRatio="xMidYMid slice" focusable="false">
                                                <title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect>
                                            </svg>
                                            {/* <img src="..." class="img-fluid rounded mx-auto d-block" alt="..." /> */}
                                            {/* <br /> */}
                                            <a href="" class="mx-auto">Thay đổi ảnh đại diện</a>
                                        </div>
                                        <div id="scollspy" class="menu list-group list-group-item-action">
                                            <a href="#account" type="button" class="list-group-item list-group-item-action active px-2" aria-current="true">
                                                <i class="fas fa-user"></i> Thông tin tài khoản
                                            </a>
                                            <a href="#achievement" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-award"></i> Thành tựu</a>
                                            <a href="#progress" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-chart-line"></i> Tiến độ học tập</a>
                                            <a href="#friend" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-user-friends"></i> Bạn bè</a>

                                        </div>

                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body" data-bs-spy="scroll" data-bs-target="#scrollspy" data-bs-offset="0" tabindex="0">
                                            <h3 class="text-center">Thành tựu</h3>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Số thứ tự</th>
                                                        <th scope="col">Thành tựu đạt được</th>
                                                        <th scope="col">Ngày</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>

                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                            <div class="count-policy position-absolute bottom-0 end-0 mb-3 me-3" >
                                                <button type="button" class="btn btn-link">Cách tính thành tựu</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Modal */}
                <div class="modal fade" id="progressModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Tài khoản</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body h-50">
                                <div class="row g-0">
                                    <div class="col-md-3 border-end  overflow-auto">
                                        <div class="avatar w-100 text-center" >
                                            <svg class="bd-placeholder-img rounded mx-auto d-block" width="100" height="100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 200x200" preserveAspectRatio="xMidYMid slice" focusable="false">
                                                <title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect>
                                            </svg>
                                            {/* <img src="..." class="img-fluid rounded mx-auto d-block" alt="..." /> */}
                                            {/* <br /> */}
                                            <a href="" class="mx-auto">Thay đổi ảnh đại diện</a>
                                        </div>
                                        <div id="scollspy" class="menu list-group list-group-item-action">
                                            <a href="#account" type="button" class="list-group-item list-group-item-action active px-2" aria-current="true">
                                                <i class="fas fa-user"></i> Thông tin tài khoản
                                            </a>
                                            <a href="#achievement" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-award"></i> Thành tựu</a>
                                            <a href="#progress" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-chart-line"></i> Tiến độ học tập</a>
                                            <a href="#friend" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-user-friends"></i> Bạn bè</a>

                                        </div>


                                    </div>
                                    <div class="col-md-9 overflow-auto">
                                        <div class="card-body" data-bs-spy="scroll" data-bs-target="#scrollspy" data-bs-offset="0" tabindex="0">
                                            <h3 class="text-center">Tiến độ học tập</h3>
                                            <div class="row row-cols-1 row-cols-md-3 g-1">
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Từ vựng</h5>
                                                            <p>Chỗ để vòng tròn progress </p>
                                                            <ul class="list-group list-group-flush">
                                                                <li class="list-group-item border-bottom p-2">Bài 1 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 2 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 3 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 4 : 50%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 5 : 50%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 6 : 0%</li>
                                                                <li class="list-group-item p-2 ">Bài 7 : 0%</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Ngữ pháp</h5>
                                                            <p>Chỗ để vòng tròn progress </p>
                                                            <ul class="list-group list-group-flush">
                                                                <li class="list-group-item border-bottom p-2">Bài 1 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 2 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 3 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 4 : 50%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 5 : 50%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 6 : 0%</li>
                                                                <li class="list-group-item p-2 ">Bài 7 : 0%</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Chữ hán</h5>
                                                            <p>Chỗ để vòng tròn progress </p>
                                                            <ul class="list-group list-group-flush">
                                                                <li class="list-group-item border-bottom p-2">Bài 1 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 2 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 3 : 100%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 4 : 50%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 5 : 50%</li>
                                                                <li class="list-group-item border-bottom p-2">Bài 6 : 0%</li>
                                                                <li class="list-group-item p-2 ">Bài 7 : 0%</li>
                                                            </ul>
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
                {/* Friend Modal */}
                <div class="modal fade" id="friendModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Tài khoản</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row g-0">
                                    <div class="col-md-4 border-end  overflow-auto">
                                        <div class="avatar h-50 w-100 text-center" >
                                            <svg class="bd-placeholder-img rounded mx-auto d-block" width="200" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 200x200" preserveAspectRatio="xMidYMid slice" focusable="false">
                                                <title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect>
                                            </svg>
                                            {/* <img src="..." class="img-fluid rounded mx-auto d-block" alt="..." /> */}
                                            {/* <br /> */}
                                            <a href="" class="mx-auto">Thay đổi ảnh đại diện</a>
                                        </div>
                                        <div id="scollspy" class="menu list-group list-group-item-action">
                                            <a href="#account" type="button" class="list-group-item list-group-item-action active px-2" aria-current="true">
                                                <i class="fas fa-user"></i> Thông tin tài khoản
                                            </a>
                                            <a href="#achievement" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-award"></i> Thành tựu</a>
                                            <a href="#progress" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-chart-line"></i> Tiến độ học tập</a>
                                            <a href="#friend" type="button" class="list-group-item list-group-item-action px-2"><i class="fas fa-user-friends"></i> Bạn bè</a>

                                        </div>

                                        {/*  do data vao phan input tuong ung, cu phap : value = "..." */}
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body" data-bs-spy="scroll" data-bs-target="#scrollspy" data-bs-offset="0" tabindex="0">
                                            <h3 class="text-center">Danh sách bạn bè</h3>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Họ và tên
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Email
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Tên tài khoản
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Ngày sinh
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Số điện thoại
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-12 text-center">
                                                    <button type="button" class="btn btn-light">Cập nhật</button>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <button type="button" class="btn btn-link">Cập nhật mật khẩu</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

