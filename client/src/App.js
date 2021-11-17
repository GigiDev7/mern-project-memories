import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar user={user} setUser={setUser} />
        <Switch>
          <Route path="/" exact>
            <Home user={user} setUser={setUser} />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
