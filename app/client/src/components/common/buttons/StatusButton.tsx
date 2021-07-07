import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MilestoneStatus, Status } from '../../../types';

interface StatusButtonProps {
  status: Status | MilestoneStatus;
}
const useStyles = makeStyles({
  green: {
    backgroundColor: 'green',
    color: 'white',
  },
  yellow: {
    backgroundColor: 'yellow',
  },
  red: {
    backgroundColor: 'red',
    color: 'white',
  },
  grey: {
    backgroundColor: 'lightgrey',
  },
  blue: {
    backgroundColor: '#303f9f',
    color: 'white',
  },
});

const StatusButton: React.FC<StatusButtonProps> = (props) => {
  const { status } = props;
  const classes = useStyles();
  let statusStyle = classes.green;
  let text = 'Green';
  if (status === Status.Yellow || status === MilestoneStatus.Yellow) {
    statusStyle = classes.yellow;
    text = 'Yellow';
  } else if (status === Status.Red || status === MilestoneStatus.Red) {
    statusStyle = classes.red;
    text = 'Red';
  } else if (status === MilestoneStatus.NotStarted) {
    statusStyle = classes.grey;
    text = 'Not Started';
  } else if (status === MilestoneStatus.Completed) {
    statusStyle = classes.blue;
    text = 'Completed';
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
