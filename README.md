# My Personal Homepage

This project is my personal homepage, built with [Vue 3](https://vuejs.org/), [Vite](https://vitejs.dev/), and [TypeScript](https://www.typescriptlang.org/).

🌐 **Live Site**: [https://starminus.uk](https://starminus.uk)

It is configured for easy deployment to GitHub Pages.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [pnpm](https://pnpm.io/installation) (or npm/yarn)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/AsterZC19/asterzc19.github.io.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd my-homepage
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

## Available Scripts

### Development Server
Runs the app in development mode with hot-reloading.
```sh
npm run dev
```

### Build for Production
Type-checks and bundles the app for production into the `dist` folder.
```sh
npm run build
```

### Preview Production Build
Locally serves the content of the `dist` folder to preview the production app.
```sh
npm run preview
```

### Deploy to GitHub Pages
This command automatically builds the project and pushes the contents of the `dist` directory to the `gh-pages` branch.
```sh
npm run deploy
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Volar (Vue Language Features)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)