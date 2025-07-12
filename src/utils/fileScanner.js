const fs = require('fs');
const path = require('path');
const { ALL_SUPPORTED_EXTENSIONS } = require('../config/constants');

function scanDirectory(dirPath, basePath = '') {
    const files = [];
    
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const relativePath = path.join(basePath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                const subFiles = scanDirectory(fullPath, relativePath);
                files.push(...subFiles);
            } else if (stat.isFile()) {
                const ext = path.extname(item).toLowerCase();
                if (ALL_SUPPORTED_EXTENSIONS.includes(ext)) {
                    files.push({
                        name: item,
                        path: relativePath,
                        fullPath: fullPath,
                        size: stat.size,
                        modified: stat.mtime,
                        type: ext.startsWith('.') ? ext.substring(1) : ext
                    });
                }
            }
        }
    } catch (error) {
        console.error(`Error scanning directory ${dirPath}:`, error.message);
    }
    
    return files;
}

function validateFolderPath(folderPath) {
    if (!fs.existsSync(folderPath)) {
        throw new Error(`Folder "${folderPath}" does not exist.`);
    }
    
    if (!fs.statSync(folderPath).isDirectory()) {
        throw new Error(`"${folderPath}" is not a directory.`);
    }
    
    return true;
}

module.exports = {
    scanDirectory,
    validateFolderPath
}; 