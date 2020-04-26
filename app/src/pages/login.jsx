import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Spinner } from '../components/spinner';
import { Form, FormGroup, FormLabel, FormControl, Button, Toast, ToastHeader, ToastBody } from 'react-bootstrap';

export const Login = () => {
  const [ { email, password, password2, username }, setState ] = useState({ email: '', password: '', password2: '', username: '' });
  const [ logged, setLogged ] = useState(false);
  const [ logging, setLogging ] = useState(false);
  const [ errorMessage, setError ] = useState('');
  const history = useHistory();
  const isSignup = history.location.pathname === '/signup';

  const login = () => {
    const baseUrl = '/rest';
    const url = isSignup ? `${ baseUrl }/register` : `${ baseUrl }/login`;
    const loginDataCheck = email && password;
    const signupDataCheck = loginDataCheck && password2 && username;
    if ((isSignup && signupDataCheck) || (!isSignup && loginDataCheck)) {
      const body = isSignup ?
        JSON.stringify({ email, password, password2, username }) :
        JSON.stringify({ email, password });
      setLogging(true);
      fetch(url, {
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
            return true;
          } else {
            throw json;
          }
        })
        .then(setLogged)
        .catch(err => {
          console.error(err);
          setError(err.msg);
        })
        .finally(() => setLogging(false));
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    login();
  }

  if (logged) {
    return <Redirect to="/home" />
  }

  const handleEmailChange = event => {
    const { target: { value: email } } = event;
    setState({ email, password, password2, username });
  }

  const handleUsernameChange = event => {
    const { target: { value: username } } = event;
    setState({ email, password, password2, username });
  }

  const handlePasswordChange = event => {
    const { target: { value: password } } = event;
    setState({ email, password, password2, username });
  }

  const handlePassword2Change = event => {
    const { target: { value: password2 } } = event;
    setState({ email, password, password2, username });
  }

  return (
    logging ?
      <Spinner /> :
      (
        <>
          <Form onSubmit={handleSubmit}>
            {
              isSignup ?
                (
                  <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormControl
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                  </FormGroup>
                ) :
                null
            }
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
            {
              isSignup ?
                (
                  <FormGroup>
                    <FormLabel>Confirm your password</FormLabel>
                    <FormControl
                      type="password"
                      value={password2}
                      onChange={handlePassword2Change}
                      required
                    />
                  </FormGroup>
                ) :
                null
            }
            <Button type="submit" disabled={!email || !password}>
              {
                isSignup ?
                  'signup' :
                  'login'
              }
            </Button>
          </Form>
          {
            errorMessage ?
              (
                <Toast
                  style={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                  }}
                  onClose={() => setError('')}
                  delay={3000}
                  autohide
                >
                  <ToastHeader>
                    Caution
                </ToastHeader>
                  <ToastBody>
                    {errorMessage}
                  </ToastBody>
                </Toast>
              ) :
              null
          }
        </>
      )
  );
};
