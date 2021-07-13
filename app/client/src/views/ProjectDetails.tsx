//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,git
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import React, { useEffect, useState } from 'react';

import {
  Typography,
  Button,
  Box,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProjectIDCard from '../components/projects/ProjectIDCard';
import ProjectProgressCard from '../components/projects/ProjectProgressCard';
import ProjectContactCard from '../components/projects/ProjectContactCard';
import KPICard from '../components/projects/KPICard';
import MilestoneItem from '../components/projects/MilestoneItem';
import KPIItem from '../components/projects/KPIItem';
import ObjectiveItem from '../components/projects/ObjectiveItem';
import useApi from '../utils/api';
import theme from '../theme';
import { Project, Report, Milestone, Kpi, Objective } from '../types';

/* TODO: move to constants file */
const projectDetailTabs = ['Project Information', 'Key Performance Indicators', 'Key Milestones', 'Business Case Objectives', 'Quarterly Status Reports'];

const StyledTableHead = styled(TableHead)`
  background-color: ${theme.colors.grey};
`;

const StyledTableHeadCell = styled(TableCell)`
  font-weight: bold;
  padding: 4px !important;
`;

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
  )
}

const allyProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const ProjectDetails: React.FC = () => {
  const [project, setProject] = useState({} as Project);
  const [reports, setReports] = useState([] as Report[]);
  const [milestones, setMilestones] = useState([] as Milestone[]);
  const [kpis, setKpis] = useState([] as Kpi[]);
  const [objectives, setObjectives] = useState([] as Objective[]);
  const { cps } = useParams<{ cps: string }>();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{[k: string]: never}>, newValue: number) => {
    setValue(newValue);
  }

  const api = useApi();

  useEffect(() => {
    api.getProjectDetail(cps).then((data) => {
      setProject(data);
      
      api.getReports(data.id).then((reportData) => {
        setReports(reportData);

        // TODO: (samara) implement a better way to determine the most recent report submitted
        if (reportData[reportData.length - 1]) {
          setMilestones(reportData[reportData.length - 1].milestones);
          setKpis(reportData[reportData.length - 1].kpis);
          setObjectives(reportData[reportData.length - 1].objectives);
        } else {
          setMilestones([] as Milestone[]);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProjectInfo = () => {
    return (
      <>
        <ProjectProgressCard {...project} />
        <ProjectIDCard {...project} />
        <ProjectContactCard {...project} />
      </>
    );
  };

  const renderKPIs = () => {
    return (
      <Container maxWidth="sm">
        { kpis && kpis.length > 0 ?
        kpis.map((kpi) => (
          <KPIItem
            kpi={kpi}
            key={kpi.id}
          />
        ))
        :
        <h1>No Key Performance Indicators to Display</h1>
      }
      </Container>
    );
  };

  const renderMilestones = () => {

    return (
      <>
        { milestones && milestones.length > 0 ? 
          milestones.map((milestone) => (
            <MilestoneItem
              milestone={milestone}
              key={milestone.id}
            />
          ))
          :
          <h1>No Milestones to Display</h1>
        }
      
      </>
    );
  };

  const renderObjectives = () => {
    return (
      <Container maxWidth="md">
        { objectives && objectives.length > 0 ?
          objectives.map((objective) => (
            <ObjectiveItem
              objective={objective}
              key={objective.id}
            />
          ))
          :
          <h1>No Objectives to Display</h1>
        }
      </Container>
    );
  };

  const renderQRList = () => {
    return (
      <>
        <Box bgcolor={theme.colors.primary} color="white" p={1}>
          <Typography variant="h5">Quarterly Status Reports</Typography>
        </Box>
        <Table aria-label="quarterly report list" size="medium">
          <StyledTableHead>
            <StyledTableHeadCell>
              Reporting Period
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              Report Status
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              Reporting Period Start
            </StyledTableHeadCell>
            <StyledTableHeadCell>
              Reporting Period End
            </StyledTableHeadCell>
          </StyledTableHead>
        </Table>
      </>
    )
  }

  const renderTabs = () => {
    return (
      <>
        <Paper>
          <Tabs value={value} onChange={handleChange}>
            {projectDetailTabs.map((tab, index) => (
              <Tab label={tab} {...allyProps(index)} />
            ))}
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          {renderProjectInfo()}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {renderKPIs()}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {renderMilestones()}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {renderObjectives()}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {renderQRList()}
        </TabPanel>
      </>
    );
  };

  const renderContent = () => {
    return project.id ? renderTabs() : <CircularProgress />;
  };

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        m={4}
      >
        <Typography variant="h4">{project.name} - {project.cpsIdentifier}</Typography>
      </Box>
      <Box>
        {renderContent()}
      </Box>
    </Container>
  );
};

export default ProjectDetails;
