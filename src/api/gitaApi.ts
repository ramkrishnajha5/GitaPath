import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bhagavad-gita3.p.rapidapi.com/v2',
  headers: {
    'X-RapidAPI-Key': 'aef2976712mshc7383c634fd0a45p19b675jsndfcf0ceae518',
    'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
  },
});

export interface Chapter {
  id: number;
  chapter_number: number;
  name: string;
  name_transliterated: string;
  name_translated: string;
  verses_count: number;
  chapter_summary: string;
  chapter_summary_hindi?: string;
}

export interface Verse {
  id: number;
  verse_number: number;
  chapter_number: number;
  slug: string;
  text: string;
  transliteration: string;
  word_meanings: string;
  translations: Translation[];
  commentaries?: Commentary[];
}

export interface Translation {
  id: number;
  description: string;
  author_name: string;
  language: string;
}

export interface Commentary {
  id: number;
  description: string;
  author_name: string;
  language: string;
}

// Fetch all chapters
export const getChapters = async (): Promise<Chapter[]> => {
  try {
    const response = await api.get('/chapters/');
    return response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};

// Fetch a specific chapter
export const getChapter = async (chapterNumber: number): Promise<Chapter> => {
  try {
    const response = await api.get(`/chapters/${chapterNumber}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching chapter ${chapterNumber}:`, error);
    throw error;
  }
};

// Fetch all verses of a chapter
export const getChapterVerses = async (chapterNumber: number): Promise<Verse[]> => {
  try {
    const response = await api.get(`/chapters/${chapterNumber}/verses/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching verses for chapter ${chapterNumber}:`, error);
    throw error;
  }
};

// Fetch a specific verse
export const getVerse = async (chapterNumber: number, verseNumber: number): Promise<Verse> => {
  try {
    const response = await api.get(`/chapters/${chapterNumber}/verses/${verseNumber}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching verse ${chapterNumber}.${verseNumber}:`, error);
    throw error;
  }
};

// Search verses by query
export const searchVerses = async (query: string): Promise<Verse[]> => {
  try {
    const response = await api.get(`/verses/?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching verses:', error);
    throw error;
  }
};

// Get a random verse for "Daily Verse" feature
export const getRandomVerse = async (): Promise<Verse> => {
  try {
    const randomChapter = Math.floor(Math.random() * 18) + 1;
    const verses = await getChapterVerses(randomChapter);
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    return randomVerse;
  } catch (error) {
    console.error('Error fetching random verse:', error);
    throw error;
  }
};

export default api;
