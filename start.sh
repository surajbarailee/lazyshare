#!/bin/bash

echo "========================================"
echo "           LazyFileShare Server"
echo "========================================"
echo

if [ -z "$1" ]; then
    echo "Usage: ./start.sh <folder-path>"
    echo "Example: ./start.sh /home/user/Pictures"
    echo
    echo "Please provide a folder path to share."
    exit 1
fi

echo "Starting LazyFileShare server..."
echo "Shared folder: $1"
echo
echo "Server will be available at:"
echo "- Local: http://localhost:3000"
echo "- LAN: http://[YOUR_IP]:3000"
echo
echo "Press Ctrl+C to stop the server"
echo

node server.js "$1" 