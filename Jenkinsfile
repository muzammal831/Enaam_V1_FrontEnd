pipeline {
    agent any

    environment {
        NODE_HOME = "/usr/local/bin/node"
        NPM_HOME = "/usr/local/bin/npm"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MudassirChaudhre/Enaam_V1_FrontEnd.git'
            }
        }


        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }


        stage('Deploy') {
            steps {
                // Optionally, you can use a package like serve to serve the built app
                // sh 'npx serve -s build'
                // Or run a custom server script if you have one
                sh 'npm i'
                sh 'nohup npm start &' // Replace with your server command
            }
        }
    }
}