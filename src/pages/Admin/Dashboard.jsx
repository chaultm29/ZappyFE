import React, { useState } from "react";
import DashboardContent from "../../components/Admin/DashboardContent";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";

export default function Dashboard() {
  const { username, setUserName } = useState("MinhLD");
  const [site, setSite] = useState("Dashboard");
  const [siteContent, setSiteContent] = useState(<DashboardContent />);
  return (
    <div class="d-flex flex-row" id="wrapper">
      <Sidebar />
      <MainPanel username={username} site={site} siteContent={siteContent} />
    </div>
  );
}
