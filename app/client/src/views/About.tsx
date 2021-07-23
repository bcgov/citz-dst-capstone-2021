//
// Copyright © 2021 Province of British Columbia
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
import { Typography, Box, Grid, Container, Card } from "@material-ui/core";
import theme from '../theme';
import samaraBioImage from '../assets\\images/about/samara_bio_portrait.jpg';
import nickBioImage from '../assets\\images/about/nick_bio_portrait.jpg';

interface BioObject {
  name: string;
  content: string;
  email: string;
  image: any;
  altText: string;
}

const StyledSectionHeading = styled(Box)`
  background-color: ${theme.colors.primary};
  color: white;
  width: 100%;
  display: block;
  border-radius: 4px 4px 0 0;
  padding: 8px 8px 8px 20px;
`;

const content = {

  samaraBio: { name: "Samara Flueck", image: samaraBioImage, altText: "Portrait of Samara smiling wearing a brown turtle neck sweater on a cream background", email: "samflueck95@gmail.com", content: `Samara grew up with a strong interest in technology and art, so she initially decided
  to study 3D modeling and animation. After graduation she worked as a 3D artist
  where she discovered a deeper interest in technology. She soon returned to school
  to build the technical knowledge and skills she felt she needed. Since then, Samara
  has found a love for programming and hopes to combine her technical and creative
  skills to design solutions for new and exciting problems.
  `},
  
  nickBio: { name: "Sunghwan Park", image: nickBioImage, altText: "Portrait of Sunghwan smiling outside with dense foliage in the background", email: "shwpark612@gmail.com", content: `Sunghwan has diverse experience in the field of IT. He has developed a high
  availability solution and managed the development of products related to disaster
  recovery automation. Through years of supporting customers, he believes that
  solving their needs is key to the success of software products. This project gave
  him a great chance to learn and experience what the BC Government does to
  improve citizens’ digital life with advanced technology and sophisticated
  methodologies.
  
  `},
};

const About: React.FC = () => {

  const bioComponent = (bio: BioObject) => {
    return (
      <Grid item xs={12} container spacing={1}>
        <Grid item>
          <Typography variant="h6">
            {bio.name}
          </Typography>
        </Grid>
        <Grid container direction="row" item spacing={2}>
          <Grid item>
            <img src={bio.image} alt={bio.altText} width="152" />
          </Grid>
          <Grid item sm={12} md={8}>
            <Typography variant="body1">
              {bio.content}
            </Typography>
            <Typography variant="subtitle2">
              <strong>Contact: </strong>{bio.email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  const sectionHeading = (text: string) => {
    return (
      <StyledSectionHeading>
        <Typography variant="h3">
          {text}
        </Typography>
      </StyledSectionHeading>
    );
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Card>
            {sectionHeading('Team RDSI')}
            <Box m={4}>
              {bioComponent(content.samaraBio)}
              {bioComponent(content.nickBio)}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default About;
