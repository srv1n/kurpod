---
title: Reverse proxy setup
nextjs:
  metadata:
    title: Reverse proxy setup
    description: Configure Nginx, Apache, or Caddy as a reverse proxy for secure HTTPS access to your Kurpod server.
---

Set up a reverse proxy to access your Kurpod server securely over HTTPS, enable custom domains, and add additional security layers. This guide covers popular reverse proxy configurations. {% .lead %}

---

## Why use a reverse proxy?

A reverse proxy provides several benefits:

- **HTTPS encryption**: Secure connection between client and proxy
- **Custom domain**: Access via `files.yourdomain.com`
- **Additional security**: Rate limiting, IP filtering, DDoS protection
- **Load balancing**: Distribute traffic across multiple servers
- **Caching**: Improve performance for static assets
- **Hide origin**: Conceal actual server location

{% callout type="note" title="End-to-end encryption" %}
Kurpod already encrypts all data client-side. The reverse proxy adds transport security (HTTPS) but doesn't see your decrypted files.
{% /callout %}

---

## Nginx configuration

### Basic HTTPS setup

Install Nginx and configure for Kurpod:

```nginx
# /etc/nginx/sites-available/kurpod
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name files.yourdomain.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/files.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/files.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy settings
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_read_timeout 86400;
    }

    # Increase upload size for large files
    client_max_body_size 5G;
    proxy_request_buffering off;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name files.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### Advanced Nginx features

**Rate limiting**
```nginx
# Define rate limit zone
limit_req_zone $binary_remote_addr zone=kurpod:10m rate=10r/s;

# Apply to location
location / {
    limit_req zone=kurpod burst=20 nodelay;
    proxy_pass http://localhost:3000;
}
```

**IP whitelisting**
```nginx
# Allow only specific IPs
location / {
    allow 192.168.1.0/24;
    allow 10.0.0.0/8;
    deny all;
    
    proxy_pass http://localhost:3000;
}
```

**Caching static assets**
```nginx
# Cache static files
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 1d;
    proxy_cache kurpod_cache;
    add_header X-Cache-Status $upstream_cache_status;
}
```

### SSL with Let's Encrypt

Automate SSL certificate management:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d files.yourdomain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

---

## Apache configuration

### Basic setup

Configure Apache as reverse proxy:

```apache
# /etc/apache2/sites-available/kurpod.conf
<VirtualHost *:443>
    ServerName files.yourdomain.com
    
    # Enable modules
    # a2enmod proxy proxy_http proxy_wstunnel ssl headers

    # SSL configuration
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/files.yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/files.yourdomain.com/privkey.pem
    SSLProtocol -all +TLSv1.2 +TLSv1.3
    
    # Security headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    
    # Proxy configuration
    ProxyRequests Off
    ProxyPreserveHost On
    
    # WebSocket proxy
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
    
    # HTTP proxy
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    
    # Large file support
    LimitRequestBody 5368709120
</VirtualHost>

# HTTP to HTTPS redirect
<VirtualHost *:80>
    ServerName files.yourdomain.com
    Redirect permanent / https://files.yourdomain.com/
</VirtualHost>
```

### Apache security

**ModSecurity WAF**
```apache
# Install ModSecurity
sudo apt install libapache2-mod-security2

# Enable in VirtualHost
<IfModule mod_security2.c>
    SecRuleEngine On
    SecRequestBodyLimit 5368709120
    SecRequestBodyNoFilesLimit 65536
</IfModule>
```

**Access control**
```apache
# IP-based restrictions
<Location />
    Require ip 192.168.1.0/24
    Require ip 10.0.0.0/8
</Location>
```

---

## Caddy configuration

### Simple setup

Caddy provides automatic HTTPS:

```caddyfile
# /etc/caddy/Caddyfile
files.yourdomain.com {
    # Automatic HTTPS with Let's Encrypt
    
    # Reverse proxy
    reverse_proxy localhost:3000 {
        # WebSocket support
        header_up Upgrade {http.request.header.Upgrade}
        header_up Connection {http.request.header.Connection}
    }
    
    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
        -Server
    }
    
    # Large uploads
    request_body {
        max_size 5GB
    }
}
```

### Advanced Caddy features

**Rate limiting**
```caddyfile
files.yourdomain.com {
    rate_limit {
        zone dynamic {
            key {remote_host}
            events 100
            window 1m
        }
    }
    
    reverse_proxy localhost:3000
}
```

**Basic authentication**
```caddyfile
files.yourdomain.com {
    basicauth /* {
        admin $2a$14$5iLmVCdR.J3qHzs.k0mYpeD3gqKHqKJ8oD5Zc1yQoGDVkqD3hvwNa
    }
    
    reverse_proxy localhost:3000
}
```

---

## Traefik configuration

### Docker setup

For containerized deployments:

```yaml
# docker-compose.yml
version: '3.8'

services:
  traefik:
    image: traefik:v2.9
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.yml:/traefik.yml
      - ./acme.json:/acme.json
    labels:
      - "traefik.http.routers.api.rule=Host(`traefik.yourdomain.com`)"
      - "traefik.http.routers.api.service=api@internal"

  kurpod:
    image: kurpod/kurpod:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.kurpod.rule=Host(`files.yourdomain.com`)"
      - "traefik.http.routers.kurpod.entrypoints=websecure"
      - "traefik.http.routers.kurpod.tls.certresolver=letsencrypt"
      - "traefik.http.services.kurpod.loadbalancer.server.port=3000"
    volumes:
      - ./blobs:/app/blobs
```

### Traefik configuration

```yaml
# traefik.yml
api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      email: admin@yourdomain.com
      storage: acme.json
      httpChallenge:
        entryPoint: web

providers:
  docker:
    exposedByDefault: false
```

---

## Security best practices

### Headers configuration

Essential security headers for all proxies:

```javascript
// Required headers
{
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
}
```

### DDoS protection

**Cloudflare integration**
```nginx
# Trust Cloudflare IPs only
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
# ... add all Cloudflare ranges
real_ip_header CF-Connecting-IP;
```

**Rate limiting strategies**
```nginx
# Multiple rate limit zones
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;
limit_req_zone $binary_remote_addr zone=upload:10m rate=1r/s;

# Apply different limits
location /api/auth {
    limit_req zone=login burst=5 nodelay;
}
location /api/upload {
    limit_req zone=upload burst=2;
}
```

### Monitoring

**Access logs**
```nginx
# Custom log format
log_format kurpod '$remote_addr - $remote_user [$time_local] '
                  '"$request" $status $body_bytes_sent '
                  '"$http_referer" "$http_user_agent" '
                  '$request_time $upstream_response_time';

access_log /var/log/nginx/kurpod_access.log kurpod;
```

**Fail2ban integration**
```ini
# /etc/fail2ban/jail.local
[kurpod]
enabled = true
port = https
filter = kurpod
logpath = /var/log/nginx/kurpod_access.log
maxretry = 5
bantime = 3600
```

---

## Troubleshooting

### Common issues

**502 Bad Gateway**
- Check Kurpod is running: `systemctl status kurpod`
- Verify proxy_pass URL is correct
- Check firewall allows connection

**WebSocket connection failed**
- Ensure WebSocket headers are set
- Check timeout settings
- Verify upgrade headers are passed

**SSL certificate errors**
- Check certificate paths
- Verify domain DNS
- Test with `curl -v https://yourdomain.com`

### Testing configuration

**Nginx syntax check**
```bash
nginx -t
```

**Apache syntax check**
```bash
apache2ctl configtest
```

**Test headers**
```bash
curl -I https://files.yourdomain.com
```

**WebSocket test**
```javascript
// Browser console
const ws = new WebSocket('wss://files.yourdomain.com/ws');
ws.onopen = () => console.log('WebSocket connected');
ws.onerror = (e) => console.error('WebSocket error:', e);
```

### Performance optimization

**Enable HTTP/2**
```nginx
listen 443 ssl http2;
```

**Compression**
```nginx
gzip on;
gzip_types text/plain application/json application/javascript text/css;
gzip_min_length 1000;
```

**Connection pooling**
```nginx
upstream kurpod_backend {
    server localhost:3000;
    keepalive 32;
}
```

{% callout title="Next steps" %}
After setting up your reverse proxy, explore [backup strategies](/docs/backup-strategies) to ensure your encrypted data is safely backed up, or review [security best practices](/docs/security-best-practices) for additional hardening.
{% /callout %}