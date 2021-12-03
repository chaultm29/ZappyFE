import React, { useState } from "react";
import DashboardContent from "../../components/Admin/DashboardContent";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";
import AuthenticationService from "../../services/AuthenticationService";

export default function Dashboard() {
  const [username, setUserName] = useState(AuthenticationService.getCurrentUser());
  const [role, setRole] = useState("Account Manager");
  const [site, setSite] = useState("Thống kê");
  const [siteContent, setSiteContent] = useState(<DashboardContent />);
  return (
    <div class="d-flex flex-row" id="wrapper">
      <Sidebar role={role} />
      <MainPanel username={username} site={site} siteContent={siteContent} />
    </div>
  );
}
