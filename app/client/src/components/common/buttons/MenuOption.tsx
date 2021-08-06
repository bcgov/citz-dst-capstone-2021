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

import React from 'react';
import styled from '@emotion/styled';
import { Box, Divider, Button, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import EventNoteIcon from '@material-ui/icons/EventNote';
import InfoIcon from '@material-ui/icons/Info';

const StyledButton = styled(Button)`
  width: 100%;
  justify-content: space-between !important;
  text-transform: none !important;
`;

interface MenuOptionProps {
  event: () => void;
  text: string;
  icon: string;
}

// getter for icons
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'NotificationsIcon':
      return <NotificationsIcon fontSize="large" />;
    case 'AccountCircleIcon':
      return <AccountCircleIcon fontSize="large" />;
    case 'SettingsIcon':
      return <SettingsIcon fontSize="large" />;
    case 'EventNoteIcon':
      return <EventNoteIcon fontSize="large" />;
    case 'InfoIcon':
      return <InfoIcon fontSize="large" />;
    default:
      return <></>;
  }
};

/**
 * Header menu item
 * @author      [Samara Flueck](samflueck95@gmail.com)
 */
const MenuOption: React.FC<MenuOptionProps> = props => {
  const { event, text, icon } = props;

  return (
    <Box width="300px">
      <StyledButton color="inherit" onClick={event}>
        {getIcon(icon)}
        <Typography variant="subtitle1">{text}</Typography>
        <ArrowForwardIosIcon fontSize="small" />
      </StyledButton>
      <Divider />
    </Box>
  );
};

export default MenuOption;
