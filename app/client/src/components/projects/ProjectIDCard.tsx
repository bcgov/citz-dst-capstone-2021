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
import { Typography, Box, Paper } from '@material-ui/core';
import Card from './Card';
import { Project } from '../../types';

const ProjectIDCard: React.FC<Project> = props => {
  const { name, description, ministry, program, cpsIdentifier, projectNumber } = props;

  // TODO: refactor any custom colours and theming using the theme provider
  return (
    <Box boxShadow={2}>
      <Paper variant="outlined">
        <Box
          alignItems="left"
          width={1}
          p={1}
          bgcolor="#D5D5D5"
        >
          <Typography variant="h5">Project Identification</Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          py={2}
        >
          <Card label="Project Name" content={name} />
          <Card label="Project Description" content={description} />
          <Card label="Ministry" content={ministry} />
          <Card label="Program Name" content={program} />
          <Card label="CPS Identifier" content={cpsIdentifier} />
          <Card label="Ministry Project Number" content={projectNumber} />
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectIDCard;
