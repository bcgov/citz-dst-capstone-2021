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
import { Typography, Box, Table, TableHead, TableBody, TableCell } from '@material-ui/core';
import styled from 'styled-components';
import ReportsToReviewListRow from './ReportsToReviewListRow';
import theme from '../../theme';
import { Report } from '../../types';

interface ReportsToReviewListProps {
  reports: Report[];
}

const StyledTableTitle = styled(Box)`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 8px;
  border-radius: 4px 4px 0 0;
`;

const StyledTableHead = styled(TableHead)`
  background-color: #d5d5d5;
  height: 38px;
`;

const StyledTableHeadCell = styled(TableCell)`
  padding: 8px !important;
`;

const ReportsToReviewList: React.FC<ReportsToReviewListProps> = props => {
  const { reports } = props;

  return (
    <Box m={4} boxShadow={2} borderRadius={4}>
      <StyledTableTitle>
        <Typography variant="h5">Quarterly Status Reports to Review</Typography>
      </StyledTableTitle>
      <Table aria-label="quarterly report list" size="medium">
        <StyledTableHead>
          <StyledTableHeadCell align="left">
            <Typography variant="subtitle1">Project Name</Typography>
          </StyledTableHeadCell>
          <StyledTableHeadCell align="left">
            <Typography variant="subtitle1">CPS Identifier</Typography>
          </StyledTableHeadCell>
          <StyledTableHeadCell align="left">
            <Typography variant="subtitle1">Reporting Period</Typography>
          </StyledTableHeadCell>
          <StyledTableHeadCell align="center">
            <Typography variant="subtitle1">Issues</Typography>
          </StyledTableHeadCell>
          <StyledTableHeadCell align="right">
            <Typography variant="subtitle1">Date Submitted</Typography>
          </StyledTableHeadCell>
          <TableCell />
        </StyledTableHead>
        <TableBody>
          {reports.map(row => (
            <ReportsToReviewListRow report={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ReportsToReviewList;
