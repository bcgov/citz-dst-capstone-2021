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

  introSection: { heading: "Reporting and Dashboard Service Improvement Project", paragraphs: ["The Digital Investment Office (DIO) sponsored this project to design a solution that improves the current quarterly status reporting process through the use of a web application. Team RDSI, comprising of Sunghwan Park and Samara Flueck, designed a solution and developed this web application as a proof-of-concept prototype."]
  },

  problemSection: { heading: "The Business Problem", paragraphs: [
    "The DIO manages funding for capital investment projects that aim to improve digital services for British Columbians and ministries that are awarded funding must report their performance to the DIO quarterly.",
    "Currently, reports are filled out and submitted manually using excel spreadsheets. This method is time consuming and often results in data inconsistencies that can become a barrier to timely and quality data analysis."]
  },

  hypothesisSection: { heading: "Hypothesis", paragraphs: ["Developing a web application to support stakeholders in the quarterly reporting process will assist in improving workflows and data quality.",
  "Utilizing a digital form and validation to capture data from ministry submitters will improve quality of data as it is entered. Manual effort can be reduced through the use of pre-filled fields in forms and automation of existing processes.",
  "Opportunities for automating data aggregation can be acted upon using a database to store reporting data. Furthermore, stored data can then be surfaced into a dashboard system to help ensure decision makers and other stakeholders have access to the information they need when they need it."]
  },

  goalsSection: { heading: "Goals and Objectives", paragraphs: ["The primary goal of the Capstone 2021 project team is to design a modern web application as a tool for the DIO to use to replace spreadsheets as the main project reporting method. Once the application is designed a proof-of-concept prototype can be developed to demonstrate how our solution can assist stakeholders in their reporting processes."],
  list: { heading: "Objectives Include", items: [
    "Apply modern application development methodology based on AGILE principles.",
    "Design a modern web application that is intuitive and easy to use.",
    "Develop an application prototype based on our design.",
    "Store project and reporting information in a central repository such as a database.",
    "Host the solution in the BC Dev Exchange’s container environment.",
    "Document our solution so that it can be handed off to continue development."
  ] }
  },

  solutionSection: { heading: "Our Solution", paragraphs: ["Our web application is designed to be hosted in the BC Dev Exchange’s OpenShift container environment. It consists of a frontend for users to interface with, a MongoDB database to store project and reporting data, and an API to allow the frontend to request data from the database.",
  "We identified five key groups that would interact with our application:",
  "With our key groups identified, we then conducted interviews with stakeholders so that we could identify our personas and improve their journeys in the quarterly status reporting process. Our prototype demonstrates three key user journeys in our design:"],
  list: [[
    "Ministry Submitters",
    "Finance Analysts",
    "Data Analysts",
    "Government Executives",
    "System Administrator"
  ],[
    "A Submitter enters a new project into the system.",
    "A Submitter completes and submits a quarterly status report.",
    "A Finance Analyst reviews a submitted quarterly status report."
  ]]
  },
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
        <Typography variant="h4">
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
            {sectionHeading('Capstone 2021')}
            <Box m={4}>
              <Typography variant="h6">
                {content.introSection.heading}
              </Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">
                {content.introSection.paragraphs[0]}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Card>
            {sectionHeading(content.problemSection.heading)}
            <Box m={4}>
              <Typography variant="body1">
                {content.problemSection.paragraphs[0]}
              </Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">
                {content.problemSection.paragraphs[1]}
              </Typography>
            </Box>

            <Box m={4}>
              <Typography variant="h6">
                {content.hypothesisSection.heading}
              </Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">
                {content.hypothesisSection.paragraphs[0]}
              </Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">
                {content.hypothesisSection.paragraphs[1]}
              </Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">
                {content.hypothesisSection.paragraphs[2]}
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Card>
            {sectionHeading(content.goalsSection.heading)}
            <Box m={4}>
              <Typography variant="body1">
                {content.goalsSection.paragraphs[0]}
              </Typography>
            </Box>
            <Box m={4}>
              <Typography variant="h6">
                {content.goalsSection.list.heading}
              </Typography>
            </Box>
            <Box m={4}>
              <ul>
                {content.goalsSection.list.items.map((item) =>(
                  <li>
                    <Typography variant="body1">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Card>
            {sectionHeading(content.goalsSection.heading)}
            <Box m={4}>
              <Typography variant="body1">
                {content.goalsSection.paragraphs[0]}
              </Typography>
            </Box>
            <Box m={4}>
              <Typography variant="h6">
                {content.goalsSection.list.heading}
              </Typography>
            </Box>
            <Box m={4}>
              <ul>
                {content.goalsSection.list.items.map((item) =>(
                  <li>
                    <Typography variant="body1">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Card>
            {sectionHeading(content.solutionSection.heading)}
            <Box m={4}>
              <Typography variant="body1">
                {content.solutionSection.paragraphs[0]}
              </Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">
                {content.solutionSection.paragraphs[1]}
              </Typography>
            </Box>
            <Box m={4}>
              <ul>
                {content.solutionSection.list[0].map((item) =>(
                  <li>
                    <Typography variant="body1">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
            <Box m={4}>
              <Typography variant="body1">
                {content.solutionSection.paragraphs[2]}
              </Typography>
            </Box>
            <Box m={4}>
              <ul>
                {content.solutionSection.list[1].map((item) =>(
                  <li>
                    <Typography variant="body1">
                      {item}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Card>
        </Grid>

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
