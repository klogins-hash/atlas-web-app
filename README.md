# Atlas Web App

A beautiful web interface for voice conversations with Atlas AI assistant using Ultravox.

## Features

- 🎙️ Real-time voice conversations
- 💬 Live transcript display
- 📊 Voice status indicators (Listening, Thinking, Speaking)
- 🎨 Beautiful gradient UI

## Current Status

⚠️ **CORS Issue**: Direct browser API calls are blocked by Ultravox's security policy. Needs backend proxy.

## Setup

1. Serve the app:
```bash
python3 -m http.server 5050
```

2. Open browser:
```
http://localhost:5050
```

## Known Issues

- **CORS Error**: Browser cannot directly use API key with Ultravox API
- **Solution Needed**: Backend server to proxy call creation

## Technologies

- Ultravox Client SDK (0.6.0)
- WebRTC for voice
- Vanilla JavaScript
- Modern CSS with gradients

## Security Note

⚠️ API key is currently embedded in HTML (insecure). Move to backend server for production.
