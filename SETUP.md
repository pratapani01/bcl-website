# BCL Website v3 — Complete Firebase Setup Guide
# Simple, Reliable Admin System with Google Sign-In

═══════════════════════════════════════════════════════════
  WHO CAN LOG IN
═══════════════════════════════════════════════════════════

  bcl.t20.cricket@gmail.com  →  OWNER ADMIN (can edit everything)
  pratapani01@gmail.com      →  MANAGER    (read-only view)
  Any other Google account   →  ACCESS DENIED

  NO UID setup needed. NO Firestore user docs. 
  Role is 100% determined by the Google email address.

═══════════════════════════════════════════════════════════
  STEP 1 — CREATE FIREBASE PROJECT
═══════════════════════════════════════════════════════════

1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Name it: bcl-website  (or anything you like)
4. Disable Google Analytics (not needed) → "Create project"
5. Wait for it to finish, then click "Continue"

═══════════════════════════════════════════════════════════
  STEP 2 — ENABLE GOOGLE SIGN-IN
═══════════════════════════════════════════════════════════

1. In your Firebase project, click "Authentication" in the left menu
2. Click "Get started"
3. Click the "Sign-in method" tab
4. Click "Google" in the provider list
5. Toggle the "Enable" switch to ON
6. Enter a "Project support email" (use bcl.t20.cricket@gmail.com)
7. Click "Save"

That's it! Google Sign-In is now enabled.

═══════════════════════════════════════════════════════════
  STEP 3 — CREATE FIRESTORE DATABASE
═══════════════════════════════════════════════════════════

1. Click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in production mode" → click "Next"
4. Choose region: asia-south1 (Mumbai) → click "Enable"
5. Wait for it to be created

═══════════════════════════════════════════════════════════
  STEP 4 — SET FIRESTORE RULES
═══════════════════════════════════════════════════════════

1. In Firestore, click the "Rules" tab
2. Delete all existing text
3. Paste this:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // settings/main — public read, only bcl.t20.cricket@gmail.com can write
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.email == 'bcl.t20.cricket@gmail.com';
    }
  }
}

4. Click "Publish"

═══════════════════════════════════════════════════════════
  STEP 5 — GET YOUR FIREBASE CONFIG
═══════════════════════════════════════════════════════════

1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the "</>" (Web) icon to add a web app
5. Give it a nickname: "bcl-web"
6. Do NOT check "Firebase Hosting"
7. Click "Register app"
8. You will see a block of code like this:

   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "bcl-website-xxxx.firebaseapp.com",
     projectId: "bcl-website-xxxx",
     storageBucket: "bcl-website-xxxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };

9. Copy these 6 values — you need them in the next step.

═══════════════════════════════════════════════════════════
  STEP 6 — PASTE CONFIG INTO THE PROJECT
═══════════════════════════════════════════════════════════

Open this file in your code editor:
  src/firebase/config.js

Replace each placeholder value with your actual values:

  apiKey:            "PASTE_YOUR_API_KEY_HERE"
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN_HERE"
  projectId:         "PASTE_YOUR_PROJECT_ID_HERE"
  storageBucket:     "PASTE_YOUR_STORAGE_BUCKET_HERE"
  messagingSenderId: "PASTE_YOUR_SENDER_ID_HERE"
  appId:             "PASTE_YOUR_APP_ID_HERE"

Save the file.

═══════════════════════════════════════════════════════════
  STEP 7 — ALLOW YOUR DOMAIN IN FIREBASE AUTH
═══════════════════════════════════════════════════════════

(Do this AFTER deploying, or use localhost for testing)

1. Firebase Console → Authentication → Settings tab
2. Click "Authorized domains"
3. Click "Add domain"
4. Add your Vercel/production domain e.g.: bcl-website.vercel.app
5. Also add: localhost (for local testing)
6. Click "Add"

═══════════════════════════════════════════════════════════
  STEP 8 — INSTALL & RUN LOCALLY
═══════════════════════════════════════════════════════════

In your terminal, inside the project folder:

  npm install
  npm run dev

Open browser: http://localhost:5173

Public website: http://localhost:5173/
Admin login:   http://localhost:5173/admin/login

Sign in with bcl.t20.cricket@gmail.com → Opens Admin Panel
Sign in with pratapani01@gmail.com     → Opens Manager Panel

═══════════════════════════════════════════════════════════
  STEP 9 — DEPLOY TO VERCEL
═══════════════════════════════════════════════════════════

Option A: Vercel CLI
  npm install -g vercel
  vercel

Option B: GitHub + Vercel Dashboard
  1. Push project to GitHub
  2. Go to vercel.com → "Add New Project"
  3. Import your GitHub repo
  4. Framework: Vite
  5. Click "Deploy"

The vercel.json file already handles SPA routing,
so /admin/* and /manager/* routes work correctly.

═══════════════════════════════════════════════════════════
  FIRESTORE DATA STRUCTURE
═══════════════════════════════════════════════════════════

Only ONE collection is needed:

  Collection: settings
  Document:   main

The app auto-creates this document with default values
on the very first visit. Nothing to set up manually.

Fields stored in settings/main:
  registrationOpen:   false           ← true/false
  announcementText:   "BCL Season 1…"
  popupText:          "Welcome to BCL…"
  comingSoonText:     "Coming soon…"
  whatsappNumber:     "919250324379"
  batsmanFormLink:    "https://forms.gle/…"
  bowlerFormLink:     "https://forms.gle/…"
  allRounderFormLink: "https://forms.gle/…"
  prizeWinner:        "₹15 Lakhs"
  prizeRunnerUp:      "₹7 Lakhs"
  prizeAuctionBase:   "₹51K"
  auctionText:        "Minimum Base Price"
  trialsCityCount:    "20+"
  heroTitle:          "Bharatiya Cricket League"
  heroSubtitle:       "Season 1 Registrations Coming Soon"
  showPrizeSection:   true
  showTrialsSection:  true
  showTimeline:       true
  showTeamsSection:   true

═══════════════════════════════════════════════════════════
  ADMIN PANEL ROUTES
═══════════════════════════════════════════════════════════

  /admin/login       → Login (Google Sign-In)
  /admin             → Admin Dashboard
  /admin/registration→ Toggle registration ON/OFF + WhatsApp + Cities
  /admin/forms       → Edit all 3 Google Form links separately
  /admin/popup       → Edit popup text, announcement, coming soon text
  /admin/homepage    → Edit hero text, prize money, auction text
  /admin/sections    → Show/hide homepage sections
  /admin/denied      → Access denied page

  /manager           → Manager Dashboard (read-only)
  /manager/settings  → View all settings (read-only)

═══════════════════════════════════════════════════════════
  HOW REAL-TIME UPDATES WORK
═══════════════════════════════════════════════════════════

When you save any setting in the Admin Panel:
  1. It saves to Firestore (settings/main document)
  2. Firestore notifies ALL connected browsers instantly
  3. The website updates WITHOUT any page refresh
  4. NO redeploy needed. Changes go live in < 1 second.

═══════════════════════════════════════════════════════════
  TROUBLESHOOTING
═══════════════════════════════════════════════════════════

Problem: "auth/unauthorized-domain" error on login
Fix: Add your domain in Firebase → Authentication → Settings → Authorized Domains

Problem: Google popup blocked
Fix: Allow popups for your site in the browser

Problem: Settings not saving
Fix: Check that your Google account is bcl.t20.cricket@gmail.com
     and that Firestore rules are published correctly (Step 4)

Problem: "Cannot find module firebase/app"
Fix: Run: npm install

═══════════════════════════════════════════════════════════
