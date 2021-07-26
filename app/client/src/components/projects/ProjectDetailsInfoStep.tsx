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
import {Box, CircularProgress, Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {NewProject, Project, Report} from '../../types';
import ProjectProgressCard from './ProjectProgressCard';
import ProjectIDCard from './ProjectIDCard';
import ProjectContactCard from './ProjectContactCard';
import ProjectIDForm from './ProjectIDForm';
import emitter from '../../events/Emitter';
import EventType from '../../events/Events';
import ProjectContactsForm from './ProjectContactsForm';
import useApi from '../../utils/api';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  project: Project;
  report?: Report;
};

const ProjectDetailsInfoStep: React.FC<Props> = props => {
  const { project, report } = props;

  const classes = useStyles();

  const api = useApi();

  const [idModalVisible, setIdModalVisible] = React.useState(false);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);

  const updateProject = (data: NewProject & { id: string }): Promise<boolean> => {
    if (!data) return Promise.resolve(true);
    return api.updateProject(project.id, data).then(() => {
      return emitter.emit(EventType.Project.Reload);
    });
  };

  React.useEffect(() => {
    emitter.on(EventType.Project.UpdateIdentity, data => {
      updateProject(data).finally(() => {
        setIdModalVisible(false);
      });
    });
    emitter.on(EventType.Project.UpdateContact, data => {
      updateProject(data).finally(() => {
        setContactModalVisible(false);
      });
    });
    return () => {
      emitter.off(EventType.Project.UpdateIdentity);
      emitter.off(EventType.Project.UpdateContact);
    };
    // eslint-disable-next-line
  }, []);

  const editProjectIdentity = () => {
    setIdModalVisible(true);
  };
  const editProjectContacts = () => {
    setContactModalVisible(true);
  };

  const renderContent = () => (
    <Box m={4}>
      <Box mb={4}>
        <ProjectProgressCard project={project} report={report}/>
      </Box>
      <Box mb={4}>
        <ProjectIDCard project={project} editItem={editProjectIdentity} />
      </Box>
      <Box mb={4}>
        <ProjectContactCard project={project} editItem={editProjectContacts} />
      </Box>
      <Modal disableEnforceFocus open={idModalVisible} className={classes.modal}>
        <ProjectIDForm project={project} />
      </Modal>
      <Modal disableEnforceFocus open={contactModalVisible} className={classes.modal}>
        <ProjectContactsForm project={project} />
      </Modal>
    </Box>
  );

  return project?.id ? renderContent() : <CircularProgress />;
};

export default ProjectDetailsInfoStep;
