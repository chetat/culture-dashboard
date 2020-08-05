import React from 'react';
/*import MovieDetails from './pages/MovieDetails';
import UserDetails from './pages/UserDetails';
import AlbumDetails from './pages/AlbumDetails';
import ReleaseYearMovies from './pages/ReleaseYearMovies'; */
import Movies from './pages/Movies';
import Music from './pages/Music';
import Home from './pages/Home';
import { Container, Row, Col } from "react-bootstrap";
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import Sidebar from './containers/Sidebar';

const Routes = () => {
    return (
        <Container fluid={true}>
            <Row>
                <Col lg={3}>
                    <Sidebar />
                </Col>
                <Col lg={9}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/music" component={Music} />
                        <Route exact path="/movies" component={Movies} />
                    </Switch>
                </Col>
            </Row>


        </Container>

    );
}

export default Routes;