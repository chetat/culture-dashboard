import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserType, addUser } from '../../../../actions/usersAction';

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
  Button,
  TextField
} from '@material-ui/core';
import { SearchInput } from 'components';
import mockData from '../../data';

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

const UsersToolbar = props => {
  const { className, ...rest } = props;

  const types = useSelector((state) => state.users.types)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserType())
  }, [dispatch])

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    utype_id: types[0].id
  });
  const [imageVal, setImageVal] = useState({})

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

  const handleSubmit = (e)=> {
    e.preventDefault()

    let fodad = new FormData()
    fodad.append("file", imageVal["image"])

    dispatch(addUser(values, fodad))
    setOpen(false)
    console.log(values)
  }

  console.log(values)

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Add user
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
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
                                        label="Name"
                                        margin="dense"
                                        name="name"
                                        onChange={handleChange}
                                        required
                                        value={values.name || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        margin="dense"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        value={values.email || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Other Name"
                                        margin="dense"
                                        name="othername"
                                        onChange={handleChange}
                                        required
                                        value={values.othername || ''}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <TextField
                                        placeholder="User biography"
                                        multiline
                                        rows={2}
                                        rowsMax={Infinity}
                                        fullWidth
                                        label="Biography"
                                        margin="dense"
                                        name="bio"
                                        onChange={handleChange}
                                        required
                                        value={values.bio || ''}
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
                                        label="Select user type"
                                        margin="dense"
                                        name="utype_id"
                                        onChange={handleChange}
                                        required
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.utype_id || '1'}
                                        variant="outlined"
                                    >
                                        {types && types.length > 0 ? types.map((type, index) => (
                                            <option
                                                key={index}
                                                value={parseInt(type.id)}
                                            >
                                                {type.name}
                                            </option>
                                            )): <option>
                                            Nothing
                                        </option>
                                    }
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Region"
                                        margin="dense"
                                        name="region"
                                        onChange={handleChange}
                                        required
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.region || ''}
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
                                        label="City"
                                        margin="dense"
                                        name="city"
                                        onChange={handleChange}
                                        required
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.city || ''}
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
                                        label="photo"
                                        margin="dense"
                                        type="file"
                                        name="photo"
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
                                        label="Phone Number"
                                        margin="dense"
                                        name="phone"
                                        type="phone"
                                        onChange={handleChange}
                                        required
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
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
                                        label="Initial Password"
                                        margin="dense"
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        required
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={values.password || ''}
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
                                Add User
                        </Button>

                        </CardActions>
                    </form>
                </DialogContent>
            </Dialog>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
