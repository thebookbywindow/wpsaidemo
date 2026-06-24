import { buildWriterStructuredArticle } from './writerHelpContent.js'

const sectionHeadingsZh = {
  summary: '功能摘要',
  description: '功能说明',
  steps: '操作步骤',
  faq: '常见问题',
  related: '关联问题',
  notes: '注意事项',
}

const sectionHeadingsEn = {
  summary: 'Feature Summary',
  description: 'Feature Description',
  steps: 'Steps',
  faq: 'FAQ',
  related: 'Related Questions',
  notes: 'Notes',
}

const sharedZh = {
  summary: {
    intro:
      '本指南帮助你在最短时间内完成 WPS 安装、账号登录与基础环境配置，确保后续文档、表格、演示与 AI 功能可以正常使用。',
    capabilities: [
      '支持 Windows 与 macOS 桌面端安装',
      '登录后可同步云文档、模板与会员权益',
      '首次启动可设置默认打开方式与隐私选项',
    ],
  },
  description: {
    dimensions: [
      {
        title: '适用场景',
        body: '适合新用户首次安装、换机重装、或团队统一部署前的个人账号准备。',
      },
      {
        title: '核心流程',
        body: '下载安装包 → 完成安装 → 登录 WPS 账号 → 检查云同步与更新状态。',
      },
    ],
    membershipTitle: '会员说明',
    versionTitle: '版本说明',
    membership: '安装与登录本身免费；部分 AI 与高级模板能力可能需要会员或企业授权。',
    version: '建议使用官网最新稳定版；Windows 10 及以上与 macOS 11 及以上体验最佳。',
  },
  steps: {
    intro: '按以下步骤完成安装与登录：',
    items: [
      '访问官网下载页，选择对应系统安装包并完成安装',
      '首次启动后点击「登录」，使用手机号、邮箱或第三方账号完成验证',
      '在设置中确认云同步、自动保存与默认应用关联是否开启',
      '打开任意文档验证编辑、保存与跨端同步是否正常',
    ],
    screenshots: [
      '安装向导首页',
      '登录面板与账号选择',
      '设置中的云同步开关',
    ],
  },
  faq: [
    {
      q: '安装后必须登录吗？',
      a: '浏览本地文档可不登录；云同步、协作、AI 与会员功能需要登录账号。',
    },
    {
      q: '忘记密码怎么办？',
      a: '在登录页选择「忘记密码」，通过绑定的手机号或邮箱重置。',
    },
    {
      q: '多台设备会冲突吗？',
      a: '同一账号可在多台设备登录，云文档会自动同步，建议开启版本历史以便恢复。',
    },
  ],
  related: ['WPS Writer 帮助中心', 'WPS Cloud 云文档', 'Plans & Billing'],
  notes: [
    '企业用户请联系管理员获取批量部署与 SSO 配置说明',
    '安装完成后建议立即检查更新，以获得最新安全补丁',
  ],
}

const sharedEn = {
  summary: {
    intro:
      'This guide walks you through installing WPS, signing in, and completing basic setup so Writer, Sheets, Presentation, and AI features are ready to use.',
    capabilities: [
      'Install WPS on Windows and macOS desktop',
      'Sign in to sync cloud files, templates, and subscription benefits',
      'Configure default apps and privacy options on first launch',
    ],
  },
  description: {
    dimensions: [
      {
        title: 'When to use',
        body: 'Best for first-time setup, reinstalling on a new device, or preparing a personal account before team rollout.',
      },
      {
        title: 'Core flow',
        body: 'Download installer → complete setup → sign in → verify cloud sync and updates.',
      },
    ],
    membershipTitle: 'Membership',
    versionTitle: 'Version notes',
    membership: 'Install and sign-in are free; some AI and premium templates may require a subscription.',
    version: 'Use the latest stable build from the official site; Windows 10+ and macOS 11+ are recommended.',
  },
  steps: {
    intro: 'Follow these steps to install and sign in:',
    items: [
      'Download the installer for your platform from the official site and run setup',
      'On first launch, choose Sign in and verify with phone, email, or a linked account',
      'Open Settings and confirm cloud sync, autosave, and default app associations',
      'Open a sample document to verify edit, save, and cross-device sync',
    ],
    screenshots: [
      'Installer welcome screen',
      'Sign-in panel',
      'Cloud sync toggle in Settings',
    ],
  },
  faq: [
    {
      q: 'Do I have to sign in?',
      a: 'Local files work without an account; cloud sync, collaboration, AI, and membership features require sign-in.',
    },
    {
      q: 'Forgot my password?',
      a: 'Use Forgot password on the sign-in screen and reset via your linked phone or email.',
    },
    {
      q: 'Can I use the same account on multiple devices?',
      a: 'Yes. Cloud documents sync across devices; enable version history if you need rollback.',
    },
  ],
  related: ['WPS Writer Help Center', 'WPS Cloud', 'Plans & Billing'],
  notes: [
    'Enterprise admins should use managed deployment and SSO guides for bulk setup',
    'Check for updates right after install to get the latest security fixes',
  ],
}

function buildLocalizedArticle(language, config) {
  return buildWriterStructuredArticle({
    ...config,
    sectionHeadings: language === 'zh' ? sectionHeadingsZh : sectionHeadingsEn,
    faqAnswerLabel: language === 'zh' ? '解决方案：' : 'Solution: ',
  })
}

export const installSetupHelpContent = {
  'zh-cn': buildLocalizedArticle('zh', {
    title: '安装与登录',
    metaLine: '适用平台：Windows / macOS | 更新日期：2026 年 6 月 24 日',
    ...sharedZh,
  }),
  'zh-tw': buildLocalizedArticle('zh', {
    title: '安裝與登入',
    metaLine: '適用平台：Windows / macOS | 更新日期：2026 年 6 月 24 日',
    ...sharedZh,
  }),
  'en-us': buildLocalizedArticle('en', {
    title: 'Install & Sign In',
    metaLine: 'Supported Platforms: Windows / macOS | Last Updated: June 24, 2026',
    ...sharedEn,
  }),
  'ja-jp': buildLocalizedArticle('en', {
    title: 'インストールとサインイン',
    metaLine: '対応プラットフォーム：Windows / macOS | 更新日：2026年6月24日',
    ...sharedEn,
  }),
  'ko-kr': buildLocalizedArticle('en', {
    title: '설치 및 로그인',
    metaLine: '지원 플랫폼: Windows / macOS | 업데이트: 2026년 6월 24일',
    ...sharedEn,
  }),
  'es-mx': buildLocalizedArticle('en', {
    title: 'Instalar e iniciar sesion',
    metaLine: 'Plataformas compatibles: Windows / macOS | Actualizado: 24 de junio de 2026',
    ...sharedEn,
  }),
}
