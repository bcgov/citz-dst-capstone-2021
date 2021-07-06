import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Status } from '../../../types';

interface StatusButtonProps {
  status: Status;
}
const useStyles = makeStyles({
  green: {
    backgroundColor: 'green',
    color: 'white',
  },
  yellow: {
    backgroundColor: 'green',
  },
  red: {
    backgroundColor: 'red',
    color: 'white',
  },
});

const StatusButton: React.FC<StatusButtonProps> = (props) => {
  const { status } = props;
  const classes = useStyles();
  let statusStyle = classes.green;
  let text = 'Green';
  if (status === Status.Yellow) {
    statusStyle = classes.yellow;
    text = 'Yellow';
  } else if (status === Status.Red) {
    statusStyle = classes.red;
    text = 'Red';
  }
  return (
    <Button
      variant="contained"
      size="small"
      style={{ borderRadius: '16px' }}
      className={statusStyle}
    >
      {text}
    </Button>
  );
};

export default StatusButton;
