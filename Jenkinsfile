pipeline {
    agent Docker-Demo-01
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18.0.0-alpine'
                    // Run the container on the node specified at the
                    // top-level of the Pipeline, in the same workspace,
                    // rather than on a new node entirely:
                    reuseNode true
                }
            }
            steps {
                // Build Docker image
                sh 'docker-compose up -d'
            }
        }
        // stage('Test') {
        //     steps {
        //     }
        // }
        // stage('Deliver') { 
        //     steps {
               
        //     }
        // }
    }
}
