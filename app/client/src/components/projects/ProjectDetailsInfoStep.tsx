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

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    emitter.on(EventType.Project.Update, data => {
      console.log(data);
      setModalVisible(false);
    });
    return () => {
      emitter.off(EventType.Project.Update);
    };
  }, []);

  const editProject = () => {
    setModalVisible(true);
  };

  return (
    <Box m={4}>
      <Box mb={4}>
        <ProjectProgressCard {...project} />
      </Box>
      <Box mb={4}>
        <ProjectIDCard project={project} editItem={editProject} />
      </Box>
      <Box mb={4}>
        <ProjectContactCard {...project} />
      </Box>
      <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
        <ProjectIDForm project={project} />
      </Modal>
    </Box>
  );
};

export default ProjectDetailsInfoStep;
