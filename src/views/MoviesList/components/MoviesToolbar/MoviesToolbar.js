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
    DialogContent,
    DialogTitle,
    Dialog,
    Select,
    InputLabel,
    FormControl,
    Button,
    TextField
} from '@material-ui/core';

import { SearchInput } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, fetchMoviesTypes, fetchMoviesGenres, addImage } from '../../../../actions/moviesAction';
import { formatDistance } from 'date-fns';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
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
    const [imageVal, setImageVal] = useState({})

    const dispatch = useDispatch()
    const classes = useStyles();


    useEffect(() => {
        dispatch(fetchMoviesGenres())
    }, [dispatch])
    useEffect(() => {
        dispatch(fetchMoviesTypes())
    }, [dispatch])

    const genres = useSelector((state) => state.movies.genres);
    const types = useSelector((state) => state.movies.types)

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleImage = (e) => {
        setImageVal({
            ...imageVal,
            image: e.target.files[0]
        })
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const ranstr = Math.random().toString(10).substring(2, 7) + Math.random().toString(10).substring(2, 7);

    const handleSubmit = (e) => {
        e.preventDefault()

        let fodad = new FormData()
        fodad.append("file", imageVal["image"])
        // Display the key/value pairs
       const movie = {
            genre_id: values.genre,
            type_id: values.type,
            title: values.title,
            synopsis: values.synopsis,
            pg: values.rating,
            trailer_url: values.trailer_url,
            duration: values.duration,
            category_id: 2,
            release_date: values.release_date
        }
        dispatch(addMovie(movie, fodad))
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
                                        placeholder="Enter Movie Synopsis"
                                        multiline
                                        rows={2}
                                        rowsMax={Infinity}
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
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Movie Type"
                                        margin="dense"
                                        name="type"
                                        onChange={handleChange}
                                        required
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.type || '1'}
                                        variant="outlined"
                                    >
                                        {types.map(type => (
                                            <option
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.name}
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
                                        label="Select Movie Genre"
                                        margin="dense"
                                        name="genre"
                                        onChange={handleChange}
                                        required
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        
                                        value={values.genre || 1}
                                        variant="outlined"
                                    >
                                        {genres.map(genre => (
                                            <option
                                                key={genre.id}
                                                value={genre.id}
                                            >
                                                {genre.name}
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
                                        label="Content Rating"
                                        margin="dense"
                                        name="rating"
                                        type="number"
                                        placeholder="Ex: -15"
                                        onChange={handleChange}
                                        required
                                        value={values.rating || ''}
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
                                        label="Trailer Link"
                                        margin="dense"
                                        name="trailer_url"
                                        onChange={handleChange}
                                        required
                                        value={values.trailer_url || ''}
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
                                        label="Cover Link"
                                        margin="dense"
                                        type="file"
                                        name="cover_url"
                                        defaultValue={''}
                                        onChange={handleImage}
                                        required
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Movie Duration (Minutes)"
                                        margin="dense"
                                        name="duration"
                                        placeholder="123"
                                        onChange={handleChange}
                                        required
                                        value={values.duration || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                <TextField
                                    fullWidth
                                    id="release_date"
                                    label="Release Date"
                                    type="date"
                                    name="release_date"
                                    onChange={handleChange}
                                    value={values.release_date || ''}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
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
