import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import "./styles.css"
const Sidebar = (props) => {
    return (
            <Nav className="col-lg-12 justify-content-center text-center d-none d-md-block bg-dark sidebar px-3"
                activeKey="/">
                <h2>CENAC Dashboard</h2>
                <Nav.Item>
                    <Nav.Link href="/">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/music">Music</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/movies">Movies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/users">Users</Nav.Link>
                </Nav.Item>
            </Nav>
    );
};

export default withRouter(Sidebar)