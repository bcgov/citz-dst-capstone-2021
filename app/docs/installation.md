# How to install RDSI

## Introduction

This document explains how to run RDSI on your local environment.

> We tested all commands in this page on Ubuntu 20.04.1 LTS

## Preparation

### NodeJS Runtime Environment

The version of Node in the build environment used by GitHub workflows is 12 and the one in the pods deployed in the Openshift is 14. Therefore, we recommend you to install the latest long time support version, `v12.22.4` among v12 releases.

We also recommend you to use [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) to install and manage multiple versions of NodeJS.

```
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
$ . ~/.bashrc
$ nvm install v12.22.4
```

> If `nvm install` command doesn't respond, disable IPv6 on your machine and retry.

### Git Client

To install Git for your environment, refer to [Getting Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Installation

### Clone repository

`$ git clone https://github.com/bcgov/citz-dst-capstone-2021`

### Directory Structure

- app/client - Frontend React project
- app/server - Backend API project
- app/openshift - Configurations to build and deploy server and client projects on Openshift platform
- app/.pipeline - [pipeline-cli](https://github.com/bcDevOps/pipeline-cli) commands
- app/docs - Documents
- openshift - Openshift network policy and service account

```
citz-dst-capstone-2021
├── app
│    ├── client
│    │    ├── public
│    │    └── src
│    │        ├── actions
│    │        ├── assets
│    │        │    └── images
│    │        │        └── about
│    │        ├── components
│    │        │    ├── common
│    │        │    │    ├── buttons
│    │        │    │    └── form
│    │        │    ├── projects
│    │        │    └── reports
│    │        ├── events
│    │        ├── hoc
│    │        ├── layout
│    │        ├── reducers
│    │        ├── utils
│    │        └── views
│    │            ├── financeAnalyst
│    │            └── submitter
│    ├── docs
│    ├── openshift
│    │    ├── client
│    │    └── server
│    └── server
│        ├── config
│        └── src
│            ├── controllers
│            ├── databases
│            ├── dtos
│            ├── interfaces
│            ├── middlewares
│            ├── models
│            ├── routes
│            ├── services
│            ├── tests
│            └── utils
└── openshift
```

### Install MongoDB Database

There are many ways to set up your mongodb, but we recommend the following two options.

#### Option 1: MongoDB Cloud `Atlas`

The simplest way to connect your application to the latest MongoDB is using [MongoDB Cloud](https://www.mongodb.com/cloud/atlas). 

To create an account and database instance, refer to [Get Started with Atlas](https://docs.atlas.mongodb.com/getting-started/)

If you finished `Part 5` of the tutorial, you must have the connection string to your database.

Set MONGODB_URI environment variable to the connection string in `app/server/.env` file as follows.

`MONGODB_URI=mongodb+srv://xxxx:xxxx@cluster0.rew5r.mongodb.net`

#### Option 2: Docker Container

If you have not installed the Docker runtime on your machine, refer to [Get Docker](https://docs.docker.com/get-docker/).

Create a mongodb container.

`$ docker run --name mongodb -p 27017:27017 -d mongo`

The connection information to the local Docker container is already set in `app/server/config/development.json` file.

```json
{
  "db": {
    "host": "localhost",
    "database": "rdsi",
    "port": 27017
  }
}

```

#### Restore existing data

If you have backup files, see [Restore data using mongorestore](./database.md#Restore-data-using-mongorestore)

### Run Backend API server

Set API server's listening port in `app/server/.env` file.

`PORT=8080`

Install dependencies and start the server.

```
$ cd app/server
$ npm install
$ npm run dev
```

You should be able to see this Mongoose log if it connects to the database successfully.

`Mongoose: users.createIndex({ email: 1 }, { unique: true, background: true })`

### Run Frontend web server

By default, the frontend web server runs on the port `3000` in the development mode.

```
$ cd app/client
$ npm install
$ npm run dev
```

If you want to change the port, set it to `app/client/.env` file.

`PORT=8081`

If you change the server port to other than 8080, you need to update `BASE_URL` in `app/client/src/constants.ts` file.

```
export const API = {
  BASE_URL: () =>
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/api/v1/'
      : `${window.location.origin}/api/v1/`,
};
```

### Access the application

Go to [http://localhost:3000](http://localhost:3000)

You may want to read [User Manual](./manual.md) to learn how to sign up, login, create a project, and submit a report.

## Conclusion

Now you have your own version of RDSI application and can modify or improve as you want. To deploy your version to production, refer to [Deployment](./deployment.md).