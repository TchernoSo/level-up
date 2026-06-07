# Level UP ⭐

An educational quiz app for Year 5 children, built with React, TypeScript and Vite.

## Topics

### English
- **Word Types** — nouns, verbs, adjectives, adverbs, pronouns, conjunctions and more (30 questions)
- **Grammar Skills** — sentences, clauses, fronted adverbials, direct speech, parenthesis (20 questions)
- **Spellings** — double letters, i before e, tricky words, word families (15 questions)
- **Capital Letters** — proper nouns, days, months, pronoun I, spotting errors (12 questions)

### Maths
- **Times Tables** — multiplication, division, missing numbers, word problems, fact families (30 questions)
- **Multiply and Divide by 10, 100 and 1,000** — place value, decimals, inverse operations (30 questions)

## Features

- 10 randomly chosen questions per session from a larger pool — different every time
- Multiple choice and click-to-match question types
- "I need help" hint button on every question
- Kind explanation shown after every wrong answer
- Mistake tracker — review questions you found tricky at the end
- Encouraging results screen with score and personalised message
- Responsive layout — works on mobile and desktop
- No login, no database, no backend — pure frontend

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Adding a new topic

1. Add a `Topic` object to `src/data/topics.ts`
2. Create `src/data/<topic>-questions.ts` with your questions
3. Import and add the questions to `src/data/questions.ts`

That's it — the home screen and routing update automatically.

## Tech stack

- React 18
- TypeScript (strict mode)
- Vite
- Plain CSS with custom properties (no framework)
- Google Font: Nunito
