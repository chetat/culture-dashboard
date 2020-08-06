import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {useSelector} from 'react-redux';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));



const UserList = () => {
  const classes = useStyles();
  const users = useSelector(state => state.users.users_data)

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
