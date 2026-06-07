import type { MultipleChoiceQuestion as MCQ } from '../types/quiz'

interface MultipleChoiceQuestionProps {
  question: MCQ
  selectedAnswer: string | null
  answered: boolean
  onAnswer: (answer: string) => void
}

export default function MultipleChoiceQuestion({
  question,
  selectedAnswer,
  answered,
  onAnswer,
}: MultipleChoiceQuestionProps) {
  return (
    <div>
      <p className="question-text">{question.question}</p>

      {question.sentence && (
        <blockquote className="question-sentence">{question.sentence}</blockquote>
      )}

      <div className="options-grid" role="group" aria-label="Answer options">
        {question.options.map((option) => {
          let stateClass = ''
          if (answered) {
            if (option === question.correctAnswer) stateClass = 'correct'
            else if (option === selectedAnswer) stateClass = 'wrong'
          }

          return (
            <button
              key={option}
              className={`btn-option ${stateClass}`}
              onClick={() => !answered && onAnswer(option)}
              disabled={answered}
              aria-pressed={selectedAnswer === option}
              aria-label={`${option}${answered && option === question.correctAnswer ? ' — correct answer' : ''}${answered && option === selectedAnswer && option !== question.correctAnswer ? ' — your answer, not correct' : ''}`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
