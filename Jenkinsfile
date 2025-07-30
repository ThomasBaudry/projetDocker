pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('ghcr')
        VERSION_TAG = "v1.0.${BUILD_NUMBER}"
        REPO_URL = 'https://github.com/ThomasBaudry/projetDocker.git'
        IMAGE_NAME = "ghcr.io/ThomasBaudry/projetDocker"
    }

    stages {
        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build || echo "skip if no build script"'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || echo "no tests found or tests failed"'
            }
        }

stage('Build Docker Image') {
    steps {
        echo "Building Docker image"
        sh '''
            docker build -t ghcr.io/ThomasBaudry/projetDocker:latest
        '''
    }
}


        stage('Tag GitHub Repo') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                    sh '''
                        git config user.name "CI Bot"
                        git config user.email "ci@example.com"
                        git tag -a ${VERSION_TAG} -m "Build ${BUILD_NUMBER}"
                        git push https://${GIT_USER}:${GIT_PASS}@github.com/ThomasBaudry/projetDocker.git --tags
                    '''
                }
            }
        }

        stage('Push Docker to GitHub Package') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ghcr', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                    sh '''
                        echo "${GIT_TOKEN}" | docker login ghcr.io -u "${GIT_USER}" --password-stdin
                        docker push ${IMAGE_NAME}:latest
                        docker push ${IMAGE_NAME}:${VERSION_TAG}
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker'
            sh 'docker system prune -f || true'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}