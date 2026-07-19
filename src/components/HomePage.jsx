import { useHomeEntityCatalog } from '../hooks/useHomeEntityCatalog'
import { useHomeIntentLinks } from '../hooks/useHomeIntentLinks'
import { useHomePageSeo } from '../hooks/useHomePageSeo'
import { useHomeScrollTopOnMount } from '../hooks/useHomeScrollTopOnMount'
import HomeDownloadSection from './HomeDownloadSection'
import HomeEntityCatalog from './HomeEntityCatalog'
import { flattenHomeFaqs } from '../utils/homeFaq'
import HomeFaq from './HomeFaq'
import HomeHeroTitle from './HomeHeroTitle'
import HomeIntlAiFeatures from './HomeIntlAiFeatures'
import HomeMediaProof from './HomeMediaProof'
import HomeTrustBar from './HomeTrustBar'
import { renderFaqAnswer } from '../utils/renderFaqAnswer'

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
    locale: contentLanguage,
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
          <p className="home-hero-desc mx-auto mt-4 max-w-[720px] text-[15px] text-[#4a5568]">
            {home.heroDesc}
          </p>
          <div className="home-hero-download mt-7">
            <HomeEntityCatalog
              variant="hero"
              title={home.catalogTitle}
              groupLabels={home.catalogGroups}
              groups={entityCatalogGroups}
              navigateTo={navigateTo}
              ctaLabel={home.downloadCta}
              onCtaClick={() => navigateTo(localeDownloadPath)}
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
          <h2
            id="home-intent-title"
            className="home-section-title mx-auto mb-8 max-w-[560px] text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]"
          >
            {home.intentLinksTitle}
          </h2>
          <ul className="home-intent-list">
            {intentLinks.map((item) => {
              const copy = home.intentLinks?.[item.id]
              if (!copy) return null

              return (
                <li key={item.id}>
                  <a
                    className="home-intent-card"
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
                    <strong>{copy.label}</strong>
                    <span>{copy.desc}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="home-diff-section px-6 py-12">
        <div className="home-section-inner mx-auto w-full max-w-[1160px]">
          <h2 className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]">
            {home.keyFactsTitle}
          </h2>
          <div className="home-diff-grid mt-8 grid gap-4 md:grid-cols-2">
            {(home.keyFacts ?? []).map((item) => (
              <article key={item.title} className="home-diff-card">
                <h3>{item.title}</h3>
                <p>{renderFaqAnswer(item.desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeMediaProof title={home.mediaProofTitle} tabsCopy={home.mediaProofTabs} />

      <HomeFaq title={home.faqTitle} faqTopics={home.faqTopics} />

      <HomeDownloadSection
        copy={home.downloadSection}
        onDownloadClick={() => navigateTo(localeDownloadPath)}
      />
    </>
  )
}
