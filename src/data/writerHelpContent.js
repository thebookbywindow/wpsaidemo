export function buildWriterStructuredArticle({
  title,
  metaLine,
  summary,
  description,
  steps,
  faq,
  related,
  notes,
  sectionHeadings,
  faqAnswerLabel = '解决方案：',
}) {
  const capabilityLines = summary.capabilities.map((item) => `- ${item}`).join('\n')
  const dimensionLines = description.dimensions
    .map((item) => `### ${item.title}\n${item.body}`)
    .join('\n\n')
  const stepLines = steps.items.map((item, index) => `${index + 1}. ${item}`).join('\n')
  const screenshotLines = steps.screenshots.map((item) => `- ${item}`).join('\n')
  const faqLines = faq
    .map((item) => `- **${item.q}**\n  - ${faqAnswerLabel}${item.a}`)
    .join('\n')
  const relatedLines = related.map((item) => `- ${item}`).join('\n')
  const noteLines = notes.map((item) => `- ${item}`).join('\n')

  return `# ${title}

> ${metaLine}

---

## ${sectionHeadings.summary}

${summary.intro}

${capabilityLines ? `\n${capabilityLines}` : ''}

## ${sectionHeadings.description}

${dimensionLines}

### ${description.membershipTitle}
${description.membership}

### ${description.versionTitle}
${description.version}

## ${sectionHeadings.steps}

${steps.intro}

${stepLines}

${screenshotLines ? `\n**截图占位说明：**\n${screenshotLines}` : ''}

## ${sectionHeadings.faq}

${faqLines}

## ${sectionHeadings.related}

${relatedLines}

## ${sectionHeadings.notes}

${noteLines}
`
}

const writerSectionHeadingsZh = {
  summary: '功能摘要',
  description: '功能说明',
  steps: '操作步骤',
  faq: '常见问题',
  related: '关联问题',
  notes: '注意事项',
}

const writerSectionHeadingsEn = {
  summary: 'Feature Summary',
  description: 'Feature Description',
  steps: 'Steps',
  faq: 'FAQ',
  related: 'Related Questions',
  notes: 'Notes',
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
    ],
    screenshots: [
      '【截图占位】顶部选项卡「开始」功能区整体界面',
      '【截图占位】新建/打开文档入口按钮位置',
      '【截图占位】AI 写作或分享协作入口界面',
    ],
  },
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
  ],
  related: [
    '如何导入并编辑 Word 文档？',
    '如何使用 AI 写作助手润色全文？',
    '如何将文档分享给同事并协作编辑？',
  ],
  notes: [
    '首次使用云同步、协作或 AI 功能前，请先登录 WPS 账号。',
    '打开复杂 Word 文档后，建议检查目录、页眉页脚与表格样式是否符合预期。',
    '涉及对外正式发布的内容，请在导出或分享前再次校对格式与权限设置。',
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
    ],
    screenshots: [
      '[Screenshot Placeholder] Home tab ribbon overview',
      '[Screenshot Placeholder] New/Open document entry buttons',
      '[Screenshot Placeholder] AI writing or collaboration entry panel',
    ],
  },
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
  ],
  related: [
    'How do I import and edit a Word document?',
    'How do I polish a document with AI writing?',
    'How do I share a document for collaboration?',
  ],
  notes: [
    'Sign in to your WPS account before using cloud sync, collaboration, or AI features.',
    'After opening complex Word files, review headings, headers/footers, and table styles.',
    'Before publishing or sharing externally, double-check formatting and permission settings.',
  ],
}

export const writerHelpContent = {
  'zh-cn': buildWriterStructuredArticle({
    title: 'WPS 文字 帮助中心',
    metaLine: '适用平台：桌面版/Web 版/移动版 | 更新日期：2024 年 5 月 22 日',
    ...writerSharedZh,
    sectionHeadings: writerSectionHeadingsZh,
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
      summary: '功能摘要',
      description: '功能說明',
      steps: '操作步驟',
      faq: '常見問題',
      related: '關聯問題',
      notes: '注意事項',
    },
  }),
  'en-us': buildWriterStructuredArticle({
    title: 'WPS Writer Help Center',
    metaLine: 'Supported Platforms: Desktop / Web / Mobile | Last Updated: May 22, 2024',
    ...writerSharedEn,
    sectionHeadings: writerSectionHeadingsEn,
    faqAnswerLabel: 'Solution: ',
  }),
  'ja-jp': buildWriterStructuredArticle({
    title: 'WPS Writer ヘルプセンター',
    metaLine: '対応プラットフォーム：デスクトップ版 / Web 版 / モバイル版 | 更新日：2024年5月22日',
    ...writerSharedEn,
    faqAnswerLabel: 'Solution: ',
    sectionHeadings: {
      summary: '機能概要',
      description: '機能説明',
      steps: '操作手順',
      faq: 'よくある質問',
      related: '関連する質問',
      notes: '注意事項',
    },
  }),
  'ko-kr': buildWriterStructuredArticle({
    title: 'WPS Writer 도움말 센터',
    metaLine: '지원 플랫폼: 데스크톱 / Web / 모바일 | 업데이트: 2024년 5월 22일',
    ...writerSharedEn,
    faqAnswerLabel: 'Solution: ',
    sectionHeadings: {
      summary: '기능 요약',
      description: '기능 설명',
      steps: '操作 단계',
      faq: '자주 묻는 질문',
      related: '관련 질문',
      notes: '주의사항',
    },
  }),
  'es-mx': buildWriterStructuredArticle({
    title: 'Centro de Ayuda de WPS Writer',
    metaLine: 'Plataformas compatibles: Escritorio / Web / Movil | Actualizado: 22 de mayo de 2024',
    ...writerSharedEn,
    faqAnswerLabel: 'Solution: ',
    sectionHeadings: {
      summary: 'Resumen de funciones',
      description: 'Descripcion de funciones',
      steps: 'Pasos de operacion',
      faq: 'Preguntas frecuentes',
      related: 'Preguntas relacionadas',
      notes: 'Notas',
    },
  }),
}
