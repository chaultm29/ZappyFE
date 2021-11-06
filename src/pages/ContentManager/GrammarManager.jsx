import React, { useState } from "react";
import GrammarManagerContent from "../../components/ContentManager/GrammarManagerContent";
import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";

export default function GrammarManager() {
    const [username, setUserName] = useState("MinhLD");
    const [role, setRole] = useState("Content Manager");
    const [site, setSite] = useState("Quản lý bài học - Ngữ pháp");
    const [siteContent, setSiteContent] = useState(<GrammarManagerContent />);
    return (
        <div class="d-flex flex-row" id="wrapper">
            <Sidebar role={role} />
            <MainPanel username={username} site={site} siteContent={siteContent} />
        </div>
    );
}
