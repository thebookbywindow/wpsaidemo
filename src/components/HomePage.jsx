import { ArrowUpRight } from 'lucide-react'
import { HOME_V2_CASE_CARDS, HOME_V2_HERO_BACKDROP } from '../data/homeV2Assets'
import { useHomeEntityCatalog } from '../hooks/useHomeEntityCatalog'
import { useHomeIntentLinks } from '../hooks/useHomeIntentLinks'
import { useHomePageSeo } from '../hooks/useHomePageSeo'
import { useHomeScrollTopOnMount } from '../hooks/useHomeScrollTopOnMount'
import HomeEntityCatalog from './HomeEntityCatalog'
import HomePlatformDownloads from './HomePlatformDownloads'
import { flattenHomeFaqs } from '../utils/homeFaq'
import HomeDiffStatValue from './HomeDiffStatValue'
import { formatKeyFactStat, extractKeyFactHref } from '../utils/formatKeyFactStat'
import HomeFaq from './HomeFaq'
import HomeHeroTitle from './HomeHeroTitle'
import HomeIntlAiFeatures from './HomeIntlAiFeatures'
import HomeMediaProof from './HomeMediaProof'
import HomeTrustBar from './HomeTrustBar'
import { renderFaqAnswer } from '../utils/renderFaqAnswer'

/**
 * SEO/GEO homepage — visual shell aligned to official home-v2 (hv2-*).
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
    <div className="home-v2-main">
      <section className="hv2-hero home-hero-section text-center">
        <div className="hv2-hero__backdrop" aria-hidden="true">
          <img
            className="hv2-hero__backdrop-img"
            src={HOME_V2_HERO_BACKDROP}
            alt=""
            width={2222}
            height={840}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hv2-container home-section-inner home-hero-inner">
          <HomeHeroTitle
            lead={home.heroTitleLead}
            join={home.heroTitleJoin}
            leadMobile={home.heroTitleLeadMobile}
            joinMobile={home.heroTitleJoinMobile}
            tail={home.heroTitleTail}
            prefix={home.heroTitlePrefix}
            title={home.heroTitle}
          />
          <p className="hv2-hero__desc home-hero-desc mx-auto">
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
        <div className="hv2-hero__trust">
          <HomeTrustBar label={home.trustBarLabel} copy={home.trustBar} />
        </div>
      </section>

      <div className="hv2-deck hv2-section">
        <HomeIntlAiFeatures
          title={home.intlAiFeatures?.title}
          summary={home.intlAiFeatures?.summary}
          copy={home.intlAiFeatures}
        />
      </div>

      <section className="hv2-cases hv2-section" aria-labelledby="home-intent-title">
        <div className="hv2-container home-section-inner">
          <div className="home-intent-header">
            <h2 id="home-intent-title" className="hv2-section-title home-section-title">
              {home.intentLinksTitle}
            </h2>
            {home.intentLinksSub ? (
              <p className="hv2-section-sub home-intent-sub">{home.intentLinksSub}</p>
            ) : null}
          </div>
          <ul className="hv2-cases__grid home-intent-list">
            {intentLinks.map((item) => {
              const copy = home.intentLinks?.[item.id]
              if (!copy) return null
              const caseMeta = HOME_V2_CASE_CARDS[item.id]

              return (
                <li key={item.id}>
                  <a
                    className={`hv2-case hv2-case--${caseMeta?.variant ?? 'green'} home-intent-card home-intent-card--${item.id}`}
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
                    <h3 className="hv2-case__title home-intent-card-title">{copy.label}</h3>
                    <span className="hv2-case__visual home-intent-card-visual" aria-hidden="true">
                      {caseMeta?.artSrc ? (
                        <img
                          className="hv2-case__art"
                          src={caseMeta.artSrc}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: caseMeta.artWidth,
                            aspectRatio: caseMeta.artAspect,
                          }}
                        />
                      ) : null}
                    </span>
                    <span className="hv2-case__bottom">
                      <span className="hv2-case__desc home-intent-card-desc">{copy.desc}</span>
                      <span className="hv2-case__arrow home-intent-card-arrow" aria-hidden="true">
                        <ArrowUpRight size={24} strokeWidth={1.8} />
                      </span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="hv2-stats hv2-cases__stats" aria-labelledby="home-diff-title">
            <p id="home-diff-title" className="hv2-stats__eyebrow hv2-cases__stats-title home-diff-eyebrow">
              {home.keyFactsTitle}
            </p>
            <div className="hv2-stats__grid home-diff-stats">
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
        </div>
      </section>

      <div className="hv2-proof hv2-section">
        <HomeMediaProof title={home.mediaProofTitle} tabsCopy={home.mediaProofTabs} />
      </div>

      <div className="hv2-download hv2-section">
        <HomePlatformDownloads copy={home.platformDownloads} />
      </div>

      <div className="hv2-faq hv2-section">
        <HomeFaq title={home.faqTitle} faqTopics={home.faqTopics} />
      </div>
    </div>
  )
}
