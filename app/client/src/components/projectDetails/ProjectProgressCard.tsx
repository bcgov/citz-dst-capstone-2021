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
import { Box, Flex, Text } from 'rebass';
import theme from '../../theme';
import CardItem from './CardItem';

interface IProjectProgressCardProps {
    phase?: string
    completionDate?: string
    percentComplete?: number
}

const ProjectProgressCard: React.FC<IProjectProgressCardProps> = (props) => {
    const {
        phase = '',
        completionDate = '',
        percentComplete = ''
    } = props;

    return (
        <Box style={{border: '1px solid black'}}>
        <Flex alignItems="center" justifyContent="center" flexDirection="column" >
          <Box alignItems="left" style={{borderBottom: '1px solid black'}} width={1} p={2} bg="#D5D5D5">
            <Text as="h2" fontSize={[3, 4, 4]} fontWeight={800} m={2}>
            Project Identification
            </Text>
          </Box>
          <CardItem label={'Project Phase'} content={phase} />
          <CardItem label={'Estimated Date of Project Completion'} content={completionDate} />
          <CardItem label={'Percent Complete'} content={`${percentComplete}%`} />
        </Flex>
      </Box>
    );
};

export default ProjectProgressCard;