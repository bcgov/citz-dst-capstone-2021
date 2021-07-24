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
import { Typography, Box } from '@material-ui/core';
import Card from './Card';
import { Project, Report } from '../../types';
import utils from '../../utils';
import ProgressBar from '../common/ProgressBar';

const StyledHeader = styled(Box)`
  background-color: #d5d5d5;
  justify-content: space-between;
  display: flex;
  padding: 8px;
  border-radius: 4px 4px 0 0;
`;

type Props = {
  project: Project;
  report?: Report;
};

const ProjectProgressCard: React.FC<Props> = props => {
  const {
    project: { phase, estimatedEnd },
    report,
  } = props;

  return (
    <Box boxShadow={2} borderRadius={4}>
      <StyledHeader>
        <Typography variant="h5">Project Progress</Typography>
      </StyledHeader>

      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" py={2}>
        <Card label="Project Phase" content={phase || 'N/A'} />
        <Card
          label="Estimated Date of Project Completion"
          content={utils.getISODateString(new Date(estimatedEnd))}
        />
        <Card label="Percent Complete" content={`${report?.progress || 0}%`} />
        {report?.progress ? (
          <Box width="100%" px={2}>
            <ProgressBar value={report.progress} hidePercent />
          </Box>
        ) : ''
        }
      </Box>
    </Box>
  );
};

export default ProjectProgressCard;
