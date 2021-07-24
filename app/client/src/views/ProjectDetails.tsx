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
import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  Button,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import { projectDetailTabs } from '../constants';
import QuarterlyReportList from '../components/reports/QuarterlyReportList';
import useApi from '../utils/api';
import { Project, Report } from '../types';
import ProjectDetailsInfoStep from '../components/projects/ProjectDetailsInfoStep';
import ProjectDetailsKpiStep from '../components/projects/ProjectDetailsKpiStep';
import ProjectDetailsMilestoneStep from '../components/projects/ProjectDetailsMilestoneStep';
import ProjectDetailsObjectiveStep from '../components/projects/ProjectDetailsObjectiveStep';
import emitter from '../events/Emitter';
import EventType from '../events/Events';
import ConfirmDialog from '../components/common/ConfirmDialog';

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

const a11yProps = (index: any) => {
  return {
    id: `project-details-tab-${index}`,
    'aria-controls': `project-details-tabpanel-${index}`,
  };
};

const ProjectDetails: React.FC = () => {
  const api = useApi();
  const history = useHistory();

  const [project, setProject] = useState({} as Project);
  const [reports, setReports] = useState([] as Report[]);
  const [lastReport, setLastReport] = useState({} as Report);
  const { cps } = useParams<{ cps: string }>();

  const [step, setStep] = React.useState(0);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = React.useState(false);

  const handleChange = (event: any, nextStep: number) => {
    setStep(nextStep);
  };

  const loadProject = (): Promise<void> => {
    return api.getProjectDetail(cps).then(data => {
      return setProject(data);
    }).catch(console.log);
  };

  // data is projectId or Report object
  const loadReport = (data: string | Report) => {
    if (data) {
      if (typeof data === 'string') {
        // data is projectId
        api
          .getReports(data)
          .then(reportsData => {
            setReports(reportsData);
          })
          .then(() => {
            return api.getLastReport(project.id).then(reportsData => {
              if (reportsData[0]) {
                setLastReport(reportsData[0]);
              }
            });
          })
          .catch(console.log);
      } else {
        // data should be the last report
        setLastReport(data);
      }
    }
  };

  useEffect(() => {
    loadReport(project.id);
    // eslint-disable-next-line
  }, [project]);

  useEffect(() => {
    loadProject();
    // when each step updates the project or report, it updates
    emitter.on(EventType.Project.Reload, loadProject);
    emitter.on(EventType.Report.Reload, loadReport);
    return () => {
      emitter.off(EventType.Project.Reload);
      emitter.off(EventType.Report.Reload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProject = (answer: boolean) => {
    if (answer) {
      api.deleteProject(project.id).then(() => {
        history.push('/projects');
      });
    }
    setDeleteConfirmVisible(false);
  };

  const renderTabs = () => {
    return (
      <>
        <Paper>
          <Tabs
            value={step}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {projectDetailTabs.map((tab, index) => (
              <Tab label={tab} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Paper>
        <Container maxWidth="lg">
          <TabPanel value={step} index={0}>
            <ProjectDetailsInfoStep project={project} report={lastReport}/>
          </TabPanel>
          <TabPanel value={step} index={1}>
            <ProjectDetailsKpiStep
              kpis={lastReport.kpis || []}
              reportId={lastReport.id as string}
            />
          </TabPanel>
          <TabPanel value={step} index={2}>
            <ProjectDetailsMilestoneStep
              project={project}
              milestones={lastReport.milestones || []}
              reportId={lastReport.id as string}
            />
          </TabPanel>
          <TabPanel value={step} index={3}>
            <ProjectDetailsObjectiveStep
              objectives={lastReport.objectives || []}
              reportId={lastReport.id as string}
            />
          </TabPanel>
          <TabPanel value={step} index={4}>
            <QuarterlyReportList reports={reports} />
          </TabPanel>
        </Container>
      </>
    );
  };

  const render = () => {
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
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteConfirmVisible(true)}
          >
            Delete
          </Button>
        </Box>
        <Box>{renderTabs()}</Box>
        <ConfirmDialog
          title="Delete Project"
          message="Do you want to proceed and delete all data of the project?"
          onClose={deleteProject}
          open={deleteConfirmVisible}
        />
      </Container>
    );
  };
  return project?.id ? render() : <CircularProgress />;
};

export default ProjectDetails;
