# Theo — Product Website

The official product website for Theo. This repository contains the public-facing website only; it is separate from the Theo Android application.

## Stack

- React + TypeScript + Vite
- OpenGlass UI for liquid-glass React components
- GSAP ScrollTrigger and Lenis for cinematic, scroll-led motion
- An original canvas-based cursor swarm that follows the active section
- Netlify-ready static build

## Local development

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Netlify

The included `netlify.toml` sets the build command, Node 22, and publish directory. Connect this repository to Netlify with the `main` branch as the production branch; no environment variables are required for this website.

## Content notes

The page is written as a concise product introduction. Before publishing, verify that every capability described on the site matches the current public Theo app and update the download destination when a public release link is available.