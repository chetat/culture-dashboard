import React, { useState } from 'react';
import { Container, Row, Col, Form, FormControl} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMovieByYear } from '../../actions/moviesAction';
import './styles.css';
import MovieCard from '../../components/MovieCard';
import { compareValues, compareDateValues } from '../../helpers';


const ReleaseYearMovies = (props) => {

    const [order, setOrder] = useState('');
    const [sortType, setSortType] = useState('');
    const [search, setSearch] = useState('');


    const year = props.match.params.year;

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMovieByYear(year))
    }, [dispatch, year])

    const state_movies = useSelector(state => state.movies.movies_year);

    const sortedMovies = (movies, sortType, order) => {
        if (movies.length > 0) {
            let sorted = [];
            if (sortType === "release_date") {
                sorted = movies.sort(compareDateValues(sortType, order))
            } else {
                sorted = movies.sort(compareValues(sortType, order))
            }
            return renderMovies(sorted);
        } else {
            return <div>Nothing Here</div>
        }
    }

    const searchSpace = (e) => {
        setSearch(e.target.value)
    }
    const renderMovies = (movies) => {
        return (movies.length > 0 ? movies.map((movie) => {
            return (<Col lg={3} md={3} key={movie.id}>
                <MovieCard movie={movie} />
            </Col>)
        }
        ) : <div>No Movie</div>
        )
    }
    const movies = state_movies.filter((movie) => {
        return movie.title.toLowerCase().includes(search.toLowerCase())
    })

    if (!movies) {
        return <div>Loading</div>
    } else {
        return (
            <Container>

                <Row className="my-5">
                    <Col lg={4} sm={4}>
                        <Form inline>
                            <FormControl type="text" placeholder="Search Movies" onChange={(e) => (searchSpace(e))} className="mr-sm-2" />
                        </Form>
                    </Col>
                    <Col lg={8}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" htmlFor="inputGroupSelect02">Order By</label>
                            </div>
                            <select onChange={
                                (e) => {
                                    let values = e.target.value.split('-')
                                    setOrder(values[1])
                                    setSortType(values[0])
                                }
                            }
                                className="custom-select" id="inputGroupSelect02">
                                <option value="release_date-desc">Release Date (Desc)</option>
                                <option value="release_date-asc">Release Date (Asc)</option>
                            </select>
                            <select onChange={
                                (e) => {
                                    let values = e.target.value.split('-')
                                    setOrder(values[1])
                                    setSortType(values[0])
                                }
                            }
                                className="custom-select" id="inputGroupSelect02">
                                <option value="duration-desc">Duration (Desc)</option>
                                <option value="duration-asc">Duration(Asc)</option>
                            </select>
                            <select onChange={
                                (e) => {
                                    let values = e.target.value.split('-')
                                    setOrder(values[1])
                                    setSortType(values[0])
                                }
                            }
                                className="custom-select" id="inputGroupSelect02">
                                <option value="title-asc">Title (A-Z)</option>
                                <option value="title-desc">Title (Z-A)</option>
                            </select>
                        </div>
                    </Col>
                </Row>
                <h2 className="mt-5">Movies Released in {year}</h2>
                <Row className="my-2">
                     {sortedMovies(movies, sortType, order)}
                </Row>
            </Container>
        )
    }

}
export default ReleaseYearMovies;
