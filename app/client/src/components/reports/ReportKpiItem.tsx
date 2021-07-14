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
import { Box, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Kpi } from '../../types';
import utils from '../../utils';
import { validateKPI, validateReportStatus } from '../../utils/validationSchema';

type Props = {
  kpi: Kpi;
  onChange: (kpi: Kpi) => void;
  onValidation: (valid: boolean) => void;
};

const ReportKpiItem = (props: Props) => {
  const { kpi, onChange, onValidation } = props;
  const { name, description, target, unit, baseline, end } = kpi;

  const initialValues = _.cloneDeep({ ...kpi, end: new Date(end) });

  const formik = useFormik({
    initialValues,
    validationSchema: validateKPI,
    onSubmit: values => {
      onChange(values);
    },
  });

  const { errors, touched, values, isValid, handleChange, handleBlur, setTouched, validateForm } = formik;

  useEffect(() => {
    console.log('valid => ', isValid);
    onValidation(isValid);
    // eslint-disable-next-line
  }, [isValid]);

  useEffect(() => {
    const allTouched = Object.keys(values).reduce((a, c) => ({ ...a, [c]: true }), {});
    setTouched(allTouched);
    // eslint-disable-next-line
  }, []);

  const handleChangeAndSubmit = (event: any) => {
    handleChange(event);
    const { name: key, value } = event.target;
    try {
      const updatedValues = { ...values, [key]: +value };
      validateKPI.validateSync(updatedValues);
      onChange(updatedValues);
      onValidation(true);
      // eslint-disable-next-line no-empty
    } catch (e) {
      console.log(e);
      onValidation(false);
    }
  };

  return (
    <form>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
        <Box flexGrow={1}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography variant="h6">{name}</Typography>
            <Typography variant="subtitle1">
              <strong>Target Completion Date - </strong>
              {utils.getISODateString(end)}
            </Typography>
          </Box>
          <Typography variant="body1">{description}</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">
              <strong>Baseline - </strong>
              {baseline + unit}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Target - </strong>
              {/* {TODO: (nick) how to decide unit is prepending or appending */}
              {unit === '$' ? unit + target : target + unit}
            </Typography>
          </Box>
        </Box>
        <Box ml={4} minWidth="140px">
          <TextField
            fullWidth
            id="value"
            name="value"
            label={`Progress (${unit})`}
            type="number"
            margin="normal"
            variant="outlined"
            size="small"
            inputProps={{ min: +baseline, max: +target }}
            value={values.value}
            onChange={handleChangeAndSubmit}
            onBlur={handleBlur}
            error={touched.value && Boolean(errors.value)}
            helperText={touched.value && errors.value}
          />
        </Box>
      </Box>
    </form>
  );
};
export default ReportKpiItem;
