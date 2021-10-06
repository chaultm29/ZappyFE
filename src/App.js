import "./App.css";
import Dashboard from "./pages/Admin/Dashboard";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Homepage from "./pages/Student/Homepage";
import Study from "./pages/Student/Study";
function App() {
  return (
    
    <Router>
        <Route path = "/admin/dashboard" component = {Dashboard} ></Route>
        <Route path = "/home" component = {Homepage} ></Route>
        <Route path = "/study" component = {Study} ></Route>
      </Router>
  );
}

export default App;
