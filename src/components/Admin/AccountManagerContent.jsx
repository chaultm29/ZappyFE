import React from "react";
import CalendarEmb from "../Admin/Calendar.jsx";
import Schedule from "../Admin/Schedule.jsx";

export default function AccountManagerContent() {
  return (
    <div class="container-fluid px-4">
      <div className="row">
        <div className="col-sm-9 accountManagerContent-wrapper">
          <button class="btn btn-primary" id="addbutton" title="Add">
            <span class="fa fa-plus-square"></span>
          </button>
          <table id="table-account" class="display table table-striped"></table>
        </div>
        <div className="col-sm-3">
          <CalendarEmb />
          <Schedule />
        </div>
      </div>
    </div>
  );
}
