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
  Box,
  Container,
  Card,
  Paper,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useParams } from 'react-router-dom';
import useApi from '../utils/api';
import {
  Report,
  Project,
  ReportStatus,
  StatusType,
  Trend,
  Status } from '../types';
import { reportDetailTabs } from '../constants'
import { getReportingPeriodStart, getReportingPeriodEnd } from '../utils/dateUtils';
import ProjectProgressCard from '../components/projects/ProjectProgressCard';
import ProjectIDCard from '../components/projects/ProjectIDCard';
import ProjectContactCard from '../components/projects/ProjectContactCard';

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
};

const allyProps = (index: any) => {
  return {
    id: `report-details-tab-${index}`,
    'aria-controls': `report-details-tabpanel-${index}`
  }
};

const ReportDetails: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [report, setReport] = React.useState({} as Report);
  const [project, setProject] = React.useState({} as Project);
  const { reportId } = useParams<{ reportId: string }>();
  const api = useApi();

  const handleChange = (event: React.ChangeEvent<{[k: string]: never}>, newValue: number) => {
    setTabValue(newValue);
  }

  useEffect(() => {
    if (!report.id) {
      api.getReport(reportId)
        .then((reportData) => {
        setReport(reportData);
        console.log(reportData);
        return api.getProject(reportData.projectId);
      })
        .then(projectData => setProject(projectData));
    }
  });

  const getStatusCard = (status: ReportStatus) => {
    // TODO: Refactor this to constants file
    const statusTypeLabels = {
      [StatusType.Overall]: 'Overall Status',
      [StatusType.Scope]: 'Scope',
      [StatusType.Budget]: 'Budget',
      [StatusType.Schedule]: 'Schedule',
      [StatusType.Other]: 'Other Issues or Risks',
    };
    // status summary trends
    const trendIcons = [
      { icon: <ArrowUpwardIcon />, value: Trend.Up },
      { icon: <ArrowForwardIcon />, value: Trend.Steady },
      { icon: <ArrowDownwardIcon />, value: Trend.Down },
    ];


    return (
      <Card variant="outlined" square>
        <Box display="flex" justifyContent="space-evenly">
          <Box>
            <Typography variant="subtitle1">
              {statusTypeLabels[status.type]}
            </Typography>
            {Status[status.status]}
          </Box>
          <Box>
            <Typography variant="subtitle1">
              Trend
            </Typography>
            {trendIcons[status.trend].icon}
          </Box>
        </Box>
        <Typography variant="subtitle1">
          Comments
        </Typography>
        <Typography variant="body1">
          {status.comments ? status.comments : 'N/A'}
        </Typography>
      </Card>
    );
  }

  const renderTabs = () => {
    return (
      <>
        <Paper>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            {reportDetailTabs.map((tab, index) => (
              <Tab label={tab} {...allyProps(index)} />
            ))}
          </Tabs>
        </Paper>
        <TabPanel value={tabValue} index={0}>
          <Container maxWidth="lg">
            <ProjectProgressCard {...project} />
            <ProjectIDCard project={project} />
            <ProjectContactCard project={project} />
          </Container>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box display="flex" justifyContent="space-between">
            {report.statuses.map((status) => {
              return getStatusCard(status);
            })}
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <h3>TODO: Implement Finances</h3>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <h3>TODO: Implement Objectives</h3>
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <h3>TODO: Implement Milestones</h3>
        </TabPanel>
      </>
    );
  };

  const renderContent = () => {
    return report.id ? renderTabs() : <CircularProgress />;
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
        <Typography variant="h5">Reporting Period From {getReportingPeriodStart(report.year, report.quarter).toLocaleDateString('en-CA')} - {getReportingPeriodEnd(report.year, report.quarter).toLocaleDateString('en-CA')}</Typography>
      </Box>
      <Box>
        {renderContent()}
      </Box>
    </Container>
  );
}

export default ReportDetails;
