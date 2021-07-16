//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React from 'react';
import { Typography, Box, Paper, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Card from './Card';
import { Project } from '../../types';
import utils from '../../utils';

const ProjectProgressCard: React.FC<Project> = props => {
  const { phase, estimatedEnd, progress } = props;

  return (
    <Box boxShadow={2} borderRadius={4}>
      <Box display="flex" justifyContent="space-between" width={1} p={1} bgcolor="#D5D5D5">
        <Typography variant="h5">Project Progress</Typography>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" py={2}>
        <Card label="Project Phase" content={phase} />
        <Card
          label="Estimated Date of Project Completion"
          content={utils.getISODateString(new Date(estimatedEnd))}
        />
        <Card label="Percent Complete" content={`${progress}%`} />
        {/* TODO: a progress bar to display % complete should go here */}
      </Box>
    </Box>
  );
};

export default ProjectProgressCard;
