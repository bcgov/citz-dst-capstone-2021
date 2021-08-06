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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { ReportStatus, StatusType, Trend } from '../../types';
import StatusButton from '../common/buttons/StatusButton';

interface StatusSummaryCardProps {
  status: ReportStatus;
}

/**
 * Status item in the report details step 2
 * @author [Samara Flueck](samflueck95@gmail.com)
 */
const StatusSummaryCard: React.FC<StatusSummaryCardProps> = props => {
  const { status } = props;
  const statusTypeLabels = {
    [StatusType.Overall]: 'Overall Status',
    [StatusType.Scope]: 'Scope',
    [StatusType.Budget]: 'Budget',
    [StatusType.Schedule]: 'Schedule',
    [StatusType.Other]: 'Other Issues or Risks',
  };
  // status summary trends
  const trendIcons = [
    { icon: <ArrowUpwardIcon />, value: Trend.Up },
    { icon: <ArrowForwardIcon />, value: Trend.Steady },
    { icon: <ArrowDownwardIcon />, value: Trend.Down },
  ];

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box boxShadow={2} borderRadius={4} p={2}>
        <Box display="flex" justifyContent="space-between">
          <Box display="grid">
            <Typography variant="overline">
              <strong>{statusTypeLabels[status.type]}</strong>
            </Typography>
            <Box>
              <StatusButton status={status.status} />
            </Box>
          </Box>
          <Box display="grid">
            <Typography variant="overline">
              <strong>Trend</strong>
            </Typography>
            {trendIcons[status.trend].icon}
          </Box>
        </Box>
        <Typography variant="caption">
          <strong>Comments</strong>
        </Typography>
        <Box overflow="auto" height="100px">
          <Typography variant="body1" display="block">
            {status.comments ? status.comments : 'N/A'}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default StatusSummaryCard;
