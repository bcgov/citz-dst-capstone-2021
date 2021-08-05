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

import React from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { connect } from 'react-redux';
import { Report, ReportState, StoreState, User } from '../../types';
import theme from '../../theme';
import useApi from '../../utils/api';
import emitter from '../../events/Emitter';
import EventType from '../../events/Events';

const StyledIconButton = styled(IconButton)`
  color: white !important;
  background-color: ${theme.colors.primary} !important;
`;

const StyledIconButtonWrapper = styled(Box)`
  position: fixed;
  right: ${theme.spacingIncrements[0]};
`;

type Props = {
  report: Report;
  user: User;
};

const ReviewerPanel: React.FC<Props> = props => {
  const { report, user } = props;
  const { state: preState, financialNotes: preNotes } = report;

  const [panelOpen, setPanelOpen] = React.useState(false);
  const [state, setState] = React.useState(preState);
  const [notes, setNotes] = React.useState(preNotes);

  const hasChanged = (): boolean => {
    return state !== report.state || notes !== (preNotes || '');
  };

  const api = useApi();
  const submitReview = () => {
    const update = {
      id: report.id,
      state,
      financialNotes: notes,
      financialAnalyst: user.id,
    };
    api.updateReport(update).then(data => {
      emitter.emit(EventType.Report.Reload, data);
    });
  };

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <>
      {/* TODO: (Samara) improve drawer button so that it appears as a tab that the user pulls out instead of the drawer opening over the comment icon button */}
      <StyledIconButtonWrapper>
        <StyledIconButton color="primary" aria-label="reviewer panel" onClick={togglePanel}>
          <CommentIcon />
        </StyledIconButton>
      </StyledIconButtonWrapper>
      <Drawer variant="persistent" anchor="right" open={panelOpen}>
        <Box height={theme.navBar.desktopFixedHeight} />
        <Box width="100%" alignItems="left">
          <IconButton color="inherit" aria-label="reviewer panel" onClick={togglePanel}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Box width="100%" textAlign="center">
          <Typography variant="subtitle1">Review Quarterly Report</Typography>
        </Box>
        <FormControl margin="normal" fullWidth>
          <Box width={theme.reviewerPanel.width} m={3}>
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
              <Box width="45%" justifyContent="center">
                <FormControl margin="normal" fullWidth>
                  <InputLabel>Set Status</InputLabel>
                  <Select
                    labelId="reportState"
                    id="reportState"
                    name="reportState"
                    value={state < ReportState.Submitted ? ReportState.Submitted : state}
                    onChange={e => setState(e.target.value as ReportState)}
                  >
                    {Object.entries(ReportState)
                      .filter(
                        ([key, value]) =>
                          typeof value === 'string' && +key >= ReportState.Submitted,
                      )
                      .map(([key, value]) => (
                        <MenuItem value={+key} key={key}>
                          {value}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box mt={2} width="50%" justifyContent="center">
                <Button
                  color="primary"
                  variant="contained"
                  type="button"
                  onClick={submitReview}
                  disabled={!hasChanged()}
                >
                  Submit Review
                </Button>
              </Box>
            </Box>
            <TextField
              label="QR Notes"
              variant="outlined"
              multiline
              fullWidth
              rows={6}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </Box>
        </FormControl>
        {/* TODO: (Samara) Display issues below QR notes if implementing issue tracking system for reviewer */}
      </Drawer>
    </>
  );
};

const mapState = ({ user }: StoreState) => {
  return { user };
};

export default connect(mapState)(ReviewerPanel);
