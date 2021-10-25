import "./App.css";
import React from "react";
import Dashboard from "./pages/Admin/Dashboard";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Homepage from "./pages/Student/Homepage";
import Study from "./pages/Student/Study";
import Alphabet from "./pages/Student/Alphabet";
import Hiragana from "./pages/Student/Hiragana";
import Katakana from "./pages/Student/Katakana";
import Kanji from "./pages/Student/Kanji";

import AccountManager from "./pages/Admin/AccountManager";
import useScript from "./services/useScript";
import Vocabulary from "./pages/Student/Vocabulary";
import { Redirect } from "react-router/cjs/react-router.min";

function App() {
  return (
    <Router>

      <Switch>
        <Route path = "/admin/dashboard" component = {Dashboard} ></Route>
        <Route path = "/home" component = {Homepage} ></Route>
        <Route exact path = "/study" component = {Study} ></Route>
        <Route path = "/study/alphabet" component = {Alphabet}></Route>
        <Route path = "/study/hiragana" component = {Hiragana}></Route>
        <Route path = "/study/katakana" component = {Katakana}></Route>
        <Route exact path = "/study/kanji/lesson/:id" component = {Kanji}></Route>
        <Route path = "/study/vocabulary/lesson/:id" component = {Vocabulary}></Route>
        
        </Switch>

      <Route
        path="/admin/acc-mng"
        component={AccountManager}
        render={() => (
          <h1>alo1234</h1>
          //  <script type="text/javascript" src="./AccountManagerJS.js"></script>
        )}
      ></Route>
       
    </Router>
  );
}

export default App;
