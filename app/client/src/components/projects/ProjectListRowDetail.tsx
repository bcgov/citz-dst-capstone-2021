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
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { useHistory } from 'react-router-dom';
import { Project } from '../../types';
import utils from '../../utils';

interface ProjectListRowDetailProps {
  project: Project;
}

/**
 * ProjectListRowDetail expands ProjectListRow to reveal more details.
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ProjectListRowDetail: React.FC<ProjectListRowDetailProps & TransitionProps> = props => {
  const { project } = props;

  const history = useHistory();

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
      <Grid item xs={4}>
        <Box ml={1}>
          <Typography variant="subtitle1">Project Description</Typography>
          <Box>{project.description}</Box>
        </Box>
      </Grid>
      <Grid container item xs={6} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="subtitle1">Q3 Report Due</Typography>
        </Grid>
        <Grid item xs={6}>
          TODO - Due Date
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Estimated Date of Project Completion</Typography>
        </Grid>
        <Grid item xs={6}>
          {utils.getISODateString(project.estimatedEnd)}
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: 'none' }}
            onClick={() => {
              // eslint-disable-next-line no-alert
              history.push(`/edit-report/${project.cpsIdentifier}`);
            }}
          >
            Start Report
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: 'none', marginTop: '4px' }}
            onClick={() => history.push(`/projects/${project.id}`)}
          >
            View Project Detail
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProjectListRowDetail;
