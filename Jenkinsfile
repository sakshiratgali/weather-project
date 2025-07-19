pipeline {
    agent any
    
    environment {
        // GITURL = "https://github.com/sakshiratgali/weather-project.git"
        // GITBRANCH = "main"
        // GITCREDENTIALS_ID = "weather-project"
        IMAGE_NAME = "weather-project"
        CONTAINER_NAME = "weather-project"
        DOCKER_REGISTRY = "sakshi202"
        HOST_PORT = "80"
        CONTAINER_PORT = "80"
        DOCKERFILENAME = "Dockerfile"
    }
    
    stages {
        // stage('Clone Repository') {
        //     steps {
        //         git credentialsId: "$GITCREDENTIALS_ID", 
        //             branch: "$GITBRANCH", 
        //             url: "$GITURL"
        //     }
        // }
        
        stage('Build and Push Docker Image') {
            steps {
                script {
                    env.GIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    def imageTag = "${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_HASH}"
                    
                    sh """
                        docker login --username sakshi202 -p sakshi2025
                        docker build -f ${DOCKERFILENAME} -t ${imageTag} .
                        docker push ${imageTag}
                    """
                }
            }
        }
        
        stage('Deploy Docker Container') {
            steps {
                script {
                    def imageTag = "${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_HASH}"
                    
                    sh """

                        # Stop and remove existing container if running
                        CONTAINER_ID=\$(docker ps -a -q --filter name=\$CONTAINER_NAME)
                        if [ -n "\$CONTAINER_ID" ]; then
                            echo "Stopping and removing container \$CONTAINER_NAME..."
                            docker stop "\$CONTAINER_ID"
                            docker rm "\$CONTAINER_ID"
                        else
                            echo "Container \$CONTAINER_NAME is not running."
                        fi

                        docker run --restart unless-stopped -d -p ${HOST_PORT}:${CONTAINER_PORT} --name ${CONTAINER_NAME} ${imageTag}
                    """
                }
            }
        }
    }
}
