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
import { Box, Grid, Typography } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { Project } from '../../types';
import utils from '../../utils';

interface ProjectListRowDetailProps {
  project: Project;
}

const ProjectListRowDetail: React.FC<
  ProjectListRowDetailProps & TransitionProps
> = (props) => {
  const { project } = props;

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={4}>
        <Box>
          <Typography variant="h6">Project Description</Typography>
          <Box>{project.description}</Box>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box display="flex">
          <Typography variant="h6">Report Due</Typography>
          TODO - Due Date
        </Box>
        <Box display="flex">
          <Typography variant="h6">Estimated End</Typography>
          {utils.getISODateString(project.estimatedEnd)}
        </Box>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
};

export default ProjectListRowDetail;
