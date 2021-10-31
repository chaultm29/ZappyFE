import "./App.css";
import React from "react";
import Dashboard from "./pages/Admin/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountManager from "./pages/Admin/AccountManager";

import useScript from "./services/useScript";
import { Redirect } from "react-router/cjs/react-router.min";

import Study from "./pages/Student/Study";
import Katakana from "./pages/Student/Katakana";
import Alphabet from "./pages/Student/Alphabet";
import Homepage from "./pages/Student/Homepage";
import Vocabulary from "./pages/Student/Vocabulary";
import Exam from "./pages/Student/Exam";
import Hiragana from "./pages/Student/Hiragana";
import Kanji from "./pages/Student/Kanji";
import Grammar from "./pages/Student/Grammar";

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/admin/dashboard" component = {Dashboard} ></Route>
        <Route path="/admin/acc-mng" component={AccountManager}></Route>

        <Route path = "/home" component = {Homepage} ></Route>
        <Route exact path = "/study" component = {Study} ></Route>
        <Route path = "/study/alphabet" component = {Alphabet}></Route>
        <Route path = "/study/hiragana" component = {Hiragana}></Route>
        <Route path = "/study/katakana" component = {Katakana}></Route>
        <Route exact path = "/study/kanji/lesson/:id" component = {Kanji}></Route>
        <Route path = "/study/vocabulary/lesson/:id" component = {Vocabulary}></Route>
        <Route path = "/study/grammar/lesson/:id" component = {Grammar}></Route>
        
        <Route path="/study/exam" component={Exam}></Route>
      </Switch>

    </Router>
  );
}

export default App;
