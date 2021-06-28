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

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
  CircularProgress,
} from '@material-ui/core';
import styled from 'styled-components';
import { Project, StoreState, User } from '../../types';
import theme from '../../theme';
import useApi from '../../utils/api';

const StyledTableHead = styled(TableHead)`
  background-color: ${theme.colors.primary};
`;
const StyledTableHeadCell = styled(TableCell)`
  color: ${theme.colors.contrast};
  padding: 4px;
  text-align: center;
`;

interface ProjectListProps {
  user: User;
}

const ProjectList: React.FC<ProjectListProps> = () => {
  const [projects, setProjects] = useState([] as Project[]);

  const api = useApi();

  useEffect(() => {
    // TODO: (nick) user should be passed to fetch projects owned by the user
    api.getProjects().then((data) => {
      setProjects(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoading = () => {
    return <CircularProgress />;
  };

  const renderTable = () => {
    return (
      <Box>
        <Container>
          <Box my={2}>
            <Typography variant="h4">Projects</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="project list">
              <StyledTableHead>
                <StyledTableHeadCell>Ministry</StyledTableHeadCell>
                <StyledTableHeadCell>CPS Number</StyledTableHeadCell>
                <StyledTableHeadCell>Project Name</StyledTableHeadCell>
                <StyledTableHeadCell>Project Description</StyledTableHeadCell>
                <StyledTableHeadCell>Next Report Due</StyledTableHeadCell>
                <StyledTableHeadCell>Scope</StyledTableHeadCell>
                <StyledTableHeadCell>Budget</StyledTableHeadCell>
                <StyledTableHeadCell>Schedule</StyledTableHeadCell>
                <StyledTableHeadCell>Project Phase</StyledTableHeadCell>
                <StyledTableHeadCell>
                  Estimated Completion Date
                </StyledTableHeadCell>
              </StyledTableHead>
              <TableBody>
                {projects.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="center">
                      {row.ministry}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/projects/${row.cpsIdentifier}`}>
                        {row.cpsIdentifier}
                      </Link>
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

  if (projects.length > 0) {
    return renderTable();
  }
  return renderLoading();
};

const mapState = ({ user }: StoreState) => {
  return { user };
};

export default connect(mapState, null)(ProjectList);
