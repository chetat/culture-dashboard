import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  TotalUsers,
  TotalMovies,
  TotalAlbums,
  TotalBooks
} from './components';
import { useSelector, useDispatch,  } from 'react-redux';
import { fetchMovies } from 'actions/moviesAction';
import { fetchUsers } from 'actions/usersAction';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])
  
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  
  const movies = useSelector(state => state.movies.movies)
  const users = useSelector(state => state.users.users_data)
  const albums = useSelector(state => state.albums.albums_data)
  const books = useSelector(state => state.albums.albums_data)

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalMovies totalMovies={movies && movies.length > 0 ? movies.length : 0} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers totalUsers={users && users.length > 0 ? users.length : 0}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalAlbums totalAlbums={albums && albums.length > 0 ? albums.length : 0} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalBooks totalBooks={books && books.length > 0 ? books.length : 0} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
