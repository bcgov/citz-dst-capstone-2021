pipeline {
    agent none
    options {
        disableResume()
    }
    
    stages {           
        stage('Build') {
            agent { label 'build' }
            steps {
                echo "Aborting all running jobs ..."
                script {    
                    // Use Pipeline-cli node project to build the open shift images, wiof-app-build ( open jdk image to build code with maven ) and wiof-build ( jboss web server image to host the web application ) 
                    echo "Building Openshift Images..." 
                    sh "cd .pipeline && ${WORKSPACE}/npmw ci && DEBUG='info:*' ${WORKSPACE}/npmw run build --  --pr=${CHANGE_ID} --git.branch.name=${CHANGE_BRANCH} --git.branch.merge=${CHANGE_BRANCH} --git.branch.remote=${CHANGE_BRANCH} --git.url=${GIT_URL} --git.change.target=${CHANGE_TARGET}"
                   
                }
            }
        }

        stage('Deploy App Changes to DEV') {
            agent { label 'build' } // Run on jenkins slave 'build'
            steps {
                script {
                // Use Pipeline-cli node project to deploy the wiof-build image to Dev Stage 
                echo "Deploying to DEV ..."
                sh "cd .pipeline && ${WORKSPACE}/npmw ci && DEBUG='info:*' ${WORKSPACE}/npmw run deploy -- --pr=${CHANGE_ID} --env=dev --git.branch.name=${BRANCH_NAME} --git.branch.merge=${CHANGE_BRANCH} --git.branch.remote=${CHANGE_BRANCH} --git.url=${GIT_URL}" 
             }
           }
        }

         stage('Approval For Deployment to TEST') {
            agent { label 'deploy' }   
            when {
                expression { return env.CHANGE_TARGET == 'main';}
                 beforeInput true;
            }  
            input {
                message "Are all changes tested succesfully in DEV?"
            }
             steps {
                   script {
                      echo "Approved"
               }
             }
         }

        
        stage('Deploy App Changes to TEST') {             
            agent { label 'deploy' } 
            when {
                // Run Stage only if Pull Request is to main branch
                expression { return env.CHANGE_TARGET == 'main';}
                beforeInput true;
            }                        
            steps {
                script {
                // Use Pipeline-cli node project to deploy the wiof-build image to Test Stage 
                echo "Deploying to Test ..."
                sh "cd .pipeline && ${WORKSPACE}/npmw ci && DEBUG='info:*' ${WORKSPACE}/npmw run deploy -- --pr=${CHANGE_ID} --env=test --git.branch.name=${BRANCH_NAME} --git.branch.merge=${CHANGE_BRANCH} --git.branch.remote=${CHANGE_BRANCH} --git.url=${GIT_URL}" 
            }
            }
        }



        stage('Approval For Deployment to PROD') {
            agent { label 'deploy' }   
            when {
                expression { return env.CHANGE_TARGET == 'main';}
                 beforeInput true;
            }  
            input {
                message "Are all changes tested succesfully in TEST?"
            }
             steps {
                   script {
                      echo "Approved"
               }
             }
         }

        stage('Deploy App Changes to PROD') {
            agent { label 'deploy' }
            when {
                // Run Stage only if Pull Request is to main branch
                expression { return env.CHANGE_TARGET == 'main';}
                beforeInput true;
            }      
            steps {
                script {
                // Use Pipeline-cli node project to deploy the wiof-build image to Prod Stage
                echo "Deploying to Prod ..."
                sh "cd .pipeline && ${WORKSPACE}/npmw ci && DEBUG='info:*' ${WORKSPACE}/npmw run deploy -- --pr=${CHANGE_ID} --env=prod --git.branch.name=${BRANCH_NAME} --git.branch.merge=${CHANGE_BRANCH} --git.branch.remote=${CHANGE_BRANCH} --git.url=${GIT_URL}"
                 }
              }
           }
        
       stage('Approval For Clean Out') {
            agent { label 'deploy' }   
            input {
                message "Can the dev and tools namespace be cleaned out?"
            }
             steps {
                   script {
                      echo "Approved"
               }
             }
         }

       stage('Clean Out') {
            agent { label 'deploy' }   
            steps {
                // Use Pipeline-cli node project to clean openshift objects
                script {
               // Fetch all builds for the Pull request from JIRA and mark them succesful (possibility of multiple builds since passing Build keys through jenkins adds an unsucessful build as a Bug)
                     sh "cd .pipeline && ${WORKSPACE}/npmw ci && DEBUG='info:*' ${WORKSPACE}/npmw run clean -- --pr=${CHANGE_ID} --env=dev --git.branch.name=${BRANCH_NAME} --git.branch.merge=${CHANGE_BRANCH} --git.branch.remote=${CHANGE_BRANCH} --git.url=${GIT_URL}"
                     sh "cd .pipeline && ${WORKSPACE}/npmw ci && DEBUG='info:*' ${WORKSPACE}/npmw run clean -- --pr=${CHANGE_ID} --env=build --git.branch.name=${BRANCH_NAME} --git.branch.merge=${CHANGE_BRANCH} --git.branch.remote=${CHANGE_BRANCH} --git.url=${GIT_URL}"
                  }   
               }
            }
        }             
    }



