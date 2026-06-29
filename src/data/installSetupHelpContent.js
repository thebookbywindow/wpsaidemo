import { buildWriterStructuredArticle } from './writerHelpContent.js'

const sectionHeadingsZh = {
  productUpdates: '产品更新 / 发行说明',
  featuresOverview: '功能概述',
  plansPricing: '套餐与定价',
  gettingStarted: '快速入门',
  howToGuide: '操作指南',
  faq: '常见问题',
  notes: '注意事项',
  glossary: '术语表',
  relatedResources: '相关资源',
}

const sectionHeadingsEn = {
  productUpdates: 'Release Notes',
  featuresOverview: 'Features Overview',
  plansPricing: 'Plans & Pricing',
  gettingStarted: 'Getting Started',
  howToGuide: 'How-to Guide',
  faq: 'FAQ',
  notes: 'Notes',
  glossary: 'Glossary',
  relatedResources: 'Related Resources',
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
      'Windows：可在安装向导中选择安装路径与是否创建桌面快捷方式',
      'macOS：若提示「无法打开」，请在系统设置中允许来自 WPS 的安装来源',
      '安装完成后在「帮助 → 检查更新」获取最新安全补丁',
    ],
    screenshots: [
      '安装向导首页',
      '登录面板与账号选择',
      '设置中的云同步开关',
    ],
  },
  howToGuideSections: [
    {
      title: 'Windows 安装',
      items: [
        '从官网下载 .exe 安装包，双击运行并以管理员身份安装（如遇权限提示）',
        '选择安装路径与需要安装的组件（文字、表格、演示等）',
        '完成安装后从开始菜单或桌面快捷方式启动 WPS',
        '首次启动可设置 WPS 为 .docx 等格式的默认打开程序',
      ],
    },
    {
      title: 'macOS 安装',
      items: [
        '下载 .dmg 或 pkg 安装包，将 WPS 拖入「应用程序」文件夹',
        '若系统拦截，打开「系统设置 → 隐私与安全性」并点击「仍要打开」',
        '从启动台打开 WPS，按提示完成首次启动向导',
        '在「系统设置 → 桌面与程序坞 → 默认网页浏览器 / 文稿」中关联 Office 格式（可选）',
      ],
    },
    {
      title: '账号登录与绑定',
      items: [
        '点击右上角头像或起始页「登录」，选择手机号、邮箱或第三方账号',
        '首次登录建议绑定备用联系方式，便于找回密码与二次验证',
        '企业用户可选择 SSO 入口，使用组织账号一次登录',
        '登录成功后云文档、模板与会员权益会自动同步到当前设备',
      ],
    },
    {
      title: '安装后验证',
      items: [
        '打开示例文档，测试输入、保存与撤销是否正常',
        '在设置中确认「自动保存」与「云同步」已开启',
        '将一份测试文档保存到云文档，在手机端登录同一账号验证是否可见',
        '若组件缺失或启动报错，使用安装包「修复」或覆盖安装最新版本',
      ],
    },
  ],
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
    {
      q: '安装包从哪里下载最安全？',
      a: '请通过 WPS 官网或官方应用商店下载，避免使用来源不明的第三方安装包。',
    },
    {
      q: '安装失败或卡住怎么办？',
      a: '检查磁盘空间与权限，关闭安全软件拦截后重试；仍失败可下载最新安装包覆盖安装。',
    },
    {
      q: '可以不创建桌面快捷方式吗？',
      a: '可以。安装向导中可取消快捷方式选项，之后仍可从开始菜单或应用程序文件夹启动。',
    },
  ],
  productUpdates: [
    '2026 年 6 月 24 日：更新 Windows / macOS 安装与登录引导文案。',
    '2026 年 5 月：安装向导增加磁盘空间不足的前置检测提示。',
    '2026 年 4 月：登录面板支持更多第三方账号绑定方式（以客户端为准）。',
    '2026 年 3 月：修复部分 macOS 版本上首次启动云同步默认未开启的问题。',
  ],
  glossary: [
    '**安装包**：用于在本地部署 WPS 客户端的可执行文件或磁盘映像。',
    '**云同步**：登录后将文档变更同步到云端，便于多设备访问。',
    '**SSO**：企业单点登录，使用组织账号一次登录访问 WPS 服务。',
    '**自动保存**：编辑时后台保存，降低异常退出导致的数据丢失。',
    '**默认应用**：将 WPS 设为打开 .docx 等文件的系统默认程序。',
  ],
  plansPricingSections: [
    {
      title: '安装与登录',
      body: '下载、安装与账号登录本身免费，不收取额外费用。',
    },
    {
      title: '会员与 AI',
      body: '安装完成后可按需订阅会员或购买 AI 额度，非安装流程的必选项。',
    },
    {
      title: '企业部署',
      body: '批量许可、私有化与统一升级策略由企业合同覆盖，与个人免费安装相互独立。',
    },
  ],
  related: [
    '**WPS Writer 帮助中心** — 安装完成后的文字处理功能总览。',
    '**WPS Cloud 云文档** — 登录后如何使用云盘与同步。',
    '**Plans & Billing** — 会员、AI 与企业套餐说明。',
    '**新建文档** — 安装后创建第一份文档的快速路径。',
    '**安全与隐私设置** — 管理自动上传、诊断数据与账号权限。',
  ],
  notes: [
    '企业用户请联系管理员获取批量部署与 SSO 配置说明。',
    '安装完成后建议立即检查更新，以获得最新安全补丁。',
    '首次登录请绑定常用手机号或邮箱，便于找回密码与二次验证。',
    '在受限网络环境（代理/VPN）下，云同步可能需额外网络白名单配置。',
    '卸载前请确认重要文档已同步至云端或已本地备份。',
    '公共电脑上使用后请退出账号并清除本地缓存。',
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
      'Windows: pick install path and shortcuts in the setup wizard',
      'macOS: allow WPS under Privacy & Security if macOS blocks the first launch',
      'After setup, use Help → Check for Updates for the latest security patches',
    ],
    screenshots: [
      'Installer welcome screen',
      'Sign-in panel',
      'Cloud sync toggle in Settings',
    ],
  },
  howToGuideSections: [
    {
      title: 'Install on Windows',
      items: [
        'Download the .exe from the official site and run as administrator if prompted',
        'Choose install location and components (Writer, Sheets, Presentation, etc.)',
        'Launch WPS from the Start menu or desktop shortcut',
        'Set WPS as the default app for .docx and related formats on first run',
      ],
    },
    {
      title: 'Install on macOS',
      items: [
        'Open the .dmg or .pkg, then drag WPS into Applications',
        'If blocked, open System Settings → Privacy & Security and choose Open Anyway',
        'Launch from Launchpad and complete the first-run wizard',
        'Optionally associate Office formats under system default app settings',
      ],
    },
    {
      title: 'Sign in and account binding',
      items: [
        'Tap the avatar or Sign in on the start screen; use phone, email, or a linked account',
        'Add a backup contact on first sign-in for password recovery and 2FA',
        'Enterprise users can use SSO with their organization identity',
        'Cloud files, templates, and membership sync after a successful sign-in',
      ],
    },
    {
      title: 'Post-install verification',
      items: [
        'Open a sample file and test typing, save, and undo',
        'Confirm auto-save and cloud sync are enabled in Settings',
        'Save a test doc to the cloud and check it on mobile with the same account',
        'If components are missing, run Repair or reinstall the latest build',
      ],
    },
  ],
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
    {
      q: 'Is an offline installer available?',
      a: 'Enterprises can obtain offline packages; consumers should use the online installer for the latest patches.',
    },
    {
      q: 'Install failed or permission denied?',
      a: 'On Windows run the installer as administrator; on macOS allow WPS under Privacy & Security settings.',
    },
    {
      q: 'Can I switch WPS accounts?',
      a: 'Sign out in Settings and sign in with another account; upload local files first—they do not auto-migrate.',
    },
  ],
  productUpdates: [
    'June 24, 2026: Refreshed Windows and macOS install plus first sign-in guidance.',
    'May 2026: Installer detects legacy builds and prompts to remove conflicting components.',
    'April 2026: Sign-in panel adds more third-party bindings and faster verification.',
    'March 2026: First-run wizard adds one-tap cloud sync and privacy presets.',
  ],
  glossary: [
    '**Installer**: The package that deploys WPS desktop clients from the official site.',
    '**Cloud sync**: Saves documents and preferences online for multi-device consistency after sign-in.',
    '**SSO**: Enterprise single sign-on with your company identity provider.',
    '**Default app**: The office suite Windows or macOS opens for .docx and similar files.',
    '**Version history**: Cloud revisions you can restore after accidental edits or deletes.',
  ],
  plansPricingSections: [
    {
      title: 'Personal install (free)',
      body: 'Download, install, and sign in at no cost—core Writer, Sheets, and Presentation features included.',
    },
    {
      title: 'Membership activation',
      body: 'Subscribe in the client or on the web; benefits bind to your account without reinstalling.',
    },
    {
      title: 'Enterprise deployment',
      body: 'Volume licenses, offline MSI/PKG, and policy templates require admin or sales channels.',
    },
  ],
  related: [
    '**WPS Writer Help Center** — Feature index after setup is complete.',
    '**WPS Cloud** — Upload, sync, and manage online files post sign-in.',
    '**Plans & Billing** — Membership tiers, invoices, and renewal.',
    '**Create Document** — Smoke-test editing to confirm a good install.',
    '**Security & privacy settings** — Autosave, telemetry, and default app associations.',
  ],
  notes: [
    'Enterprise admins should use managed deployment and SSO guides for bulk setup.',
    'Check for updates right after install to get the latest security fixes.',
    'Remove conflicting legacy WPS or office suites before reinstalling if startup fails.',
    'Link a phone or email on first sign-in for password recovery and 2FA.',
    'In restricted networks configure proxy access or use an offline package.',
    'Sign out and clear cache on shared machines when you are done.',
  ],
}

function buildLocalizedArticle(language, config) {
  return buildWriterStructuredArticle({
    ...config,
    sectionHeadings: language === 'zh' ? sectionHeadingsZh : sectionHeadingsEn,
    faqAnswerLabel: language === 'zh' ? '解决方案：' : 'Solution: ',
    language: language === 'zh' ? 'zh' : 'en',
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
