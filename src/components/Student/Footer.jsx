import React from "react";
import "./css/footer.css";
export default function Footer() {
  return (
    <footer class="footer-16371">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-9 text-center">
            <div class="footer-site-logo mb-4">
              <a href="#">Zappy</a>
            </div>
            <ul class="list-unstyled nav-links mb-3">
              <li>
                <a href="#">Về chúng tôi</a>
              </li>
              <li>
                <a href="#">Tầm nhìn</a>
              </li>
              <li>
                <a href="#">Hướng dẫn sử dụng</a>
              </li>
              <li>
                <a href="#">Quy định</a>
              </li>
              <li>
                <a href="#">Liên lạc</a>
              </li>
            </ul>
            <div class="copyright">
              <p class="mb-1">

                Trong quá trình làm chúng mình không tránh được khỏi những sai sót nhất định. <br />Nếu có gì thắc mắc hoặc phản hồi, vui lòng gửi đến hòm thư: zappy-js@gmail.com
                {/* <small style={{ paddingRight: "0px" }}>© Zappy Team. All Rights Reserved.</small> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
