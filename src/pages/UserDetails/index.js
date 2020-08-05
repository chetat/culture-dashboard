import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from '../../actions/usersAction';
import PropTypes from 'prop-types';
import './styles.css'
import FeaturedUser from '../../components/FeaturedUser';
import { Link } from 'react-router-dom';

const UserDetails = (props) => {
    const userId = props.match.params.userId;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [dispatch, userId])
// 658634479 ----------  694763806
    const { user, movies_appeared, albums_appeared } = useSelector(state => state.user.user_data)
    // const {} = useSelector(state => )

    const render_actor = (user) => {
        if (typeof user !== "undefined") {
            return (
                <div>
                    <Container className="justify-content-center my-5">
                        <h2 className="text-center py-5">User infos</h2>
                        <Row>
                            <Col lg={4}>
                                <img src={user.image} className="img-fluid" alt="Profile Pic"/>
                            </Col>
                            <Col lg={6}>
                                <h5>Name: {user.name}</h5>
                                <h5>Biography :</h5>
                                <p>{user.bio}</p>
                                <h5>Also Known As: {user.aka}</h5>
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col lg={6}>
                                <h2>Movies Featured</h2>
                                <Row>
                                    {
                                        movies_appeared && movies_appeared.length > 0 ? movies_appeared.map((movie, index) => (
                                            <Col lg={4}>
                                                <FeaturedUser data={movie} key={index} category={movie.category} />
                                            </Col>
                                        )) :  <Col lg={6}>
                                        <h5>No Movies Featured</h5>
                                    </Col>
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col lg={6} >
                                <h2>Music Featured</h2>
                                <Row>
                                    {
                                        albums_appeared && albums_appeared.length > 0 ? albums_appeared.map((album, index) => {
                                            console.log("Album Logged here")
                                            console.log(album)
                                            return <Col lg={6} className="d-flex">
                                                <FeaturedUser data={album} key={index} category={album.category} />
                                            </Col>
                                    }) : <Col lg={6}>
                                            <h5>No Music Featured</h5>
                                        </Col>
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <Link to="/#" className="btn btn-primary">Return To Homepage</Link>
                    </Container>
                </div>
            )
        } else {
            return (
                <h2>User Not Found</h2>
            )
        }
    }
    return (
        <div>
            {render_actor(user)}
        </div>
    )
};
UserDetails.propTypes = {
    match: PropTypes.object.isRequired
}

export default UserDetails;