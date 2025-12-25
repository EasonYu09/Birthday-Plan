# Birthday Plan Quiz

A React application for the 2026 Birthday Date Quiz.

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd Birthday-Plan
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview

Preview the production build:

```bash
npm run preview
```

## Deployment

This project is configured to deploy to GitHub Pages automatically via GitHub Actions.

1.  Push your changes to the `main` branch.
2.  The GitHub Action "Deploy to GitHub Pages" will trigger automatically.
3.  Once completed, the site will be deployed to your GitHub Pages URL.

**Note:** Ensure GitHub Pages is enabled in your repository settings (Settings > Pages > Build and deployment > Source: GitHub Actions).

## Configuration

- **Environment Variables**: Create a `.env` file in the root directory if you need to define environment variables (e.g., `VITE_API_KEY`).
