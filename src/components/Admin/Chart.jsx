import React from "react";
import { Line } from "react-chartjs-2";
import "./Chart.css";
const chartColor = "#FFFFFF";

const data = (canvas) => {
  var ctx = canvas.getContext("2d");
  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(1, "#80b6f4");
  gradientStroke.addColorStop(1, chartColor);

  var gradientFill = ctx.createLinearGradient(0, 570, 0, 100);
  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  // gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
  gradientFill.addColorStop(1, "rgba(233, 140, 137, 0.70)");
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Active Users",
        // borderColor: "#f96332",
        borderColor: "#39354F",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 5,
        fill: true,
        backgroundColor: gradientFill,
        borderWidth: 2,
        data: [100, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630],
      },
    ],
  };
};
const options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    bodySpacing: 4,
    mode: "average",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10,
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        display: 0,
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        display: 0,
        ticks: {
          display: false,
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  layout: {
    padding: { left: 0, right: 0, top: 0, bottom: 15 },
  },
};

export default function Chart() {
  return (
    <div class="row mt-2">
      <span class="fs-5 fw-bold">Year Overview</span>
      <div class="chart-wrapper">
        <Line height={400} data={data} options={options} />
      </div>
    </div>
  );
}
