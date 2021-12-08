// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import AccountServices from '../../services/AccountServices';
// import { useHistory } from "react-router-dom";
// import SweetAlert from 'react-bootstrap-sweetalert';

// export default function AccountEditModal({ accountDetail }) {
//   console.log(`accountDetail`, accountDetail.roleDTO.id);
//   const [roleId, setRoleId] = useState("");
//   const [roleName, setRoleName] = useState("");
//   const [username, setUsername] = useState("");
//   const [fullname, setFullname] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [image, setImage] = useState("");
//   const [validationMsg, setValidationMsg] = useState('');
//   const [msgErrorResponse, setMsgErrorResponse] = useState("");
//   const [msgSuccessResponse, setMsgSuccessResponse] = useState("");
//   const history = useHistory();

//   useEffect(() => {
//     if (typeof (accountDetail) !== "undefined") {
//       setRoleId(accountDetail.roleDTO.id);
//       setRoleName(accountDetail.roleDTO.name);
//       setUsername(accountDetail.username);
//       setDateOfBirth(accountDetail.dateOfBirth);
//       setEmail(accountDetail.email);
//       setFullname(accountDetail.fullName);
//       setPhone(accountDetail.phone);
//       setImage(accountDetail.avatar);
//     }
//     return () => {
//     }
//   }, [accountDetail])

//   const onSubmit = (e) => {
//     e.preventDefault();
//     let account = {
//       username: username,
//       dateOfBirth: dateOfBirth,
//       email: email,
//       fullName: fullname,
//       phone: phone,
//       roleDTO: { id: document.getElementById("role").options[document.getElementById("role").selectedIndex].value, name: document.getElementById("role").options[document.getElementById("role").selectedIndex].text },
//       avatar: image
//     };

//     AccountServices.editAccount(account, accountDetail.id).then((response) => {
//       if (response.status === 200) {
//         if (response.data.includes("thành công")) {
//           setMsgSuccessResponse(response.data);
//         } else if (response.data.includes("đã tồn tại")) {
//           setMsgErrorResponse(response.data);
//         }
//       }
//     })
//       .catch((error) => {
//         setMsgErrorResponse(error);
//       });
//   };


//   const onResetPassword = () => {
//     AccountServices.resetPassword(accountDetail.username).then((response) => {
//       if (response.status === 200) {
//         if (response.data.message.includes("thành công")) {
//           setMsgSuccessResponse(response.data.message);
//         } else if (response.data.message.includes("đã tồn tại")) {
//           setMsgErrorResponse(response.data.message);
//         }
//       }
//     })
//       .catch((error) => {
//         setMsgErrorResponse(error);
//       });
//   }

//   const onRoleIdChange = (e) => {
//     let selectRoleId = e.target.options[e.target.selectedIndex].value;
//     let selectRoleName = e.target.options[e.target.selectedIndex].text;

//     setRoleId(selectRoleId);
//     setRoleName(selectRoleName);
//   }
//   const onUsernameChange = (e) => {
//     let input = e.target.value;
//     setUsername(input);
//   }
//   const onFullnameChange = (e) => {
//     let input = e.target.value;
//     setFullname(input);
//   }
//   const onEmailChange = (e) => {
//     let input = e.target.value;
//     setEmail(input);
//   }
//   const onPhoneChange = (e) => {
//     let input = e.target.value;
//     setPhone(input);
//   }
//   const onDateOfBirthChange = (e) => {
//     let input = e.target.value;
//     setDateOfBirth(input);
//   }


//   const validateAll = () => {
//     setValidationMsg('');
//     const msg = {};
//     var validateUsername = /^[a-z\d]+$/i;
//     var validateFullname = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
//     var validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
//     var validatePhone = /(0)+([0-9]{9})\b/;
//     var inputDate = dateOfBirth.length > 0 ? new Date(dateOfBirth) : "";
//     var today = new Date();
//     if (roleId.length === 0) {
//       msg.roleId = "Vui lòng chọn chức năng";
//     }
//     if (username.length === 0) {
//       msg.username = "Không được để trống";
//     } else if (!validateUsername.test(username)) {
//       msg.username = "Không bao gồm dấu cách hoặc kí tự đặc biệt ";
//     } else if (username.length < 4 || username.length > 20) {
//       msg.username = "Độ dài từ 4-20 kí tự";
//     }
//     if (fullname.length === 0) {
//       msg.fullname = "Không được để trống";
//     } else if (!validateFullname.test(fullname)) {
//       msg.fullname = "Không được bao gồm số và kí tự đặc biệt";
//     } else if (fullname.length < 1 || fullname.length > 50) {
//       msg.fullname = "Độ dài từ 1-50 kí tự";
//     }
//     if (email.length === 0) {
//       msg.email = "Không được để trống";
//     } else if (!validateEmail.test(email)) {
//       msg.email = "Cần bao gồm '@ .' và không được chứa dấu cách";
//     }
//     if (phone.length === 0) {
//       msg.phone = "Không được để trống";
//     }
//     else if (!validatePhone.test(phone)) {
//       msg.phone = "Độ dài từ 10-11 số, không bao gồm kí tự đặc biệt và dấu cách";
//     }
//     if (dateOfBirth.length > 0 && inputDate > today) {
//       msg.dob = "Cần chọn ngày sinh nhỏ hơn hiện tại";
//     }

//     setValidationMsg(msg);
//     if (Object.keys(msg).length > 0) return false;
//     return true;
//   }



//   const hideAlert = () => {
//     setMsgSuccessResponse("");
//     setMsgErrorResponse("");
//     history.go(0);
//   }


//   return (
//     <>
//       {/* edit account */}
//       {msgSuccessResponse !== "" ?
//         < SweetAlert success title="Cập nhật tài khoản thành công!" timeout={2000} onConfirm={hideAlert}>
//           {msgSuccessResponse}
//         </SweetAlert > : ""}
//       {msgErrorResponse !== "" ?
//         < SweetAlert danger title="Cập nhật tài khoản thất bại!" timeout={2000} onConfirm={hideAlert}>
//           {msgErrorResponse}
//         </SweetAlert > : ""}
//       <div class="modal fade" id="ViewEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         {accountDetail && <div class="modal-dialog">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h5 class="modal-title" id="exampleModalLabel">
//                 Chỉnh sửa tài khoản
//               </h5>
//               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//               <form class="row g-3" onSubmit={onSubmit}>
//                 <div class="col-md-6">
//                   <label class="form-label">Vai trò<span class="text-danger">*</span></label>
//                   <select id="role" class="form-select" onChange={onRoleIdChange} disabled={typeof accountDetail.roleDTO !== 'undefined' && accountDetail.roleDTO.name === "Admin" ? true : false}>
//                     {typeof accountDetail.roleDTO !== 'undefined' ? <option value={accountDetail.roleDTO.id} selected disabled>{accountDetail.roleDTO.name}</option> : ""}
//                     <option value="2">Content Manager</option>
//                     <option value="3">Student</option>
//                   </select>
//                 </div>
//                 <div class="col-md-6">
//                   <label class="form-label">Tài khoản<span class="text-danger">*</span></label>
//                   <input name="username" class="form-control" type="text" value={username} onChange={onUsernameChange} />

//                 </div>
//                 <div class="col-md-12">
//                   <label class="form-label">Họ và tên<span class="text-danger">*</span></label>
//                   <input name="fullname" type="text" class="form-control" value={fullname} onChange={onFullnameChange} />

//                 </div>

//                 <div class="col-md-6">
//                   <label class="form-label">Email<span class="text-danger">*</span></label>
//                   <input name="email" type="email" class="form-control" value={email} onChange={onEmailChange} />

//                 </div>
//                 <div class="col-md-6">
//                   <label class="form-label">Số điện thoại<span class="text-danger"></span></label>
//                   <input name="phone" type="text" class="form-control" value={phone} onChange={onPhoneChange} />

//                 </div>
//                 <div class="col-md-6">
//                   <label class="form-label">Ngày sinh<span class="text-danger">*</span></label>
//                   <input name="date" class="form-control" type="date" value={dateOfBirth} onChange={onDateOfBirthChange} />
//                 </div>

//                 <div class="col-12">
//                   <button type="button" class="btn btn-link ps-0" onClick={onResetPassword}>Đặt lại mật khẩu</button>
//                   <span class="text-danger">{msgSuccessResponse ? msgSuccessResponse : msgErrorResponse}</span>
//                 </div>
//                 <div class="col-6">
//                   <button class="btn btn-secondary w-100" type="button" data-bs-dismiss="modal" aria-label="Close">
//                     Không lưu thay đổi
//                   </button>
//                 </div>
//                 <div class="col-6">
//                   <button type="submit" class="btn btn-primary w-100">
//                     Lưu thay đổi
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>}
//       </div>

//     </>
//   )
//     ;
// }
