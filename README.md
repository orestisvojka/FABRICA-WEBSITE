# Fabrica® Studio Website Clone

A high-performing, pixel-perfect, multi-page web application clone of **Fabrica® Studio** (https://fabrica.framer.media/).

## 🚀 Features

- **Typography**: Built with official **Geist** (Display) & **Inter** (Body) font families.
- **Styling**: Vanilla CSS Design System with dark mode obsidian theme (`#121212`), high contrast sections, smooth transitions, and responsive grid layouts.
- **Multi-Page Routing**: Powered by `react-router-dom`:
  - ` / ` — Home page (Hero, Selected Work, Services Accordion, Testimonial Slider, Pricing toggle, FAQ)
  - ` /studio ` — Studio Manifesto, Team profiles, Capabilities, Client Roster, Awards
  - ` /projects ` — Projects showcase with real-time Search bar & Category filter
  - ` /projects/:slug ` — Case study detail renderer with metadata, narrative, gallery, and next project navigation
  - ` /blog ` & ` /blog/:slug ` — Journal grid and full article reader
  - ` /contact ` — Contact form with interactive submit state and direct studio details
  - ` /terms ` & ` /privacy ` — Terms of service and privacy policy pages

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```text
C:\Users\user\Desktop\FABRICA WEBSITES\
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── FloatingAvatar.jsx
│   ├── data/
│   │   ├── projects.js
│   │   ├── blog.js
│   │   ├── services.js
│   │   ├── team.js
│   │   └── faqs.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Studio.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPostDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── Terms.jsx
│   │   └── Privacy.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```
