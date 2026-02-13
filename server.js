const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'responses.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load responses from file
let responses = [];
if (fs.existsSync(DATA_FILE)) {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        responses = JSON.parse(data);
    } catch (err) {
        console.error('Error reading data file:', err);
        responses = [];
    }
}

// Helper to save responses
function saveResponses() {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2));
    } catch (err) {
        console.error('Error saving data file:', err);
    }
}

// API Endpoints

// Save a new response
app.post('/api/response', (req, res) => {
    const { name, selectedCat, noAttempts, noReason, finalResponse, qualifyingAnswers } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const newResponse = {
        id: Date.now(),
        name,
        selectedCat: selectedCat || 'Unknown Cat',
        noAttempts,
        noReason,
        finalResponse,
        qualifyingAnswers, // Add new field
        timestamp: new Date().toISOString()
    };

    responses.unshift(newResponse); // Add to the beginning
    saveResponses();
    res.status(201).json(newResponse);
});

// Get all responses (Admin)
app.get('/api/responses', (req, res) => {
    res.json(responses);
});

// Clear all responses (Admin)
app.delete('/api/responses', (req, res) => {
    responses = [];
    saveResponses(); // Clear file
    console.log('All responses cleared');
    res.json({ message: 'All responses cleared' });
});

// Serve Admin Panel
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Admin panel available at http://localhost:${PORT}/admin`);
});
