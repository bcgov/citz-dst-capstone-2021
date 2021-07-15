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

import React, { useEffect, useState } from 'react';
import { Typography, Box, Table, TableHead, TableBody, TableCell } from '@material-ui/core';
import styled from 'styled-components';
import QuarterlyReportListRow from './QuarterlyReportListRow';
import theme from '../../theme';
import { Report } from '../../types';

interface QuarterlyReportListProps {
  reports: Report[];
}

const StyledTableHead = styled(TableHead)`
  background-color: #D5D5D5;
  height: 38px;
`;

const StyledTableHeadCell = styled(TableCell)`
  padding: 8px !important;
`;

const QuarterlyReportList: React.FC<QuarterlyReportListProps> = props => {
  const { reports } = props;

  return (
    <Box m={4} boxShadow={2}>
      <Box bgcolor={theme.colors.primary} color="white" p={1}>
        <Typography variant="h5">Quarterly Status Reports</Typography>
      </Box>
      <Table aria-label="quarterly report list" size="medium">
        <StyledTableHead>
          <StyledTableHeadCell align="left">
            <Typography variant="subtitle1">Reporting Period</Typography>
          </StyledTableHeadCell>
          <StyledTableHeadCell align="center">
            <Typography variant="subtitle1">Report Status</Typography>
          </StyledTableHeadCell>
          <StyledTableHeadCell align="right">
            <Typography variant="subtitle1">Reporting Period Start</Typography>
          </StyledTableHeadCell>
          <StyledTableHeadCell align="right">
            <Typography variant="subtitle1">Reporting Period End</Typography>
          </StyledTableHeadCell>
          <TableCell />
        </StyledTableHead>
        <TableBody>
          {reports.map(row => (
            <QuarterlyReportListRow report={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default QuarterlyReportList;
