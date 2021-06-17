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
import { Box, Flex, Text } from 'rebass';
import theme from '../../theme';
import NewlineText from '../common/UI/NewLineText';
import PendingLabel from '../common/UI/PendingLabel';

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
  
  return (
    <Flex alignItems="left" justifyContent="center" flexDirection="column">
      <Box width={2 / 3}>
        <Text as="h2" fontSize={[3, 4, 4]} fontWeight={500} mb={3}>
          {name}
        </Text>
      </Box>
    </Flex>
  );
};

export default ProjectIDCard;