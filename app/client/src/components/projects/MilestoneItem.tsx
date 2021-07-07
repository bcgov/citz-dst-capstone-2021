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
  Button,
  GridList,
  GridListTile,
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import theme from '../../theme';
import { MilestoneStatus } from '../../types';

interface MilestoneProps {
  name: string;
  description: string;
  status: MilestoneStatus;
  start: Date;
  estimatedEnd?: Date;
  progress: number;
  comments: string;
}

const MilestoneItem: React.FC<MilestoneProps> = () => {
  // const { name, description, status, start, estimatedEnd, progress, comments } = props;
  return (
    <Box>
      <Box
        display="flex"
        bgcolor={theme.colors.grey}
        justifyContent="space-between"
        alignItems="center"
        p={1}
        maxHeight="40px"
      >
        <Typography variant="h6">Milestone 1</Typography>
        <Box display="flex">
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <GridList cols={2}>
        <GridListTile cols={1}>
          <Box flexDirection="column" p={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">Progress</Typography>
              <Typography>10%</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">Status</Typography>
              <Button
                variant="contained"
                disabled
                size="small"
                style={{ borderRadius: '20px' }}
              >
                Green
              </Button>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">Start Date</Typography>
              <Typography>2021/20/30</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">Planned Finish Date</Typography>
              <Typography>2021/20/30</Typography>
            </Box>
          </Box>
        </GridListTile>
        <GridListTile cols={1}>
          <Box p={2}>
            <Typography variant="subtitle1">Comments</Typography>
            <Typography variant="body1" />
          </Box>
        </GridListTile>
      </GridList>
    </Box>
  );
};

export default MilestoneItem;
