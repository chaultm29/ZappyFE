
import React, { useState, useEffect, useRef } from 'react'
import AuthenticationService from '../../services/AuthenticationService';
import UserServices from '../../services/UserServices';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Profile({ isClicked }) {

    const [site, setSite] = useState("account");
    const [id, setId] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const inputFile = useRef(null);
    const [msgAPI, setMsgAPI] = useState("");
    const baseImg = "https://imgzappybucket.s3.ap-southeast-1.amazonaws.com/avatar/";

    useEffect(() => {
        if (isClicked) {
            UserServices.getProfile().then((res) => {
                console.log(`res.data`, res.data);
                setId(res.data.id);
                setDateOfBirth(res.data.dateOfBirth);
                setEmail(res.data.email);
                setFullName(res.data.fullName);
                setPhone(res.data.phone);
                setAvatar(baseImg + res.data.avatar);
            });
        }
    }, [isClicked])

    const onOptionChange = (e) => {
        let option = e.target.href;
        setSite(option);
    }

    const onFullNameChange = (e) => {
        let input = e.target.value;
        setFullName(input);
    }


    const onEmailChange = (e) => {
        let input = e.target.value;
        setEmail(input);
    }
    const onDateOfBirthChange = (e) => {
        let input = e.target.value;
        setDateOfBirth(input);
    }
    const onPhoneChange = (e) => {
        let input = e.target.value;
        setPhone(input);
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                console.log(`hihi`);
                document.getElementById("img").src = reader.result;
                setImageUpload(e.target.files[0]);
                setAvatar(e.target.files[0].name);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    // const upload = () => {
    //     S3FileUpload.uploadFile(imageUpload, config).then((data) => {
    //         console.log(data.location);
    //     }).catch((err) => {
    //         alert(err);
    //     })
    // }

    const onSubmit = (e) => {
        console.log("hih")
        e.preventDefault();
        let profile = { id: id, dateOfBirth: dateOfBirth, email: email, fullName: fullName, phone: phone, avatar: avatar };
        console.log(`profile`, profile);
        UserServices.updateProfile(profile).then((res) => {
            if (res.status === 200) {
                setMsgAPI("Cập nhật thành công !");
            } else {
                setMsgAPI("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        });
    }




    return (
        <>
            {/* Profile Modal */}
            <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Tài khoản</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-0">
                                <div class="col-md-4 border-end h-100">
                                    <div class="avatar h-50 w-100 text-center" >

                                        <img id="img" src={avatar} class="img-fluid rounded mx-auto d-block" alt="..." />

                                        <a href="#upload" onClick={() => inputFile.current.click()} class="mx-auto">Thay đổi ảnh đại diện</a>
                                        <input type='file' id='file' ref={inputFile} class="d-none" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    </div>
                                    <div class="menu list-group list-group-item-action mt-2">
                                        <a href="#account" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-user"></i> Thông tin tài khoản</a>
                                        <a href="#achievement" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-award"></i> Thành tựu</a>
                                        <a href="#progress" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-chart-line"></i> Tiến độ học tập</a>

                                    </div>

                                </div>
                                <div class="col-md-8 h-100">
                                    {site.includes("account") &&
                                        <div class="card-body" >
                                            <h3 class="text-center">Thông tin tài khoản</h3>
                                            <span class="text-danger">{msgAPI}</span>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Họ và tên
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" defaultValue={fullName} onChange={onFullNameChange} />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Email
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" defaultValue={email} onChange={onEmailChange} />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Tên tài khoản
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" defaultValue={AuthenticationService.getCurrentUser()} disabled />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Ngày sinh
                                                </div>
                                                <div class="col-8">
                                                    <input type="date" class="form-control" defaultValue={dateOfBirth} onChange={onDateOfBirthChange} />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Số điện thoại
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" defaultValue={phone} onChange={onPhoneChange} />
                                                </div>
                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-12 text-center">
                                                    <button type="button" class="btn btn-light" onClick={onSubmit}>Cập nhật</button>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <a href="#changePassword" type="button" class="btn btn-link" onClick={onOptionChange}>Cập nhật mật khẩu</a>
                                                </div>
                                            </div>
                                        </div>}
                                    {site.includes("changePassword") &&
                                        <div class="card-body" >
                                            <h3 class="text-center">Cập nhật mật khẩu</h3>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Tên đăng nhập
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Mật khẩu cũ
                                                </div>
                                                <div class="col-8">
                                                    <input type="password" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Mật khẩu mới
                                                </div>
                                                <div class="col-8">
                                                    <input type="password" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Nhập lại mật khẩu mới
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
                                                    <a href="#account" type="button" class="btn btn-link" onClick={onOptionChange}>Quay lại</a>
                                                </div>
                                            </div>
                                        </div>}
                                    {site.includes("achievement") &&
                                        <div class="card-body">
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
                                        </div>}
                                    {site.includes("progress") &&
                                        <div class="card-body">
                                            <h3 class="text-center">Tiến độ học tập</h3>
                                            <div class="row row-cols-1 row-cols-md-3 g-1">
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Từ vựng</h5>
                                                            <CircularProgressbar value={66} text={`66%`} />
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
                                                            <CircularProgressbar value={66} text={`66%`} />
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
                                                            <CircularProgressbar value={66} text={`66%`} />
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
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
