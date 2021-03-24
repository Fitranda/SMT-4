import "bootstrap/dist/css/bootstrap.min.css";
import Back from "./back/Back";
import Front from "./front/Front";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./back/Login";

function App() {
  return (
    <div className="container">
      <Router>
        <Route path="/" component={Front} exact />
        <Route path="/home" component={Front} />
        <Route path="/admin" component={Back} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
