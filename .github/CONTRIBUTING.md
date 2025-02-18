# Contributing

### 🪲 Working with GitHub issues

**When reporting an issue:**

- Provide a **clear** and **descriptive** title.
- Include **steps** to **reproduce** the issue
- If possible, provide a minimal reproducible example.
- Specify expected vs actual behavior.

**When working on an issue:**

- Comment on the issue to indicate you're working on it.
- If unsure, ask maintainers for guidance.
- Reference the issue in your PR using Closes #<issue-number>

### 💻 Development

#### Requirements for your development environment
- Minimum [Node](https://nodejs.org/en/) v18.0.0
- [Git](https://git-scm.com/) and [GitHub](https://github.com/) account
- [pnpm](https://pnpm.io/) version 9 or higher

#### Setup

Forking the repository allows you to make changes in your own copy of the project without affecting the original repository. 
This ensures that your contributions can be reviewed and merged properly via pull requests.

1. Navigate to the repository on GitHub and click the Fork button.
2. Clone your forked repository locally:
```sh
git clone https://github.com/react-shop-dev/react-shop.git
```
3. Navigate into the cloned directory
```sh
cd react-shop
```
4. Add the original repository as an upstream remote:
```sh
git remote add upstream https://github.com/react-shop-dev/react-shop.git
```

#### Installing dependencies

After you clone the repository, you need to install the dependencies.
```sh
pnpm install
```

#### Building packages

```sh
# build all packages
pnpm build
# Build a specific package
pnpm build --scope <package-name>
```

#### Developing locally

**Using pnpm link:**<br>
For linking packages locally, you can use [pnpm link](https://pnpm.io/cli/link):

```sh
pnpm link --global
pnpm link <package-name>
```

#### Running automated tests
Running tests ensures that changes do not introduce bugs or break existing functionality. 
It helps maintain code reliability and stability while allowing contributors to verify their modifications before submitting a pull request.

```sh
# Test all packages
pnpm test
# Test a specific package
pnpm test -- --scope <package-name>
```

#### Coding standards

```sh
pnpm run lint
pnpm run prettier
```
To ensure code consistency and quality, we enforce linting and formatting rules using Husky and lint-staged.

#### Creating a pull request

To manage our releases, changelogs and versioning, we're using [Changesets](https://github.com/changesets/changesets). Also PR requires [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to keep our commit messages consistent and easy to understand.

After committing your changes and generating a changeset, push your updates to your fork and open a pull request. We have a Pull Request template to ensure all necessary details about your changes are provided. Please make sure to complete it with the required information.

GitHub Actions will automatically run tests and validate your changeset. Our maintainers will review your submission promptly and merge it if everything checks out.

### 📃 Licence

By contributing your code to the react-shop-dev/react-shop Github repository, you agree to license your contribution under the MIT license.