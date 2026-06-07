const CORRECT_PHRASES = [
  'Brilliant!',
  'Well done!',
  'Correct — great work!',
  'Fantastic!',
  'Spot on!',
  'Excellent!',
]

const WRONG_PHRASES = [
  'Not quite — have a look at this:',
  'Good try! Here\'s a helpful explanation:',
  'Have another look:',
  'You\'re close — here\'s a little more help:',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

interface FeedbackBoxProps {
  isCorrect: boolean
  explanation: string
  onNext: () => void
  onTryAgain?: () => void
  phraseOverride?: string
}

export default function FeedbackBox({
  isCorrect,
  explanation,
  onNext,
  onTryAgain,
  phraseOverride,
}: FeedbackBoxProps) {
  const phrase = phraseOverride ?? (isCorrect ? pick(CORRECT_PHRASES) : pick(WRONG_PHRASES))

  return (
    <div className={`feedback-box ${isCorrect ? 'correct' : 'wrong'}`} role="status" aria-live="polite">
      <div className="feedback-header">
        <span aria-hidden="true">{isCorrect ? '✅' : '💛'}</span>
        <span>{phrase}</span>
      </div>

      <p className="feedback-explanation">{explanation}</p>

      <div className="feedback-actions">
        {!isCorrect && onTryAgain && (
          <button className="btn btn-secondary" onClick={onTryAgain}>
            Try again
          </button>
        )}
        <button className="btn btn-primary" onClick={onNext}>
          Next question →
        </button>
      </div>
    </div>
  )
}
