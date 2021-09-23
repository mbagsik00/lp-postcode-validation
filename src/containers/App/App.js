import React from 'react';
import { PostcodeForm } from '../../components';
import { Container, Row, Col } from 'react-bootstrap';

const AppStyle = {
  'paddingTop': '50px'
 };

export default function App() {
  return (
    <div style={AppStyle}>
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <PostcodeForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
