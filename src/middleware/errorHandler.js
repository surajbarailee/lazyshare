function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    
    if (err.message === 'Access denied') {
        return res.status(403).json({ error: 'Access denied' });
    }
    
    if (err.message === 'File not found') {
        return res.status(404).json({ error: 'File not found' });
    }
    
    if (err.message === 'Not a file') {
        return res.status(400).json({ error: 'Not a file' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler; 