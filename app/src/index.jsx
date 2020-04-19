import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Random } from './pages/random/random';
import { Spinner } from './components/spinner';
import { Switch, Route, BrowserRouter as Router, Redirect, Link } from 'react-router-dom';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { Container, Row, Button, Nav, NavItem, NavLink } from 'react-bootstrap';
import './style.scss';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:8080/graphql',
    headers: {
      'Authorization': `Bearer ${ JSON.parse(localStorage.getItem('service-house.auth')).token }`,
    }
  })
});

const App = () => {
  return (
    <Container>
      <Row>
        <Nav>
          <NavItem>
            <NavLink eventKey="home">
              <Link to="/home">favorites</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="login">
              <Link to="/login">login</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="random">
              <Link to="/random">random</Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Row>
      <Switch>
        <Route path="/login">
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
