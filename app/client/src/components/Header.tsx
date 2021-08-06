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

import { useHistory, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Box, Divider, Drawer, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import typography from '../typography';
import GovLogo from './common/GovLogo';
import Button from './common/buttons/Button';
import MenuOption from './common/buttons/MenuOption';
import { StoreState, User } from '../types';
import { logout } from '../actions';
import theme from '../theme';

const StyledHeader = styled.header`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.contrast};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${theme.zIndices[5]};
`;

const StyledBanner = styled.div`
  align-items: center;
  color: ${theme.colors.contrast};
  display: flex;
  flex-direction: row;
  height: ${theme.navBar.desktopFixedHeight};
  width: 100%;
  padding-right: ${theme.spacingIncrements[0]};
  border-bottom: 2px solid ${theme.colors.bcorange};
`;

const StyledTypography = styled.h2`
  ${typography.toString()}
  color: ${theme.colors.contrast};
  text-decoration: none;
  font-weight: 500;
  font-size: ${[3, 4, 4]};
  min-width: 150px;
  padding-left: ${[3, 0, 0]};
  display: contents;
`;

interface HeaderProps {
  user: User;
  logout: any;
}

/**
 * Global Sticky Header
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const Header: React.FC<HeaderProps> = props => {
  const history = useHistory();
  const { email, firstName, lastName } = props.user;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const headerMenuOptions = [
    {
      label: 'Notifications',
      icon: 'NotificationsIcon',
      action: () => alert('TODO: Implement Notifications'),
      key: 0,
    },
    {
      label: 'Account',
      icon: 'AccountCircleIcon',
      action: () => alert('TODO: Implement Account Options'),
      key: 1,
    },
    {
      label: 'Settings',
      icon: 'SettingsIcon',
      action: () => alert('TODO: Implement Settings'),
      key: 2,
    },
    {
      label: 'Notice Board',
      icon: 'EventNoteIcon',
      action: () => alert('TODO: Implement DIO Noticeboard'),
      key: 3,
    },
    { label: 'About', icon: 'InfoIcon', action: () => history.push('/about'), key: 4 },
  ];

  const redirectLogin = () => {
    if (email) {
      props.logout(props.user);
      history.push('/');
    } else {
      history.push('/login');
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <StyledHeader>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <StyledBanner>
            {email ? (
              <IconButton onClick={handleMenuToggle}>
                <MenuIcon
                  fontSize="large"
                  style={{ color: menuOpen ? theme.colors.bcorange : theme.colors.contrast }}
                />
              </IconButton>
            ) : (
              <></>
            )}
            <Link
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              to="/"
            >
              <Box pl={email ? 0 : theme.navBar.desktopSpaceForIcon}>
                <GovLogo />
              </Box>
              <StyledTypography>Reporting and Dashboard Service Improvement</StyledTypography>
            </Link>
            <Box mx="auto" />
            <Button onClick={redirectLogin}>{email ? 'Logout' : 'Login'}</Button>
          </StyledBanner>
        </Box>
      </StyledHeader>
      {email ? (
        <Box>
          <Drawer variant="persistent" anchor="left" open={menuOpen}>
            <Box height={theme.navBar.desktopFixedHeight} />
            <Box p={2} style={{ backgroundColor: '#D5D5D5', textAlign: 'center' }}>
              <Typography variant="subtitle1">
                Welcome, {firstName} {lastName}
              </Typography>
            </Box>
            <Divider />
            {headerMenuOptions.map(option => (
              <MenuOption
                key={option.key}
                event={option.action}
                text={option.label}
                icon={option.icon}
              />
            ))}
          </Drawer>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

const mapState = ({ user }: StoreState): { user: User } => {
  return { user };
};

export default connect(mapState, { logout })(Header);
