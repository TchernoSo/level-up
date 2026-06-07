import type { Question } from '../types/quiz'
import { englishQuestions } from './english-questions'
import { mathsQuestions } from './maths-questions'
import { spellingQuestions } from './spelling-questions'
import { capitalsQuestions } from './capitals-questions'

export const allQuestions: Question[] = [
  ...englishQuestions,
  ...mathsQuestions,
  ...spellingQuestions,
  ...capitalsQuestions,
]
