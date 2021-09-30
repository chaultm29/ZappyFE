import React from "react";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";

export default function Dashboard() {
  return (
    <div class="d-flex flex-row" id="wrapper">
      <Sidebar />
      <MainPanel />
    </div>
  );
}
