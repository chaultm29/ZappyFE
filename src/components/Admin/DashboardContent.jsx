import React from "react";
import Analytic from "../Admin/Analytic.jsx";
import CalendarEmb from "../Admin/Calendar.jsx";
import Chart from "../Admin/Chart.jsx";
import Schedule from "../Admin/Schedule.jsx";
import TopDistributor from "../Admin/TopDistributor.jsx";
export default function DashboardContent() {
  return (
    <div class="container-fluid px-4">
      <div className="row">
        <div className="col-sm-9">
          <Analytic />
          <Chart />
          <TopDistributor />
        </div>
        <div className="col-sm-3">
          <CalendarEmb />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
