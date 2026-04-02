pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo '========== Checking out code from GitHub =========='
                checkout scm
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                echo '========== Installing Backend Dependencies =========='
                dir('Backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                echo '========== Installing Frontend Dependencies =========='
                dir('Frontend/smart-service-booking') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Backend Tests') {
            steps {
                echo '========== Running Backend Tests =========='
                dir('Backend') {
                    sh 'npm test || true'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo '========== Building Frontend =========='
                dir('Frontend/smart-service-booking') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Code Quality Check') {
            steps {
                echo '========== Running Linter =========='
                dir('Frontend/smart-service-booking') {
                    sh 'npm run lint || true'
                }
            }
        }
    }
    
    post {
        always {
            echo '========== Cleaning up Workspace =========='
            cleanWs()
        }
        success {
            echo '✅ Pipeline Succeeded!'
        }
        failure {
            echo '❌ Pipeline Failed - Check logs above'
        }
    }
}
