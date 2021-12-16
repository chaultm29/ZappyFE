import React, { Component } from 'react';
import Navigation from "../../components/Student/Navigation";
import Sidebar from '../../components/Student/Sidebar';
import bg from "../../assets/img/bg-home-scene-winter.svg";
import homepage from "../../assets/img/homepage.png"
import "./css/Homepage.css";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import AuthenticationService from '../../services/AuthenticationService';
class Homepage extends Component {
    render() {
        return (
            <>
                <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
                    <Navigation />
                    <div className="container mt-2 pt-4 pb-4" style={{ backgroundColor: "#fceced", borderRadius: "15px", height: "100%" }}>
                        <div class="row align-items-center mx-auto" style={{ width: "97%", backgroundColor: "white", borderRadius: "15px" }}>
                            <div class="col-md-5 col-lg-6 order-0 order-md-1 text-end">
                                <img class="pt-7 pt-md-0 hero-img" src={homepage} width="100%" alt="hero-header" />
                            </div>
                            <div class="col-md-7 col-lg-6 text-md-start text-center py-6">
                                <h4 class="fw-bold text-danger mb-3" id="homepage-description">Trang web học tiếng Nhật được thiết kế dành riêng cho sinh viên trường Đại học FPT</h4>
                                <h1 class="homepage-title">Học tập, Kiểm tra Chơi Game</h1>
                                <p class="mb-4 fw-medium">Nội dung được xây dựng dựa trên giáo trình Dekiru Nihongo.<br class="d-none d-xl-block" />Thích hợp với các bạn sinh viên đang học<br class="d-none d-xl-block" />môn JPD113 và JPD123</p>
                                <div class="text-center text-md-start">

                                    {!AuthenticationService.getToken() ? <>
                                        <a class="btn btn-primary btn-lg me-md-4 mb-3 mb-md-0 border-0 primary-btn-shadow" href="" data-toggle="modal"
                                            data-target="#loginModal" role="btn-homepage">Khám phá</a>
                                        <div class="w-100 d-block d-md-none"></div><a href="" class="fw-medium">Hướng dẫn</a>
                                    </>
                                        : <> <Link to="/study" class="btn btn-primary btn-lg me-md-4 mb-3 mb-md-0 border-0 primary-btn-shadow" href="" data-toggle="modal"
                                            data-target="#loginModal" role="btn-homepage">Khám phá</Link>
                                            <div class="w-100 d-block d-md-none"></div><Link to="/study" class="fw-medium">Hướng dẫn</Link> </>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}
export default Homepage;