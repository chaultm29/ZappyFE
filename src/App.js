import "./App.css";
import React from "react";
import Dashboard from "./pages/Admin/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountManager from "./pages/Admin/AccountManager";
import Exam from "./pages/Student/Exam";
import Hiragana from "./pages/Student/Hiragana";
import Kanji from "./pages/Student/Kanji";
import Katakana from "./pages/Student/Katakana";
import Alphabet from "./pages/Student/Alphabet";
import Homepage from "./pages/Student/Homepage";

function App() {
  return (
    <Router>
      <Route path="/admin/dashboard" component={Dashboard}></Route>
      <Route path="/admin/acc-mng" component={AccountManager}></Route>
      <Route path="/study/exam" component={Exam}></Route>
      <Route path="/study/hiragana" component={Hiragana}></Route>
      <Route path="/study/kanji" component={Kanji}></Route>
      <Route path="/study/alphabet" component={Alphabet}></Route>
      <Route path="/study/katakana" component={Katakana}></Route>
      <Route path="/study/homepage" component={Homepage}></Route>
    </Router>
  );
}

export default App;
