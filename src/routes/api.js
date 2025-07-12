const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function createApiRoutes(fileService) {
    // Get server info
    router.get('/info', (req, res) => {
        res.json(fileService.getServerInfo());
    });

    // Get all files
    router.get('/files', (req, res) => {
        res.json(fileService.getAllFiles());
    });

    // Get files by type
    router.get('/files/:type', (req, res) => {
        const result = fileService.getFilesByType(req.params.type);
        res.json(result);
    });

    // Serve a specific file
    router.get('/file/:filePath(*)', (req, res) => {
        try {
            const filePath = decodeURIComponent(req.params.filePath);
            const fileInfo = fileService.getFileInfo(filePath);
            
            // Set appropriate headers
            res.setHeader('Content-Type', fileInfo.mimeType);
            res.setHeader('Content-Length', fileInfo.stat.size);
            res.setHeader('Content-Disposition', `inline; filename="${path.basename(fileInfo.fullPath)}"`);
            
            // Stream the file
            const stream = fs.createReadStream(fileInfo.fullPath);
            stream.pipe(res);
        } catch (error) {
            next(error);
        }
    });

    // Refresh file list
    router.post('/refresh', (req, res) => {
        fileService.refreshFiles();
        res.json({ 
            message: 'File list refreshed', 
            totalFiles: fileService.files.length 
        });
    });

    return router;
}

module.exports = createApiRoutes; 