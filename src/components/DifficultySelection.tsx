import type { DifficultyChoice, Question, Topic } from '../types/quiz'

interface DifficultySelectionProps {
  topic: Topic
  questions: Question[]
  onSelect: (difficulty: DifficultyChoice) => void
}

const LEVELS: Array<{ id: DifficultyChoice; label: string; emoji: string; desc: string }> = [
  { id: 'easy', label: 'Easy', emoji: '🌱', desc: 'Great for getting started' },
  { id: 'medium', label: 'Medium', emoji: '⭐', desc: 'A good everyday challenge' },
  { id: 'hard', label: 'Hard', emoji: '🔥', desc: 'For confident learners' },
  { id: 'all', label: 'All Levels', emoji: '🎲', desc: 'A mix of everything' },
]

export default function DifficultySelection({ topic, questions, onSelect }: DifficultySelectionProps) {
  const countFor = (level: DifficultyChoice) =>
    level === 'all' ? questions.length : questions.filter((q) => q.difficulty === level).length

  return (
    <div className="difficulty-selection">
      <div className="welcome-banner">
        <h1>
          {topic.emoji} {topic.name}
        </h1>
        <p>Choose a difficulty to start practising.</p>
      </div>

      <div className="difficulty-grid">
        {LEVELS.map((level) => {
          const count = countFor(level.id)
          const disabled = count === 0
          return (
            <button
              key={level.id}
              className={`card difficulty-card difficulty-card--${level.id}`}
              onClick={() => onSelect(level.id)}
              disabled={disabled}
              aria-label={`Start ${level.label} practice for ${topic.name}`}
            >
              <span className="difficulty-card-emoji" aria-hidden="true">{level.emoji}</span>
              <span className="difficulty-card-name">{level.label}</span>
              <span className="difficulty-card-desc">{level.desc}</span>
              <span className="difficulty-card-count">
                {disabled ? 'No questions yet' : `${count} question${count === 1 ? '' : 's'} available`}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
