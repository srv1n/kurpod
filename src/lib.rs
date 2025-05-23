// Root library file for 'enc' crate
// Re-exports everything from encryption_core for easier usage

pub use encryption_core::*;

pub const VERSION: &str = env!("CARGO_PKG_VERSION");
pub const NAME: &str = env!("CARGO_PKG_NAME");

/// Utility function to get the binary name
pub fn get_binary_name() -> &'static str {
    NAME
} 