import React, { useState } from "react";
import AccountManagerContent from "../../components/Admin/AccountManagerContent";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";
import AuthenticationService from "../../services/AuthenticationService";

export default function AccountManager() {
  const [username, setUserName] = useState(AuthenticationService.getCurrentUser());
  const [role, setRole] = useState("Account Manager");
  const [site, setSite] = useState("Quản lý tài khoản");
  const [siteContent, setSiteContent] = useState(<AccountManagerContent />);
  return (
    <div class="d-flex flex-row" id="wrapper">
      <Sidebar role={role} />
      <MainPanel username={username} site={site} siteContent={siteContent} />
    </div>
  );
}
