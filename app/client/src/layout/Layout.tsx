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

import styled from '@emotion/styled';
import React from 'react';

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

const Layout: React.FC = (props) => {
  const { children } = props;

  return (
    <StyledDiv>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledDiv>
  );
};

export default Layout;
