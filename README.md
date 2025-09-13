# Quack 🦆 - Portfolio Website

A Slack-inspired portfolio website built with Next.js 14, React, and TailwindCSS.

## Features

- **Slack-like Interface**: Familiar workspace layout with channels and messages
- **Interactive Channels**: Navigate through different sections (#home, #projects, #skills, etc.)
- **Bot Commands**: Use commands like `!about`, `!projects`, `!resume`, `!quack`
- **Easter Egg**: Hidden #duck-pond channel with animated duck and dev jokes
- **Responsive Design**: Works on desktop and mobile devices
- **Resume Download**: Direct PDF download functionality

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Bot Commands

- `!about` - Navigate to home channel
- `!projects` - Show projects
- `!resume` - Download resume
- `!quack` - Unlock secret duck-pond channel

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Responsive Design

## Project Structure

```
quack/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── BotInput.tsx
│   ├── ChatWindow.tsx
│   ├── DuckPond.tsx
│   ├── MessageCard.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── public/
│   └── resume.pdf
└── package.json
```