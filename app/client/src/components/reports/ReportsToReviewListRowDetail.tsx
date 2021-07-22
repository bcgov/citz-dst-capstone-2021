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
import { useHistory } from 'react-router-dom';
import {Report, User} from '../../types';
import StatusButton from '../common/buttons/StatusButton';

interface ReportsToReviewListRowProps {
  report: Report;
  submitter: User | undefined;
}

const ReportsToReviewListRowDetail: React.FC<ReportsToReviewListRowProps> = props => {
  const { report, submitter } = props;

  const history = useHistory();

  return (
    <Box px={2}>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid container item xs={12} sm={9} spacing={3}>

          <Grid item sm={12} md={6}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">
                <strong>Submitter</strong>
              </Typography>
              <Typography variant="body2">
                {submitter?.firstName} {submitter?.lastName}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">
                <strong>Ministry</strong>
              </Typography>
              <Typography variant="body2">
                {report.project?.ministry}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Overall Project Status</strong>
              </Typography>
              <Typography variant="body2">
                <StatusButton status={report.statuses[0].status} />
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Project Phase</strong>
              </Typography>
              <Typography variant="body2">
                {report.phase ? report.phase : 'N/A'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Current FY Approved Funding</strong>
              </Typography>
              <Typography variant="body2">
                {report.finance ? report.finance.fyApproved : '-'}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Current FY Actuals</strong>
              </Typography>
              <Typography variant="body2">
                {report.finance ? 
                  (Number.isNaN(+report.finance.fySitting) ? 0 : +report.finance.fySitting) + 
                  (Number.isNaN(+report.finance.jvToOcio) ? 0 : +report.finance.jvToOcio) : '-'}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Current FY Forecast Spend</strong>
              </Typography>
              <Typography variant="body2">
                {report.finance ? report.finance.fyForecast : '-'}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Current FY Variance</strong>
              </Typography>
              <Typography variant="body2">
              {report.finance ? 
                  (Number.isNaN(+report.finance.fyApproved) ? 0 : +report.finance.fyApproved) - 
                  (Number.isNaN(+report.finance.fyForecast) ? 0 : +report.finance.fyForecast) : '-'}
              </Typography>
            </Box>
          </Grid>

          <Grid item sm={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Overall Project Budget</strong>
              </Typography>
              <Typography variant="body2">
                {report.finance ? report.finance.budget : '-'}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Projected Funding Remaining</strong>
              </Typography>
              <Typography variant="body2">
                {report.finance ? report.finance.remaining : '-'}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Estimated Total Cost</strong>
              </Typography>
              <Typography variant="body2">
                {report.finance ? report.finance.estimatedTotalCost : '-'}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">
                <strong>Overall Project Variance</strong>
              </Typography>
              <Typography variant="body2">
              {report.finance ? 
                  (Number.isNaN(+report.finance.budget) ? 0 : +report.finance.budget) - 
                  (Number.isNaN(+report.finance.estimatedTotalCost) ? 0 : +report.finance.estimatedTotalCost) : '-'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/view-report/${report.id}`)}
          >
            Review Report
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsToReviewListRowDetail;
