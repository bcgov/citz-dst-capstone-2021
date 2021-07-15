// @flow
import { Box, Modal } from "@material-ui/core";
import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Milestone, Objective } from "../../types";
import ObjectiveItem from './ObjectiveItem';
import NewObjectiveForm from "./NewObjectiveForm";

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  objectives: Objective[];
};

const ProjectDetailsObjectiveStep = (props: Props) => {
  const { objectives } = props;

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
      {objectives && objectives.length > 0 ? (
        objectives.map((objective, index) => (
          <Box m={4}>
            <ObjectiveItem objective={objective} key={objective.id} editItem={editItem(index)} />
          </Box>
        ))
      ) : (
        <h1>No Objectives to Display</h1>
      )}

      <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
        <NewObjectiveForm closeModal={updateProject} objective={objectives[cacheIndex]} />
      </Modal>
    </>
  );
};

export default ProjectDetailsObjectiveStep;
