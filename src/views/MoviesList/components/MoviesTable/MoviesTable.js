import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const MoviesTable = props => {
  const { className, movies, ...rest } = props;

  const classes = useStyles();

  const [selectedMovies, setSelectedMovies] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { movies } = props;

    let selectedMovies;

    if (event.target.checked) {
      selectedMovies = movies.map(movie => movie.id);
    } else {
      selectedMovies = [];
    }

    setSelectedMovies(selectedMovies);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMovies.indexOf(id);
    let newSelectedMovies = [];

    if (selectedIndex === -1) {
      newSelectedMovies = newSelectedMovies.concat(selectedMovies, id);
    } else if (selectedIndex === 0) {
      newSelectedMovies = newSelectedMovies.concat(selectedMovies.slice(1));
    } else if (selectedIndex === selectedMovies.length - 1) {
      newSelectedMovies = newSelectedMovies.concat(selectedMovies.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMovies = newSelectedMovies.concat(
        selectedMovies.slice(0, selectedIndex),
        selectedMovies.slice(selectedIndex + 1)
      );
    }

    setSelectedMovies(newSelectedMovies);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMovies.length === movies.length}
                      color="primary"
                      indeterminate={
                        selectedMovies.length > 0 &&
                        selectedMovies.length < movies.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Release Date</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>Last Modified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.slice(0, rowsPerPage).map(movie => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={movie.id}
                    selected={selectedMovies.indexOf(movie.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedMovies.indexOf(movie.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, movie.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={movie.cover_url}
                        >
                          {getInitials(movie.title)}
                        </Avatar>
                        <Typography variant="body1">{movie.title}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{moment(movie.release_date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{moment(movie.created_at).format('dddd, MMMM Do YYYY,  HH:MM:SS')}</TableCell>
                    <TableCell>
                      {movie.genre}
                    </TableCell>
                    <TableCell>
                      {moment(movie.updated_at).format('DD/MM/YYYY HH:MM:SS')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={movies.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

MoviesTable.propTypes = {
  className: PropTypes.string,
  movies: PropTypes.array.isRequired
};

export default MoviesTable;
