import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Student/Navigation";
import Sidebar from "../../components/Student/Sidebar";


const NotFoundPage = () => (
  <div className="not-found">
    <Navigation />
    <div
      className="container mt-2"
      style={{ backgroundColor: "#fceced", borderRadius: "15px" }}
    >
      <div class="row">
        {/* <Sidebar /> */}

        <div class="col-md-9 mx-auto" style={{ width: "73%", justifyContent: "center" }}>
          Không có bài học nào ở đây cả. Bạn tìm nhầm chăng?
                  <Link to="/study" className="link-home">
            Go Home
    </Link>
        </div>
      </div>
    </div>
    {/* <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
    /> */}

  </div>
);

export default NotFoundPage;