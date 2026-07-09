import { buildWriterStructuredArticle } from './writerHelpContent.js'

const sectionHeadingsZh = {
  featuresOverview: '简介',
  howToGuide: '使用方法',
  faq: '常见问题',
}

const sectionHeadingsEn = {
  featuresOverview: 'Introduction',
  howToGuide: 'How to Use',
  faq: 'FAQ',
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
      '在标题栏或「文件」菜单中为文档命名，便于后续检索与管理',
      '可从最近文件列表快速打开未完成的草稿并继续编辑',
      '完成初稿后可通过「分享」或「导出 PDF」进入下一流程',
    ],
    screenshots: [
      '【截图占位】Windows 起始页「新建」入口',
      '【截图占位】macOS 空白文档创建界面',
      '【截图占位】移动端「+」新建文字文档入口',
    ],
  },
  howToGuideSections: [
    {
      title: '从模板新建',
      items: [
        '在新建界面打开「模板库」或「最近模板」',
        '按场景（报告、简历、合同等）筛选或搜索关键词',
        '预览版式与页数，确认后点击「创建」生成新文档',
        '逐段替换占位文字，并检查标题样式、页眉页脚与目录',
      ],
    },
    {
      title: '保存、命名与云同步',
      items: [
        '首次保存时输入清晰的文件名并选择本地或云文档路径',
        '登录 WPS 账号后保存至云文档，可在其他设备继续编辑',
        '使用「另存为」保留原稿并创建新的分支版本',
        '在设置中开启自动保存，降低异常退出导致的内容丢失风险',
      ],
    },
    {
      title: '桌面端进阶操作',
      items: [
        'Windows：Ctrl + N 新建空白文档；Ctrl + S 保存当前文件',
        'macOS：Command + N 新建；Command + Shift + S 另存为',
        '将 .docx 文件拖入 WPS 窗口可快速打开并编辑',
        '在「文件 → 信息」查看文档大小、作者与保护状态',
      ],
    },
    {
      title: '移动端进阶操作',
      items: [
        '首页长按最近文档可置顶或从列表移除',
        '编辑时通过「插入」添加图片、表格与批注',
        '弱网环境下先保存到本地，网络恢复后再同步至云端',
        '分享前在预览模式检查分页与图片清晰度',
      ],
    },
    {
      title: '常见问题处理',
      items: [
        '模板库无法加载：检查网络并更新客户端至最新版本',
        '保存失败：确认磁盘空间充足或云空间未超限',
        '打开后样式错乱：尝试「兼容性模式」或重新应用主题样式',
        '找不到新建入口：在设置中恢复默认起始页布局后重启应用',
      ],
    },
  ],
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
    {
      q: '桌面端和移动端新建入口一样吗？',
      a: '不完全相同。Windows / macOS 多在起始页或「开始」选项卡新建；iOS / Android 多在首页「+」或「新建」入口创建文字文档。',
    },
    {
      q: '新建时能否直接指定保存到云文档？',
      a: '登录账号后，可在保存或另存为时选择云文档位置；部分客户端在首次保存时会提示选择本地或云端。',
    },
    {
      q: '模板新建会覆盖原有内容吗？',
      a: '不会。模板会生成一份新的副本，原模板文件保持不变，你可以自由修改新文档中的文字与样式。',
    },
    {
      q: '新建空白文档可以设置默认字体和页边距吗？',
      a: '可以。在「文件 → 选项 → 常规与保存」或移动端「设置」中调整默认格式，之后新建的空白文档会沿用这些设置。',
    },
  ],
  productUpdates: [
    '2026 年 6 月 24 日：同步更新 Windows、macOS、iOS、Android 四端新建路径与截图说明。',
    '2026 年 5 月：移动端「+」入口支持记住上次使用的文档类型，再次新建时默认选中文字文档。',
    '2026 年 4 月：新建空白文档并完成首次编辑后，增加云同步引导，便于多设备继续处理。',
    '2026 年 3 月：模板库首页加载优化，冷启动场景下模板列表展示速度提升约 30%。',
    '2026 年 2 月：起始页「最近」列表支持固定常用文档，便于由最近文件快速复制结构另存为新文档。',
  ],
  glossary: [
    '**空白文档**：不含预设内容的全新文件，创建后可直接输入文字、插入图片与表格。',
    '**模板**：带有预设版式、样式、页眉页脚或占位章节的文档起点，适合快速生成统一格式初稿。',
    '**云文档**：保存在 WPS 云空间、登录账号后可跨设备访问与协作的在线文件。',
    '**自动保存**：编辑过程中后台定期保存草稿，降低应用异常退出导致的内容丢失风险。',
    '**起始页**：应用启动后展示最近文件、新建入口与模板推荐的首屏界面。',
    '**另存为**：在保留原文档的同时，以新文件名或新位置保存当前内容，常用于基于现有结构创建新文档。',
    '**快速访问**：将常用模板、文件夹或最近位置固定到新建面板，减少重复查找步骤。',
  ],
  plansPricingSections: [
    {
      title: '免费版',
      body:
        '新建空白文档、基础编辑、常见排版、本地保存与部分免费模板均可使用，适合个人日常写作与轻量办公。',
    },
    {
      title: 'WPS 会员',
      body:
        '解锁更多高级模板、更高 AI 写作额度、无水印导出及部分增值排版能力；适合高频写作者与需要精美排版的用户。',
    },
    {
      title: 'AI 额度说明',
      body:
        'AI 辅助起稿、润色等功能按账号配额计费；免费用户可体验基础次数，会员可获得更高月度额度，具体以客户端展示为准。',
    },
    {
      title: '团队与企业版',
      body:
        '支持统一模板分发、权限管理、审计与 SSO 登录；新建流程可与企业云盘目录策略联动，适合组织级部署。',
    },
  ],
  related: [
    '**保存与另存为** — 了解默认保存位置、云文档路径，以及如何将当前文档复制为新文件。',
    '**快速入门** — 从新建到排版、插入图片与导出 PDF 的完整上手路径。',
    '**输出为 PDF** — 新建并编辑完成后，将文档导出为便于分享与打印的 PDF 格式。',
    '**使用模板创建** — 浏览模板库、预览版式并按业务场景选择合适模板。',
    '**云同步与多设备** — 登录后让新建文档在桌面端与移动端自动同步。',
    '**协作分享** — 创建文档后生成分享链接，邀请他人查看或共同编辑。',
  ],
  notes: [
    '首次使用云文档前请先登录 WPS 账号。',
    '从模板创建后，建议检查页眉页脚、样式与目录是否符合实际需求。',
    '对外发送前请确认文档名称、权限与最终格式。',
    '在公共设备上新建文档后，请及时退出账号或删除本地缓存，避免隐私泄露。',
    '图片、字体或嵌入对象较多时，新建后首次保存可能耗时更长，请等待保存完成再关闭应用。',
    '若新建入口未显示模板库，可检查网络连接或更新客户端至最新版本后重试。',
    '企业账号新建文档时，请遵守组织规定的存储目录与对外分享策略。',
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
      'Name the file from the title bar or File menu so you can find it later',
      'Resume drafts quickly from the recent files list on the start screen',
      'When the draft is ready, use Share or Export as PDF for the next step',
    ],
    screenshots: [
      '[Screenshot] Windows start page New entry',
      '[Screenshot] macOS blank document screen',
      '[Screenshot] Mobile + button for new Writer file',
    ],
  },
  howToGuideSections: [
    {
      title: 'Create from a template',
      items: [
        'Open the template library or recent templates from the New screen',
        'Filter or search by scenario (report, resume, contract, etc.)',
        'Preview layout and page count, then tap Create',
        'Replace placeholder text and verify headings, headers, and table of contents',
      ],
    },
    {
      title: 'Save, name, and cloud sync',
      items: [
        'On first save, pick a clear file name and local or cloud location',
        'After sign-in, save to WPS Cloud to continue on other devices',
        'Use Save As to keep the original and branch a new copy',
        'Enable auto-save in Settings to reduce loss if the app closes unexpectedly',
      ],
    },
    {
      title: 'Desktop tips',
      items: [
        'Windows: Ctrl + N for a blank file; Ctrl + S to save',
        'macOS: Command + N to create; Command + Shift + S for Save As',
        'Drag a .docx file onto the WPS window to open it quickly',
        'Check size, author, and protection under File → Info',
      ],
    },
    {
      title: 'Mobile tips',
      items: [
        'Long-press a recent file on the home screen to pin or remove it',
        'Use Insert to add images, tables, and comments while editing',
        'On weak networks, save locally first and sync when connectivity returns',
        'Preview pagination and image clarity before sharing',
      ],
    },
    {
      title: 'Troubleshooting',
      items: [
        'Template library empty: check network and update the client',
        'Save failed: free disk space or cloud quota may be full',
        'Broken styles: try compatibility mode or reapply the document theme',
        'Missing New entry: reset the default start layout in Settings and restart',
      ],
    },
  ],
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
    {
      q: 'Are create flows the same on desktop and mobile?',
      a: 'Not exactly. Windows and macOS usually start from the Home tab or start screen; iOS and Android use the + button or New entry on the home screen.',
    },
    {
      q: 'Can I save a new file directly to the cloud?',
      a: 'After sign-in, choose a cloud location in Save or Save As; some clients prompt for local vs. cloud on first save.',
    },
    {
      q: 'Does creating from a template overwrite the template?',
      a: 'No. A new copy is created; the original template stays unchanged while you edit the new document.',
    },
    {
      q: 'Can I set default fonts and margins for blank documents?',
      a: 'Yes. Adjust defaults in File → Options → General & Save on desktop or in mobile Settings; new blank files inherit those values.',
    },
  ],
  productUpdates: [
    'June 24, 2026: Refreshed create flows and screenshots for Windows, macOS, iOS, and Android.',
    'May 2026: Mobile + button remembers the last document type for faster repeat creation.',
    'April 2026: Added cloud sync guidance after the first edit on a new blank document.',
    'March 2026: Template library home loads faster on cold start (about 30% improvement in internal tests).',
    'February 2026: Pinned items on the start page make it easier to duplicate structure into a new file.',
  ],
  glossary: [
    '**Blank document**: A new file with no preset content—ready for typing, images, and tables.',
    '**Template**: A pre-styled starting point with layout, headings, and placeholders for consistent drafts.',
    '**Cloud document**: An online file in WPS Cloud, available across signed-in devices.',
    '**Auto-save**: Background saves while you edit to reduce loss if the app closes unexpectedly.',
    '**Start screen**: The first screen after launch with recent files, New entries, and template picks.',
    '**Save As**: Saves a copy under a new name or location—useful when branching from an existing structure.',
    '**Quick access**: Pins favorite templates or folders in the New panel to skip repeated browsing.',
  ],
  plansPricingSections: [
    {
      title: 'Free',
      body:
        'Blank documents, core editing, common formatting, local save, and a selection of free templates—enough for everyday personal writing.',
    },
    {
      title: 'WPS Membership',
      body:
        'Unlocks premium templates, higher AI writing quota, cleaner exports, and selected advanced layout tools for power users.',
    },
    {
      title: 'AI quota',
      body:
        'AI drafting and polish consume account quota. Free tiers include trial usage; members receive higher monthly limits shown in the client.',
    },
    {
      title: 'Teams & Enterprise',
      body:
        'Adds shared templates, permissions, audit, and SSO. New files can follow corporate cloud folder policies for governed storage.',
    },
  ],
  related: [
    '**Save & Save As** — Pick default locations, cloud paths, and duplicate the current file as a new document.',
    '**Quick Start** — Full onboarding from create through formatting, images, and PDF export.',
    '**Export as PDF** — Share or print after you finish editing a new document.',
    '**Create from templates** — Browse the library, preview layouts, and pick by scenario.',
    '**Cloud sync across devices** — Keep new files available on desktop and mobile after sign-in.',
    '**Collaboration & sharing** — Generate links and invite others to view or co-edit.',
  ],
  notes: [
    'Sign in before using cloud documents for the first time.',
    'Review headers, styles, and table of contents after creating from a template.',
    'Confirm file name, permissions, and format before sending externally.',
    'On shared computers, sign out or clear local cache after creating sensitive drafts.',
    'Heavy images or embedded objects may slow the first save—wait until save completes before closing.',
    'If the template library is missing, check network connectivity or update the client.',
    'Enterprise users must follow org rules for storage folders and external sharing.',
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
      '校对时可在可疑语句处暂停，回到正文修改后重新朗读该段',
      '长文档建议分段播放，避免一次听完造成疲劳',
      '需要后台收听时，确认系统已允许 WPS 后台音频权限',
    ],
    screenshots: [
      '【截图占位】移动端文档底部工具栏',
      '【截图占位】AI 朗读入口与播放面板',
      '【截图占位】语速、音色设置界面',
    ],
  },
  howToGuideSections: [
    {
      title: '选择播放范围',
      items: [
        '全文朗读：适合通读与整体语感检查',
        '选中朗读：适合逐段校对或重点章节复核',
        '从光标开始：适合从当前编辑位置继续收听',
        '切换范围前请先停止当前播放，避免段落衔接混乱',
      ],
    },
    {
      title: '调节语速与音色',
      items: [
        '在播放面板打开语速滑块，精听校对建议 0.8–1.0 倍速',
        '浏览长文可适当提高至 1.2–1.5 倍速',
        '在音色列表中切换不同人声，找到最适合长时间收听的风格',
        '部分高级音色可能标注会员标识，按提示开通或切换免费音色',
      ],
    },
    {
      title: '听稿校对技巧',
      items: [
        '听到拗口或重复语句时暂停，在正文中标出并改写',
        '注意同音错字、标点停顿是否自然，必要时手动调整标点',
        '表格、脚注区域朗读效果可能不佳，建议单独目视检查',
        '定稿前可对新修改段落再做一次选中朗读复核',
      ],
    },
    {
      title: '后台播放与权限',
      items: [
        'iOS：在「设置 → WPS」中允许后台音频与通知',
        'Android：关闭省电限制并允许后台活动，避免播放中断',
        '锁屏后若停止播放，返回应用点继续或重新启动朗读',
        '蓝牙耳机可用来在通勤场景下私密收听',
      ],
    },
  ],
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
    {
      q: '朗读会消耗流量或会员额度吗？',
      a: '在线音色可能消耗少量流量；部分高级音色或长时播放可能计入会员或 AI 相关额度，以客户端提示为准。',
    },
    {
      q: '可以后台播放吗？',
      a: '多数移动端支持切到其他应用后继续播放；若被系统中断，请检查应用的后台播放与通知权限。',
    },
    {
      q: '表格和图片里的文字会被朗读吗？',
      a: '纯文本段落朗读效果最好；复杂表格、文本框或图片内文字可能跳过或顺序异常，建议先简化版式。',
    },
  ],
  productUpdates: [
    '2026 年 6 月 24 日：补充 iOS / Android 朗读入口与播放面板说明。',
    '2026 年 5 月：新增 2 款中文音色，并优化长文档分段播放体验。',
    '2026 年 4 月：播放面板支持从当前段落继续，减少重复从头播放。',
    '2026 年 3 月：修复部分机型后台播放偶发中断的问题。',
  ],
  glossary: [
    '**AI 朗读**：将文档文字转为语音播放的辅助阅读功能。',
    '**音色**：朗读所使用的人声风格，不同音色在语调与情感上有所区别。',
    '**语速**：控制每分钟朗读字数，较慢适合精听校对，较快适合快速浏览。',
    '**播放范围**：可选择全文、选中内容或从光标位置开始朗读。',
    '**后台播放**：应用切到后台或锁屏后仍继续朗读的能力（受系统权限影响）。',
  ],
  plansPricingSections: [
    {
      title: '免费体验',
      body: '基础中文朗读、标准语速与常见音色通常可免费使用，适合短文档试听与校对。',
    },
    {
      title: '会员音色',
      body: '部分高品质或情感音色、更长连续播放时长可能需要 WPS 会员，具体以播放面板标注为准。',
    },
    {
      title: 'AI 相关额度',
      body: '若朗读与 AI 语音合成能力合并计费，长文档或高音质模式可能消耗 AI 配额，请在账号中心查看余量。',
    },
  ],
  related: [
    '**快速入门** — 了解 WPS 文字移动端基础编辑与工具栏布局。',
    '**新建文档** — 创建或打开需要朗读的文稿。',
    '**保存与另存** — 校对后保存修订版本，避免覆盖原稿。',
    '**无障碍阅读** — 配合系统旁白、字体缩放获得更好阅读体验。',
    '**导出为 PDF** — 将定稿导出后通过其他设备继续分发。',
  ],
  notes: [
    '在公共场合外放请注意隐私，涉及敏感内容建议使用耳机。',
    '朗读效果会受文档排版、表格与文本框影响，复杂版式建议先简化后再听。',
    '若播放异常，可尝试重启应用或更新到最新版本。',
    '长时间收听建议降低语速并分段播放，减轻听觉疲劳。',
    '驾驶或运动场景请优先关注安全，避免长时间盯屏操作播放控件。',
    '低电量模式下系统可能限制后台播放，请提前下载或保持充足电量。',
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
      'Pause to fix wording while proofreading, then resume from the current paragraph',
      'For long files, play section by section and adjust speed between parts',
    ],
    screenshots: [
      '[Screenshot] Mobile document toolbar',
      '[Screenshot] AI Read Aloud entry and player',
      '[Screenshot] Speed and voice settings',
    ],
  },
  howToGuideSections: [
    {
      title: 'Choose playback scope',
      items: [
        'Full document: best for overall flow and tone checks',
        'Selection: focus on one chapter or quote block',
        'From cursor: continue long files without replaying earlier sections',
        'Stop playback before switching scope',
      ],
    },
    {
      title: 'Adjust speed and voice',
      items: [
        'Use the speed slider; 0.8–1.0× is comfortable for proofreading',
        'Try multiple voices and pick one that stays clear over long sessions',
        'Premium voices may require membership—badges show in the player',
        'Switch to an English voice for English paragraphs in mixed documents',
      ],
    },
    {
      title: 'Background and lock screen',
      items: [
        'Audio usually continues after you switch apps if background play is allowed',
        'Use lock-screen controls to pause or resume without unlocking WPS',
        'If the system stops audio, reopen WPS and resume from the current paragraph',
        'Disable battery restrictions or plug in during long listening sessions',
      ],
    },
    {
      title: 'Proofreading by ear',
      items: [
        'Pause when phrasing sounds awkward and edit in the document',
        'Slow down for numbers, names, and legal or technical terms',
        'Visually check tables and images—read-aloud may skip or reorder them',
        'Do a full listen-through before export or share',
      ],
    },
  ],
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
    {
      q: 'Does read-aloud use data or membership quota?',
      a: 'Online voices may use a small amount of data; premium voices or long sessions may count toward membership or AI limits.',
    },
    {
      q: 'Can it play in the background?',
      a: 'Most mobile builds continue after you switch apps; if playback stops, check background audio permissions.',
    },
    {
      q: 'Will tables and images be read aloud?',
      a: 'Plain paragraphs work best; complex tables, text boxes, or text inside images may be skipped or read out of order.',
    },
  ],
  productUpdates: [
    'June 24, 2026: Updated mobile entry points and player UI for AI Read Aloud.',
    'May 2026: Added two Chinese voices and smoother section-by-section playback for long files.',
    'April 2026: Player can resume from the current paragraph instead of restarting from the top.',
    'March 2026: Fixed intermittent background playback stops on select device models.',
  ],
  glossary: [
    '**AI Read Aloud**: Converts document text into spoken audio for hands-free reading.',
    '**Voice**: The speaker style used for playback—tone and emotion vary by voice pack.',
    '**Speed**: Words per minute; slower helps proofreading, faster suits skimming.',
    '**Playback scope**: Full document, selection, or from the cursor position.',
    '**Background playback**: Continues audio when the app is minimized or the screen is locked.',
  ],
  plansPricingSections: [
    {
      title: 'Free tier',
      body: 'Standard voices and speeds are usually enough for short proofreading on mobile.',
    },
    {
      title: 'Member voices',
      body: 'Premium or expressive voices and longer continuous playback may require WPS membership.',
    },
    {
      title: 'AI quota',
      body: 'When tied to AI speech synthesis, long documents or HD voices may draw from your AI balance.',
    },
  ],
  related: [
    '**Quick Start** — Mobile Writer basics and toolbar overview.',
    '**Create Document** — Open or create the file you want to hear.',
    '**Save & Save As** — Store revisions after proofreading by ear.',
    '**Accessibility** — Combine with system screen readers and font scaling.',
    '**Export as PDF** — Distribute a finalized version after edits.',
  ],
  notes: [
    'Use headphones in public; avoid playing sensitive content on speaker.',
    'Complex layouts, tables, and text boxes may affect playback quality.',
    'Restart the app or update if playback fails.',
    'Lower speed and play in sections during long listening sessions.',
    'Stay safe while driving or exercising—minimize screen interaction with the player.',
    'Low-power mode may limit background audio; charge the device for long sessions.',
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
      '发送前在预览中核对图片清晰度与关键页排版',
      '若仍超限，可改用云链接分享或继续提高压缩档位',
    ],
    screenshots: [
      '【截图占位】分享入口位置',
      '【截图占位】压缩后分享选项与档位选择',
      '【截图占位】压缩完成后的分享面板',
    ],
  },
  howToGuideSections: [
    {
      title: '选择压缩档位',
      items: [
        '标准压缩：平衡清晰度与体积，适合多数邮件与 IM 场景',
        '高压缩：体积更小，适合扫描件或图片很多的文档',
        '预览压缩后大小，对照目标渠道附件上限（如 20 MB、100 MB）',
        '对高清宣传册等物料，优先标准压缩并人工抽查关键页',
      ],
    },
    {
      title: '压缩后分享方式',
      items: [
        '云链接：上传后生成 URL，接收方在线查看，通常不受附件大小限制',
        '以文件发送：压缩包或文档直接发往邮件、微信等目标应用',
        '保存到云文档：保留副本并单独设置协作或只读权限',
        '普通分享：若体积已足够小，可跳过压缩直接分享',
      ],
    },
    {
      title: '各端操作差异',
      items: [
        '桌面端：分享入口多在右上角或「文件 → 分享」',
        '移动端：分享图标位于编辑页顶部或「更多」菜单',
        'Web 端：需登录后使用云链接，压缩能力以当前版本为准',
        '跨端分享同一文档时，建议统一使用云链接避免版本不一致',
      ],
    },
    {
      title: '压缩失败或体积仍过大',
      items: [
        '在文档内压缩图片分辨率或删除未使用的嵌入对象',
        '分章节导出为多个较小文件分别发送',
        '改用 PDF 导出并启用 PDF 压缩选项（若客户端支持）',
        '检查网络后重试；失败时可先「另存为」再执行压缩分享',
      ],
    },
  ],
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
    {
      q: '压缩需要联网吗？',
      a: '本地压缩通常可离线完成；生成云分享链接或上传到第三方应用时需要网络连接。',
    },
    {
      q: '压缩前的文件会被修改吗？',
      a: '一般不会。压缩针对分享副本或临时导出包，原始文档仍保留在本地或云文档中。',
    },
    {
      q: 'PDF 也能压缩后分享吗？',
      a: '若客户端支持导出并压缩 PDF，可在分享前选择 PDF 格式；具体入口因平台而异。',
    },
  ],
  productUpdates: [
    '2026 年 6 月 24 日：更新各端「压缩后分享」入口位置与档位说明。',
    '2026 年 5 月：分享面板增加压缩后预估大小，便于判断是否符合渠道限制。',
    '2026 年 4 月：优化图片较多文档的压缩速度，平均耗时缩短约 20%。',
    '2026 年 3 月：修复个别机型上压缩完成后分享目标应用未唤起的问题。',
  ],
  glossary: [
    '**压缩后分享**：在发送前先减小文档体积的分享流程，常用于附件与即时通讯场景。',
    '**压缩档位**：在清晰度与体积之间的预设策略，如标准压缩、高压缩等。',
    '**嵌入对象**：文档内嵌的图片、图表、OLE 对象等，通常是压缩的主要目标。',
    '**云链接分享**：上传至云端后生成链接，接收方在线查看，可避免附件大小限制。',
    '**预估大小**：压缩完成前根据档位与内容估算的文件体积，供发送前参考。',
  ],
  plansPricingSections: [
    {
      title: '免费能力',
      body: '标准压缩档位与单次分享通常免费开放，满足日常邮件与 IM 转发需求。',
    },
    {
      title: '高级压缩',
      body: '更高压缩比、批量处理或无损优先策略可能为会员能力，以分享面板标识为准。',
    },
    {
      title: '云存储与流量',
      body: '生成云链接会占用云空间配额；超大文件上传可能受网络与账号套餐限制。',
    },
  ],
  related: [
    '**分享** — 常规分享、权限设置与协作链接的基础说明。',
    '**减小文档体积** — 在编辑阶段优化图片与嵌入对象，从源头降低文件大小。',
    '**输出为 PDF** — 导出 PDF 后再分享，适合只读分发场景。',
    '**云文档链接** — 用链接代替附件，绕过多数大小限制。',
    '**权限与加密** — 对外分享前设置访问密码或有效期。',
  ],
  notes: [
    '涉及高清图片或扫描页时，压缩前后请核对清晰度是否满足阅读需求。',
    '对外分享前请确认文档权限与敏感信息已处理。',
    '若压缩失败，可先保存文档并检查网络连接后重试。',
    '不同 IM 或邮件服务对附件上限不同，建议以压缩后预估大小为准。',
    '机密文档优先使用云链接并开启访问控制，而非直接发送离线副本。',
    '压缩过程中请保持应用在前台，避免系统杀进程导致任务中断。',
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
      'Preview image clarity and key pages before sending',
      'If still over the limit, raise compression or switch to a cloud link',
    ],
    screenshots: [
      '[Screenshot] Share entry in the toolbar',
      '[Screenshot] Compression level picker',
      '[Screenshot] Share panel after compression completes',
    ],
  },
  howToGuideSections: [
    {
      title: 'Pick a compression level',
      items: [
        'Standard: balanced size and clarity for most email and chat limits',
        'High: smaller files for scans or image-heavy documents',
        'Compare estimated size with channel limits (e.g., 20 MB, 100 MB)',
        'For marketing PDFs, prefer standard and spot-check hero pages',
      ],
    },
    {
      title: 'Share after compression',
      items: [
        'Cloud link: upload and share a URL—usually bypasses attachment caps',
        'Send as file: hand off the compressed package to mail or chat apps',
        'Save to cloud: keep a copy with separate view or edit permissions',
        'Regular share: skip compression when the file is already small enough',
      ],
    },
    {
      title: 'Platform differences',
      items: [
        'Desktop: Share is often top-right or under File → Share',
        'Mobile: Share icon in the editor header or overflow menu',
        'Web: cloud links require sign-in; compression depends on build',
        'Use one cloud link when collaborating across devices to avoid version drift',
      ],
    },
    {
      title: 'When compression fails or size is still too large',
      items: [
        'Reduce image resolution or remove unused embedded objects in the doc',
        'Split into smaller chapter files and send separately',
        'Export to PDF with compression if your client supports it',
        'Retry on a stable network; Save As first if compression aborts',
      ],
    },
  ],
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
    {
      q: 'Does compression require internet?',
      a: 'Local compression can work offline; cloud links and hand-off to other apps need connectivity.',
    },
    {
      q: 'Is the original file modified?',
      a: 'Usually not. Compression targets a share copy or export package; your source document stays intact.',
    },
    {
      q: 'Can I compress and share a PDF?',
      a: 'If your client supports PDF export with compression, pick PDF before sharing—entries vary by platform.',
    },
  ],
  productUpdates: [
    'June 24, 2026: Refreshed compress-and-share entry points and level descriptions.',
    'May 2026: Share panel shows estimated size after compression for channel limit checks.',
    'April 2026: Faster compression for image-heavy documents (about 20% quicker in internal tests).',
    'March 2026: Fixed cases where the target app did not open after compression on some phones.',
  ],
  glossary: [
    '**Share After Compression**: Shrinks the file before delivery—common for email and chat attachments.',
    '**Compression level**: Preset trade-off between clarity and file size (standard, high, etc.).',
    '**Embedded object**: Images, charts, or OLE items inside the document—main targets for compression.',
    '**Cloud link**: Uploads to the cloud and shares a URL so recipients are not limited by attachment size.',
    '**Estimated size**: Projected file weight before sending, based on level and document content.',
  ],
  plansPricingSections: [
    {
      title: 'Free',
      body: 'Standard compression and single-file share flows are usually free for everyday email and IM.',
    },
    {
      title: 'Advanced compression',
      body: 'Higher ratios, batch jobs, or lossless-first modes may be membership features—check panel badges.',
    },
    {
      title: 'Cloud storage',
      body: 'Cloud links consume drive quota; very large uploads may be limited by plan and network speed.',
    },
  ],
  related: [
    '**Share** — Permissions, links, and basic collaboration settings.',
    '**Reduce File Size** — Optimize images and embeds before sharing.',
    '**Export as PDF** — Read-only distribution after export.',
    '**Cloud document links** — Replace heavy attachments with a URL.',
    '**Permissions & encryption** — Passwords and expiry before external send.',
  ],
  notes: [
    'For scans or HD images, verify readability after compression.',
    'Check permissions and sensitive content before external sharing.',
    'If compression fails, save the file and retry with a stable network connection.',
    'Attachment limits differ by email or chat provider—use the estimated size as a guide.',
    'Prefer controlled cloud links for confidential docs instead of offline copies.',
    'Keep the app in the foreground during compression to avoid interrupted jobs.',
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
