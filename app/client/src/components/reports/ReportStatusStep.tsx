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

import * as React from 'react';
import { Container, Typography } from '@material-ui/core';
import ReportStatusItem from './ReportStatusItem';
import { ReportStatus } from '../../types';

type Props = {
  statuses: ReportStatus[];
  onChange: (status: ReportStatus, index: number) => void;
  onValidation: (valid: boolean) => void;
};

/**
 * Edit-report step 2 - Status
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ReportStatusStep = (props: Props) => {
  const { statuses, onChange, onValidation } = props;

  const handleChange = (index: number) => {
    return (status: ReportStatus) => {
      onChange(status, index);
    };
  };

  // validity of each status
  const [valid, setValid] = React.useState<boolean[]>(statuses.map(() => true));

  const handleValidation = (index: number) => {
    return (value: boolean) => {
      const clone = [...valid];
      clone[index] = value;
      setValid(clone);
      onValidation(valid.every(v => v));
    };
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center">
        Status Summary
      </Typography>
      {statuses.map((status, index) => (
        <ReportStatusItem
          status={status}
          key={status.type}
          onChange={handleChange(index)}
          onValidation={handleValidation(index)}
        />
      ))}
    </Container>
  );
};

export default ReportStatusStep;
