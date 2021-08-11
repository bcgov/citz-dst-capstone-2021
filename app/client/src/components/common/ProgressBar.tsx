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
import { Box, LinearProgress, Typography, withStyles } from '@material-ui/core';

const BorderLinearProgress = withStyles({
  root: {
    height: 16,
    width: '100%',
  },
})(LinearProgress);

type Props = {
  value: number;
  hidePercent?: boolean;
};

/**
 * Material-UI Progress Bar
 * @author      [SungHwan Park](shwpark612@gmail.com)
 *
 * @remarks Fix error, `validateDOMNesting(...): <p> cannot appear as a descendant of <p>.`
 */
const ProgressBar: React.FC<Props> = props => {
  const { value, hidePercent } = props;
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={30} display={hidePercent ? 'none' : ''} textAlign="right">
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
