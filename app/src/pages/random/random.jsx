import React, { useState } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Row,
  Toast,
  ToastHeader,
  ToastBody
} from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';
import './random.scss';



const GET_FAVS = gql`
  query Favs($userId: Int!) {
    jokes (userId: $userId) {
      id
    }
  }
`;

const ADD_FAV = gql`
  mutation AddFav($userId: Int!, $id: Int!, $joke: String!) {
    createJoke(
      userId: $userId,
      id: $id,
      joke: $joke,
    ) {
      id,
      joke,
    }
  }
`;

export const Random = () => {
  const [ jokes, setJokes ] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_FAVS, {
    variables: {
      userId: JSON.parse(localStorage.getItem('service-house.auth')).user.id,
    }
  });
  const [ errorMessage, setError ] = useState('');

  const [ addFav, { _ } ] = useMutation(ADD_FAV);

  const favs = data ? data.jokes.map(jokeType => jokeType.id) : [];

  const handleClick = ({ id, joke }) => {
    addFav({
      variables: {
        id,
        userId: JSON.parse(localStorage.getItem('service-house.auth')).user.id,
        joke,
      }
    }).then(result => refetch())
      .catch(err => {
        const msg = err?.message.includes(': ') ? err.message.split(': ')[ 1 ] : err.message;
        setError(msg);
      });
  }

  if (!jokes.length) {
    fetch('http://127.0.0.1:8080/rest/random')
      .then(res => res.json())
      .then(({ type, value }) => {
        if (type === 'success') {
          setJokes(value);
        }
      })
  }

  return (
    <>
      {
        jokes.map(joke => (
          <Row key={joke.id} className="bottom-margin">
            <Col xs={10}>
              {joke.joke}
            </Col>
            <Col xs={2}>
              <Button
                variant={favs.includes(joke.id) ? "primary" : "light"}
                onClick={() => handleClick(joke)}
              >
                fav
              </Button>
            </Col>
          </Row>
        ))
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
                Error
              </ToastHeader>
              <ToastBody>
                {errorMessage}
              </ToastBody>
            </Toast>
          ) :
          null
      }
    </>
  );
};
