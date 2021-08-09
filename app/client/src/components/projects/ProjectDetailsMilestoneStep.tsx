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
import { Box, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { Milestone, Project, Report } from '../../types';
import MilestoneItem from './MilestoneItem';
import NewMilestoneForm from './NewMilestoneForm';
import EventType from '../../events/Events';
import emitter from '../../events/Emitter';
import useApi from '../../utils/api';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  reportId: string;
  milestones: Milestone[];
  project: Project;
};

/**
 * Project milestone step is the third step of project details.
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ProjectDetailsMilestoneStep = (props: Props) => {
  const { reportId, milestones, project } = props;
  const { start, estimatedEnd } = project;

  const classes = useStyles();
  const api = useApi();

  // prepare modal windows
  const [modalVisible, setModalVisible] = React.useState(false);
  const [cacheIndex, setCacheIndex] = React.useState(-1);
  const editItem = (index: number) => {
    return () => {
      if (index >= 0) {
        setCacheIndex(index);
        setModalVisible(true);
      }
    };
  };

  const createOrUpdateMilestone = (milestone: Milestone): Promise<Report | null> => {
    if (milestone) {
      if (cacheIndex < 0) {
        return api.createMilestone(reportId, milestone);
      }
      return api.updateMilestone(reportId, milestones[cacheIndex]?.id, milestone);
    }
    return Promise.resolve(null);
  };

  const handleUpdate = (milestone: Milestone) => {
    return createOrUpdateMilestone(milestone)
      .then(report => {
        if (report) {
          emitter.emit(EventType.Report.Reload, report);
          emitter.emit(EventType.Project.Reload);
        }
      })
      .finally(() => {
        setCacheIndex(-1);
        setModalVisible(false);
      });
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mr={4}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setModalVisible(true)}
        >
          New Milestone
        </Button>
      </Box>
      {milestones && milestones.length > 0 ? (
        <>
          {milestones.map((milestone, index) => (
            <Box m={4} key={milestone.id}>
              <MilestoneItem milestone={milestone} editItem={editItem(index)} />
            </Box>
          ))}
        </>
      ) : (
        <Box pt={10} textAlign="center">
          <h1>No Milestones to Display</h1>
        </Box>
      )}
      <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
        <NewMilestoneForm
          milestone={milestones[cacheIndex]}
          start={new Date(start)}
          end={new Date(estimatedEnd)}
          closeModal={handleUpdate}
        />
      </Modal>
    </>
  );
};

export default ProjectDetailsMilestoneStep;
