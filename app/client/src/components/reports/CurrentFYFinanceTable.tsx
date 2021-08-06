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

interface CurrentFYFinanceTableProps {
  report: Report;
}

/**
 * Current fiscal year financial information
 * @author [Samara Flueck](samflueck95@gmail.com)
 */
const CurrentFYFinanceTable: React.FC<CurrentFYFinanceTableProps> = props => {
  const { report } = props;

  const currentFYActuals = [
    { label: 'Sitting In Ministry', value: report.finance?.fySitting, bold: false },
    { label: "JV'd to OCIO", value: report.finance?.jvToOcio, bold: false },
    {
      label: 'Current FY Actuals',
      value: report.finance ? +report.finance.fySitting + +report.finance.jvToOcio : 0,
      bold: true,
    },
  ];

  const currentFYVariance = [
    { label: 'Current FY Approved Funding', value: report.finance?.fyApproved, bold: false },
    {
      label: 'Current FY Full Year Forecasted Spend',
      value: report.finance?.fyForecast,
      bold: false,
    },
    {
      label: 'Variance to Budget',
      value: report.finance ? +report.finance.fyApproved - +report.finance.fyForecast : 0,
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
                <Typography variant="h5">
                  &nbsp;Current Fiscal Year Financial Information
                </Typography>
              </StyledTableCellHead>
              <StyledTableCellHead />
            </TableRow>
          </TableHead>
          <TableBody>
            {currentFYActuals.map(row => (
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
            {currentFYVariance.map(row => (
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

export default CurrentFYFinanceTable;
