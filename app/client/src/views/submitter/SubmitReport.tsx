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
  Typography,
  Stepper,
  Step,
  StepButton,
  FormControlLabel,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useParams } from 'react-router-dom';

import ProjectIDCard from '../../components/projects/ProjectIDCard';
import ProjectProgressCard from '../../components/projects/ProjectProgressCard';
import ProjectContactCard from '../../components/projects/ProjectContactCard';
import { SubmitReportSteps } from '../../constants';
import { Project, Report, ReportStatus } from '../../types';
import useApi from '../../utils/api';
import ReportStatusStep from '../../components/reports/ReportStatusStep';
import ReportFinancialStep from '../../components/reports/ReportFinancialStep';
import ReportObjectiveStep from '../../components/reports/ReportObjectiveStep';
import ReportMilestoneStep from '../../components/reports/ReportMilestoneStep';
import ReportKpiStep from '../../components/reports/ReportKpiStep';

const SubmitReport: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [projectInfoConfirmed, setProjectInfoConfirmed] = React.useState(false);
  const steps = SubmitReportSteps;
  const [project, setProject] = useState<Project>({} as Project);
  const [report, setReport] = useState<Report>({} as Report);
  const { projectId } = useParams<{ projectId: string }>();
  const [valid, setValid] = React.useState<boolean[]>(steps.map(() => false));

  const api = useApi();

  useEffect(() => {
    api
      .getProjectDetail(projectId)
      .then((data) => {
        setProject(data);
        return api.getLastReport(data.id);
      })
      .then((data) => setReport(data[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renders project info for form confirmation
  const renderStep0 = () => {
    return (
      <>
        <ProjectProgressCard {...project} />
        <ProjectIDCard {...project} />
        <ProjectContactCard {...project} />

        <FormControlLabel
          control={
            <Checkbox
              checked={projectInfoConfirmed}
              onChange={(_, value) => {
                setProjectInfoConfirmed(value);
                valid[0] = value;
                setValid([...valid]);
              }}
              value={valid[0]}
              name="project-info-confirmed"
              color="primary"
            />
          }
          label="I confirm that project information is current and accurate"
        />
      </>
    );
  };

  const handleStatusChange = (status: ReportStatus, index: number) => {
    report.statuses.splice(index, 1, status);
    setReport(report);
  };

  const handleValidation = (step: number) => {
    return (value: boolean) => {
      valid[step] = value;
      setValid([...valid]);
    };
  };

  const handleChange = (key: string) => {
    return (data: any) => {
      Object.assign(report, { [key]: data });
      setReport(report);
    };
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
          />
        );
      case 3:
        return <ReportObjectiveStep objectives={report.objectives} />;
      case 4:
        return <ReportMilestoneStep milestones={report.milestones} />;
      case 5:
        return <ReportKpiStep kpis={report.kpis} />;
      default:
        return 'unknown step';
    }
  };

  const handleSubmit = () => {};

  const isNextValid = (): boolean => {
    return valid[0] || (activeStep === 0 && projectInfoConfirmed);
  };

  const handleNext = () => {
    if (activeStep >= steps.length - 1) {
      const index = valid.findIndex((v) => !v);
      if (index >= 0) {
        alert(`step ${activeStep} is not valid`);
        return;
      }
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

  return (
    <Container maxWidth="lg">
      {/* using a nonLinear stepper allows the user to click on the stepper labels and navigate to that section of the form */}
      {/* TODO: (samara) figure out how to stop user from using stepper buttons to go to other sections when projectInfoConfirmed is false */}
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                completed={valid[index]}
                disabled={!valid[0]}
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
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Container>
      </div>
    </Container>
  );
};

export default SubmitReport;
