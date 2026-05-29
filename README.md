# Yarsa-byte

A modern portfolio/website built with Next.js (app router), React and TypeScript featuring 3D content and rich animations.

## Key features
- Next.js 16 (app directory) + React 19 + TypeScript
- 3D scenes powered by three.js and @react-three/fiber
- Interactive spline content via @splinetool/react-spline
- Smooth scrolling (lenis) and timeline animations (gsap, framer-motion)
- Tailwind CSS for styling

## Tech stack
- next 16.2.6
- react 19.2.4
- typescript, tailwindcss
- three, @react-three/fiber, @react-three/drei
- gsap, framer-motion, lenis

## Getting started
Prerequisites: Node.js (18+ recommended) and a package manager (npm, pnpm or yarn).

Install dependencies:

```bash
# with npm
npm install

# or with pnpm (recommended if you have pnpm-lock.yaml)
pnpm install
```

Run development server:

```bash
npm run dev
```

Available scripts (from package.json):
- dev: next dev
- build: next build
- start: next start
- lint: eslint

Open http://localhost:3000 in your browser.

## Project structure (high level)
- app/           — Next.js app directory (pages, layouts, global styles)
- components/    — Reusable UI and animation components
- hooks/         — Custom React hooks
- public/ or app/static — static assets and icons
- styles/ or app/globals.css — Tailwind/global CSS

## Notes
- This project uses the experimental app/ directory and TypeScript. Edit `app/page.tsx` to update the main page.
- There is a pnpm lockfile (pnpm-lock.yaml). Using pnpm will provide reproducible installs.

## Deployment
Deploy easily to Vercel (recommended) or any Node hosting that supports Next.js. Build with:

```bash
npm run build
npm run start
```

## Contributing
Feel free to open issues or PRs. For local development, run the dev server and follow existing code style (TypeScript + Tailwind).

## License
Check for a LICENSE file in the repo. If none exists, add one (e.g., MIT) if you want to open-source this project.

---

If you want, update this README with a short project description, author contact, or deployment badges and I can apply the changes.