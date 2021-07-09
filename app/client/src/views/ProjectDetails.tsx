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
  Tabs,
  Tab,
  AppBar
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router-dom';
import ProjectIDCard from '../components/projects/ProjectIDCard';
import ProjectProgressCard from '../components/projects/ProjectProgressCard';
import ProjectContactCard from '../components/projects/ProjectContactCard';
import KPICard from '../components/projects/KPICard';
import useApi from '../utils/api';
import { Project } from '../types';

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
        <Typography variant="h4">{project.name} - {project.cpsIdentifier}</Typography>
      </Box>
      <Box>
        {renderContent()}
      </Box>
    </Container>
  );
};

export default ProjectDetails;
