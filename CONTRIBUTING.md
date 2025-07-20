# Contributing to Scriptify

Welcome to the Scriptify project! 📝  
We're excited you're here and looking to contribute. This document will guide you through setting up the project, working with our GitHub project board, and following our contribution workflow.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

### 1. Clone the Repository

### 👤 Contributor Access Levels

There are **two ways to contribute** to Scriptify. Please follow the instructions based on how you're contributing:

#### Option A – **Collaborator (Onboarded Team Member)**

If you've been added to the GitHub repo directly (i.e. you have Write or higher access):

```bash
# Clone the main repo directly
git clone https://github.com/mr-steal-ur-code/scriptify.git
cd scriptify

npm install
```

### Option B - External Contributor (Open Source / Fork)

```bash
# Fork the repo on GitHub first, then clone your fork
git clone https://github.com/YOUR-USERNAME/scriptify.git
cd scriptify

# Add upstream to stay in sync with the main repo
git remote add upstream https://github.com/mr-steal-ur-code/scriptify.git

npm install
```

### 2. Environment Setup

You'll need a `.env.local` file for local development. Reach out to a maintainer for the environment variables, or we'll send them to you directly when onboarding.

### 3. Create a New Branch

Please use descriptive branch names following this convention:

```bash
# For new features
git checkout -b feature/add-user-authentication

# For bug fixes
git checkout -b fix/navbar-responsive-issue

# For documentation updates
git checkout -b docs/update-api-guide
```

### 4. 🛠️ Local Development Setup

#### Option 1: Local Database with Docker

To spin up the local Postgres database and run prisma db seed automatically:

```bash
npm run docker:db
npm run dev
```

#### Option 2: Full Docker Setup

Run both the database with prisma seed and application in Docker:

```bash
npm run docker:app
```

The application will be available at `http://localhost:3000`

---

## 📋 Project Workflow

### Project Management

- We use **GitHub Projects**, **Issues**, and **Pull Requests** for coordination
- You'll be added to the Scriptify GitHub Project to track your work
- Check the project board for available tasks and their status

### Before You Start

1. **Check existing issues** to avoid duplicate work
2. **Comment on an issue** to let others know you're working on it
3. **Ask questions** if anything is unclear

### Development Guidelines

#### Code Style

- Follow the existing code style and conventions
- Use TypeScript for type safety
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🐛 Reporting Issues and 💡 Suggesting Features

Please use **GitHub Issues** for:

- 🐛 **Bug reports** - Include steps to reproduce, expected vs actual behavior
- 💡 **Feature requests** - Describe the problem you're solving and proposed solution
- 📚 **Documentation improvements**
- ❓ **Questions** about the codebase

When creating issues:

- Use clear, descriptive titles
- Add appropriate labels (bug, feature, documentation, etc.)
- Provide as much relevant context as possible

---

## 🔄 Pull Request Process

### Before Submitting

1. **Sync with upstream**:

   ```bash
   git fetch upstream
   git checkout test
   git merge upstream/test
   ```

2. **Update your branch**:

   ```bash
   git checkout your-branch
   git rebase test
   ```

3. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   ```

### Submitting Your PR

- **Target branch**: All PRs must target the `test` branch (not `master`)
- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why if applicable
- **Link related issues**: Use "Closes #123" to automatically close issues

### PR Requirements

Each PR will automatically trigger:

- ✅ `next lint` - Code linting
- 🔧 `next build` - Build verification

**All checks must pass** before requesting a review.

### Review Process

- A maintainer will review your PR within 1-2 business days
- Address any requested changes promptly
- Once approved, your PR will be merged to `test` for staging

---

## 🤝 Code of Conduct

We're committed to providing a welcoming and inclusive experience for everyone. Please be respectful and constructive in all interactions.

---

## 🆘 Getting Help

- **Questions about setup?** Open a GitHub issue with the `question` label
- **Stuck on something?** Reach out to maintainers directly
- **Found this guide unclear?** Let us know how we can improve it!

---

## 🎉 Recognition

We appreciate all contributions, big and small! Contributors will be recognized in our project README and release notes.

Thank you for contributing to Scriptify! 🚀  
Happy coding!
