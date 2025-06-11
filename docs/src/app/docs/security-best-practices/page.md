---
title: Security best practices
---

Follow these security best practices to maximize your protection when using Kurpod. Security is a shared responsibility. {% .lead %}

---

## Password security

### Creating strong passwords

Your password is the only thing protecting your files. Make it count:

**Recommended approach**:
```
Method 1: Diceware passphrase (6+ words)
Example: "correct horse battery staple moon orbit"
Entropy: ~77 bits

Method 2: Random characters (20+)
Example: "Kj8#mN2$pQ9&xR5@vL3*"
Entropy: ~130 bits

Method 3: Sentence-based
Example: "My-2-dogs-eat-Pizza-every-Friday-at-8pm!"
Entropy: ~100 bits
```

**Password requirements**:
- Minimum 12 characters (20+ recommended)
- Mix of uppercase, lowercase, numbers, symbols
- No personal information
- Unique to Kurpod
- Different for standard/hidden volumes

### Managing passwords

Never compromise your passwords:

✅ **Do**:
- Use a password manager (Bitwarden, 1Password, KeePass)
- Write down and secure physically (safe/safety deposit box)
- Use memory techniques for passphrases
- Regular password rotation for high-security use

❌ **Don't**:
- Save in browser (except password manager)
- Share with anyone
- Use variations of same password
- Store in plain text files
- Email or message passwords

### Password strategies

For plausible deniability:

**Standard volume password**:
- Memorable but strong
- Related to cover story
- Example: "MyFamilyPhotos2024!Secure"

**Hidden volume password**:
- Maximum strength
- Completely unrelated
- Example: "Kx9#mQ2$zN8&wR5@bL3*yT7%"

---

## Operational security

### Access patterns

Maintain plausible deniability through behavior:

**Good practices**:
```
Week 1:
- Mon-Fri: Access standard volume daily
- Sat: Quick hidden volume access (5 min)
- Sun: Standard volume maintenance

Week 2:
- Regular standard volume use
- No hidden access
- Add new files to standard
```

**Bad practices**:
- Only accessing hidden volume
- Never using standard volume
- Predictable hidden access schedule
- Immediate hidden access after setup

### Network security

Protect your connection:

1. **Always use HTTPS**:
   ```nginx
   # Force HTTPS redirect
   server {
       listen 80;
       return 301 https://$server_name$request_uri;
   }
   ```

2. **VPN for remote access**:
   - Use reputable VPN provider
   - Enable kill switch
   - Verify no DNS leaks

3. **Tor for maximum anonymity**:
   ```bash
   # Access via Tor Browser
   http://your-onion-address.onion
   ```

### Device security

Secure your endpoints:

**Computer**:
- Full disk encryption (BitLocker/FileVault/LUKS)
- Strong login password
- Automatic lock screen (5 minutes)
- Secure boot enabled
- Antivirus updated

**Browser**:
- Use private/incognito mode
- Clear cache after hidden access
- Disable password saving
- Use browser extensions carefully
- Regular security updates

**Mobile**:
- Biometric + PIN lock
- Remote wipe enabled
- Avoid public WiFi
- Use mobile VPN
- Don't root/jailbreak

---

## Data handling

### Before upload

Prepare files securely:

1. **Remove metadata**:
   ```bash
   # Images
   exiftool -all= sensitive.jpg
   
   # PDFs
   qpdf --linearize --replace-input file.pdf
   
   # Office docs
   # Use "Inspect Document" feature
   ```

2. **Secure deletion of originals**:
   ```bash
   # Linux/Mac
   shred -vfz sensitive-file.doc
   
   # Windows
   cipher /w:C:\folder
   ```

3. **Verify file contents**:
   - No hidden data
   - No personal information
   - No location data
   - No revision history

### During use

Minimize exposure:

- Work offline when possible
- Close unnecessary programs
- Disable cloud sync
- Use dedicated browser profile
- Monitor system resources

### After access

Clean up traces:

1. **Clear browser data**:
   - Cache
   - Cookies
   - Local storage
   - Session data

2. **Secure temporary files**:
   ```bash
   # Find and remove
   find /tmp -name "*kurpod*" -exec shred {} \;
   ```

3. **Memory clearing**:
   - Log out properly
   - Close browser completely
   - Consider system restart

---

## Backup security

### Backup strategy

Protect backups as carefully as originals:

**3-2-1 Rule**:
- 3 copies of data
- 2 different storage types
- 1 offsite backup

**Implementation**:
```bash
#!/bin/bash
# Secure backup script

# Variables
SOURCE="/var/lib/kurpod/storage.blob"
DATE=$(date +%Y%m%d)
BACKUP1="/backup/local/kurpod_$DATE.blob"
BACKUP2="/mnt/nas/kurpod_$DATE.blob"

# Create backups
cp $SOURCE $BACKUP1
cp $SOURCE $BACKUP2

# Encrypt backup
gpg --cipher-algo AES256 -c $BACKUP1

# Sync offsite (already encrypted)
rclone copy $BACKUP1.gpg remote:kurpod-backups/
```

### Backup testing

Regularly verify backups:

1. **Monthly verification**:
   ```bash
   # Test restore
   cp backup.blob test.blob
   kurpod_tool verify --blob test.blob
   ```

2. **Document process**:
   - Backup locations
   - Restore procedures
   - Password storage
   - Contact information

---

## Physical security

### Hardware protection

Secure your infrastructure:

**Server**:
- Locked room/cabinet
- Security cameras
- Access logging
- Temperature monitoring
- UPS protection

**Storage**:
- Encrypted drives
- RAID redundancy
- Secure disposal
- Physical locks
- Tamper detection

### Travel security

When crossing borders:

1. **Before travel**:
   - Backup everything
   - Wipe devices
   - Use cloud access only
   - Prepare cover story

2. **During travel**:
   - Minimal data carry
   - Use standard volume only
   - Avoid accessing hidden
   - Use VPN always

3. **Border crossing**:
   - Be prepared to unlock
   - Show standard volume
   - Remain calm
   - Know your rights

---

## Threat-specific guidance

### Journalists

Protecting sources:

- Separate volume for each story
- Regular password rotation
- Secure communication only
- Dead man's switch backup
- Legal counsel ready

### Activists

Operating in hostile environments:

- Assume surveillance
- Use Tor always
- Minimal digital footprint
- Trusted device only
- Emergency procedures ready

### Business

Protecting trade secrets:

- Access logging enabled
- Regular security audits
- Employee training
- Incident response plan
- Legal compliance verified

### Personal

Family privacy:

- Simple passwords for standard
- Complex for sensitive
- Regular backups
- Share recovery info
- Document for family

---

## Emergency procedures

### Compromise suspected

Immediate actions:

1. **Lock storage**:
   ```bash
   curl -X POST http://localhost:3000/api/lock
   ```

2. **Change passwords** (if safe)

3. **Rotate encryption**:
   - Create new blob
   - Migrate data
   - Destroy old blob

4. **Document incident**:
   - What happened
   - When noticed
   - What exposed
   - Actions taken

### Under duress

If forced to unlock:

1. **Provide standard password** only
2. **Act naturally** - this is your only volume
3. **Don't mention** hidden volume
4. **Follow instructions** calmly
5. **Change everything** when safe

### Data destruction

If necessary:

```bash
# Quick wipe
dd if=/dev/urandom of=storage.blob bs=1M

# Thorough wipe
shred -vfz -n 10 storage.blob

# Physical destruction
# Drill/hammer for SSDs
# Degausser for HDDs
```

---

## Security checklist

### Daily
- [ ] Check access logs
- [ ] Verify HTTPS working
- [ ] Monitor storage space
- [ ] Review active sessions

### Weekly
- [ ] Test backup restore
- [ ] Update software
- [ ] Review permissions
- [ ] Check for anomalies

### Monthly
- [ ] Full security audit
- [ ] Password strength review
- [ ] Update documentation
- [ ] Test emergency procedures

### Quarterly
- [ ] Penetration testing
- [ ] Security training
- [ ] Policy review
- [ ] Threat model update

---

## Common mistakes to avoid

### Technical mistakes

1. **Weak passwords** - Use 20+ characters
2. **Password reuse** - Unique for each volume
3. **No backups** - Follow 3-2-1 rule
4. **Ignoring updates** - Patch regularly
5. **HTTP usage** - Always use HTTPS

### Operational mistakes

1. **Predictable patterns** - Vary access times
2. **Over-sharing** - Need-to-know only
3. **Poor hygiene** - Clean up traces
4. **Complacency** - Stay vigilant
5. **No practice** - Drill procedures

### Strategic mistakes

1. **Over-reliance** - Defense in depth
2. **Under-estimation** - Know threats
3. **Poor planning** - Document everything
4. **Isolation** - Get help when needed
5. **Perfection** - Good enough security

---

## Summary

Security best practices for Kurpod:

1. **Strong passwords** are non-negotiable
2. **Operational security** requires discipline
3. **Regular backups** prevent disasters
4. **Physical security** matters too
5. **Emergency plans** must be ready
6. **Continuous improvement** is essential

Remember: The strongest encryption is useless with poor practices. Security is a journey, not a destination.

For specific threat models, see:
- [Threat model](/docs/threat-model)
- [Security model](/docs/security-model)
- [Incident response](/docs/incident-response)