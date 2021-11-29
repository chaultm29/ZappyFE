import React, { useState } from "react";
import VocabularyManagerContent from "../../components/ContentManager/VocabularyManagerContent";

import MainPanel from "../../components/UI/MainPanel";
import Sidebar from "../../components/UI/Sidebar";
import AuthenticationService from "../../services/AuthenticationService";

export default function VocabularyManager() {
    const [username, setUserName] = useState(AuthenticationService.getCurrentUser());
    const [role, setRole] = useState("Content Manager");
    const [site, setSite] = useState("Quản lý bài học - Từ vựng");
    const [siteContent, setSiteContent] = useState(<VocabularyManagerContent />);
    return (
        <div class="d-flex flex-row" id="wrapper">
            <Sidebar role={role} />
            <MainPanel username={username} site={site} siteContent={siteContent} />
        </div>
    );
}
