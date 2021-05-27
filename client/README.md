# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deploy
### Create a buildconfig
```
$oc new-build https://github.com/SungHwan-Park/RDSI --context-dir=app --image-stream=nodejs:12-ubi8 --name=rdsi-app
--> Found image f419e8e (3 weeks old) in image stream "adccd1-tools/nodejs" under tag "12-ubi8" for "nodejs:12-ubi8"

    Node.js 12 
    ---------- 
    Node.js 12 available as container is a base platform for building and running various Node.js 12 applications and frameworks. Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

    Tags: builder, nodejs, nodejs12

    * The source repository appears to match: nodejs
    * A source build using source code from https://github.com/SungHwan-Park/RDSI will be created
      * The resulting image will be pushed to image stream tag "rdsi-app:latest"
      * Use 'oc start-build' to trigger a new build

--> Creating resources with label build=rdsi-app ...
    imagestream.image.openshift.io "rdsi-app" created
    buildconfig.build.openshift.io "rdsi-app" created
--> Success
```
### Check buildconfig, build, and imagestream
```
$ oc get all -l build=rdsi-app
NAME                                      TYPE     FROM   LATEST
buildconfig.build.openshift.io/rdsi-app   Source   Git    1

NAME                                  TYPE     FROM          STATUS    STARTED         DURATION
build.build.openshift.io/rdsi-app-1   Source   Git@6053a0f   Running   3 minutes ago   

NAME                                      IMAGE REPOSITORY                                                    TAGS   UPDATED
imagestream.image.openshift.io/rdsi-app   image-registry.apps.silver.devops.gov.bc.ca/adccd1-tools/rdsi-app     
```
### Extract buildconfig
```
$ oc get all -l build=rdsi-app -o yaml > openshift/app/bc.yaml
```

### Apply to-template
```
$ npx @bcgov/oc-template to-template openshift/app/bc.yaml
```
Remove the build section too

### 

__**Thursday May 13th, 2021**__

**What I accomplished yesterday**

- Draft scheduling and planning part of team contract
- Draft basic data entities

**What I am doing today**

- Listing of data usage by personas and pages
- Deploy backend api server template
- Continue to review answers from stackholders
