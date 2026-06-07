import { useState, useCallback } from 'react'
import './styles/global.css'

import type { Topic, Question, Mistake, Screen } from './types/quiz'
import { topics } from './data/topics'
import { allQuestions } from './data/questions'
import { shuffle } from './utils/shuffle'

import Header from './components/Header'
import TopicSelection from './components/TopicSelection'
import QuizCard from './components/QuizCard'
import ResultsScreen from './components/ResultsScreen'
import MistakeReview from './components/MistakeReview'

const QUESTIONS_PER_SESSION = 10

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null)
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([])
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState<Mistake[]>([])

  const startQuiz = useCallback((topic: Topic) => {
    const pool = allQuestions.filter((q) => q.topic === topic.id)
    const selected = shuffle(pool).slice(0, QUESTIONS_PER_SESSION)
    setActiveTopic(topic)
    setSessionQuestions(selected)
    setScore(0)
    setMistakes([])
    setScreen('quiz')
  }, [])

  const handleQuizComplete = useCallback((finalScore: number, finalMistakes: Mistake[]) => {
    setScore(finalScore)
    setMistakes(finalMistakes)
    setScreen('results')
  }, [])

  const handleTryAgain = useCallback(() => {
    if (activeTopic) startQuiz(activeTopic)
  }, [activeTopic, startQuiz])

  const goHome = useCallback(() => {
    setScreen('home')
    setActiveTopic(null)
    setSessionQuestions([])
    setScore(0)
    setMistakes([])
  }, [])

  const quizKey = activeTopic ? `${activeTopic.id}-${sessionQuestions[0]?.id ?? ''}` : ''

  return (
    <div className="app">
      <Header
        screen={screen}
        topicName={activeTopic?.name}
        onHome={goHome}
      />

      <main className="main-content" id="main">
        <div className="container">
          {screen === 'home' && (
            <TopicSelection topics={topics} onStart={startQuiz} />
          )}

          {screen === 'quiz' && activeTopic && sessionQuestions.length > 0 && (
            <QuizCard
              key={quizKey}
              topicName={activeTopic.name}
              questions={sessionQuestions}
              onQuizComplete={handleQuizComplete}
            />
          )}

          {screen === 'results' && activeTopic && (
            <ResultsScreen
              score={score}
              total={sessionQuestions.length}
              topicName={activeTopic.name}
              mistakes={mistakes}
              onReviewMistakes={() => setScreen('mistakes')}
              onTryAgain={handleTryAgain}
              onHome={goHome}
            />
          )}

          {screen === 'mistakes' && activeTopic && (
            <MistakeReview
              mistakes={mistakes}
              topicName={activeTopic.name}
              onTryAgain={handleTryAgain}
              onHome={goHome}
            />
          )}
        </div>
      </main>
    </div>
  )
}
