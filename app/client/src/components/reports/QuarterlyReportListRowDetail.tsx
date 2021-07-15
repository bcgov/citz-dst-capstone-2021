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
import {
  Box,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import { Report, User, ReportState } from '../../types';


interface QuarterlyReportListRowDetailProps {
  report: Report;
  submitter: User;
}

const QuarterlyReportListRowDetail: React.FC<QuarterlyReportListRowDetailProps> = (props) => {
  const {
    report,
    submitter
  } = props;

  const getButtonText = (state: ReportState) => {
    switch(state) {
      case ReportState.Draft:
        return 'Continue Report';
      case ReportState.Submitted:
      case ReportState.Review:
        return 'View Report';
      default:
        return 'Start Report'
    }
  };

  return(
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="contents" justifyContent="space-between">
          <Typography variant="body2">
            <strong>Submitter</strong>
          </Typography>
          <Typography variant="body2">
            {submitter.firstName} {submitter.lastName}
          </Typography>
        </Box>
        {report.state === ReportState.Draft ? 
        <Box display="contents" justifyContent="space-between">
          <Typography variant="body2">
            <strong>Report Submitted</strong>
          </Typography>
          <Typography variant="body2">
            {report.submittedAt}
          </Typography>
        </Box>
        : 
        <Box display="contents" justifyContent="space-between">
          <Typography variant="body2">
            <strong>Report Due</strong>
          </Typography>
          <Typography variant="body2">
            {/* TODO: Implement due dates for quarterly reports */}
            yyyy-mm-dd
          </Typography>
        </Box>
        }

        <Button
          variant="contained"
          color="primary"
          onClick={() => {alert('TODO: view report')}}
        >
          {getButtonText(report.state)}
        </Button>
      </Box>
    </>
  );
}

export default QuarterlyReportListRowDetail;