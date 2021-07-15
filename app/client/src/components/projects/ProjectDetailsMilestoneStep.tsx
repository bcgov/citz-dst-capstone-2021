// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';

import { Milestone } from '../../types';
import MilestoneItem from './MilestoneItem';

type Props = {
  milestones: Milestone[];
};

const ProjectDetailsMilestoneStep = (props: Props) => {
  const { milestones } = props;
  return (
    <>
      {milestones && milestones.length > 0 ? (
        milestones.map(milestone => (
          <Box m={4}>
            <MilestoneItem milestone={milestone} key={milestone.id} />
          </Box>
        ))
      ) : (
        <h1>No Milestones to Display</h1>
      )}
    </>
  );
};

export default ProjectDetailsMilestoneStep;
