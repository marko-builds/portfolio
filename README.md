# markostankovic.org

Personal portfolio site for [Marko Stankovic](https://markostankovic.org) — game developer based in Serbia.

→ **[markostankovic.org](https://markostankovic.org)**

---

## Stack

- **[Astro](https://astro.build)** — static site framework
- **MDX** — content collections for devlog and project pages
- **Formspree** — contact form
- **Vercel** — deployment and hosting

---

## Project structure

```
src/
├── components/       # reusable UI components
├── content/          # MDX content collections (devlog, projects)
├── layouts/          # page layouts
├── pages/            # routes
└── styles/           # global CSS
public/               # static assets
```

---

## Running locally

```bash
npm install
npm run dev
```

Runs at `http://localhost:4321`

```bash
npm run build    # production build
npm run preview  # preview production build locally
```

---

## License

Code is MIT licensed. Content and design are not for reuse.
