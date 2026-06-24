import { Globe, Laptop, Monitor, Smartphone, Terminal } from 'lucide-react'

export const DOC_DETAIL_PLATFORM_ICON_MAP = {
  windows: Monitor,
  mac: Laptop,
  linux: Terminal,
  web: Globe,
  android: Smartphone,
  ios: Smartphone,
}

export function getDocDetailPlatformIcon(platformId) {
  return DOC_DETAIL_PLATFORM_ICON_MAP[platformId] ?? Monitor
}
