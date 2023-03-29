import logo from "./logo.svg";
import "./App.css";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import { Link, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path={"/"} component={Home} exact />
        <Route path="/tab1" component={Page1} exact />
        <Route path="/tab2" component={Page2} exact />
        <Route path="/tab3" component={Page3} exact />
      </Switch>
    </div>
  );
}

export default App;
