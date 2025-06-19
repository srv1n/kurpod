# Contributing to Kurpod

First off, thank you for considering contributing to Kurpod! It's people like you that make Kurpod such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **System information** (OS, Rust version, browser)
- **Relevant logs** (with sensitive data removed)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use case** - Why is this enhancement needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - What other solutions did you consider?
- **Additional context** - Mockups, diagrams, etc.

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Follow the setup guide** below
3. **Make your changes** following our coding standards
4. **Add tests** for any new functionality
5. **Ensure all tests pass** with `cargo test`
6. **Update documentation** as needed
7. **Submit a pull request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/srv1n/kurpod.git
cd kurpod

# Add upstream remote
git remote add upstream https://github.com/srv1n/kurpod.git

# Install Rust (if needed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install development tools
rustup component add rustfmt clippy

# Build the project
cargo build

# Run tests
cargo test

# Run with debug logging
RUST_LOG=debug cargo run -- --port 3000
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev  # Development server with hot reload
npm run lint # Run linter
npm run build # Production build
```

## Coding Standards

### Rust Code

- Follow standard Rust naming conventions
- Use `rustfmt` for formatting: `cargo fmt`
- Use `clippy` for linting: `cargo clippy`
- Write unit tests for new functionality
- Document public APIs with doc comments

Example:
```rust
/// Encrypts a file and adds it to the blob storage.
/// 
/// # Arguments
/// * `blob_path` - Path to the encrypted blob file
/// * `file_name` - Name of the file to add
/// * `file_data` - Raw file data to encrypt
/// 
/// # Returns
/// * `Ok(())` on success
/// * `Err(EncryptionError)` on failure
pub fn add_encrypted_file(
    blob_path: &Path,
    file_name: &str,
    file_data: &[u8],
) -> Result<(), EncryptionError> {
    // Implementation
}
```

### Frontend Code

- Use ESLint configuration provided
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful component names

### Commit Messages

Follow the conventional commits specification:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

Example:
```
feat(encryption): add support for Blake3 hashing

- Implement Blake3 as an alternative to SHA256
- Add benchmarks comparing both algorithms
- Update documentation with performance data

Closes #123
```

## Testing

### Running Tests

```bash
# Run all tests
cargo test

# Run tests with logging
RUST_LOG=debug cargo test -- --nocapture

# Run specific test
cargo test test_encryption

# Run frontend tests
cd frontend && npm test
```

### Writing Tests

- Write unit tests for all new functions
- Include edge cases and error conditions
- Use descriptive test names
- Mock external dependencies

Example:
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_file_encryption_decryption() {
        let data = b"Hello, World!";
        let password = "test_password";
        
        let encrypted = encrypt_data(data, password).unwrap();
        let decrypted = decrypt_data(&encrypted, password).unwrap();
        
        assert_eq!(data, &decrypted[..]);
    }
    
    #[test]
    fn test_wrong_password_fails() {
        let data = b"Secret data";
        let encrypted = encrypt_data(data, "correct_password").unwrap();
        
        let result = decrypt_data(&encrypted, "wrong_password");
        assert!(result.is_err());
    }
}
```

## Security

### Reporting Security Issues

**DO NOT** report security vulnerabilities through public GitHub issues.

Instead, please send an email to security@kurpod.com with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Security Guidelines

When contributing code:
- Never log sensitive data (passwords, keys, file contents)
- Always use constant-time comparisons for crypto operations
- Validate all user input
- Use prepared statements for any database queries
- Follow the principle of least privilege
- Add security tests for sensitive operations

## Documentation

- Update README.md if needed
- Add JSDoc comments for JavaScript functions
- Update API documentation for endpoint changes
- Include examples for new features
- Keep documentation concise and clear

## Review Process

1. **Automated checks** - CI must pass
2. **Code review** - At least one maintainer approval
3. **Security review** - For crypto or security-related changes
4. **Documentation review** - Ensure docs are updated
5. **Final approval** - Merge by maintainer

## Community

- Join our [Discord server](https://discord.gg/Z54tGqGGRw)
- Follow [@kurpod](https://twitter.com/kurpod) on Twitter
- Read our [blog](https://kurpod.com)
- Star the project on GitHub!

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- Our website's contributors page

Thank you for contributing to Kurpod! 🎉