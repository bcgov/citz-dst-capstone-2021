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

const StatusButton: React.FC<StatusButtonProps> = props => {
  const { status } = props;
  const classes = useStyles();

  let statusStyle = classes.green;
  let text = 'Green';

  switch (+status) {
    case Status.Yellow:
    case MilestoneStatus.Yellow:
      statusStyle = classes.yellow;
      text = 'Yellow';
      break;
    case Status.Red:
    case MilestoneStatus.Red:
      statusStyle = classes.red;
      text = 'Red';
      break;
    case MilestoneStatus.NotStarted:
      statusStyle = classes.grey;
      text = 'Not Started';
      break;
    case MilestoneStatus.Completed:
      statusStyle = classes.blue;
      text = 'Completed';
      break;
    default:
      break;
  }

  return (
    <Button
      variant="contained"
      size="small"
      style={{ borderRadius: '16px', padding: '0px 15px' }}
      className={statusStyle}
    >
      {text}
    </Button>
  );
};

export default StatusButton;
