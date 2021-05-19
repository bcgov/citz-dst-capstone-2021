#!/bin/bash

echo ""

name=rdsi-server

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

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 branch tag"
  exit 1
fi

port=8080
cwd=../openshift/server

branch=$1
tag=$2

# Check namespace
project=$(oc project -q)
if [[ $? -ne 0 ]]; then
  echo "$? : cannot identify the current project."
  exit 1
fi

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

# Build image
## Check if there is a buildconfig
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

# Check if mongodb pod is running
DB_POD=$(oc get pods -l name=mongodb --no-headers | cut -f1 -d' ')
if [[ $DB_POD == "" ]]; then
  echo "No database is running"
  exit 1
fi

# Retrieve mongodb environment variables
MONGODB_PASSWORD=$(oc rsh ${DB_POD} env | grep MONGODB_PASSWORD | cut -f2 -d= | tr -d '[:space:]')
MONGODB_USER=$(oc rsh ${DB_POD} env | grep MONGODB_USER | cut -f2 -d= | tr -d '[:space:]')
MONGODB_DB_MAIN=$(oc rsh ${DB_POD} env | grep MONGODB_DATABASE | cut -f2 -d= | tr -d '[:space:]')
MONGODB_URL="mongodb" # using service name instead of IP address
#MONGODB_URL=$(oc rsh ${DB_POD} env | grep MONGODB_SERVICE_HOST | cut -f2 -d= | tr -d '[:space:]')

# deploy server
echo ""
echo "deploy '${name}' on '${project}' with branch '${branch}' and tag '${tag}'..."
oc process -f $cwd/dc.yaml -p PORT=${port} -p NAME=${name} -p NAMESPACE=${project} -p TAG=${tag} -p MONGODB_USER=${MONGODB_USER} -p MONGODB_PASSWORD=${MONGODB_PASSWORD} -p MONGODB_URL=${MONGODB_URL} -p MONGODB_DB_MAIN=${MONGODB_DB_MAIN} | oc apply -f -
