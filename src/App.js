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

function App() {
  return (
    <Router>

      <Switch>
        <Route path = "/admin/dashboard" component = {Dashboard} ></Route>
        <Route path = "/home" component = {Homepage} ></Route>
        <Route path = "/study" component = {Study} exact ></Route>
        <Route path = "/study/alphabet" component = {Alphabet}></Route>
        <Route path = "/study/hiragana" component = {Hiragana}></Route>
        <Route path = "/study/katakana" component = {Katakana}></Route>
        <Route path = "/study/kanji" component = {Kanji}></Route>
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
