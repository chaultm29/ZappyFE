import React, { useState } from "react";
import KanjiManagerContent from "../../components/ContentManager/KanjiManagerContent";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";

export default function LessonManager() {
  const [username, setUserName] = useState("MinhLD");
  const [role, setRole] = useState("Content Manager");
  const [site, setSite] = useState("Quản lý bài học - Chữ Hán");
  const [siteContent, setSiteContent] = useState(<KanjiManagerContent />);
  return (
    <div class="d-flex flex-row" id="wrapper">
      <Sidebar role={role} />
      <MainPanel username={username} site={site} siteContent={siteContent} />
    </div>
  );
}
