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
import CardItem from './CardItem';

interface IKPICardProps {
  name?: string
  type?: string //we could use an enum here
  description?: string
  baselineUnit?: string
  baselineValue?: number
  targetUnit?: string
  targetValue?: number
  targetDate?: string
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
    targetDate = ''
  } = props;

  return (
    <Box style={{border: '1px solid black'}} m={4}>
      <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
        
        <Box alignItems="left" style={{borderBottom: '1px solid black'}} width={1} p={2} bgcolor='#D5D5D5'>
          <Typography variant='h4'>
            <Box fontWeight='fontWeightBold' m={ 1 / 2}>
              {name}
            </Box>
          </Typography>
        </Box>

        <Typography variant='h5'>
          <Box fontWeight='fontWeightBold' mb={1} ml={3}>
            Description
          </Box>
        </Typography>

      </Box>
    </Box>
  );
};

export default KPICard;