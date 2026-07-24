import { ArrowUpRight, FileText, Globe, Presentation, Files } from 'lucide-react'
import { useHomeEntityCatalog } from '../hooks/useHomeEntityCatalog'
import { useHomeIntentLinks } from '../hooks/useHomeIntentLinks'
import { useHomePageSeo } from '../hooks/useHomePageSeo'
import { useHomeScrollTopOnMount } from '../hooks/useHomeScrollTopOnMount'
import HomeDownloadSection from './HomeDownloadSection'
import HomeEntityCatalog from './HomeEntityCatalog'
import { flattenHomeFaqs } from '../utils/homeFaq'
import HomeDiffStatValue from './HomeDiffStatValue'
import { formatKeyFactStat, extractKeyFactHref } from '../utils/formatKeyFactStat'
import HomeFaq from './HomeFaq'
import HomeHeroTitle from './HomeHeroTitle'
import HomeIntlAiFeatures from './HomeIntlAiFeatures'
import HomeMediaProof from './HomeMediaProof'
import HomeTrustBar from './HomeTrustBar'
import { renderFaqAnswer } from '../utils/renderFaqAnswer'

const INTENT_CARD_ICONS = {
  'pdf-extension': FileText,
  'wps-office-web': Globe,
  'wps-ai-ppt': Presentation,
  'pdf-to-word': Files,
}

/**
 * SEO/GEO homepage — each section owns one job.
 */
export default function HomePage({
  uiText,
  localeDownloadPath,
  localeAllProductsPath,
  localeAiFeaturesPath,
  currentUrlLocale,
  navigateTo,
  contentLanguage,
}) {
  const home = uiText.home
  const entityCatalogGroups = useHomeEntityCatalog({
    localeDownloadPath,
  })
  const intentLinks = useHomeIntentLinks()
  useHomeScrollTopOnMount()
  useHomePageSeo({
    enabled: true,
    title: home.seoTitle,
    description: home.seoDescription,
    faqs: flattenHomeFaqs(home.faqTopics),
    locale: currentUrlLocale || contentLanguage,
  })

  return (
    <>
      <section className="home-hero-section px-6 text-center">
        <div className="home-section-inner home-hero-inner mx-auto w-full max-w-[1160px]">
          <HomeHeroTitle
            lead={home.heroTitleLead}
            join={home.heroTitleJoin}
            tail={home.heroTitleTail}
            prefix={home.heroTitlePrefix}
            title={home.heroTitle}
          />
          <p className="home-hero-desc mx-auto max-w-[720px]">
            {home.heroDesc}
          </p>
          <div className="home-hero-download">
            <HomeEntityCatalog
              variant="hero"
              title={home.catalogTitle}
              groupLabels={home.catalogGroups}
              groups={entityCatalogGroups}
              navigateTo={navigateTo}
              ctaLabel={home.downloadCta}
            />
          </div>
        </div>
      </section>

      <HomeTrustBar label={home.trustBarLabel} copy={home.trustBar} />

      <HomeIntlAiFeatures
        title={home.intlAiFeatures?.title}
        summary={home.intlAiFeatures?.summary}
        copy={home.intlAiFeatures}
      />

      <section className="home-intent-section px-6 py-12" aria-labelledby="home-intent-title">
        <div className="home-section-inner mx-auto w-full max-w-[1160px]">
          <div className="home-intent-header">
            <h2 id="home-intent-title" className="home-section-title text-[#1a202c]">
              {home.intentLinksTitle}
            </h2>
            {home.intentLinksSub ? (
              <p className="home-intent-sub">{home.intentLinksSub}</p>
            ) : null}
          </div>
          <ul className="home-intent-list">
            {intentLinks.map((item) => {
              const copy = home.intentLinks?.[item.id]
              if (!copy) return null
              const Icon = INTENT_CARD_ICONS[item.id] ?? FileText

              return (
                <li key={item.id}>
                  <a
                    className={`home-intent-card home-intent-card--${item.id}`}
                    href={item.path}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    onClick={(event) => {
                      if (item.external) return
                      event.preventDefault()
                      navigateTo(item.path)
                    }}
                  >
                    <strong className="home-intent-card-title">{copy.label}</strong>
                    <span className="home-intent-card-visual" aria-hidden="true">
                      <Icon className="home-intent-card-icon" strokeWidth={1.6} />
                    </span>
                    <span className="home-intent-card-desc">{copy.desc}</span>
                    <span className="home-intent-card-arrow" aria-hidden="true">
                      <ArrowUpRight size={18} strokeWidth={2} />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="home-diff-section px-6 py-12" aria-labelledby="home-diff-title">
        <div className="home-section-inner mx-auto w-full max-w-[1160px]">
          <h2 id="home-diff-title" className="home-diff-eyebrow">
            {home.keyFactsTitle}
          </h2>
          <div className="home-diff-stats">
            {(home.keyFacts ?? []).map((item) => {
              const { value, label } = formatKeyFactStat(item.title)
              const href = extractKeyFactHref(item.desc)
              const content = (
                <>
                  <HomeDiffStatValue value={value} />
                  <p className="home-diff-stat-label">{label || item.title}</p>
                  <p className="sr-only">{renderFaqAnswer(item.desc)}</p>
                </>
              )

              if (href) {
                return (
                  <a
                    key={item.title}
                    className="home-diff-stat home-diff-stat--link"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                )
              }

              return (
                <article key={item.title} className="home-diff-stat">
                  {content}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <HomeMediaProof title={home.mediaProofTitle} tabsCopy={home.mediaProofTabs} />

      <HomeFaq title={home.faqTitle} faqTopics={home.faqTopics} />

      <HomeDownloadSection copy={home.downloadSection} />
    </>
  )
}
