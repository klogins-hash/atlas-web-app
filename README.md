# Atlas Web App

A beautiful web interface for voice conversations with Atlas AI assistant using Ultravox.

## Features

- 🎙️ Real-time voice conversations
- 💬 Live transcript display
- 📊 Voice status indicators (Listening, Thinking, Speaking)
- 🎨 Beautiful gradient UI
- 🔒 Secure backend proxy (API key protected)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open browser:
```
http://localhost:3001
```

## Architecture

- **Frontend**: Vanilla JavaScript + Ultravox Client SDK
- **Backend**: Express.js proxy server
- **Security**: API key stored server-side only

## Technologies

- Ultravox Client SDK (0.6.0)
- WebRTC for voice
- Express.js backend
- CORS enabled for local development
- Modern CSS with gradients

## How It Works

1. Browser sends request to `/api/create-call`
2. Backend server creates Ultravox call with API key
3. Server returns join URL to browser
4. Browser connects to call via WebRTC (no API key needed)

## Production Deployment

- Set `ULTRAVOX_API_KEY` environment variable
- Remove hardcoded API key from `server.js`
- Configure CORS for your domain
- Use HTTPS for secure WebRTC connections
