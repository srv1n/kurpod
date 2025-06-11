# Contributing to Kurpod

Thank you for your interest in contributing to Kurpod! This document provides guidelines for contributing to this open source project.

## Important: License Agreement

By contributing to this project, you agree that:

1. Your contributions will be licensed under the AGPLv3 license
2. You understand the commercial restrictions in place
3. You have the right to submit your contributions
4. Your contributions are your original work or properly attributed

## Getting Started

### Development Environment Setup

1. **Install Rust** (latest stable):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source ~/.cargo/env
   ```

2. **Install Node.js and Bun**:
   ```bash
   # Install Node.js 20+
   curl -fsSL https://bun.sh/install | bash
   ```

3. **Clone and setup**:
   ```bash
   git clone https://github.com/srv1n/kurpod.git
   cd kurpod
   cargo build
   cd frontend && bun install && cd ..
   ```

4. **Run development server**:
   ```bash
   ./run.sh
   ```

### Project Structure

```
kurpod/
├── encryption_core/     # Core cryptographic library
├── kurpod_server/       # HTTP server implementation
├── frontend/            # React web interface
├── docs/               # Documentation
├── .github/workflows/  # CI/CD automation
└── README.md          # Main documentation
```

## Contributing Guidelines

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment
- Report unacceptable behavior to [your-email@example.com]

### Types of Contributions

We welcome the following types of contributions:

#### 🐛 Bug Reports
- Use GitHub Issues to report bugs
- Include detailed reproduction steps
- Provide system information and logs
- Check if the issue already exists

#### 💡 Feature Requests
- Describe the problem you're trying to solve
- Explain why this feature would be useful
- Consider if it fits the project's scope
- Be open to alternative solutions

#### 🔧 Code Contributions
- Bug fixes
- Performance improvements
- Security enhancements
- Documentation improvements
- Test coverage increases

#### 📚 Documentation
- README improvements
- Code comments
- User guides
- API documentation
- Architecture documentation

### Before You Start

1. **Check existing issues** to avoid duplicate work
2. **Open an issue** to discuss large changes
3. **Review the architecture** in [ARCHITECTURE.md](ARCHITECTURE.md)
4. **Understand the security model** before making changes

## Development Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/kurpod.git
cd kurpod
git remote add upstream https://github.com/srv1n/kurpod.git
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes

#### Code Style

**Rust Code:**
- Follow standard Rust formatting: `cargo fmt`
- Pass all lints: `cargo clippy -- -D warnings`
- Add tests for new functionality
- Document public APIs

**Frontend Code:**
- Follow ESLint rules: `bun lint`
- Use TypeScript for new code when possible
- Follow React best practices
- Test UI changes in multiple browsers

#### Commit Messages

Use conventional commit format:

```
feat: add batch file upload support
fix: resolve memory leak in file processing
docs: update installation instructions
test: add unit tests for encryption core
refactor: simplify file upload handling
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `test`: Adding or updating tests
- `refactor`: Code changes that don't fix bugs or add features
- `perf`: Performance improvements
- `chore`: Maintenance tasks

### 4. Test Your Changes

```bash
# Run Rust tests
cargo test

# Run frontend linting
cd frontend && bun lint

# Build everything
./build.sh

# Test manual workflow
./run.sh
# Test in browser: http://localhost:3000
```

### 5. Security Testing

For security-related changes:

- Test with various password strengths
- Verify encryption/decryption works correctly
- Check for timing attacks in password comparison
- Ensure memory is properly cleared
- Test error conditions

### 6. Submit Pull Request

```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub with:

- **Clear title** describing the change
- **Detailed description** of what and why
- **Testing notes** for reviewers
- **Screenshots** for UI changes
- **Breaking changes** clearly marked

## Pull Request Requirements

### All Pull Requests Must:

1. **Pass CI checks**:
   - All tests must pass
   - Code must build successfully
   - Linting must pass

2. **Include tests**:
   - Unit tests for new functions
   - Integration tests for new features
   - Manual testing notes

3. **Update documentation**:
   - Update README if needed
   - Add/update code comments
   - Update user manual for UI changes

4. **Follow security practices**:
   - No hardcoded secrets or passwords
   - Proper input validation
   - Memory safety considerations
   - Error handling without information leakage

### Review Process

1. **Automated checks** run on every PR
2. **Security review** for crypto/auth changes
3. **Code review** by maintainers
4. **Testing** on multiple platforms
5. **Documentation review** for clarity

## Special Considerations

### Security-Critical Changes

Changes to encryption, authentication, or security features require:

- Extra scrutiny and testing
- Security-focused code review
- Discussion of threat model impact
- Possible security audit

### Performance Changes

For performance-related changes:

- Include benchmarks showing improvement
- Test with large files and datasets
- Verify memory usage doesn't increase significantly
- Test on different hardware configurations

### Breaking Changes

Breaking changes require:

- Clear justification for the breaking change
- Migration guide for users
- Version bump discussion
- Extra communication to users

## Getting Help

### Resources

- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **User Guide**: [docs/USER_MANUAL.md](docs/USER_MANUAL.md)
- **Issues**: [GitHub Issues](https://github.com/srv1n/kurpod-server/issues)
- **Discussions**: [GitHub Discussions](https://github.com/srv1n/kurpod-server/discussions)

### Communication

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: [your-email@example.com] for security issues
- **Code Review**: Use PR comments for code-specific questions

## Recognition

Contributors will be recognized in:

- Git commit history
- Release notes for significant contributions
- README acknowledgments for major features
- Special thanks for security improvements

## Commercial Use Policy

**Important**: While this is open source software under AGPLv3, commercial use is restricted:

- You may contribute to help the project
- Your contributions become part of the AGPLv3 codebase
- Commercial use of the entire project requires separate licensing
- Contributing does not grant commercial use rights

## Legal Notes

### Contributor License Agreement

By submitting a pull request, you certify that:

1. You have the right to submit the contribution
2. Your contribution is your original work or properly attributed
3. You license your contribution under AGPLv3
4. You understand the commercial restrictions

### Export Controls

This software includes strong cryptography. Be aware of export control laws in your jurisdiction when contributing cryptographic code.

### Security Disclosure

If you discover security vulnerabilities:

1. **DO NOT** open a public issue
2. **Email** [your-email@example.com] with details
3. **Wait** for acknowledgment before public disclosure
4. **Follow** responsible disclosure practices

## Thank You!

Every contribution, no matter how small, helps make KURPOD Server better and more secure for everyone. Thank you for taking the time to contribute!