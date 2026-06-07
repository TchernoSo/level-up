import type { Topic } from '../types/quiz'

export const topics: Topic[] = [
  // English
  {
    id: 'word-types',
    subject: 'English',
    name: 'Word Types',
    description: 'Learn about nouns, verbs, adjectives, adverbs and more.',
    emoji: '📚',
  },
  {
    id: 'grammar-skills',
    subject: 'English',
    name: 'Grammar Skills',
    description: 'Explore sentences, clauses, fronted adverbials, direct speech and more.',
    emoji: '✏️',
  },
  {
    id: 'spellings',
    subject: 'English',
    name: 'Spellings',
    description: 'Practise tricky spellings — from double letters to \'i before e\' and more.',
    emoji: '🔤',
  },
  {
    id: 'capital-letters',
    subject: 'English',
    name: 'Capital Letters',
    description: 'Spot where capital letters are needed — proper nouns, days, months and more.',
    emoji: '🅰️',
  },
  // Maths
  {
    id: 'times-tables',
    subject: 'Maths',
    name: 'Times Tables',
    description: 'Practise your multiplication and division facts up to 12 × 12.',
    emoji: '✖️',
  },
  {
    id: 'multiply-divide',
    subject: 'Maths',
    name: 'Multiply and Divide by 10, 100 and 1,000',
    description: 'Understand how digits move through place value columns.',
    emoji: '🔢',
  },
  // Add new topics here
]
