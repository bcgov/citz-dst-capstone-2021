// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';
import { Kpi } from '../../types';
import KPIItem from './KPIItem';

type Props = {
  kpis: Kpi[];
};
const ProjectDetailsKpiStep = (props: Props) => {
  const { kpis } = props;
  return (
    <>
      {kpis && kpis.length > 0 ? (
        kpis.map(kpi => (
          <Box m={4}>
            <KPIItem kpi={kpi} key={kpi.id} />
          </Box>
        ))
      ) : (
        <h1>No Key Performance Indicators to Display</h1>
      )}
    </>
  );
};

export default ProjectDetailsKpiStep;
