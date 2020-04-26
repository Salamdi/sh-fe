import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Row, Col, Button, Toast, ToastHeader, ToastBody } from 'react-bootstrap';
import { Spinner } from '../components/spinner';

const GET_FAVS = gql`
  query Favs($userId: Int!) {
    jokes (userId: $userId) {
      id,
      joke,
    }
  }
`;

const RM_FAV = gql`
  mutation RmFav($userId: Int!, $id: Int!) {
    removeFromFavorites(
      userId: $userId,
      id: $id,
    ) {
      id,
      joke,
    }
  }
`;

export const Home = () => {
  const [ authorized, setAuthorized ] = useState(false);
  const [ validated, setValidated ] = useState(false);
  const storeAuth = JSON.parse(localStorage.getItem('service-house.auth'));
  if (!storeAuth) {
    return <Redirect to="login" />;
  }
  if (storeAuth && !authorized && !validated) {
    fetch(
      '/rest/validate',
      {
        method: 'POST',
        body: JSON.stringify({ token: storeAuth.token }),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
      .then(res => res.json())
      .then(({ valid }) => setAuthorized(valid))
      .catch(err => console.error(err))
      .finally(() => setValidated(true));
  }

  const { loading, error, data, refetch } = useQuery(GET_FAVS, {
    variables: {
      userId: JSON.parse(localStorage.getItem('service-house.auth'))?.user.id,
    }
  });

  const [ rmFav, { _ } ] = useMutation(RM_FAV);

  const favs = data ? data.jokes.map(({ id, joke }) => ({ id, joke })) : [];

  const handleClick = ({ id, joke }) => {
    rmFav({
      variables: {
        id,
        userId: JSON.parse(localStorage.getItem('service-house.auth'))?.user.id,
      }
    }).then(result => refetch())
      .catch(err => console.error(err));
  }

  const [ count, setCount ] = useState(4);

  const [ timerId, setTimerId ] = useState(null);

  const [ errorMessage, setError ] = useState('');

  const handleTimer = (n = 1) => {
    const newCount = count - n;
    setCount(newCount);
    if (newCount < 1) {
      fetch('/rest/addRandom', {
        headers: { 'Authorization': `Bearer ${ JSON.parse(localStorage.getItem('service-house.auth')).token }` }
      })
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            throw json;
          }
        })
        .then(() => refetch())
        .then(({ data, errors }) => {
          if (errors || data?.jokes?.length === 10) {
            throw new Error('You have reached maximum amount of favorite jokes');
          }
        })
        .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
        .then(() => setCount(3))
        .then(() => setTimeout(handleTimer, 500))
        .then(setTimerId)
        .catch(err => {
          setError(err.message || err.error || 'Unknown error');
          setCount(4);
        });
    } else {
      const timerId = setTimeout(() => handleTimer(n + 1), 1000);
      setTimerId(timerId);
    }
  }

  const handleRandomClick = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
      setCount(4);
    } else {
      const timerId = handleTimer();
      setTimerId(timerId);
    }
  }

  if (validated && !authorized) {
    return <Redirect to="login" />;
  }

  return !validated ?
    <Spinner /> :
    <>
      <Row className="justify-content-center">
        <Col xs={10} md={4} >
          <Button block onClick={handleRandomClick} disabled={favs.length > 9}>
            {count > 3 ? 'random joke timer' : count}
          </Button>
        </Col>
      </Row>
      {
        favs.length ?
          favs.map(joke => (
            <Row key={joke.id} className="bottom-margin">
              <Col xs={10}>
                {joke.joke}
              </Col>
              <Col xs={2}>
                <Button
                  variant="danger"
                  onClick={() => handleClick(joke)}
                >
                  remove
            </Button>
              </Col>
            </Row>
          )) :
          <>
            <Row className="justify-content-center">
              <Col className="justify-content-center">
                <h3 className="empty-message empty-message--margin-top">You don't have favorite jokes yet</h3>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="justify-content-center">
                <h3 className="empty-message">Go to random page to pick some</h3>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="justify-content-center">
                <h3 className="empty-message">Or click the button above</h3>
              </Col>
            </Row>
          </>
      }
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
}
