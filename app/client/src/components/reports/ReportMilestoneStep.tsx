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

import * as React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Milestone } from '../../types';
import ReportMilestoneItem from './ReportMilestoneItem';

type Props = {
  milestones: Milestone[];
};
const ReportMilestoneStep = (props: Props) => {
  const { milestones } = props;

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center">
        Key Milestone Status
      </Typography>
      {milestones.map((stone) => (
        <ReportMilestoneItem milestone={stone} key={stone.id} />
      ))}
    </Container>
  );
};

export default ReportMilestoneStep;