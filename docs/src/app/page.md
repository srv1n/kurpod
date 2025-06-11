---
title: Kurpod
---

Your own encrypted file vault - self-hosted or on-device - under 10 MB. {% .lead %}

{% quick-links %}

{% quick-link title="What is Kurpod" icon="lightbulb" href="/docs/what-is-kurpod" description="A single encrypted blob that stores your files." /%}

{% quick-link title="Installation" icon="installation" href="/docs/installation" description="Docker one-liner or 8 MB binary." /%}

{% quick-link title="Quick Start" icon="presets" href="/docs/quick-start" description="Create blob, set password, drag files." /%}

{% quick-link title="Hidden Volumes" icon="plugins" href="/docs/plausible-deniability" description="Optional second password, undetectable." /%}

{% /quick-links %}

**Beta release** - expect rough edges.

No accounts. No analytics. Just a password-protected blob that looks like random data.

---

## Try it in 30 seconds

```shell
docker run -it -p 3000:3000 ghcr.io/kurpod/kurpod:latest
open http://localhost:3000
```

Or download the binary:

```shell
# Linux/macOS
curl -L https://github.com/srv1n/kurpod/releases/latest/download/kurpod-$(uname -s)-$(uname -m).tar.gz | tar -xz
./kurpod_server
```


## How it works

1. **Create a blob** - Pick a filename and password
2. **Drag files in** - They're encrypted with XChaCha20-Poly1305
3. **Done** - Server stores opaque bytes

Lose the password? The math wins. We can't help.

---

## Three things to know

| Keep it | Share it | Deny it |
|---------|----------|----------|
| **Private** - files encrypted before server sees them | **Portable** - one blob file to backup/move | **Hidden** - optional 2nd password, undetectable |

## Technical bits

- XChaCha20-Poly1305 (256-bit key, 192-bit nonce)
- Argon2id (64 MiB, 3 passes)
- 8 MB binary, 30 MB Docker image

{% callout type="warning" title="Beta limitations" %}
- Single-user only
- No built-in HTTPS (use reverse proxy)
- Plausible deniability isn't magic - adversary can still demand multiple passwords
- Not audited yet - expect bugs
{% /callout %}

---

## Get help

- [Installation](/docs/installation) - More install options
- [Hidden volumes](/docs/plausible-deniability) - How the 2nd password works
- [GitHub](https://github.com/srv1n/kurpod) - Report bugs

---

**Built in Rust.** Uses public crypto: XChaCha20-Poly1305 + Argon2id.  
**Beta release.** Back up your blobs.