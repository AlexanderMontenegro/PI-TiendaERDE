import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
        <Route path="/welcome" component={Welcome} />
      </Switch>
    </Router>
  );
}

export default App;
