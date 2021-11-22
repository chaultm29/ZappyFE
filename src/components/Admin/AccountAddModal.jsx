import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AccountServices from '../../services/AccountServices';
import { useHistory } from "react-router-dom";

export default function AccountAddModal() {
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [image, setImage] = useState("https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png");
  const [validationMsg, setValidationMsg] = useState('');
  const history = useHistory();


  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    let account = { username: username, password: "contentmanager@123", dateOfBirth: dateOfBirth, email: email, fullName: fullname, phone: phone, roleDTO: { id: roleId, name: roleName }, avatar: "default.png" };
    console.log(`data`, account);

    AccountServices.addAccount(account);
    setTimeout(() => {
      history.go(0);
    }, 1000);


  }
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        document.getElementById("imageFieldHidden").value = e.target.files[0].name;
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const onRoleIdChange = (e) => {
    let selectRoleId = e.target.options[e.target.selectedIndex].value;
    let selectRoleName = e.target.options[e.target.selectedIndex].text;

    setRoleId(selectRoleId);
    setRoleName(selectRoleName);
  }
  const onUsernameChange = (e) => {
    let input = e.target.value;
    setUsername(input);
  }
  const onFullnameChange = (e) => {
    let input = e.target.value;
    setFullname(input);
  }
  const onEmailChange = (e) => {
    let input = e.target.value;
    setEmail(input);
  }
  const onPhoneChange = (e) => {
    let input = e.target.value;
    setPhone(input);
  }
  const onDateOfBirthChange = (e) => {
    let input = e.target.value;
    setDateOfBirth(input);
  }

  const onImageChange = (e) => {
    let input = e.target.value;
    setImage(input);
  }

  const validateAll = () => {
    const msg = {};
    var validateUsername = /^[a-z\d]+$/i;
    var validateFullname = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    var validatePhone = /(0[3|5|7|8|9])+([0-9]{8,9})\b/;
    var inputDate = new Date(dateOfBirth);
    var today = new Date();
    if (roleId.length === 0) {
      msg.roleId = "Vui lòng chọn chức năng";
    }
    if (username.length === 0) {
      msg.username = "Không được để trống";
    } else if (!validateUsername.test(username)) {
      msg.username = "Không bao gồm dấu cách hoặc kí tự đặc biệt ";
    } else if (username.length < 4 || username.length > 20) {
      msg.username = "Độ dài từ 4-20 kí tự";
    }
    if (fullname.length === 0) {
      msg.fullname = "Không được để trống";
    } else if (!validateFullname.test(fullname)) {
      msg.fullname = "Không được bao gồm số và kí tự đặc biệt";
    } else if (fullname.length < 1 || fullname.length > 50) {
      msg.fullname = "Độ dài từ 1-50 kí tự";
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


    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  }
  return (
    <>
      {/* add account */}
      <div class="modal fade" id="ViewAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Thêm tài khoản
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Vai trò<span class="text-danger">*</span></label>

                  <select class="form-select" onChange={onRoleIdChange}>
                    <option value="" selected disabled>Chọn vai trò</option>
                    <option value="2">Quản lý nội dung</option>
                  </select>
                  <p class="text-danger mb-0">{validationMsg.roleId}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Tài khoản<span class="text-danger">*</span></label>
                  <input name="username" class="form-control" type="text" onChange={onUsernameChange} />
                  <p class="text-danger mb-0">{validationMsg.username}</p>
                </div>
                <div class="col-md-12">
                  <label class="form-label">Họ và tên<span class="text-danger">*</span></label>
                  <input name="fullname" type="text" class="form-control" onChange={onFullnameChange} />
                  <p class="text-danger mb-0">{validationMsg.fullname}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Mật khẩu<span class="text-danger">*</span></label>
                  <input name="password" type="text" class="form-control" placeholder="contentmanager@123" disabled />

                </div>
                <div class="col-md-6">
                  <label class="form-label">Email<span class="text-danger">*</span></label>
                  <input name="email" type="email" class="form-control" onChange={onEmailChange} />
                  <p class="text-danger mb-0">{validationMsg.email}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Số điện thoại<span class="text-danger"></span></label>
                  <input name="phone" type="text" class="form-control" onChange={onPhoneChange} />
                  <p class="text-danger mb-0">{validationMsg.phone}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Ngày sinh<span class="text-danger">*</span></label>
                  <input name="date" class="form-control" type="date" onChange={onDateOfBirthChange} />
                  <p class="text-danger mb-0">{validationMsg.dob}</p>
                </div>

                {/* <div class="col-8">
                  <label class="form-label">Ảnh đại diện</label>
                  <input class="form-control" type="file" accept="image/jpeg, image/png, image/jpg" onChange={imageHandler} />
                  <input id="imageFieldHidden" onChange={onImageChange} />
                </div>
                <div class="col-4">
                  <img src={image} class="rounded img-thumbnail mx-auto d-block" alt="..." width="100px" height="100px" />
                </div> */}
                <div class="col-6"><button type="reset" class="btn btn-secondary w-100">
                  Làm mới
                </button></div>
                <div class="col-6">
                  <button type="submit" class="btn btn-primary w-100" onClick={onSubmit}>
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
    ;
}