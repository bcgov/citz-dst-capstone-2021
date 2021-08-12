# citz-dst-capstone-2021

CITZ-DST Reporting and Dashboard System Improvement Application

## Introduction

OCIO-DIO is the BC Governments central Digital Investment Branch within the Office of the CIO. The DIOs mandate includes:

- Engaging with Ministry Business Units to support their IM/IT project initiatives
- Providing executives with an a Whole of Government view of strategic IM/IT initiatives including fiscal, project-related and sustainment efforts in support of the Government IM/IT portfolio
- Providing a project repository for DIO financial analysts
- Reporting to the Government Chief Digital Officer (CDO)

To support DIOs tracking of strategic IM/IT initiatives , a modern web enabled Digital Investment Report and Analysis tool is required that will aid Ministry Business Units in their new application development journeys. To support the DIO tool the Capstone2021 Web Application is being developed to demonstrate a forms based approach to data acquisition.

## Problem Statement

The OCIO-DIO manages capital funding for projects that aim to improve digital services for British Columbians. Ministries that are awarded funding must report their project performance to the DIO quarterly.

Reports are filled out and submitted manually through the use of spreadsheets. This method is time consuming and can result in data inconsistencies that become a barrier to timely and quality data analysis.

## Hypothesis

Developing a web application to support stakeholders in the quarterly reporting process will assist in improving workflows and data quality.

Utilizing a digital form to capture data from submitters can facilitate effective and efficient reporting through the use of pre-filled fields and form validation. 

Opportunities for automating data aggregation can be acted upon through the use of a database to store reporting data. Furthermore, stored data can then be surfaced into a dashboard system to help ensure decision makers and other stakeholders have access to the information they need when they need it.

## Goal

The goal of the Capstone 2021 project team is to create a modern web application as a tool for the DIO to use to replace spreadsheets as the primary project reporting method.

Objectives include:

- Apply modern application development methodology based on AGILE principles
- Create a modern web application that is intuitive and easy to use
- Store project and reporting information in a central repository such as a database
- Host the solution in the BC Dev Exchange's container environment

## Project Status

Currently Documenting Application

## Development

Node.js | React.js | OpenShift 4 | Jenkins | MongoDB | GitHub

## Documentation

- [ ] Introduction
    - [X] [Business Problem](./app/docs/business-problem.md)
- [ ] People
	- **Project Sponsor:** BC Government OCIO - Digital Investment Office
	- **Roles:**
        + **Product Owner:** Shashank Shekhar
        + **Project Stakeholders:** Ministry Submitters, Finance Analysts, Executives/Decision Makers
        ![Organization Chart](./app/docs/diagrams/organization-chart.jpg)
- [ ] Requirements
	- [ ] Functional Requirements
    - [ ] Non-functional Requirements
    - [ ] Constraints
- [ ] Design & Architecture
	- [ ] Interviews
    - [ ] Personas
    - [ ] Journeys
    - [ ] Wireframes
    - [ ] Security
    - [X] [Data Model](https://dbdiagram.io/d/60d132d20c1ff875fcd5d83b)
    - [ ] Architecture Model
    - [X] [Architectural Decision Log](./app/docs/architectural-decision-log.md)
- [X] [User Processes](./app/docs/user-processes.md)
- [ ] Solution Architecture
	- [ ] Diagram
    - [ ] Manifest of MERN Stack
    - [ ] High Level APIs
    - [X] [Installation](./app/docs/installation.md)
    - [X] [Deployment](./app/docs/deployment.md)
    - [X] [MongoDB Backup and Restore](./app/docs/database.md)
    - [X] [Style Guides](./app/docs/style-guides.md)
- [X] [Project Portfolio](https://github.com/bcgov/citz-dst-capstone-2021/tree/main/app/docs/projectPortfolio)
- [X] [Recommendations/Lessons Learned](./app/docs/limitation-recommendation.md)


[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](https://github.com/bcgov/citz-dst-capstone-2021)

