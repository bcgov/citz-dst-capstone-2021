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
import styled from '@emotion/styled';
import { Box, GridList, GridListTile, IconButton, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { Objective } from '../../types';
import StatusButton from '../common/buttons/StatusButton';

// TODO: replace with material ui styles
const StyledHeader = styled(Box)`
  background-color: #D5D5D5;
  justify-content: space-between;
  display: flex;
  padding: 8px;
  border-radius: 4px 4px 0 0;
`;

const useStyles = makeStyles({
  header: {
    border: 1,
    borderStyle: 'solid',
    backgroundColor: 'lightgrey',
    height: 36,
    padding: '8px',
  },
  body: {
    border: 1,
    borderTop: 0,
    borderStyle: 'solid',
    padding: '8px',
  },
});

interface ObjectiveItemProps {
  deleteItem?: () => void;
  editItem?: () => void;
  objective: Objective;
}

const ObjectiveItem: React.FC<ObjectiveItemProps> = props => {
  const { deleteItem, editItem, objective } = props;
  const classes = useStyles();
  const { name, description, status, estimatedEnd, comments, phase, asset } = objective;

  const formattedEstimatedEnd = new Date(estimatedEnd).toLocaleDateString('en-CA');

  return (
    <Box boxShadow={2} borderRadius={4}>
      <StyledHeader>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle2" style={{ marginLeft: '8px' }}>
            {description}
          </Typography>
        </Box>
        <Box display="flex">
          {deleteItem ? (
            <IconButton size="small" onClick={deleteItem}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <></>
          )}
          {editItem ? (
            <IconButton size="small" onClick={editItem}>
              <EditIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </Box>
      </StyledHeader>
      <Box>
        <GridList cols={2} cellHeight={140}>
          <GridListTile cols={1}>
            <Box flexDirection="column" p={1} mr={1}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Status</Typography>
                <StatusButton status={status} />
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Target Completion Date</Typography>
                <Typography>{formattedEstimatedEnd}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Phase</Typography>
                <Typography>{phase || 'N/A'}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Asset</Typography>
                <Typography>{asset || 'N/A'}</Typography>
              </Box>
            </Box>
          </GridListTile>
          <GridListTile cols={1}>
            <Box p={1}>
              <Typography variant="subtitle1">Comments</Typography>
              <Box overflow="auto" height="100px">
                <Typography variant="body1" display="block">
                  {comments}
                </Typography>
              </Box>
            </Box>
          </GridListTile>
        </GridList>
      </Box>
    </Box>
  );
};

export default ObjectiveItem;
