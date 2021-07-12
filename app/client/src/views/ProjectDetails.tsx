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
  Paper
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router-dom';
import ProjectIDCard from '../components/projects/ProjectIDCard';
import ProjectProgressCard from '../components/projects/ProjectProgressCard';
import ProjectContactCard from '../components/projects/ProjectContactCard';
import KPICard from '../components/projects/KPICard';
import useApi from '../utils/api';
import { Project } from '../types';

/* TODO: move to constants file */
const projectDetailTabs = ['Project Information', 'Key Performance Indicators', 'Key Milestones', 'Business Case Objectives', 'Quarterly Status Reports'];

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
  const { cps } = useParams<{ cps: string }>();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{[k: string]: never}>, newValue: number) => {
    setValue(newValue);
  }

  const api = useApi();

  useEffect(() => {
    api.getProjectDetail(cps).then((data) => {
      setProject(data);
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
      <h1>TODO: KPI Tab Content</h1>
    );
  };

  const renderMilestones = () => {
    return (
      <h1>TODO: Milestone Tab Content</h1>
    );
  };

  const renderObjectives = () => {
    return (
      <h1>TODO: Objective Tab Content</h1>
    );
  };

  const renderQRList = () => {
    return (
      <h1>TODO: Quarterly Report List Tab Content</h1>
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
