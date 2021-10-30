import React, { useState } from "react";
import AccountManagerContent from "../../components/Admin/AccountManagerContent";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";

export default function AccountManager() {
  const [username, setUserName] = useState("MinhLD");
  const [site, setSite] = useState("Quản lý tài khoản");
  const [siteContent, setSiteContent] = useState(<AccountManagerContent />);
  return (
    <div class="d-flex flex-row" id="wrapper">
      <Sidebar />
      <MainPanel username={username} site={site} siteContent={siteContent} />
    </div>
  );
}
