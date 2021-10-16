import "./App.css";
import React from "react";
import Dashboard from "./pages/Admin/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountManager from "./pages/Admin/AccountManager";
import useScript from "./services/useScript";
function App() {
  return (
    <Router>
      <Route path="/admin/dashboard" component={Dashboard}></Route>
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
