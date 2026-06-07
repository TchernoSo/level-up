import { useState } from 'react'
import type { Question, Mistake } from '../types/quiz'
import ProgressBar from './ProgressBar'
import MultipleChoiceQuestionComponent from './MultipleChoiceQuestion'
import MatchingQuestionComponent from './MatchingQuestion'
import HelpButton from './HelpButton'
import FeedbackBox from './FeedbackBox'

interface QuizCardProps {
  topicName: string
  questions: Question[]
  onQuizComplete: (score: number, mistakes: Mistake[]) => void
}

export default function QuizCard({ topicName, questions, onQuizComplete }: QuizCardProps) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState<Mistake[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [matchingDone, setMatchingDone] = useState(false)
  const [matchingPhrase, setMatchingPhrase] = useState('')

  const question = questions[index]

  function resetState() {
    setSelectedAnswer(null)
    setAnswered(false)
    setIsCorrect(null)
    setShowHelp(false)
    setMatchingDone(false)
    setMatchingPhrase('')
  }

  function handleNext(latestScore: number, latestMistakes: Mistake[]) {
    if (index + 1 >= questions.length) {
      onQuizComplete(latestScore, latestMistakes)
    } else {
      setIndex((i) => i + 1)
      resetState()
    }
  }

  function handleMCAnswer(answer: string) {
    if (answered) return
    if (question.type !== 'multiple-choice') return
    const correct = answer === question.correctAnswer
    setSelectedAnswer(answer)
    setAnswered(true)
    setIsCorrect(correct)
    if (correct) {
      setScore((s) => s + 1)
    } else {
      setMistakes((prev) => [...prev, { question, userAnswer: answer }])
    }
  }

  function handleMatchingComplete(hadErrors: boolean, wrongItems: string[]) {
    setMatchingDone(true)
    setAnswered(true)
    if (!hadErrors) {
      setIsCorrect(true)
      setScore((s) => s + 1)
      setMatchingPhrase('Brilliant! All matched correctly!')
    } else {
      setIsCorrect(false)
      const itemList = wrongItems.length > 0 ? wrongItems.join(', ') : 'some pairs'
      setMistakes((prev) => [...prev, { question, userAnswer: `Needed a second try on: ${itemList}` }])
      setMatchingPhrase('Good try! You got there — have a look at the explanation below.')
    }
  }

  if (!question) return null

  const showFeedback = answered && isCorrect !== null &&
    (question.type === 'multiple-choice' || (question.type === 'matching' && matchingDone))

  return (
    <div className="quiz-layout">
      <div className="quiz-topic-label" aria-label={`Topic: ${topicName}`}>
        {topicName}
      </div>

      <ProgressBar current={index + 1} total={questions.length} score={score} />

      <div className="card question-card">
        {question.type === 'multiple-choice' && (
          <MultipleChoiceQuestionComponent
            question={question}
            selectedAnswer={selectedAnswer}
            answered={answered}
            onAnswer={handleMCAnswer}
          />
        )}

        {question.type === 'matching' && (
          <MatchingQuestionComponent
            key={question.id}
            question={question}
            onComplete={handleMatchingComplete}
          />
        )}

        {/* Keep help button visible until feedback appears (covers the 600ms matching animation gap) */}
        {!showFeedback && (
          <div className="mt-2">
            <HelpButton
              hint={question.hint}
              visible={showHelp}
              onToggle={() => setShowHelp((v) => !v)}
            />
          </div>
        )}
      </div>

      {showFeedback && (
        <FeedbackBox
          isCorrect={isCorrect!}
          explanation={question.explanation}
          onNext={() => handleNext(score, mistakes)}
          phraseOverride={question.type === 'matching' ? matchingPhrase : undefined}
        />
      )}
    </div>
  )
}
