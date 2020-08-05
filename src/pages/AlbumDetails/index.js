import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAlbum } from '../../actions/albumsAction';
import PropTypes from 'prop-types';
import './styles.css';
import { Link } from 'react-router-dom';


const MovieDetail = (props) => {
    const albumId = props.match.params.albumId;
    
    const dispatch = useDispatch()

    const { users, album } = useSelector(state => state.album.album_data)

    useEffect(() => {
        dispatch(fetchAlbum(albumId))
    }, [dispatch, albumId])



    const render_movie = (album, users) => {

        if (typeof album !== "undefined") {
            return (
                <div>
                    <Container className="my-5">
                        <h3 className="text-center py-5">About Album</h3>
                        <Row>
                            <Col lg={6}>
                                <div>
                                    <img src={album.cover_url} alt="Nothing attached" />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <h5>Album Title: {album.title}</h5>
                                <h5>Release Date : {album.release_date}</h5>
                                <h5>Duration : {album.duration}</h5>
                                <h5>Featured:

                                {users.length > 0 ? users.map((user, index) => (
                                    <div>
                                        <p>Contribution: [{user.roles}]</p>
                                        <Link to={"/users/detail/" + user.id + "/" + user.name} key={index}>
                                            {user.name}
                                        </Link><br/>

                                    </div>
                                )) :
                                        <div>
                                            <h2>No Featured artist</h2>
                                        </div>
                                    }
                                </h5>
                                
                                <a href={album.album_url} target="_blank" rel="noopener noreferrer"> Buy Album </a> <br/>

                                <Link to="/#" className="btn btn-primary mt-2">Return to Homepage</Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        } else {
            return (
                <h2>Could Not Fetch Album</h2>
            )
        }

    }

    return (
        <div>
            {render_movie(album, users)}
        </div>
    )
};
MovieDetail.propTypes = {
    match: PropTypes.object.isRequired,
}

export default MovieDetail;