#!/bin/bash

# Stop any existing backend processes
pkill -f "node server.js"
sleep 2

# Start the backend
cd /app/backend
nohup node server.js > /var/log/backend.log 2>&1 &

echo "Backend started. Check logs at /var/log/backend.log"
