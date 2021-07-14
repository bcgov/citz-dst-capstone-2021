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
import { Collapse, IconButton, TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import styled from 'styled-components';
import { Report, ReportState } from '../../types';
import QuarterlyReportListRowDetail from './QuarterlyReportListRowDetail'

const StyledTableCell = styled(TableCell)`
  padding: 4px !important;
`;

interface QuarterlyReportListRowProps {
  report: Report;
}

const getFiscalYearString = (year: number, quarter: string) => {
  switch (quarter) {
    case 'Q1':
    case 'Q2':
    case 'Q3a':
    case 'Q3b':
      return `${year % 100}/${(year + 1) % 100}`;
    case 'Q4':
      return `${(year - 1) % 100}/${year % 100}`;
    default:
      return 'unexpected value';
  }
};

const getReportingPeriodStart = (year: number, quarter: string): Date => {
  switch (quarter) {
    case 'Q1':
      return new Date(year, 3, 1);
    case 'Q2':
      return new Date(year, 6, 1);
    case 'Q3a':
    case 'Q3b':
      return new Date(year, 9, 1);
    case 'Q4':
      return new Date(year, 0, 1);
    default:
      return new Date(0, 0, 0);
  }
};

const getReportingPeriodEnd = (year: number, quarter: string): Date => {
  switch (quarter) {
    case 'Q1':
      return new Date(year, 5, 30);
    case 'Q2':
      return new Date(year, 8, 30);
    case 'Q3a':
    case 'Q3b':
      return new Date(year, 11, 31);
    case 'Q4':
      return new Date(year, 2, 31);
    default:
      return new Date(0, 0, 0);
  }
};

const QuarterlyReportListRow: React.FC<QuarterlyReportListRowProps> = (props) => {
  const { report : row } = props;
  const [collapse, setCollapse] = useState(true);

  return (
    <>
      <TableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.quarter} FY {getFiscalYearString(row.year, row.quarter)}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="center">
          {row.state ? String(ReportState[row.state]) : "N/A"}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="right">
          {getReportingPeriodStart(row.year, row.quarter).toLocaleDateString('en-CA')}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="right">
          {getReportingPeriodEnd(row.year, row.quarter).toLocaleDateString('en-CA')}
        </StyledTableCell>
        <StyledTableCell>
          <IconButton onClick={() => setCollapse(!collapse)}>
            {collapse ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </StyledTableCell>
      </TableRow>
      <TableRow style={{ display: collapse ? 'none' : '' }}>
        <TableCell colSpan={12}>
          <Collapse in={!collapse}>
            <QuarterlyReportListRowDetail report={row}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default QuarterlyReportListRow;