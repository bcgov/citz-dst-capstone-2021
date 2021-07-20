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
import styled from 'styled-components';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@material-ui/core';
import { Report } from '../../types';
import theme from '../../theme';

const StyledTableCellHead = styled(TableCell)`
  background-color: ${theme.colors.primary};
  color: white;
`;

const StyledTableCell = styled(TableCell)`
  padding: 1rem !important;
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
`;

interface OverallProjectFinanceTableProps {
  report: Report;
}

const OverallProjectFinanceTable: React.FC<OverallProjectFinanceTableProps> = props => {
  const { report } = props;

  const overallProjectFinancialData = [
    {
      label: 'Project Spend to End of Previous FY',
      value: report.finance?.spendToEndOfPreFy,
      bold: true,
    },
    {
      label: 'Current FY Full Year Forecasted Spend',
      value: report.finance?.fyForecast,
      bold: true,
    },
    { label: 'Projected Funding for Remaining FYs', value: report.finance?.remaining, bold: true },
  ];

  const overallProjectVariance = [
    { label: 'Total Project Budget', value: report.finance?.budget, bold: false },
    { label: 'Estimated Total Cost', value: report.finance?.estimatedTotalCost, bold: false },
    {
      label: 'Variance to Budget',
      value: report.finance ? +report.finance.budget - +report.finance.estimatedTotalCost : 0,
      bold: true,
    },
  ];

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table aria-label="current fy financials" size="medium">
          <TableHead>
            <TableRow>
              <StyledTableCellHead>
                <Typography variant="h5">&nbsp;Overall Project Financial Information</Typography>
              </StyledTableCellHead>
              <StyledTableCellHead />
            </TableRow>
          </TableHead>
          <TableBody>
            {overallProjectFinancialData.map(row => (
              <TableRow>
                <StyledTableCell>
                  {row.bold ? (
                    <StyledTypography variant="body2">{row.label}</StyledTypography>
                  ) : (
                    <Typography variant="body2">{row.label}</Typography>
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
            </TableRow>
            {overallProjectVariance.map(row => (
              <TableRow>
                <StyledTableCell>
                  {row.bold ? (
                    <StyledTypography variant="body2">{row.label}</StyledTypography>
                  ) : (
                    <Typography variant="body2">{row.label}</Typography>
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OverallProjectFinanceTable;
