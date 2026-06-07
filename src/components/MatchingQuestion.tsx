import { useRef, useState } from 'react'
import type { MatchingQuestion as MQ } from '../types/quiz'
import { shuffle } from '../utils/shuffle'

interface MatchingQuestionProps {
  question: MQ
  onComplete: (hadErrors: boolean, wrongLeftItems: string[]) => void
}

export default function MatchingQuestion({ question, onComplete }: MatchingQuestionProps) {
  const rightItems = useRef(shuffle(question.matches.map((m) => m.right)))

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState<Record<string, string>>({}) // left → right
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([])
  const [flashWrong, setFlashWrong] = useState<string | null>(null) // right item key
  const completedRef = useRef(false)

  const correctMap = Object.fromEntries(question.matches.map((m) => [m.left, m.right]))
  const matchedRights = new Set(Object.values(confirmed))

  function handleLeftClick(left: string) {
    if (confirmed[left]) return
    setSelectedLeft((prev) => (prev === left ? null : left))
    setFlashWrong(null)
  }

  function handleRightClick(right: string) {
    if (matchedRights.has(right)) return
    if (!selectedLeft) return

    if (correctMap[selectedLeft] === right) {
      const next = { ...confirmed, [selectedLeft]: right }
      setConfirmed(next)
      setSelectedLeft(null)
      setFlashWrong(null)

      if (Object.keys(next).length === question.matches.length && !completedRef.current) {
        completedRef.current = true
        const hadErrors = wrongAttempts.length > 0
        setTimeout(() => onComplete(hadErrors, [...new Set(wrongAttempts)]), 600)
      }
    } else {
      setFlashWrong(right)
      if (!wrongAttempts.includes(selectedLeft)) {
        setWrongAttempts((prev) => [...prev, selectedLeft])
      }
      setTimeout(() => {
        setFlashWrong(null)
        setSelectedLeft(null)
      }, 700)
    }
  }

  return (
    <div>
      <p className="question-text">{question.question}</p>

      <div className="matching-grid">
        {/* Left column */}
        <div>
          <div className="matching-column-label" aria-hidden="true">Match these</div>
          <div className="matching-items" role="group" aria-label="Items to match on the left">
            {question.matches.map(({ left }) => (
              <button
                key={left}
                className={`btn-match ${
                  confirmed[left] ? 'matched' : selectedLeft === left ? 'selected' : ''
                }`}
                onClick={() => handleLeftClick(left)}
                disabled={!!confirmed[left]}
                aria-pressed={selectedLeft === left}
                aria-label={confirmed[left] ? `${left} — matched with ${confirmed[left]}` : left}
              >
                {left} {confirmed[left] && <span aria-hidden="true"> ✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="matching-column-label" aria-hidden="true">…to these</div>
          <div className="matching-items" role="group" aria-label="Items to match on the right">
            {rightItems.current.map((right) => {
              const isMatched = matchedRights.has(right)
              return (
                <button
                  key={right}
                  className={`btn-match ${
                    isMatched ? 'matched' : flashWrong === right ? 'flash-wrong' : ''
                  }`}
                  onClick={() => handleRightClick(right)}
                  disabled={isMatched}
                  aria-label={isMatched ? `${right} — already matched` : right}
                >
                  {right} {isMatched && <span aria-hidden="true"> ✓</span>}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p className="matching-hint-text" aria-live="polite">
        {selectedLeft
          ? `Selected: ${selectedLeft} — now click the matching word on the right`
          : 'Click a word on the left, then click its match on the right'}
      </p>
    </div>
  )
}
