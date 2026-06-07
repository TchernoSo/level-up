import type { Mistake } from '../types/quiz'

interface MistakeReviewProps {
  mistakes: Mistake[]
  topicName: string
  onTryAgain: () => void
  onHome: () => void
}

export default function MistakeReview({ mistakes, topicName, onTryAgain, onHome }: MistakeReviewProps) {
  return (
    <div className="mistake-review">
      <div className="mistake-review-header">
        <div>
          <h2>Practise These Again 💪</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {topicName} · {mistakes.length} to revisit
          </p>
        </div>
      </div>

      {mistakes.map((mistake, i) => {
        const q = mistake.question
        const correctAnswer = q.type === 'multiple-choice' ? q.correctAnswer : 'See the explanation below'

        return (
          <article key={`${q.id}-${i}`} className="card mistake-card" aria-label={`Question ${i + 1} to revisit`}>
            <div>
              <span className="subtopic-chip">{q.subTopic}</span>
            </div>

            <p className="mistake-question">{q.question}</p>

            {q.type === 'multiple-choice' && q.sentence && (
              <p className="mistake-sentence">{q.sentence}</p>
            )}

            <div className="mistake-answer-row">
              <span className="answer-chip yours" aria-label="Your answer">
                Your answer: {mistake.userAnswer}
              </span>
              <span className="answer-chip correct" aria-label="Correct answer">
                Correct: {correctAnswer}
              </span>
            </div>

            <p className="mistake-explanation">{q.explanation}</p>
          </article>
        )
      })}

      <div className="mistake-review-actions">
        <button className="btn btn-primary" onClick={onTryAgain}>
          Try Again
        </button>
        <button className="btn btn-ghost" onClick={onHome}>
          Choose Another Topic
        </button>
      </div>
    </div>
  )
}
