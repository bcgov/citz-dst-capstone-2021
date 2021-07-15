// @flow
import * as React from 'react';
import { Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Milestone } from '../../types';
import MilestoneItem from './MilestoneItem';
import NewMilestoneForm from './NewMilestoneForm';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  milestones: Milestone[];
};

const ProjectDetailsMilestoneStep = (props: Props) => {
  const { milestones } = props;

  const classes = useStyles();

  // prepare modal windows
  const [modalVisible, setModalVisible] = React.useState(false);
  const [cacheIndex, setCacheIndex] = React.useState(-1);
  const editItem = (index: number) => {
    return () => {
      if (index >= 0) {
        setCacheIndex(index);
        setModalVisible(true);
      }
    };
  };

  const updateProject = (data: Milestone) => {
    setModalVisible(false);
  };

  return (
    <>
      {milestones && milestones.length > 0 ? (
        milestones.map((milestone, index) => (
          <Box m={4}>
            <MilestoneItem milestone={milestone} key={milestone.id} editItem={editItem(index)} />
          </Box>
        ))
      ) : (
        <h1>No Milestones to Display</h1>
      )}

      <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
        <NewMilestoneForm milestone={milestones[cacheIndex]} closeModal={updateProject} />
      </Modal>
    </>
  );
};

export default ProjectDetailsMilestoneStep;
