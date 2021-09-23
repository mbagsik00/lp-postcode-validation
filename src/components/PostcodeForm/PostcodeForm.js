
import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Row
} from 'react-bootstrap';
import { MessageAlert } from '../../components';
import * as Superagent from 'superagent';

// TODO: Move to separate file
const states = {
  NSW: 'New South Wales',
  QLD: 'Queensland',
  SA: 'South Australia',
  TAS: 'Tasmania',
  VIC: 'Victoria',
  WA: 'West Australia'
};

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
    const suburb = e.target.suburb.value.toLowerCase();

    const requestBuilder = Superagent
      .get('http://localhost:3000/api/search')
      .query({ q: postCode });

    const response = await requestBuilder;
    const localities = JSON.parse(response.text);

    // TODO: Verfication of result can be move to a separate file

    if (localities.length === 0) {
      setAlertMessage({
        type: 'danger',
        message: `The postcode ${postCode} does not exist.`
      });
      return;
    }

    // Check suburb exists in the result
    const suburbExist = localities.find((loc) => loc.location.toLowerCase() === suburb);

    if (!suburbExist) {
      setAlertMessage({
        type: 'danger',
        message: `The postcode ${postCode} does not match the suburb ${suburb}.`
      });
      return;
    }

    // If suburb exists in the result check if it has the same state
    if (suburbExist.state !== state) {
      setAlertMessage({
        type: 'danger',
        message: `The suburb ${suburb} does not exist in the state ${states[state]}.`
      });
      return;
    }

    setAlertMessage({
      type: 'success',
      message: 'The postcode, suburb and state entered are valid'
    });
  };

  // TODO: Form validation
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
                  {Object.keys(states).map((state, i) => (<option key={i}>{state}</option>))}
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
