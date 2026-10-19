const STORAGE_PREFIX = 'levelup-seen:'

function readSeen(key: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeSeen(key: string, ids: string[]) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(ids))
  } catch {
    // Storage unavailable (private browsing, disabled, etc.) — repeats just won't be tracked.
  }
}

/**
 * Picks `count` questions from `pool`, avoiding ones already seen in previous
 * sessions for this `historyKey` until the whole pool has been shown once,
 * then starts a fresh cycle. Keeps "Try Again" from replaying the same set
 * in the same order every time.
 */
export function pickSessionQuestions<T extends { id: string }>(
  pool: T[],
  count: number,
  historyKey: string,
  shuffleFn: (arr: T[]) => T[]
): T[] {
  const seen = new Set(readSeen(historyKey))
  let available = pool.filter((q) => !seen.has(q.id))

  if (available.length < count) {
    available = pool
    seen.clear()
  }

  const selected = shuffleFn(available).slice(0, count)
  writeSeen(historyKey, [...seen, ...selected.map((q) => q.id)])
  return selected
}
