# RDSI Deployment Process

This tutorial explains how to deploy RDSI to the BC Gov DevOps OpenShift Container Platform.

## Introduction

RDSI is the application of three tiers: database, API server, and web server. Therefore, you need to deploy three containers.

## Deploy MongoDB

You need to deploy the database to `dev`, `test`, and `prod` namespaces. Unlike API and web servers, the database doesn't follow GitHub workflows. Once deployed, it should keep running afterwards.

You can deploy a MongoDB pod using the [sample MongoDB template](https://github.com/sclorg/mongodb-container).

1. Log into BCDevExchange DevOps Platform
2. Select `Project` 
3. Using the perspective switcher at the top of the navigation, go to `</> Developer`.
4. Go to the `+Add` page in the navigation.
5. Select `Database` category.
6. Select `MongoDB` template.
7. Click `Instantiate Template`.
8. Input the form
   - **Enter `rdsi` into `MongoDB Database Name` input box**
   - You can adjust `Memory Limit` and `Volume Capacity` according to your resource requirements.
   - You can leave other input fields as the defaults
   <img src="https://github.com/bcgov/citz-dst-capstone-2021/blob/docs/deployment/app/docs/images/mongodb-template-form.png" width="600">

9. Click `Create`

The Topology view will load with the new application.

<img src="https://github.com/bcgov/citz-dst-capstone-2021/blob/docs/deployment/app/docs/images/topology-mongodb.png" width="200">

## Build and Deployment Configuration

To deploy API and web servers, you need to build images first using the build configurations. These configurations use s2i (source to image) strategy to build images from the branch on the repository specified as parameters.

- [app/openshift/server/bc.yaml](../openshift/server/bc.yaml)
- [app/openshift/client/bc.yaml](../openshift/client/bc.yaml)

> :warning: Build-time is significantly affected by the resources allocated to the building pod defined in the build configuration. At least 500m CPU and 2G memory requests are recommended.
```
resources:
  limits:
    cpu: 1
    memory: "3Gi"
  requests:
    cpu: "500m"
    memory: "2Gi"
```

Once the images are built, you can deploy pods using the deployment configurations.

- [app/openshift/server/dc.yaml](../openshift/server/dc.yaml)
- [app/openshift/client/dc.yaml](../openshift/client/dc.yaml)

## GitHub Actions

The GitHub Actions are defined as workflows. A workflow is triggered by a pull request and executes pipeline-cli commands. Pipeline-cli executes OpenShift CLI with build and deployment configurations.  

### Overall Steps

1. Create a pull request - triggers `CI` or `CI-CD` workflow.
2. Build API and web server images in `tools` namespace
3. Deploy API and web server to `dev` namespace
4. Review and approve deployment
5. Deploy API and web server to `test` namespace
6. Review and approve deployment
7. Deploy API and web server to `prod` namespace
8. Merge the pull request - triggers `clean` workflows
9. Delete images and configurations in `tools` namespace
10. Delete deployments in `dev` namespace 

### Workflows

You can see three workflows defined at [GitHub Actions](https://github.com/bcgov/citz-dst-capstone-2021/actions)

<img src="https://github.com/bcgov/citz-dst-capstone-2021/blob/docs/deployment/app/docs/images/github-actions.png" width="300">

#### [CI](../../.github/workflows/app-CI.yml) workflow

- Triggered on pull requests on `release` branch
- Runs step 2 - 3

#### [CI-CD](../../.github/workflows/app-CI-CD.yml) workflow

- Triggered on pull requests on `main` branch
- Runs step 2 - 7
<img src="https://github.com/bcgov/citz-dst-capstone-2021/blob/docs/deployment/app/docs/images/ci-cd-workflow.png" width="800">

#### [Clean](../../.github/workflows/clean.yml) workflow

- Triggered merge events on `main` and `release` branches
- Runs step 9 - 10

## Conclusion

If you look into the workflow definitions and build/deployment configurations, you will find they are quite complex processes and have many parameters.

GitHub Actions, pipeline-cli, and OpenShift CLI simplify and automate the overall deployment procedures.
