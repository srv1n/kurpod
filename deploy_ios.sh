#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting iOS deployment script..."

# 1. Check for ios-deploy
if ! command -v ios-deploy &> /dev/null
then
    echo "⚠️ 'ios-deploy' could not be found."
    echo "Please install it by running: "
    echo "   npm install -g ios-deploy"
    echo "or"
    echo "   brew install ios-deploy"
    exit 1
fi
echo "✅ ios-deploy is available."

# 2. Run the device build script
echo "🛠️ Building the app for iOS device..."
echo "Ensure your Apple Developer account is configured in Xcode for code signing."

# Assuming build_ios.sh is in the same directory (project root)
if ! ./build_ios.sh --device; then
    echo "❌ iOS device build failed. Please check the output above for errors."
    echo "Common issues include code signing problems (ensure your developer team is set in Xcode)."
    exit 1
fi
echo "✅ iOS device build successful."

# 3. Define the app path
# The build script output indicates the .app bundle is typically in:
# enc_tauri/src-tauri/gen/apple/build/arm64/ENC.app (for arm64 device builds)
# Or sometimes it might be referenced directly from the xcodebuild output.
# For Tauri v2, the path provided by `tauri ios build` is usually the most reliable.
# The `build_ios.sh` ends with: echo "The app can be found in enc_tauri/src-tauri/gen/apple/build/"
# So, the app name is ENC.app and target is arm64 for device
APP_BUNDLE_PATH="enc_tauri/src-tauri/gen/apple/build/arm64/ENC.app" # Adjust if your app name or structure differs
IPA_PATH="enc_tauri/src-tauri/gen/apple/build/arm64/ENC.ipa"

if [ -f "$IPA_PATH" ]; then
    echo "✅ Found IPA at $IPA_PATH"
    DEPLOY_PATH="$IPA_PATH"
elif [ -d "$APP_BUNDLE_PATH" ]; then
    echo "✅ Found APP bundle at $APP_BUNDLE_PATH"
    DEPLOY_PATH="$APP_BUNDLE_PATH"
else
    echo "❌ App bundle or IPA not found at $APP_BUNDLE_PATH or $IPA_PATH"
    echo "Please check the build output to confirm the correct path."
    exit 1
fi

echo "📲 Deploying to connected iPhone using $DEPLOY_PATH..."
echo "Ensure your iPhone is connected via USB and unlocked."

# Attempt to deploy
# You can add --id <YOUR_DEVICE_UDID> if auto-detection fails
if ios-deploy --bundle "$DEPLOY_PATH"; then
    echo "🎉 Successfully deployed to iPhone!"
else
    echo "❌ Deployment failed."
    echo "Troubleshooting tips:"
    echo "  - Make sure your iPhone is connected, unlocked, and trusts the computer."
    echo "  - Check 'ios-deploy -c' to list connected devices."
    echo "  - You might need to specify your device UDID: ios-deploy --id <YOUR_DEVICE_UDID> --bundle "$DEPLOY_PATH""
    echo "  - Ensure the app is correctly signed for your device."
    exit 1
fi

exit 0 