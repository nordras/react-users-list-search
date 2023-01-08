import './App.css';

import { Container, Col, Row, Table, Form } from 'react-bootstrap'
import { useCallback, useEffect, useState } from 'react';
import styled from "styled-components";

const dataUrl = process.env.REACT_APP_DATA_URL

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: black;
  margin: 2.5rem 0;
`;

const UserTR = ({ name, email, website }) => (
  <tr>
    <td>{name}</td>
    <td>{email}</td>
    <td>{website}</td>
  </tr>
)

function App() {
  const [users, setSetUsers] = useState([]);
  const [results, setResult] = useState();
  const [search, setSearch] = useState();

  const getUsers = useCallback(() => fetch(dataUrl).then(response => response.json()).then(result => setSetUsers(result)), [])

  useEffect(() => { getUsers() }, [getUsers])

  const data = results?.length ? results : users

  useEffect(() => {
    search?.length && setResult(users?.filter(user => user?.name?.toLowerCase().includes(search.toLowerCase())))
  }, [search, users])

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Title>List of Users</Title>
          </Col>
        </Row>
        <Row>
          <Col xs={{span: 4, offset: 8}}>
            <Form.Group className="mb-3" controlId="text.SearchInput">
              <Form.Control type="text" placeholder="search" onChange={(e) => setSearch(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((user, i) => <UserTR key={`user-row-${i}`} {...user} />)
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
