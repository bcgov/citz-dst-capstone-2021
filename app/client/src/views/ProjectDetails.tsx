//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,git
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import React, { useEffect, useState } from 'react';

import {
  Typography,
  Button,
  Box,
  Container,
  CircularProgress,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router-dom';
import ProjectIDCard from '../components/projects/ProjectIDCard';
import ProjectProgressCard from '../components/projects/ProjectProgressCard';
import ProjectContactCard from '../components/projects/ProjectContactCard';
import KPICard from '../components/projects/KPICard';
import useApi from '../utils/api';
import { Project } from '../types';

const testKPIData = {
  kpiAlpha: {
    name: 'KPI Alpha',
    type: 'Output',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis tincidunt placerat.',
    baselineUnit: '%',
    baselineValue: 5,
    targetUnit: '%',
    targetValue: 20,
    targetDate: '2021-07-10',
  },

  kpiBeta: {
    name: 'KPI Beta',
    type: 'Outcome',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras venenatis tincidunt placerat.',
    baselineUnit: 'hrs',
    baselineValue: 2,
    targetUnit: 'min',
    targetValue: 45,
    targetDate: '2022-01-15',
  },
};

/* TODO: implement tab component to be able to switch between project details and submitted reports */
const ProjectDetails: React.FC = () => {
  const [project, setProject] = useState({} as Project);
  const { cps } = useParams<{ cps: string }>();

  const api = useApi();

  useEffect(() => {
    api.getProjectDetail(cps).then((data) => {
      setProject(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProject = () => {
    return (
      <>
        <ProjectProgressCard {...project} />
        <ProjectIDCard {...project} />
        <ProjectContactCard {...project} />

        <Box mx={4}>
          <Typography variant="h4">Key Performance Indicators</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <KPICard {...testKPIData.kpiAlpha} />
          <KPICard {...testKPIData.kpiBeta} />
        </Box>
      </>
    );
  };

  const renderContent = () => {
    return project.id ? renderProject() : <CircularProgress />;
  };

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        m={4}
      >
        {/* TODO: change this to display when the next quarterly report is due */}
        <Typography variant="h4">Q3a Status Report Due dd-mm-yy</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert('Not Implemented');
          }}
        >
          <EditIcon />
          Edit Project
        </Button>
      </Box>
      <Box>{renderContent()}</Box>
    </Container>
  );
};

export default ProjectDetails;
