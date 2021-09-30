import React from "react";
import "./Analytic.css";

export default function Analytic() {
  return (
    <div class="row analytic-wrapper">
      <div className="col-lg-4 col-md-4 col-sm-6">
        <div class="card border-0 bg-transparent">
          <div class="card-body">
            <div className="row">
              <div className="col-7 col-md-8">
                <h5 class="card-title text-muted">Views</h5>
                <h2 class="card-text" id="card-text-number">
                  500
                </h2>
                <span class="text-muted">Per Day</span>
              </div>
              <div className="col-5 col-md-4">
                <i id="card-icon" class="far fa-eye fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6">
        <div class="card border-0 bg-transparent">
          <div class="card-body">
            <div className="row">
              <div className="col-7 col-md-8">
                <h5 class="card-title text-muted">Visits</h5>
                <h2 class="card-text" id="card-text-number">
                  3.500
                </h2>
                <span class="text-muted">Per Week</span>
              </div>
              <div className="col-5 col-md-4">
                <i id="card-icon" class="far fa-compass fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6">
        <div class="card border-0 bg-transparent">
          <div class="card-body">
            <div className="row">
              <div className="col-7 col-md-8">
                <h5 class="card-title text-muted">Studies</h5>
                <h2 class="card-text" id="card-text-number">
                  10.000
                </h2>
                <span class="text-muted">Per Month</span>
              </div>
              <div className="col-5 col-md-4">
                <i id="card-icon" class="fas fa-user-graduate fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
