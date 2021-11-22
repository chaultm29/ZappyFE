import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import DoExam from '../../components/Student/DoExam';
import Sidebar from "../../components/Student/Sidebar";
import Navigation from "../../components/Student/Navigation";
import bg from "../../assets/img/bg-home-scene-winter.svg";

export default function Practice() {
    let { catName, lessId } = useParams();
    return (
        <div
            style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "bottom" }}>
            <Navigation />
            <div className="container" style={{ backgroundColor: "#fceced", borderRadius: "15px 15px 0px 0px" }}>
                <div class="row mt-2">
                    <Sidebar />
                    <div class="col-md-9">
                        {catName === "kanji" ? <DoExam options={[{ typeIds: [1, 2, 3, 4], numberOfQuestion: 15, lessonIds: [parseInt(lessId)], skillIds: [3] }]} />
                            : catName === "grammar" ? <DoExam options={[{ typeIds: [1, 2, 3, 4], numberOfQuestion: 20, lessonIds: [parseInt(lessId)], skillIds: [2] }]} />
                                : catName === "vocabulary" ? <DoExam options={[{ typeIds: [1, 2, 3, 4], numberOfQuestion: 30, lessonIds: [parseInt(lessId)], skillIds: [1] }]} /> : ""};
                    </div>
                </div>
            </div>

        </div>
    )
}
