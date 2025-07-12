const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');

const { SERVER_CONFIG } = require('./src/config/constants');
const { validateFolderPath } = require('./src/utils/fileScanner');
const FileService = require('./src/services/fileService');
const createApiRoutes = require('./src/routes/api');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Get command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Usage: node server.js <folder-path>');
    console.log('Example: node server.js C:\\Users\\YourName\\Pictures');
    process.exit(1);
}

const sharedFolderPath = args[0];

// Validate the folder path
try {
    validateFolderPath(sharedFolderPath);
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}

// Initialize file service
const fileService = new FileService(sharedFolderPath);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API routes
app.use('/api', createApiRoutes(fileService));

// Serve the web interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(SERVER_CONFIG.port, SERVER_CONFIG.host, () => {
    console.log(`
🚀 LazyFileShare Server Started!
    
📁 Shared Folder: ${sharedFolderPath}
🌐 Server URL: http://localhost:${SERVER_CONFIG.port}
🌍 LAN URL: http://[YOUR_IP]:${SERVER_CONFIG.port}
    
📊 Found ${fileService.files.length} supported files
📱 Open your browser and navigate to the URL above
    
Press Ctrl+C to stop the server
    `);
    
    // Get local IP address
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                console.log(`🌍 LAN Access: http://${interface.address}:${SERVER_CONFIG.port}`);
            }
        }
    }
}); 