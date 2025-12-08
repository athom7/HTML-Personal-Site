# Andreas Thomsen - Portfolio

A modern, bold portfolio website built with React, Tailwind CSS, and Framer Motion.

## Features

- **Modern Tech Stack**: React + Vite for fast development and optimal performance
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Engaging animations powered by Framer Motion
- **Bold & Creative**: Eye-catching gradients and modern UI design
- **Optimized for Hiring Managers**: Professional presentation of experience and achievements

## Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **React Icons** - Popular icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the portfolio directory:
```bash
cd portfolio
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

The build files will be generated in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Deployment

### Option 1: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to Netlify

### Option 3: GitHub Pages

1. Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/HTML-Personal-Site/',
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build
```

## Customization

All content is located in the `src/components` directory:

- `Hero.jsx` - Main introduction section
- `About.jsx` - About me section
- `Experience.jsx` - Work experience and education
- `Skills.jsx` - Technical and professional skills
- `Achievements.jsx` - Key accomplishments and certifications
- `Contact.jsx` - Contact information

To update content, simply edit the respective component files.

## Contact

Andreas Thomsen
- Email: andreasthomsen7@icloud.com
- LinkedIn: [linkedin.com/in/andreasthomsen7](https://linkedin.com/in/andreasthomsen7)
- Location: Copenhagen, Denmark

---

Built with ❤️ by Andreas Thomsen
