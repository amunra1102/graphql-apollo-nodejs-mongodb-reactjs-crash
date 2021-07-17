import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuthorForm, BookForm } from 'components';

const Forms = () => (
  <Row>
    <Col>
      <BookForm />
    </Col>
    <Col>
      <AuthorForm />
    </Col>
  </Row>
);

export default Forms;
