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
import { Box, Container, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useApi from '../../utils/api';
import { Project, User } from '../../types';
import AutoCompleteField from '../common/AutoCompleteField';
import EventType from '../../events/Events';
import emitter from '../../events/Emitter';

const useStyles = makeStyles({
  button: {
    marginRight: '24px',
    width: '140px',
    textTransform: 'none',
  },
});

type Props = {
  project: Project;
};

const ProjectContactsForm: React.FC<Props> = props => {
  const { project } = props;
  const classes = useStyles();

  const api = useApi();

  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    api.getUsers().then(data => setUsers(data));
  });

  const [sponsor, setSponsor] = React.useState<User>(project.sponsor);
  const [manager, setManager] = React.useState<User>(project?.manager);
  const [financialContact, setFinancialContact] = React.useState<User | null>(
    project.financialContact,
  );

  const initialValues = {
    manager: project.manager.id,
    sponsor: project.sponsor.id,
    financialContact: project.financialContact.id,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      emitter.emit(EventType.Project.UpdateContact, values);
    },
  });

  const { errors, touched, isValid, values, handleSubmit, handleChange, handleBlur } = formik;

  const cancel = () => {
    emitter.emit(EventType.Project.UpdateContact, null);
  };

  return (
    <Container maxWidth="xs">
      <Box p={3} bgcolor="white" boxShadow={5} borderRadius={4}>
        <Box my={4}>
          <Typography variant="h5" align="center">
            Project Contacts
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <AutoCompleteField<User>
            options={users}
            getLabel={user => `${user.firstName} ${user.lastName}`}
            onChange={(_, value) => {
              formik.setFieldValue('manager', value?.id);
              setManager(value);
            }}
            getOptionSelected={(item, current) => {
              return item.id === current.id;
            }}
            value={manager}
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  fullWidth
                  label="Project Manager"
                  margin="normal"
                  onBlur={handleBlur}
                  error={touched.manager && Boolean(errors.manager)}
                  helperText={touched.manager && errors.manager}
                />
              );
            }}
          />
          <AutoCompleteField<User>
            options={users}
            getLabel={user => `${user.firstName} ${user.lastName}`}
            onChange={(_, value) => {
              formik.setFieldValue('sponsor', value?.id);
              setSponsor(value);
            }}
            getOptionSelected={(item, current) => {
              return item.id === current?.id;
            }}
            value={sponsor}
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  fullWidth
                  label="Project Sponsor"
                  margin="normal"
                  onBlur={handleBlur}
                  error={touched.sponsor && Boolean(errors.sponsor)}
                  helperText={touched.sponsor && errors.sponsor}
                />
              );
            }}
          />
          <AutoCompleteField<User>
            options={users}
            getLabel={user => `${user.firstName} ${user.lastName}`}
            onChange={(_, value) => {
              formik.setFieldValue('financialContact', value?.id);
              setFinancialContact(value);
            }}
            getOptionSelected={(item, current) => {
              return item.id === current?.id;
            }}
            value={financialContact}
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  fullWidth
                  label="Financial Contact"
                  margin="normal"
                  onBlur={handleBlur}
                  error={touched.financialContact && Boolean(errors.financialContact)}
                  helperText={touched.financialContact && errors.financialContact}
                />
              );
            }}
          />
          <Box display="flex" justifyContent="center" mt={5}>
            <Button variant="contained" color="primary" className={classes.button} onClick={cancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!isValid}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ProjectContactsForm;
