interface ProgressBarProps {
  current: number
  total: number
  score: number
}

export default function ProgressBar({ current, total, score }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0

  return (
    <div aria-label={`Question ${current} of ${total}. Score: ${score}`}>
      <div className="progress-header">
        <span className="progress-label">Question {current} of {total}</span>
        <span className="score-chip" aria-live="polite">Score: {score}</span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
