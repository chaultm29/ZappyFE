import React, { Component } from 'react';
import Sidebar from '../../components/Student/Sidebar';
import Navigation from '../../components/Student/Navigation';
import Footer from "../../components/Student/Footer";
import bg from "../../assets/img/bg-home-scene-winter.svg";
import hinh1 from "../../assets/img/Guide/hinh1.png";
import hinh2 from "../../assets/img/Guide/hinh2.png";
import hinh3 from "../../assets/img/Guide/hinh3.png";
import hinh4 from "../../assets/img/Guide/hinh4.png";
import hinh5 from "../../assets/img/Guide/hinh5.png";
import hinh6 from "../../assets/img/Guide/hinh6.png";
import hinh7 from "../../assets/img/Guide/hinh7.png";
import hinh8 from "../../assets/img/Guide/hinh8.png";
import hinh9 from "../../assets/img/Guide/hinh9.png";

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
                            <div class="shadow bg-white p-3 mx-auto fs-5" style={{ borderRadius: "15px", width: "98%", overflowY: "scroll", height: "700px" }}>
                                <span class="fw-bold"> Zappy xin chào bạn!!!! </span><br />
                                Để bạn có thể hiểu rõ cách học, cách tính điểm phần Học tập của Zappy, sau đây Zappy sẽ đưa ra một số hướng dẫn trước khi học cho bạn nhé. <br />
                                Phần Học tập của Zappy gồm 4 phần học chính:<span class="fw-bold"> Bảng chữ cái, Từ vựng, Ngữ pháp và Chữ hán.</span> <br />
                                <span class="fw-bold">Về bảng chữ cái: </span><br />Bao gồm bảng Hiragana và bảng Katakana. Với từng bảng chữ cái, Zappy đã hiển thị các chữ dưới dạng danh sách thẻ bao gồm chữ, cách đọc, cách nhớ và hình minh họa cho từng chữ. <br />
                                <img src={hinh1} class="rounded img-thumbnail mx-auto d-block my-1" />
                                <span class="fw-bold" >Về từ vựng, ngữ pháp, chữ hán: </span> <br />
                                Zappy đã chia từ vựng, ngữ pháp, chữ hán theo từng bài tương ứng trong sách <span class="fw-bold">Dekiru Nihongo</span> để bạn có thể học và ôn tập theo kiến thức trên lớp một cách thuận tiện nhất. <br />
                                Cụ thể: Bài 1, Bài 2, Bài 3 tương đương môn JPD111; Bài 4, Bài 5, Bài 6, Bài 7 tương đương môn JPD121. <br />
                                <img src={hinh2} class="rounded img-thumbnail mx-auto d-block my-1" />
                                <span class="fw-bold">Từ vựng</span> được thiết kế dưới dạng flashcard, mặt trước có từ vựng, cách đọc, ví dụ và hình ảnh minh họa, mặt sau có nghĩa của từ vựng và nghĩa của ví dụ. <br />
                                <img src={hinh3} class="rounded img-thumbnail mx-auto d-block my-1" />

                                <span class="fw-bold">Ngữ pháp</span> được thiết kế dưới dạng list, khi bạn ấn vào một ngữ pháp, Zappy sẽ hiển thị ý nghĩa, ví dụ, hình ảnh minh họa cho ngữ pháp đó. <br />
                                <img src={hinh4} class="rounded img-thumbnail mx-auto d-block my-1" />

                                <span class="fw-bold">Chữ hán</span> được thiết kế dưới dạng thẻ bao gồm cách viết, cách đọc, âm Ôn, âm Kun, ý nghĩa, cách nhớ và hình ảnh minh họa cho chữ hán đó. <br />
                                <img src={hinh5} class="rounded img-thumbnail mx-auto d-block my-1" />

                                Ở mỗi phần học từ vựng, ngữ pháp, chữ hán, Zappy sẽ có các câu hỏi luyện tập cho từng bài mà bạn đang học. <br />
                                Ví dụ: bạn đang học từ vựng của bài 1, khi ấn vào nút <span class="fw-bold">"Luyện tập"</span>, Zappy sẽ hiển thị các câu hỏi luyện tập cho phần từ vựng của bài 1. Tương tự như vậy với phần học ngữ pháp và chữ hán.
                                Để bạn có thể theo dõi quá trình học thuận tiện hơn, Zappy có chức năng lưu lại <span class="fw-bold">tiến độ học tập</span> của bạn cho từng kỹ năng cũng như cho toàn bộ quá trình học. <br />
                                <img src={hinh6} class="rounded img-thumbnail mx-auto d-block my-1" />

                                <span class="fw-bold">Thanh tiến độ</span> của mỗi kỹ năng được chia thành <span class="fw-bold">7 phần</span> tương ứng với <span class="fw-bold">7 bài học</span>. <br />
                                Thanh tiến độ học tập của quá trình học là tổng hợp tiến độ của 3 kỹ năng.<br />
                                Khi 1 bài luyện tập đạt từ 80% trở lên, bạn sẽ được tính là đã hoàn thành 1 bài học của 1 kỹ năng. <br />
                                Ví dụ: Thanh tiến độ phần từ vựng đang là 1/7, khi bạn làm bài luyện tập bài 2 phần từ vựng được 80% trở lên, thanh tiến độ của từ vựng sẽ tăng lên là 2/7.<br />

                                <img src={hinh7} class="rounded img-thumbnail mx-auto d-block my-1" />
                                <img src={hinh8} class="rounded img-thumbnail mx-auto d-block my-1" />

                                <span class="fw-bold">Ngoài ra,</span> Zappy căn cứ vào tần suất hoạt động của bạn tại Zappy để tính điểm level cho bạn, tần suất hoạt động càng nhiều, level sẽ càng tăng.<br />
                                Điểm level được tính dựa trên số câu trả lời đúng của bài luyện tập, bài kiểm tra và số điểm của mỗi trò chơi quy đổi thành điểm kinh nghiệm và tính vào điểm level.<br />
                                <img src={hinh9} class="rounded img-thumbnail mx-auto d-block my-1" />

                                <span class="fw-bold">Chúc bạn có những trải nghiệm vui vẻ tại Zappy!</span>


                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Study;