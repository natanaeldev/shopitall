pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'prod'], description: 'Deployment environment')
    }

    environment {
        TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY        = "docker.io"
        DOCKER_IMAGE_NAMESPACE = "natanael0002"   // <-- change to your Docker Hub username
        APP_NAME               = "shopitall"
        AWS_DEFAULT_REGION      = "us-east-1"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/natanaeldev/shopitall.git'
            }
        }

        stage('Build & Test') {
            steps {
                sh '''
                  cd client && npm install && npm test -- --watchAll=false --passWithNoTests || echo 'No client tests yet'
                  cd ../server && npm ci || npm install

                    # Only run tests if package.json has a "test" script
                    if node -e "p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)"; then
                        npm test
                    else
                        echo "No server tests yet"
                    fi
                '''
            }
        }
       
    //    this is to clean any existing docker auth to avoid conflicts
        stage('Docker Clean Auth') {
            steps {
                sh '''
                docker logout docker.io || true
                rm -f /var/lib/jenkins/.docker/config.json || true
                '''
            }
        }


        stage('Build Docker Images') {
            steps {
                sh """
                  TAG=${ENVIRONMENT}-${BUILD_NUMBER}

                  docker build -f docker/client.Dockerfile -t $DOCKER_IMAGE_NAMESPACE/$APP_NAME-client:$TAG .
                  docker build -f docker/server.Dockerfile -t $DOCKER_IMAGE_NAMESPACE/$APP_NAME-server:$TAG .

                  echo $TAG > image_tag.txt
                """
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                      TAG=$(cat image_tag.txt)

                      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin $DOCKER_REGISTRY

                      docker push $DOCKER_IMAGE_NAMESPACE/$APP_NAME-client:$TAG
                      docker push $DOCKER_IMAGE_NAMESPACE/$APP_NAME-server:$TAG
                    '''
                }
            }
        }

        // Terraform + Ansible stages will be added in step 3

            stage('Terraform Init & Apply') {
                steps {
                    dir('infra/terraform') {
                        withCredentials([usernamePassword(credentialsId: 'aws-jenkins', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                            sh '''
                              terraform init

                              terraform apply -var="env=${ENVIRONMENT}" -var="docker_image_tag=$(cat ../../../image_tag.txt)" -auto-approve
                            '''
                        }
                    }
                }
            }
           
    }

    post {
        success {
            echo "Build & push succeeded!"
        }
        failure {
            echo "Build failed. Check logs."
        }
    }
}
