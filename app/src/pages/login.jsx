import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from '../components/spinner';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

export const Login = () => {
  const [ { email, password }, setState ] = useState({ email: '', password: '' });
  const [ logged, setLogged ] = useState(false);
  const [ logging, setLogging ] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (email && password) {
      const body = JSON.stringify({ email, password });
      setLogging(true);
      fetch('http://127.0.0.1:8080/rest/login', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(json => {
          if (json.token) {
            localStorage.setItem('service-house.auth', JSON.stringify(json));
            setLogged(true);
          } else {
            throw json;
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLogging(false));
    }
  }

  if (logged) {
    return <Redirect to="/home" />
  }

  const handleEmailChange = event => {
    const { target: { value: email } } = event;
    setState({ email, password });
  }

  const handlePasswordChange = event => {
    const { target: { value: password } } = event;
    setState({ email, password });
  }
  return (
    logging ?
      <Spinner /> :
      (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </FormGroup>
            <Button type="submit" disabled={!email || !password}>login</Button>
        </Form>
      )
  );
};
