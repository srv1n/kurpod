#!/bin/bash
set -e

# Script to update Homebrew formula with correct SHA256 hashes
VERSION=${1:-"0.0.5"}
REPO="srv1n/kurpod"

echo "🍺 Updating Homebrew formula for KURPOD v$VERSION"

# Download and calculate SHA256 for Intel macOS
echo "📦 Calculating SHA256 for Intel macOS binary..."
INTEL_URL="https://github.com/$REPO/releases/download/v$VERSION/kurpod-v$VERSION-darwin-intel.tar.gz"
INTEL_SHA256=$(curl -sL "$INTEL_URL" | sha256sum | cut -d' ' -f1)
echo "   Intel SHA256: $INTEL_SHA256"

# Download and calculate SHA256 for Apple Silicon macOS  
echo "📦 Calculating SHA256 for Apple Silicon macOS binary..."
ARM_URL="https://github.com/$REPO/releases/download/v$VERSION/kurpod-v$VERSION-darwin-apple-silicon.tar.gz"
ARM_SHA256=$(curl -sL "$ARM_URL" | sha256sum | cut -d' ' -f1)
echo "   ARM SHA256: $ARM_SHA256"

# Update the formula file
echo "✏️  Updating Formula/kurpod.rb..."
sed -i.bak \
    -e "s/INTEL_SHA256_PLACEHOLDER/$INTEL_SHA256/g" \
    -e "s/ARM_SHA256_PLACEHOLDER/$ARM_SHA256/g" \
    -e "s/version \".*\"/version \"$VERSION\"/g" \
    Formula/kurpod.rb

# Verify the replacements worked
echo "🔍 Verifying updates..."
if grep -q "INTEL_SHA256_PLACEHOLDER\|ARM_SHA256_PLACEHOLDER" Formula/kurpod.rb; then
    echo "❌ Warning: Some placeholders were not replaced!"
    grep "PLACEHOLDER" Formula/kurpod.rb
fi

if grep -q "version \"$VERSION\"" Formula/kurpod.rb; then
    echo "✅ Version updated to $VERSION"
else
    echo "❌ Warning: Version may not have been updated properly"
fi

# Clean up backup
rm -f Formula/kurpod.rb.bak

echo "✅ Formula updated successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Commit the updated formula:"
echo "   git add Formula/kurpod.rb"
echo "   git commit -m \"Update Homebrew formula to v$VERSION\""
echo ""
echo "2. Create/update your Homebrew tap:"
echo "   https://github.com/srv1n/homebrew-kurpod"
echo ""
echo "3. Users can then install with:"
echo "   brew tap srv1n/kurpod"
echo "   brew install kurpod"