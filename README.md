# LazyShare

A simple, clean file sharing server for LAN networks. Share images and videos from any folder on your local network.

## Features

- 📁 **Simple Setup** - Just point to a folder and start sharing
- 🖼️ **Image Support** - JPG, PNG, GIF, BMP, WebP, SVG, ICO, TIFF
- 🎥 **Video Support** - MP4, AVI, MKV, MOV, WMV, FLV, WebM, M4V, 3GP, OGV
- 🌐 **Web Interface** - Clean, responsive UI for browsing files
- 🔄 **Auto Refresh** - Automatically scans for new files
- 📱 **Mobile Friendly** - Works on all devices
- 🔒 **Secure** - Only serves files from the specified directory

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the server:**

   ```bash
   node server.js <folder-path>
   ```

   Example:

   ```bash
   node server.js C:\Users\YourName\Pictures
   ```

3. **Open your browser:**
   - Local: `http://localhost:3000`
   - LAN: `http://[YOUR_IP]:3000`

## Project Structure

```
lazyshare/
├── server.js              # Main server entry point
├── package.json           # Dependencies and scripts
├── public/
│   └── index.html        # Web interface
└── src/
    ├── config/
    │   └── constants.js  # Configuration constants
    ├── middleware/
    │   └── errorHandler.js # Error handling middleware
    ├── routes/
    │   └── api.js        # API route definitions
    ├── services/
    │   └── fileService.js # File operations service
    └── utils/
        └── fileScanner.js # File scanning utilities
```

## API Endpoints

- `GET /api/info` - Server information
- `GET /api/files` - List all files
- `GET /api/files/:type` - List files by type (images/videos)
- `GET /api/file/:path` - Serve a specific file
- `POST /api/refresh` - Refresh file list

## Development

```bash
# Start with auto-reload
npm run dev

# Start production server
npm start
```

## Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **mime-types** - MIME type detection
- **nodemon** - Development auto-reload (dev dependency)

## License

MIT
