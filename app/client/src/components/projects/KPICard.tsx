//
// Copyright © 2020 Province of British Columbia
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
import { Typography, Box } from '@material-ui/core';
import Card from './Card';

interface IKPICardProps {
  name?: string;
  type?: string; // we could use an enum here
  description?: string;
  baselineUnit?: string;
  baselineValue?: number;
  targetUnit?: string;
  targetValue?: number;
  targetDate?: string;
}

const KPICard: React.FC<IKPICardProps> = (props) => {
  const {
    name = '',
    type = '',
    description = '',
    baselineUnit = '',
    baselineValue = 0,
    targetUnit = '',
    targetValue = 0,
    targetDate = '',
  } = props;

  /* TODO: See if some sort of progress display for KPIs is desired */
  return (
    <Box style={{ border: '1px solid black' }} m={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {/* component header */}
        <Box
          display="flex"
          alignItems="center"
          style={{ borderBottom: '1px solid black' }}
          justifyContent="space-between"
          width={1}
          p={2}
          bgcolor="#D5D5D5"
        >
          <Typography variant="h5">
            <Box fontWeight="fontWeightBold" m={1 / 2}>
              {name}
            </Box>
          </Typography>
          <Typography variant="h5">
            <Box fontWeight="fontWeightRegular" m={1 / 2}>
              {type}
            </Box>
          </Typography>
        </Box>

        {/* component body */}
        <Box display="flex" alignItems="left" justifyContent="left" width={1}>
          <Typography variant="h5">
            <Box fontWeight="fontWeightBold" mb={1} ml={3}>
              Description
            </Box>
          </Typography>
        </Box>
        <Box display="flex" alignItems="left" justifyContent="left" width={1}>
          <Typography variant="body1">
            <Box mb={1} ml={3}>
              {description}
            </Box>
          </Typography>
        </Box>

        <Card label="Baseline" content={`${baselineValue} ${baselineUnit}`} />
        <Card label="Target" content={`${targetValue} ${targetUnit}`} />
        <Card label="Target Date" content={targetDate} />
      </Box>
    </Box>
  );
};

export default KPICard;
