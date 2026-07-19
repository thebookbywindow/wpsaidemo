import { FAQ_LINK_RE } from './homeFaq'

/**
 * Render FAQ answer text with [label](https://…) markdown links as external anchors.
 */
export function renderFaqAnswer(answer = '') {
  if (!answer) return null

  const parts = []
  let lastIndex = 0
  FAQ_LINK_RE.lastIndex = 0

  for (const match of answer.matchAll(FAQ_LINK_RE)) {
    const [full, label, href] = match
    const index = match.index ?? 0

    if (index > lastIndex) {
      parts.push(answer.slice(lastIndex, index))
    }

    parts.push(
      <a
        key={`${href}-${index}`}
        href={href}
        className="home-faq-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>,
    )

    lastIndex = index + full.length
  }

  if (lastIndex < answer.length) {
    parts.push(answer.slice(lastIndex))
  }

  return parts.length ? parts : answer
}
