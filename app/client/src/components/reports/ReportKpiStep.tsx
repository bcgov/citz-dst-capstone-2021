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
import { Box, Container, Typography } from '@material-ui/core';
import { Kpi } from '../../types';
import ReportKpiItem from './ReportKpiItem';

type Props = {
  kpis: Kpi[];
  onChange: (kpi: Kpi, index: number) => void;
  onValidation: (valid: boolean) => void;
};

/**
 * Edit-report step 6 - KPIs
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ReportKpiStep = (props: Props) => {
  const { kpis, onChange, onValidation } = props;

  // validity of each status
  const [valid, setValid] = React.useState<boolean[]>(kpis.map(() => true));
  if (kpis.length === 0) onValidation(true);

  const handleValidation = (index: number) => {
    return (value: boolean) => {
      const clone = [...valid];
      clone[index] = value;
      setValid(clone);
      onValidation(valid.every(v => v));
    };
  };

  const handleChange = (index: number) => {
    return (kpi: Kpi) => {
      onChange(kpi, index);
    };
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center">
        Key Performance Indicators
      </Typography>
      {kpis.map((kpi, index) => (
        <Box key={kpi.id} boxShadow={1} p={1} my={2}>
          <ReportKpiItem
            kpi={kpi}
            onChange={handleChange(index)}
            onValidation={handleValidation(index)}
          />
        </Box>
      ))}
    </Container>
  );
};

export default ReportKpiStep;
