
import React from 'react';
import { Alert } from 'react-bootstrap';

export default function MessageAlert(props) {
  const alertData = props.alertMessage;

  if (!alertData) {
    return (<div></div>);
  } else {
    return (<div>
      <Alert variant={alertData.type}>
        {alertData.message}
      </Alert>
    </div>);
  }
}
