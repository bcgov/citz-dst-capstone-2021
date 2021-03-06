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
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  CircularProgress,
  TableRow,
  Button,
} from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Project, StoreState, User } from '../../types';
import theme from '../../theme';
import useApi from '../../utils/api';
import ProjectListRow from '../../components/projects/ProjectListRow';

const StyledHeader = styled(Box)`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 8px;
  border-radius: 4px 4px 0 0;
`;

const StyledTableHead = styled(TableHead)`
  background-color: #d5d5d5;
`;

const StyledTableHeadCell = styled(TableCell)`
  font-weight: bold;
  padding: 4px !important;
`;

interface ProjectListProps {
  user: User;
}

/**
 * Projects table - Submitters landing page
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ProjectList: React.FC<ProjectListProps> = () => {
  const [projects, setProjects] = useState([] as Project[]);

  const history = useHistory();
  const api = useApi();

  useEffect(() => {
    // TODO: (Nick) filter by the login user
    api
      .getProjects()
      .then(data => {
        setProjects(data);
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoading = () => {
    return <CircularProgress />;
  };

  const renderTable = () => {
    return (
      <Box>
        <Container>
          <Box display="flex" justifyContent="flex-end" my={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/create-project')}
            >
              Create New Project
            </Button>
          </Box>
          <StyledHeader>
            <Typography variant="h5">Projects</Typography>
          </StyledHeader>
          <Table aria-label="project list" size="medium">
            <StyledTableHead>
              <TableRow>
                <StyledTableHeadCell>Name</StyledTableHeadCell>
                <StyledTableHeadCell align="center">CPS Number</StyledTableHeadCell>
                <StyledTableHeadCell align="center">Ministry</StyledTableHeadCell>
                <StyledTableHeadCell align="right">% Complete</StyledTableHeadCell>
                <StyledTableHeadCell align="right">Project Phase</StyledTableHeadCell>
                <StyledTableHeadCell align="right">Next Report Due</StyledTableHeadCell>
                <TableCell />
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {projects.map(row => (
                <ProjectListRow project={row} key={row.id} />
              ))}
            </TableBody>
          </Table>
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
