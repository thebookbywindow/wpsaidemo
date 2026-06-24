import { writerHelpContent } from './writerHelpContent.js'
import { installSetupHelpContent } from './installSetupHelpContent.js'

export const ALL_DOC_LANGS = ['zh-cn', 'zh-tw', 'en-us', 'ja-jp', 'ko-kr', 'es-mx']

export function createDocsPathKey(pathParts = []) {
  return pathParts.filter(Boolean).join(' / ')
}

export { writerHelpContent }

const zhOnlyPublishedLangs = ['zh-cn']

function buildZhHelpArticle({
  title,
  summary,
  quickStartIntro,
  steps,
  features,
  faq,
  tips = [],
  updated = '2026 年 5 月 16 日',
  platforms = '桌面版/Web 版/移动版',
}) {
  return `# ${title}

> 适用平台：${platforms} | 更新日期：${updated}

---

## 产品概述

${summary}

## 快速入门

${quickStartIntro}

${steps.map((step, index) => `### 第 ${index + 1} 步：${step.title}
${step.body}`).join('\n\n')}

## 核心能力

${features.map((feature) => `### ${feature.title}
${feature.body}`).join('\n\n')}

${tips.length ? `## 使用建议

${tips.map((tip) => `- ${tip}`).join('\n')}

` : ''}## 常见问题

${faq.map((item) => `### Q：${item.q}
A：${item.a}`).join('\n\n')}

---

*如需进一步帮助，请继续浏览文档中心中的相关栏目。*`
}

function createZhOnlyHelpContent(config) {
  return {
    'zh-cn': buildZhHelpArticle(config),
  }
}

function createInternalDocEntry(
  pathParts,
  routeSlug,
  helpContent,
  publishedLangs = zhOnlyPublishedLangs,
  options = {},
) {
  return {
    pathParts,
    routeSlug,
    docRouteSlug: options.docRouteSlug ?? '',
    sectionRouteSlug: options.sectionRouteSlug ?? '',
    helpContent,
    publishedLangs: [...publishedLangs],
  }
}

const pptHelpContent = createZhOnlyHelpContent({
  title: 'AI PPT 快速上手',
  summary:
    'AI PPT 文档聚合了来源项目中与演示生成相关的说明内容，适合从主题输入、文档转大纲到生成完整演示文稿的入门场景。你可以从一个标题、几段文本，或现有文档出发，快速生成风格统一的 PPT 初稿。',
  quickStartIntro: '按照下面 3 步即可从想法到演示成稿。',
  steps: [
    {
      title: '输入主题或导入现有内容',
      body:
        '在 AI PPT 中输入主题、演讲目标，或者导入 Word / PDF / 现有文档内容，系统会自动抽取核心信息并生成结构化大纲。',
    },
    {
      title: '选择风格并生成页面',
      body:
        '根据场景选择商业汇报、教学演示、路演提案等风格后，系统会自动生成封面、目录、内容页和结尾页。',
    },
    {
      title: '细化页面并导出',
      body:
        '对单页文案、图示和配色进行微调后，即可继续编辑、导出 PPT 或转为 PDF，满足汇报和分享场景。',
    },
  ],
  features: [
    {
      title: '从文档到演示一键生成',
      body: '可直接基于现有文档内容生成演示结构，减少手工拆页和排版的时间成本。',
    },
    {
      title: '模板与主题自动统一',
      body: '自动套用统一版式、字体和配色，让生成结果更接近正式对外展示的演示质量。',
    },
    {
      title: '适合新手快速起稿',
      body: '即使没有完整的大纲，也能先生成可编辑草稿，再逐页打磨内容。',
    },
  ],
  tips: [
    '先明确目标受众和汇报时长，再决定生成页数。',
    '如果已有 Word 或 PDF 材料，优先导入原文以提升结构准确度。',
    '生成后建议重点检查目录、数据页和结论页。',
  ],
  faq: [
    {
      q: '没有现成大纲也能生成 PPT 吗？',
      a: '可以，只需提供主题、用途或几个关键点，系统会先帮你补齐基础结构。',
    },
    {
      q: '生成后的页面可以继续编辑吗？',
      a: '可以，生成后的内容仍可逐页修改文字、图片、布局和主题风格。',
    },
    {
      q: '适合哪些场景？',
      a: '适合工作汇报、教学课件、项目提案、营销方案和产品介绍等常见演示场景。',
    },
  ],
})

const sheetHelpContent = createZhOnlyHelpContent({
  title: 'AI 表格快速上手',
  summary:
    'AI 表格文档对应来源项目中的 AI Excel / 公式与数据分析能力，适合需要快速建表、生成公式、分析数据和整理结果的办公场景。它可以帮助你从自然语言需求出发，把复杂表格操作变成更直接的问答和生成流程。',
  quickStartIntro: '按照下面 3 步即可完成常见表格任务。',
  steps: [
    {
      title: '准备数据或描述需求',
      body:
        '先导入已有数据表，或直接用自然语言说明你想完成的任务，例如“统计每月销售额”“生成 VLOOKUP 公式”。',
    },
    {
      title: '让 AI 生成公式或分析结果',
      body:
        '系统会根据表头、字段关系和操作意图，自动生成公式、筛选方案、图表建议或分析结论。',
    },
    {
      title: '校验并应用结果',
      body:
        '将 AI 生成的公式、图表或结构应用到工作表中，再结合业务口径做最终校验和调整。',
    },
  ],
  features: [
    {
      title: '自然语言生成公式',
      body: '无需死记复杂函数，也能快速得到查找、汇总、条件判断等常见公式。',
    },
    {
      title: '数据分析更高效',
      body: '可根据现有数据自动给出趋势、异常、对比和图表建议，缩短分析时间。',
    },
    {
      title: '适合高频办公场景',
      body: '预算表、销售报表、运营台账和统计分析等场景都可以直接套用。',
    },
  ],
  tips: [
    '先保证字段命名清晰，AI 更容易理解你的数据结构。',
    '复杂分析建议拆成几个问题逐步提问，而不是一次写太多要求。',
    '应用生成公式后，先抽样核对关键结果。',
  ],
  faq: [
    {
      q: 'AI 可以直接帮我写 Excel 公式吗？',
      a: '可以，你只需要描述目标或业务规则，系统会生成对应函数或公式组合。',
    },
    {
      q: '能处理已有表格数据吗？',
      a: '可以，基于现有字段和数据内容，AI 可以继续做分析、筛选和计算建议。',
    },
    {
      q: '适合新手吗？',
      a: '适合。即使不熟悉函数，也可以先用自然语言得到可用结果，再逐步学习公式逻辑。',
    },
  ],
})

const editConvertHelpContent = createZhOnlyHelpContent({
  title: '编辑转化快速上手',
  summary:
    '编辑转化文档对应来源项目中 PDF 与 Office 文件之间的转换、编辑、压缩和导出说明，适合“先处理内容，再转换格式”的日常高频场景。无论是 PDF 转 Word、Word 转 PDF，还是压缩、拆分和合并，都可以在同一工作流中完成。',
  quickStartIntro: '按照下面 3 步即可完成常见编辑与转换任务。',
  steps: [
    {
      title: '导入源文件',
      body:
        '将 PDF、Word、Excel、PPT 或图片文件上传到对应入口，系统会自动识别文件类型并匹配处理能力。',
    },
    {
      title: '选择转换或编辑方式',
      body:
        '根据目标选择“转 Word”“转 PDF”“压缩”“拆分”“合并”等操作，必要时可先进行页级编辑或内容调整。',
    },
    {
      title: '下载并复核结果',
      body:
        '生成结果后下载文件，并重点检查版式、页码、表格和图片是否与预期一致。',
    },
  ],
  features: [
    {
      title: '多格式互转',
      body: '支持 PDF 与 Word、Excel、PPT、图片等格式之间的互相转换，满足常见办公需求。',
    },
    {
      title: '编辑后再导出',
      body: '可先处理页面、文本或内容结构，再导出目标格式，减少来回修改的次数。',
    },
    {
      title: '适合批量和高频使用',
      body: '对于合并、拆分、压缩等重复性操作，能显著提升效率。',
    },
  ],
  tips: [
    '扫描件建议先做识别或 OCR，再进行编辑和转换。',
    '需要保留版式时，优先选择对应的专用转换入口。',
    '批量处理前先抽样验证一份结果。',
  ],
  faq: [
    {
      q: 'PDF 转 Word 会保留原排版吗？',
      a: '大多数常见场景可以尽量保留原排版，但复杂页面仍建议导出后做一次人工复核。',
    },
    {
      q: '转换前可以先编辑页面吗？',
      a: '可以，部分场景支持先做页级处理，再输出目标格式。',
    },
    {
      q: '适合哪些文件？',
      a: '适合合同、报告、课件、报表和图片材料等需要跨格式流转的办公文件。',
    },
  ],
})

const smartDocHelpContent = createZhOnlyHelpContent({
  title: '智能文档使用说明',
  summary:
    '智能文档聚焦于“基于现有文档继续生成”的工作方式，适合写作扩展、改写润色、内容总结、问答提取和大纲整理等场景。来源项目中的 AI Writer、AI 文档和文档问答等能力，都可以归到这一类工作流中。',
  quickStartIntro: '按照下面 3 步即可开始使用智能文档。',
  steps: [
    {
      title: '准备原文或任务目标',
      body: '你可以直接粘贴文本，也可以基于已有文档提出“总结、改写、扩写、提取要点”等目标。',
    },
    {
      title: '选择 AI 处理方式',
      body: '按需使用续写、润色、问答、提炼摘要或生成大纲等能力，让 AI 基于上下文继续处理。',
    },
    {
      title: '合并结果并继续编辑',
      body: '将生成结果插回文档后，按语气、结构和事实准确性做最终确认，再继续协作或分享。',
    },
  ],
  features: [
    {
      title: '文档级上下文理解',
      body: 'AI 不只处理一句话，而是能围绕整段内容或整篇文档继续生成。',
    },
    {
      title: '适合从草稿到定稿',
      body: '既适合快速起稿，也适合在已有文本基础上做润色、重写和总结。',
    },
    {
      title: '问答与提取更直接',
      body: '面对长文档时，可以直接提问重点信息，而不必逐段手动查找。',
    },
  ],
  tips: [
    '先给出清晰目标，例如“更正式”“压缩到 200 字”“提取 3 个结论”。',
    '涉及事实和数据时，建议人工核对生成结果。',
    '重要文档建议保留原稿与 AI 版本，方便比较差异。',
  ],
  faq: [
    {
      q: '适合处理长文档吗？',
      a: '适合，尤其适合总结、问答和结构梳理类任务。',
    },
    {
      q: '可以只改写某一段吗？',
      a: '可以，支持按选区、段落或整篇内容分别处理。',
    },
    {
      q: '适合哪些类型的写作？',
      a: '适合报告、邮件、方案、会议纪要、营销文案和教学材料等多数文本场景。',
    },
  ],
})

const smartSheetHelpContent = createZhOnlyHelpContent({
  title: '智能表格使用说明',
  summary:
    '智能表格是在传统表格能力上叠加 AI 助手后的工作方式，适合快速建表、批量分析、字段解释、公式生成和结果复盘等场景。它强调的是“让 AI 读懂你的表格，再给出可执行结果”。',
  quickStartIntro: '按照下面 3 步即可开始使用智能表格。',
  steps: [
    {
      title: '导入或创建工作表',
      body: '先准备字段清晰的数据表，或让 AI 根据你的描述直接生成基础表结构。',
    },
    {
      title: '用自然语言发起任务',
      body: '可以提出“生成公式”“找出异常”“汇总趋势”“按条件筛选”等需求，AI 会返回对应结果。',
    },
    {
      title: '应用并验证输出',
      body: '将 AI 输出应用到表格中，并结合业务规则对关键数据做抽样验证。',
    },
  ],
  features: [
    {
      title: '从问题直接到结果',
      body: '省去查函数、写条件和反复试错的过程，用自然语言更快得到答案。',
    },
    {
      title: '支持分析与解释',
      body: '不仅给出结果，还可解释公式逻辑、字段关系和分析原因。',
    },
    {
      title: '更适合复杂表格协作',
      body: '面对多人维护或结构复杂的表格时，能更快定位字段和操作方式。',
    },
  ],
  tips: [
    '复杂任务最好拆成“清洗数据”“生成公式”“做分析”三步。',
    '字段命名尽量避免歧义，如“日期”“金额”“负责人”等。',
    '对外汇报前，建议人工确认核心口径与图表结论。',
  ],
  faq: [
    {
      q: '和普通表格有什么区别？',
      a: '普通表格主要靠手工操作，智能表格则支持通过自然语言直接完成更多复杂任务。',
    },
    {
      q: '能处理已有历史表吗？',
      a: '可以，尤其适合在现有业务表基础上补充分析、生成公式和解释结果。',
    },
    {
      q: '适合哪些岗位？',
      a: '运营、财务、销售、人事和项目管理等需要高频处理数据的岗位都适合。',
    },
  ],
})

const smartFormHelpContent = createZhOnlyHelpContent({
  title: '智能表单使用说明',
  summary:
    '智能表单适合快速创建问卷、登记表、收集单和内部审批表单，并在此基础上结合 AI 生成题目、优化提问逻辑和整理回收结果。它更关注“信息采集流程”的效率和准确性。',
  quickStartIntro: '按照下面 3 步即可完成一个基础表单。',
  steps: [
    {
      title: '确定收集目标',
      body: '先明确你需要收集什么信息，例如报名信息、客户线索、活动反馈或内部审批数据。',
    },
    {
      title: '生成题目与逻辑',
      body: '使用 AI 快速生成字段、问题说明和跳转逻辑，再根据实际流程调整必填项和校验规则。',
    },
    {
      title: '发布并整理结果',
      body: '发布表单后收集填写结果，并将数据自动汇总到表格或统计视图中继续分析。',
    },
  ],
  features: [
    {
      title: '适合快速搭建信息采集流程',
      body: '从字段设计到填写发布都可以在较短时间内完成。',
    },
    {
      title: '支持逻辑与校验',
      body: '可以设置必填、条件分支和基础规则，减少无效提交。',
    },
    {
      title: '结果可继续分析',
      body: '回收后的数据可继续沉淀到表格或其他统计流程中使用。',
    },
  ],
  tips: [
    '问题越清晰，回收数据越好用。',
    '正式发布前先自测一轮完整填写流程。',
    '需要统计分析时，提前规划字段格式。',
  ],
  faq: [
    {
      q: '适合做问卷吗？',
      a: '适合，尤其适合报名、登记、反馈和基础审批类表单场景。',
    },
    {
      q: '能自动汇总结果吗？',
      a: '可以，表单结果可进一步汇总到表格或视图中分析。',
    },
    {
      q: 'AI 能帮我设计题目吗？',
      a: '可以，AI 可以先给出一版字段和题目结构，再由你根据业务需求调整。',
    },
  ],
})

const multidimHelpContent = createZhOnlyHelpContent({
  title: '多维表格使用说明',
  summary:
    '多维表格适合处理结构化协作数据，例如项目任务、客户信息、内容排期和资产台账。相比普通表格，它更强调字段建模、视图切换、多人协作与流程自动化，是文档中心里偏“管理型”的数据工具。',
  quickStartIntro: '按照下面 3 步即可搭建一个基础多维表格。',
  steps: [
    {
      title: '设计字段结构',
      body: '先定义主表和字段类型，例如文本、日期、成员、状态、附件和关联记录等。',
    },
    {
      title: '创建视图与协作规则',
      body: '根据角色创建筛选视图、看板或分组视图，并配置权限、负责人和状态流转规则。',
    },
    {
      title: '沉淀数据并自动化流转',
      body: '随着记录持续进入，多维表格可以成为团队共享的数据底座，再叠加提醒、自动化和统计逻辑。',
    },
  ],
  features: [
    {
      title: '比普通表格更适合协作管理',
      body: '不仅能存数据，还能围绕状态、负责人和流程做组织。',
    },
    {
      title: '多视图适应不同角色',
      body: '同一份数据可按项目、部门或阶段切换不同视图，减少重复维护。',
    },
    {
      title: '适合持续积累业务数据',
      body: '长期使用时更容易沉淀结构化信息并形成统一管理入口。',
    },
  ],
  tips: [
    '先把字段设计清楚，再开始批量录入。',
    '视图命名建议按团队或场景统一规则。',
    '如果后续要自动化，字段结构尽量在前期就稳定下来。',
  ],
  faq: [
    {
      q: '适合用来做项目管理吗？',
      a: '适合，尤其适合任务、进度、负责人和阶段状态都需要结构化管理的项目场景。',
    },
    {
      q: '和普通表格相比优势是什么？',
      a: '更适合多人协作、视图管理、权限控制和流程化使用，而不只是静态数据记录。',
    },
    {
      q: '适合哪些团队？',
      a: '运营、项目、市场、HR、销售和内容团队都很适合使用多维表格沉淀流程数据。',
    },
  ],
})

const aiSlidesHelpContent = createZhOnlyHelpContent({
  title: 'AI Slides 使用说明',
  summary:
    'AI Slides 是来源项目中演示能力的统一入口，覆盖大纲生成、主题排版、单页补充、脑图转幻灯片和演讲视频等相关流程。适合把“想法、文本、文档”快速变成可展示的页面结构。',
  quickStartIntro: '按照下面 3 步即可从内容输入到可展示页面。',
  steps: [
    {
      title: '准备主题或原始内容',
      body: '你可以提供一个主题、导入文档，或直接给出脑图、提纲和关键点。',
    },
    {
      title: '生成结构与页面',
      body: 'AI Slides 会先整理结构，再自动生成页面层级、文案主次和推荐视觉排版。',
    },
    {
      title: '补充细节并完成输出',
      body: '继续调整内容层次、配图和风格后，即可用于演示、汇报或继续导出。',
    },
  ],
  features: [
    {
      title: '覆盖从大纲到成稿的完整链路',
      body: '不只是生成一页，而是支持围绕整套演示内容做持续补充和迭代。',
    },
    {
      title: '适合复杂场景的内容重组',
      body: '面对长文档、脑图和零散素材时，可以更快整理成适合演示的结构。',
    },
    {
      title: '和 AI PPT 互补',
      body: 'AI PPT 更偏快速成稿，AI Slides 更偏围绕演示工作流做持续扩展。',
    },
  ],
  faq: [
    {
      q: '和 AI PPT 有什么区别？',
      a: '两者都能做演示生成，但 AI Slides 更强调围绕演示工作流的扩展能力和内容重组。',
    },
    {
      q: '可以基于脑图生成吗？',
      a: '可以，AI Slides 适合从提纲、脑图或结构化要点快速生成页面。',
    },
    {
      q: '适合哪些场景？',
      a: '适合路演、培训、教学、方案汇报和需要快速组织展示逻辑的场景。',
    },
  ],
})

const resumeHelpContent = createZhOnlyHelpContent({
  title: '简历中心使用说明',
  summary:
    '简历中心适合快速选择模板、生成简历内容、优化措辞并导出成适合投递的版本。来源项目中的简历模板能力和相关文案生成能力，都可以在这里理解为“从模板到内容”的一体化流程。',
  quickStartIntro: '按照下面 3 步即可完成一份基础简历。',
  steps: [
    {
      title: '选择模板或职位方向',
      body: '先根据岗位类型、资历阶段和风格偏好选择模板，例如校招、技术岗、管理岗或创意岗位。',
    },
    {
      title: '填写经历并优化内容',
      body: '输入教育背景、项目经历和工作成果后，可使用 AI 对描述进行精炼、强化和结构化处理。',
    },
    {
      title: '导出并复核投递版本',
      body: '完成版式和内容确认后，导出可投递版本，并根据岗位要求做定制化微调。',
    },
  ],
  features: [
    {
      title: '模板与内容同步优化',
      body: '不仅提供版式模板，也支持对经历描述和亮点表达做进一步打磨。',
    },
    {
      title: '适合不同求职阶段',
      body: '无论是应届生、转岗、晋升或高阶岗位申请，都可以先从模板开始快速成稿。',
    },
    {
      title: '导出和分享更方便',
      body: '完成后可以继续导出、复用和按岗位定制不同版本。',
    },
  ],
  faq: [
    {
      q: '没有现成简历也能开始吗？',
      a: '可以，先选模板，再逐步填写基础信息和经历即可。',
    },
    {
      q: 'AI 可以帮我润色经历描述吗？',
      a: '可以，尤其适合把普通叙述改成更清晰、更结果导向的表达。',
    },
    {
      q: '适合哪些岗位？',
      a: '适合大多数通用岗位，同时也能基于不同模板覆盖校招、技术、产品、运营和管理岗等场景。',
    },
  ],
})

const aiPdfHelpContent = createZhOnlyHelpContent({
  title: 'AI PDF 使用说明',
  summary:
    'AI PDF 聚焦于基于 PDF 内容继续理解、提取与处理的工作方式，适合长文总结、问答检索、翻译和印前优化等场景。它和传统 PDF 编辑、转换能力不同，更强调“读懂内容后继续处理”。',
  quickStartIntro: '按照下面 3 步即可开始使用 AI PDF。',
  steps: [
    {
      title: '上传或打开 PDF',
      body: '先准备需要处理的 PDF 文件，尤其适合论文、合同、报告和较长篇幅的阅读材料。',
    },
    {
      title: '选择 AI 任务',
      body: '可以围绕全文总结、重点问答、双语翻译或内容提取等目标发起任务。',
    },
    {
      title: '整理结果并继续应用',
      body: '将摘要、问答结果或提取信息继续用于阅读、汇报、复盘或后续编辑流程。',
    },
  ],
  features: [
    {
      title: '适合长文阅读场景',
      body: '面对页数较多的 PDF，可以更快定位重点内容。',
    },
    {
      title: '支持问答与总结',
      body: '不必逐页翻找，直接围绕目标问题提取信息即可。',
    },
    {
      title: '可与传统 PDF 流程结合',
      body: '理解内容后，仍可继续配合转换、编辑和导出能力完成完整流程。',
    },
  ],
  faq: [
    {
      q: '适合读论文和合同吗？',
      a: '适合，这类长文档通常最适合先总结、问答再继续深读。',
    },
    {
      q: '和普通 PDF 编辑有什么区别？',
      a: '普通编辑偏页面和内容改动，AI PDF 更偏基于全文内容的理解、提炼和交互。',
    },
    {
      q: '翻译后还能继续编辑吗？',
      a: '可以，AI 结果可作为后续编辑、汇报和沟通的基础材料。',
    },
  ],
})

const staticMetaEntries = [
  createInternalDocEntry(
    ['新手入门', '快速上手', '安装与登录'],
    'install-sign-in',
    installSetupHelpContent,
    ALL_DOC_LANGS,
  ),
  createInternalDocEntry(
    ['新手入门', 'WPS 文字'],
    'wps-writer',
    writerHelpContent,
    ALL_DOC_LANGS,
  ),
]

export function buildDocsStaticMetaMap() {
  return Object.fromEntries(
    staticMetaEntries.map((entry) => {
      const pathKey = createDocsPathKey(entry.pathParts)
      return [
        pathKey,
        {
          ...entry,
          pathKey,
        },
      ]
    }),
  )
}
