//
// Copyright © 2020 Province of British Columbia
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
import { Container, FormControl, Typography, Button } from '@material-ui/core';
// import DateFnsUtils from '@date-io/date-fns';

const ProjectKPIsForm: React.FC = () => {
  const handleNewMilestone = () => {
    // eslint-disable-next-line no-alert
    alert('TODO: implement KPI form modal');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center">
        Key Performance Indicators
      </Typography>
      <FormControl margin="normal" fullWidth>
        <Button
          color="primary"
          variant="contained"
          type="button"
          onClick={handleNewMilestone}
        >
          Add New Objective
        </Button>
      </FormControl>
    </Container>
  );
};

export default ProjectKPIsForm;