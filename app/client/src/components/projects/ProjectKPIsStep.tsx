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
import {
  Container,
  FormControl,
  Typography,
  Button,
  Box,
  Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Kpi } from '../../types';
import KPIItem from './KPIItem';
import NewKPIForm from './NewKPIForm';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface ProjectKPIsStepProps {
  onChange: (kpis: Kpi[]) => void;
  data: Kpi[];
}

const ProjectKPIsStep: React.FC<ProjectKPIsStepProps> = (props) => {
  const { onChange, data: existingKpis } = props;

  const classes = useStyles();

  const [modalVisible, setModalVisible] = React.useState(false);

  const [kpis, setKpis] = React.useState<Kpi[]>(existingKpis || []);

  const [cacheIndex, setCacheIndex] = React.useState(-1);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModal = (data: Kpi) => {
    setModalVisible(false);
    setCacheIndex(-1);

    if (!data) return;
    const list: Kpi[] = [];
    if (cacheIndex >= 0) {
      // update
      kpis.splice(cacheIndex, 1, data);
      list.push(...kpis);
    } else {
      list.push(...kpis, data);
    }
    setKpis(list);
    onChange(list);
  };

  const deleteItem = (index: number) => {
    return () => {
      if (index >= 0) {
        kpis.splice(index, 1);
        setKpis([...kpis]);
      }
    };
  };

  const editItem = (index: number) => {
    return () => {
      if (index >= 0) {
        setCacheIndex(index);
        setModalVisible(true);
      }
    };
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" width="100%" justifyContent="center" mt={3}>
        <Box minWidth="600px">
          <Typography variant="h5" align="center">
            Key Performance Indicators
          </Typography>
          <Box mt={3}>
            {kpis.map((kpi, index) => (
              <KPIItem
                deleteItem={deleteItem(index)}
                editItem={editItem(index)}
                kpi={kpi}
                key={kpi.name}
              />
            ))}
          </Box>
          <FormControl margin="normal" fullWidth>
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={showModal}
            >
              Add New KPI
            </Button>
          </FormControl>
        </Box>
      </Box>
      <Modal disableEnforceFocus open={modalVisible} className={classes.modal}>
        <NewKPIForm kpi={kpis[cacheIndex]} closeModal={handleModal} />
      </Modal>
    </Container>
  );
};

export default ProjectKPIsStep;
