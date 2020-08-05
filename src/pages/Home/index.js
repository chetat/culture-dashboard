import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import './styles.css'

const Home = (props) => {
    return (
        <Container>
            <Row className="py-5">
                <Col lg={4}>
                    <h2>All Movies Count Card</h2>
                </Col>
                <Col lg={4}>
                    <h2>All Music Count Card</h2>
                </Col>
                <Col lg={4}>
                    <h2>All Users Count Card</h2>
                </Col>
            </Row>
        </Container>
    );
};
export default Home;