import React, { Component } from 'react';
import Navigation from "../../components/Student/Navigation";
import Sidebar from '../../components/Student/Sidebar';
import bg from "../../assets/img/bg-home-scene-winter.svg";
import homepage from "../../assets/img/homepage.png"
import "./css/Homepage.css";
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
                                <h1 class="homepage-title">Học tập, Kiểm tra, Chơi Game</h1>
                                <p class="mb-4 fw-medium">Built Wicket longer admire do barton vanity itself do in it.<br class="d-none d-xl-block" />Preferred to sportsmen it engrossed listening. Park gate<br class="d-none d-xl-block" />sell they west hard for the.</p>
                                <div class="text-center text-md-start"> <a class="btn btn-primary btn-lg me-md-4 mb-3 mb-md-0 border-0 primary-btn-shadow" href="#!" role="button">Find out more</a>
                                    <div class="w-100 d-block d-md-none"></div><a href="#!" role="button" data-bs-toggle="modal" data-bs-target="#popupVideo"><span class="btn btn-danger round-btn-lg rounded-circle me-3 danger-btn-shadow">
                                        <img src="assets/img/hero/play.svg" width="15" alt="play" /></span></a><span class="fw-medium">Khám phá</span>
                                    <div class="modal fade" id="popupVideo" tabindex="-1" aria-labelledby="popupVideo" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-lg">
                                            <div class="modal-content">
                                                <iframe class="rounded" style={{ width: "100% ", maxHeight: "500px" }} height="500px" src="https://www.youtube.com/embed/_lhdhL4UDIo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
                                            </div>
                                        </div>
                                    </div>
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