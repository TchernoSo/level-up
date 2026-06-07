import type { Topic } from '../types/quiz'
import TopicCard from './TopicCard'

interface TopicSelectionProps {
  topics: Topic[]
  onStart: (topic: Topic) => void
}

export default function TopicSelection({ topics, onStart }: TopicSelectionProps) {
  const subjects = [...new Set(topics.map((t) => t.subject))]

  return (
    <div className="topic-selection">
      <div className="welcome-banner">
        <h1>Welcome to Level UP! ⭐</h1>
        <p>Choose a topic below to start practising. Take your time — every question helps you improve!</p>
      </div>

      {subjects.map((subject) => (
        <section key={subject} aria-labelledby={`subject-${subject}`} className={`subject-section subject-section--${subject.toLowerCase()}`}>
          <h2 id={`subject-${subject}`} className="subject-section-title">
            <span aria-hidden="true">{subject === 'English' ? '📖' : '🔢'}</span>
            {subject}
          </h2>
          <div className="topic-grid">
            {topics
              .filter((t) => t.subject === subject)
              .map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  onStart={() => onStart(topic)}
                />
              ))}
          </div>
        </section>
      ))}

    </div>
  )
}
