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

interface ICardItem {
  label?: string;
  content?: string;
}
const CardItem: React.FC<ICardItem> = (props) => {
  const {
    label = '',
    content = ''
  } = props;

  return (
    <Box width={1}>
    <Flex flexDirection="row" justifyContent="space-between">
      <Text as="h3" fontSize={[2, 3, 3]} fontWeight={800} mb={3} ml={3}>
      {label}
      </Text>
      <Text as="h3" fontSize={[2, 3, 3]} fontWeight={500} mb={3} mr={3}>
      {content}
      </Text>
    </Flex>
    </Box>
  );
};

export default CardItem;