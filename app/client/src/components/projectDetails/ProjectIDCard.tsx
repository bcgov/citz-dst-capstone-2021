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

import styled from "@emotion/styled";
import React from 'react';
import { Typography, Box } from '@material-ui/core';
import theme from '../../theme';
import CardItem from './CardItem';

interface IProjectIDCardProps {
  name?: string;
  description?: string;
  ministry?: string;
  program?: string;
  CPS?: string;
  ministryProjectNumber?: string;
}

const ProjectIDCard: React.FC<IProjectIDCardProps> = (props) => {
  const {
    name = '',
    description = '',
    ministry = '',
    program = '',
    CPS = '',
    ministryProjectNumber = ''
  } = props;
  
  // TODO: refactor any custom colours and theming using the theme provider
  return (
    <Box style={{border: '1px solid black'}} m={4}>
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
        <Box alignItems="left" style={{borderBottom: '1px solid black'}} width={1} p={2} bgcolor="#D5D5D5">
          <Typography variant='h4'>
            <Box fontWeight='fontWeightBold' m={1 / 2}>
              Project Identification
            </Box>
          </Typography>
        </Box>
        
        <CardItem label={'Project Name'} content={name} />
        <CardItem label={'Project Description'} content={description} />
        <CardItem label={'Ministry'} content={ministry} />
        <CardItem label={'Program Name'} content={program} />
        <CardItem label={'CPS Identifier'} content={CPS} />
        <CardItem label={'Ministry Project Number'} content={ministryProjectNumber} />
      </Box>
    </Box>
  );
};

export default ProjectIDCard;