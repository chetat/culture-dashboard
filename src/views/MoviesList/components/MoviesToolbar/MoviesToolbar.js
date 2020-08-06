import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { SearchInput } from 'components';
import { useDispatch } from 'react-redux';

import { addMovie, fetchMoviesTypes, fetchMoviesGenres } from '../../../../actions/moviesAction';


const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    }
}));

const MoviesToolbar = props => {
    const { className, ...rest } = props;
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({});
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMoviesGenres())
    }, [dispatch])
    useEffect(() => {
        dispatch(fetchMoviesTypes())
    }, [dispatch])


    const states = [
        {
            value: 'alabama',
            label: 'Alabama'
        },
        {
            value: 'new-york',
            label: 'New York'
        },
        {
            value: 'san-francisco',
            label: 'San Francisco'
        }
    ];

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
        setOpen(false)
    }

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <h2 className="text-center">Movies Listing</h2>
            <div className={classes.row}>
                <SearchInput
                    className={classes.searchInput}
                    placeholder="Search Movie"
                />
                <span className={classes.spacer} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    Add Movie
                </Button>
            </div>
            <Dialog
                aria-labelledby="form-dialog-title"
                onClose={handleClose}
                open={open}
            >
                <DialogTitle id="form-dialog-title">Add a new movie</DialogTitle>
                <DialogContent>
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        noValidate
                    >
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        helperText="Please specify the movie title"
                                        label="Movie Title"
                                        margin="dense"
                                        name="title"
                                        onChange={handleChange}
                                        required
                                        value={values.title || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Movie Synopsis"
                                        margin="dense"
                                        name="synopsis"
                                        onChange={handleChange}
                                        required
                                        value={values.synopsis || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Genre"
                                        margin="dense"
                                        name="genre"
                                        onChange={handleChange}
                                        required
                                        value={values.genre || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        margin="dense"
                                        name="phone"
                                        onChange={handleChange}
                                        type="number"
                                        value={values.phone || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select State"
                                        margin="dense"
                                        name="state"
                                        onChange={handleChange}
                                        required
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.state}
                                        variant="outlined"
                                    >
                                        {states.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        margin="dense"
                                        name="country"
                                        onChange={handleChange}
                                        required
                                        value={values.country || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                    </Button>
                            <Button type="submit" color="primary">
                                Add Movie
                        </Button>

                        </CardActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

MoviesToolbar.propTypes = {
    className: PropTypes.string
};

export default MoviesToolbar;
