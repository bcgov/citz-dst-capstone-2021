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

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Step,
  StepButton,
  Stepper,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory, useParams } from 'react-router-dom';

import ProjectIDCard from '../../components/projects/ProjectIDCard';
import ProjectProgressCard from '../../components/projects/ProjectProgressCard';
import ProjectContactCard from '../../components/projects/ProjectContactCard';
import { SubmitReportSteps } from '../../constants';
import { Kpi, Milestone, Objective, Project, Report, ReportState, ReportStatus } from '../../types';
import useApi from '../../utils/api';
import ReportStatusStep from '../../components/reports/ReportStatusStep';
import ReportFinancialStep from '../../components/reports/ReportFinancialStep';
import ReportObjectiveStep from '../../components/reports/ReportObjectiveStep';
import ReportMilestoneStep from '../../components/reports/ReportMilestoneStep';
import ReportKpiStep from '../../components/reports/ReportKpiStep';
import utils from '../../utils';

const SubmitReport: React.FC = () => {
  const history = useHistory();
  const api = useApi();

  const [activeStep, setActiveStep] = React.useState(0);
  const [projectInfoConfirmed, setProjectInfoConfirmed] = React.useState(false);
  const steps = SubmitReportSteps;
  const [project, setProject] = useState<Project>({} as Project);
  const [report, setReport] = useState<Report>({} as Report);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    api
      .getProjectDetail(projectId)
      .then(data => {
        setProject(data);
        return api.getLastReport(data.id);
      })
      .then(data => setReport(data[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = (data: ReportStatus, index: number) => {
    report.statuses.splice(index, 1, data);
    setReport(report);
  };
  const handleObjectiveChange = (data: Objective, index: number) => {
    report.objectives.splice(index, 1, data);
    setReport(report);
  };
  const handleMilestoneChange = (data: Milestone, index: number) => {
    report.milestones.splice(index, 1, data);
    setReport(report);
  };
  const handleKpiChange = (data: Kpi, index: number) => {
    report.kpis.splice(index, 1, data);
    setReport(report);
  };

  // TODO: (nick) how to use array instead of followings?
  // each step interferes with each other during simultaneous updates
  const [valid0, setValid0] = React.useState(false);
  const [valid1, setValid1] = React.useState(false);
  const [valid2, setValid2] = React.useState(false);
  const [valid3, setValid3] = React.useState(false);
  const [valid4, setValid4] = React.useState(false);
  const [valid5, setValid5] = React.useState(false);
  const handleValidation = (step: number) => {
    return (value: boolean) => {
      switch (step) {
        case 0:
          return setValid0(value);
        case 1:
          return setValid1(value);
        case 2:
          return setValid2(value);
        case 3:
          return setValid3(value);
        case 4:
          return setValid4(value);
        case 5:
          return setValid5(value);
        default:
          return null;
      }
    };
  };

  const handleChange = (key: string) => {
    return (data: any) => {
      Object.assign(report, { [key]: data });
      setReport(report);
    };
  };

  // Renders project info for form confirmation
  const renderStep0 = () => {
    return (
      <>
        <Box my={2}>
          <ProjectProgressCard {...project} />
        </Box>
        <Box my={2}>
          <ProjectIDCard project={project} />
        </Box>
        <Box my={2}>
          <ProjectContactCard project={project} />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={projectInfoConfirmed}
              onChange={(_, value) => {
                setProjectInfoConfirmed(value);
                handleValidation(0)(value);
              }}
              value={valid0}
              name="project-info-confirmed"
              color="primary"
            />
          }
          label="I confirm that project information is current and accurate"
        />
      </>
    );
  };

  // used in stepper to determine which section of the form to render based on step number passed in
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderStep0();
      case 1:
        return (
          <ReportStatusStep
            statuses={report?.statuses || []}
            onValidation={handleValidation(step)}
            onChange={handleStatusChange}
          />
        );
      case 2:
        return (
          <ReportFinancialStep
            finance={report.finance}
            onChange={handleChange('finance')}
            onValidation={handleValidation(step)}
          />
        );
      case 3:
        return (
          <ReportObjectiveStep
            objectives={report.objectives}
            onChange={handleObjectiveChange}
            onValidation={handleValidation(step)}
          />
        );
      case 4:
        return (
          <ReportMilestoneStep
            milestones={report.milestones}
            onChange={handleMilestoneChange}
            onValidation={handleValidation(step)}
          />
        );
      case 5:
        return (
          <ReportKpiStep
            kpis={report.kpis}
            onChange={handleKpiChange}
            onValidation={handleValidation(step)}
          />
        );
      default:
        return 'unknown step';
    }
  };

  const handleSubmit = () => {
    api.updateReport({ ...report, state: ReportState.Review }).then(() => {
      history.push(`/view-report/${report.id}`);
    });
  };

  const isNextValid = (): boolean => {
    if (activeStep === steps.length - 1) {
      return valid0 && valid1 && valid2 && valid3 && valid4 && valid5;
    }
    return valid0;
  };

  const handleNext = () => {
    if (activeStep >= steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStep = (step: number) => () => {
    if (projectInfoConfirmed) {
      setActiveStep(step);
    } else {
      setActiveStep(0);
    }
  };

  const stepCompleted = (step: number) => {
    switch (step) {
      case 0:
        return valid0;
      case 1:
        return valid1;
      case 2:
        return valid2;
      case 3:
        return valid3;
      case 4:
        return valid4;
      case 5:
        return valid5;
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="lg">
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                completed={stepCompleted(index)}
                disabled={!valid0}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      <div>
        <div>
          {/* TODO: Better handling of step content passed into component */}
          {getStepContent(activeStep)}
        </div>
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            fontWeight={800}
            my={3}
          >
            <Button
              color="primary"
              variant="contained"
              type="button"
              disabled={activeStep <= 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={!isNextValid()}
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
          </Box>
        </Container>
      </div>
    </Container>
  );
};

export default SubmitReport;
