
import React, { useState, useEffect, useRef } from 'react'
import AuthenticationService from '../../services/AuthenticationService';
import UserServices from '../../services/UserServices';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import S3FileUpload from 'react-s3';
export default function Profile({ isClicked }) {

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
    const baseImg = "https://imgzappybucket.s3.ap-southeast-1.amazonaws.com/Avatar/";

    const config = {
        bucketName: 'imgzappybucket',
        dirName: 'Avatar', /* optional */
        region: 'ap-southeast-1',
        accessKeyId: 'AKIAUTRYR6GNGNJ3SGMT',
        secretAccessKey: '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'
    }

    useEffect(() => {
        if (isClicked) {
            UserServices.getProfile().then((res) => {
                setId(res.data.id);
                setDateOfBirth(res.data.dateOfBirth);
                setEmail(res.data.email);
                setFullName(res.data.fullName);
                setPhone(res.data.phone);
                setAvatar(baseImg + res.data.avatar);
            });
            UserServices.getProgress().then((res) => {
                console.log(`res.progress`, res);
                setProgress(res.data);
            })
            UserServices.getAchievement().then((res) => {
                console.log(`res.achievement`, res)
                setAchievement(res.data);
            })
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
                document.getElementById("img").src = reader.result;
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const upload = () => {
        S3FileUpload.uploadFile(imageUpload, config).then((data) => {
            console.log(data.location);
        }).catch((err) => {
            alert(err);
        })
    }
    const validateUpdate = () => {
        const msg = {};
        var validateFullname = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
        var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        var validatePhone = /(0[3|5|7|8|9])+([0-9]{8,9})\b/;
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
            msg.phone = "Độ dài từ 10-11 số, không bao gồm kí tự đặc biệt và dấu cách";
        }
        if (dateOfBirth.length === 0) {
            msg.dob = "Không được để trống";
        } else if (inputDate > today) {
            msg.dob = "Cần chọn ngày sinh nhỏ hơn hiện tại";
        }
        setValidationUpdateMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const validateChangePass = () => {
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
        let profile = { id: id, dateOfBirth: dateOfBirth, email: email, fullName: fullName, phone: phone, avatar: avatar };
        console.log(`profile`, profile);
        upload();
        UserServices.updateProfile(profile).then((res) => {
            if (res.status === 200) {
                setMsgAPIUpdate("Cập nhật thành công !");
            } else {
                setMsgAPIUpdate("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        });
    }
    const onSubmitPassword = (e) => {
        e.preventDefault();
        const isValid = validateChangePass();
        if (!isValid) return;
        let changePassword = { newPassword: newPass, oldPassword: oldPass };
        console.log(`changePassword`, changePassword);
        UserServices.changePassword(changePassword).then((res) => {
            console.log(`res`, res);
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

                                            <span class="text-danger">{msgAPIUpdate}</span>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Họ và tên
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" defaultValue={fullName} onChange={onFullNameChange} />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.fullName}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Email
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" defaultValue={email} onChange={onEmailChange} />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.email}</p>
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
                                                    <p class="text-danger mb-0">{validationUpdateMsg.dob}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Số điện thoại
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" defaultValue={phone} onChange={onPhoneChange} />
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
                                                    <tr>
                                                        {achievement.map((a, index) => (<>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{a.name}</td>
                                                            <td>{new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', }).format(new Date(a.dateCreate))}</td>
                                                        </>
                                                        ))}
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
                                            <div class="row mb-1">
                                                <div class="col-12">
                                                    <div class="card">
                                                        <div class="card-body" style={{ width: "35%", textAlign: "center", margin: "auto" }}>
                                                            <h5 class="card-title text-center"></h5>
                                                            <CircularProgressbar value={progress.progressAll} text={progress.progressAll + "%"} />
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
                                                            <CircularProgressbar value={progress.vocaProgress} text={progress.vocaProgress + "%"} />
                                                            <ul class="list-group list-group-flush">

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Ngữ pháp</h5>
                                                            <CircularProgressbar value={progress.grammarProgess} text={progress.grammarProgess + "%"} />
                                                            <ul class="list-group list-group-flush">

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Chữ hán</h5>
                                                            <CircularProgressbar value={progress.kanjiProgress} text={progress.kanjiProgress + "%"} />
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



        </>
    )
}
