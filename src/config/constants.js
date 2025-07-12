const SUPPORTED_EXTENSIONS = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico', '.tiff', '.tif'],
    videos: ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm', '.m4v', '.3gp', '.ogv']
};

const ALL_SUPPORTED_EXTENSIONS = [
    ...SUPPORTED_EXTENSIONS.images,
    ...SUPPORTED_EXTENSIONS.videos
];

const SERVER_CONFIG = {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
};

module.exports = {
    SUPPORTED_EXTENSIONS,
    ALL_SUPPORTED_EXTENSIONS,
    SERVER_CONFIG
}; 