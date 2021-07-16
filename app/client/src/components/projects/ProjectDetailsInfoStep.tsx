// @flow
import * as React from 'react';
import { Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { NewProject, Project } from '../../types';
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
};
const ProjectDetailsInfoStep = (props: Props) => {
  const { project } = props;

  const classes = useStyles();

  const api = useApi();

  const [idModalVisible, setIdModalVisible] = React.useState(false);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);

  const updateProject = (data: NewProject & { id: string }): Promise<boolean> => {
    if (!data) return Promise.resolve(true);
    return api.updateProject(project.id, data).then(update => {
      return emitter.emit(EventType.Project.Reload, update);
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

  return (
    <Box m={4}>
      <Box mb={4}>
        <ProjectProgressCard {...project} />
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
};

export default ProjectDetailsInfoStep;
