import {Lobby} from '../Lobby'
import { Connect } from '../Connect';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { GameRoom } from '../GameRoom';

function App() { 

  return (
    <Router>
      <Switch>
      <Route path="/connect">
          <Connect />
      </Route>
      <Route path="/game/:roomId">
          <GameRoom/>
        </Route>
      <Route path="/">
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
