# 🕉️ GitaPath - Shreemad Bhagavad Gita Web App

A modern, beautiful devotional reading web application for exploring the timeless wisdom of the Bhagavad Gita. Built with React, TypeScript, and Tailwind CSS.

## 🌐 Live Demo

**[Visit GitaPath →](https://thegitapath.netlify.app)**

![GitaPath Banner](https://img.shields.io/badge/Spiritual-Wisdom-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## ✨ Features

- 📖 **18 Chapters & 700 Verses** - Complete access to all chapters of the Bhagavad Gita
- 🕉️ **Sanskrit Text** - Original Sanskrit verses with Devanagari font
- 🌐 **Multiple Translations** - English and Hindi translations from renowned scholars
- 📝 **Commentaries** - Detailed commentaries to deepen understanding
- ✍️ **Transliterations** - English, Hindi, Roman transliteration for pronunciation
- 💾 **Save Verses** - Bookmark your favorite verses locally
- 📤 **Share as Image** - Generate and share verses as beautiful images
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable reading
- 🎯 **Daily Verse** - Verse of the day cached for 24 hours
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Playfair Display, Philosopher, Inter, Noto Sans Devanagari

## 🚀 Getting Started

### Prerequisites

- Node.js 20.11.0 or higher
- npm 10.2.4 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd GitaPath
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
GitaPath/
├── src/
│   ├── api/
│   │   └── gitaApi.ts           # API configuration and endpoints
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation with mobile menu
│   │   ├── Footer.tsx           # Footer with attribution
│   │   ├── ChapterCard.tsx      # Chapter display card
│   │   ├── VerseCard.tsx        # Verse card with save/share
│   │   └── JourneyStats.tsx     # Animated statistics component
│   ├── context/
│   │   └── ThemeContext.tsx     # Dark/Light mode context
│   ├── pages/
│   │   ├── Home.tsx             # Homepage with daily verse
│   │   ├── Chapters.tsx         # All chapters list
│   │   ├── ChapterDetail.tsx    # Individual chapter view
│   │   ├── VerseDetail.tsx      # Individual verse view
│   │   ├── SavedVerses.tsx      # Saved/bookmarked verses
│   │   └── About.tsx            # About page
│   ├── App.tsx                  # Main app with routing
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles and Tailwind
├── public/
│   └── logo.png                 # GitaPath logo
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # This file

# Excluded from Git (but generated locally):
# - node_modules/              # npm dependencies (auto-installed)
# - dist/                       # Production build (auto-generated)
# - .env                        # Environment variables (if any)
```

## 🔌 API

This application uses the [Bhagavad Gita API](https://rapidapi.com/bhagavad-gita-bhagavad-gita-default/api/bhagavad-gita3) from RapidAPI.

### Endpoints Used:
- `GET /chapters/` - Fetch all chapters
- `GET /chapters/{id}/` - Fetch specific chapter
- `GET /chapters/{id}/verses/` - Fetch all verses of a chapter
- `GET /chapters/{ch}/verses/{v}/` - Fetch specific verse
- `GET /verses/?query={keyword}` - Search verses

## 🎨 Design Features

- **Theme**: Warm saffron gradient background
- **Cards**: White with shadow and rounded edges
- **Typography**: 
  - Headings: Playfair Display
  - Sanskrit: Noto Sans Devanagari
  - Body: Inter
- **Colors**: Saffron, orange, and gold palette
- **Animations**: Page transitions and hover effects
- **Responsive**: Mobile-first design

## 🌟 Key Pages

### Home
- Welcome message and description
- Daily random verse
- Quick navigation to chapters and search
- Information about the Gita

### Chapters
- Grid view of all 18 chapters
- Chapter summaries and verse counts
- Direct links to read chapters

### Chapter Detail
- All verses of the selected chapter
- Chapter summary
- Previous/Next navigation
- Expandable verse details

### Verse Detail
- Complete verse information
- Sanskrit text, transliteration, translations
- Word meanings and commentaries
- Bookmark and share functionality


## 📄 License

[MIT](https://rem.mit-license.org/)

## 🙏 Attribution

- **API**: Bhagavad Gita API (RapidAPI)
- **Developer**: RAMKRISHNA ([Instagram](https://www.instagram.com/ramkrishnajha5))
- **Fonts**: Google Fonts
- **Icons**: Lucide React

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💖 Support

If this project helps you on your spiritual journey, please give it a ⭐️

---

*"You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions."*  
— Bhagavad Gita 2.47
