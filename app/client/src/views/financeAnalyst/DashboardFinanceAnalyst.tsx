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

import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Box, Grid, Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { ReportState, Report } from '../../types';
import useApi from '../../utils/api';

/**
 * Basic view to function as a dashboard to allow finance analyst to navigate application views
 */
const DashboardFinanceAnalyst: React.FC = () => {
  const history = useHistory();
  const api = useApi();
  // TODO: better way to only grab required data from api instead of entire reports
  const [reportsInProgress, setReportsInProgress] = React.useState(0);
  const [reportsSubmitted, setReportsSubmitted] = React.useState(0);
  const [reportsToFollowup, setReportsToFollowup] = React.useState(0);
  const [reportsApproved, setReportsApproved] = React.useState(0);

  useEffect(()=> {
    api.getReports('',{ state: ReportState.Draft }).then(data => {
      setReportsInProgress(data.length);
    });
    api.getReports('',{ state: ReportState.Submitted }).then(data => {
      setReportsSubmitted(data.length);
    });
    api.getReports('',{ state: ReportState.FollowUpRequired }).then(data => {
      setReportsToFollowup(data.length);
    });
    api.getReports('',{ state: ReportState.Approved }).then(data => {
      setReportsApproved(data.length);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2} md={12} justify="center">
      <Grid item>
      <Typography variant="h3">Finance Analyst Dashboard</Typography>
      </Grid>
      <Grid item md={8}>
        <Box p={4} boxShadow={2} borderRadius={4} justifyContent="space-between" display="flex">
          <Grid item>
            <Typography variant="h4">
              Quarterly Report States
            </Typography>
            <Typography variant="subtitle1">
              Reports In Progress: {reportsInProgress}
            </Typography>
            <Typography variant="subtitle1">
              Reports Submitted to DIO: {reportsSubmitted}
            </Typography>
            <Typography variant="subtitle1">
              Reports That Require Follow Up: {reportsToFollowup}
            </Typography>
            <Typography variant="subtitle1">
              Reports Approved: {reportsApproved}
            </Typography>
          </Grid>
          <Grid item md={4} container direction="column-reverse">
            <Button
              color="primary"
              variant="outlined"
              type="button"
              style={{margin: '4px'}}
              onClick={()=> alert('TODO: implement quarterly report summary view for current reporting period')}
            >
              Q1 FY 21/22 Summary
            </Button>
            <Button
              color="primary"
              variant="outlined"
              type="button"
              style={{margin: '4px'}}
              onClick={()=> history.push("/review-reports")}
            >
              Review Reports
            </Button>
            <Button
              color="primary"
              variant="outlined"
              type="button"
              style={{margin: '4px'}}
              onClick={()=> history.push("/projects")}
            >
              View All Projects
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DashboardFinanceAnalyst;