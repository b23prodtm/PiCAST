echo "Starting PiCAST3..."
forever start picast.js
echo "Health check..."
sleep 5
nc -v localhost 3000
