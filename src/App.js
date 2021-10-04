import "./App.css";
import React from "react";
import Dashboard from "./pages/Admin/Dashboard";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Route path="/admin/dashboard" component={Dashboard}></Route>
    </Router>
  );
}

export default App;
