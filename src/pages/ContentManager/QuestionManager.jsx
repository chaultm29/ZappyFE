import React, { useState } from "react";
import QuestionManagerContent from "../../components/ContentManager/QuestionManagerContent";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";

export default function QuestionManager() {
  const [username, setUserName] = useState("MinhLD");
  const [role, setRole] = useState("Content Manager");
  const [site, setSite] = useState("Quản lý câu hỏi");
  const [siteContent, setSiteContent] = useState(<QuestionManagerContent />);
  return (
    <div class="d-flex flex-row" id="wrapper">
      <Sidebar role={role} />
      <MainPanel username={username} site={site} siteContent={siteContent} />
    </div>
  );
}
