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

import React, { useState } from 'react';
import { Box, Collapse, IconButton, TableCell, TableRow } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import styled from 'styled-components';
import {
  getFiscalYearString,
  getReportingPeriodStart,
  getReportingPeriodEnd,
} from '../../utils/dateUtils';
import { Report, ReportState, User } from '../../types';
import QuarterlyReportListRowDetail from './QuarterlyReportListRowDetail';

const StyledTableCell = styled(TableCell)`
  padding: 4px 8px !important;
`;

interface QuarterlyReportListRowProps {
  report: Report;
}

/**
 * A quarterly report row represents a report in the project details
 * @author [Samara Flueck](samflueck95@gmail.com)
 */
const QuarterlyReportListRow: React.FC<QuarterlyReportListRowProps> = props => {
  const { report: row } = props;
  const submitter = row.submitter as User | undefined;
  const [collapse, setCollapse] = useState(true);

  return (
    <>
      <TableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.quarter} FY {getFiscalYearString(row.year, row.quarter)}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="center">
          {row.state || row.state === ReportState.Draft ? String(ReportState[row.state]) : 'N/A'}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="right">
          {getReportingPeriodStart(row.year, row.quarter).toLocaleDateString('en-CA')}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="right">
          {getReportingPeriodEnd(row.year, row.quarter).toLocaleDateString('en-CA')}
        </StyledTableCell>
        <StyledTableCell align="right">
          <IconButton onClick={() => setCollapse(!collapse)}>
            {collapse ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </StyledTableCell>
      </TableRow>
      <TableRow style={{ display: collapse ? 'none' : '' }}>
        <TableCell colSpan={12}>
          <Collapse in={!collapse}>
            <Box my={1}>
              <QuarterlyReportListRowDetail report={row} submitter={submitter} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default QuarterlyReportListRow;
