
import React, { useState, useEffect, useRef } from 'react'
import AuthenticationService from '../../services/AuthenticationService';
import UserServices from '../../services/UserServices';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import S3FileUpload from 'react-s3';
import S3Config from '../../services/S3Config.js';
import noImage from "../../assets/img/noImage.png"

export default function Profile({ isClicked }) {
    const [userRole, setUserRole] = useState(AuthenticationService.getRoleName());
    const [site, setSite] = useState("account");
    const [id, setId] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [reNewPass, setReNewPass] = useState("");
    const [imageUpload, setImageUpload] = useState("");
    const inputFile = useRef(null);
    const [msgAPIUpdate, setMsgAPIUpdate] = useState("");
    const [msgAPIPass, setMsgAPIPass] = useState("");
    const [validationUpdateMsg, setValidationUpdateMsg] = useState('');
    const [validationPassMsg, setValidationPassMsg] = useState('');
    const [progress, setProgress] = useState("");
    const [achievement, setAchievement] = useState("");


    const [config, setConfig] = useState({});
    useEffect(() => {
        if (isClicked) {
            S3Config.getConfig().then((res) => {
                setConfig({
                    bucketName: res.data[0].value,
                    dirName: 'Avatar',
                    region: res.data[1].value,
                    accessKeyId: res.data[2].value,
                    secretAccessKey: res.data[3].value
                })
            });
        }
    }, [isClicked])

    const upload = (file) => {
        const msg = {};
        S3FileUpload.uploadFile(file, config).then((data) => {
        }).catch((err) => {
            msg.err = err;
        })
        if (Object.keys(msg).length === 1) return false;
        return true;
    }

    useEffect(() => {
        if (isClicked) {
            UserServices.getProfile().then((res) => {
                setId(res.data.id);
                setDateOfBirth(res.data.dateOfBirth);
                setEmail(res.data.email);
                setFullName(res.data.fullName);
                setPhone(res.data.phone);
                setAvatar(res.data.avatar);
            });

            if (userRole === "Student") {
                UserServices.getProgress().then((res) => {
                    setProgress(res.data);
                })
                UserServices.getAchievement().then((res) => {
                    setAchievement(res.data);
                })
            }
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
        let input = e.target.value.toLowerCase();
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
    const onOldPassChange = (e) => {
        let input = e.target.value;
        setOldPass(input);
    }
    const onNewPassChange = (e) => {
        let input = e.target.value;
        setNewPass(input);
    }
    const onReNewPassChange = (e) => {
        let input = e.target.value;
        setReNewPass(input);
    }


    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageUpload(e.target.files[0]);
                setAvatar(e.target.files[0].name);
                document.getElementById("imgProfile").src = reader.result;
            }

        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

    }


    const validateUpdate = () => {
        setValidationUpdateMsg('');
        const msg = {};
        var validateFullname = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
        var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        var validatePhone = /(0)+([0-9]{9})\b/;
        var inputDate = new Date(dateOfBirth);
        var today = new Date();

        if (fullName.length === 0) {
            msg.fullName = "Không được để trống";
        } else if (!validateFullname.test(fullName)) {
            msg.fullName = "Không được bao gồm số và kí tự đặc biệt";
        } else if (fullName.length < 1 || fullName.length > 50) {
            msg.fullName = "Độ dài từ 1-50 kí tự";
        }
        if (email.length === 0) {
            msg.email = "Không được để trống";
        } else if (!validateEmail.test(email)) {
            msg.email = "Cần bao gồm '@ .' và không được chứa dấu cách";
        }
        if (phone.length === 0) {
            msg.phone = "Không được để trống";
        }
        else if (!validatePhone.test(phone)) {
            msg.phone = "Độ dài 10 số, không bao gồm kí tự đặc biệt và dấu cách";
        }
        if (dateOfBirth.length > 0 && inputDate >= today) {
            msg.dob = "Cần chọn ngày sinh nhỏ hơn hiện tại";
        }
        setValidationUpdateMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const validateChangePass = () => {
        setValidationPassMsg('');
        const msg = {};
        var validatePassword = /^[a-z\d\S]+$/i;
        if (oldPass.length === 0) {
            msg.oldPass = "Không được để trống";
        }
        if (newPass.length === 0) {
            msg.newPass = "Không được để trống";
        } else if (newPass.length < 8 || newPass.length > 20) {
            msg.newPass = "Độ dài từ 8-20 kí tự"
        } else if (!validatePassword.test(newPass)) {
            msg.newPass = "Không được chứa dấu cách";
        }
        if (reNewPass.length === 0) {
            msg.reNewPass = "Không được để trống";
        } else if (reNewPass !== newPass) {
            msg.reNewPass = "Mật khẩu không khớp";
        }
        setValidationPassMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateUpdate();
        if (!isValid) return;
        let profile = { id: id, dateOfBirth: dateOfBirth, email: email.trim(), fullName: fullName.trim(), phone: phone.trim(), avatar: avatar };
        const uploadImageSuccess = upload(imageUpload);
        if (uploadImageSuccess) {
            UserServices.updateProfile(profile).then((res) => {
                if (res.status === 200) {
                    if (res.data.includes("thành công")) {
                        setMsgAPIUpdate("Cập nhật thành công !");
                    } else if (res.data.includes("tồn tại")) {
                        setMsgAPIUpdate(res.data);
                    }
                } else {
                    setMsgAPIUpdate("Đã có lỗi xảy ra, vui lòng thử lại");
                }
            });
        } else {
            setMsgAPIUpdate("Đã có lỗi xảy ra, vui lòng thử lại");
        }
    }
    const onSubmitPassword = (e) => {
        e.preventDefault();
        const isValid = validateChangePass();
        if (!isValid) return;
        let changePassword = { newPassword: newPass, oldPassword: oldPass };
        UserServices.changePassword(changePassword).then((res) => {
            if (res.data === true) {
                setMsgAPIPass("Cập nhật mật khẩu thành công !");
            } else {
                setMsgAPIPass("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        });
    }

    return (
        <>
            {/* Profile Modal */}
            <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModal" aria-hidden="true">
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

                                        <img id="imgProfile" src={avatar ? S3Config.baseURLAvatar + avatar : noImage} class="img-fluid rounded mx-auto d-block" alt="..." />

                                        <a href="javascript:void(0)" onClick={() => inputFile.current.click()} class="mx-auto">Thay đổi ảnh đại diện</a>
                                        {avatar && <>     <span class="text-muted px-1">  |  </span>
                                            <a href="javascript:void(0)" onClick={() => setAvatar("")}>Xóa bỏ</a> </>}
                                        <input type='file' id='file' ref={inputFile} class="d-none" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    </div>
                                    <div class="menu list-group list-group-item-action mt-2">

                                        {userRole === "Student" ?
                                            <>
                                                <a href="#account" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-user"></i> Thông tin tài khoản</a>
                                                <a href="#achievement" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-award"></i> Thành tựu</a>
                                                <a href="#progress" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-chart-line"></i> Tiến độ học tập</a> </>
                                            : ""}


                                    </div>

                                </div>
                                <div class="col-md-8 h-100">
                                    {site.includes("account") &&
                                        <div class="card-body" >
                                            <h3 class="text-center">Thông tin tài khoản</h3>
                                            <span class="text-danger">{msgAPIUpdate}</span>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Họ và tên
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" value={fullName} onChange={onFullNameChange} />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.fullName}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Email
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" value={email} onChange={onEmailChange} />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.email}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Tên tài khoản
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" value={AuthenticationService.getCurrentUser()} disabled />

                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Ngày sinh
                                                </div>
                                                <div class="col-8">
                                                    <input type="date" class="form-control" value={dateOfBirth} onChange={onDateOfBirthChange} />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.dob}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Số điện thoại
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" value={phone} onChange={onPhoneChange} />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.phone}</p>
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
                                            <span class="text-danger">{msgAPIPass}</span>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Mật khẩu cũ
                                                </div>
                                                <div class="col-8">
                                                    <input type="password" class="form-control" onChange={onOldPassChange} autoComplete="new-password" />
                                                    <p class="text-danger mb-0">{validationPassMsg.oldPass}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Mật khẩu mới
                                                </div>
                                                <div class="col-8">
                                                    <input type="password" class="form-control" onChange={onNewPassChange} autoComplete="new-password" />
                                                    <p class="text-danger mb-0">{validationPassMsg.newPass}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Nhập lại mật khẩu mới
                                                </div>
                                                <div class="col-8">
                                                    <input type="password" class="form-control" onChange={onReNewPassChange} autoComplete="new-password" />
                                                    <p class="text-danger mb-0">{validationPassMsg.reNewPass}</p>
                                                </div>
                                            </div>

                                            <div class="row mt-4">
                                                <div class="col-12 text-center">
                                                    <button type="button" class="btn btn-light" onClick={onSubmitPassword}>Cập nhật</button>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <a href="#account" type="button" class="btn btn-link" onClick={onOptionChange}>Quay lại</a>
                                                </div>
                                            </div>
                                        </div>}
                                    {site.includes("achievement") &&
                                        <div class="card-body">
                                            <h3 class="text-center">Thành tựu</h3>
                                            <table class="table text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Số thứ tự</th>
                                                        <th scope="col">Thành tựu đạt được</th>
                                                        <th scope="col">Ngày</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {achievement.length === 0 ?
                                                        <>
                                                            <tr>
                                                                <td colspan="3">Bạn chưa đạt thành tựu nào :(</td>
                                                            </tr>
                                                        </> : achievement.map((a, index) => (<>
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{a.name}</td>
                                                                <td>{new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', }).format(new Date(a.dateCreate))}</td>
                                                            </tr></>
                                                        ))}




                                                </tbody>
                                            </table>
                                            <div class="count-policy position-absolute bottom-0 end-0 mb-3 me-3" >
                                                <a class="btn btn-link" data-bs-toggle="modal" href="#achievementExplanation">Cách tính thành tựu</a>
                                            </div>
                                        </div>}
                                    {site.includes("progress") &&
                                        <div class="card-body">
                                            <h3 class="text-center">Tiến độ học tập</h3>
                                            <div class="row mb-1">
                                                <div class="col-12">
                                                    <div class="card">
                                                        <div class="card-body" style={{ width: "35%", textAlign: "center", margin: "auto" }}>
                                                            <h5 class="card-title text-center"></h5>
                                                            <CircularProgressbar value={progress.progressAll * (100 / 21)} text={parseInt(progress.progressAll * (100 / 21)) + "%"} />
                                                            <ul class="list-group list-group-flush">

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row row-cols-1 row-cols-md-3 g-1">
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Từ vựng</h5>
                                                            <CircularProgressbar value={progress.vocaProgress * (100 / 7)} text={progress.vocaProgress + "/7"} />
                                                            <ul class="list-group list-group-flush">

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Ngữ pháp</h5>
                                                            <CircularProgressbar value={progress.grammarProgess * (100 / 7)} text={progress.grammarProgess + "/7"} />
                                                            <ul class="list-group list-group-flush">

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Chữ hán</h5>
                                                            <CircularProgressbar value={progress.kanjiProgress * (100 / 7)} text={progress.kanjiProgress + "/7"} />
                                                            <ul class="list-group list-group-flush">

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
            <div class="modal fade" id="achievementExplanation" aria-labelledby="achievementExplanation" aria-hidden="true" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Cách tính thành tựu</h5>
                            <button type="button" class="btn-close" data-bs-target="#profileModal" data-bs-toggle="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-start">
                            <div>Test 10 bài liên tục được 100 điểm: “Quái vật” kiểm tra <br />
                                Học xong hết chữ hán: Bậc thầy chữ hán<br />
                                Học xong hết ngữ pháp: Vị thần ngữ pháp<br />
                                Học xong hết từ vựng : Chúa tể ngôn từ<br />
                                Học xong hết từ vựng, ngữ pháp, chữ hán: Thần đồng ngôn ngữ<br />
                                Đạt 1000 điểm : Hộ vệ level<br />
                                Đạt 5000 điểm : Thợ săn level<br />
                                Đạt 10000 điểm : Quái thú level<br />
                                Đạt 20000 điểm : Kẻ hủy diệt level<br />
                                Đạt 30000 điểm : Thần thoại level<br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
