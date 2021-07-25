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
import { Typography, Box, Grid, Container, Card } from '@material-ui/core';
import theme from '../theme';
import samaraBioImage from '../assets/images/about/samara_bio_portrait.jpg';
import nickBioImage from '../assets/images/about/nick_bio_portrait.jpg';
import journey1Image from '../assets/images/about/journey_1_new_project.jpg';
import journey2Image from '../assets/images/about/journey_2_submit_report.jpg';
import journey3Image from '../assets/images/about/journey_3_review_report.jpg';

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
  samaraBio: {
    name: 'Samara Flueck',
    image: samaraBioImage,
    altText: 'Portrait of Samara smiling wearing a brown turtle neck sweater on a cream background',
    email: 'samflueck95@gmail.com',
    content: `Samara grew up with a strong interest in technology and art, so she initially decided
  to study 3D modeling and animation. After graduation she worked as a 3D artist
  where she discovered a deeper interest in technology. She soon returned to school
  to build the technical knowledge and skills she felt she needed. Since then, Samara
  has found a love for programming and hopes to combine her technical and creative
  skills to design solutions for new and exciting problems.
  `,
  },

  nickBio: {
    name: 'Sunghwan Park',
    image: nickBioImage,
    altText: 'Portrait of Sunghwan smiling outside with dense foliage in the background',
    email: 'shwpark612@gmail.com',
    content: `Sunghwan has diverse experience in the field of IT. He has developed a high
  availability solution and managed the development of products related to disaster
  recovery automation. Through years of supporting customers, he believes that
  solving their needs is key to the success of software products. This project gave
  him a great chance to learn and experience what the BC Government does to
  improve citizens’ digital life with advanced technology and sophisticated
  methodologies.
  
  `,
  },

  introSection: {
    heading: 'Reporting and Dashboard Service Improvement Project',
    paragraphs: [
      'The Digital Investment Office (DIO) operates under the Office of the Chief Information Officer (OCIO) and manages funding for capital investment projects designed to improve digital services for British Columbians. Projects that are approved for funding must report their performance quarterly to the DIO. Team RDSI worked with the DIO and stakeholders on the Reporting and Dashboard Service Improvement (RDSI) project to design a web application that streamlines the reporting and assessment processes on approved projects. This web application was developed as a proof-of-concept prototype to demonstrate our solution.',
    ],
  },

  conclusionSection: {
    heading: 'Gratitude',
    paragraphs: [
      'This project has been a challenging yet wonderful experience that we are proud to have participated in. Team RDSI would like to thank our sponsors Shashank Shekhar, Poornima Sivanand, and Robert Kobenter, as well as everyone else at the Government of British Columbia who supported us in this exciting project. We would also like to thank Camosun faculty for their ongoing support and guidance in our endeavors.',
    ],
  },

  problemSection: {
    heading: 'The Business Problem',
    paragraphs: [
      'The DIO manages funding for capital investment projects that aim to improve digital services for British Columbians and ministries that are awarded funding must report their performance to the DIO quarterly.',
      'Currently, reports are filled out and submitted manually using excel spreadsheets. This method is time consuming and often results in data inconsistencies that can become a barrier to timely and quality data analysis.',
    ],
  },

  hypothesisSection: {
    heading: 'Hypothesis',
    paragraphs: [
      'Developing a web application to support stakeholders in the quarterly reporting process will assist in improving workflows and data quality.',
      'Using purpose built submission forms and validation to capture data from ministry submitters will improve quality of data as it is entered while improving workflows. Manual effort can be further reduced through the use of pre-filled fields in forms and automation of calculated values',
      'Opportunities for automating data aggregation can be acted upon using a database to store reporting data. Furthermore, stored data can then be surfaced into a dashboard system to help ensure decision makers and other stakeholders have access to the information they need when they need it.',
    ],
  },

  goalsSection: {
    heading: 'Goals and Objectives',
    paragraphs: [
      'The primary goal of the Capstone 2021 project team is to design a modern web application as a tool for the DIO to use to replace spreadsheets as the main project reporting method. Once the application is designed a proof-of-concept prototype can be developed to demonstrate how our solution can assist stakeholders in their reporting processes.',
    ],
    list: {
      heading: 'Objectives Include',
      items: [
        'Apply modern application development methodology based on AGILE principles.',
        'Design a modern web application that is intuitive and easy to use.',
        'Develop an application prototype based on our design.',
        'Store project and reporting information in a central repository such as a database.',
        'Host the solution in the BC Dev Exchange’s container environment.',
        'Document our solution so that it can be handed off to continue development.',
      ],
    },
  },

  solutionSection: {
    heading: 'Our Solution',
    paragraphs: [
      'Our web application is designed to be hosted in the BC Dev Exchange’s OpenShift container environment. It consists of a React frontend for users to interface with, a MongoDB database to store project and reporting data, and an API to allow the frontend to request data from the database.',
      'We identified five key groups that would interact with our application:',
      'With our key groups identified, we then conducted interviews with stakeholders so that we could identify our personas and improve their journeys in the quarterly status reporting process. For our prototype we focused on implementing a few of the core journeys of the Ministry Submitters and Finance Analysts.',
    ],
    list: [
      'Ministry Submitters',
      'Finance Analysts',
      'Data Analysts',
      'Government Executives',
      'System Administrator',
    ],
    images: [
      {
        image: journey1Image,
        altText: 'Diagram showing user journey for ministry submitters to create a new project.',
        figureText: 'Figure 1 - Submitter Enters a New Project Into the System',
        desc: [
          'Christina is a project manager and Luke is a project lead and they are our Submitter personas. Before a project can be created the appropriate approvals and information must be in place. Once Christina receives confirmation that her project has been approved from the DIO, she then contacts relevant project contacts that need to be registered in the system. Luke receives an email that the project has been approved so his next step is to register with the application.',
          'Christina can then log into the application to begin entering the project details into a form. She assigns Luke as a project contact after he registers with the application. Then she enters the milestones, objectives, and key performance indicators (KPIs) that were approved by the DIO into the project form. Once she confirms project information is accurate she submits the form to create her new project in the system.',
        ],
      },
      {
        image: journey2Image,
        altText:
          'Diagram showing user journey for ministry submitters completing a quarterly status report.',
        figureText:
          'Figure 2 - Submitter Completes and Submits a Quarterly Status Report to the DIO',
        desc: [
          'Once a project exists in the system, Submitters can then enter status reports quarterly. When it comes time to submit a report Christina reaches out to relevant stakeholders and the project team to obtain the information necessary to complete the status report for that quarter. Christina and Luke work with stakeholders to ensure data is accurate and up to date.',
          'Christina can then log into the application and select the option to start a report for her project and is redirected to the most recent reporting form. She then steps through each section of the form and uses validation to ensure the data being entered adheres to the correct formats.',
          'Once the data is entered it can be reviewed with stakeholders and the project team before it is submitted to the DIO.',
        ],
      },
      {
        image: journey3Image,
        altText:
          'Diagram showing user journey for finance analysts to review a single quarterly report.',
        figureText: 'Figure 3 - Finance Analyst Reviews Quarterly Report',
        desc: [
          'Jason is our Finance Analyst and his primary role in our system is to review quarterly status reports after they have been submitted to the DIO. He begins this process by logging into the application where he has the option to view a list of submitted reports. He selects a report to review from the list and is redirected to the report details.',
          'Jason skims the project information for any obvious issues and confirms that project percent complete is within expectations for that project. He then reviews the status summary and KPIs to see if the project is performing as expected. Then he assesses the financials in the report to see if there are any issues and if the variance is within an acceptable range. He also reviews milestones and objectives to assess their statuses, dates, and progress.',
          'Once the report has been reviewed and Jason has entered his quarterly report notes he can approve it or flag it for follow up. An approved report then alerts the system that it is ready to be aggregated with other reports for that quarter. A report that requires follow up can later be approved, such as when the issue that caused tje report to be flagged is addressed.',
        ],
      },
    ],
  },
};

const About: React.FC = () => {
  const bioComponent = (bio: BioObject) => {
    return (
      <Grid item xs={12} container spacing={1}>
        <Grid item>
          <Typography variant="h6">{bio.name}</Typography>
        </Grid>
        <Grid container direction="row" item spacing={2}>
          <Grid item>
            <img src={bio.image} alt={bio.altText} width="152" />
          </Grid>
          <Grid item sm={12} md={8}>
            <Typography variant="body1">{bio.content}</Typography>
            <Typography variant="subtitle2">
              <strong>Contact: </strong>
              {bio.email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const sectionHeading = (text: string) => {
    return (
      <StyledSectionHeading>
        <Typography variant="h4">{text}</Typography>
      </StyledSectionHeading>
    );
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Card>
            {sectionHeading('Capstone 2021')}
            <Box m={4}>
              <Typography variant="h6">{content.introSection.heading}</Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">{content.introSection.paragraphs[0]}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Card>
            {sectionHeading(content.problemSection.heading)}
            <Box m={4}>
              <Typography variant="body1">{content.problemSection.paragraphs[0]}</Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">{content.problemSection.paragraphs[1]}</Typography>
            </Box>

            <Box m={4}>
              <Typography variant="h6">{content.hypothesisSection.heading}</Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">{content.hypothesisSection.paragraphs[0]}</Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">{content.hypothesisSection.paragraphs[1]}</Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">{content.hypothesisSection.paragraphs[2]}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={10}>
          <Card>
            {sectionHeading(content.goalsSection.heading)}
            <Box m={4}>
              <Typography variant="body1">{content.goalsSection.paragraphs[0]}</Typography>
            </Box>
            <Box m={4}>
              <Typography variant="h6">{content.goalsSection.list.heading}</Typography>
            </Box>
            <Box m={4}>
              <ul>
                {content.goalsSection.list.items.map(item => (
                  <li>
                    <Typography variant="body1">{item}</Typography>
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
              <Typography variant="body1">{content.goalsSection.paragraphs[0]}</Typography>
            </Box>
            <Box m={4}>
              <Typography variant="h6">{content.goalsSection.list.heading}</Typography>
            </Box>
            <Box m={4}>
              <ul>
                {content.goalsSection.list.items.map(item => (
                  <li>
                    <Typography variant="body1">{item}</Typography>
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
              <Typography variant="body1">{content.solutionSection.paragraphs[0]}</Typography>
            </Box>
            <Box m={4}>
              <Typography variant="body1">{content.solutionSection.paragraphs[1]}</Typography>
            </Box>
            <Box m={4}>
              <ul>
                {content.solutionSection.list.map(item => (
                  <li>
                    <Typography variant="body1">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
            <Box m={4}>
              <Typography variant="body1">{content.solutionSection.paragraphs[2]}</Typography>
            </Box>
            <Box m={4}>
              {content.solutionSection.images.map(image => (
                <Box textAlign="center" mb={4}>
                  <img src={image.image} alt={image.altText} />
                  <Typography variant="caption">{image.figureText}</Typography>
                  <Box textAlign="left">
                    {image.desc.map(item => (
                      <Box mb={4} mt={4}>
                        <Typography variant="body1">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
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

        <Grid item xs={10}>
          <Card>
            {sectionHeading(content.conclusionSection.heading)}
            <Box m={4}>
              <Typography variant="body1">{content.conclusionSection.paragraphs[0]}</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
