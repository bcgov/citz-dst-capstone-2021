import styled from "@emotion/styled";
import React from "react";
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import theme from '../theme';


// this is to set min width in windows resizing
const StyledDiv = styled.div`
  min-width: 320px;
`;

const StyledMain = styled.main`
  margin-bottom: ${theme.spacingIncrements[1]};
  margin-top: ${theme.navBar.desktopFixedHeight};
  padding-top: ${theme.spacingIncrements[0]};
  margin-left: ${theme.spacingIncrements[1]};
  margin-right: ${theme.spacingIncrements[1]};
  @media (max-width: ${theme.breakpoints[1]}) {
    margin-left: ${theme.spacingIncrements[0]};
    margin-right: ${theme.spacingIncrements[0]};
  }
`;

export const Layout: React.FC = (props) => {
  const { children } = props;

  return (
    <StyledDiv>
      <Header />
      <StyledMain>
        {children}
        <h3>
          <Link to='/'>Home</Link>
        </h3>
      </StyledMain>
      <Footer />
    </StyledDiv>
  );
};
