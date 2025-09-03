# Contributing to Prize Roulette

Thank you for considering contributing to Prize Roulette! We appreciate your time and effort in making this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report any unacceptable behavior to the project maintainers.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/your-username/prize-roulette.git
   cd prize-roulette
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start the development server at `http://localhost:5173`.

2. **Make your changes** following the [Code Style](#code-style) guidelines.

3. **Run tests** to ensure nothing is broken:
   ```bash
   npm test
   ```

4. **Lint your code**:
   ```bash
   npm run lint
   ```

5. **Format your code**:
   ```bash
   npm run format
   ```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This allows us to automatically generate changelogs and determine semantic version bumps.

### Commit Message Format

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<type>(<scope>): <short summary>
<BLANK LINE>
[optional body]
<BLANK LINE>
[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries
- **revert**: Reverts a previous commit

### Examples

```
feat(auth): add login with Google

description of the change

Closes #123
```

```
fix(ui): resolve layout issue on mobile devices

- Fix overflow issue in the header
- Adjust padding for better mobile experience

Fixes #456
```

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations, and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Reporting Bugs

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). When creating a bug report, please include the following information:

1. A clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots or screen recordings if applicable
6. Browser and OS information
7. Any additional context that might be helpful

## Suggesting Enhancements

Enhancement suggestions are also tracked as [GitHub issues](https://guides.github.com/features/issues/). When creating an enhancement suggestion, please include:

1. A clear and descriptive title
2. A description of the suggested enhancement
3. Why this enhancement would be useful
4. Any alternatives you've considered
5. Screenshots or mockups if applicable

## Code Style

We use the following tools to maintain code quality and style:

- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **TypeScript** for static type checking

### Linting

```bash
# Run ESLint
npm run lint

# Automatically fix linting issues
npm run lint:fix
```

### Formatting

```bash
# Check formatting
npm run format:check

# Format all files
npm run format
```

## Testing

We use **Jest** and **React Testing Library** for testing. Please ensure all new code is covered by appropriate tests.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage
```

## Documentation

- Update the README.md with details of changes to the interface.
- Add comments to the code where necessary.
- Update the CHANGELOG.md with details of changes.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
