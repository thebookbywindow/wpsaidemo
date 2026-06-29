import { Globe, Laptop, Layers, Monitor, Smartphone, Terminal } from 'lucide-react'

export const DOC_DETAIL_PLATFORM_ICON_MAP = {
  windows: Monitor,
  mac: Laptop,
  linux: Terminal,
  web: Globe,
  android: Smartphone,
  ios: Smartphone,
  'android-phone': Smartphone,
  iphone: Smartphone,
  common: Layers,
  feature: Layers,
}

export function getDocDetailPlatformIcon(platformId) {
  return DOC_DETAIL_PLATFORM_ICON_MAP[platformId] ?? Monitor
}

export function getDocDetailFeatureIcon() {
  return DOC_DETAIL_PLATFORM_ICON_MAP.common
}
