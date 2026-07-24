import { HOME_FAQ_TOPIC_IDS } from '../data/homeFaqTopics'

const FAQ_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g

/** Strip markdown links to plain text for FAQPage JSON-LD. */
export function faqAnswerPlainText(answer = '') {
  return answer.replace(FAQ_LINK_RE, '$1 ($2)')
}

/** Keep link labels only — drop URLs (for UI that already has its own outbound links). */
export function faqAnswerLinkLabels(answer = '') {
  FAQ_LINK_RE.lastIndex = 0
  return `${answer}`.replace(FAQ_LINK_RE, '$1')
}

/**
 * Flatten topic-grouped homepage FAQs for FAQPage JSON-LD.
 * Preserves HOME_FAQ_TOPIC_IDS order so AI FAQs lead the schema.
 */
export function flattenHomeFaqs(faqTopics = {}) {
  return HOME_FAQ_TOPIC_IDS.flatMap((id) => faqTopics[id]?.faqs ?? []).map((item) => ({
    ...item,
    answer: faqAnswerPlainText(item.answer),
  }))
}

export { FAQ_LINK_RE }
