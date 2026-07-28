/**
 * 文档中心详情页两档断点：
 * 1) TOC 收敛（大）：右侧平台/章节 → 按钮
 * 2) Catalog 收敛（小）：左侧功能目录 → 按钮/抽屉
 */

/** ≤ 此宽度：右侧 TOC 收成按钮 */
export const DOCS_CENTER_TOC_COMPACT_MAX_WIDTH_PX = 1200

/** ≤ 此宽度：左侧功能目录也收成按钮/抽屉（对齐 wps.ai/docs 992） */
export const DOCS_CENTER_CATALOG_COMPACT_MAX_WIDTH_PX = 992

export const DOCS_CENTER_TOC_COMPACT_MEDIA_QUERY = `(max-width: ${DOCS_CENTER_TOC_COMPACT_MAX_WIDTH_PX}px)`

export const DOCS_CENTER_CATALOG_COMPACT_MEDIA_QUERY = `(max-width: ${DOCS_CENTER_CATALOG_COMPACT_MAX_WIDTH_PX}px)`

/** @deprecated 兼容旧名：等同 Catalog 收敛断点 */
export const DOCS_CENTER_COMPACT_MAX_WIDTH_PX = DOCS_CENTER_CATALOG_COMPACT_MAX_WIDTH_PX

/** @deprecated 兼容旧名 */
export const DOCS_CENTER_COMPACT_MEDIA_QUERY = DOCS_CENTER_CATALOG_COMPACT_MEDIA_QUERY

/** 完整三栏桌面（TOC 未收敛） */
export const DOCS_CENTER_DESKTOP_MIN_WIDTH_PX = DOCS_CENTER_TOC_COMPACT_MAX_WIDTH_PX + 1
