# Breeze Client Website

A modern, responsive website for Breeze Client - the ultimate gaming companion.

## Features

- **Modern Design**: Dark theme with purple accents and animated particle background
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Fast**: Built with Vite for optimal performance
- **SEO Ready**: Configured with meta tags and manifest

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- React Router (navigation)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Breeze-Client-Website.git
cd Breeze-Client-Website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deploying to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub username:
```json
"homepage": "https://yourusername.github.io/Breeze-Client-Website"
```

2. Update `base` in `vite.config.js`:
```js
base: '/Breeze-Client-Website/',
```

3. Deploy:
```bash
npm run deploy
```

This will build the project and push the `dist` folder to the `gh-pages` branch.

## Project Structure

```
Breeze-Client-Website/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── AnimatedBackground.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── Footer.jsx
│   │   ├── GamesSection.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   └── VersionHistory.jsx
│   ├── components/ui/   # UI components (toasts, etc.)
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities and helpers
│   ├── pages/           # Page components
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Customization

### Colors
The color scheme uses CSS variables defined in `src/index.css`. The primary color is purple (`hsl(263 70% 58%)`).

### Content
Update the content in the section components:
- `HeroSection.jsx` - Main hero banner
- `FeaturesSection.jsx` - Feature cards
- `GamesSection.jsx` - Supported games list
- `VersionHistory.jsx` - Version history/changelog

## License

MIT License - feel free to use this template for your own projects!
