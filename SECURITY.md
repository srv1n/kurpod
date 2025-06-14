# Security Policy

## Reporting Security Vulnerabilities

The Kurpod team takes security seriously. We appreciate your efforts to responsibly disclose your findings.

### DO NOT

- **Do not** report security issues through GitHub issues
- **Do not** report security issues on public forums
- **Do not** exploit vulnerabilities beyond POC

### DO

Please report security vulnerabilities by emailing:

**security@kurpod.com**

Include:
- Vulnerability description
- Steps to reproduce
- Potential impact assessment
- Suggested remediation (optional)
- Your contact information

### Response Timeline

- **24 hours**: Initial acknowledgment
- **72 hours**: Preliminary assessment
- **7 days**: Detailed response with timeline
- **90 days**: Public disclosure (coordinated)

## Security Features

### Cryptographic Implementation

- **Algorithm**: XChaCha20-Poly1305 (IETF standard)
- **Key Derivation**: Argon2id (Memory: 64MB, Iterations: 3, Parallelism: 1)
- **Nonce Generation**: OS CSPRNG (192-bit nonces)
- **Authentication**: Encrypt-then-MAC with Poly1305

### Security Guarantees

1. **Zero-Knowledge**: Server never accesses plaintext data or passwords
2. **Forward Secrecy**: Each file uses unique encryption keys
3. **Tamper Detection**: AEAD prevents undetected modifications
4. **Side-Channel Resistance**: Constant-time crypto operations

### Threat Model

We protect against:
- ✅ Server compromise
- ✅ Network eavesdropping
- ✅ Offline brute-force attacks
- ✅ Tampering with encrypted data
- ✅ Metadata analysis (file names/structure encrypted)

We do NOT protect against:
- ❌ Compromised client device
- ❌ Keyloggers or screen capture
- ❌ Weak user passwords
- ❌ Physical access to unlocked session
- ❌ Nation-state adversaries with unlimited resources

## Best Practices for Users

### Password Requirements

- Minimum 12 characters recommended
- Use unique passwords for each blob
- Consider using a password manager
- Enable hidden volumes for sensitive data

### Operational Security

1. **Access Control**
   - Use HTTPS in production
   - Implement IP whitelisting
   - Use VPN for remote access
   - Enable rate limiting

2. **Deployment**
   - Run as non-root user
   - Use read-only filesystem
   - Implement network segmentation
   - Regular security updates

3. **Monitoring**
   - Enable audit logging
   - Monitor failed login attempts
   - Set up intrusion detection
   - Regular security scans

## Security Audit History

| Date | Version | Auditor | Report |
|------|---------|---------|--------|
| TBD  | 1.0.0   | TBD     | [Link] |

## Hardening Guide

### Docker Deployment

```yaml
# docker-compose.yml security settings
security_opt:
  - no-new-privileges:true
  - seccomp:unconfined
cap_drop:
  - ALL
cap_add:
  - CHOWN
  - SETUID
  - SETGID
read_only: true
```

### Nginx Configuration

```nginx
# Security headers
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;

# Rate limiting
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req zone=login burst=5 nodelay;
```

### System Hardening

```bash
# File permissions
chmod 600 /data/*.blob
chown kurpod:kurpod /data/*.blob

# Firewall rules
ufw allow 3000/tcp
ufw default deny incoming
ufw enable

# Fail2ban configuration
# See /docs/fail2ban.conf
```

## Compliance

Kurpod is designed to help with:
- GDPR Article 32 (Security of processing)
- HIPAA Security Rule (when properly configured)
- PCI DSS Requirement 3 (Protect stored data)

**Note**: Compliance requires proper configuration and operational procedures.

## Security Updates

Subscribe to security announcements:
- GitHub Security Advisories
- Mailing list: security-announce@kurpod.example.com
- RSS feed: https://kurpod.io/security.xml

## Bug Bounty Program

We run a bug bounty program for responsible disclosure:

| Severity | Bounty |
|----------|--------|
| Critical | $1000-5000 |
| High     | $500-1000 |
| Medium   | $100-500 |
| Low      | $50-100 |

See https://kurpod.io/bug-bounty for details.

## Contact

- Security issues: security@kurpod.com
- PGP key: https://kurpod.io/security.asc
- General inquiries: hello@kurpod.example.com