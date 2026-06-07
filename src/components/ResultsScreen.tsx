import type { Mistake } from '../types/quiz'

interface ResultsScreenProps {
  score: number
  total: number
  topicName: string
  mistakes: Mistake[]
  onReviewMistakes: () => void
  onTryAgain: () => void
  onHome: () => void
}

function getMessage(score: number, total: number): string {
  const pct = total > 0 ? score / total : 0
  if (pct === 1) return 'Perfect score! Incredible work — you got every single one right!'
  if (pct >= 0.7) return `You answered ${score} out of ${total} correctly. Great effort! Review your mistakes and keep going.`
  if (pct >= 0.4) return `You answered ${score} out of ${total} correctly. Good work — have a look at your mistakes and try again.`
  return `You answered ${score} out of ${total} correctly. Keep going — every attempt helps you improve!`
}

function getEmoji(score: number, total: number): string {
  const pct = total > 0 ? score / total : 0
  if (pct === 1) return '🏆'
  if (pct >= 0.7) return '⭐'
  if (pct >= 0.4) return '💪'
  return '🌱'
}

export default function ResultsScreen({
  score,
  total,
  topicName,
  mistakes,
  onReviewMistakes,
  onTryAgain,
  onHome,
}: ResultsScreenProps) {
  return (
    <div className="results-screen">
      <div className="card results-card">
        <span className="results-emoji" aria-hidden="true">{getEmoji(score, total)}</span>
        <div className="results-score" aria-label={`Score: ${score} out of ${total}`}>
          {score} / {total}
        </div>
        <p className="results-total">{topicName}</p>
        <p className="results-message">{getMessage(score, total)}</p>
      </div>

      <div className="results-actions">
        {mistakes.length > 0 && (
          <button className="btn btn-primary" onClick={onReviewMistakes}>
            Review Your Mistakes ({mistakes.length})
          </button>
        )}
        <button className="btn btn-secondary" onClick={onTryAgain}>
          Try Again
        </button>
        <button className="btn btn-ghost" onClick={onHome}>
          Choose Another Topic
        </button>
      </div>
    </div>
  )
}
