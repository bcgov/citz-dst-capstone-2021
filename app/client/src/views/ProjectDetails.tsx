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
import { projectDetailTabs } from '../constants'
import ProjectIDCard from '../components/projects/ProjectIDCard';
import ProjectProgressCard from '../components/projects/ProjectProgressCard';
import ProjectContactCard from '../components/projects/ProjectContactCard';
import KPICard from '../components/projects/KPICard';
import MilestoneItem from '../components/projects/MilestoneItem';
import KPIItem from '../components/projects/KPIItem';
import ObjectiveItem from '../components/projects/ObjectiveItem';
import QuarterlyReportList from '../components/reports/QuarterlyReportList';
import useApi from '../utils/api';
import theme from '../theme';
import { Project, Report, Milestone, Kpi, Objective } from '../types';
import ProjectDetailsInfoStep from "../components/projects/ProjectDetailsInfoStep";

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
      
      api.getReports(data.id).then((reportsData) => {
        setReports(reportsData);
      });

      api.getLastReport(data.id).then((reportData) => {
        if (reportData) {
          setMilestones(reportData[0].milestones);
          setKpis(reportData[0].kpis);
          setObjectives(reportData[0].objectives);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderKPIs = () => {
    return (
      <Container maxWidth="md">
        { kpis && kpis.length > 0 ?
        kpis.map((kpi) => (
          <Box m={4}>
            <KPIItem
              kpi={kpi}
              key={kpi.id}
            />
          </Box>
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
            <Box m={4}>
              <MilestoneItem
                milestone={milestone}
                key={milestone.id}
              />
            </Box>
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
            <Box m={4}>
              <ObjectiveItem
                objective={objective}
                key={objective.id}
              />
            </Box>
          ))
          :
          <h1>No Objectives to Display</h1>
        }
      </Container>
    );
  };

  const renderTabs = () => {
    return (
      <>
        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            {projectDetailTabs.map((tab, index) => (
              <Tab label={tab} {...allyProps(index)} />
            ))}
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <ProjectDetailsInfoStep project={project}/>
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
          <QuarterlyReportList reports={reports} />
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
