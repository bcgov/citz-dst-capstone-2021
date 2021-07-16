// @flow
import * as React from 'react';
import { Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Project } from '../../types';
import ProjectProgressCard from './ProjectProgressCard';
import ProjectIDCard from './ProjectIDCard';
import ProjectContactCard from './ProjectContactCard';
import ProjectIDForm from './ProjectIDForm';
import emitter from '../../events/Emitter';
import EventType from '../../events/Events';
import ProjectContactsForm from "./ProjectContactsForm";

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

  const [idModalVisible, setIdModalVisible] = React.useState(false);
  const [contactModalVisible, setContactModalVisible] = React.useState(false);

  React.useEffect(() => {
    emitter.on(EventType.Project.UpdateIdentity, data => {
      console.log(data);
      setIdModalVisible(false);
    });
    emitter.on(EventType.Project.UpdateContact, data => {
      console.log(data);
      setContactModalVisible(false);
    });
    return () => {
      emitter.off(EventType.Project.UpdateIdentity);
      emitter.off(EventType.Project.UpdateContact);
    };
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
        <ProjectContactCard project={project} editItem={editProjectContacts}/>
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
