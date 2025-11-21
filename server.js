const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// CORS configuration
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

const AGENT_ID = '616f73b8-0566-4b31-b10e-8059c6b6c67d';
const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY || 'GnfASaPx.Hzq2OqJE7rYEjqRfD4esMTlkEUVmVbOb';

// Endpoint to create an Ultravox call
app.post('/api/create-call', async (req, res) => {
    try {
        console.log('Creating Ultravox call...');

        const response = await fetch(`https://api.ultravox.ai/api/agents/${AGENT_ID}/calls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': ULTRAVOX_API_KEY
            },
            body: JSON.stringify({
                medium: { webrtc: {} }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ultravox API error:', errorText);
            return res.status(response.status).json({
                error: 'Failed to create call',
                details: errorText
            });
        }

        const data = await response.json();
        console.log('Call created successfully, joinUrl:', data.joinUrl);

        res.json({ joinUrl: data.joinUrl });
    } catch (error) {
        console.error('Error creating call:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📱 Open http://localhost:${PORT} to use the app`);
});
