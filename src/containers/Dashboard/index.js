import React from "react";
import {Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../Sidebar";

import './styles.css'

const Dashboard = (props) => {
    return (
         <Container fluid>
                <Row>
                    <Col lg={3} id="wrapper">      
                      <Sidebar />
                    </Col>
                </Row>
            </Container>
        );
  };
  export default withRouter(Dashboard);