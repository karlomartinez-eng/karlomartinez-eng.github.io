# Karlo Joseph Martinez – Portfolio

React + Vite portfolio with automatic day/night theme, tech stack, projects and a contact form.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```

## Contact form key (Web3Forms)
The key is read from `VITE_WEB3FORMS_KEY` and is **not** stored in the code.
- Local testing: copy `.env.example` to `.env` and paste the key.
- Live site: GitHub repo → Settings → Secrets and variables → Actions → New repository secret →
  name `VITE_WEB3FORMS_KEY`, value = your key.
- In your Web3Forms dashboard, restrict the key to your site's domain.
If no key is set, the form opens the visitor's email app instead.

## Publish on GitHub Pages
1. Create a repo and push these files to the `main` branch.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Every push to `main` builds and deploys automatically (see `.github/workflows/deploy.yml`).

## Editing content
- Text for stack, projects, email and social links: `src/data.js`
- Logos: `src/assets/logos/*.svg`
- Photos: `src/assets/photo-day.jpg` and `photo-night.jpg`
- Colors and layout: `src/styles.css`

## Security notes
See the summary in the chat; key points: strict Content-Security-Policy in `index.html`,
no raw HTML injection, self-hosted fonts, form limits + honeypot + cooldown, secrets kept out of the repo.
