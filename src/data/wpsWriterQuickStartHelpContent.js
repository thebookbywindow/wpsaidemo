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

const createDocumentSharedZh = {
  summary: {
    intro:
      '新建文档是开始使用 WPS 文字的第一步。你可以从空白文档、本地模板或云端模板快速创建，并在创建后立即进入编辑、保存与分享流程。',
    capabilities: [
      '支持空白文档、本地模板、云端模板等多种创建方式',
      'Windows / macOS 可通过开始菜单或首页入口一键新建',
      'iOS / Android 可在首页或「+」入口创建文字文档',
      '新建后自动进入编辑界面，可立即输入内容或套用样式',
    ],
  },
  description: {
    dimensions: [
      {
        title: '适用场景',
        body: '适合撰写报告、方案、通知、笔记等日常文字工作；也适合从模板快速生成格式统一的文档初稿。',
      },
      {
        title: '创建方式',
        body: '可选择空白文档、最近使用模板、WPS 模板库，或从本地/云端已有文档复制结构后另存为新文档。',
      },
      {
        title: '创建后操作',
        body: '创建完成后可直接编辑、自动保存到本地或云端，并继续执行另存为、导出 PDF、协作分享等操作。',
      },
    ],
    membershipTitle: '会员说明',
    membership: '新建空白文档与基础编辑免费可用；部分高级模板、AI 辅助写作可能需要 WPS 会员。',
    versionTitle: '版本说明',
    version: '桌面端建议使用最新稳定版；移动端请保持 WPS 应用为较新版本以获得完整新建与云同步能力。',
  },
  steps: {
    intro: '不同端新建文档的常用路径如下：',
    items: [
      'Windows：打开 WPS 文字 → 点击「新建」→ 选择「空白文档」或模板 → 开始编辑',
      'macOS：启动 WPS 文字 → 在起始页选择「新建空白文档」或模板 → 进入编辑界面',
      'iOS：打开 WPS App → 点击底部或首页「+」→ 选择「文字」→ 创建空白文档',
      'Android：打开 WPS App → 点击「+ 新建」→ 选择「文字文档」→ 进入编辑',
      '创建后建议立即保存或登录账号开启云同步，避免内容丢失',
    ],
    screenshots: [
      '【截图占位】Windows 起始页「新建」入口',
      '【截图占位】macOS 空白文档创建界面',
      '【截图占位】移动端「+」新建文字文档入口',
    ],
  },
  faq: [
    {
      q: '新建文档默认保存在哪里？',
      a: '未登录时通常保存在本地；登录并开启云同步后，可保存至 WPS 云文档并在多设备访问。',
    },
    {
      q: '可以从模板新建吗？',
      a: '可以。在新建界面选择模板库或最近模板，即可基于模板创建并修改内容。',
    },
    {
      q: '新建后如何快速分享？',
      a: '编辑完成后可使用「分享」生成链接或导出文件，具体能力因平台而异。',
    },
  ],
  related: ['保存与另存为', '快速入门', '输出为 PDF'],
  notes: [
    '首次使用云文档前请先登录 WPS 账号。',
    '从模板创建后，建议检查页眉页脚、样式与目录是否符合实际需求。',
    '对外发送前请确认文档名称、权限与最终格式。',
  ],
}

const createDocumentSharedEn = {
  summary: {
    intro:
      'Creating a new document is the first step in WPS Writer. Start from a blank file, a local template, or a cloud template, then edit, save, and share right away.',
    capabilities: [
      'Blank documents, local templates, and cloud templates',
      'Windows / macOS: create from the start screen or Home tab',
      'iOS / Android: use the + button on the home screen',
      'Jump straight into editing after the document is created',
    ],
  },
  description: {
    dimensions: [
      {
        title: 'When to use',
        body: 'Reports, proposals, notices, notes, or template-based drafts with consistent formatting.',
      },
      {
        title: 'Creation options',
        body: 'Choose blank, recent templates, the WPS template library, or duplicate an existing file structure.',
      },
      {
        title: 'After creation',
        body: 'Edit immediately, save locally or to the cloud, then Save As, export to PDF, or share for collaboration.',
      },
    ],
    membershipTitle: 'Membership',
    membership: 'Blank documents and basic editing are free; premium templates or AI writing may require membership.',
    versionTitle: 'Version notes',
    version: 'Use the latest desktop build; keep the mobile app updated for full create and cloud sync support.',
  },
  steps: {
    intro: 'Common paths to create a document on each platform:',
    items: [
      'Windows: open WPS Writer → New → Blank Document or a template → start editing',
      'macOS: launch WPS Writer → New Blank Document or template on the start page',
      'iOS: open WPS → tap + → Writer → create a blank document',
      'Android: open WPS → + New → Writer document → start editing',
      'Save early or sign in to enable cloud sync and avoid losing content',
    ],
    screenshots: [
      '[Screenshot] Windows start page New entry',
      '[Screenshot] macOS blank document screen',
      '[Screenshot] Mobile + button for new Writer file',
    ],
  },
  faq: [
    {
      q: 'Where is a new document saved by default?',
      a: 'Locally when signed out; to WPS Cloud after sign-in with sync enabled.',
    },
    {
      q: 'Can I create from a template?',
      a: 'Yes. Pick a template from the library or recent list and edit the content.',
    },
    {
      q: 'How do I share after creating?',
      a: 'Use Share to generate a link or export a file; options vary by platform.',
    },
  ],
  related: ['Save & Save As', 'Quick Start', 'Export as PDF'],
  notes: [
    'Sign in before using cloud documents for the first time.',
    'Review headers, styles, and table of contents after creating from a template.',
    'Confirm file name, permissions, and format before sending externally.',
  ],
}

const aiReadAloudSharedZh = {
  summary: {
    intro:
      'AI 朗读可将文档内容转换为自然语音播放，适合通勤听稿、校对润色、无障碍阅读等场景。移动端可边看边听，并调节语速与音色。',
    capabilities: [
      '将当前文档全文或选中内容转为语音播放',
      '支持多种音色与语速调节，便于长时间收听',
      '播放过程中可暂停、继续与跳转段落',
      '适合听稿校对、学习资料朗读与移动场景阅读',
    ],
  },
  description: {
    dimensions: [
      {
        title: '适用场景',
        body: '适合在无法盯屏阅读时使用，例如通勤、运动、家务；也可用于检查语句是否通顺、是否存在错字漏字。',
      },
      {
        title: '播放范围',
        body: '通常支持从光标位置、选中段落或全文开始朗读；具体范围以当前客户端界面为准。',
      },
      {
        title: '体验优化',
        body: '建议在安静环境使用耳机收听；长时间收听时可适当降低语速并分段播放，减轻疲劳。',
      },
    ],
    membershipTitle: '会员说明',
    membership: '基础朗读能力通常可免费体验；部分高级音色、更长时长或无限制播放可能需要 WPS 会员。',
    versionTitle: '版本说明',
    version: '该功能主要面向 iOS / Android 移动端，请更新至最新版 WPS 应用后再使用。',
  },
  steps: {
    intro: '在移动端开启 AI 朗读的常见步骤：',
    items: [
      '打开需要朗读的 WPS 文字文档',
      '点击底部工具栏或「工具 / 阅读」中的「朗读 / AI 朗读」入口',
      '选择播放范围（全文或选中内容）并开始播放',
      '在播放面板中调节语速、音色，或使用暂停 / 继续控制',
      '听完后可返回文档继续编辑或分享',
    ],
    screenshots: [
      '【截图占位】移动端文档底部工具栏',
      '【截图占位】AI 朗读入口与播放面板',
      '【截图占位】语速、音色设置界面',
    ],
  },
  faq: [
    {
      q: '为什么桌面端找不到 AI 朗读？',
      a: '当前帮助条目主要覆盖 iOS / Android；桌面端是否提供类似能力请以实际客户端为准。',
    },
    {
      q: '朗读时可以继续编辑吗？',
      a: '播放过程中通常可暂停后继续编辑；开始新的朗读前建议先停止当前播放。',
    },
    {
      q: '支持英文或其他语言吗？',
      a: '是否支持多语种朗读取决于当前客户端与音色能力，可在播放设置中查看可选语种。',
    },
  ],
  related: ['快速入门', '新建文档', '保存与另存'],
  notes: [
    '在公共场合外放请注意隐私，涉及敏感内容建议使用耳机。',
    '朗读效果会受文档排版、表格与文本框影响，复杂版式建议先简化后再听。',
    '若播放异常，可尝试重启应用或更新到最新版本。',
  ],
}

const aiReadAloudSharedEn = {
  summary: {
    intro:
      'AI Read Aloud converts document text into natural speech—useful for commuting, proofreading, accessibility, and hands-free reading on mobile.',
    capabilities: [
      'Read the full document or selected text aloud',
      'Adjust voice and speed for long listening sessions',
      'Pause, resume, and jump between sections while playing',
      'Handy for proofreading and studying on the go',
    ],
  },
  description: {
    dimensions: [
      {
        title: 'When to use',
        body: 'When you cannot read on screen—commuting, workouts, chores—or when you want to hear awkward phrasing.',
      },
      {
        title: 'Playback scope',
        body: 'Usually from cursor, selection, or full document; exact options depend on the client UI.',
      },
      {
        title: 'Better experience',
        body: 'Use headphones in quiet spaces; lower speed and play in sections for long documents.',
      },
    ],
    membershipTitle: 'Membership',
    membership: 'Basic read-aloud is often free; premium voices or unlimited playback may require membership.',
    versionTitle: 'Version notes',
    version: 'Primarily available on iOS and Android; update WPS to the latest version before use.',
  },
  steps: {
    intro: 'Typical steps on mobile:',
    items: [
      'Open the WPS Writer document to read',
      'Tap Read Aloud / AI Read Aloud in the toolbar or Tools / Read menu',
      'Choose full text or selection and start playback',
      'Adjust speed and voice in the player; pause or resume as needed',
      'Return to the document to edit or share when finished',
    ],
    screenshots: [
      '[Screenshot] Mobile document toolbar',
      '[Screenshot] AI Read Aloud entry and player',
      '[Screenshot] Speed and voice settings',
    ],
  },
  faq: [
    {
      q: 'Why is AI Read Aloud missing on desktop?',
      a: 'This guide focuses on iOS / Android; desktop availability depends on your client version.',
    },
    {
      q: 'Can I edit while reading aloud?',
      a: 'Pause playback before editing; stop the current session before starting a new read.',
    },
    {
      q: 'Does it support English or other languages?',
      a: 'Supported languages depend on voice packs in your app; check player settings.',
    },
  ],
  related: ['Quick Start', 'Create Document', 'Save & Save As'],
  notes: [
    'Use headphones in public; avoid playing sensitive content on speaker.',
    'Complex layouts, tables, and text boxes may affect playback quality.',
    'Restart the app or update if playback fails.',
  ],
}

function buildLocalizedArticle(language, config) {
  return buildWriterStructuredArticle({
    ...config,
    sectionHeadings: language === 'zh' ? sectionHeadingsZh : sectionHeadingsEn,
    faqAnswerLabel: language === 'zh' ? '解决方案：' : 'Solution: ',
  })
}

function buildMultilingualHelpContent(zhConfig, enConfig) {
  return {
    'zh-cn': buildLocalizedArticle('zh', zhConfig),
    'zh-tw': buildLocalizedArticle('zh', {
      ...zhConfig,
      title: zhConfig.title.replace('WPS 文字', 'WPS 文字'),
    }),
    'en-us': buildLocalizedArticle('en', enConfig),
    'ja-jp': buildLocalizedArticle('en', {
      ...enConfig,
      title: enConfig.title.replace('WPS Writer', 'WPS Writer'),
    }),
    'ko-kr': buildLocalizedArticle('en', enConfig),
    'es-mx': buildLocalizedArticle('en', enConfig),
  }
}

export const createDocumentHelpContent = buildMultilingualHelpContent(
  {
    title: 'WPS 文字 新建文档',
    metaLine: '适用平台：Windows / macOS / iOS / Android | 更新日期：2026 年 6 月 24 日',
    ...createDocumentSharedZh,
  },
  {
    title: 'WPS Writer Create Document',
    metaLine: 'Supported Platforms: Windows / macOS / iOS / Android | Last Updated: June 24, 2026',
    ...createDocumentSharedEn,
  },
)

export const aiReadAloudHelpContent = buildMultilingualHelpContent(
  {
    title: 'WPS 文字 AI 朗读',
    metaLine: '适用平台：iOS / Android | 更新日期：2026 年 6 月 24 日',
    ...aiReadAloudSharedZh,
  },
  {
    title: 'WPS Writer AI Read Aloud',
    metaLine: 'Supported Platforms: iOS / Android | Last Updated: June 24, 2026',
    ...aiReadAloudSharedEn,
  },
)

const shareAfterCompressionSharedZh = {
  summary: {
    intro:
      '压缩后分享可在发送文档前先减小文件体积，适合邮件附件、即时通讯和链接分享等场景，避免因文件过大导致发送失败或加载缓慢。',
    capabilities: [
      '分享前自动压缩文档体积，减少传输等待时间',
      '支持按场景选择压缩强度，在清晰度与体积之间平衡',
      '压缩完成后可直接生成分享链接或发送到目标应用',
      '适用于图片较多、附件较大或需要快速转发的文档',
    ],
  },
  description: {
    dimensions: [
      {
        title: '适用场景',
        body: '邮件发送大附件、微信/企业 IM 转发文档、生成云分享链接前需要控制体积时使用。',
      },
      {
        title: '压缩策略',
        body: '通常可按「标准压缩」「高压缩」等档位选择；图片、嵌入对象较多的文档压缩效果更明显。',
      },
      {
        title: '分享方式',
        body: '压缩完成后可继续走链接分享、以文件发送或保存到云文档，具体入口因客户端版本略有差异。',
      },
    ],
    membershipTitle: '会员说明',
    membership: '基础压缩分享能力通常免费开放；部分高级压缩档位或批量处理可能需要会员。',
    versionTitle: '版本说明',
    version: '建议使用较新版本客户端，以获得完整的压缩预览与分享能力。',
  },
  steps: {
    intro: '常见操作流程如下：',
    items: [
      '打开需要分享的 WPS 文字文档',
      '点击右上角或工具栏中的「分享」入口',
      '在分享面板中选择「压缩后分享」或类似选项',
      '选择压缩档位并预览压缩后大小',
      '确认后发送链接、保存到云文档或分享到目标应用',
    ],
    screenshots: [
      '【截图占位】分享入口位置',
      '【截图占位】压缩后分享选项与档位选择',
      '【截图占位】压缩完成后的分享面板',
    ],
  },
  faq: [
    {
      q: '压缩后会影响文档内容吗？',
      a: '压缩主要影响图片和嵌入资源体积，正文内容通常不变；发送前建议预览关键页面。',
    },
    {
      q: '为什么压缩后仍然无法发送？',
      a: '可能是目标渠道仍有大小限制，可尝试更高压缩档位或改为云链接分享。',
    },
    {
      q: '可以取消压缩直接分享吗？',
      a: '可以，在分享面板中选择普通分享即可跳过压缩步骤。',
    },
  ],
  related: ['分享', '减小文档体积', '输出为 PDF'],
  notes: [
    '涉及高清图片或扫描页时，压缩前后请核对清晰度是否满足阅读需求。',
    '对外分享前请确认文档权限与敏感信息已处理。',
    '若压缩失败，可先保存文档并检查网络连接后重试。',
  ],
}

const shareAfterCompressionSharedEn = {
  summary: {
    intro:
      'Share After Compression reduces file size before you send a document—ideal for email attachments, chat apps, and link sharing when the original file is too large.',
    capabilities: [
      'Shrink file size before sharing to speed up delivery',
      'Choose compression levels to balance size and clarity',
      'Continue with a share link or hand off to another app after compression',
      'Works well for image-heavy or attachment-rich documents',
    ],
  },
  description: {
    dimensions: [
      {
        title: 'When to use',
        body: 'Before emailing large attachments, forwarding in chat apps, or creating a cloud share link with a smaller payload.',
      },
      {
        title: 'Compression options',
        body: 'Pick standard or high compression; documents with many images or embedded objects benefit most.',
      },
      {
        title: 'After compression',
        body: 'Share via link, send as a file, or save to the cloud—exact options depend on your client version.',
      },
    ],
    membershipTitle: 'Membership',
    membership: 'Basic compress-and-share is usually free; premium levels or batch flows may require membership.',
    versionTitle: 'Version notes',
    version: 'Use a recent client build for full compression preview and share support.',
  },
  steps: {
    intro: 'Typical workflow:',
    items: [
      'Open the WPS Writer document you want to share',
      'Tap Share in the toolbar or overflow menu',
      'Choose Share After Compression or a similar option',
      'Select a compression level and review the estimated size',
      'Confirm, then share via link, cloud, or another app',
    ],
    screenshots: [
      '[Screenshot] Share entry in the toolbar',
      '[Screenshot] Compression level picker',
      '[Screenshot] Share panel after compression completes',
    ],
  },
  faq: [
    {
      q: 'Will compression change my document content?',
      a: 'Compression mainly affects images and embedded assets; review key pages before sending.',
    },
    {
      q: 'Why is the file still too large to send?',
      a: 'The destination may have its own limit—try a higher compression level or share a cloud link instead.',
    },
    {
      q: 'Can I share without compressing?',
      a: 'Yes. Choose regular share in the panel to skip compression.',
    },
  ],
  related: ['Share', 'Reduce File Size', 'Export as PDF'],
  notes: [
    'For scans or HD images, verify readability after compression.',
    'Check permissions and sensitive content before external sharing.',
    'If compression fails, save the file and retry with a stable network connection.',
  ],
}

export const shareAfterCompressionHelpContent = buildMultilingualHelpContent(
  {
    title: 'WPS 文字 压缩后分享',
    metaLine: '适用平台：通用 | 更新日期：2026 年 6 月 24 日',
    ...shareAfterCompressionSharedZh,
  },
  {
    title: 'WPS Writer Share After Compression',
    metaLine: 'Supported Platforms: All platforms | Last Updated: June 24, 2026',
    ...shareAfterCompressionSharedEn,
  },
)
