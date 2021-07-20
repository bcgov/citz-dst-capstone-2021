//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React, { PropsWithChildren } from 'react';
import { Typography, Box } from '@material-ui/core';

interface ICardItem extends PropsWithChildren<any> {
  label?: string;
  content?: string;
}
const Card: React.FC<ICardItem> = props => {
  const { label = '', content = '', children } = props;

  return (
    <Box width={1}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" px={2}>
        <Box mr={5}>
          <Typography variant="h6">{label}</Typography>
        </Box>
        {children || (
          <Box maxWidth="60%">
            <Typography variant="subtitle1">{content}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Card;
