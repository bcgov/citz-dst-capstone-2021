import styled from "@emotion/styled";
import {Box, Flex, Text} from "rebass";
import { useHistory } from 'react-router-dom';

import theme from '../theme';
import typography from '../typography';
import GovLogo from './common/GovLogo';
import React from 'react';
import { Link } from "react-router-dom";
import Button from './common/buttons/Button';


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

const Header: React.FC = (props) => {

  const history = useHistory();

  const redirectLogin = () => {
    history.push('/login');
  }

  return (
    <StyledHeader>
      <Flex alignItems='center' sx={{ paddingRight: 3 }}>
        <StyledBanner>
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
            to='/'
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
        <Box mx='auto'/>
        <Button onClick={redirectLogin}>Login</Button>
      </Flex>
    </StyledHeader>
  );
};

export default Header;
