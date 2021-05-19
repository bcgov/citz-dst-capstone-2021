'use strict';
const options= require('@bcgov/pipeline-cli').Util.parseArguments()
const changeId = options.pr //aka pull-request
const version = '1.0.0'
const name = 'rdsi'


const phases = {
  build: {namespace:'adccd1-tools'    , name: `${name}`, phase: 'build'  , changeId:changeId, suffix: `-build-${changeId}`  , instance: `${name}-build-${changeId}`  , version:`${version}-${changeId}`, tag:`build-${version}-${changeId}`},
  dev: {namespace:'adccd1-dev'    , name: `${name}`, phase: 'dev'  , changeId:changeId, suffix: `-dev-${changeId}`  , instance: `${name}-dev-${changeId}`  , version:`${version}-${changeId}`, tag:`dev-${version}-${changeId}`},
  test: {namespace:'adccd1-test'    , name: `${name}`, phase: 'dev'  , changeId:changeId, suffix: `-test-${changeId}`  , instance: `${name}-dev-${changeId}`  , version:`${version}-${changeId}`, tag:`dev-${version}-${changeId}`},
  prod: {namespace:'adccd1-prod'    , name: `${name}`, phase: 'prod'  , changeId:changeId, suffix: ''  , instance: `${name}-prod`  , version:`${version}`, tag:`prod-${version}`},
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = {phases, options};