// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';
import { Project } from '../../types';
import ProjectProgressCard from './ProjectProgressCard';
import ProjectIDCard from './ProjectIDCard';
import ProjectContactCard from './ProjectContactCard';

type Props = {
  project: Project;
};
const ProjectDetailsInfoStep = (props: Props) => {
  const { project } = props;
  return (
    <Box m={4}>
      <Box mb={4}>
        <ProjectProgressCard {...project} />
      </Box>
      <Box mb={4}>
        <ProjectIDCard {...project} />
      </Box>
      <Box mb={4}>
        <ProjectContactCard {...project} />
      </Box>
    </Box>
  );
};

export default ProjectDetailsInfoStep;
