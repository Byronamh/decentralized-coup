import {Lobby} from '../Lobby'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
     <Switch>
          <Route path="/">
            <Lobby />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
