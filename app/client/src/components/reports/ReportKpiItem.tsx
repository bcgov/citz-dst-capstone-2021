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
import { Box, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Kpi } from '../../types';

type Props = {
  kpi: Kpi;
};

const ReportKpiItem = (props: Props) => {
  const { kpi } = props;
  const { name, description, target, unit, baseline, end, outcome, output } =
    kpi;
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Box flexGrow={1}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">
            <strong>Target Completion Date - </strong>
            {target}
          </Typography>
        </Box>
        <Typography variant="body1">{description}</Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="subtitle1">
            <strong>Baseline - </strong>
            {unit + baseline}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Target - </strong>
            {unit + target}
          </Typography>
        </Box>
      </Box>
      <Box ml={4}>
        <TextField
          id="progress"
          name="progress"
          label={`Progress (${unit})`}
          type="number"
          margin="normal"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};
export default ReportKpiItem;
