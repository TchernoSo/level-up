import type { Screen } from '../types/quiz'

interface HeaderProps {
  screen: Screen
  topicName?: string
  onHome: () => void
}

export default function Header({ screen, topicName, onHome }: HeaderProps) {
  const showBack = screen !== 'home'

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <button
            className="header-brand"
            onClick={onHome}
            aria-label="Go to home page"
          >
            <div className="header-logo-block" aria-hidden="true">
              <span className="logo-level">LEVEL</span>
              <span className="logo-up">UP↑</span>
            </div>
            <span className="header-tagline">Level up your learning every day</span>
          </button>

          {showBack && (
            <button
              className="header-back"
              onClick={onHome}
              aria-label="Return to topic selection"
            >
              ← {topicName ? 'Topics' : 'Home'}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
