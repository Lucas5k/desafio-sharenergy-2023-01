import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import Random from '../Pages/Random';
import StatusCode from '../Pages/StatusCode';

function RouterPages() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/home" component={ Home } />
      <Route path="/random" component={ Random } />
      <Route path="/statuscode" component={ StatusCode } />
    </Switch>
  );
}

export default RouterPages;