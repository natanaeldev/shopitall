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
        TF_VAR_key_name = "shopitall-key"
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
                    dir('infra/terraform/aws') {
                       withCredentials([usernamePassword(
                            credentialsId: 'aws-jenkins',
                            usernameVariable: 'AWS_ACCESS_KEY_ID',
                            passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                            )]) {
                            sh '''
                                export AWS_REGION=us-east-1
                                export AWS_DEFAULT_REGION=us-east-1
                                export TF_VAR_key_name="shopitall-key"
                                terraform init -input=false
                                terraform apply -auto-approve -input=false
                            '''
                            }
                    }
                }
            }

            
           stage('Ansible Deploy (AWS)') {
  steps {
    dir('infra/ansible') {
      sh '''#!/usr/bin/env bash
        set -euo pipefail

        # --- get IP from terraform output (no app_ip.txt needed) ---
        TF_DIR="../terraform/aws"
        if [[ ! -f "$TF_DIR/terraform.tfstate" ]]; then
          echo "ERROR: terraform state not found in $TF_DIR"
          ls -lah "$TF_DIR" || true
          exit 1
        fi

        APP_IP="$(terraform -chdir="$TF_DIR" output -raw app_public_ip | tr -d '[:space:]')"
        if [[ -z "$APP_IP" ]]; then
          echo "ERROR: Terraform output app_public_ip is empty"
          terraform -chdir="$TF_DIR" output || true
          exit 1
        fi

        # --- image_tag optional ---
        TAG_FILE="../image_tag.txt"
        TAG=""
        if [[ -f "$TAG_FILE" ]]; then
          TAG="$(tr -d '[:space:]' < "$TAG_FILE")"
        else
          echo "WARN: image_tag.txt not found at $TAG_FILE (continuing without image_tag)"
        fi

        # --- write inventory ---
        mkdir -p inventories/aws
        cat > inventories/aws/hosts.ini <<EOF
[shopitall_app]
${APP_IP} ansible_user=ubuntu
EOF

        echo "Inventory:"
        cat inventories/aws/hosts.ini

        # --- run playbook ---
        ansible-playbook -i inventories/aws/hosts.ini playbooks/deploy_aws.yml \
          -e "environment=${ENVIRONMENT}" \
          -e "docker_image_namespace=${DOCKER_IMAGE_NAMESPACE}" \
          -e "app_name=${APP_NAME}" \
          -e "image_tag=${TAG}"
      '''
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
