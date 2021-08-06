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
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { useHistory, useParams } from 'react-router-dom';
import useApi from '../utils/api';
import { Report, Project, StoreState, User, Role, ReportState } from '../types';
import { reportDetailTabs } from '../constants';
import {
  getReportingPeriodEnd,
  getReportingPeriodStart,
  getFiscalYearString,
} from '../utils/dateUtils';
import KPIItem from '../components/projects/KPIItem';
import ObjectiveItem from '../components/projects/ObjectiveItem';
import MilestoneItem from '../components/projects/MilestoneItem';
import StatusSummaryCard from '../components/reports/StatusSummaryCard';
import CurrentFYFinanceTable from '../components/reports/CurrentFYFinanceTable';
import OverallProjectFinanceTable from '../components/reports/OverallProjectFinanceTable';
import ProjectDetailsInfoStep from '../components/projects/ProjectDetailsInfoStep';
import ReviewerPanel from '../components/reports/ReviewerPanel';
import emitter from '../events/Emitter';
import EventType from '../events/Events';

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface ReportDetailsProps {
  user: User;
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
    id: `report-details-tab-${index}`,
    'aria-controls': `report-details-tabpanel-${index}`,
  };
};

const ReportDetails: React.FC<ReportDetailsProps> = props => {
  const { user } = props;
  const [tabValue, setTabValue] = React.useState(0);
  const [report, setReport] = React.useState({} as Report);
  const [project, setProject] = React.useState({} as Project);
  const { reportId } = useParams<{ reportId: string }>();
  const api = useApi();
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<{ [k: string]: never }>, newValue: number) => {
    setTabValue(newValue);
  };

  const loadReport = () => {
    return api
      .getReport(reportId)
      .then(reportData => {
        setReport(reportData);
        return api.getProject(reportData.projectId);
      })
      .then(projectData => setProject(projectData));
  };

  useEffect(() => {
    if (!report.id) {
      loadReport().then(() => {
        emitter.on(EventType.Report.Reload, loadReport);
      });
    }
    return () => {
      emitter.off(EventType.Report.Reload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusSummaryStep = () => {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Status Summary
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          {report.statuses.map(status => {
            return <StatusSummaryCard status={status} key={status.type} />;
          })}
        </Grid>
        <Box my={3}>
          <Typography variant="h5" gutterBottom>
            Key Performance Indicators
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {report.kpis.map(kpi => {
            return <KPIItem kpi={kpi} useGrid key={kpi.id} />;
          })}
        </Grid>
      </>
    );
  };

  const renderTabs = () => {
    return (
      <>
        {user.role === Role.FA && report.state >= ReportState.Submitted ? (
          <ReviewerPanel report={report} />
        ) : (
          <></>
        )}
        {/* <ReviewerPanel report={report} /> */}
        <Paper>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            {reportDetailTabs.map((tab, index) => (
              <Tab label={tab} {...a11yProps(index)} key={tab} />
            ))}
          </Tabs>
        </Paper>
        <TabPanel value={tabValue} index={0}>
          <ProjectDetailsInfoStep project={project} report={report} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {getStatusSummaryStep()}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Box mb={4}>
            <CurrentFYFinanceTable report={report} />
          </Box>
          <Box mb={4}>
            <OverallProjectFinanceTable report={report} />
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          {report.objectives.map(objective => (
            <Box mb={4} key={objective.id}>
              <ObjectiveItem objective={objective} />
            </Box>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          {report.milestones.map(milestone => (
            <Box mb={4} key={milestone.id}>
              <MilestoneItem milestone={milestone} />
            </Box>
          ))}
        </TabPanel>
      </>
    );
  };

  const renderContent = () => {
    return report?.id && project?.id ? renderTabs() : <CircularProgress />;
  };

  const submit = () => {
    // TODO: (Nick) restrict submission period
    if (user) {
      const update = {
        id: report.id,
        state: ReportState.Submitted,
        submitter: user.id,
      };
      api.submitReport(update).then(setReport);
    } else {
      history.push('/login');
    }
  };

  const handleEdit = () => {
    history.push(`/edit-report/${report.projectId}`);
  };

  const getSubmissionInfo = () => {
    const { firstName, lastName } = report.submitter as User;
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="subtitle2">Submitted by </Typography>
        <Box px={1}>
          <Typography variant="subtitle1">
            {firstName} {lastName}
          </Typography>
        </Box>
        <Typography variant="subtitle2">
          at {report.submittedAt ? new Date(report.submittedAt).toLocaleDateString('en-CA') : ''}
        </Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            alert('TODO: implement CSV export');
          }}
        >
          <GetAppIcon /> Download CSV
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        m={4}
        pr={4}
      >
        <Box>
          <Typography variant="h5">
            {report.quarter} FY {getFiscalYearString(report.year, report.quarter)} Status Report -{' '}
            {project.name}
          </Typography>
          <Typography variant="subtitle2">
            Reporting Period From{' '}
            {getReportingPeriodStart(report.year, report.quarter).toLocaleDateString('en-CA')} to{' '}
            {getReportingPeriodEnd(report.year, report.quarter).toLocaleDateString('en-CA')}
          </Typography>
        </Box>
        {report.state >= ReportState.Submitted ? (
          getSubmissionInfo()
        ) : (
          <Box display="flex" justifyContent="end">
            <Box mr={2}>
              <Button variant="outlined" color="primary" onClick={handleEdit}>
                <EditOutlinedIcon fontSize="small" style={{ marginRight: '8px' }} />
                Edit
              </Button>
            </Box>
            {report.state === ReportState.ReadyToSubmit ? (
              <Button variant="contained" color="primary" onClick={submit}>
                <PublishIcon fontSize="small" style={{ marginRight: '8px' }} /> Submit
              </Button>
            ) : (
              ''
            )}
          </Box>
        )}
      </Box>
      <Box>{renderContent()}</Box>
    </Container>
  );
};

const mapState = ({ user }: StoreState): { user: User } => {
  return { user };
};

export default connect(mapState)(ReportDetails);
