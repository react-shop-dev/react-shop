<div align="center">
  <img src="https://github.com/react-shop-dev/react-shop/blob/main/.github/logo.png?raw=true" alt="logo" width="112">
  <h1>react shop</h1>
</div>

<p align="center">
  <a style="display: inline-block;" href="https://github.com/react-shop-dev/react-shop/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license." />
  </a>
  <a style="display: inline-block;" href="https://github.com/react-shop-dev/react-shop/blob/main/.github/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  </a>
  <a style="display: inline-block;" href="https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md">
    <img src="https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg" alt="StandWithUkraine" />
  </a>
<p>

React Shop is a set of open-source packages for building e-commerce stores, built on top of the [Next.js](https://nextjs.org) framework.

## 🛒 Use cases
- Online store fronts
- DTC
- User dashboards
- Service businesses

## 📦 Overview

- **Concept**: A modular architecture promotes separation of concerns by structuring an application into independent, reusable components. One key principle is decoupling business logic from the UI, which enhances maintainability, scalability, and testability.
- **Backend agnostic**: Build your store on top of any API using Next.js features like server actions, API routes, or a [data provider](https://marmelab.com/react-admin/DataProviderList.html) with SSR (Server-Side Rendering) support.
- **Building modules**: Authentication, I18n, payments, global state managment, cart module, forms, notifications, etc. All modules are open-source, free to use for commercial purpose and available on npm.
- **UI**: Use the built-in Material UI [package](https://github.com/react-shop-dev/react-shop/tree/main/packages) or any custom design/UI framework of your choice. Supports flexible theme customization, including dark and light modes.
- **Typescript**: The data structure models follow the [Medusa.js](https://medusajs.com) commerce platform, making the Medusa admin dashboard a great choice for integration.

## ⚙️ Quick start

Use [react-shop-create](https://www.npmjs.com/package/react-shop-create) cli utility which sets up project automatically for you. 

```sh
npx react-shop-create@latest <your-store-name>
```

You'll be asked to choose some basic application settings. After that, the CLI will create a folder with your project name and install the required dependencies.

If you prefer manual installation, Next.js 14 or later with the App Router setup is required.

See the commerce demo site [here](https://bookshelf-demo.com) and check out the example [source code](https://github.com/react-shop-dev/react-shop/tree/main/examples/bookshelf).

## 🤝 Contributing

Thank you for considering contributing to this project! 

We welcome contributions of all kinds, from bug reports and documentation improvements to feature implementations.
Refer to our [Contribution Guide](https://github.com/react-shop-dev/react-shop/blob/main/.github/CONTRIBUTING.md) for instructions on how to contribute to the codebase.

## 💬 Support

The community is available on [GitHub Discussions](https://github.com/react-shop-dev/react-shop/discussions), where you can ask for support, discuss the roadmap, and share ideas.

## 💙 Inspiration & Credits

We'd like to thank the following projects for their codebase and inspiration to this project:

- [React admin](https://marmelab.com/react-admin/): A frontend Framework for building single-page applications running in the browser on top of REST/GraphQL APIs.
- [Medusa js](https://medusajs.com/): The most popular open-source platform for commerce platform with a built-in framework for customizations.

## 📃 License

Licensed under the MIT License, Copyright © 2024-present
