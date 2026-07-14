import { useHomeEntityCatalog } from '../hooks/useHomeEntityCatalog'
import { useHomeIntentLinks } from '../hooks/useHomeIntentLinks'
import { useHomePageSeo } from '../hooks/useHomePageSeo'
import HomeEntityCatalog from './HomeEntityCatalog'

/**
 * SEO/GEO homepage — each section owns one job.
 */
export default function HomePage({
  uiText,
  localeDownloadPath,
  localeAllProductsPath,
  localeEncyclopediaPath,
  currentUrlLocale,
  navigateTo,
  contentLanguage,
}) {
  const home = uiText.home
  const entityCatalogGroups = useHomeEntityCatalog({
    currentUrlLocale,
    localeAllProductsPath,
    localeDownloadPath,
  })
  const intentLinks = useHomeIntentLinks({
    currentUrlLocale,
    localeDownloadPath,
    localeAllProductsPath,
  })

  const compareColumns = home.compareColumns ?? ['wps', 'microsoft', 'google', 'notion', 'adobe']

  useHomePageSeo({
    enabled: true,
    title: home.seoTitle,
    description: home.seoDescription,
    faqs: home.faqs ?? [],
    locale: contentLanguage,
  })

  return (
    <>
      <section className="home-hero-section px-6 py-[72px] text-center">
        <div className="home-section-inner home-hero-inner mx-auto w-full max-w-[1160px]">
          <h1 className="home-hero-title mx-auto max-w-4xl text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.2] tracking-[-0.04em] text-[#1a202c]">
            {home.heroTitle}
          </h1>
          <p className="home-hero-desc mx-auto mt-4 max-w-[720px] text-[18px] text-[#4a5568]">
            {home.heroDesc}
          </p>
          <div className="home-hero-actions mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              className="home-primary-btn rounded-[10px] bg-[#534ab7] px-7 py-[13px] text-[16px] font-semibold text-white transition hover:bg-[#3c3489]"
              type="button"
              onClick={() => navigateTo(localeDownloadPath)}
            >
              {home.downloadCta}
            </button>
            <a
              className="home-secondary-btn rounded-[10px] border border-[#e2e8f0] bg-transparent px-7 py-[13px] text-[16px] font-semibold text-[#1a202c] transition hover:border-[#7f77dd] hover:bg-[#eeedfe] hover:text-[#534ab7]"
              href="#home-faq"
            >
              {home.faqAnchorCta}
            </a>
          </div>
          <p className="home-updated-meta mt-5 text-[12px] text-[#94a3b8]">
            <time dateTime="2026-07">{`${home.updatedLabel}: ${home.updatedDate}`}</time>
          </p>
        </div>
      </section>

      <section id="home-entity" className="home-entity-section px-6 py-12">
        <div className="home-section-inner home-entity-card mx-auto w-full max-w-[1160px]">
          <h2 className="home-entity-label">{home.entityTitle}</h2>
          <p className="home-entity-answer">{home.entityAnswer}</p>
        </div>
      </section>

      <section id="home-about" className="home-about-section px-6 pb-12">
        <div className="home-section-inner home-about-card mx-auto w-full max-w-[1160px]">
          <h2 className="home-about-title">{home.aboutTitle}</h2>
          <p className="home-about-text">{home.aboutText}</p>
          {localeEncyclopediaPath ? (
            <a
              className="home-about-link"
              href={localeEncyclopediaPath}
              onClick={(event) => {
                event.preventDefault()
                navigateTo(localeEncyclopediaPath)
              }}
            >
              {home.aboutLinkLabel}
            </a>
          ) : null}
        </div>
      </section>

      <HomeEntityCatalog
        title={home.catalogTitle}
        summary={home.catalogSummary}
        groupLabels={home.catalogGroups}
        groups={entityCatalogGroups}
        navigateTo={navigateTo}
      />

      <section className="home-intent-section px-6 py-12" aria-labelledby="home-intent-title">
        <div className="home-section-inner mx-auto w-full max-w-[1160px]">
          <h2
            id="home-intent-title"
            className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]"
          >
            {home.intentLinksTitle}
          </h2>
          <p className="home-section-subtitle mx-auto mt-2 mb-8 max-w-[560px] text-center text-[14px] text-[#4a5568]">
            {home.intentLinksSub}
          </p>
          <ul className="home-intent-list">
            {intentLinks.map((item) => {
              const copy = home.intentLinks?.[item.id]
              if (!copy) return null

              return (
                <li key={item.id}>
                  <a
                    className="home-intent-card"
                    href={item.path}
                    onClick={(event) => {
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
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-compare-section px-6 py-12" aria-labelledby="home-compare-title">
        <div className="home-section-inner mx-auto w-full max-w-[1160px]">
          <h2
            id="home-compare-title"
            className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]"
          >
            {home.compareTitle}
          </h2>
          <p className="home-section-subtitle mx-auto mt-2 mb-8 max-w-[640px] text-center text-[14px] text-[#4a5568]">
            {home.compareSub}
          </p>
          <div className="home-compare-table-wrap">
            <table className="home-compare-table">
              <thead>
                <tr>
                  <th scope="col">{home.compareHeaders.feature}</th>
                  {compareColumns.map((columnKey) => (
                    <th key={columnKey} scope="col">
                      {home.compareHeaders[columnKey]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(home.compareRows ?? []).map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    {compareColumns.map((columnKey) => (
                      <td key={columnKey}>{row[columnKey]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {home.compareDisclaimer ? (
            <p className="home-compare-disclaimer mx-auto mt-4 max-w-[920px] text-center text-[12px] leading-[1.55] text-[#718096]">
              {home.compareDisclaimer}
            </p>
          ) : null}
        </div>
      </section>

      <section className="home-faq-section px-6 py-12 pb-20" id="home-faq">
        <div className="home-section-inner mx-auto w-full max-w-[840px]">
          <h2 className="home-section-title text-center text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]">
            {home.faqTitle}
          </h2>
          <div className="home-faq-list mt-8">
            {(home.faqs ?? []).map((item) => (
              <details key={item.question} className="home-faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
