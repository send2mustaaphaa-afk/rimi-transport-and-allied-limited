# RIMI TRANSPORT AND ALLIED LIMITED

Official web portal, tracking dashboard, quote calculator, and logistics management system for RIMI TRANSPORT AND ALLIED LIMITED (Apapa, Lagos, Nigeria).

---

## 🚀 Quick Start in VS Code

### 1. Prerequisites
Make sure you have installed on your computer:
* **Node.js**: v18.0.0 or higher (Node 20+ LTS recommended) -> [Download Node.js](https://nodejs.org/)
* **npm** (comes bundled with Node.js) or **pnpm** / **yarn**
* **VS Code** -> [Download Visual Studio Code](https://code.visualstudio.com/)

---

### 2. Setup & Installation
Open the project folder in VS Code (`File > Open Folder...`), then open the integrated terminal (`Ctrl + ~` or `Cmd + ~`):

```bash
# 1. Install all dependencies
npm install

# 2. Start the local development server
npm run dev
```

The app will start at `http://localhost:3000` (or `http://localhost:5173`).

---

### 3. Environment Variables
Copy `.env.example` to create `.env`:

```bash
cp .env.example .env
```

Set your Supabase credentials:
```env
VITE_SUPABASE_URL=https://brclfzknbsveotjzwzyi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔌 VS Code Recommended Extensions
Install these extensions from the VS Code Marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X`):

1. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   * Autocomplete, linting, and hover previews for Tailwind CSS utility classes.
2. **ESLint** (`dbaeumer.vscode-eslint`)
   * Real-time JavaScript/TypeScript linting and warning highlights.
3. **Prettier - Code formatter** (`esbenp.prettier-vscode`)
   * Consistent code indentation and formatting on save.
4. **TypeScript and JavaScript Language Features** (Built into VS Code)
   * Full IntelliSense, refactoring, and type error checking.
5. **Supabase** (`supabase.supabase-vscode`) *(Optional)*
   * Highlights SQL files and assists with Supabase schema queries.

---

## 📁 Project Architecture

```
├── src/
│   ├── components/          # UI Components
│   │   ├── Header.tsx       # Navbar & company branding
│   │   ├── HeroSection.tsx  # Hero banner & primary CTAs
│   │   ├── TrackingWidget.tsx # Live container/consignment tracker
│   │   ├── ServicesSection.tsx # Port clearing, ocean freight, haulage
│   │   ├── QuoteSection.tsx # "Get Quote" form + Supabase & Resend integration
│   │   ├── ContactSection.tsx # Apapa office contacts, map & "Send Message" form
│   │   ├── AdminPage.tsx    # Management desk for consignments, quotes & messages
│   │   └── Footer.tsx       # Working hours (Mon-Sat), links & certificates
│   ├── data/
│   │   ├── companyData.ts   # Company details, phone, addresses, services
│   │   ├── supabaseClient.ts # Supabase client & SQL schema
│   │   └── adminStore.ts    # Quote submission, consignment & message stores
│   ├── App.tsx              # Root component & page routing
│   └── main.tsx             # React DOM entry point
├── supabase/
│   ├── functions/
│   │   └── send-quote-email/ # Edge Function for automated Resend notifications
│   └── config.toml          # Supabase Edge Function config
├── index.html               # Main HTML entry with SEO metadata
├── package.json             # Scripts & dependencies
└── vite.config.ts           # Vite + Tailwind configuration
```

---

## 🛠 Available NPM Scripts

* `npm run dev` - Start the local Vite development server
* `npm run build` - Compile the production bundle for deployment (Vercel, Netlify, Cloud Run)
* `npm run lint` - Run TypeScript compiler checks (`tsc --noEmit`)
* `npm run preview` - Preview the built production output locally

---

## 📧 Deploying the Supabase Email Edge Function
To enable automated email notifications via Resend:

```bash
# 1. Login to Supabase CLI
npx supabase login

# 2. Link your project
npx supabase link --project-ref brclfzknbsveotjzwzyi

# 3. Set Resend API secret
npx supabase secrets set RESEND_API_KEY="re_your_api_key_here"

# 4. Deploy the function
npx supabase functions deploy send-quote-email --no-verify-jwt
```
