pipeline {
  agent any

  environment {
    GITHUB_USER = 'Thomas Baudry'
    IMAGE_NAME = 'jenkins-pipelines'
    VERSION = "v${env.BUILD_NUMBER}"
    TOKEN = "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"
    DOCKER_REGISTRY = "ghcr.io/${env.GITHUB_USER}/${env.IMAGE_NAME}"
  }

  stages {
    stage('Cloner le repo') {
      steps {
        git url: 'git@github.com:ThomasBaudry/projetDocker.git', credentialsId: 'github-token'
      }
    }

    stage('Compilation') {
      steps {
        sh './build.sh'
      }
    }

    stage('Tests') {
      steps {
        sh './test.sh'
      }
    }

    stage('Créer image Docker') {
      steps {
        script {
          sh "docker build -t ${DOCKER_REGISTRY}:${VERSION} ."
        }
      }
    }

    stage('Push image GitHub Packages') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'Thomas Baudry', passwordVariable: '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')]) {
          sh """
            echo "${TOKEN}" | docker login ghcr.io -u "${USERNAME}" --password-stdin
            docker push ${DOCKER_REGISTRY}:${VERSION}
          """
        }
      }
    }

    stage('Tag Git') {
      steps {
        sshagent(['id-cle-ssh-ou-token']) {
          sh """
            git config user.name "Thomas Baudry"
            git config user.email "thomasbaudry05@gmail.com"
            git tag ${VERSION}
            git push origin ${VERSION}
          """
        }
      }
    }
  }

  post {
    success {
      echo "Pipeline réussi - version ${VERSION} publiée."
    }
    failure {
      echo "Pipeline échoué."
    }
  }
}
