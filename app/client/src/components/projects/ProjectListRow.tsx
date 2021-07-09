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
import { Project } from '../../types';
import ProjectListRowDetail from './ProjectListRowDetail';

const StyledTableCell = styled(TableCell)`
  padding: 4px !important;
`;

interface ProjectListRowProps {
  project: Project;
}

const ProjectListRow: React.FC<ProjectListRowProps> = (props) => {
  const { project: row } = props;

  const [collapse, setCollapse] = useState(true);

  return (
    <>
      <TableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="center">
          <Link to={`/projects/${row.cpsIdentifier}`}>{row.cpsIdentifier}</Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="left">
          {row.ministry}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="right">
          {row.progress}%
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="right">
          {row.phase}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="right">
          N/A
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
            <ProjectListRowDetail project={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ProjectListRow;
