import type { Topic } from '../types/quiz'

interface TopicCardProps {
  topic: Topic
  onStart: () => void
}

export default function TopicCard({ topic, onStart }: TopicCardProps) {
  return (
    <article className={`card topic-card topic-card--${topic.subject.toLowerCase()}`} aria-label={`Topic: ${topic.name}`}>
      <div className="topic-card-emoji" aria-hidden="true">{topic.emoji}</div>
      <h3 className="topic-card-name">{topic.name}</h3>
      <p className="topic-card-desc">{topic.description}</p>
      <button
        className="btn btn-primary topic-card-btn"
        onClick={onStart}
        aria-label={`Start practice for ${topic.name}`}
      >
        Start Practice
      </button>
    </article>
  )
}
