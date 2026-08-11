/**
 * Platforms header mega menu — all WPS Office platforms.
 * Visual / links aligned with wps.com Products → Platforms.
 */

export const PRODUCTS_HEADER_MEGA_MENU = Object.freeze({
  groups: Object.freeze([
    Object.freeze({
      id: 'platforms',
      titleKey: 'platforms',
      items: Object.freeze([
        {
          id: 'windows',
          labelKey: 'windows',
          eyebrowKey: 'officeFor',
          url: 'https://www.wps.com/office/windows/',
          iconSrc: '/images/platforms/windows.svg',
        },
        {
          id: 'mac',
          labelKey: 'mac',
          eyebrowKey: 'officeFor',
          url: 'https://www.wps.com/office/mac/',
          iconSrc: '/images/platforms/appstore.svg',
        },
        {
          id: 'linux',
          labelKey: 'linux',
          eyebrowKey: 'officeFor',
          url: 'https://www.wps.com/office/linux/',
          iconSrc: '/images/platforms/linux.svg',
        },
        {
          id: 'android',
          labelKey: 'android',
          eyebrowKey: 'officeFor',
          url: 'https://www.wps.com/office/android/',
          iconSrc: '/images/platforms/android.svg',
        },
        {
          id: 'ios',
          labelKey: 'ios',
          eyebrowKey: 'officeFor',
          url: 'https://www.wps.com/office/ios/',
          iconSrc: '/images/platforms/apple.png',
        },
        {
          id: 'ipad',
          labelKey: 'ipad',
          eyebrowKey: 'officeFor',
          url: 'https://www.wps.com/office/ipad/',
          iconSrc: '/images/platforms/apple.png',
        },
        {
          id: 'online',
          labelKey: 'online',
          eyebrowKey: 'office',
          url: 'https://www.wps.com/wpsdocs/',
          iconSrc: '/images/platforms/online.png',
        },
      ]),
    }),
  ]),
})

export function resolveProductsHeaderMegaMenu(copy = {}) {
  return {
    groups: PRODUCTS_HEADER_MEGA_MENU.groups.map((group) => ({
      id: group.id,
      title: copy[group.titleKey] ?? group.titleKey,
      items: group.items.map((item) => ({
        id: item.id,
        url: item.url,
        iconSrc: item.iconSrc,
        label: copy[item.labelKey] ?? item.labelKey,
        eyebrow: copy[item.eyebrowKey] ?? item.eyebrowKey,
      })),
    })),
  }
}
