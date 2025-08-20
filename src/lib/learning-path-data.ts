import type { LearningLevel } from './types';

export const learningLevels: LearningLevel[] = [
  {
    title: 'Level 1',
    description: 'Essentials for Reverts (Immediate Practice & Identity)',
    categories: [
      {
        name: 'Shahādah & Core Beliefs',
        topics: [
          { title: 'Tawhid', description: 'Meaning of lā ilāha illā Allāh', icon: 'Tawhid' },
          { title: 'Prophethood', description: 'Finality of Muhammad ﷺ', icon: 'Prophets' },
          { title: 'Akhirah', description: 'Life after death', icon: 'Afterlife' },
        ],
      },
      {
        name: 'Ṣalāh (Prayer)',
        topics: [
            { title: 'Step-by-step guide', description: 'Transliteration & meaning', icon: 'Salah' },
            { title: 'Learning al-Fātiḥah', description: 'The opening chapter', icon: 'Salah' },
            { title: 'Short Surahs', description: 'Ikhlāṣ, Falaq, Nās', icon: 'Salah' },
        ],
      },
       {
        name: 'Purification (Ṭahārah)',
        topics: [
            { title: 'Wudū’ (ablution)', description: 'Step-by-step guide', icon: 'Purification' },
            { title: 'Ghusl (full bath)', description: 'Ritual purification', icon: 'Purification' },
            { title: 'Tayammum (dry ablution)', description: 'When water is unavailable', icon: 'Purification' },
        ],
      },
      {
        name: 'Daily Practices',
        topics: [
            { title: 'Daily Adhkār', description: 'Remembrances for daily life', icon: 'Adhkar' },
            { title: 'Halāl & Harām Basics', description: 'Food, drink, and clothing', icon: 'Halal & Haram' },
        ],
      }
    ],
  },
  {
    title: 'Level 2',
    description: 'Growing Understanding of Islam (Context & Spirituality)',
    categories: [
      {
        name: 'Foundational Knowledge',
        topics: [
          { title: 'Life of the Prophet ﷺ', description: 'Overview of the Sīrah', icon: 'Sirah' },
          { title: 'The Qur\'an', description: 'Revelation and preservation', icon: 'Quran' },
          { title: 'Community (Ummah)', description: 'The role of the mosque', icon: 'Community' },
        ],
      },
      {
        name: 'Spiritual Development (Tazkiyah)',
        topics: [
          { title: 'Sincerity (Ikhlāṣ)', description: 'The foundation of deeds', icon: 'Spirituality' },
          { title: 'Gratitude (Shukr)', description: 'Appreciating Allah\'s blessings', icon: 'Spirituality' },
          { title: 'Patience (Ṣabr)', description: 'Virtue in times of hardship', icon: 'Spirituality' },
        ],
      },
    ],
  },
  {
    title: 'Level 3',
    description: 'Contemporary & Common Questions',
    categories: [
      {
        name: 'Cultural & Historical Context',
        topics: [
          { title: 'Is Islam an "Arabic religion"?', description: 'Universality of the faith', icon: 'Islam & Universality' },
          { title: 'How did Islam spread?', description: 'Beyond the "sword" narrative', icon: 'Spread of Islam' },
          { title: 'Why did the Prophet ﷺ marry Aisha?', description: 'Context and wisdom', icon: 'Prophet & Aisha' },
        ],
      },
      {
        name: 'Modern Topics',
        topics: [
          { title: 'Women in Islam', description: 'Rights, roles, and status', icon: 'Women in Islam' },
          { title: 'Jihad and Misconceptions', description: 'The greater and lesser struggle', icon: 'Jihad' },
          { title: 'Islam & Modernity', description: 'Faith in the contemporary world', icon: 'Islam & Modernity' },
          { title: 'Islamophobia FAQs', description: 'Answering common questions', icon: 'Islamophobia' },
        ],
      },
    ],
  },
];
