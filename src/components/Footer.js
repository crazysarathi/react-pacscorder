import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = ({version,builder}) => {
  return (
    <Container fluid className="footer">
      <Row>
        <Col sm="auto">
          <span>Version {version}</span>
        </Col>
        <Col />
        <Col sm="auto">
          <span>Build : {builder}</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
