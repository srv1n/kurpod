class Kurpod < Formula
  desc "Secure encrypted file storage server with plausible deniability"
  homepage "https://github.com/srv1n/kurpod"
  version "0.1.3"
  license "AGPL-3.0"

  if Hardware::CPU.intel?
    url "https://github.com/srv1n/kurpod/releases/download/v#{version}/kurpod-v#{version}-darwin-intel.tar.gz"
    sha256 "897f439a3d9dc15e6356a121aa4141ea86ef555790d2ceae368ddf3158276773"
  else
    url "https://github.com/srv1n/kurpod/releases/download/v#{version}/kurpod-v#{version}-darwin-apple-silicon.tar.gz"
    sha256 "995baa37132f18c69aa4021db4e835d7e064c1b2f31afc0245271b29fefaae10"
  end

  def install
    bin.install "kurpod_server"
  end

  def caveats
    <<~EOS
      KURPOD Server has been installed!
      
      🚀 Quick Start:
        kurpod_server
      
      🌐 Then open: http://localhost:3000
      
      📖 Options:
        kurpod_server --help
        kurpod_server --port 8080
        kurpod_server --blob /path/to/storage.blob
      
      📚 Documentation: https://github.com/srv1n/kurpod
    EOS
  end

  test do
    # Test that the binary runs and shows help
    system "#{bin}/kurpod_server", "--help"
    
    # Test version output
    system "#{bin}/kurpod_server", "--version"
  end
end