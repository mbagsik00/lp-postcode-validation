
import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Row
} from 'react-bootstrap';
import { MessageAlert } from '../../components';
import { AUTH_KEY, SEARCH_URL } from '../../config';
import { AU_STATES, generateAlertMessage } from '../../utils/helpers';
import Superagent from 'superagent';

export default function PostcodeForm() {
  const [state, setState] = useState('');
  const [alertMessage, setAlertMessage] = useState({
    type: '',
    message: ''
  });

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postCode = e.target.postCode.value;
    const suburb = e.target.suburb.value;

    const requestBuilder = Superagent
      .get(SEARCH_URL)
      .query({ q: postCode })
      .set('AUTH-KEY', AUTH_KEY);

    const response = await requestBuilder;
    const localities = JSON.parse(response.text);
    const alertMessage = generateAlertMessage(
      localities,
      {
        postCode,
        suburb,
        state
      }
    );

    setAlertMessage(alertMessage);
  };

  return (
    <div>
      <Card>
        <Card.Header as="h5" className="text-center font-weight-bold">Lawpath Postcode Validation</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="postCode">
              <Form.Label column sm="2">
                Postcode
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" maxLength="4" required/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="suburb">
              <Form.Label column sm="2">
                Suburb
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" required/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="state">
              <Form.Label column sm="2">
                State
              </Form.Label>
              <Col sm="10">
                <Form.Control as="select" onChange={handleStateChange}>
                  <option>Select State</option>
                  {Object.keys(AU_STATES).map((state, i) => (<option key={i}>{state}</option>))}
                </Form.Control>
              </Col>
            </Form.Group>

            <MessageAlert alertMessage={alertMessage}/>

            <Row className="justify-content-md-center"> 
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
