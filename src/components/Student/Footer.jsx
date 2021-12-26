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
            <ul class="list-unstyled nav-links mb-5">
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
            <div class="social mb-4">
              <h3>Chúng tôi </h3>
              <ul class="list-unstyled">
                <li class="in">
                  <a href="#">
                    <span class="icon-instagram"></span>
                  </a>
                </li>
                <li class="fb">
                  <a href="#">
                    <span class="icon-facebook"></span>
                  </a>
                </li>
                <li class="tw">
                  <a href="#">
                    <span class="icon-twitter"></span>
                  </a>
                </li>
                <li class="pin">
                  <a href="#">
                    <span class="icon-pinterest"></span>
                  </a>
                </li>
                <li class="dr">
                  <a href="#">
                    <span class="icon-dribbble"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="copyright">
              <p class="mb-0">
                <small>© Zappy Team. All Rights Reserved.</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
