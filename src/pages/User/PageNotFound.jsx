import React from 'react'
//import img from "../../assets/img/404NotFound.jpg";
export default function PageNotFound() {
    return (
        <>
            <div class="container text-center">
                <img src={require('../../assets/img/404NotFound.jpg').default} class="mx-auto w-50" />
                <h1> KHÔNG TÌM THẤY TRANG </h1>
                <button class="btn" style={{ backgroundColor: "#822049", color: "#fff" }}><i class="fas fa-long-arrow-alt-left"></i> Quay về trang chủ</button>
            </div>
        </>
    )
}
