import React, { Component } from 'react';
import Navigation from "../../components/Student/Navigation";
import Sidebar from '../../components/Student/Sidebar';
import Footer from '../../components/Student/Footer';
import bg from "../../assets/img/bg-home-scene-winter.svg";
import homepage from "../../assets/img/homepage.png"
import "./css/Homepage.css";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import AuthenticationService from '../../services/AuthenticationService';
import fish from "../../assets/img/fish.png";
import UserServices from '../../services/UserServices';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rankings: [],
            hasData: true
        };
    }
    componentDidMount() {
        UserServices.getRanking().then((res) => {
            if (res) {
                this.setState({ rankings: res.data });
            }
            else {
                this.setState({ hasData: false });
            }
        });
    }
    render() {
        return (
            <>
                <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
                    <Navigation />
                    <div className="container mt-2 pt-4 pb-4" style={{ backgroundColor: "#fceced", borderRadius: "15px", height: "100%" }}>
                        <div class="row row-cols-2 align-items-center mx-auto" style={{ width: "97%", backgroundColor: "white", borderRadius: "15px" }}>
                            <div class="col-lg-6 text-md-start text-center py-6">
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
                            <div class="col-lg-6 text-end">
                                <img class="pt-7 pt-md-0 hero-img" src={homepage} width="100%" alt="hero-header" />
                            </div>

                            <div class="col-md-3 col-lg-3 ps-0">
                                <div class="border-start-0" style={{ border: "2px solid #68A39D", marginRight: "20px", borderTopRightRadius: "25px", borderBottomRightRadius: "25px", backgroundImage: `url(${fish})`, backgroundSize: "cover" }}>

                                    <p class="text-center my-5 fs-3 fw-bold" style={{ color: "#5E6282" }}>Lời ngỏ</p>
                                </div>

                            </div>
                            <div class="col-md-9 col-lg-9 p-4 shadow-lg" style={{ backgroundColor: "#f9f5f2", borderTopLeftRadius: "20px" }}>
                                Nhằm hỗ trợ các bạn sinh viên trường <span class="fw-bold" style={{ color: "#68A39D" }}> Đại học FPT </span> mới bắt đầu học tiếng nhật, chúng mình đã xây dựng nên một hệ thống website giúp cho con đường chinh phục thứ ngôn ngữ đáng gờm này trở nên dễ dàng hơn bao giờ hết <br />
                                Chương trình học được sắp xếp lộ trình đầy đủ theo từng kĩ năng:<span class="fw-bold" style={{ color: "#68A39D" }}> Chữ hán, Từ vựng, Ngữ pháp, Luyện tập và Làm bài thi. </span><br />
                                Nội dung của các bài học được chúng mình xây dựng bám sát nội dung kiến thức trong giáo trình <span class="fw-bold" style={{ color: "#68A39D" }}> Dekiru Nihongo và kiến thức trên lớp</span><br />
                                Hình ảnh trực quan, phong phú<br />
                                Chơi game hỗ trợ trong quá trình học<br />
                                Về hình thức học và phân chia thời gian:<br />
                                Mỗi ngày dành ra từ <span class="fw-bold" style={{ color: "#68A39D" }}> 2-3 tiếng </span>để học khoảng<span class="fw-bold" style={{ color: "#68A39D" }}> 3-4 tháng </span>có thể hoàn thành chương trình học.<br />
                                Tất nhiên, nếu muốn rút ngắn, bạn có thể dành nhiều thời gian vào học hơn mỗi ngày để kết thúc nhanh hơn.<br />
                                Sau mỗi bài học các bạn nên kết hợp làm bài tập luôn để có thể ghi nhớ kiến thức buổi học ngày hôm đó.<br />
                                1 tuần học 2 bài khoảng 3 tháng là chúng ta hoàn thiện 7 bài , thời gian còn lại tập trung ôn luyện đề thử để làm quen với đề trước khi tham gia kì thi.<br />
                                Cố gắng bĩnh tĩnh tự tin để đạt kết quả cao nhất nhé các bạn!!!<br />
                                <span class="fw-bold" style={{ color: "#68A39D" }}> Zappy Team</span>
                            </div>
                            {this.state.hasData ? (
                                <div class="col-md-12 ranking">
                                    <div class="leaderboard">
                                        <h1>
                                            <svg class="ico-cup">
                                            </svg>
                                             CON ONG CHĂM CHỈ
                                        </h1>

                                        <ol>
                                            {this.state.rankings.map((ranking) => (
                                                <li>
                                                    <mark>{ranking.fullName}</mark>
                                                    <small>{ranking.exp}</small>
                                                </li>
                                            )
                                            )}
                                        </ol>
                                    </div>
                                </div>) : ""}
                        </div>


                    </div>
                    <Footer />
                </div>

            </>
        );
    }
}
export default Homepage;