import React from "react";
import "./Schedule.css";

export default function Schedule() {
  return (
    <div class="row mt-3 mx-0 schedule-wrapper">
      <div class="d-flex flex-row justify-content-between">
        <span id="schedule-word">Schedule</span>
        <span id="view-all-word">View All</span>
      </div>
      <div class="col-sm-12 schedule-wrapper-child mt-1">
        <div class="card mx-0 border-0">
          <div class="row g-0 mx-0">
            <div class="col-sm-2 d-flex justif y-content-center align-items-center">
              <i id="card-icon1" class="far fa-eye fs-4"></i>
            </div>
            <div class="col-sm-9">
              <div class="card-body">
                <h6 class="card-title fw-bold">Calculus</h6>
                <span class="card-text text-muted">7:30 - 8:30 | MinhLD</span>
              </div>
            </div>
            <div class="col-sm-1 d-flex justify-content-center align-items-center">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 schedule-wrapper-child mt-2">
        <div class="card mx-0 border-0">
          <div class="row g-0 mx-0">
            <div class="col-sm-2 d-flex justif y-content-center align-items-center">
              <i id="card-icon2" class="far fa-compass fs-4"></i>
            </div>
            <div class="col-sm-9">
              <div class="card-body">
                <h6 class="card-title fw-bold">Fairwell Party</h6>
                <span class="card-text text-muted">9:00 - 10:30 | MinhLD</span>
              </div>
            </div>
            <div class="col-sm-1 d-flex justify-content-center align-items-center">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>{" "}
      <div class="col-sm-12 schedule-wrapper-child mt-2">
        <div class="card mx-0 border-0">
          <div class="row g-0 mx-0">
            <div class="col-sm-2 d-flex justif y-content-center align-items-center">
              <i id="card-icon3" class="fas fa-user-graduate fs-4"></i>
            </div>
            <div class="col-sm-9">
              <div class="card-body">
                <h6 class="card-title fw-bold">Opening Ceremony</h6>
                <span class="card-text text-muted">11:00 - 12:00 | MinhLD</span>
              </div>
            </div>
            <div class="col-sm-1 d-flex justify-content-center align-items-center">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
