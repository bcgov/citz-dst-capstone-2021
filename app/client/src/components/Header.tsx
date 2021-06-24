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

import { Box, Flex, Text } from 'rebass';
import React from 'react';
import theme from '../theme';
import typography from '../typography';
import GovLogo from './common/GovLogo';
import Button from './common/buttons/Button';
import { StoreState, User } from '../types';
import { logout } from '../actions';

const StyledHeader = styled.header`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.contrast};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${theme.zIndices[1]};
`;

const StyledBanner = styled.div`
  align-items: center;
  color: ${theme.colors.contrast};
  display: flex;
  flex-direction: row;
  height: ${theme.navBar.desktopFixedHeight};
  padding-left: ${theme.spacingIncrements[0]};
  padding-right: ${theme.spacingIncrements[0]};
  border-bottom: 2px solid ${theme.colors.bcorange};
`;

const StyledText = styled(Text)`
  ${typography.toString()}
  text-decoration: none;
  font-weight: bold;
  min-width: 150px;
`;

interface HeaderProps {
  user: User;
  logout: any;
}

const Header: React.FC<HeaderProps> = (props) => {
  const history = useHistory();
  const { email } = props.user;

  const redirectLogin = () => {
    if (email) {
      props.logout(props.user);
      history.push('/');
    } else {
      history.push('/login');
    }
  };

  return (
    <StyledHeader>
      <Flex alignItems="center" sx={{ paddingRight: 3 }}>
        <StyledBanner>
          <Link
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
            to="/"
          >
            <GovLogo />
            <StyledText
              as="h2"
              color={theme.colors.contrast}
              fontSize={[3, 4, 4]}
              fontWeight={500}
              pl={[3, 0, 0]}
            >
              Reporting and Dashboard Service Improvement
            </StyledText>
          </Link>
        </StyledBanner>
        <Box mx="auto" />
        <Button onClick={redirectLogin}>{email ? 'Logout' : 'Login'}</Button>
      </Flex>
    </StyledHeader>
  );
};

const mapState = ({ user }: StoreState): { user: User } => {
  return { user };
};

export default connect(mapState, { logout })(Header);
