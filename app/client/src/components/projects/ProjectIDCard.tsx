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
import styled from '@emotion/styled';
import { Typography, Box, IconButton, Link } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Card from './Card';
import { Project } from '../../types';

const StyledHeader = styled(Box)`
  background-color: #d5d5d5;
  justify-content: space-between;
  display: flex;
  padding: 8px;
  border-radius: 4px 4px 0 0;
`;

type Props = {
  project: Project;
  editItem?: () => void;
};

/**
 * Project general information card
 * @author      [Samara Flueck](samflueck95@gmail.com)
 */
const ProjectIDCard: React.FC<Props> = props => {
  const { project, editItem } = props;
  const { name, description, ministry, program, cpsIdentifier, projectNumber } = project;

  return (
    <Box boxShadow={2} borderRadius={4}>
      <StyledHeader>
        <Typography variant="h5">Project Identification</Typography>
        <IconButton size="small" onClick={editItem} disabled={!editItem}>
          <EditIcon />
        </IconButton>
      </StyledHeader>

      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" py={2}>
        <Card label="Project Name" content={name} />
        <Card label="Project Description" content={description} />
        <Card label="Ministry" content={ministry} />
        <Card label="Program Name" content={program} />
        <Card label="CPS Identifier" content={cpsIdentifier}>
          <Link href={`#/projects/${project.cpsIdentifier}`}>{cpsIdentifier}</Link>
        </Card>
        <Card label="Ministry Project Number" content={projectNumber} />
      </Box>
    </Box>
  );
};

export default ProjectIDCard;
