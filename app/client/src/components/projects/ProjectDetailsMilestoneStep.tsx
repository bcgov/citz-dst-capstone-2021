// @flow
import * as React from 'react';
import { Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Milestone } from '../../types';
import MilestoneItem from './MilestoneItem';
import NewMilestoneForm from './NewMilestoneForm';
import EventType from '../../events/Events';
import emitter from '../../events/Emitter';
import useApi from '../../utils/api';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  reportId: string;
  milestones: Milestone[];
};

const ProjectDetailsMilestoneStep = (props: Props) => {
  const { reportId, milestones } = props;

  const classes = useStyles();
  const api = useApi();

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

  const updateMilestone = (data: Milestone) => {
    if (!data || cacheIndex < 0) {
      setModalVisible(false);
    } else {
      api
        .updateMilestone(reportId, milestones[cacheIndex]?.id, data)
        .then(report => {
          emitter.emit(EventType.Report.Reload, report);
        })
        .finally(() => {
          setModalVisible(false);
        });
    }
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

      {cacheIndex >= 0 ? (
        <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
          <NewMilestoneForm milestone={milestones[cacheIndex]} closeModal={updateMilestone} />
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

export default ProjectDetailsMilestoneStep;
