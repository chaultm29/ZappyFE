import React, { useState } from "react";
import LessonManagerContent from "../../components/ContentManager/LessonManagerContent";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";

export default function LessonManager() {
  const [username, setUserName] = useState("MinhLD");
  const [role, setRole] = useState("Content Manager");
  const [site, setSite] = useState("Quản lý bài học");
  const [siteContent, setSiteContent] = useState(<LessonManagerContent />);
  return (
    <div class="d-flex flex-row" id="wrapper">
      <Sidebar role={role} />
      <MainPanel username={username} site={site} siteContent={siteContent} />
    </div>
  );
}
