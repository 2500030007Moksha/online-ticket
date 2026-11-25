# TicketHub — React + Vite

Incremental migration: React JSX components render the original pages; the existing JavaScript controller still manages dynamic content, localStorage and interactions. Original CSS retained. This is not a fully React-state-driven rewrite.

## Run
Use Node.js 22. In the project root run `npm install`, then `npm run dev`. Open the URL printed by Vite. For API endpoints, in a second terminal run `cd server`, `npm install`, copy `.env.example` to `.env`, configure it, then `npm start`. Vite proxies `/api` to port 3000. For a production-style local run, run `npm run build` at root and start the server; open port 3000.

Demo admin: admin@tickethub.com / admin123. Register a demo customer using the UI. Never use real passwords or payment details. Checkout includes an explicitly labeled no-charge demo booking; live gateway buttons are not wired to verified payment. Original server auth and demo localStorage auth remain separate; email reset cannot reset a localStorage account. See README-SETUP.md for original backend notes (its old HTML URL is superseded by this README). No production security or inventory guarantees.

## GitHub
Create an empty repository, then run `git init`, `git add .`, `git commit -m "Migrate TicketHub to React and Vite"`, `git branch -M main`, `git remote add origin YOUR_REPOSITORY_URL`, `git push -u origin main`. Never commit credentials or database files.

## Verification
Dependency installation/build could not be run in the migration environment because npm registry DNS was unavailable. Run `npm install` and `npm run build` locally before publishing.

## Module identification
- `src/modules/admin`: dashboard, event management (add/edit/delete), customer bookings, ticket sales and collection summary.
- `src/modules/user`: browse/search/filter events, seat selection, checkout, booking history, digital ticket and printing.
- `src/modules/auth`: customer registration, customer/admin login and password reset screens.
- `src/controller.js`: shared legacy interaction logic. Module components stay mounted to preserve the controller’s DOM references. Navigation remains controller-based, not React Router.
