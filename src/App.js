import "./App.css";
import React from "react";
import Dashboard from "./pages/Admin/Dashboard";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountManager from "./pages/Admin/AccountManager";
function App() {
  return (
    <Router>
      <Route path="/admin/dashboard" component={Dashboard}></Route>
      <Route path="/admin/acc-mng" component={AccountManager}></Route>
    </Router>
  );
}

export default App;
