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
} from '@material-ui/core';
import styled from 'styled-components';
import { Project, StoreState, User } from '../../types';
import theme from '../../theme';
import useApi from '../../utils/api';
import ProjectListRow from '../../components/projects/ProjectListRow';

const StyledTableHead = styled(TableHead)`
  background-color: ${theme.colors.grey};
`;

const StyledTableHeadCell = styled(TableCell)`
  font-weight: bold;
  padding: 4px !important;
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
          <Box bgcolor={theme.colors.primary} color="white" p={1}>
            <Typography variant="h5">Projects</Typography>
          </Box>
          <Table aria-label="project list" size="medium">
            <StyledTableHead>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell align="center">
                CPS Number
              </StyledTableHeadCell>
              <StyledTableHeadCell align="center">Ministry</StyledTableHeadCell>
              <StyledTableHeadCell align="right">
                % Complete
              </StyledTableHeadCell>
              <StyledTableHeadCell align="right">
                Project Phase
              </StyledTableHeadCell>
              <StyledTableHeadCell align="right">
                Next Report Due
              </StyledTableHeadCell>
              <TableCell />
            </StyledTableHead>
            <TableBody>
              {projects.map((row) => (
                <ProjectListRow project={row} />
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
