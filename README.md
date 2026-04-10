# Zeeshan Mazher — Portfolio (React + Tailwind)\
Single-page, fully responsive portfolio website in English with a small backend API for the contact form.

## 1) Frontend (React)

### Install
```bash
cd zeeshan-portfolio
pnpm install
```

### Run (frontend only)
```bash
pnpm dev
```

### Build
```bash
pnpm build
pnpm preview
```

## 2) Backend (Contact API)

### Install
```bash
cd zeeshan-portfolio/server
pnpm install
```

### Run
```bash
pnpm dev
```

- API health: `GET http://localhost:5050/health`
- Contact: `POST http://localhost:5050/api/contact`

Messages are saved to:
- `server/data/messages.jsonl`

## 3) Connect frontend → backend

When running both locally:

- Start backend on port **5050**
- Start frontend as usual
- Create `.env` in project root:

```bash
VITE_API_BASE=http://localhost:5050
```

## 4) Deploy

### Frontend
You can deploy the `dist/` folder to:
- Netlify
- Vercel (static)
- GitHub Pages

### Backend
Deploy the `server/` folder to any Node hosting:
- Render
- Railway
- Fly.io

Then set `VITE_API_BASE` to your backend URL.

---
If you want WhatsApp button, CV download, or projects section, I can add them quickly.
