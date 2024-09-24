# Create a tarball of the backend files
tar cvzf back-end.tar.gz . --exclude='node_modules' --exclude='.git' --exclude='*.tar.gz'

# Copy the tarball to the server
scp back-end.tar.gz root@139.59.133.159:/var/www/q-project/back-end

# SSH into the server and deploy
ssh root@139.59.133.159 << 'EOF'
  cd /var/www/q-project/back-end
  tar -xzf back-end.tar.gz
  npm install --production
  pm2 restart back-end-app  # Assuming you're using PM2 to manage your Node.js process
  rm back-end.tar.gz
EOF

# Clean up local files
rm back-end.tar.gz