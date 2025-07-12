const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { scanDirectory } = require('../utils/fileScanner');
const { SUPPORTED_EXTENSIONS } = require('../config/constants');

class FileService {
    constructor(sharedFolderPath) {
        this.sharedFolderPath = sharedFolderPath;
        this.files = [];
        this.refreshFiles();
    }
    
    refreshFiles() {
        console.log(`Scanning directory: ${this.sharedFolderPath}`);
        this.files = scanDirectory(this.sharedFolderPath);
        console.log(`Found ${this.files.length} supported files`);
    }
    
    getAllFiles() {
        return {
            files: this.files,
            total: this.files.length
        };
    }
    
    getFilesByType(type) {
        const typeLower = type.toLowerCase();
        let extensions = [];
        
        if (typeLower === 'images') {
            extensions = SUPPORTED_EXTENSIONS.images;
        } else if (typeLower === 'videos') {
            extensions = SUPPORTED_EXTENSIONS.videos;
        } else {
            return { files: [], total: 0, type: typeLower };
        }
        
        const filteredFiles = this.files.filter(file => 
            extensions.includes(`.${file.type}`)
        );
        
        return {
            files: filteredFiles,
            total: filteredFiles.length,
            type: typeLower
        };
    }
    
    getFileInfo(filePath) {
        const fullPath = path.join(this.sharedFolderPath, filePath);
        
        // Security check - ensure the file is within the shared folder
        const normalizedFullPath = path.resolve(fullPath);
        const normalizedSharedPath = path.resolve(this.sharedFolderPath);
        
        if (!normalizedFullPath.startsWith(normalizedSharedPath)) {
            throw new Error('Access denied');
        }
        
        if (!fs.existsSync(fullPath)) {
            throw new Error('File not found');
        }
        
        const stat = fs.statSync(fullPath);
        if (!stat.isFile()) {
            throw new Error('Not a file');
        }
        
        return {
            fullPath,
            stat,
            mimeType: mime.lookup(fullPath) || 'application/octet-stream'
        };
    }
    
    getServerInfo() {
        return {
            sharedFolder: this.sharedFolderPath,
            totalFiles: this.files.length,
            supportedExtensions: Object.values(SUPPORTED_EXTENSIONS).flat(),
            serverTime: new Date().toISOString()
        };
    }
}

module.exports = FileService; 