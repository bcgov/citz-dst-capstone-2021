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
import { Box, Container, Typography } from '@material-ui/core';
import { Milestone } from '../../types';
import ReportMilestoneItem from './ReportMilestoneItem';

type Props = {
  milestones: Milestone[];
  onChange: (milestone: Milestone, index: number) => void;
  onValidation: (valid: boolean) => void;
};

/**
 * Edit-report step 5 - Milestones
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ReportMilestoneStep = (props: Props) => {
  const { milestones, onChange, onValidation } = props;

  const handleChange = (index: number) => {
    return (data: Milestone) => {
      onChange(data, index);
    };
  };

  // validity of each status
  const [valid, setValid] = React.useState<boolean[]>(milestones.map(() => true));
  if (milestones.length === 0) {
    onValidation(true);
  }

  const handleValidation = (index: number) => {
    return (value: boolean) => {
      const clone = [...valid];
      clone[index] = value;
      setValid(clone);
      onValidation(valid.every(v => v));
    };
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center">
        Key Milestone Status
      </Typography>
      {milestones.map((stone, index) => (
        <Box key={stone.id} boxShadow={1} p={1} my={2}>
          <ReportMilestoneItem
            milestone={stone}
            onChange={handleChange(index)}
            onValidation={handleValidation(index)}
          />
        </Box>
      ))}
    </Container>
  );
};

export default ReportMilestoneStep;
