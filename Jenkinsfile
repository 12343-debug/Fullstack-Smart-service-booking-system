pipeline {
    agent any
    
    environment {
        NODE_ENV = 'production'
        MONGODB_URI = credentials('mongodb-uri')
        JWT_SECRET = credentials('jwt-secret')
        EMAIL_USER = credentials('email-user')
        EMAIL_PASS = credentials('email-pass')
        AWS_REGION = 'us-east-1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Backend dependencies...'
                dir('Backend') {
                    sh 'npm install'
                }
                
                echo 'Installing Frontend dependencies...'
                dir('Frontend/smart-service-booking') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Backend Tests') {
            steps {
                echo 'Running Backend tests...'
                dir('Backend') {
                    sh 'npm test'
                }
            }
        }
        
        stage('Frontend Build') {
            steps {
                echo 'Building Frontend...'
                dir('Frontend/smart-service-booking') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Code Quality Analysis') {
            steps {
                echo 'Running ESLint...'
                dir('Frontend/smart-service-booking') {
                    sh 'npm run lint || true'
                }
            }
        }
        
        stage('Deploy to AWS') {
            steps {
                echo 'Deploying to AWS...'
                script {
                    // Deploy backend (if using CodeDeploy or similar)
                    sh '''
                        echo "Deploying Backend..."
                        # Add your deployment script here
                    '''
                    
                    // Deploy frontend to S3
                    sh '''
                        echo "Deploying Frontend to S3..."
                        aws s3 sync Frontend/smart-service-booking/dist s3://your-bucket-name --delete
                    '''
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh '''
                    sleep 10
                    curl -f http://your-app-url || exit 1
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
            // Add email notification
        }
        failure {
            echo 'Pipeline failed!'
            // Add email notification
        }
    }
}
