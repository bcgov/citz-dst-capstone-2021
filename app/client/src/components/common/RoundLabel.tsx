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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    border: 'solid 1',
    backgroundColor: 'lightgrey',
    borderRadius: '12px',
    height: '22px',
    padding: '2px 12px',
    fontSize: '14px',
  },
});

interface RoundLabelProps {
  text: string;
}

/**
 * Round bordered label
 * @author [SungHwan Park](shwpark612@gmail.com)
 *
 * @remarks This and {@link ./buttons/StatusButton} could be integrated
 */
const RoundLabel: React.FC<RoundLabelProps> = props => {
  const classes = useStyles();
  const { text } = props;
  return <div className={classes.root}>{text}</div>;
};

export default RoundLabel;
