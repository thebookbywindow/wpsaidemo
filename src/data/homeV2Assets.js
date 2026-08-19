/**
 * Official home-v2 visual assets (mirrored from wps.ai ai-website-test CDN).
 * Local copies live under /public/images/home-v2/.
 */

import { withPublicAssetPath } from '../utils/publicAssetPath'

export const HOME_V2_HERO_BACKDROP = withPublicAssetPath('/images/home-v2/hero-backdrop.webp')
export const HOME_V2_CTA_BACKDROP = withPublicAssetPath('/images/home-v2/cta-backdrop.webp')
/** Official hv2-hero__download shield mark */
export const HOME_V2_DOWNLOAD_SHIELD = withPublicAssetPath('/images/home-v2/download-shield.svg')

/** Intent / cases cards — art + tint variant matching official hv2-case--* */
export const HOME_V2_CASE_CARDS = Object.freeze({
  'pdf-extension': Object.freeze({
    variant: 'green',
    artSrc: withPublicAssetPath('/images/home-v2/usecase-chrome.svg'),
    artWidth: '45.8%',
    artAspect: '125 / 113',
  }),
  'wps-office-web': Object.freeze({
    variant: 'violet',
    artSrc: withPublicAssetPath('/images/home-v2/usecase-web.svg'),
    artWidth: '37.4%',
    artAspect: '102 / 104',
  }),
  'wps-ai-ppt': Object.freeze({
    variant: 'blue',
    artSrc: withPublicAssetPath('/images/home-v2/usecase-slides.svg'),
    artWidth: '45.8%',
    artAspect: '125 / 101',
  }),
  'pdf-to-word': Object.freeze({
    variant: 'red',
    artSrc: withPublicAssetPath('/images/home-v2/usecase-pdf2word.svg'),
    artWidth: '67%',
    artAspect: '183 / 93',
  }),
})
