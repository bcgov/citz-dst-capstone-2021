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
import { Box, IconButton, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { Kpi } from '../../types';
import RoundLabel from '../common/RoundLabel';
import KPIProgress from '../common/KPIProgress';

const useStyles = makeStyles({
  bold: {
    fontWeight: 'bold',
  },
});

interface KPIItemProps {
  deleteItem: () => void;
  editItem: () => void;
  kpi: Kpi;
}

const KPIItem: React.FC<KPIItemProps> = (props) => {
  const { deleteItem, editItem, kpi } = props;
  const classes = useStyles();
  const {
    name,
    description,
    unit,
    baseline,
    target,
    value,
    end,
    outcome,
    output,
  } = kpi;

  return (
    <Paper variant="outlined">
      <Box minWidth="520px" className={classes.bold} p={2}>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" className={classes.bold}>
              {name}
            </Typography>
            <Box ml={4} display={outcome ? 'inline' : 'none'}>
              <RoundLabel text="Outcome" />
            </Box>
            <Box mx={1} display={output ? 'inline' : 'none'}>
              <RoundLabel text="Output" />
            </Box>
          </Box>
          <Box display="flex">
            <IconButton size="small" onClick={deleteItem}>
              <DeleteIcon />
            </IconButton>
            <IconButton size="small" onClick={editItem}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        <Box display="flex">
          <Box mr={2}>
            <Typography className={classes.bold}>
              Target Completion Date
            </Typography>
          </Box>
          <Box>
            <Typography>{end}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">{description}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography className={classes.bold}>Current Progress</Typography>
          <Box ml={2}>
            <Typography>{`${value} ${unit}`}</Typography>
          </Box>
        </Box>
        <Box>
          <KPIProgress value={(value * 100) / target} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Typography className={classes.bold}>Baseline</Typography>
            <Box ml={1}>
              <Typography>{`${baseline} ${unit}`}</Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Typography className={classes.bold}>Target</Typography>
            <Box mx={1}>
              <Typography>{`${target} ${unit}`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default KPIItem;
