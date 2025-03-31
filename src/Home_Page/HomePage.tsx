import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import './HomePage.css';

export function HomePage(): React.JSX.Element {
    const goToBasic = () => {
        window.location.href = '/Basic';
      };

  return (
    <div>
      <h1>Da Quiz</h1>
      <Container>
        <Row>
          <Col>
            <div>Basic Questions</div>
            <br />
            More Simple Questions, Takes Less Time
            <Button onClick={goToBasic}>Go to Basic Questions</Button>
          </Col>
          <Col>
            <div>Detailed Questions</div>
            <br />
            Deeper Questions, Better Results
            <Button>Go to Detailed Questions</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
