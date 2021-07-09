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
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import _ from 'lodash';
import { useFormik } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { validateKPI } from '../../utils/validationSchema';
import { KPI } from '../../types';
import RoundLabel from '../common/RoundLabel';
import KPIProgress from '../common/KPIProgress';

const useStyles = makeStyles({
  bold: {
    fontWeight: 'bold',
  },
});

// interface KPIItemProps {
//   deleteItem: () => void;
//   editItem: () => void;
//   kpi: KPI;
// }
const KPIItem: React.FC = (props) => {
  // const { deleteItem, editItem, kpi } = props;
  const classes = useStyles();
  // const { name, description, unit, baseline, target, end, outcome, output } =
  //   kpi;

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
              KPI Alpha
            </Typography>
            <Box ml={4}>
              <RoundLabel text="Outcome" />
            </Box>
            <Box mx={1}>
              <RoundLabel text="Output" />
            </Box>
          </Box>
          <Box display="flex">
            <IconButton size="small" onClick={() => {}}>
              <DeleteIcon />
            </IconButton>
            <IconButton size="small" onClick={() => {}}>
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
            <Typography>2022-02-11</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography className={classes.bold}>Current Progress</Typography>
          <Box ml={2}>
            <Typography>$2300</Typography>
          </Box>
        </Box>
        <Box>
          <KPIProgress value={20} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex">
            <Typography className={classes.bold}>Baseline</Typography>
            <Box ml={1}>
              <Typography>$1200</Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Typography className={classes.bold}>Target</Typography>
            <Box mx={1}>
              <Typography>$1200</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default KPIItem;
