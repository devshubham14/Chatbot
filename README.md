# Chatbot by Shubham Pandey

A modern chat application built with React, Vite, and TypeScript. This MVP features authentication (login/register), protected chat routes, and a clean, responsive UI powered by TailwindCSS and Headless UI.

## Features

- ⚡ Fast Vite-powered development
- 🔒 Authentication (login & registration)
- 💬 Protected chat page (only accessible to logged-in users)
- 🛣️ Routing with React Router
- 🎨 Styled with TailwindCSS & Headless UI
- 🦄 Beautiful icons via Heroicons

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/devshubham14

   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:
```sh
npm run dev
# or
yarn dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:
```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Project Structure

```
├── src/
│   ├── App.tsx           # Main app with routing and auth
│   ├── main.tsx          # React entry point
│   ├── pages/            # Login, Register, Chat pages
│   ├── utils/            # Auth context and helpers
│   └── index.css         # TailwindCSS styles
├── index.html            # Main HTML template
├── package.json
└── README.md
```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code
- `npm run format` – Format code

## Dependencies

- React, ReactDOM
- React Router DOM
- TailwindCSS
- Headless UI, Heroicons
- Vite
- TypeScript

## License

MIT
