// @flow
import { Box, Modal } from '@material-ui/core';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Milestone, Objective } from '../../types';
import ObjectiveItem from './ObjectiveItem';
import NewObjectiveForm from './NewObjectiveForm';
import useApi from '../../utils/api';
import emitter from '../../events/Emitter';
import EventType from '../../events/Events';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  reportId: string;
  objectives: Objective[];
};

const ProjectDetailsObjectiveStep = (props: Props) => {
  const { objectives, reportId } = props;

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

  const updateObjective = (data: Milestone) => {
    if (!data || cacheIndex < 0) {
      setModalVisible(false);
    } else {
      api
        .updateObjective(reportId, objectives[cacheIndex]?.id, data)
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
      {objectives && objectives.length > 0 ? (
        <>
          {objectives.map((objective, index) => (
            <Box m={4}>
              <ObjectiveItem objective={objective} key={objective.id} editItem={editItem(index)} />
            </Box>
          ))}
          <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
            <NewObjectiveForm closeModal={updateObjective} objective={objectives[cacheIndex]} />
          </Modal>
        </>
      ) : (
        <h1>No Objectives to Display</h1>
      )}
    </>
  );
};

export default ProjectDetailsObjectiveStep;
