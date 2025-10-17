# 🕉️ GitaPath - Shreemad Bhagavad Gita Web App

A modern, beautiful devotional reading web application for exploring the timeless wisdom of the Bhagavad Gita. Built with React, TypeScript, and Tailwind CSS.

![GitaPath Banner](https://img.shields.io/badge/Spiritual-Wisdom-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 📖 **18 Chapters** - Complete access to all chapters of the Bhagavad Gita
- 🔍 **Verse Search** - Search verses by keywords (peace, duty, karma, dharma, etc.)
- 🕉️ **Sanskrit Text** - Original Sanskrit verses with Devanagari font
- 🌐 **Translations** - Multiple English translations from renowned scholars
- 📝 **Commentaries** - Detailed commentaries to deepen understanding
- ✍️ **Transliterations** - Roman transliteration for pronunciation
- 💾 **Bookmarks** - Save favorite verses locally
- 📤 **Share Verses** - Share wisdom with friends
- 🎨 **Beautiful UI** - Spiritual theme with warm golden palette
- 📱 **Responsive** - Perfect on desktop, tablet, and mobile
- ⚡ **Fast & Smooth** - Built with modern web technologies
- 🎭 **Animations** - Smooth page transitions with Framer Motion

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **API Calls**: Axios
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
src/
├── api/
│   └── gitaApi.ts          # API configuration and endpoints
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer with attribution
│   ├── ChapterCard.tsx     # Chapter display card
│   └── VerseCard.tsx       # Verse display card
├── pages/
│   ├── Home.tsx            # Homepage with daily verse
│   ├── Chapters.tsx        # All chapters list
│   ├── ChapterDetail.tsx   # Individual chapter view
│   ├── VerseDetail.tsx     # Individual verse view
│   ├── Search.tsx          # Search functionality
│   └── About.tsx           # About page
├── App.tsx                 # Main app component with routing
├── main.tsx               # Entry point
└── index.css              # Global styles and Tailwind
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

This project is created for educational and spiritual purposes.

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
