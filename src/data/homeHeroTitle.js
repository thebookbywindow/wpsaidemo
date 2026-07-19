/**
 * Splits hero H1 lead so the join word ("across" / "尽在") can stay glued to the typewriter.
 */
export function resolveHeroTitleParts({ lead, join, prefix } = {}) {
  const rawLead = lead ?? prefix ?? ''
  const rawJoin = typeof join === 'string' ? join.trim() : ''

  if (rawJoin) {
    return {
      main: rawLead.replace(/\s+$/, '') ? `${rawLead.replace(/\s+$/, '')} ` : '',
      join: rawJoin,
    }
  }

  const matched = rawLead.match(/^(.*?)\s+(across|尽在)\s*$/iu)
  if (matched) {
    return {
      main: matched[1] ? `${matched[1]} ` : '',
      join: matched[2],
    }
  }

  return { main: rawLead, join: '' }
}
