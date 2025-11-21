# Atlas Web App - Docker SSH Deployment Guide

## Prerequisites

Before deploying to your remote server, you need:
1. SSH access to your remote server
2. Docker installed on the remote server
3. Your Ultravox API key

## Deployment Steps

### 1. SSH into your remote server

```bash
ssh user@your-server.com
```

### 2. Clone the repository on the server

```bash
git clone https://github.com/klogins-hash/atlas-web-app.git
cd atlas-web-app
```

### 3. Build the Docker image on the server

```bash
docker build -t atlas-app .
```

### 4. Run the container

```bash
docker run -d \
  -p 3001:3001 \
  -e ULTRAVOX_API_KEY=GnfASaPx.Hzq2OqJE7rYEjqRfD4esMTlkEUVmVbOb \
  --name atlas-app \
  --restart unless-stopped \
  atlas-app
```

### 5. Verify the deployment

```bash
docker ps
docker logs atlas-app
```

### 6. Access the app

Open your browser to: `http://your-server.com:3001`

## Alternative: Push Image from Local Machine

If you prefer to build locally and push to the server:

### 1. Save the Docker image locally

```bash
docker save atlas-app:latest | gzip > atlas-app.tar.gz
```

### 2. Transfer to server

```bash
scp atlas-app.tar.gz user@your-server.com:/tmp/
```

### 3. Load on server

```bash
ssh user@your-server.com
docker load < /tmp/atlas-app.tar.gz
docker run -d -p 3001:3001 -e ULTRAVOX_API_KEY=GnfASaPx.Hzq2OqJE7rYEjqRfD4esMTlkEUVmVbOb --name atlas-app --restart unless-stopped atlas-app
```

## Updating the Deployment

To update after making changes:

```bash
# On server
cd atlas-web-app
git pull
docker stop atlas-app
docker rm atlas-app
docker build -t atlas-app .
docker run -d -p 3001:3001 -e ULTRAVOX_API_KEY=GnfASaPx.Hzq2OqJE7rYEjqRfD4esMTlkEUVmVbOb --name atlas-app --restart unless-stopped atlas-app
```

## Environment Variables

For production, consider using a `.env` file instead of passing the API key directly:

```bash
# Create .env file on server
echo "ULTRAVOX_API_KEY=GnfASaPx.Hzq2OqJE7rYEjqRfD4esMTlkEUVmVbOb" > .env

# Run with env file
docker run -d -p 3001:3001 --env-file .env --name atlas-app --restart unless-stopped atlas-app
```

## Firewall Configuration

Make sure port 3001 is open on your server firewall:

```bash
# For Ubuntu/Debian with ufw
sudo ufw allow 3001/tcp

# For CentOS/RHEL with firewalld
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

## Security Notes

1. **API Key**: Consider using environment variables or secrets management
2. **HTTPS**: Set up a reverse proxy (nginx/traefik) with SSL certificates
3. **Firewall**: Only expose necessary ports
4. **Updates**: Keep Docker and the host system updated

## Troubleshooting

### Container won't start
```bash
docker logs atlas-app
```

### Check if port is already in use
```bash
netstat -tuln | grep 3001
```

### Restart container
```bash
docker restart atlas-app
```

## Need Help?

Please provide:
- Your SSH server address (e.g., user@server.com)
- Preferred port for the application
- Any specific firewall or networking requirements
