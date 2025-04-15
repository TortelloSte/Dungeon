# 📦 Changelog – Not Mini Crawler Landing Page

> All updates related to the public landing page of the project “Not Mini Crawler”. This project serves as both a real product and an educational showcase of modern web development best practices using React.

---

## [1.1.0] – 2025-04-15

### 🧼 Refactored
- 🧱 Full modularization of page sections into independent components (`HeroSection`, `FeaturesSection`, `TrailerSection`, `NewsletterForm`, `Footer`, etc.).
- 🗂️ Cleaned up imports and removed unused code (e.g. unused `Link`).
- 🗨️ Moved dynamic modals for privacy/contact into conditional JSX with translation support.
- 🌐 Improved structure of `translation.json` (consolidated pricing plans, removed redundancy).
- ⚡ Removed UI buttons from PremiumComparison (temporarily disabled, left in-code as comments).
- 🌍 Added accessibility roles and labels where applicable (modals, forms, chatbot).
- 🪄 Minor UI tweaks for consistency across all screen sizes.

### ✅ Fixed
- ✅ Duplicate `useEffect` import removed.
- ✅ Removed unused state (`showPrivacy`).
- ✅ Prevented page scroll when modal is open.
- ✅ Smoothed animation and structure for cookie consent banner.
- ✅ Fixed spacing and alignment in pricing grid on small viewports.

---

## [1.0.0] – 2025-04-06

### ✨ Added
- 💥 Hero section with animated title, subtitle and two CTAs (“Join Beta” + “Watch Trailer”).
- 🌍 Fully responsive layout for desktop, tablet, and mobile.
- 🌐 Language switcher (IT | EN) with `react-i18next`.
- 🎥 Trailer section with embedded autoplaying video and cover.
- 🧩 Features block with updated icons and translations.
- 🥇 Free vs Premium comparison block with animation transitions.
- 📬 Newsletter form with Supabase integration and domain validation.
- 📧 Separate Beta signup form + Supabase database.
- 🍪 Cookie banner with persistent consent + i18n support.
- 🗃️ Modal-based Privacy & Contact policy content (no routing).
- 🤖 Chatbot with FAQ, basic form validation, profanity check, and bounce animation.
- 🎨 Favicon icon (custom rune-inspired icon) and page title updated.
- 📈 Analytics integration using Plausible.
- 🧼 GitHub `.gitignore` file updated to exclude local and sensitive assets.

---

### 📌 Upcoming (planned)
- 🔐 User Sign-Up with email/phone confirmation via code.
- 🧑‍💻 Dynamic dashboard with character creation (free/premium).
- 🗺️ Procedural dungeon map builder.
- ⚔️ Combat system with card mechanics.
- 👥 Multiplayer campaign options.

---

Feel free to fork this project and use it as a boilerplate for your fantasy-themed game sites.  
© 2025 – All rights reserved by Mini Muuu.
