
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
    const [username, setUsername] = useState("");
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
                console.log(`res`, res);
                setId(res.data.id);
                setUsername(AuthenticationService.getCurrentUser());
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
        var validateUsername = /^[a-z\d]+$/i;
        var validateFullname = /^[a-zA-Z_????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s]+$/;
        var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        var validatePhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        var inputDate = new Date(dateOfBirth);
        var today = new Date();
        if (username.trim().length === 0) {
            msg.username = "Kh??ng ???????c ????? tr???ng";
        } else if (!validateUsername.test(username)) {
            msg.username = "Kh??ng bao g???m d???u c??ch ho???c k?? t??? ?????c bi???t ";
        } else if (username.trim().length < 4 || username.trim().length > 20) {
            msg.username = "????? d??i t??? 4-20 k?? t???";
        }
        if (fullName.trim().length === 0) {
            msg.fullName = "Kh??ng ???????c ????? tr???ng";
        } else if (!validateFullname.test(fullName.trim())) {
            msg.fullName = "Kh??ng ???????c bao g???m s??? v?? k?? t??? ?????c bi???t";
        } else if (fullName.trim().length < 1 || fullName.trim().length > 50) {
            msg.fullName = "????? d??i t??? 1-50 k?? t???";
        }
        if (email.trim().length === 0) {
            msg.email = "Kh??ng ???????c ????? tr???ng";
        } else if (!validateEmail.test(email)) {
            msg.email = "C???n bao g???m '@ .' v?? kh??ng ???????c ch???a d???u c??ch";
        }
        if (phone.trim().length > 0 && !validatePhone.test(phone)) {
            msg.phone = "S??? ??i???n tho???i kh??ng t???n t???i";
        }
        if (dateOfBirth.length > 0 && inputDate >= today) {
            msg.dob = "C???n ch???n ng??y sinh nh??? h??n hi???n t???i";
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
            msg.oldPass = "Kh??ng ???????c ????? tr???ng";
        }
        if (newPass.length === 0) {
            msg.newPass = "Kh??ng ???????c ????? tr???ng";
        } else if (newPass.length < 8 || newPass.length > 20) {
            msg.newPass = "????? d??i t??? 8-20 k?? t???"
        } else if (!validatePassword.test(newPass)) {
            msg.newPass = "Kh??ng ???????c ch???a d???u c??ch";
        }
        if (reNewPass.length === 0) {
            msg.reNewPass = "Kh??ng ???????c ????? tr???ng";
        } else if (reNewPass !== newPass) {
            msg.reNewPass = "M???t kh???u kh??ng kh???p";
        }
        setValidationPassMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }


    const onSubmit = (e) => {
        e.preventDefault();
        let profile = { id: id, dateOfBirth: dateOfBirth, email: email.trim(), fullName: fullName.trim(), phone: phone, avatar: avatar };
        const uploadImageSuccess = upload(imageUpload);
        if (uploadImageSuccess) {
            UserServices.updateProfile(profile).then((res) => {
                if (res.status === 200) {
                    if (res.data.includes("th??nh c??ng")) {
                        setMsgAPIUpdate("C???p nh???t th??nh c??ng !");
                    } else if (res.data.includes("t???n t???i")) {
                        setMsgAPIUpdate(res.data);
                    }
                } else {
                    setMsgAPIUpdate("???? c?? l???i x???y ra, vui l??ng th??? l???i");
                }
            });
        } else {
            setMsgAPIUpdate("???? c?? l???i x???y ra, vui l??ng th??? l???i");
        }
    }
    const onSubmitPassword = (e) => {
        e.preventDefault();
        let changePassword = { newPassword: newPass, oldPassword: oldPass };
        UserServices.changePassword(changePassword).then((res) => {
            if (res.data === true) {
                setMsgAPIPass("C???p nh???t m???t kh???u th??nh c??ng !");
            } else {
                setMsgAPIPass("???? c?? l???i x???y ra, vui l??ng th??? l???i");
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
                            <h5 class="modal-title" id="exampleModalLabel">T??i kho???n</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-0">
                                <div class="col-md-4 border-end h-100">
                                    <div class="avatar h-50 w-100 text-center" >

                                        <img id="imgProfile" src={avatar ? S3Config.baseURLAvatar + avatar : noImage} class="img-fluid rounded mx-auto d-block" alt="..." />

                                        <a href="javascript:void(0)" onClick={() => inputFile.current.click()} class="mx-auto">Thay ?????i ???nh ?????i di???n</a>
                                        {avatar && <>     <span class="text-muted px-1">  |  </span>
                                            <a href="javascript:void(0)" onClick={() => setAvatar("")}>X??a b???</a> </>}
                                        <input type='file' id='file' ref={inputFile} class="d-none" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                                    </div>
                                    <div class="menu list-group list-group-item-action mt-2">

                                        {userRole === "Student" ?
                                            <>
                                                <a href="#account" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-user"></i> Th??ng tin t??i kho???n</a>
                                                <a href="#achievement" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-award"></i> Th??nh t???u</a>
                                                <a href="#progress" type="button" class="list-group-item list-group-item-action px-2" onClick={onOptionChange}><i class="fas fa-chart-line"></i> Ti???n ????? h???c t???p</a> </>
                                            : ""}


                                    </div>

                                </div>
                                <div class="col-md-8 h-100">
                                    {site.includes("account") &&
                                        <div class="card-body" >
                                            <h3 class="text-center">Th??ng tin t??i kho???n</h3>
                                            <span class="text-danger">{msgAPIUpdate}</span>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    H??? v?? t??n
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
                                                    T??n t??i kho???n
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" value={username} disabled />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.username}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Ng??y sinh
                                                </div>
                                                <div class="col-8">
                                                    <input type="date" class="form-control" value={dateOfBirth} onChange={onDateOfBirthChange} />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.dob}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    S??? ??i???n tho???i
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" class="form-control" value={phone} onChange={onPhoneChange} />
                                                    <p class="text-danger mb-0">{validationUpdateMsg.phone}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-12 text-center">
                                                    <button type="button" class="btn btn-light" onClick={() => { if (!validateUpdate()) return; else document.getElementById("btn-save-hide-profile").click() }} >C???p nh???t</button>
                                                    <button type="button" class="d-none" id="btn-save-hide-profile" data-bs-toggle="modal" data-bs-target="#ViewConfirmUpdateProfileModal"></button>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <a href="#changePassword" type="button" class="btn btn-link" onClick={onOptionChange}>C???p nh???t m???t kh???u</a>
                                                </div>
                                            </div>

                                        </div>}
                                    {site.includes("changePassword") &&
                                        <div class="card-body" >
                                            <h3 class="text-center">C???p nh???t m???t kh???u</h3>
                                            <span class="text-danger">{msgAPIPass}</span>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    M???t kh???u c??
                                                </div>
                                                <div class="col-8">
                                                    <input type="password" class="form-control" onChange={onOldPassChange} autoComplete="new-password" />
                                                    <p class="text-danger mb-0">{validationPassMsg.oldPass}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    M???t kh???u m???i
                                                </div>
                                                <div class="col-8">
                                                    <input type="password" class="form-control" onChange={onNewPassChange} autoComplete="new-password" />
                                                    <p class="text-danger mb-0">{validationPassMsg.newPass}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-4 d-flex align-items-center">
                                                    Nh???p l???i m???t kh???u m???i
                                                </div>
                                                <div class="col-8">
                                                    <input type="password" class="form-control" onChange={onReNewPassChange} autoComplete="new-password" />
                                                    <p class="text-danger mb-0">{validationPassMsg.reNewPass}</p>
                                                </div>
                                            </div>

                                            <div class="row mt-4">
                                                <div class="col-12 text-center">
                                                    <button type="button" class="btn btn-light" onClick={() => { if (!validateChangePass()) return; else document.getElementById("btn-save-hide-pass").click() }}  >C???p nh???t</button>
                                                    <button type="button" class="d-none" id="btn-save-hide-pass" data-bs-toggle="modal" data-bs-target="#ViewConfirmUpdatePassModal"></button>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <a href="#account" type="button" class="btn btn-link" onClick={onOptionChange}>Quay l???i</a>
                                                </div>
                                            </div>

                                        </div>}
                                    {site.includes("achievement") &&
                                        <div class="card-body">
                                            <h3 class="text-center">Th??nh t???u</h3>
                                            <table class="table text-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">S??? th??? t???</th>
                                                        <th scope="col">Th??nh t???u ?????t ???????c</th>
                                                        <th scope="col">Ng??y</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {achievement.length === 0 ?
                                                        <>
                                                            <tr>
                                                                <td colspan="3">B???n ch??a ?????t th??nh t???u n??o :(</td>
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
                                                <a class="btn btn-link" data-bs-toggle="modal" href="#achievementExplanation">C??ch t??nh th??nh t???u</a>
                                            </div>
                                        </div>}
                                    {site.includes("progress") &&
                                        <div class="card-body">
                                            <h3 class="text-center">Ti???n ????? h???c t???p</h3>
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
                                                            <h5 class="card-title text-center">T??? v???ng</h5>
                                                            <CircularProgressbar value={progress.vocaProgress * (100 / 7)} text={progress.vocaProgress + "/7"} />
                                                            <ul class="list-group list-group-flush">

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Ng??? ph??p</h5>
                                                            <CircularProgressbar value={progress.grammarProgess * (100 / 7)} text={progress.grammarProgess + "/7"} />
                                                            <ul class="list-group list-group-flush">

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="card h-100">
                                                        <div class="card-body">
                                                            <h5 class="card-title text-center">Ch??? h??n</h5>
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

            <div class="modal fade" id="ViewConfirmUpdateProfileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                X??c nh???n c???p nh???t th??ng tin t??i kho???n
                            </h5>
                            <button
                                id="close-modal"
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            B???n c?? ch???c mu???n c???p nh???t th??ng tin t??i kho???n ch??? ?
                        </div>
                        <div class="modal-footer border-0">
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#profileModal"
                            >
                                Kh??ng
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#profileModal"
                                onClick={onSubmit}
                            >
                                C??
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ViewConfirmUpdatePassModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                X??c nh???n c???p nh???t m???t kh???u
                            </h5>
                            <button
                                id="close-modal"
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            B???n c?? ch???c mu???n c???p nh???t m???t kh???u ch??? ?
                        </div>
                        <div class="modal-footer border-0">
                            <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#profileModal"
                            >
                                Kh??ng
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#profileModal"
                                onClick={onSubmitPassword}
                            >
                                C??
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="achievementExplanation" aria-labelledby="achievementExplanation" aria-hidden="true" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">C??ch t??nh th??nh t???u</h5>
                            <button type="button" class="btn-close" data-bs-target="#profileModal" data-bs-toggle="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-start">
                            <div>Test 10 b??i li??n t???c ???????c 100 ??i???m: ???Qu??i v???t??? ki???m tra <br />
                                H???c xong h???t ch??? h??n: B???c th???y ch??? h??n<br />
                                H???c xong h???t ng??? ph??p: V??? th???n ng??? ph??p<br />
                                H???c xong h???t t??? v???ng : Ch??a t??? ng??n t???<br />
                                H???c xong h???t t??? v???ng, ng??? ph??p, ch??? h??n: Th???n ?????ng ng??n ng???<br />
                                ?????t 1000 ??i???m : H??? v??? level<br />
                                ?????t 5000 ??i???m : Th??? s??n level<br />
                                ?????t 10000 ??i???m : Qu??i th?? level<br />
                                ?????t 20000 ??i???m : K??? h???y di???t level<br />
                                ?????t 30000 ??i???m : Th???n tho???i level<br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
