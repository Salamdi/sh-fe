import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Random } from './pages/random/random';
import { Spinner } from './components/spinner';
import { Switch, Route, BrowserRouter as Router, Redirect, Link, useHistory } from 'react-router-dom';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { Container, Row, Button, Nav, NavItem, NavLink } from 'react-bootstrap';
import './style.scss';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '/graphql',
    headers: {
      'Authorization': `Bearer ${ JSON.parse(localStorage.getItem('service-house.auth'))?.token }`,
    }
  })
});

const App = () => {
  const history = useHistory();
  const handleHistoryPush = path => history.push(path);
  return (
    <Container>
      <Row>
        <Nav onSelect={handleHistoryPush} >
          <NavItem>
            <NavLink eventKey="login">
              login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="signup">
              signup
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="random">
              random
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="home">
              favorites
            </NavLink>
          </NavItem>
        </Nav>
      </Row>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/random">
          <Random />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Container>
  )
}

render(
  <ApolloProvider client={client} >
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);
