// @flow
import { Box } from '@material-ui/core';
import * as React from 'react';
import { Objective } from '../../types';
import ObjectiveItem from './ObjectiveItem';

type Props = {
  objectives: Objective[];
};

const ProjectDetailsObjectiveStep = (props: Props) => {
  const { objectives } = props;

  return (
    <>
      {objectives && objectives.length > 0 ? (
        objectives.map(objective => (
          <Box m={4}>
            <ObjectiveItem objective={objective} key={objective.id} />
          </Box>
        ))
      ) : (
        <h1>No Objectives to Display</h1>
      )}
    </>
  );
};

export default ProjectDetailsObjectiveStep;
