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
import { Box, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Kpi, Milestone } from '../../types';
import KPIItem from './KPIItem';
import NewKPIForm from './NewKPIForm';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  kpis: Kpi[];
};
const ProjectDetailsKpiStep = (props: Props) => {
  const { kpis } = props;

  const classes = useStyles();

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

  const updateProject = (data: Milestone) => {
    setModalVisible(false);
  };

  return (
    <>
      {kpis && kpis.length > 0 ? (
        <>
          {kpis.map((kpi, index) => (
            <Box m={4}>
              <KPIItem kpi={kpi} key={kpi.id} editItem={editItem(index)} />
            </Box>
          ))}
          <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
            <NewKPIForm closeModal={updateProject} kpi={kpis[cacheIndex]} />
          </Modal>
        </>
      ) : (
        <h1>No Key Performance Indicators to Display</h1>
      )}
    </>
  );
};

export default ProjectDetailsKpiStep;
