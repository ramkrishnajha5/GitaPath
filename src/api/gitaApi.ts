import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vedicscriptures.github.io',
  timeout: 10000,
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
    const response = await api.get('/chapters');
    const chapters = response.data;

    // Map the API response to our Chapter interface
    return chapters.map((chapter: any, index: number) => ({
      id: index + 1,
      chapter_number: chapter.chapter_number,
      name: chapter.name,
      name_transliterated: chapter.transliteration,
      name_translated: chapter.translation,
      verses_count: chapter.verses_count,
      chapter_summary: chapter.summary?.en || '',
      chapter_summary_hindi: chapter.summary?.hi || '',
    }));
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};

// Fetch a specific chapter
export const getChapter = async (chapterNumber: number): Promise<Chapter> => {
  try {
    const chapters = await getChapters();
    const chapter = chapters.find(ch => ch.chapter_number === chapterNumber);

    if (!chapter) {
      throw new Error(`Chapter ${chapterNumber} not found`);
    }

    return chapter;
  } catch (error) {
    console.error(`Error fetching chapter ${chapterNumber}:`, error);
    throw error;
  }
};

// Fetch all verses of a chapter
export const getChapterVerses = async (chapterNumber: number): Promise<Verse[]> => {
  try {
    // First, get chapter info to know how many verses it has
    const chapterInfo = await api.get(`/chapter/${chapterNumber}`);
    const versesCount = chapterInfo.data.verses_count;

    // Fetch all verses individually
    const versePromises: Promise<Verse | null>[] = [];

    for (let verseNum = 1; verseNum <= versesCount; verseNum++) {
      versePromises.push(
        api.get(`/slok/${chapterNumber}/${verseNum}`)
          .then(response => mapVerseData(response.data, chapterNumber))
          .catch(error => {
            console.error(`Error fetching verse ${chapterNumber}.${verseNum}:`, error);
            return null;
          })
      );
    }

    const results = await Promise.all(versePromises);

    // Filter out any null results from failed requests
    return results.filter(verse => verse !== null) as Verse[];
  } catch (error) {
    console.error(`Error fetching verses for chapter ${chapterNumber}:`, error);
    throw error;
  }
};

// Fetch a specific verse
export const getVerse = async (chapterNumber: number, verseNumber: number): Promise<Verse> => {
  try {
    const response = await api.get(`/slok/${chapterNumber}/${verseNumber}`);
    return mapVerseData(response.data, chapterNumber);
  } catch (error) {
    console.error(`Error fetching verse ${chapterNumber}.${verseNumber}:`, error);
    throw error;
  }
};

// Helper function to map verse data from API to our interface
const mapVerseData = (verseData: any, chapterNumber: number): Verse => {
  const translations: Translation[] = [];
  const commentaries: Commentary[] = [];

  // All available author keys
  const authorKeys = ['tej', 'siva', 'purohit', 'chinmay', 'san', 'gambir', 'madhav', 'anand', 'rams', 'raman',
    'adi', 'abhinav', 'sankar', 'jaya', 'vallabh', 'ms', 'srid', 'dhan', 'venkat', 'puru', 'neel', 'prabhu'];

  let translationId = 1;
  let commentaryId = 1;

  authorKeys.forEach((key) => {
    if (verseData[key]) {
      const data = verseData[key];
      const authorName = (typeof data === 'object' && data.author) ? data.author : (key.charAt(0).toUpperCase() + key.slice(1));

      // Extract translations (et = English translation, ht = Hindi translation)
      if (typeof data === 'object') {
        // Hindi translation
        if (data.ht && typeof data.ht === 'string') {
          translations.push({
            id: translationId++,
            description: data.ht,
            author_name: authorName,
            language: 'hindi',
          });
        }

        // English translation
        if (data.et && typeof data.et === 'string') {
          translations.push({
            id: translationId++,
            description: data.et,
            author_name: authorName,
            language: 'english',
          });
        }

        // Extract commentaries (ec = English commentary, hc = Hindi commentary, sc = Sanskrit commentary)
        if (data.ec && typeof data.ec === 'string') {
          commentaries.push({
            id: commentaryId++,
            description: data.ec,
            author_name: authorName,
            language: 'english',
          });
        }

        if (data.hc && typeof data.hc === 'string') {
          commentaries.push({
            id: commentaryId++,
            description: data.hc,
            author_name: authorName,
            language: 'hindi',
          });
        }

        if (data.sc && typeof data.sc === 'string') {
          commentaries.push({
            id: commentaryId++,
            description: data.sc,
            author_name: authorName,
            language: 'sanskrit',
          });
        }
      } else if (typeof data === 'string') {
        // If it's a plain string, assume it's an English translation
        translations.push({
          id: translationId++,
          description: data,
          author_name: authorName,
          language: 'english',
        });
      }
    }
  });

  return {
    id: verseData._id || `${chapterNumber}-${verseData.verse}`,
    verse_number: verseData.verse,
    chapter_number: chapterNumber,
    slug: `${chapterNumber}-${verseData.verse}`,
    text: verseData.slok || '',
    transliteration: verseData.transliteration || '',
    word_meanings: '', // Not available in this API
    translations,
    commentaries: commentaries.length > 0 ? commentaries : undefined,
  };
};

// Get a random verse for "Daily Verse" feature
export const getRandomVerse = async (): Promise<Verse> => {
  try {
    // Get a random chapter (1-18)
    const randomChapter = Math.floor(Math.random() * 18) + 1;

    // Get chapter info to know how many verses it has
    const chapterInfo = await api.get(`/chapter/${randomChapter}`);
    const versesCount = chapterInfo.data.verses_count;

    // Get a random verse number from that chapter
    const randomVerseNum = Math.floor(Math.random() * versesCount) + 1;

    // Fetch just that one verse
    const verse = await getVerse(randomChapter, randomVerseNum);
    return verse;
  } catch (error) {
    console.error('Error fetching random verse:', error);
    // Fallback: try to get verse 2.1 if random fails
    try {
      return await getVerse(2, 1);
    } catch (fallbackError) {
      throw error;
    }
  }
};

export default api;
