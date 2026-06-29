function formatBulletList(items = []) {
  return items.map((item) => `- ${item}`).join('\n')
}

function formatGuideSections(sections = []) {
  return sections
    .map((section) => {
      const body = section.items
        .map((item, index) => `${index + 1}. ${item}`)
        .join('\n')
      return `### ${section.title}\n\n${body}`
    })
    .join('\n\n')
}

function extractProductUpdateLine(metaLine = '', language = 'en') {
  const patterns = [
    /更新日期[：:]\s*([^|]+)/,
    /Last Updated:\s*([^|]+)/i,
    /更新日[：:]\s*([^|]+)/,
    /업데이트:\s*([^|]+)/,
    /Actualizado:\s*([^|]+)/i,
  ]

  for (const pattern of patterns) {
    const match = `${metaLine}`.match(pattern)
    if (match) {
      const date = match[1].trim()
      return language === 'zh'
        ? `- 最近更新：${date}`
        : `- Last updated: ${date}`
    }
  }

  return ''
}

export function buildWriterStructuredArticle({
  title,
  metaLine,
  summary,
  description,
  steps,
  faq,
  related,
  notes,
  productUpdates,
  howToGuide,
  howToGuideSections = [],
  glossary,
  plansPricingSections = [],
  sectionHeadings,
  faqAnswerLabel = '解决方案：',
  language = 'zh',
}) {
  const capabilityLines = summary.capabilities.map((item) => `- ${item}`).join('\n')
  const dimensionLines = description.dimensions
    .map((item) => `### ${item.title}\n${item.body}`)
    .join('\n\n')
  const stepLines = steps.items.map((item, index) => `${index + 1}. ${item}`).join('\n')
  const screenshotLines = steps.screenshots?.length ? formatBulletList(steps.screenshots) : ''
  const faqLines = faq
    .map((item) => `- **${item.q}**\n  - ${faqAnswerLabel}${item.a}`)
    .join('\n')
  const relatedLines = related.map((item) => `- ${item}`).join('\n')
  const noteLines = notes.map((item) => `- ${item}`).join('\n')
  const productUpdateLines = productUpdates?.length
    ? formatBulletList(productUpdates)
    : extractProductUpdateLine(metaLine, language)
  const howToGuideLines = howToGuide?.length
    ? formatBulletList(howToGuide)
    : howToGuideSections.length
      ? formatGuideSections(howToGuideSections)
      : screenshotLines
  const glossaryLines = glossary?.length ? formatBulletList(glossary) : ''
  const plansPricingExtraLines = plansPricingSections
    .map((item) => `### ${item.title}\n${item.body}`)
    .join('\n\n')

  return `# ${title}

> ${metaLine}

---

## ${sectionHeadings.productUpdates}

${productUpdateLines || (language === 'zh' ? '- 暂无新的发行说明。' : '- No new release notes at this time.')}

## ${sectionHeadings.featuresOverview}

${summary.intro}

${capabilityLines ? `\n${capabilityLines}` : ''}

${dimensionLines ? `\n${dimensionLines}` : ''}

## ${sectionHeadings.plansPricing}

### ${description.membershipTitle}
${description.membership}

### ${description.versionTitle}
${description.version}
${plansPricingExtraLines ? `\n\n${plansPricingExtraLines}` : ''}

## ${sectionHeadings.gettingStarted}

${steps.intro}

${stepLines}

## ${sectionHeadings.howToGuide}

${howToGuideLines || (language === 'zh' ? '- 详细操作步骤请参阅上方快速入门。' : '- See Getting Started above for detailed procedures.')}

## ${sectionHeadings.faq}

${faqLines}

## ${sectionHeadings.notes}

${noteLines}

## ${sectionHeadings.glossary}

${glossaryLines || (language === 'zh' ? '- 暂无术语条目。' : '- No glossary entries yet.')}

## ${sectionHeadings.relatedResources}

${relatedLines}
`
}

const writerSectionHeadingsZh = {
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

const writerSectionHeadingsEn = {
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

const writerSharedZh = {
  summary: {
    intro:
      '当您需要创建、编辑和分享专业文档时，WPS 文字能通过 AI 辅助写作、多格式兼容与云协作能力，帮助您高效完成各类文字处理任务。',
    capabilities: [
      'AI 智能写作：生成全文、润色语气、总结复杂文本',
      '多格式兼容：支持 .doc、.docx 等 15 种常见格式',
      '云同步与协作：跨设备同步文档并实时协作编辑',
      '海量免费模板：提供超过 10 万款可编辑模板',
    ],
  },
  description: {
    dimensions: [
      {
        title: 'AI 智能写作',
        body:
          '集成 AI 写作助手，可协助生成全文、润色语气、总结长文，适合报告撰写、内容改写与快速起稿场景。',
      },
      {
        title: '多格式兼容',
        body:
          '兼容 .doc、.docx、.txt、.rtf 等 15 种格式，尽量保留原有文本、样式与版式，便于与 Microsoft Word 文件互通。',
      },
      {
        title: '云同步与协作',
        body:
          '支持云端保存、链接分享、多人协作与版本历史查看，适合团队共同编辑与跨设备继续处理文档。',
      },
    ],
    membershipTitle: '会员限制',
    membership:
      'WPS 文字基础编辑、打开保存与常见排版功能均可免费使用；部分 AI 高级能力、专属模板或增值功能可能需要 WPS 会员。',
    versionTitle: '版本限制',
    version: '无特殊版本限制，桌面版、Web 版与移动版均可使用核心能力；部分 AI 功能需登录账号并依赖客户端版本更新。',
  },
  steps: {
    intro: '功能入口/使用步骤如下：',
    items: [
      '启动 WPS 文字，单击顶部「开始」选项卡',
      '在功能区中点击「新建空白文档」或「打开」已有文档',
      '输入内容后，可在「开始」或「插入」中使用 AI 写作、模板与协作分享能力',
      '使用样式库统一标题与正文格式，便于长文档维护',
      '定期 Ctrl + S（Windows）或 Command + S（Mac）保存，或开启自动保存',
      '定稿后通过「文件 → 输出为 PDF」或「分享」完成分发',
    ],
    screenshots: [
      '【截图占位】顶部选项卡「开始」功能区整体界面',
      '【截图占位】新建/打开文档入口按钮位置',
      '【截图占位】AI 写作或分享协作入口界面',
    ],
  },
  howToGuideSections: [
    {
      title: 'AI 写作助手',
      items: [
        '选中段落或全文，在「开始」或 AI 面板中选择「续写 / 润色 / 总结」',
        '输入简要指令（如「改为正式语气」「缩短至 200 字」）并预览生成结果',
        '确认插入前可对比原文，不满意则重新生成或手动微调',
        '长文生成建议分段处理，并注意 AI 额度消耗提示',
      ],
    },
    {
      title: '打开与编辑 Word 文档',
      items: [
        '将 .doc / .docx 拖入 WPS 窗口，或使用「打开」浏览本地文件',
        '打开后检查目录、页眉页脚、表格与字体是否正常显示',
        '若样式偏差，尝试「视图 → 页面」切换并重新应用主题',
        '编辑完成后另存为 .docx 或导出 PDF 再对外发送',
      ],
    },
    {
      title: '协作与分享',
      items: [
        '将文档保存至云文档后，点击「分享」生成链接',
        '设置权限：仅查看、可评论或可编辑，并可选有效期与密码',
        '协作者编辑时可在「审阅」中查看修订与评论',
        '对外发送前在「文件 → 信息」确认文档属性与敏感内容已处理',
      ],
    },
    {
      title: '排版与导出',
      items: [
        '使用「开始」中的样式设置标题层级，便于自动生成目录',
        '在「插入」中添加图片、表格、页码与页眉页脚',
        '「页面布局」调整页边距、分栏与纸张方向',
        '「文件 → 输出为 PDF」选择质量与是否嵌入字体，便于打印与归档',
      ],
    },
    {
      title: '模板与效率',
      items: [
        '从起始页或「新建」进入模板库，按场景筛选报告、简历等模板',
        '将常用模板固定到「快速访问」减少重复查找',
        '使用查找替换（Ctrl + H）批量修改术语或格式',
        '长文档可用导航窗格快速跳转章节',
      ],
    },
  ],
  faq: [
    {
      q: 'WPS 文字是否兼容 Microsoft Word 文件？',
      a: '兼容 .doc、.docx 等常见 Word 格式，打开后通常可继续编辑并保留主要格式。',
    },
    {
      q: '可以在不同设备间同步文档吗？',
      a: '登录 WPS 账号后，可将文档保存至云端，并在 Windows、Mac、Web 与移动端继续访问。',
    },
    {
      q: '使用 WPS 文字需要付费吗？',
      a: '基础功能免费可用；如需更多 AI 次数、高级模板或会员权益，可按需开通 WPS 会员。',
    },
    {
      q: 'AI 写作助手如何计费？',
      a: '免费账号有一定体验额度；会员可获得更高月度配额，具体次数以客户端账号中心显示为准。',
    },
    {
      q: '多人协作时会出现版本冲突吗？',
      a: '云文档支持协作编辑与版本历史；若同时离线修改，同步时可能提示合并或选择保留版本。',
    },
    {
      q: '支持哪些导出格式？',
      a: '常见支持 PDF、图片、纯文本及多种 Office 格式；部分导出选项可能因平台或会员等级而异。',
    },
  ],
  productUpdates: [
    '2024 年 5 月 22 日：帮助中心结构化改版，统一功能概述、套餐与 FAQ 等章节。',
    '2024 年 4 月：AI 写作助手支持语气润色与段落总结，并优化长文生成稳定性。',
    '2024 年 3 月：云协作分享面板增加权限快捷设置（仅查看 / 可评论 / 可编辑）。',
    '2024 年 2 月：提升 .docx 复杂表格与页眉页脚打开兼容性。',
  ],
  glossary: [
    '**WPS 文字**：WPS Office 套件中的文字处理组件，用于创建与编辑文档。',
    '**云文档**：存储在 WPS 云空间、可跨设备同步的在线文件。',
    '**协作编辑**：多人同时或分时编辑同一云文档，并查看变更历史。',
    '**AI 写作助手**：基于 AI 的起稿、润色、总结等辅助写作能力。',
    '**模板库**：提供预设版式的文档集合，可快速生成报告、简历等。',
    '**会员权益**：包含高级模板、更高 AI 额度、无水印导出等增值能力。',
  ],
  plansPricingSections: [
    {
      title: '免费版',
      body: '涵盖打开、编辑、保存、基础排版与大量免费模板，满足个人日常办公。',
    },
    {
      title: '超级会员',
      body: '提供高级 AI 功能、专属模板、PDF 高级工具及更大云空间等权益。',
    },
    {
      title: 'AI 服务包',
      body: '可单独购买或随会员赠送 AI 额度，用于写作、总结、翻译等场景。',
    },
    {
      title: '企业版',
      body: '支持统一授权、模板分发、审计日志与私有化部署选项，适合团队治理。',
    },
  ],
  related: [
    '**如何导入并编辑 Word 文档？** — 从 .doc / .docx 打开并检查样式兼容性。',
    '**如何使用 AI 写作助手润色全文？** — 选中段落或全文进行语气优化与扩写。',
    '**如何将文档分享给同事并协作编辑？** — 生成链接并设置查看或编辑权限。',
    '**新建文档与模板** — 从空白或模板快速开始新项目。',
    '**输出为 PDF** — 定稿后导出便于分发与打印。',
    '**安装与登录** — 首次使用云同步与 AI 前的账号准备。',
  ],
  notes: [
    '首次使用云同步、协作或 AI 功能前，请先登录 WPS 账号。',
    '打开复杂 Word 文档后，建议检查目录、页眉页脚与表格样式是否符合预期。',
    '涉及对外正式发布的内容，请在导出或分享前再次校对格式与权限设置。',
    '定期备份重要云文档，或开启版本历史以便误删后恢复。',
    '在公共设备使用后请退出账号，避免文档与聊天记录残留。',
    '企业环境请遵循 IT 部门关于外发文档与 AI 使用的合规要求。',
  ],
}

const writerSharedEn = {
  summary: {
    intro:
      'When you need to create, edit, and share professional documents, WPS Writer helps with AI-assisted writing, multi-format compatibility, and cloud collaboration so you can finish writing tasks faster.',
    capabilities: [
      'AI Smart Writing: generate drafts, polish tone, and summarize long text',
      'Multi-format support: open and save .doc, .docx, and 14 other common formats',
      'Cloud sync and collaboration: continue editing across devices with shared links',
      'Large template library: access more than 100,000 editable templates',
    ],
  },
  description: {
    dimensions: [
      {
        title: 'AI Smart Writing',
        body:
          'Built-in AI can help generate content, refine tone, and summarize long documents for reports, rewriting, and quick drafting.',
      },
      {
        title: 'Multi-Format Compatibility',
        body:
          'Supports 15 formats including .doc, .docx, .txt, and .rtf while preserving text, styles, and layout whenever possible.',
      },
      {
        title: 'Cloud Sync and Collaboration',
        body:
          'Save to the cloud, share links, co-edit with teammates, and review version history from desktop, web, and mobile.',
      },
    ],
    membershipTitle: 'Membership Limits',
    membership:
      'Core editing, opening, saving, and common formatting features are free. Some advanced AI features, premium templates, or value-added capabilities may require WPS membership.',
    versionTitle: 'Version Limits',
    version:
      'No special version restriction for core features across desktop, web, and mobile. Some AI capabilities require sign-in and a reasonably up-to-date client.',
  },
  steps: {
    intro: 'Feature entry and usage steps:',
    items: [
      'Launch WPS Writer and open the Home tab',
      'Click New Blank Document or Open to start editing',
      'Use AI writing, templates, and sharing tools from the Home or Insert tab',
      'Apply heading and body styles from the gallery for consistent long documents',
      'Save often with Ctrl + S (Windows) or Command + S (Mac), or enable auto-save',
      'Export to PDF or Share when the draft is ready for distribution',
    ],
    screenshots: [
      '[Screenshot Placeholder] Home tab ribbon overview',
      '[Screenshot Placeholder] New/Open document entry buttons',
      '[Screenshot Placeholder] AI writing or collaboration entry panel',
    ],
  },
  howToGuideSections: [
    {
      title: 'AI writing assistant',
      items: [
        'Select text and choose Continue, Polish, or Summarize in the Home or AI panel',
        'Add a short prompt (e.g., “more formal tone”, “shorten to 200 words”) and preview',
        'Compare with the original before inserting; regenerate or edit manually if needed',
        'Split long jobs into sections and watch AI quota hints in the client',
      ],
    },
    {
      title: 'Open and edit Word files',
      items: [
        'Drag .doc / .docx onto WPS or use Open to browse local files',
        'Verify table of contents, headers, footers, tables, and fonts after open',
        'If styles drift, switch to Print Layout and reapply the document theme',
        'Save As .docx or export to PDF before sending externally',
      ],
    },
    {
      title: 'Collaboration and sharing',
      items: [
        'Save to the cloud, then Share to generate a link',
        'Set view, comment, or edit permissions plus optional expiry and password',
        'Track changes and comments under Review while co-editing',
        'Check File → Info for metadata and sensitive content before external send',
      ],
    },
    {
      title: 'Layout and export',
      items: [
        'Use Home styles for heading levels to build an automatic table of contents',
        'Insert images, tables, page numbers, and headers or footers from Insert',
        'Adjust margins, columns, and orientation under Page Layout',
        'File → Export to PDF with quality and font embedding options for print and archive',
      ],
    },
    {
      title: 'Templates and productivity',
      items: [
        'Browse the template library from New for reports, resumes, and more',
        'Pin favorites to Quick Access on the start screen',
        'Find and Replace (Ctrl + H) for bulk terminology or formatting updates',
        'Use the navigation pane to jump sections in long documents',
      ],
    },
  ],
  faq: [
    {
      q: 'Is WPS Writer compatible with Microsoft Word files?',
      a: 'Yes. Common Word formats such as .doc and .docx can usually be opened and edited with most formatting preserved.',
    },
    {
      q: 'Can I sync documents across devices?',
      a: 'After signing in, you can save documents to the cloud and continue on Windows, Mac, web, and mobile.',
    },
    {
      q: 'Do I need to pay to use WPS Writer?',
      a: 'Core features are free. Additional AI quota, premium templates, or membership benefits are optional.',
    },
    {
      q: 'How is AI writing billed?',
      a: 'Free accounts include trial quota; members get higher monthly limits shown in the account center.',
    },
    {
      q: 'Will collaboration cause version conflicts?',
      a: 'Cloud files support co-editing and version history; offline edits on multiple devices may prompt merge choices.',
    },
    {
      q: 'Which export formats are supported?',
      a: 'PDF, images, plain text, and several Office formats are common; some options vary by platform or plan.',
    },
  ],
  productUpdates: [
    'May 22, 2024: Restructured help center with unified Features, Plans, FAQ, and related sections.',
    'April 2024: AI writing adds tone polish and paragraph summaries with improved long-form stability.',
    'March 2024: Share panel shortcuts for view-only, comment, and edit permissions.',
    'February 2024: Better compatibility for complex .docx tables, headers, and footers.',
  ],
  glossary: [
    '**WPS Writer**: The word processor in WPS Office for creating and editing documents.',
    '**Cloud document**: A file stored in WPS Cloud and synced across signed-in devices.',
    '**Co-editing**: Multiple people editing the same cloud file with change history.',
    '**AI writing assistant**: AI-powered drafting, polishing, and summarization tools.',
    '**Template library**: Pre-styled documents for reports, resumes, and more.',
    '**Membership benefits**: Premium templates, higher AI quota, cleaner exports, and extras.',
  ],
  plansPricingSections: [
    {
      title: 'Free',
      body: 'Open, edit, save, basic formatting, and a large free template catalog for everyday use.',
    },
    {
      title: 'Premium membership',
      body: 'Advanced AI, exclusive templates, PDF tools, and expanded cloud storage.',
    },
    {
      title: 'AI packs',
      body: 'Optional or bundled AI quota for writing, summarization, and translation.',
    },
    {
      title: 'Enterprise',
      body: 'Central licensing, template rollout, audit logs, and private deployment options.',
    },
  ],
  related: [
    '**Import and edit Word files** — Open .doc / .docx and verify style fidelity.',
    '**Polish with AI writing** — Refine tone or expand selected paragraphs.',
    '**Share for collaboration** — Links with view, comment, or edit permissions.',
    '**Create documents & templates** — Start blank or from the template library.',
    '**Export as PDF** — Distribute or print finalized documents.',
    '**Install & sign in** — Account setup before cloud sync and AI.',
  ],
  notes: [
    'Sign in to your WPS account before using cloud sync, collaboration, or AI features.',
    'After opening complex Word files, review headings, headers/footers, and table styles.',
    'Before publishing or sharing externally, double-check formatting and permission settings.',
    'Back up important cloud files or rely on version history for recovery.',
    'Sign out on shared devices to avoid leaving documents or chat history behind.',
    'Follow corporate policy for external sharing and AI usage in regulated environments.',
  ],
}

export const writerHelpContent = {
  'zh-cn': buildWriterStructuredArticle({
    title: 'WPS 文字 帮助中心',
    metaLine: '适用平台：桌面版/Web 版/移动版 | 更新日期：2024 年 5 月 22 日',
    ...writerSharedZh,
    sectionHeadings: writerSectionHeadingsZh,
    language: 'zh',
  }),
  'zh-tw': buildWriterStructuredArticle({
    title: 'WPS 文字 說明中心',
    metaLine: '適用平台：桌面版/Web 版/行動版 | 更新日期：2024 年 5 月 22 日',
    summary: {
      intro:
        '當您需要建立、編輯和分享專業文件時，WPS 文字可透過 AI 輔助寫作、多格式相容與雲端協作，協助您更有效率地完成各類文字處理工作。',
      capabilities: writerSharedZh.summary.capabilities,
    },
    description: {
      ...writerSharedZh.description,
      membershipTitle: '會員限制',
      versionTitle: '版本限制',
      membership:
        'WPS 文字基礎編輯、開啟儲存與常見排版功能均可免費使用；部分 AI 進階能力、專屬範本或增值功能可能需要 WPS 會員。',
      version: '無特殊版本限制，桌面版、Web 版與行動版均可使用核心能力；部分 AI 功能需登入帳號並依賴用戶端版本更新。',
    },
    steps: writerSharedZh.steps,
    faq: writerSharedZh.faq,
    related: writerSharedZh.related,
    notes: writerSharedZh.notes,
    sectionHeadings: {
      productUpdates: '產品更新 / 發行說明',
      featuresOverview: '功能概述',
      plansPricing: '方案與定價',
      gettingStarted: '快速入門',
      howToGuide: '操作指南',
      faq: '常見問題',
      notes: '注意事項',
      glossary: '術語表',
      relatedResources: '相關資源',
    },
    language: 'zh',
  }),
  'en-us': buildWriterStructuredArticle({
    title: 'WPS Writer Help Center',
    metaLine: 'Supported Platforms: Desktop / Web / Mobile | Last Updated: May 22, 2024',
    ...writerSharedEn,
    sectionHeadings: writerSectionHeadingsEn,
    faqAnswerLabel: 'Solution: ',
    language: 'en',
  }),
  'ja-jp': buildWriterStructuredArticle({
    title: 'WPS Writer ヘルプセンター',
    metaLine: '対応プラットフォーム：デスクトップ版 / Web 版 / モバイル版 | 更新日：2024年5月22日',
    ...writerSharedEn,
    faqAnswerLabel: 'Solution: ',
    sectionHeadings: {
      productUpdates: '製品アップデート / リリースノート',
      featuresOverview: '機能概要',
      plansPricing: 'プランと料金',
      gettingStarted: 'はじめに',
      howToGuide: '操作ガイド',
      faq: 'よくある質問',
      notes: '注意事項',
      glossary: '用語集',
      relatedResources: '関連リソース',
    },
    language: 'en',
  }),
  'ko-kr': buildWriterStructuredArticle({
    title: 'WPS Writer 도움말 센터',
    metaLine: '지원 플랫폼: 데스크톱 / Web / 모바일 | 업데이트: 2024년 5월 22일',
    ...writerSharedEn,
    faqAnswerLabel: 'Solution: ',
    sectionHeadings: {
      productUpdates: '제품 업데이트 / 릴리스 노트',
      featuresOverview: '기능 개요',
      plansPricing: '요금제 및 가격',
      gettingStarted: '시작하기',
      howToGuide: '사용 가이드',
      faq: '자주 묻는 질문',
      notes: '주의사항',
      glossary: '용어집',
      relatedResources: '관련 리소스',
    },
    language: 'en',
  }),
  'es-mx': buildWriterStructuredArticle({
    title: 'Centro de Ayuda de WPS Writer',
    metaLine: 'Plataformas compatibles: Escritorio / Web / Movil | Actualizado: 22 de mayo de 2024',
    ...writerSharedEn,
    faqAnswerLabel: 'Solution: ',
    sectionHeadings: {
      productUpdates: 'Actualizaciones / Notas de version',
      featuresOverview: 'Descripcion general de funciones',
      plansPricing: 'Planes y precios',
      gettingStarted: 'Primeros pasos',
      howToGuide: 'Guia de procedimientos',
      faq: 'Preguntas frecuentes',
      notes: 'Notas',
      glossary: 'Glosario',
      relatedResources: 'Recursos relacionados',
    },
    language: 'en',
  }),
}
