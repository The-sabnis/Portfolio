# Sarvesh Sabnis — 3D Developer Portfolio

Personal portfolio website for **Sarvesh Sabnis** (SQL Developer · Database Engineer · ETL Specialist), featuring an interactive 3D hero scene, animated workflow visuals, and a centralized data-driven layout.

---

## Tech Stack

- **Framework:** React 19 + Vite 8
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Linting:** ESLint

---

## Features

- **Interactive 3D Hero Canvas:** Polished chrome torus-knot sculpture built with React Three Fiber (`HeroCanvas.jsx`), featuring cursor-reactive specular lighting and scroll-linked transformations.
- **Modular Sections:** Includes Hero, Stats Row, Executive Summary (About), Skills, Featured Projects, Experience Timeline, Education & Certifications, and Contact sections.
- **Animated Project Visuals:** Custom Framer Motion visuals (`ProjectVisuals.jsx`) illustrating pipeline and analytics flows.
- **Single Source of Truth:** All portfolio content (profile details, experience, skills, projects, education, and contact info) is managed in `src/data/portfolioData.js`.
- **Responsive Dark UI:** Built with Tailwind CSS v4, custom tilt containers, gradient/shiny text effects, and smooth scrolling.

---

## Project Structure

```text
my-3d-portfolio/
├── public/                     # Static assets (resume PDF, images, favicon)
├── src/
│   ├── assets/                 # Bundled assets
│   ├── components/
│   │   ├── 3d/                 # Three.js / R3F scenes & project visuals
│   │   ├── sections/           # Page sections (Hero, About, Skills, Projects, etc.)
│   │   └── ui/                 # Reusable UI components (TiltContainer, GradientText, etc.)
│   ├── data/
│   │   └── portfolioData.js    # Centralized portfolio data
│   ├── App.jsx                 # Root layout & section composition
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles & Tailwind setup
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation & Local Development

1. Navigate to the project directory:
   ```bash
   cd my-3d-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with HMR |
| `npm run build` | Builds the production bundle into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint across the project |

---

## Customization

To update profile details, work experience, skills, projects, or resume/image paths, edit [src/data/portfolioData.js](src/data/portfolioData.js) and place any updated static files (such as your resume PDF or profile images) inside the `public/` folder.

---

## Contact

- **GitHub:** [The-sabnis](https://github.com/The-sabnis)
- **LinkedIn:** [Sarvesh Sabnis](https://www.linkedin.com/in/sarvesh-sabnis-002392242)
- **Email:** sarveshsabnis333@gmail.com
