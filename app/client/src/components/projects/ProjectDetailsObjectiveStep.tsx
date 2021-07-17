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

import { Box, Button, Modal } from '@material-ui/core';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import { Objective, Report } from '../../types';
import ObjectiveItem from './ObjectiveItem';
import NewObjectiveForm from './NewObjectiveForm';
import useApi from '../../utils/api';
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
  reportId: string;
  objectives: Objective[];
};

const ProjectDetailsObjectiveStep = (props: Props) => {
  const { objectives, reportId } = props;

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

  const createOrUpdateObjective = (objective: Objective): Promise<Report | null> => {
    if (objective) {
      if (cacheIndex < 0) {
        // new objective
        return api.createObjective(reportId, objective);
      }
      return api.updateObjective(reportId, objectives[cacheIndex]?.id, objective);
    }
    return Promise.resolve(null);
  };

  const handleUpdate = (objective: Objective) => {
    return createOrUpdateObjective(objective)
      .then(report => {
        if (report) {
          emitter.emit(EventType.Report.Reload, report);
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
          New Objective
        </Button>
      </Box>
      {objectives && objectives.length > 0 ? (
        <>
          {objectives.map((objective, index) => (
            <Box m={4} key={objective.id} >
              <ObjectiveItem objective={objective} editItem={editItem(index)} />
            </Box>
          ))}
          <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
            <NewObjectiveForm closeModal={handleUpdate} objective={objectives[cacheIndex]} />
          </Modal>
        </>
      ) : (
        <h1>No Objectives to Display</h1>
      )}
    </>
  );
};

export default ProjectDetailsObjectiveStep;
