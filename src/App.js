import "./App.css";
import React from "react";
import Dashboard from "./pages/Admin/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountManager from "./pages/Admin/AccountManager";

import Study from "./pages/Student/Study";
import Katakana from "./pages/Student/Katakana";
import Alphabet from "./pages/Student/Alphabet";
import Homepage from "./pages/Student/Homepage";
import Vocabulary from "./pages/Student/Vocabulary";
import Exam from "./pages/Student/Exam";
import Hiragana from "./pages/Student/Hiragana";
import Kanji from "./pages/Student/Kanji";
import Grammar from "./pages/Student/Grammar";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import QuestionManager from "./pages/ContentManager/QuestionManager";
import KanjiManager from "./pages/ContentManager/KanjiManager";
import VocabularyManager from "./pages/ContentManager/VocabularyManager";
import GrammarManager from "./pages/ContentManager/GrammarManager";
import NotFoundPage from "./pages/User/NotFoundPage";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin/dashboard" component={Dashboard}></Route>
        <Route path="/admin/acc-mng" component={AccountManager}></Route>

        <Route path="/home" component={Homepage}></Route>
        <Route exact path="/study" component={Study}></Route>
        <Route path="/study/alphabet" component={Alphabet}></Route>
        <Route path="/study/hiragana" component={Hiragana}></Route>
        <Route path="/study/katakana" component={Katakana}></Route>
        <Route exact path="/study/kanji/lesson/:id" component={Kanji}></Route>
        <Route path="/study/vocabulary/lesson/:id" component={Vocabulary}></Route>
        <Route path="/study/grammar/lesson/:id" component={Grammar}></Route>

        <Route path="/content-mng/question-mng" component={QuestionManager}></Route>
        <Route path="/content-mng/lesson-mng/kanji" component={KanjiManager}></Route>
        <Route path="/content-mng/lesson-mng/vocabulary" component={VocabularyManager}></Route>
        <Route path="/content-mng/lesson-mng/grammar" component={GrammarManager}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>

        <Route path="/exam" component={Exam}></Route>

        <Route path="*" component = {NotFoundPage} ></Route>
        <Route path="/notfound" component = {NotFoundPage} ></Route>
      </Switch>
    </Router>
  );
}

export default App;
