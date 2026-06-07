interface HelpButtonProps {
  hint: string
  visible: boolean
  onToggle: () => void
}

export default function HelpButton({ hint, visible, onToggle }: HelpButtonProps) {
  return (
    <div className="help-section">
      <button
        className="btn-help"
        onClick={onToggle}
        aria-expanded={visible}
        aria-controls="hint-panel"
      >
        {visible ? '✕ Hide hint' : '💡 I need help'}
      </button>

      {visible && (
        <div className="hint-box" id="hint-panel" role="note">
          <div className="hint-label">Hint</div>
          <p className="hint-text">{hint}</p>
        </div>
      )}
    </div>
  )
}
