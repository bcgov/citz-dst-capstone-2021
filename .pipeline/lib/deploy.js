'use strict';
const {OpenShiftClientX} = require('pipeline-cli')
const path = require('path');

module.exports = async (settings)=>{
  const phases = settings.phases
  const options= settings.options
  const phase=settings.phase
  const changeId = phases[phase].changeId
  const oc=new OpenShiftClientX(Object.assign({ namespace: phases[phase].namespace }, options));

  const templatesLocalBaseUrl =oc.toFileUrl(path.resolve(__dirname, '../../openshift'))
  var objects = []

  objects.push(... oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/jenkins.dc.json`, {
    'param':{
      'NAME': phases[phase].name,
      'SUFFIX': phases[phase].suffix,
      'VERSION': phases[phase].tag,
      'ROUTE_HOST': phases[phase].host,
      'NAMESPACE': phases[phase].namespace
    }
  }));

  oc.applyRecommendedLabels(objects, phases[phase].name, phase, `${changeId}`, phases[phase].instance)
  oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag)
  await oc.applyAndDeploy(objects, phases[phase].instance)
}
