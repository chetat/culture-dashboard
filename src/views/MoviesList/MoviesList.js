import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {useSelector, useDispatch} from 'react-redux';

import { MoviesToolbar, MoviesTable } from './components';
import { fetchMovies } from 'actions/moviesAction';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));



const MoviesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  
  const movies = useSelector(state => state.movies.movies)

  return (
    <div className={classes.root}>
      <MoviesToolbar />
      <div className={classes.content}>
       {movies && <MoviesTable movies={movies} />} 
      </div>
    </div>
  );
};

export default MoviesList;
