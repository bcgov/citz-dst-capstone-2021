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
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { validateObjective } from '../../utils/validationSchema';
import { Objective, Status } from '../../types';

const useStyles = makeStyles({
  button: {
    marginRight: '24px',
    width: '140px',
    textTransform: 'none',
  },
});

interface NewObjectiveFormProps {
  closeModal: (data: any) => void;
  objective: Objective | null;
}

const NewObjectiveForm: React.FC<NewObjectiveFormProps> = props => {
  const { closeModal, objective } = props;
  const classes = useStyles();

  const defaultEndData = objective?.estimatedEnd ? new Date(objective.estimatedEnd) : null;
  const [estEndDate, setEstEndDate] = React.useState<Date | null>(defaultEndData);

  const cancel = () => closeModal(null);

  const initialValues = objective
    ? _.cloneDeep(objective)
    : {
        name: '',
        description: '',
        status: Status.Green,
        estimatedEnd: '',
        phase: '',
        asset: '',
        comments: '',
      };

  const formik = useFormik({
    initialValues,
    validationSchema: validateObjective,
    onSubmit: values => {
      closeModal(values);
    },
  });

  const { errors, touched, isValid, values, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <Container maxWidth="sm">
      <Paper variant="outlined">
        <Box maxWidth="560px" p={4}>
          <Box display="flex" justifyContent="center" my={3}>
            <Typography variant="h5">{objective ? 'Edit' : 'Create New'} Objective</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box my={1}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Objective Name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Box>
            <Box my={1}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Objective Description"
                type="text"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Box>
            <Box my={1}>
              <TextField
                fullWidth
                id="comments"
                name="comments"
                label="Comments"
                multiline
                rows={3}
                value={values.comments}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.comments && Boolean(errors.comments)}
                helperText={touched.comments && errors.name}
              />
            </Box>
            <Box my={1} display="flex" justifyContent="space-between">
              <Box mt={3}>
                <KeyboardDatePicker
                  autoOk
                  size="small"
                  variant="inline"
                  inputVariant="outlined"
                  format="yyyy/MM/dd"
                  id="estimatedEnd"
                  name="estimatedEnd"
                  label="Target Completion Date"
                  value={estEndDate}
                  error={touched.estimatedEnd && Boolean(errors.estimatedEnd)}
                  helperText={touched.estimatedEnd && errors.estimatedEnd}
                  onBlur={handleBlur}
                  onChange={date => {
                    formik.setTouched({ estimatedEnd: true });
                    if (date && !date.invalid) {
                      setEstEndDate(date);
                      formik.setFieldValue('estimatedEnd', date.toLocaleString());
                    } else {
                      setEstEndDate(null);
                      formik.setFieldValue('estimatedEnd', '');
                    }
                  }}
                />
              </Box>
              <Box mt={2}>
                <FormControl style={{ width: '150px' }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    fullWidth
                    id="status"
                    name="status"
                    labelId="Status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {Object.entries(Status)
                      .filter(([, value]) => typeof value === 'string')
                      .map(([key, value]) => (
                        <MenuItem value={+key} key={key}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box my={1}>
              <TextField
                fullWidth
                id="phase"
                name="phase"
                label="Objective Phase(Optional)"
                type="text"
                value={values.phase}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phase && Boolean(errors.phase)}
                helperText={touched.phase && errors.phase}
              />
            </Box>
            <Box my={1}>
              <TextField
                fullWidth
                id="asset"
                name="asset"
                label="Objective Asset(Optional)"
                type="text"
                value={values.asset}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.asset && Boolean(errors.asset)}
                helperText={touched.asset && errors.asset}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt={5}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={cancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!values.name || !isValid}
                type="submit"
              >
                {objective ? 'Update' : 'Add Objective'}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewObjectiveForm;
