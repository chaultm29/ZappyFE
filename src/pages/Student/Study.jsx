import React, { Component } from 'react';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import Footer from "../../components/Student/Footer";
import bg from "../../assets/img/bg-home-scene-winter.svg";

class Study extends Component {

    render() {
        return (
            <div style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom", minHeight: "100vh" }}>
                <Navigation />
                <div className="container mt-2" style={{ backgroundColor: "#fceced", borderRadius: "15px" }}>
                    <div class="row">
                        <Sidebar />
                        <div class="col-md-9">
                            <h1 class="tit text-center mt-2">Hướng dẫn học tập cho mọi người</h1>
                            <div class="shadow bg-white p-3 mx-auto fs-5" style={{ borderRadius: "15px", width: "98%" }}>
                                Nhằm hỗ trợ các bạn sinh viên trường <span style={{ color: "#F6B0A6" }}> Đại học FPT </span> mới bắt đầu học tiếng nhật, chúng mình đã xây dựng nên một hệ thống website giúp cho con đường chinh phục thứ ngôn ngữ đáng gờm này trở nên dễ dàng hơn bao giờ hết <br />
                                Chương trình học được sắp xếp lộ trình đầy đủ theo từng kĩ năng:<span style={{ color: "#F6B0A6" }}> Chữ hán, Từ vựng, Ngữ pháp, Luyện tập và Làm bài thi. </span><br />
                                Nội dung của các bài học được chúng mình xây dựng bám sát nội dung kiến thức trong giáo trình <span style={{ color: "#F6B0A6" }}> Dekiru Nihongo và kiến thức trên lớp</span><br />
                                Hình ảnh trực quan, phong phú<br />
                                Chơi game hỗ trợ trong quá trình học<br />
                                Về hình thức học và phân chia thời gian:<br />
                                Mỗi ngày dành ra từ <span style={{ color: "#F6B0A6" }}> 2-3 tiếng </span>để học khoảng<span style={{ color: "#F6B0A6" }}> 3-4 tháng </span>có thể hoàn thành chương trình học.<br />
                                Tất nhiên, nếu muốn rút ngắn, bạn có thể dành nhiều thời gian vào học hơn mỗi ngày để kết thúc nhanh hơn.<br />
                                Sau mỗi bài học các bạn nên kết hợp làm bài tập luôn để có thể ghi nhớ kiến thức buổi học ngày hôm đó.<br />
                                1 tuần học 2 bài khoảng 3 tháng là chúng ta hoàn thiện 7 bài , thời gian còn lại tập trung ôn luyện đề thử để làm quen với đề trước khi tham gia kì thi.<br />
                                Cố gắng bĩnh tĩnh tự tin để đạt kết quả cao nhất nhé các bạn!!!<br />
                                <span style={{ color: "#F6B0A6" }}> Zappy Team</span></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Study;