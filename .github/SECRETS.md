# GitHub Secrets Configuration

This document outlines the required GitHub secrets for the CI/CD workflows in this repository.

## Required Secrets

### Apple Code Signing (macOS Releases)

These secrets are required for signing and notarizing macOS binaries:

- **APPLE_DEVELOPER_CERTIFICATE_P12_BASE64**: Base64-encoded .p12 certificate file
  - Export your Developer ID Application certificate from Keychain Access
  - Convert to base64: `base64 -i certificate.p12 | pbcopy`

- **APPLE_DEVELOPER_CERTIFICATE_PASSWORD**: Password for the .p12 certificate

- **APPLE_DEVELOPER_CERTIFICATE_ID**: Certificate identity (usually "Developer ID Application: Your Name (TEAM_ID)")
  - Find this with: `security find-identity -v -p codesigning`

- **APPLE_ID**: Your Apple ID email address (for notarization)

- **APPLE_APP_PASSWORD**: App-specific password for your Apple ID
  - Generate at: https://appleid.apple.com/account/manage/section/security
  - Select "Generate Password" under "App-Specific Passwords"

- **APPLE_TEAM_ID**: Your Apple Developer Team ID
  - Find in Apple Developer Portal or with: `xcrun altool --list-providers -u "your@email.com" -p "@keychain:AC_PASSWORD"`

### Linux Binary Signing (GPG)

These secrets are required for GPG signing of Linux binaries:

- **GPG_PRIVATE_KEY**: Your GPG private key in ASCII armor format
  - Export with: `gpg --armor --export-secret-key your-key-id`

- **GPG_PASSPHRASE**: Passphrase for your GPG private key

- **GPG_KEY_ID**: Your GPG key ID
  - Find with: `gpg --list-secret-keys --keyid-format=long`

## Setup Instructions

### 1. Apple Developer Setup

1. Join the Apple Developer Program ($99/year)
2. Create a Developer ID Application certificate in Xcode or Apple Developer Portal
3. Export the certificate as a .p12 file with a password
4. Generate an app-specific password for your Apple ID
5. Add all the Apple-related secrets to your GitHub repository

### 2. GPG Setup

1. Generate a GPG key if you don't have one:
   ```bash
   gpg --full-generate-key
   ```

2. Export your private key:
   ```bash
   gpg --armor --export-secret-key YOUR_KEY_ID > private.key
   ```

3. Add the GPG-related secrets to your GitHub repository

### 3. Adding Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add each secret with the exact name listed above

## Workflow Behavior

- **CI Workflow** (`ci.yml`): Runs on PR and push to main, no signing
- **Release Workflow** (`release.yml`): Triggers on version tags (v*.*.*), includes signing

## Testing

To test the workflows without creating a real release:

1. Push a pre-release tag: `git tag v1.0.0-beta1 && git push origin v1.0.0-beta1`
2. The release workflow will run and create a pre-release
3. Delete the tag and release if needed for testing

## Security Notes

- Never commit certificates, private keys, or passwords to the repository
- Use strong passwords for certificates and GPG keys
- Regularly rotate app-specific passwords
- Consider using a dedicated Apple ID for CI/CD if you have multiple projects
- GPG keys should have appropriate expiration dates

## Troubleshooting

### macOS Signing Issues

- Ensure the certificate is valid and not expired
- Check that the Team ID matches your Apple Developer account
- Verify the certificate identity string is correct

### GPG Signing Issues

- Ensure the GPG key is not expired
- Check that the key ID format is correct (long format recommended)
- Verify the passphrase is correct

### General Issues

- Check GitHub Actions logs for detailed error messages
- Ensure all required secrets are set with correct names
- Verify that the secrets contain the expected content (no extra whitespace, etc.)