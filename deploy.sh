#!/bin/bash

# Set variables
REMOTE_USER="kbitar"
REMOTE_HOST="139.59.133.159"
REMOTE_PORT="22"  # Assuming default SSH port, change if different
REMOTE_PATH="/var/www/q-project/back-end"
BUILD_FILE="back-end.tar.gz"

# Function to handle errors
handle_error() {
    echo "Error: $1"
    exit 1
}

# Create a tarball of the backend files
tar cvzf $BUILD_FILE . --exclude='node_modules' --exclude='.git' --exclude='*.tar.gz' || handle_error "Failed to create tar file"

# Copy the tarball to the server
echo "Attempting to copy file to remote server..."
scp -P $REMOTE_PORT -v -o ConnectTimeout=30 $BUILD_FILE $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH || handle_error "Failed to copy file to remote server"

# SSH into the server and deploy
echo "Attempting to execute commands on remote server..."
ssh -p $REMOTE_PORT -v -o ConnectTimeout=30 $REMOTE_USER@$REMOTE_HOST << EOF || handle_error "Failed to execute commands on remote server"
    cd $REMOTE_PATH
    tar -xzf $BUILD_FILE
    npm install --production
    pm2 restart back-end-app  # Assuming you're using PM2 to manage your Node.js process
    rm $BUILD_FILE
EOF

# Clean up local files
rm $BUILD_FILE

echo "Deployment completed successfully!"
