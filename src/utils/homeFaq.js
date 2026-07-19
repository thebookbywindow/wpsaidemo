const FAQ_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g

/** Strip markdown links to plain text for FAQPage JSON-LD. */
export function faqAnswerPlainText(answer = '') {
  return answer.replace(FAQ_LINK_RE, '$1 ($2)')
}

/**
 * Flatten topic-grouped homepage FAQs for FAQPage JSON-LD.
 */
export function flattenHomeFaqs(faqTopics = {}) {
  return Object.values(faqTopics)
    .flatMap((topic) => topic?.faqs ?? [])
    .map((item) => ({
      ...item,
      answer: faqAnswerPlainText(item.answer),
    }))
}

export { FAQ_LINK_RE }
