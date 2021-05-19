#!/bin/bash

echo ""

name=rdsi-app

clean_bc() {
  echo "deleting ${name} deployment"
  oc delete all -l app=${name}
}

clean_dc() {
  echo "deleting ${name} build"
  oc delete all -l build=${name}
}

if [[ $1 == "clean" ]]; then
  if [[ $2 == "dc" ]]; then
    clean_bc
  elif [[ $2 == "bc" ]]; then
    clean_dc
  else
    clean_dc && clean_bc
  fi
  exit
fi

port=8080
cwd=../openshift/client

branch=$1
tag=$2

# Check namespace
project=$(oc project -q)
if [[ $? -ne 0 ]]; then
    echo "$? : cannot identify the current project."
    exit 1
fi

# Build image
## Check if there is a buildconfig
oc get bc ${name} --no-headers 2>&1 > /dev/null
if [[ $? -ne 0 ]]; then
  echo "rebuild '${name}' image on '${project}' with branch '${branch}' and tag '${tag}'..."
  oc process -f $cwd/bc.yaml -p NAME=${name} -p NAMESPACE=${project} -p BRANCH=${branch} -p TAG=${tag} | oc apply -f -
  if [[ $? -ne 0 ]]; then
    exit 1
  fi
  sleep 10
fi

# Check if there is a running build
COUNT=$(oc get build -l build=${name} --no-headers | grep Running | wc -l)
if [[ $COUNT -ne 0 ]]; then
  echo "Waiting for the current build to complete..."
  while true; do
    COUNT=$(oc get build -l build=${name} --no-headers | grep Running | wc -l)
    if [[ $COUNT -eq 0 ]]; then
      break
    fi
    sleep 10
  done
fi

# deploy server
echo ""
echo "deploy '${name}' on '${project}' with branch '${branch}' and tag '${tag}'..."
oc process -f $cwd/dc.yaml -p PORT=${port} -p NAME=${name} -p NAMESPACE=${project} -p TAG=${tag} | oc apply -f -
