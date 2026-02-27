# Shivam Enterprises — PROJECT-Swroop

Simple fullstack storefront (Vite React frontend + Express/Mongoose backend). This README explains local setup, Vercel deployment and required environment variables.

Quick overview

- Frontend: client/ (Vite + React)
- Server (optional for local): server/ (Express + Mongoose)
- Serverless API: api/ — Vercel serverless function(s) that use the server/models/Product schema

Prerequisites

- Node.js (16+) and npm
- MongoDB Atlas cluster and a connection string
- (For Vercel) a Vercel account

Local development

1. Clone repo and open project root.
2. Install root dev dependencies (concurrently):
   npm install
3. Install client and server deps:
   npm --prefix client install
   npm --prefix server install
4. Start both in development (from project root):
   npm run dev

Notes:

- You can also run the client and server individually:
  - cd client && npm run dev
  - cd server && npm run dev

Environment variables (required)

- MONGODB_URI — MongoDB connection string (set locally in server/.env or export in your shell).

Vercel deployment

1. Remove any sensitive credentials from the repo (do NOT commit your Atlas URI).
2. Push repository to GitHub.
3. In Vercel, import the GitHub project.
4. Add the environment variable in Vercel Project Settings:
   - Key: MONGODB_URI
   - Value: mongodb+srv://<user>:<password>@<cluster>/... (your Atlas URI)
5. Deploy. Vercel will build the client (client/package.json) and deploy api/\*.js as serverless functions.

After deployment: replace <your-vercel-domain> with the domain shown by Vercel

- Frontend: https://<your-vercel-domain>/
- API: https://<your-vercel-domain>/api/products
- Single product: https://<your-vercel-domain>/api/products/<id>

Security and cleanup

- The repository currently contains a fallback hard-coded MongoDB URI in some server files. Remove or replace that before publishing. Rely on MONGODB_URI from environment variables.
- Do not commit .env with secrets.

Client configuration

- WhatsApp number used by the UI is in client/src/config.js — change WHATSAPP_NUMBER to your number (country code + number, no + or dashes) before publishing.

Troubleshooting

- npm run dev / npm run build missing script: run scripts from the correct folder (client or server) or use the root scripts (npm run dev / npm run build) after running npm install at root.
- MongoDB connection errors: ensure MONGODB_URI is correct and the Atlas IP access list allows connections from Vercel (or enable access from anywhere during testing).

If you want, I can:

- Remove the hard-coded fallback URI and make the API fail fast when MONGODB_URI is missing.
- Change the client to fetch products from the serverless /api/products endpoint instead of the static PRODUCTS list.
