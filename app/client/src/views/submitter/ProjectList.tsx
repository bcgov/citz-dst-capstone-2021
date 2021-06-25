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
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
} from '@material-ui/core';
import styled from 'styled-components';
import { Project } from '../../types';
import theme from '../../theme';

const projects: Project[] = [
  {
    name: 'Test Project',
    cpsIdentifier: 'LCTZSSA6581',
    projectNumber: 'N/A',
    description: 'Test project description',
    ministry: "Citizens' Services",
    program: 'Test project program',
    sponsor: {
      firstName: 'Sponsor',
      lastName: 'RDSI',
      id: '60caa6fee7cf1742d87d30f3',
    },
    manager: {
      firstName: 'Manager',
      lastName: 'RDSI',
      id: '60caa6f1e7cf1742d87d30f2',
    },
    financialContact: {
      firstName: 'Finance',
      lastName: 'RDSI',
      id: '60caa6dee7cf1742d87d30f1',
    },
    start: '2020-06-17T01:35:45.782Z',
    progress: 10,
    phase: 'project phase',
    id: '60d6537d4e3478144064bd8d',
  },
  {
    name: 'RDSI Project',
    cpsIdentifier: 'LCTZABC1234',
    projectNumber: 'N/A',
    description: 'Reporting and Dashboard System Improvement Application',
    ministry: "Citizens' Services",
    program: '',
    sponsor: {
      firstName: 'Sponsor',
      lastName: 'RDSI',
      id: '60caa6fee7cf1742d87d30f3',
    },
    manager: {
      firstName: 'Manager',
      lastName: 'RDSI',
      id: '60caa6f1e7cf1742d87d30f2',
    },
    financialContact: {
      firstName: 'Finance',
      lastName: 'RDSI',
      id: '60caa6dee7cf1742d87d30f1',
    },
    start: '2020-05-10T00:00:00.000Z',
    progress: 30,
    phase: 'Initiating',
    id: '60d653ae8fb433148c7ceacb',
  },
];

const StyledTableHeader = styled(TableHead)`
  background-color: ${theme.colors.primary};
`;
const StyledTableCell = styled(TableCell)`
  color: ${theme.colors.contrast};
`;

const ProjectList = () => {
  return (
    <Box>
      <Container>
        <Box my={2}>
          <Typography variant="h4">Projects</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="project list">
            <StyledTableHeader>
              <StyledTableCell>Ministry</StyledTableCell>
              <StyledTableCell>CPS Number</StyledTableCell>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell>Project Description</StyledTableCell>
              <StyledTableCell>Next Report Due</StyledTableCell>
              <StyledTableCell>Scope</StyledTableCell>
              <StyledTableCell>Budget</StyledTableCell>
              <StyledTableCell>Schedule</StyledTableCell>
              <StyledTableCell>Project Phase</StyledTableCell>
              <StyledTableCell>Estimated Completion Date</StyledTableCell>
            </StyledTableHeader>
            <TableBody>
              {projects.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.ministry}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.cpsIdentifier}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Scope - N/A
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Due - N/A
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Budget - N/A
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Schedule - N/A
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Phase - N/A
                  </TableCell>
                  <TableCell component="th" scope="row">
                    ECD - N/A
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default ProjectList;
