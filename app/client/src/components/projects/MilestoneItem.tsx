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
import { Box, GridList, GridListTile, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Milestone } from '../../types';
import StatusButton from '../common/buttons/StatusButton';

const StyledHeader = styled(Box)`
  background-color: #d5d5d5;
  justify-content: space-between;
  display: flex;
  padding: 8px;
  border-radius: 4px 4px 0 0;
`;

interface MilestoneItemProps {
  deleteItem?: () => void;
  editItem?: () => void;
  milestone: Milestone;
}

/**
 * Project milestone component
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const MilestoneItem: React.FC<MilestoneItemProps> = props => {
  const { milestone, deleteItem, editItem } = props;
  const { name, status, start, estimatedEnd, progress, comments } = milestone;

  // formats dates to yyyy-mm-dd format
  const formattedEstimatedEnd = new Date(estimatedEnd).toLocaleDateString('en-CA');
  const formattedStart = new Date(start).toLocaleDateString('en-CA');

  return (
    <Box boxShadow={2} borderRadius={4}>
      <StyledHeader>
        <Typography variant="h6">{name}</Typography>
        <Box display="flex">
          {props.deleteItem ? (
            <IconButton size="small" onClick={deleteItem}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <></>
          )}
          {props.editItem ? (
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
            <Box flexDirection="column" p={1} mr={2}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Progress</Typography>
                <Typography>{`${progress}%`}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Status</Typography>
                <StatusButton status={status} />
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="subtitle1">Start Date</Typography>
                <Typography>{formattedStart}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Planned Finish Date</Typography>
                <Typography>{formattedEstimatedEnd}</Typography>
              </Box>
            </Box>
          </GridListTile>
          <GridListTile cols={1}>
            <Box p={1}>
              <Typography variant="subtitle1">Comments</Typography>
              <Box overflow="auto" height="100px">
                <Typography variant="body1" display="block">
                  {comments || 'N/A'}
                </Typography>
              </Box>
            </Box>
          </GridListTile>
        </GridList>
      </Box>
    </Box>
  );
};

export default MilestoneItem;
