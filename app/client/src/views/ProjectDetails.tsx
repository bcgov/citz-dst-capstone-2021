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
import React from 'react';

import { Typography, Button, Box, Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ProjectIDCard from '../components/projects/ProjectIDCard';
import ProjectProgressCard from '../components/projects/ProjectProgressCard';
import ProjectContactCard from '../components/projects/ProjectContactCard';

// Test data to populate project detail views
const testData = {
  'name' : 'Example Project',
  'description' : 'Quarterly report dashboard and management system',
  'ministry' : 'Citizen Services',
  'program' : 'Digital Investment Office',
  'CPS' : 'LCTXXXXXXXXX',
  'ministryProjectNumber' : 'ITAXXXXXX',
  'sponsor' : 'John Doe',
  'manager' : 'Jane Doe',
  'financialContact' : 'Jane Doe',
  'phase' : 'Phase 1 Year 20/21',
  'completionDate' : '05-25-2021',
  'percentComplete' : 65
};

/* TODO: implement tab component to be able to switch between project details and submitted reports */
const ProjectDetails: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection="row" m={4}>
        {/* TODO: change this to display when the next quarterly report is due */}
        <Typography variant='h4'>
          Q3a Status Report Due dd-mm-yy
        </Typography>
        <Button variant='contained' color='primary'>
          < EditIcon/>
          Edit Project
        </Button>
      </Box>

      <ProjectProgressCard {...testData}/>
      <ProjectIDCard {...testData}/>
      <ProjectContactCard {...testData}/>

    </Container>
  );
};

export default ProjectDetails;
