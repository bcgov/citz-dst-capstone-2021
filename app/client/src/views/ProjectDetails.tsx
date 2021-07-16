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
import React, { PropsWithChildren, useEffect, useState } from "react";

import { Typography, Box, Container, CircularProgress, Tabs, Tab, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { projectDetailTabs } from '../constants';
import QuarterlyReportList from '../components/reports/QuarterlyReportList';
import useApi from '../utils/api';
import { Project, Report, Milestone, Kpi, Objective } from '../types';
import ProjectDetailsInfoStep from '../components/projects/ProjectDetailsInfoStep';
import ProjectDetailsKpiStep from '../components/projects/ProjectDetailsKpiStep';
import ProjectDetailsMilestoneStep from '../components/projects/ProjectDetailsMilestoneStep';
import ProjectDetailsObjectiveStep from '../components/projects/ProjectDetailsObjectiveStep';
import emitter from "../events/Emitter";
import EventType from "../events/Events";

interface TabPanelProps extends PropsWithChildren<any> {
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const allyProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const ProjectDetails: React.FC = () => {
  const [project, setProject] = useState({} as Project);
  const [reports, setReports] = useState([] as Report[]);
  const [milestones, setMilestones] = useState([] as Milestone[]);
  const [kpis, setKpis] = useState([] as Kpi[]);
  const [objectives, setObjectives] = useState([] as Objective[]);
  const { cps } = useParams<{ cps: string }>();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{ [k: string]: never }>, newValue: number) => {
    setValue(newValue);
  };

  const api = useApi();

  const loadProject = () => {
    api.getProjectDetail(cps).then(data => {
      setProject(data);

      api.getReports(data.id).then(reportsData => {
        setReports(reportsData);
      });

      api.getLastReport(data.id).then(reportData => {
        if (reportData) {
          setMilestones(reportData[0].milestones);
          setKpis(reportData[0].kpis);
          setObjectives(reportData[0].objectives);
        }
      });
    });
  }

  useEffect(() => {
    loadProject();
    emitter.on(EventType.Project.Reload, loadProject);
    return () => {
      emitter.off(EventType.Project.Reload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTabs = () => {
    return (
      <>
        <Paper>
          <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
            {projectDetailTabs.map((tab, index) => (
              <Tab label={tab} {...allyProps(index)} />
            ))}
          </Tabs>
        </Paper>
        <Container maxWidth="lg">
          <TabPanel value={value} index={0}>
            <ProjectDetailsInfoStep project={project} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProjectDetailsKpiStep kpis={kpis} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProjectDetailsMilestoneStep milestones={milestones} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ProjectDetailsObjectiveStep objectives={objectives} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <QuarterlyReportList reports={reports} />
          </TabPanel>
        </Container>
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
        <Typography variant="h4">
          {project.name} - {project.cpsIdentifier}
        </Typography>
      </Box>
      <Box>{renderContent()}</Box>
    </Container>
  );
};

export default ProjectDetails;
