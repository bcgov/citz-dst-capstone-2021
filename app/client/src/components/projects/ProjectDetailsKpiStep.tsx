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
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { Kpi, Report } from '../../types';
import KPIItem from './KPIItem';
import NewKPIForm from './NewKPIForm';
import emitter from '../../events/Emitter';
import EventType from '../../events/Events';
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
  kpis: Kpi[];
};

/**
 * Project KPI step is the second step of project details.
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ProjectDetailsKpiStep = (props: Props) => {
  const { kpis, reportId } = props;

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

  const createOrUpdateKpi = (kpi: Kpi): Promise<Report | null> => {
    if (kpi) {
      if (cacheIndex < 0) {
        // new kpi
        return api.createKpi(reportId, kpi);
      }
      // update kpi
      return api.updateKpi(reportId, kpis[cacheIndex]?.id, kpi);
    }
    return Promise.resolve(null);
  };

  const handleUpdate = (kpi: Kpi) => {
    return createOrUpdateKpi(kpi)
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

  const openNewKpiDialog = () => {
    setModalVisible(true);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mr={4}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          onClick={openNewKpiDialog}
        >
          New KPI
        </Button>
      </Box>
      {kpis && kpis.length > 0 ? (
        <>
          {kpis.map((kpi, index) => (
            <Box m={4} key={kpi.id}>
              <KPIItem kpi={kpi} editItem={editItem(index)} />
            </Box>
          ))}
        </>
      ) : (
        <Box pt={10} textAlign="center">
          <h1>No Key Performance Indicators to Display</h1>
        </Box>
      )}
      <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
        <NewKPIForm closeModal={handleUpdate} kpi={kpis[cacheIndex]} />
      </Modal>
    </>
  );
};

export default ProjectDetailsKpiStep;
