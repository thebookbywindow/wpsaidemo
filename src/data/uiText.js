export const uiTextByLanguage = {
  en: {
    nav: {
      products: 'Products',
      templates: 'Templates',
      download: 'Download',
      pricing: 'Pricing',
      resources: 'Resources',
      menu: 'Menu',
      closeMenu: 'Close menu',
      language: 'Language',
      signIn: 'Sign In',
      getStartedFree: 'Free download',
      seeAllTools: 'See all tools →',
      docsCenter: 'Docs Center',
      guides: 'Guides',
      blog: 'Blog',
      encyclopedia: 'Encyclopedia',
      qa: 'Q&A',
    },
    home: {
      // Hero: SEO lead + typewriter + tail (download lives in desc/CTA, not H1)
      heroTitleLead: 'Create smarter & faster ',
      heroTitleJoin: 'across',
      heroTitleTail: 'With an AI-powered agentic free office',
      heroTitlePrefix: 'Create smarter & faster across ',
      heroTitle:
        'Create smarter & faster across Copilot, Docs, Slides, Sheets, PDF, Photos, AirPage, AirSheet, Forms, DBSheet With an AI-powered agentic free office',
      heroDesc:
        'Meet WPS Office — a better way to work, all in one place. Collaborate in real time and stay in sync across PC, mobile, and online.',
      copilotSection: {
        badge: 'WPS Copilot',
        title: 'Your suite-wide AI assistant',
        summary:
          'Draft, rewrite, and summarize across every WPS app — from Docs and Sheets to PDF and Slides.',
        features: [
          'Draft and polish content in any WPS app',
          'Summarize long documents in one click',
          'Use AIPal as your web Copilot entry point',
        ],
        ctaLabel: 'Explore Copilot features',
      },
      // Entity: brand relationship only (not a product list)
      entityTitle: 'What is WPS AI?',
      entityAnswer:
        'WPS AI is the AI layer inside WPS Office (also called WPS or Kingsoft Office). It is not a separate suite: it adds AI drafting, rewriting, summarization, and formula help across the WPS Office apps.',
      downloadCta: 'Free download',
      downloadSection: {
        title: 'Download free now',
        ctaLabel: 'Get WPS Office',
      },
      // Catalog: platforms + download links only
      catalogTitle: 'Available platforms',
      catalogSummary: 'Download WPS Office for Windows, Mac, Linux, iPad, iOS, and Android.',
      catalogGroups: {
        platforms: 'Platforms',
      },
      // International AI feature directory (external official URLs)
      intlAiFeatures: {
        title: 'AI across WPS Office',
        summary:
          'Draft, analyze, present, and edit — explore built-in AI in Docs, Sheets, Slides, PDF, and the rest of the suite.',
        pillars: {
          copilot: {
            label: 'Copilot',
            tagline: 'Your suite-wide AI assistant',
            features: {
              'wps-ai-copilot-hub': 'Draft, rewrite, and summarize across WPS apps',
              aipal: 'Use AIPal as your web Copilot entry point',
            },
          },
          docs: {
            label: 'Docs',
            tagline: 'Write and rewrite smarter',
            spotlightLead:
              'WPS AI inside Writer helps you draft from a blank page, rewrite tone and clarity, and summarize long documents — all without leaving your doc.',
            features: {
              'ai-writer': 'Generate drafts and polish tone with AI Writer',
              'ai-summarizer': 'Summarize long documents in one click',
            },
            featureDetails: {
              'ai-writer':
                'Generate essays, blogs, and business copy up to 10× faster. AI Writer includes grammar checking and ChatGPT-powered drafting inside Word.',
              'ai-summarizer':
                'Turn reports, contracts, and research into concise summaries with AI — keep the key points and skip the manual read-through.',
            },
          },
          sheets: {
            label: 'Sheets',
            tagline: 'Analyze data with less manual work',
            spotlightLead:
              'Spreadsheet AI turns plain-language questions into formulas, insights, and tables — so you spend less time on syntax and more on decisions.',
            features: {
              'ai-excel-formula-generator': 'Build formulas from plain language',
              'ai-in-excel-spreadsheets': 'Ask questions and get insights from your data',
            },
            featureDetails: {
              'ai-excel-formula-generator':
                'Describe what you need in everyday language and get accurate Excel formulas instantly — fewer errors, no formula memorization.',
              'ai-in-excel-spreadsheets':
                'Ask questions about your data in natural language and get AI-driven insights, summaries, and analysis right inside your sheet.',
            },
          },
          slides: {
            label: 'Slides',
            tagline: 'Create presentations faster',
            spotlightLead:
              'Presentation AI turns outlines, topics, and briefs into polished slide decks — layout, structure, and copy included.',
            features: {
              'ai-ppt-maker': 'Turn an outline into a polished deck',
              'ai-powerpoint-generator': 'Generate slides from a topic or brief',
            },
            featureDetails: {
              'ai-ppt-maker':
                'Paste an outline or bullet list and let AI build a complete, well-structured presentation you can refine slide by slide.',
              'ai-powerpoint-generator':
                'Start from a topic, prompt, or brief and generate professional slides in seconds — compatible with PowerPoint workflows.',
            },
          },
          pdf: {
            label: 'PDF',
            tagline: 'Read, chat, and summarize PDFs',
            spotlightLead:
              'PDF AI lets you chat with documents, pull answers with source proof, and summarize long reports — securely inside WPS.',
            features: {
              'chat-with-pdf': 'Chat with PDFs to find answers instantly',
              'ai-pdf-summarizer': 'Summarize reports without reading every page',
            },
            featureDetails: {
              'chat-with-pdf':
                'Ask questions about any PDF and get instant answers with clickable source references — ideal for manuals, papers, and contracts.',
              'ai-pdf-summarizer':
                'Summarize lengthy PDFs in seconds with AI analysis and mobile-friendly reading — no need to scroll every page yourself.',
            },
          },
          photos: {
            label: 'Photos',
            tagline: 'Edit images with AI',
            features: {
              'ai-photo-editor': 'Enhance and retouch photos in one click',
              'ai-background-remover': 'Remove backgrounds instantly',
            },
          },
          airpage: {
            label: 'AirPage',
            tagline: 'Collaborative docs online',
            features: {
              'airpage-ai-writer': 'Draft and rewrite in online documents',
              'airpage-ai-summarizer': 'Summarize shared docs for the team',
            },
          },
          airsheet: {
            label: 'AirSheet',
            tagline: 'Online spreadsheets with AI',
            features: {
              'airsheet-ai-formula-generator': 'Build formulas without memorizing syntax',
              'airsheet-ai-in-spreadsheets': 'Analyze collaborative sheets with AI',
            },
          },
          forms: {
            label: 'Forms',
            tagline: 'Smart forms and surveys',
            features: {
              'forms-smart-form': 'Create smart forms that collect better responses',
              'forms-survey-creator': 'Launch surveys and export results to Sheets',
            },
          },
          dbsheet: {
            label: 'DBSheet',
            tagline: 'Multidimensional tables with AI',
            features: {
              'dbsheet-ai-table-generator': 'Generate structured tables from a prompt',
              'dbsheet-ai-in-spreadsheets': 'Use AI inside multidimensional workflows',
            },
          },
        },
        expandLabel: 'Show all',
        collapseLabel: 'Show less',
        browseAllLabel: 'Browse all AI features',
        explorePillarCta: 'Explore {app} AI features',
        coreTabsAriaLabel: 'Core WPS apps',
        homeCrumb: 'Home',
        pageCrumb: 'AI features',
        pageBadge: 'AI Feature Directory',
        pageTitle: 'WPS AI features across every app',
        pageDesc:
          'Official landing pages for Copilot, Writer, Spreadsheet, Presentation, PDF, Photos, AirPage, AirSheet, Forms, and DBSheet — grouped by WPS app.',
        itemCountLabel: '{count} official links',
        externalHint: 'Links open official WPS international feature pages in a new tab.',
        tabsAriaLabel: 'AI feature categories',
        seoTitle: 'WPS AI Features — Official Capability Directory | WPS Office',
        seoDescription:
          'Browse official WPS AI feature pages for Copilot, Docs, Sheets, Slides, PDF, Photos, and more. External links to WPS international AI landing pages.',
        tabs: {
          copilot: 'Copilot',
          writer: 'Writer',
          spreadsheet: 'Spreadsheet',
          presentation: 'Presentation',
          pdf: 'PDF',
          photos: 'Photos',
          airpage: 'AirPage',
          airsheet: 'AirSheet',
          forms: 'Forms',
          dbsheet: 'DBSheet',
        },
        groups: {
          copilot: 'Office Copilot',
          writer: 'Writer',
          spreadsheet: 'Spreadsheet',
          presentation: 'Presentation',
          pdf: 'PDF',
          photos: 'Photos / Visual AI',
          airpage: 'AirPage',
          airsheet: 'AirSheet',
          forms: 'Forms',
          dbsheet: 'DBSheet',
        },
        notes: {
          copilotNote:
            'Suite-wide AI entry points for WPS — not tied to a single component. Use these to open Office Copilot and AIPal across the office suite.',
          spreadsheetClientNote:
            'Formula Assistant, Sheet Assistant, and =WPSAI() have no dedicated landing pages — open them in Spreadsheet → WPS AI.',
          airpageNote:
            'AirPage embeds WPS AI for drafting, rewrite, summary, and translation inside online collaborative docs.',
          airsheetNote:
            'AirSheet is the online collaborative spreadsheet layer — pair Excel Online with Spreadsheet AI tools.',
          formsNote:
            'Smart Form / survey tools for data collection; export responses into Spreadsheet for deeper analysis.',
          dbsheetNote:
            'DBSheet (multidimensional tables) has limited dedicated EN AI landing pages — related AI table / Copilot links are listed meanwhile.',
        },
        items: {
          'wps-ai-copilot-hub': 'WPS AI · Office Copilot',
          aipal: 'AIPal (web Copilot)',
          'ai-writer': 'AI Writer',
          'ai-writer-feature': 'AI Writer (feature page)',
          'ai-text-generator': 'AI Text Generator / Smart Create · Edit',
          'ai-summarizer': 'AI Summarizer',
          'ai-improve-writing': 'AI Improve Writing',
          'ai-spell-check': 'AI Spell Check',
          'ai-spell-check-alt': 'AI Spell Check (alternate)',
          'spell-check-feature': 'Spell Check (feature page)',
          'grammar-checker': 'Grammar Checker',
          'ai-translator': 'AI Translator',
          'ai-translator-feature': 'AI Translator (feature page)',
          'document-translator': 'Document Translator',
          'ai-document-translator': 'AI Document Translator',
          'extract-text-with-ai': 'Extract Text with AI (OCR)',
          'data-analyst': 'Data Analyst (Copilot overview)',
          'ai-in-excel-spreadsheets': 'AI in Excel / Spreadsheets',
          'ai-excel-formula-generator': 'AI Excel Formula Generator',
          'ai-table-generator': 'AI Table Generator',
          'jpg-to-excel': 'JPG to Excel (AI OCR tables)',
          'ai-powerpoint-generator': 'AI PowerPoint Generator',
          'ai-ppt-maker': 'AI PPT Maker',
          'free-presentation-maker': 'Free Presentation Maker (AI)',
          'ai-translate-powerpoint': 'AI Translate PowerPoint',
          'slides-translator': 'AI Slides Translator',
          'slides-designer': 'Slides Designer (overview)',
          'chat-with-pdf': 'Chat with PDF',
          'chat-pdf-feature': 'Chat PDF (feature page)',
          'ai-pdf-summarizer': 'AI PDF Summarizer',
          'pdf-summarizer-feature': 'PDF Summarizer (feature page)',
          'ai-translate-pdf': 'AI Translate PDF',
          'pdf-document-translation': 'PDF Document Translation (layout-preserving)',
          'translate-scanned-pdf': 'Translate Scanned PDF',
          'pdf-ocr': 'PDF OCR',
          'pdf-ocr-feature': 'PDF OCR (feature page)',
          'convert-scanned-pdf-to-word': 'Convert Scanned PDF to Word',
          'pdf-reader-extension': 'PDF Reader Extension (AI summary / translate)',
          'pdf-reader-extension-feature': 'PDF Reader Extension (feature page)',
          'chrome-pdf-extension': 'Chrome PDF extension (AI summary / translate)',
          'ai-photo-editor': 'AI Photo Editor',
          'ai-photo-editor-alt': 'AI Photo Editor (photo path)',
          'ai-photo-editor-feature': 'AI Photo Editor (feature page)',
          'ai-background-remover': 'AI Background Remover',
          'ai-background-remover-feature': 'AI Background Remover (feature page)',
          'ai-photo-enhancer': 'AI Photo Enhancer',
          'photo-enhancer-feature': 'Photo Enhancer (feature page)',
          'ai-image-upscaler': 'AI Image Upscaler',
          'image-upscaler-feature': 'Image Upscaler (feature page)',
          'ai-photo-restoration': 'AI Photo Restoration',
          'ai-photo-restoration-feature': 'AI Photo Restoration (feature page)',
          'ai-remove-object': 'AI Remove Object',
          'magic-eraser': 'Magic Eraser',
          'ai-remove-text': 'AI Remove Text from Image',
          'extract-text-from-image': 'Extract Text from Image (OCR)',
          'image-watermark-remover': 'Image Watermark Remover',
          'airpage-online-document-editor': 'Online Document Editor (AI-assisted collab)',
          'airpage-word-online': 'Word Online (real-time collab)',
          'airpage-ai-writer': 'AI Writer (in AirPage workflows)',
          'airpage-ai-writer-feature': 'AI Writer (feature page)',
          'airpage-ai-text-generator': 'AI Text Generator',
          'airpage-ai-summarizer': 'AI Summarizer',
          'airpage-ai-improve-writing': 'AI Improve Writing / Rewrite',
          'airpage-ai-spell-check': 'AI Spell Check',
          'airpage-grammar-checker': 'Grammar Checker',
          'airpage-ai-translator': 'AI Translator',
          'airpage-ai-translator-feature': 'AI Translator (feature page)',
          'airsheet-excel-online': 'Excel Online (AirSheet collab)',
          'airsheet-online-excel-editor': 'Online Excel Sheet Editor',
          'airsheet-ai-in-spreadsheets': 'AI in Excel / Spreadsheets',
          'airsheet-ai-formula-generator': 'AI Excel Formula Generator',
          'airsheet-ai-table-generator': 'AI Table Generator',
          'airsheet-jpg-to-excel': 'JPG to Excel (AI OCR tables)',
          'airsheet-data-analyst': 'Data Analyst (Copilot overview)',
          'forms-online-form-builder': 'Online Form Builder',
          'forms-smart-form': 'Smart Form',
          'forms-survey-creator': 'Survey Creator',
          'forms-google-forms-alt': 'WPS Forms (Google Forms alternative)',
          'forms-fillable-forms': 'Free File Fillable Forms',
          'forms-create-fillable': 'Create Fillable Form',
          'dbsheet-ai-table-generator': 'AI Table Generator',
          'dbsheet-ai-in-spreadsheets': 'AI in Excel / Spreadsheets',
          'dbsheet-excel-online': 'Excel Online (data collab)',
          'dbsheet-copilot': 'WPS AI · Office Copilot',
          'dbsheet-aipal': 'AIPal (web Copilot)',
        },
      },
      // Freshness signal
      updatedLabel: 'Updated',
      updatedDate: 'July 2026',
      // Trust bar under hero CTA
      trustBarLabel: 'Trusted worldwide',
      trustBar: {
        brands: [
          'UNESCO',
          'FICCI',
          'AWS',
          'G2',
          'CNET',
          'Trustpilot',
          'TechRadar',
          'Forbes',
        ],
      },
      // About: company entity one-liner
      aboutTitle: 'About WPS',
      aboutText:
        'WPS Office and WPS AI are products of Kingsoft Office Software (WPS). The suite provides free office apps for documents, spreadsheets, presentations, and PDF across desktop, mobile, and web.',
      aboutLinkLabel: 'Product encyclopedia',
      // High-intent internal links
      intentLinksTitle: 'Popular WPS topics',
      intentLinksSub: 'Jump to high-intent pages for download, online use, and PDF tools.',
      intentLinks: {
        download: {
          label: 'Download WPS Office',
          desc: 'Free WPS Office download for PC, Mac, Linux, and mobile',
        },
        online: {
          label: 'WPS Online',
          desc: 'Use WPS Office tools in the browser',
        },
        pdf: {
          label: 'WPS PDF',
          desc: 'Edit, convert, and manage PDF files',
        },
        'pdf-to-word': {
          label: 'PDF to Word',
          desc: 'Convert PDF documents to editable Word files',
        },
      },
      // Comparison: quotable differences across common alternatives
      compareTitle: 'WPS Office vs Microsoft 365, Google Workspace, Notion & Adobe',
      compareSub:
        'A short factual comparison across office suites, AI workspaces, and PDF/creative tools — based on public product and pricing pages.',
      compareColumns: ['wps', 'microsoft', 'google', 'notion', 'adobe'],
      compareHeaders: {
        feature: 'Feature',
        wps: 'WPS Office / WPS AI',
        microsoft: 'Microsoft 365',
        google: 'Google Workspace',
        notion: 'Notion',
        adobe: 'Adobe',
      },
      compareRows: [
        {
          feature: 'Primary category',
          wps: 'Free all-in-one office suite (Writer, Spreadsheet, Presentation, PDF)',
          microsoft: 'Office productivity suite (Word, Excel, PowerPoint, and more)',
          google: 'Cloud office suite (Docs, Sheets, Slides, and Workspace services)',
          notion: 'AI workspace (docs, wiki, databases, agents)',
          adobe: 'PDF and creative document tools (Acrobat, Creative Cloud)',
        },
        {
          feature: 'Free start',
          wps: 'Free Standard plan with free download; advanced PDF/AI and higher cloud on paid plans',
          microsoft: 'Free web apps; paid plans for full desktop apps on PC and Mac',
          google: 'Free consumer Docs/Sheets/Slides; Google Workspace business plans paid',
          notion: 'Free plan for individuals; paid plans for teams and advanced features',
          adobe: 'Free Acrobat Reader / limited free tools; Acrobat Pro and Creative Cloud paid',
        },
        {
          feature: 'Desktop apps for PC',
          wps: 'Windows, Mac, and Linux desktop apps',
          microsoft: 'Windows and Mac desktop apps with paid Microsoft 365 plans',
          google: 'Primarily browser-based; limited offline/desktop options',
          notion: 'Windows and Mac desktop apps, plus web and mobile',
          adobe: 'Windows and Mac desktop apps (Acrobat, Creative Cloud apps)',
        },
        {
          feature: 'Word / Excel / PowerPoint',
          wps: 'Writer, Spreadsheet, Presentation',
          microsoft: 'Word, Excel, PowerPoint',
          google: 'Docs, Sheets, Slides',
          notion: 'Docs, databases, and wiki pages — not a classic Office trio',
          adobe: 'Not a full Word / Excel / PowerPoint suite',
        },
        {
          feature: 'PDF editing',
          wps: 'Built-in WPS PDF; basic PDF on Free, advanced edit/convert (incl. PDF to Word) on paid plans',
          microsoft: 'PDF features vary by Microsoft 365 app and plan',
          google: 'Limited native PDF editing; some Workspace plans add PDF-related tools (e.g. eSignature)',
          notion: 'Import/export support; no dedicated Acrobat-style PDF editor',
          adobe: 'Acrobat — edit, sign, convert between PDF and Word/Excel/PowerPoint',
        },
        {
          feature: 'AI assistance',
          wps: 'WPS AI across office apps (limits vary by plan)',
          microsoft: 'Copilot / AI features (plan-dependent)',
          google: 'Gemini features in Workspace apps (plan-dependent)',
          notion: 'Notion AI and agents (plan-dependent)',
          adobe: 'Acrobat AI Assistant and Firefly features (plan-dependent)',
        },
      ],
      compareDisclaimer:
        'Informational comparison only, based on publicly available product and pricing pages. Third-party product names are trademarks of their respective owners. Features, pricing, and availability vary by plan, platform, and region. Last updated: July 2026.',
      // Key facts: verifiable attributes (not definitions, not inventory)
      keyFactsTitle: 'Key facts',
      mediaProofTitle: 'Trusted by Experts. Proven by Users',
      mediaProofSummary:
        'Experience the shift from manual labor to intelligent creation. WPS software is your co-pilot for every task.',
      mediaProofTabs: {
        kol: { name: 'KOL Videos', desc: 'What creators are saying' },
        pr: { name: 'PR&Media', desc: 'Tech press and industry reviews' },
        g2: { name: 'G2 Users', desc: 'Real feedback from daily users' },
      },
      keyFacts: [
        {
          title: 'Free download and WPS online',
          desc: 'Download WPS Office free for Windows PC, Mac, Linux, Android, and iOS, or use WPS online in the browser with no install.',
        },
        {
          title: 'Microsoft Office file compatibility',
          desc: 'Open and edit common DOC/DOCX, XLS/XLSX, PPT/PPTX, and PDF formats used with Microsoft Word, Excel, and PowerPoint.',
        },
        {
          title: 'WPS PDF and PDF to Word',
          desc: 'WPS PDF supports edit PDF, PDF to Word, convert, compress, and related PDF workflows.',
        },
        {
          title: '20 languages',
          desc: 'WPS Office is localized in 20 languages for users and teams across regions.',
        },
      ],
      // FAQ: query-shaped answers only (definition lives in Entity)
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          question: 'How do I download WPS Office free for PC?',
          answer:
            'Open the Download WPS Office page and pick your platform — Windows PC, Mac, or Linux — for a free installer that includes Writer, Spreadsheets, Presentation, and PDF. Android and iOS builds are available from the same page or your app store. No credit card is required to start.',
        },
        {
          question: 'Can I use Word, Excel, and PowerPoint online with WPS?',
          answer:
            'Yes. WPS Office online (WPS web) runs in your browser — no install needed. Create and edit documents, spreadsheets, and slides online, sign in to sync with desktop and mobile, and open files from cloud storage or uploads.',
        },
        {
          question: 'How do I convert PDF to Word in WPS Office?',
          answer:
            'Open the PDF in WPS PDF, choose Convert → PDF to Word, and save a DOCX you can edit in WPS Writer. WPS PDF also supports edit PDF, merge, compress, sign, and other everyday PDF tasks in the same app.',
        },
        {
          question: 'Does WPS Office open Microsoft Word, Excel, and PowerPoint files?',
          answer:
            'Yes. WPS Writer, Spreadsheets, and Presentation open common Microsoft formats — including DOC, DOCX, XLS, XLSX, PPT, and PPTX — so you can work with files from Word, Excel, and PowerPoint without reformatting.',
        },
        {
          question: 'Is WPS Office free?',
          answer:
            'Yes. WPS Office is free to download and use on PC, Mac, Linux, mobile, and the web. Core document, spreadsheet, presentation, and PDF tools are included at no cost. WPS 365 paid plans add higher AI limits, cloud storage, and premium templates if you need more.',
        },
      ],
      seoTitle: 'WPS Office Free Download — WPS AI Online for PC | Docs, Slides, Sheets & PDF',
      seoDescription:
        'Download free WPS Office with WPS AI (Office Copilot) across Writer, Spreadsheet, Presentation, PDF, and Photos — on Windows, Mac, Linux, and mobile.',
    },
    footer: {
      products: 'Products',
      company: 'Company',
      support: 'Support',
      followUs: 'Follow us',
    },
    download: {
      title: 'Download WPS Office',
      desc: 'Get the ultimate office suite for your desktop and mobile devices.',
      heroTitle: 'Free WPS Office Download for Windows, Mac, Linux, Android, and iOS',
      heroDesc:
        'Download the latest WPS Office installer for desktop and mobile. Compatible with Microsoft Office formats and built for fast, reliable document editing anywhere.',
      latestVersionNote: 'Latest version: 2026.05 | Updated: May 2026',
      suiteDesc:
        'Our office suite includes documents, spreadsheets, presentations, and PDF tools, covering document editing, data creation and PDF management. It supports all common formats for business, education and home use.',
      desktopVersions: 'Desktop Versions',
      mobileApps: 'Mobile Apps',
      pdfToolkit: 'PDF Toolkit',
      updateNote:
        'Get the latest WPS Office download in every update: a refreshed interface, enhanced performance, and more personalized tools for every workflow.',
      worldwideCta: 'Looking for your language? Go to Worldwide',
      pdfToolkitDesc:
        'The WPS PDF toolkit includes useful tools that help you with reading, editing, converting, and signing PDF files.',
      faq: 'Frequently Asked Questions',
    },
    pricing: {
      title: 'Simple, transparent pricing',
      desc: 'Choose the plan that best fits your needs. All plans include core office apps.',
      billedAnnually: 'Billed annually',
      billedMonthly: 'Billed monthly',
      compareFeatures: 'Compare features',
    },
    guides: {
      title: 'WPS Guides & Tutorials',
      desc: 'Master WPS Office with step-by-step guides, tips, and best practices.',
      readGuide: 'Read Guide',
      minRead: 'min read',
      backToGuides: '← Back to all guides',
      tableOfContents: 'Table of Contents',
      relatedGuides: 'Related Guides',
      allGuides: 'All Guides',
    },
    templates: {
      libraryTitle: 'Template Library',
      libraryDesc: 'Free templates for every need',
      allTemplatesTitle: 'Browse All Templates',
      allTemplatesDesc:
        'Discover free, ready-to-use templates for resumes, presentations, spreadsheets, and more.',
      categories: 'Categories',
      backToLibrary: '← Back to library',
      useThisTemplate: 'Use this template',
      preview: 'Preview',
      features: 'Features',
      pages: 'pages',
      slides: 'slides',
      sheet: 'sheet',
      sheets: 'sheets',
      free: 'Free',
    },
    allProducts: {
      title: 'All Products & Tools',
      desc: 'Explore our complete suite of AI-powered office tools.',
      catalogBadge: 'Product Catalog',
      viewByCategory: 'View by Category',
      viewAZ: 'View A-Z',
    },
    worldwide: {
      badge: 'Global Language Map',
      title: 'wps.ai Worldwide',
      desc: 'wps.ai is available in multiple countries and regions. Choose your language preference below.',
      allLanguages: 'All Languages',
    },
    toolDemo: {
      tryItOut: 'Try it out',
      uploadFile: 'Upload a file to see',
      inAction: 'in action.',
      dropFiles: 'Drop files here',
      orClick: 'or click to browse',
      supportedFormats: 'Supported formats: PDF, DOCX, PPTX, XLSX (Max 10MB)',
      howItWorks: 'How it works',
      step1: 'Step 1: Open your file',
      step1Desc: 'Upload your document securely to our cloud processing engine.',
      step2: 'Step 2: Upload and configure',
      step2Desc: 'Select your desired output format and quality settings.',
      step3: 'Step 3: Download your result',
      step3Desc: 'Get your processed file instantly, ready to share or print.',
      readyToTry: 'Ready to try it?',
      getStarted: 'Get started for free. No credit card required.',
      startFree: 'Start Free',
    },
    blog: {
      heroTitle: 'The Official WPS Blog',
      heroDesc: 'Stories about AI-powered productivity, product launches, and how teams work smarter with WPS.',
      searchPlaceholder: 'Search articles...',
      featured: 'Featured',
      moreNews: 'More News',
      noResults: 'No results found.',
      followUs: 'Follow us',
      share: 'Share',
      copied: 'Copied!',
      tags: 'Tags:',
      relatedPosts: 'Related posts',
      backToBlog: '← Back to blog',
    }
  },
  zh: {
    nav: {
      products: '产品',
      templates: '模板',
      download: '下载',
      pricing: '定价',
      resources: '资源',
      menu: '菜单',
      closeMenu: '关闭菜单',
      language: '语言',
      signIn: '登录',
      getStartedFree: '免费下载',
      seeAllTools: '查看所有工具 →',
      docsCenter: '文档中心',
      guides: '指南',
      blog: '博客',
      encyclopedia: '百科',
      qa: '问答',
    },
    home: {
      // Hero: H1 讲价值，免费下载放 desc / CTA / seoTitle
      heroTitleLead: '更聪明、更高效地创作，',
      heroTitleJoin: '尽在',
      heroTitleTail: ' — 搭配 Agentic AI 驱动的 free office',
      heroTitlePrefix: '更聪明、更高效地创作，尽在 ',
      heroTitle:
        '更聪明、更高效地创作，尽在 Copilot, Docs, Slides, Sheets, PDF, Photos, AirPage, AirSheet, Forms, DBSheet — 搭配 Agentic AI 驱动的 free office',
      heroDesc:
        '遇见 WPS Office —— 更好的工作方式，一站到位。实时协作，多端同步，PC、移动端与在线版随时衔接。',
      copilotSection: {
        badge: 'WPS Copilot',
        title: '套件级 AI 助手',
        summary:
          '在 WPS 各应用中起草、改写与摘要 —— 覆盖文字、表格、演示、PDF 等完整办公套件。',
        features: [
          '在任意 WPS 应用中起草与润色内容',
          '一键摘要长文档',
          '通过 AIPal 使用网页版 Copilot 入口',
        ],
        ctaLabel: '探索 Copilot 功能',
      },
      // Entity: 只讲品牌关系
      entityTitle: '什么是 WPS AI？',
      entityAnswer:
        'WPS AI 是 WPS Office（又称 WPS / 金山办公）内部的 AI 能力层，不是另一套独立办公软件；它为 WPS 各应用提供起草、改写、摘要与公式辅助等 AI 功能。',
      downloadCta: '免费下载',
      downloadSection: {
        title: '立即免费下载',
        ctaLabel: '获取 WPS Office',
      },
      // Catalog: 仅平台与下载入口
      catalogTitle: '支持平台',
      catalogSummary: '支持 Windows、Mac、Linux、iPad、iOS 与 Android，点击进入下载页。',
      catalogGroups: {
        platforms: '支持平台',
      },
      intlAiFeatures: {
        title: '每个 WPS 应用，都能用 AI',
        summary:
          '写作、分析、演示、编辑 —— 按应用浏览文字、表格、演示、PDF 等 WPS 内置 AI 能力。',
        pillars: {
          copilot: {
            label: 'Copilot',
            tagline: '套件级 AI 助手',
            features: {
              'wps-ai-copilot-hub': '在 WPS 各应用中起草、改写与摘要',
              aipal: '通过 AIPal 使用网页版 Copilot 入口',
            },
          },
          docs: {
            label: '文字',
            tagline: '更聪明地写作与改写',
            spotlightLead:
              'WPS 文字内置 AI：从空白页起草、改写语气与表达、一键摘要长文档 —— 全程不离开当前文档。',
            features: {
              'ai-writer': '用 AI Writer 生成初稿并润色语气',
              'ai-summarizer': '一键摘要长文档',
            },
            featureDetails: {
              'ai-writer':
                '用自然语言生成文章、博客与商务文案，速度提升可达 10 倍；内置语法检查与 ChatGPT 级起草能力。',
              'ai-summarizer':
                '将报告、合同与研究材料压缩成精炼摘要，保留要点，省去通读时间。',
            },
          },
          sheets: {
            label: '表格',
            tagline: '少做手工，多做分析',
            spotlightLead:
              '表格 AI 把口语化问题变成公式、洞察与结构化表格 —— 少记语法，多做决策。',
            features: {
              'ai-excel-formula-generator': '用自然语言生成公式',
              'ai-in-excel-spreadsheets': '向数据提问，快速获得洞察',
            },
            featureDetails: {
              'ai-excel-formula-generator':
                '用日常语言描述需求，即时生成准确 Excel 公式，减少出错，无需背诵函数。',
              'ai-in-excel-spreadsheets':
                '用自然语言向表格提问，在 Sheet 内直接获得 AI 驱动的分析、摘要与洞察。',
            },
          },
          slides: {
            label: '演示',
            tagline: '更快做出演示文稿',
            spotlightLead:
              '演示 AI 可将大纲、主题或简报快速变成结构完整的幻灯片 —— 版式、层次与文案一并生成。',
            features: {
              'ai-ppt-maker': '把大纲变成完整 PPT',
              'ai-powerpoint-generator': '根据主题或简报生成幻灯片',
            },
            featureDetails: {
              'ai-ppt-maker':
                '粘贴大纲或要点列表，AI 自动生成结构清晰的完整演示，可逐页微调。',
              'ai-powerpoint-generator':
                '从主题、提示词或简报出发，数秒内生成专业幻灯片，兼容 PowerPoint 工作流。',
            },
          },
          pdf: {
            label: 'PDF',
            tagline: '阅读、对话、摘要 PDF',
            spotlightLead:
              'PDF AI 支持文档对话、带出处引用的问答，以及长报告摘要 —— 在 WPS 内安全完成。',
            features: {
              'chat-with-pdf': '与 PDF 对话，即时找答案',
              'ai-pdf-summarizer': '无需通读即可摘要报告',
            },
            featureDetails: {
              'chat-with-pdf':
                '对任意 PDF 提问并即时获得答案，附可点击的原文出处 —— 适合手册、论文与合同。',
              'ai-pdf-summarizer':
                '数秒内摘要超长 PDF，支持 AI 分析与移动阅读，无需逐页滚动。',
            },
          },
          photos: {
            label: 'Photos',
            tagline: 'AI 图片编辑',
            features: {
              'ai-photo-editor': '一键增强与修图',
              'ai-background-remover': '瞬间去除图片背景',
            },
          },
          airpage: {
            label: 'AirPage',
            tagline: '在线协作文档',
            features: {
              'airpage-ai-writer': '在线文档中起草与改写',
              'airpage-ai-summarizer': '为团队摘要共享文档',
            },
          },
          airsheet: {
            label: 'AirSheet',
            tagline: '在线表格 + AI',
            features: {
              'airsheet-ai-formula-generator': '不用背语法，自然语言生成公式',
              'airsheet-ai-in-spreadsheets': '在协作表格中用 AI 做分析',
            },
          },
          forms: {
            label: 'Forms',
            tagline: '智能表单与问卷',
            features: {
              'forms-smart-form': '创建更智能的数据收集表单',
              'forms-survey-creator': '发起问卷并导出到表格分析',
            },
          },
          dbsheet: {
            label: 'DBSheet',
            tagline: '多维表 + AI',
            features: {
              'dbsheet-ai-table-generator': '用一句话生成结构化表格',
              'dbsheet-ai-in-spreadsheets': '在多维表工作流中使用 AI',
            },
          },
        },
        expandLabel: '展开全部',
        collapseLabel: '收起',
        browseAllLabel: '查看全部 AI 功能',
        explorePillarCta: '查看 {app} AI 功能',
        coreTabsAriaLabel: '四大核心组件',
        homeCrumb: '首页',
        pageCrumb: 'AI 功能',
        pageBadge: 'AI 功能目录',
        pageTitle: '覆盖每个 WPS 应用的 AI 功能',
        pageDesc:
          'Copilot、文字、表格、演示、PDF、Photos、AirPage、AirSheet、Forms、DBSheet 的官方落地页，按应用分组浏览。',
        itemCountLabel: '共 {count} 条官方链接',
        externalHint: '以下链接将在新标签页打开 WPS 国际站官方功能页。',
        tabsAriaLabel: 'AI 功能分类',
        seoTitle: 'WPS AI 功能目录 — 官方能力落地页 | WPS Office',
        seoDescription:
          '浏览 WPS AI 官方功能页：Copilot、文字、表格、演示、PDF、Photos 等，外链至 WPS 国际站 AI 落地页。',
        tabs: {
          copilot: 'Copilot',
          writer: 'Writer',
          spreadsheet: 'Spreadsheet',
          presentation: 'Presentation',
          pdf: 'PDF',
          photos: 'Photos',
          airpage: 'AirPage',
          airsheet: 'AirSheet',
          forms: 'Forms',
          dbsheet: 'DBSheet',
        },
        groups: {
          copilot: 'Office Copilot',
          writer: 'Writer（文字）',
          spreadsheet: 'Spreadsheet（表格）',
          presentation: 'Presentation（演示）',
          pdf: 'PDF',
          photos: 'Photos / 视觉 AI',
          airpage: 'AirPage（在线文档）',
          airsheet: 'AirSheet（在线表格）',
          forms: 'Forms（表单）',
          dbsheet: 'DBSheet（多维表）',
        },
        notes: {
          copilotNote:
            '套件级 AI 入口，不绑定单一组件。可由此打开 Office Copilot 与 AIPal，覆盖整个办公套件。',
          spreadsheetClientNote:
            '公式助手、Sheet Assistant、=WPSAI() 无独立落地页，请在客户端 Spreadsheet → WPS AI 使用。',
          airpageNote:
            'AirPage 在线协作文档内嵌 WPS AI：起草、改写、摘要与翻译等。',
          airsheetNote:
            'AirSheet 为在线协作表格层，可搭配 Excel Online 与 Spreadsheet AI 能力。',
          formsNote:
            'Smart Form / 问卷收集数据，可导出到 Spreadsheet 做进一步分析。',
          dbsheetNote:
            'DBSheet（多维表）英文专项 AI 落地页有限，暂列相关 AI 建表 / Copilot 入口。',
        },
        items: {
          'wps-ai-copilot-hub': 'WPS AI · Office Copilot',
          aipal: 'AIPal（网页 Copilot）',
          'ai-writer': 'AI Writer',
          'ai-writer-feature': 'AI Writer（功能页）',
          'ai-text-generator': 'AI Text Generator / Smart Create · Edit',
          'ai-summarizer': 'AI Summarizer',
          'ai-improve-writing': 'AI Improve Writing',
          'ai-spell-check': 'AI Spell Check',
          'ai-spell-check-alt': 'AI Spell Check（备用）',
          'spell-check-feature': 'Spell Check（功能页）',
          'grammar-checker': 'Grammar Checker',
          'ai-translator': 'AI Translator',
          'ai-translator-feature': 'AI Translator（功能页）',
          'document-translator': 'Document Translator',
          'ai-document-translator': 'AI Document Translator',
          'extract-text-with-ai': 'Extract Text with AI（OCR）',
          'data-analyst': 'Data Analyst（Copilot 总页）',
          'ai-in-excel-spreadsheets': 'AI in Excel / Spreadsheets',
          'ai-excel-formula-generator': 'AI Excel Formula Generator',
          'ai-table-generator': 'AI Table Generator',
          'jpg-to-excel': 'JPG to Excel（AI OCR 抽表）',
          'ai-powerpoint-generator': 'AI PowerPoint Generator',
          'ai-ppt-maker': 'AI PPT Maker',
          'free-presentation-maker': 'Free Presentation Maker（含 AI）',
          'ai-translate-powerpoint': 'AI Translate PowerPoint',
          'slides-translator': 'AI Slides Translator',
          'slides-designer': 'Slides Designer（总页）',
          'chat-with-pdf': 'Chat with PDF',
          'chat-pdf-feature': 'Chat PDF（功能页）',
          'ai-pdf-summarizer': 'AI PDF Summarizer',
          'pdf-summarizer-feature': 'PDF Summarizer（功能页）',
          'ai-translate-pdf': 'AI Translate PDF',
          'pdf-document-translation': 'PDF Document Translation（保版式）',
          'translate-scanned-pdf': 'Translate Scanned PDF',
          'pdf-ocr': 'PDF OCR',
          'pdf-ocr-feature': 'PDF OCR（功能页）',
          'convert-scanned-pdf-to-word': 'Convert Scanned PDF to Word',
          'pdf-reader-extension': 'PDF Reader Extension（AI 摘要/翻译）',
          'pdf-reader-extension-feature': 'PDF Reader Extension（功能页）',
          'chrome-pdf-extension': 'Chrome PDF 扩展（含 AI 摘要/对照译）',
          'ai-photo-editor': 'AI Photo Editor',
          'ai-photo-editor-alt': 'AI Photo Editor（photo 路径）',
          'ai-photo-editor-feature': 'AI Photo Editor（功能页）',
          'ai-background-remover': 'AI Background Remover',
          'ai-background-remover-feature': 'AI Background Remover（功能页）',
          'ai-photo-enhancer': 'AI Photo Enhancer',
          'photo-enhancer-feature': 'Photo Enhancer（功能页）',
          'ai-image-upscaler': 'AI Image Upscaler',
          'image-upscaler-feature': 'Image Upscaler（功能页）',
          'ai-photo-restoration': 'AI Photo Restoration',
          'ai-photo-restoration-feature': 'AI Photo Restoration（功能页）',
          'ai-remove-object': 'AI Remove Object',
          'magic-eraser': 'Magic Eraser',
          'ai-remove-text': 'AI Remove Text from Image',
          'extract-text-from-image': 'Extract Text from Image（OCR）',
          'image-watermark-remover': 'Image Watermark Remover',
          'airpage-online-document-editor': 'Online Document Editor（含 AI 协作）',
          'airpage-word-online': 'Word Online（实时协作）',
          'airpage-ai-writer': 'AI Writer（AirPage 场景）',
          'airpage-ai-writer-feature': 'AI Writer（功能页）',
          'airpage-ai-text-generator': 'AI Text Generator',
          'airpage-ai-summarizer': 'AI Summarizer',
          'airpage-ai-improve-writing': 'AI Improve Writing / 改写',
          'airpage-ai-spell-check': 'AI Spell Check',
          'airpage-grammar-checker': 'Grammar Checker',
          'airpage-ai-translator': 'AI Translator',
          'airpage-ai-translator-feature': 'AI Translator（功能页）',
          'airsheet-excel-online': 'Excel Online（AirSheet 协作）',
          'airsheet-online-excel-editor': 'Online Excel Sheet Editor',
          'airsheet-ai-in-spreadsheets': 'AI in Excel / Spreadsheets',
          'airsheet-ai-formula-generator': 'AI Excel Formula Generator',
          'airsheet-ai-table-generator': 'AI Table Generator',
          'airsheet-jpg-to-excel': 'JPG to Excel（AI OCR 抽表）',
          'airsheet-data-analyst': 'Data Analyst（Copilot 总页）',
          'forms-online-form-builder': 'Online Form Builder',
          'forms-smart-form': 'Smart Form',
          'forms-survey-creator': 'Survey Creator',
          'forms-google-forms-alt': 'WPS Forms（Google Forms 替代）',
          'forms-fillable-forms': 'Free File Fillable Forms',
          'forms-create-fillable': 'Create Fillable Form',
          'dbsheet-ai-table-generator': 'AI Table Generator',
          'dbsheet-ai-in-spreadsheets': 'AI in Excel / Spreadsheets',
          'dbsheet-excel-online': 'Excel Online（数据协作）',
          'dbsheet-copilot': 'WPS AI · Office Copilot',
          'dbsheet-aipal': 'AIPal（网页 Copilot）',
        },
      },
      updatedLabel: '更新于',
      updatedDate: '2026 年 7 月',
      trustBarLabel: '全球信赖',
      trustBar: {
        brands: [
          'UNESCO',
          'FICCI',
          'AWS',
          'G2',
          'CNET',
          'Trustpilot',
          'TechRadar',
          'Forbes',
        ],
      },
      aboutTitle: '关于 WPS',
      aboutText:
        'WPS Office 与 WPS AI 由金山办公（WPS / Kingsoft Office）提供，覆盖文档、表格、演示与 PDF，支持桌面端、移动端与网页端免费使用入口。',
      aboutLinkLabel: '产品百科',
      intentLinksTitle: '热门 WPS 主题',
      intentLinksSub: '前往下载、在线使用与 PDF 等高意图页面。',
      intentLinks: {
        download: {
          label: '下载 WPS Office',
          desc: '免费下载电脑版、Mac、Linux 与移动端',
        },
        online: {
          label: 'WPS 在线',
          desc: '在浏览器中使用 WPS Office 工具',
        },
        pdf: {
          label: 'WPS PDF',
          desc: '编辑、转换与管理 PDF 文件',
        },
        'pdf-to-word': {
          label: 'PDF 转 Word',
          desc: '将 PDF 转为可编辑的 Word 文档',
        },
      },
      compareTitle: 'WPS Office 对比 Microsoft 365、Google Workspace、Notion 与 Adobe',
      compareSub: '面向办公套件、AI 工作区与 PDF/创意工具的简要事实表，依据各产品公开的产品页与定价页整理。',
      compareColumns: ['wps', 'microsoft', 'google', 'notion', 'adobe'],
      compareHeaders: {
        feature: '对比项',
        wps: 'WPS Office / WPS AI',
        microsoft: 'Microsoft 365',
        google: 'Google Workspace',
        notion: 'Notion',
        adobe: 'Adobe',
      },
      compareRows: [
        {
          feature: '主要品类',
          wps: '免费一体化办公套件（文字、表格、演示、PDF）',
          microsoft: '办公生产力套件（Word、Excel、PowerPoint 等）',
          google: '云端办公套件（Docs、Sheets、Slides 及 Workspace 服务）',
          notion: 'AI 工作区（文档、知识库、数据库、Agent）',
          adobe: 'PDF 与创意文档工具（Acrobat、Creative Cloud）',
        },
        {
          feature: '免费开始',
          wps: '提供免费 Standard 计划与免费下载；高级 PDF/AI 与更大云空间为付费能力',
          microsoft: '提供免费网页版应用；完整桌面应用需付费 Microsoft 365 方案',
          google: '个人版 Docs/Sheets/Slides 可免费使用；Google Workspace 商业方案付费',
          notion: '个人可使用免费计划；团队与高级能力需付费计划',
          adobe: '提供免费 Acrobat Reader / 有限免费工具；Acrobat Pro 与 Creative Cloud 付费',
        },
        {
          feature: '电脑桌面端',
          wps: '提供 Windows、Mac、Linux 桌面应用',
          microsoft: '付费方案提供 Windows、Mac 桌面应用',
          google: '以浏览器为主；离线/桌面选项有限',
          notion: '提供 Windows、Mac 桌面应用，以及网页与移动端',
          adobe: '提供 Windows、Mac 桌面应用（Acrobat、Creative Cloud）',
        },
        {
          feature: '文字 / 表格 / 演示',
          wps: '文字、表格、演示',
          microsoft: 'Word、Excel、PowerPoint',
          google: 'Docs、Sheets、Slides',
          notion: '文档、数据库与知识库页面 — 非传统 Office 三件套',
          adobe: '非完整 Word / Excel / PowerPoint 套件',
        },
        {
          feature: 'PDF 编辑',
          wps: '内置 WPS PDF；免费档为基础 PDF，高级编辑/转换（含 PDF 转 Word）在付费方案',
          microsoft: 'PDF 能力因 Microsoft 365 应用与套餐而异',
          google: '原生 PDF 编辑有限；部分 Workspace 方案提供 PDF 相关能力（如电子签名）',
          notion: '支持导入导出；无 Acrobat 类专用 PDF 编辑器',
          adobe: 'Acrobat — 编辑、签名，以及 PDF 与 Word/Excel/PowerPoint 互转',
        },
        {
          feature: 'AI 辅助',
          wps: 'WPS AI 覆盖办公应用（额度视套餐）',
          microsoft: 'Copilot / AI 能力（视套餐）',
          google: 'Workspace 应用中的 Gemini 能力（视套餐）',
          notion: 'Notion AI 与 Agent（视套餐）',
          adobe: 'Acrobat AI Assistant 与 Firefly 相关能力（视套餐）',
        },
      ],
      compareDisclaimer:
        '本表仅供信息参考，依据各产品公开的产品页与定价页整理。第三方产品名称为其各自权利人的商标。功能、价格与可用性因套餐、平台和地区而异。最后更新：2026 年 7 月。',
      // Key facts: 可验证属性
      keyFactsTitle: '关键事实',
      mediaProofTitle: '专家信赖，用户验证',
      mediaProofSummary:
        '从手工劳作到智能创作 —— WPS 软件是你每项任务的协同助手。',
      mediaProofTabs: {
        kol: { name: 'KOL 视频', desc: '创作者怎么说' },
        pr: { name: '媒体评测', desc: '科技媒体与行业评价' },
        g2: { name: 'G2 用户', desc: '真实用户反馈' },
      },
      keyFacts: [
        {
          title: '免费下载与 WPS 在线',
          desc: '可免费下载 WPS Office 到 Windows PC、Mac、Linux、Android 与 iOS，也可在浏览器使用 WPS 在线版，无需安装。',
        },
        {
          title: '兼容 Microsoft Office 格式',
          desc: '可打开并编辑常见 DOC/DOCX、XLS/XLSX、PPT/PPTX 与 PDF 等 Word、Excel、PowerPoint 常用格式。',
        },
        {
          title: 'WPS PDF 与 PDF 转 Word',
          desc: 'WPS PDF 支持 PDF 编辑、PDF 转 Word，以及转换、压缩等常见 PDF 工作流。',
        },
        {
          title: '20 种语言',
          desc: 'WPS Office 提供 20 种语言本地化，面向多地区用户与团队。',
        },
      ],
      // FAQ: 只回答检索型问题（定义在 Entity）
      faqTitle: '常见问题',
      faqs: [
        {
          question: '如何免费下载 WPS Office 电脑版？',
          answer:
            '打开「下载 WPS Office」页面，选择 Windows PC、Mac 或 Linux 即可获取免费安装包，内含文字、表格、演示与 PDF 工具。Android、iOS 可在同页或应用商店下载，无需绑卡即可开始使用。',
        },
        {
          question: '能否在线使用 Word、Excel、PowerPoint（WPS 在线版）？',
          answer:
            '可以。WPS Office 在线版（WPS web）在浏览器中即可使用，无需安装。可在线创建和编辑文档、表格与演示，登录后与电脑版、手机版同步，支持云端或本地上传打开文件。',
        },
        {
          question: 'WPS 怎么把 PDF 转成 Word？',
          answer:
            '用 WPS PDF 打开 PDF，选择「转换 → PDF 转 Word」，即可得到可在 WPS 文字中编辑的 DOCX。WPS PDF 还支持编辑 PDF、合并、压缩、签名等常见 PDF 操作。',
        },
        {
          question: 'WPS Office 能打开 Microsoft Word、Excel、PPT 文件吗？',
          answer:
            '可以。WPS 文字、表格、演示支持 DOC、DOCX、XLS、XLSX、PPT、PPTX 等常见 Microsoft Office 格式，可直接处理来自 Word、Excel、PowerPoint 的文件。',
        },
        {
          question: 'WPS Office 是免费的吗？',
          answer:
            '是的。WPS Office 可在 PC、Mac、Linux、移动端与网页端免费下载和使用，核心文档、表格、演示与 PDF 功能均免费。若需更高 AI 额度、云空间或 premium 模板，可选购 WPS 365 付费方案。',
        },
      ],
      seoTitle: 'WPS Office 免费下载 — WPS AI 在线办公 | PC 版与在线版',
      seoDescription:
        '免费下载 WPS Office，内置 WPS AI（Office Copilot）：覆盖 Writer、Spreadsheet、Presentation、PDF 与 Photos，支持 Windows、Mac、Linux 与移动端。',
    },
    footer: {
      products: '产品',
      company: '公司',
      support: '支持',
      followUs: '关注我们',
    },
    download: {
      title: '下载 WPS Office',
      desc: '为您的桌面和移动设备获取终极办公套件。',
      heroTitle: '免费下载 WPS Office，支持 Windows、Mac、Linux、Android 和 iOS',
      heroDesc:
        '下载适用于桌面端和移动端的最新版 WPS Office 安装包，兼容 Microsoft Office 格式，随时随地流畅编辑文档。',
      latestVersionNote: '最新版本：2026.05 | 更新于：2026 年 5 月',
      suiteDesc:
        '我们的办公套件包含文档、表格、演示与 PDF 工具，覆盖文档编辑、数据处理和 PDF 管理等核心场景，支持商务、教育和家庭常见格式。',
      desktopVersions: '桌面版本',
      mobileApps: '移动应用',
      pdfToolkit: 'PDF 工具包',
      updateNote:
        '每次更新都可获得更现代的界面、更出色的性能，以及更贴合工作流的个性化工具。',
      worldwideCta: '想切换到你的语言？前往全球站点',
      pdfToolkitDesc: 'WPS PDF 工具包提供阅读、编辑、转换、签名等高频能力，满足常见 PDF 处理需求。',
      faq: '常见问题',
    },
    pricing: {
      title: '简单透明的定价',
      desc: '选择最适合您需求的计划。所有计划均包含核心办公应用。',
      billedAnnually: '按年计费',
      billedMonthly: '按月计费',
      compareFeatures: '功能对比',
    },
    guides: {
      title: 'WPS 指南与教程',
      desc: '通过分步指南、技巧和最佳实践掌握 WPS Office。',
      readGuide: '阅读指南',
      minRead: '分钟阅读',
      backToGuides: '← 返回所有指南',
      tableOfContents: '目录',
      relatedGuides: '相关指南',
      allGuides: '所有指南',
    },
    templates: {
      libraryTitle: '模板库',
      libraryDesc: '满足各种需求的免费模板',
      allTemplatesTitle: '浏览全部模板',
      allTemplatesDesc: '发现适用于简历、演示文稿、电子表格等场景的免费即用模板。',
      categories: '分类',
      backToLibrary: '← 返回模板库',
      useThisTemplate: '使用此模板',
      preview: '预览',
      features: '特性',
      pages: '页',
      slides: '幻灯片',
      sheet: '表',
      sheets: '表',
      free: '免费',
    },
    allProducts: {
      title: '所有产品与工具',
      desc: '探索我们完整的 AI 驱动办公工具套件。',
      catalogBadge: '产品目录',
      viewByCategory: '按分类查看',
      viewAZ: '按 A-Z 查看',
    },
    worldwide: {
      badge: '全球语言地图',
      title: 'wps.ai 全球',
      desc: 'wps.ai 在多个国家和地区可用。请在下方选择您的语言偏好。',
      allLanguages: '所有语言',
    },
    toolDemo: {
      tryItOut: '试用一下',
      uploadFile: '上传文件以查看',
      inAction: '的实际效果。',
      dropFiles: '将文件拖放到此处',
      orClick: '或点击浏览',
      supportedFormats: '支持的格式：PDF, DOCX, PPTX, XLSX (最大 10MB)',
      howItWorks: '工作原理',
      step1: '第 1 步：打开您的文件',
      step1Desc: '将您的文档安全地上传到我们的云处理引擎。',
      step2: '第 2 步：上传并配置',
      step2Desc: '选择所需的输出格式和质量设置。',
      step3: '第 3 步：下载您的结果',
      step3Desc: '立即获取处理后的文件，随时可以分享或打印。',
      readyToTry: '准备好尝试了吗？',
      getStarted: '免费开始。无需信用卡。',
      startFree: '免费开始',
    },
    blog: {
      heroTitle: 'WPS 官方博客',
      heroDesc: '关于 AI 驱动的生产力、产品发布以及团队如何使用 WPS 更智能地工作的故事。',
      searchPlaceholder: '搜索文章...',
      featured: '精选',
      moreNews: '更多新闻',
      noResults: '未找到结果。',
      followUs: '关注我们',
      share: '分享',
      copied: '已复制！',
      tags: '标签：',
      relatedPosts: '相关文章',
      backToBlog: '← 返回博客',
    }
  }
}

const uiTextFallbackMap = {
  es: 'en',
  de: 'en',
  fr: 'en',
  ja: 'en',
  ko: 'en',
  pt: 'en',
  ar: 'en',
  it: 'en',
  nl: 'en',
  pl: 'en',
  tr: 'en',
  id: 'en',
  th: 'en',
  vi: 'en',
  ms: 'en',
  'zh-tw': 'zh',
  ru: 'en',
}

Object.entries(uiTextFallbackMap).forEach(([language, fallbackLanguage]) => {
  if (!uiTextByLanguage[language] && uiTextByLanguage[fallbackLanguage]) {
    uiTextByLanguage[language] = uiTextByLanguage[fallbackLanguage]
  }
})
