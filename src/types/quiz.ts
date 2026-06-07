export type Subject = 'English' | 'Maths'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Topic {
  id: string
  subject: Subject
  name: string
  description: string
  emoji: string
}

interface BaseQuestion {
  id: string
  subject: Subject
  topic: string
  subTopic: string
  difficulty: Difficulty
  hint: string
  explanation: string
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice'
  question: string
  sentence?: string
  options: string[]
  correctAnswer: string
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching'
  question: string
  matches: Array<{ left: string; right: string }>
}

export type Question = MultipleChoiceQuestion | MatchingQuestion

export interface Mistake {
  question: Question
  userAnswer: string
}

export type Screen = 'home' | 'quiz' | 'results' | 'mistakes'
