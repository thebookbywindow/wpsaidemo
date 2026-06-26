export const DOC_DETAIL_INDEX_DEMO_VIDEO_SRC =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

export const DOC_DETAIL_INDEX_VIDEO_DURATION = '03:57'

export const DOC_DETAIL_INDEX_VIDEO_DISABLED_ROUTE_SLUGS = new Set([
  'share-after-compression',
])

export function hasDocDetailIndexVideo(routeSlug = '') {
  return !DOC_DETAIL_INDEX_VIDEO_DISABLED_ROUTE_SLUGS.has(routeSlug)
}

export function getDocDetailIndexVideoLabels(isZhContent) {
  return {
    fallbackTitle: isZhContent ? '视频介绍' : 'Video overview',
    closeAriaLabel: isZhContent ? '关闭视频' : 'Close video',
    playAriaLabel: isZhContent ? '播放视频介绍' : 'Play video overview',
    loadError: isZhContent ? '视频加载失败，请稍后重试。' : 'Unable to load video. Please try again later.',
  }
}
