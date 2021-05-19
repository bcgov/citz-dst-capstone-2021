'use strict';
const {OpenShiftClientX} = require('@bcgov/pipeline-cli')
const path = require('path');

module.exports = (settings)=>{
  const phases = settings.phases
  const options = settings.options
  const phase=options.env
  const changeId = phases[phase].changeId
  const oc=new OpenShiftClientX(Object.assign({'namespace':phases[phase].namespace}, options));
  var objects = []

  const templatesLocalBaseUrl =oc.toFileUrl(path.resolve(__dirname, '../../openshift'))

  objects.push(...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/client/dc.yaml`, {
    'param':{
      'NAME': phases[phase].name,
      'SUFFIX': phases[phase].suffix,
      'VERSION': phases[phase].tag,
      'NAMESPACE': phases[phase].namespace,
      'PORT': 8080,
    }
  }))

  objects.push(...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/server/dc.yaml`, {
    'param':{
      'NAME': phases[phase].name,
      'SUFFIX': phases[phase].suffix,
      'VERSION': phases[phase].tag,
      'NAMESPACE': phases[phase].namespace,
      'MONGODB_USER': phases[phase].mongodb.name,
      'MONGODB_PASSWORD': phases[phase].mongodb.password,
      'MONGODB_URL' : 'mongodb',
      'MONGODB_DB_MAIN' : phases[phase].name
    }
  }))

  oc.applyRecommendedLabels(objects, phases[phase].name, phase, `${changeId}`, phases[phase].instance)
  oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag)
  oc.applyAndDeploy(objects, phases[phase].instance)

}