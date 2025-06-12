# Homebrew Installation Guide

KURPOD can be installed on macOS using Homebrew for the best user experience.

## 🍺 Quick Install

### Method 1: Direct Install (Recommended)
```bash
# Install directly from the repository
brew install srv1n/kurpod/kurpod

# Start the server
kurpod_server
```

### Method 2: Tap Install
```bash
# Add the tap (using main repo)
brew tap srv1n/kurpod

# Install KURPOD
brew install kurpod

# Start the server
kurpod_server
```

## 📋 Setup Instructions

### For Repository Maintainers

#### 1. Update Formula for New Releases

```bash
# In the main kurpod repository
./scripts/update-homebrew-formula.sh 1.0.0

# Commit the updated formula
git add Formula/kurpod.rb
git commit -m "Update Homebrew formula to v1.0.0"
git push origin main
```

#### 2. Automatic Updates (GitHub Actions)

The formula is automatically updated when you create a new release tag.

### For Users

#### Installation

```bash
# Method 1: Direct install (easiest)
brew install srv1n/kurpod/kurpod

# Method 2: Tap install
brew tap srv1n/kurpod
brew install kurpod

# Verify installation
kurpod_server --help
```

#### Usage

```bash
# Start with default settings
kurpod_server

# Custom port
kurpod_server --port 8080

# Custom blob file
kurpod_server --blob ~/secure/storage.blob

# Show all options
kurpod_server --help
```

#### Updating

```bash
# Update to latest version
brew update && brew upgrade kurpod

# Check version
kurpod_server --version
```

#### Uninstalling

```bash
# Remove KURPOD
brew uninstall kurpod

# Remove the tap (optional)
brew untap srv1n/kurpod
```

## 🔧 Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   # Fix Homebrew permissions
   sudo chown -R $(whoami) $(brew --prefix)/*
   ```

2. **Formula Not Found**
   ```bash
   # Refresh tap
   brew untap srv1n/kurpod
   brew tap srv1n/kurpod
   ```

3. **Binary Not Found**
   ```bash
   # Check if Homebrew bin is in PATH
   echo $PATH | grep $(brew --prefix)/bin
   
   # Add to PATH if missing
   echo 'export PATH="'$(brew --prefix)'/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

## 🏗️ Development

### Testing the Formula Locally

```bash
# Install from local formula
brew install --build-from-source ./Formula/kurpod.rb

# Test the formula
brew test kurpod

# Audit the formula
brew audit --strict kurpod
```

### Formula Development

The formula supports:
- ✅ **Intel macOS** (x86_64)
- ✅ **Apple Silicon** (ARM64) 
- ✅ **Automatic SHA256 verification**
- ✅ **Version management**
- ✅ **Help text and examples**

## 🎯 Benefits of Homebrew Installation

- **🔄 Easy updates**: `brew upgrade kurpod`
- **🧹 Clean uninstall**: `brew uninstall kurpod`
- **📦 Dependency management**: Automatic dependency handling
- **🔒 Security**: SHA256 verification of downloads
- **🍎 Native macOS integration**: Follows macOS conventions
- **👥 Familiar workflow**: Standard for macOS developers

## 📚 Resources

- **Homebrew Documentation**: https://docs.brew.sh/
- **Formula Cookbook**: https://docs.brew.sh/Formula-Cookbook
- **KURPOD Repository**: https://github.com/srv1n/kurpod
- **Homebrew Formula**: https://github.com/srv1n/kurpod/blob/main/Formula/kurpod.rb