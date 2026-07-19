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
        title: 'WPS Copilot',
        summary: 'Your suite-wide Office Copilot',
        pillars: {
          copilot: {
            label: 'Copilot',
            tagline: 'Your suite-wide Office Copilot',
            suiteAppsLabel: 'Writer · Spreadsheet · Presentation · PDF',
            hubLinkId: 'wps-ai-copilot-hub',
            spotlightLead:
              'One AI assistant across Writer, Spreadsheet, Presentation, and PDF — draft, analyze, present, and read without switching apps.',
            featureItems: [
              {
                id: 'copilot-ai-writing',
                label: 'AI Writing',
                description:
                  'Instant drafts and tone switching — semantic polish and rewrite in Writer.',
              },
              {
                id: 'copilot-slide-designer',
                label: 'Slide Designer',
                description:
                  'One-click PPT generation with automated slide layouts in Presentation.',
              },
              {
                id: 'copilot-data-analyst',
                label: 'Data Analyst',
                description:
                  'Chat with your spreadsheets — formula assistance and insights in Sheets.',
              },
              {
                id: 'copilot-pdf-ai-reader',
                label: 'PDF AI Reader',
                description:
                  'Inquire long PDF documents — AI-powered insight extraction via Chat PDF.',
              },
            ],
            features: {
              'wps-ai-copilot-hub': 'AI Writing, Slide Designer, PDF AI Reader, and more',
              aipal: 'AIPal web Copilot entry point',
            },
            featureDetails: {
              'wps-ai-copilot-hub':
                'Meet your next Office Copilot — instant drafts, one-click PPT generation, spreadsheet analysis, and Chat PDF in one suite-wide workflow.',
              aipal:
                'Open AIPal in the browser for web-based Copilot access when you are away from the desktop app.',
            },
          },
          docs: {
            label: 'Docs',
            tagline: 'Write and rewrite smarter',
            spotlightLead:
              'WPS AI inside [WPS Writer](https://www.wps.com/office/writer/) helps you draft from a blank page, rewrite tone and clarity, and [summarize long documents](https://www.wps.com/feature/ai-summarizer/) — all without leaving your doc.',
            features: {
              'ai-writer': 'Generate drafts and polish tone with AI Writer',
              'ai-summarizer': 'Summarize long documents in one click',
            },
            featureDetails: {
              'ai-writer':
                'Generate essays, blogs, and business copy up to 10× faster. [AI Writer](https://www.wps.com/feature/ai-writer/) includes grammar checking and ChatGPT-powered drafting inside Word.',
              'ai-summarizer':
                'Turn reports, contracts, and research into concise summaries with [AI Summarizer](https://www.wps.com/feature/ai-summarizer/) — keep the key points and skip the manual read-through.',
            },
          },
          sheets: {
            label: 'Sheets',
            tagline: 'Analyze data with less manual work',
            spotlightLead:
              '[WPS Spreadsheet](https://www.wps.com/office/spreadsheet/) AI turns plain-language questions into formulas, insights, and tables — so you spend less time on syntax and more on decisions across desktop and web.',
            features: {
              'ai-excel-formula-generator': 'Build formulas from plain language',
              'ai-in-excel-spreadsheets': 'Ask questions and get insights from your data',
            },
            featureDetails: {
              'ai-excel-formula-generator':
                'Describe what you need in everyday language and get accurate Excel formulas instantly with the [AI Excel Formula Generator](https://www.wps.com/feature/ai-excel-formula-generator/) — fewer errors, no formula memorization.',
              'ai-in-excel-spreadsheets':
                'Ask questions about your data in natural language and get AI-driven insights with [AI in Excel Spreadsheets](https://www.wps.com/feature/ai-in-excel-spreadsheets/) right inside your sheet.',
            },
          },
          slides: {
            label: 'Slides',
            tagline: 'Create presentations faster',
            spotlightLead:
              '[WPS Presentation](https://www.wps.com/office/presentation/) AI turns outlines, topics, and briefs into polished slide decks — layout, structure, and copy included, ready to present or export.',
            features: {
              'ai-ppt-maker': 'Turn an outline into a polished deck',
              'ai-powerpoint-generator': 'Generate slides from a topic or brief',
            },
            featureDetails: {
              'ai-ppt-maker':
                'Paste an outline or bullet list and let [AI PPT Maker](https://www.wps.com/feature/ai-ppt-maker/) build a complete, well-structured presentation you can refine slide by slide.',
              'ai-powerpoint-generator':
                'Start from a topic, prompt, or brief and generate professional slides in seconds with the [AI PowerPoint Generator](https://explore.wps.com/ppt/ai-powerpoint-generator) — compatible with PowerPoint workflows.',
            },
          },
          pdf: {
            label: 'PDF',
            tagline: 'Read, chat, and summarize PDFs',
            spotlightLead:
              '[WPS PDF](https://www.wps.com/office/pdf/) AI lets you chat with documents, pull answers with source proof, and [summarize long reports](https://explore.wps.com/pdf/ai-pdf-summarizer) — securely inside WPS, without switching apps.',
            features: {
              'chat-with-pdf': 'Chat with PDFs to find answers instantly',
              'ai-pdf-summarizer': 'Summarize reports without reading every page',
            },
            featureDetails: {
              'chat-with-pdf':
                'Ask questions about any PDF and get instant answers with [Chat with PDF](https://explore.wps.com/pdf/chat-with-pdf) — clickable source references for manuals, papers, and contracts.',
              'ai-pdf-summarizer':
                'Summarize lengthy PDFs in seconds with the [AI PDF Summarizer](https://explore.wps.com/pdf/ai-pdf-summarizer) — no need to scroll every page yourself.',
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
        mobileTabsCloseLabel: 'Close app menu',
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
      intentLinksSub:
        'Start with the online office, AI, and PDF tools WPS users explore most.',
      intentLinks: {
        'pdf-extension': {
          label: 'PDF Extension for Chrome',
          desc: 'Read PDFs in Chrome with AI summary, translation, and Chat PDF — highlight, annotate, and ask questions in the browser.',
        },
        'wps-office-web': {
          label: 'WPS Office Web',
          desc: 'Edit Word, Excel, PowerPoint, and PDF online in your browser — no install, synced across your devices.',
        },
        'wps-ai-ppt': {
          label: 'WPS AI PPT & Slides',
          desc: 'Turn a topic, brief, or outline into polished slides — AI presentation maker for decks in seconds.',
        },
        'pdf-to-word': {
          label: 'PDF to Word Online',
          desc: 'Convert PDF to editable Word online — drag, upload, convert, and download DOCX free.',
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
      keyFactsTitle: 'WPS at a glance',
      mediaProofTitle: 'Trusted by Experts & Proven by Users',
      mediaProofSummary:
        'Experience the shift from manual labor to intelligent creation. WPS software is your co-pilot for every task.',
      mediaProofTabs: {
        kol: { name: 'KOL Videos', desc: 'What creators are saying' },
        pr: { name: 'PR&Media', desc: 'Tech press and industry reviews' },
        g2: { name: 'G2 Users', desc: 'Real feedback from daily users' },
      },
      keyFacts: [
        {
          title: '600 million monthly active users',
          desc:
            'Trusted by [600 million monthly active users](https://www.wps.com/about-us/) worldwide. Kingsoft Office reported [672 million global monthly active devices](https://ir.kingsoft.com/) for WPS Office as of March 2026.',
        },
        {
          title: '220+ countries & regions',
          desc:
            'WPS Office reaches [220+ countries and regions](https://www.wps.com/about-us/) — ranked #1 in more than 21 countries on major app stores.',
        },
        {
          title: '46 languages supported',
          desc:
            'The suite supports [46 languages](https://www.wps.com/about-us/) — localized Writer, Spreadsheet, Presentation, and PDF for global teams and individuals.',
        },
        {
          title: '200,000+ enterprise customers',
          desc:
            '[200,000+ leading enterprises](https://www.wps.com/about-us/) worldwide trust and use WPS — alongside [500M+ users](https://www.wps.com/download/) on the free download page.',
        },
      ],
      // FAQ: query-shaped answers grouped by SEO topic (definition lives in Entity)
      faqTitle: 'Frequently asked questions',
      faqTopics: {
        download: {
          label: 'Download & install',
          desc: 'WPS Office download for PC, Mac, Linux, and mobile',
          faqs: [
            {
              question: 'How do I download WPS Office for PC?',
              answer:
                'On the official [WPS Office download page](https://www.wps.com/download/), click Free Download under Windows to get the PC installer for Windows 11, 10, or 8. Run the file to install Writer, Spreadsheets, Presentation, and PDF in one suite. Mac (Apple Silicon M1–M4 and Intel) and Linux (.deb / .rpm for Ubuntu, CentOS, and Deepin) use the same page.',
            },
            {
              question: 'Is WPS Office free to download?',
              answer:
                'Yes. [WPS Standard](https://www.wps.com/pricing/) is free to download with no credit card required. You get the core Writer, Spreadsheet, Presentation, and PDF apps, 1 GB WPS Cloud space, basic PDF features, and support for 47 file formats in 46 languages. [WPS Pro+](https://www.wps.com/pricing/) is optional for advanced PDF conversion, more cloud storage, and higher AI limits.',
            },
            {
              question: 'Where can I download WPS Office for Windows 10 or Windows 11?',
              answer:
                'Use the [WPS download center](https://www.wps.com/download/) and choose the Windows Free Download button — WPS lists Windows 11/10/8 support on that page. Save the installer, double-click to run it, and finish setup. After install, sign in with your WPS account to turn on [File Roaming](https://help.wps.com/articles/file-roaming-wps-cloud) and cloud sync.',
            },
            {
              question: 'Does WPS Office have an offline installer?',
              answer:
                'Yes. The Windows, Mac, and Linux files from the [WPS download center](https://www.wps.com/download/) are full desktop installers you can save and run locally without staying online during setup. After installation, sign in to sync files through [WPS Cloud](https://drive.wps.com/); core editing still works offline on desktop.',
            },
            {
              question: 'How do I download the WPS Office app (APK) for Android or iOS?',
              answer:
                'On the [WPS download page](https://www.wps.com/download/), use the Android or iPhone/iPad sections, or install “WPS Office” from Google Play or the App Store. The mobile app opens Word, Excel, PowerPoint, and PDF files and syncs with desktop and [WPS online](https://drive.wps.com/) when you sign in with the same WPS account.',
            },
          ],
        },
        online: {
          label: 'WPS online',
          desc: 'Word, Excel, and PowerPoint online in your browser',
          faqs: [
            {
              question: 'Can I use Word online free with WPS Office?',
              answer:
                'Yes. Sign in to your WPS account and open [WPS online office](https://drive.wps.com/) to create and edit Word documents without installing desktop apps — the same flow people search as “word online” or “word online free.” Save to WPS Cloud or download as DOCX when finished.',
            },
            {
              question: 'Is Excel online available in WPS Office?',
              answer:
                'Yes. [WPS Spreadsheet](https://www.wps.com/office/spreadsheet/) runs in the browser through [WPS online office](https://drive.wps.com/) after you sign in. Open or upload XLSX/XLS files, edit formulas and tables online, and sync with the WPS Office app on PC or mobile via WPS Cloud.',
            },
            {
              question: 'Can I use PowerPoint online without installing WPS?',
              answer:
                'Yes. Use WPS Presentation in [WPS online office](https://drive.wps.com/) in your browser to build and edit PPTX slides without a desktop install — similar to “powerpoint online” or “ppt online” workflows. Sign in so decks sync to WPS Cloud and your other devices.',
            },
            {
              question: 'What is WPS Office online (WPS web)?',
              answer:
                'WPS Office online (WPS web / WPS 365 online) is Kingsoft’s browser-based office suite on [WPS Cloud](https://drive.wps.com/): Writer, Spreadsheet, Presentation, and PDF tools in one place, with sync across Web, Windows, Mac, and Android. Upload Office files up to 200 MB and access revision history in the cloud.',
            },
            {
              question: 'Is WPS online free to use?',
              answer:
                'Yes. [WPS Cloud online office](https://drive.wps.com/) is listed as free to use for core browser editing. Sign in with your WPS account to save and sync files; optional [WPS Pro+](https://www.wps.com/pricing/) adds more cloud space (20 GB vs 1 GB on the free Standard plan) and advanced PDF/AI features.',
            },
          ],
        },
        pdf: {
          label: 'WPS PDF',
          desc: 'PDF to Word, PDF editor, Word to PDF, JPG convert',
          faqs: [
            {
              question: 'How do I convert PDF to Word in WPS Office?',
              answer:
                'Desktop: open the PDF in WPS Office → Tools tab → PDF to Word → set page range and language → click Start ([WPS Academy guide](https://www.wps.com/academy/quickly-convert-pdf-to-editable-word-in-wps-office-quick-tutorials-1863094/)). [WPS Help](https://help.wps.com/articles/pdf-to-word-converter-qanda) notes free conversion for PDFs within 5 pages; longer files may need [WPS Pro+](https://www.wps.com/pricing/). Online: use the [free PDF to Word converter](https://pdf.wps.com/convert-pdf-to-word/) → Select File or drag the PDF → Download the Word file.',
            },
            {
              question: 'What is WPS PDF editor and how do I edit PDF files?',
              answer:
                'WPS PDF is the PDF module built into WPS Office on desktop, mobile, and online. Open a PDF in WPS PDF to read, annotate, and edit text or images; [WPS Pro+](https://www.wps.com/pricing/) adds fuller edit/convert tools (PDF to Word/Excel/PPT, image to PDF, and related converters).',
            },
            {
              question: 'How do I convert Word to PDF in WPS?',
              answer:
                'In WPS Writer, click Menu → Export to PDF ([step-by-step guide](https://www.wps.com/academy/wps-writer-save-as-pdf-quick-tutorials-1878874/)). In the dialog, name the file, set the page range, choose a save location, then click Export to PDF. Alternative: Menu → Save as → Other Formats → PDF Format (*.pdf) → Save.',
            },
            {
              question: 'Can WPS convert JPG to Excel or JPG to Word?',
              answer:
                'Yes. On desktop, open WPS Office Home → Productivity Tools → Image to Text (OCR), add your JPG, then choose Convert to Excel ([JPG to Excel feature](https://www.wps.com/feature/jpg-to-excel/) / [OCR guide](https://www.wps.com/academy/convert-image-to-text-wps-guide-quick-tutorials-1898063/)). For text-heavy images, use the same OCR flow, then paste or save into Writer or Spreadsheet.',
            },
            {
              question: 'Can WPS PDF merge, compress, and sign PDF files?',
              answer:
                'Yes. Use WPS PDF on desktop for merge, split, compress, protect, and sign workflows; advanced convert/edit features are included in [WPS Pro+](https://www.wps.com/pricing/). For quick compress online, WPS also lists a free Compress PDF tool on the [download page Online Tools](https://www.wps.com/download/) section.',
            },
          ],
        },
        account: {
          label: 'Login & WPS Cloud',
          desc: 'WPS login, cloud sync, and WPS 365 plans',
          faqs: [
            {
              question: 'How do I log in to WPS Office?',
              answer:
                'In WPS Writer, Spreadsheets, or Presentation, click Sign in at the top right ([WPS Help Center](https://help.wps.com/articles/file-roaming-wps-cloud)). You can also open Office Space → File Roaming → Use Now. Sign in with Google, Facebook, Twitter, or an email-registered WPS account — one login works on desktop, mobile, and [WPS online](https://drive.wps.com/).',
            },
            {
              question: 'What is WPS Cloud and how does file sync work?',
              answer:
                'WPS Cloud stores and syncs your documents online. After you sign in, [File Roaming](https://help.wps.com/articles/file-roaming-wps-cloud) automatically uploads documents you open or edit; view them under Office → File Roaming or on the web at [account.wps.com](https://account.wps.com). For manual control, go to Home → Settings and turn on Cloud Sync ([sync guide](https://www.wps.com/academy/file-sync-in-wps-guide-quick-tutorials-1898105/)).',
            },
            {
              question: 'What is WPS 365 and how is it different from free WPS Office?',
              answer:
                'WPS 365 is Kingsoft’s cloud-connected office experience ([WPS online](https://drive.wps.com/) + sync across devices). Free [WPS Standard](https://www.wps.com/pricing/) includes the desktop/mobile apps and 1 GB cloud. Paid [WPS Pro+](https://www.wps.com/pricing/) (from $5.83/month) adds 20 GB cloud, advanced PDF convert/edit, premium templates, and higher AI daily limits.',
            },
            {
              question: 'Is WPS Office free or do I need a WPS subscription?',
              answer:
                '[WPS Standard](https://www.wps.com/pricing/) is free to download and use for core Writer, Spreadsheet, Presentation, and basic PDF tasks — no credit card required. [WPS Pro+](https://www.wps.com/pricing/) or Sharing Plan is optional when you need multi-page PDF conversion, 20 GB cloud per user, or advanced AI/PDF tools.',
            },
            {
              question: 'How do I install WPS Office after downloading?',
              answer:
                'Windows/Mac/Linux: run the installer from the [WPS download center](https://www.wps.com/download/) and follow the setup wizard. Mobile: install from the store link on the same page. When setup finishes, sign in so [File Roaming](https://help.wps.com/articles/file-roaming-wps-cloud) and WPS Cloud sync start automatically.',
            },
          ],
        },
        compatibility: {
          label: 'Office compatibility',
          desc: 'Microsoft Office files, Writer, Excel, and free alternative',
          faqs: [
            {
              question: 'Is WPS Office a free alternative to Microsoft Office download?',
              answer:
                'Yes. The [free WPS Office download](https://www.wps.com/download/) covers Writer (Word), Spreadsheets (Excel), Presentation (PowerPoint), and PDF in one suite — a common alternative to Microsoft Office free download searches. WPS states full compatibility with Microsoft .docx, .xlsx, and .pptx on its [download FAQ](https://www.wps.com/download/) and [pricing page](https://www.wps.com/pricing/).',
            },
            {
              question: 'Does WPS Office open Microsoft Word, Excel, and PowerPoint files?',
              answer:
                'Yes. The [official WPS download FAQ](https://www.wps.com/download/) confirms you can open, edit, and save Microsoft Office formats including .docx, .xlsx, and .pptx without formatting loss. [WPS pricing](https://www.wps.com/pricing/) also lists “100% Compatible with Microsoft File Formats” for the free Standard plan.',
            },
            {
              question: 'What is WPS Writer (WPS Word)?',
              answer:
                'WPS Writer is the word processor in WPS Office — the app behind “wps office writer” and “wps word” searches. Use it on desktop or in [WPS online](https://drive.wps.com/) to edit DOC/DOCX, [export to PDF](https://www.wps.com/academy/wps-writer-save-as-pdf-quick-tutorials-1878874/), and collaborate through WPS Cloud when signed in.',
            },
            {
              question: 'Does WPS include Excel and spreadsheet tools?',
              answer:
                'Yes. [WPS Spreadsheets](https://www.wps.com/office/spreadsheet/) is the Excel-compatible app (“wps excel”). It opens .xlsx, .xls, and .csv, supports formulas and charts on desktop and [WPS online](https://drive.wps.com/), and connects to PDF to Excel and [JPG to Excel](https://www.wps.com/feature/jpg-to-excel/) tools.',
            },
            {
              question: 'Can WPS replace Microsoft Word, Excel, and PowerPoint for everyday work?',
              answer:
                'For typical documents, spreadsheets, slides, and PDF tasks, WPS Writer, Spreadsheets, Presentation, and WPS PDF match everyday Word/Excel/PowerPoint workflows on PC, Mac, Linux, mobile, and browser — with free [WPS Standard](https://www.wps.com/pricing/) and optional [WPS Pro+](https://www.wps.com/pricing/) upgrades.',
            },
          ],
        },
      },
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
        title: 'WPS Copilot',
        summary: '贯穿整套 Office 的 Copilot',
        pillars: {
          copilot: {
            label: 'Copilot',
            tagline: '贯穿整套 Office 的 Copilot',
            suiteAppsLabel: '文字 · 表格 · 演示 · PDF',
            hubLinkId: 'wps-ai-copilot-hub',
            spotlightLead:
              '一套 AI 助手覆盖文字、表格、演示与 PDF —— 起草、分析、演示与阅读，无需切换应用。',
            featureItems: [
              {
                id: 'copilot-ai-writing',
                label: 'AI 写作',
                description: '即时起草与语气切换 —— 文字中的语义润色与专业改写。',
              },
              {
                id: 'copilot-slide-designer',
                label: '幻灯片设计',
                description: '一键生成 PPT —— 演示中的自动化版式与结构。',
              },
              {
                id: 'copilot-data-analyst',
                label: '数据分析',
                description: '与表格对话 —— 公式助手与 Sheet 内数据洞察。',
              },
              {
                id: 'copilot-pdf-ai-reader',
                label: 'PDF AI 阅读',
                description: '与长 PDF 对话 —— 通过 Chat PDF 提取文档洞察。',
              },
            ],
            features: {
              'wps-ai-copilot-hub': 'AI 写作、幻灯片设计、PDF AI 阅读等 Copilot 能力',
              aipal: 'AIPal 网页版 Copilot 入口',
            },
            featureDetails: {
              'wps-ai-copilot-hub':
                '遇见你的下一代 Office Copilot —— 即时起草、一键 PPT、表格分析与 Chat PDF，套件级一体工作流。',
              aipal: '在浏览器打开 AIPal，离开桌面客户端时也能使用网页版 Copilot。',
            },
          },
          docs: {
            label: '文字',
            tagline: '更聪明地写作与改写',
            spotlightLead:
              '[WPS 文字 Writer](https://www.wps.com/office/writer/) 内置 AI：从空白页起草、改写语气与表达、[一键摘要长文档](https://www.wps.com/feature/ai-summarizer/) —— 全程不离开当前文档。',
            features: {
              'ai-writer': '用 AI Writer 生成初稿并润色语气',
              'ai-summarizer': '一键摘要长文档',
            },
            featureDetails: {
              'ai-writer':
                '用自然语言生成文章、博客与商务文案，速度提升可达 10 倍；[AI Writer](https://www.wps.com/feature/ai-writer/) 内置语法检查与 ChatGPT 级起草能力。',
              'ai-summarizer':
                '将报告、合同与研究材料压缩成精炼摘要，[AI Summarizer](https://www.wps.com/feature/ai-summarizer/) 保留要点，省去通读时间。',
            },
          },
          sheets: {
            label: '表格',
            tagline: '少做手工，多做分析',
            spotlightLead:
              '[WPS 表格 Spreadsheet](https://www.wps.com/office/spreadsheet/) AI 把口语化问题变成公式、洞察与结构化表格 —— 少记语法，多做决策，桌面与网页端均可使用。',
            features: {
              'ai-excel-formula-generator': '用自然语言生成公式',
              'ai-in-excel-spreadsheets': '向数据提问，快速获得洞察',
            },
            featureDetails: {
              'ai-excel-formula-generator':
                '用日常语言描述需求，[AI Excel 公式生成器](https://www.wps.com/feature/ai-excel-formula-generator/) 即时生成准确 Excel 公式，减少出错，无需背诵函数。',
              'ai-in-excel-spreadsheets':
                '用自然语言向表格提问，在 Sheet 内通过 [AI in Excel Spreadsheets](https://www.wps.com/feature/ai-in-excel-spreadsheets/) 直接获得 AI 驱动的分析、摘要与洞察。',
            },
          },
          slides: {
            label: '演示',
            tagline: '更快做出演示文稿',
            spotlightLead:
              '[WPS 演示 Presentation](https://www.wps.com/office/presentation/) AI 可将大纲、主题或简报快速变成结构完整的幻灯片 —— 版式、层次与文案一并生成，可直接演示或导出。',
            features: {
              'ai-ppt-maker': '把大纲变成完整 PPT',
              'ai-powerpoint-generator': '根据主题或简报生成幻灯片',
            },
            featureDetails: {
              'ai-ppt-maker':
                '粘贴大纲或要点列表，[AI PPT Maker](https://www.wps.com/feature/ai-ppt-maker/) 自动生成结构清晰的完整演示，可逐页微调。',
              'ai-powerpoint-generator':
                '从主题、提示词或简报出发，[AI PowerPoint Generator](https://explore.wps.com/ppt/ai-powerpoint-generator) 数秒内生成专业幻灯片，兼容 PowerPoint 工作流。',
            },
          },
          pdf: {
            label: 'PDF',
            tagline: '阅读、对话、摘要 PDF',
            spotlightLead:
              '[WPS PDF](https://www.wps.com/office/pdf/) AI 支持文档对话、带出处引用的问答，以及[长报告摘要](https://explore.wps.com/pdf/ai-pdf-summarizer) —— 在 WPS 内安全完成，无需切换应用。',
            features: {
              'chat-with-pdf': '与 PDF 对话，即时找答案',
              'ai-pdf-summarizer': '无需通读即可摘要报告',
            },
            featureDetails: {
              'chat-with-pdf':
                '对任意 PDF 提问并即时获得答案，[Chat with PDF](https://explore.wps.com/pdf/chat-with-pdf) 附可点击的原文出处 —— 适合手册、论文与合同。',
              'ai-pdf-summarizer':
                '数秒内摘要超长 PDF，[AI PDF Summarizer](https://explore.wps.com/pdf/ai-pdf-summarizer) 支持 AI 分析与移动阅读，无需逐页滚动。',
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
        mobileTabsCloseLabel: '关闭组件菜单',
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
      intentLinksTitle: '热门 WPS 话题',
      intentLinksSub:
        '从用户最常探索的在线办公、AI 与 PDF 工具入手。',
      intentLinks: {
        'pdf-extension': {
          label: 'Chrome PDF 扩展',
          desc: '在 Chrome 中阅读 PDF，支持 AI 摘要、翻译与 Chat PDF —— 高亮批注、浏览器内即时问答。',
        },
        'wps-office-web': {
          label: 'WPS Office 网页版',
          desc: '在浏览器在线编辑 Word、Excel、PPT 与 PDF，无需安装，多端同步。',
        },
        'wps-ai-ppt': {
          label: 'WPS AI PPT 与演示',
          desc: '从主题、简报或大纲生成精美幻灯片 —— AI 演示制作，数秒出稿。',
        },
        'pdf-to-word': {
          label: 'PDF 转 Word 在线',
          desc: '在线将 PDF 转为可编辑 Word —— 拖拽上传、转换并下载 DOCX。',
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
      keyFactsTitle: 'WPS 关键数据',
      mediaProofTitle: '专家信赖 & 用户验证',
      mediaProofSummary:
        '从手工劳作到智能创作 —— WPS 软件是你每项任务的协同助手。',
      mediaProofTabs: {
        kol: { name: 'KOL 视频', desc: '创作者怎么说' },
        pr: { name: '媒体评测', desc: '科技媒体与行业评价' },
        g2: { name: 'G2 用户', desc: '真实用户反馈' },
      },
      keyFacts: [
        {
          title: '6 亿月活跃用户',
          desc:
            '全球 [6 亿月活跃用户](https://www.wps.com/about-us/)。金山办公 2026 年 3 月披露，WPS Office [全球月活跃设备数达 6.72 亿](https://ir.kingsoft.com/)。',
        },
        {
          title: '220+ 国家与地区',
          desc:
            'WPS Office 覆盖 [220+ 国家与地区](https://www.wps.com/about-us/) —— 在主流应用商店超过 21 个国家/地区排名第一。',
        },
        {
          title: '46 种语言',
          desc:
            '套件支持 [46 种语言](https://www.wps.com/about-us/) —— 文字、表格、演示与 PDF 面向全球用户与团队本地化。',
        },
        {
          title: '20 万+ 企业客户',
          desc:
            '全球 [20 万+ 领先企业](https://www.wps.com/about-us/) 信任并使用 WPS —— [免费下载页](https://www.wps.com/download/) 亦标注 5 亿+ 用户规模。',
        },
      ],
      // FAQ: 按 SEO 主题分组，只回答检索型问题（定义在 Entity）
      faqTitle: '常见问题',
      faqTopics: {
        download: {
          label: '下载与安装',
          desc: 'WPS Office 电脑版、Mac 与移动端下载',
          faqs: [
            {
              question: '如何下载 WPS Office 电脑版（PC 版）？',
              answer:
                '打开 [WPS 官方下载页](https://www.wps.com/download/)，在 Windows 区域点击 Free Download 获取适用于 Windows 11/10/8 的安装包。双击运行即可安装文字（Writer）、表格（Spreadsheet）、演示（Presentation）与 PDF 模块。Mac（Apple Silicon M1–M4 与 Intel）及 Linux（Ubuntu/CentOS/Deepin 的 .deb / .rpm）也在同页下载。',
            },
            {
              question: 'WPS Office 可以免费下载吗？',
              answer:
                '可以。[WPS Standard 免费方案](https://www.wps.com/pricing/)无需信用卡，含核心文字/表格/演示/PDF、1 GB WPS 云空间、基础 PDF 与 47 种文件格式、46 种语言。进阶 PDF 转换、20 GB 云空间与更高 AI 额度在 [WPS Pro+](https://www.wps.com/pricing/) 等付费方案中提供。',
            },
            {
              question: 'Windows 10 / Windows 11 在哪里下载 WPS Office？',
              answer:
                '在 [WPS 下载中心](https://www.wps.com/download/) 点击 Windows 的 Free Download。官网标明支持 Windows 11/10/8。保存安装包并运行，按向导完成安装。安装后登录 WPS 账号，即可启用 [文档漫游 File Roaming](https://help.wps.com/articles/file-roaming-wps-cloud) 与云同步。',
            },
            {
              question: 'WPS Office 有离线安装包吗？',
              answer:
                '有。从 [WPS 下载中心](https://www.wps.com/download/) 获取的 Windows/Mac/Linux 安装文件可在本地保存并离线运行安装程序，无需安装过程中保持联网。安装完成后登录账号即可通过 [WPS 云](https://drive.wps.com/) 同步；桌面端核心编辑可离线使用。',
            },
            {
              question: 'Android / iOS 如何下载 WPS Office 应用（APK）？',
              answer:
                '在 [WPS 下载页](https://www.wps.com/download/) 选择 Android 或 iPhone/iPad，或在 Google Play / App Store 搜索「WPS Office」安装。手机版可打开 Word、Excel、PPT 与 PDF，使用同一 WPS 账号登录后与电脑版、[WPS 在线版](https://drive.wps.com/) 同步。',
            },
          ],
        },
        online: {
          label: 'WPS 在线版',
          desc: 'Word / Excel / PPT 在线编辑',
          faqs: [
            {
              question: '能否免费在线使用 Word（WPS 在线版）？',
              answer:
                '可以。登录 WPS 账号后，在浏览器打开 [WPS 在线办公](https://drive.wps.com/) 即可在线编辑 Word 文档，无需安装桌面版，对应「word online」「word online free」等检索。完成后可保存到 WPS 云或下载 DOCX。',
            },
            {
              question: 'WPS 有 Excel 在线版吗？',
              answer:
                '有。登录后在 [WPS 在线办公](https://drive.wps.com/) 中使用 [WPS 表格](https://www.wps.com/office/spreadsheet/)，可在浏览器打开/编辑 XLSX、XLS，编写公式与处理数据，并通过 WPS 云与 PC 或手机版 WPS 同步，覆盖「excel online」「online excel」等场景。',
            },
            {
              question: '能否在线使用 PowerPoint，不安装 WPS？',
              answer:
                '可以。在 [WPS 在线办公](https://drive.wps.com/) 中使用 WPS 演示，在浏览器创建与编辑 PPTX，无需安装桌面程序，类似「powerpoint online」「ppt online」。登录后幻灯片会同步到 WPS 云及其他设备。',
            },
            {
              question: '什么是 WPS Office 在线版（WPS web）？',
              answer:
                'WPS Office 在线版（WPS web / WPS 365 online）是金山浏览器端办公套件，入口为 [WPS Cloud 在线办公](https://drive.wps.com/)，含文字、表格、演示与 PDF，并在 Web、Windows、Mac、Android 间同步。云文档单文件最大支持 200 MB，并保留修订历史。',
            },
            {
              question: 'WPS 在线版免费吗？',
              answer:
                '[WPS Cloud 在线办公](https://drive.wps.com/) 的核心浏览器编辑免费使用。登录 WPS 账号即可保存与同步；若需 20 GB 云空间（免费 Standard 为 1 GB）及进阶 PDF/AI 能力，可选购 [WPS Pro+](https://www.wps.com/pricing/) 等付费方案。',
            },
          ],
        },
        pdf: {
          label: 'WPS PDF',
          desc: 'PDF 转 Word、PDF 编辑、Word 转 PDF',
          faqs: [
            {
              question: 'WPS 怎么把 PDF 转成 Word（pdf to word）？',
              answer:
                '电脑版：在 WPS 中打开 PDF →「工具」选项卡 → PDF 转 Word → 设置页码范围与语言 → 点击「开始」（[WPS Academy 教程](https://www.wps.com/academy/quickly-convert-pdf-to-editable-word-in-wps-office-quick-tutorials-1863094/)）。[WPS 帮助中心](https://help.wps.com/articles/pdf-to-word-converter-qanda) 说明 5 页以内 PDF 可免费转换，更长文档可能需要 [WPS Pro+](https://www.wps.com/pricing/)。在线版：使用 [免费 PDF 转 Word 工具](https://pdf.wps.com/convert-pdf-to-word/) → 选择文件或拖拽上传 → 转换完成后 Download 下载 Word 文件。',
            },
            {
              question: '什么是 WPS PDF 编辑器，如何编辑 PDF？',
              answer:
                'WPS PDF 是 WPS Office 内置 PDF 模块，支持阅读、批注及在支持的方案下编辑文本/图片。[WPS Pro+ 定价页](https://www.wps.com/pricing/) 列出 PDF 转 Word/Excel/PPT、图片转 PDF 等进阶转换与编辑能力；免费 Standard 含基础 PDF 阅读与常用功能。',
            },
            {
              question: 'WPS 如何把 Word 转成 PDF（word to pdf）？',
              answer:
                '在 WPS 文字中：点击「菜单」→「输出为 PDF」（[分步教程](https://www.wps.com/academy/wps-writer-save-as-pdf-quick-tutorials-1878874/)）。在对话框中设置文件名、输出范围与保存路径，点击「输出为 PDF」。也可使用「菜单」→「另存为」→「其他格式」→ 文件类型选「PDF 格式 (*.pdf)」→「保存」。',
            },
            {
              question: 'WPS 能把 JPG 转成 Excel 或 Word 吗？',
              answer:
                '可以。桌面端：打开 WPS 首页 →「效率工具 / Productivity Tools」→「图片转文字（OCR）」→ 添加 JPG → 选择「转为 Excel」提取表格（[JPG 转 Excel 功能页](https://www.wps.com/feature/jpg-to-excel/) / [OCR 教程](https://www.wps.com/academy/convert-image-to-text-wps-guide-quick-tutorials-1898063/)）。文字为主的图片可用同一 OCR 流程提取后再粘贴到文字或表格中。',
            },
            {
              question: 'WPS PDF 能合并、压缩、签名 PDF 吗？',
              answer:
                '可以。在桌面 WPS PDF 中进行合并、拆分、压缩、保护与签名；进阶转换/编辑见 [WPS Pro+ 功能对比](https://www.wps.com/pricing/)。快速在线压缩可使用 [WPS 下载页 Online Tools](https://www.wps.com/download/) 中的 Compress PDF 工具。',
            },
          ],
        },
        account: {
          label: '登录与 WPS 云',
          desc: 'WPS login、云同步与 WPS 365',
          faqs: [
            {
              question: '如何登录 WPS Office（WPS login）？',
              answer:
                '在 WPS 文字、表格或演示右上角点击「登录」（[WPS 帮助中心](https://help.wps.com/articles/file-roaming-wps-cloud)）。也可打开「Office Space / 办公空间」→「文档漫游（File Roaming）」→「立即使用」。支持 Google、Facebook、Twitter 或邮箱注册账号，同一账号可用于桌面、移动与 [WPS 在线版](https://drive.wps.com/)。',
            },
            {
              question: '什么是 WPS 云（WPS Cloud），如何同步文件？',
              answer:
                'WPS 云用于在线存储与跨设备同步。登录后 [文档漫游](https://help.wps.com/articles/file-roaming-wps-cloud) 会自动上传您打开或编辑的文档；可在应用内「Office → File Roaming」或网页 [account.wps.com](https://account.wps.com) 查看。也可在「首页 → 设置」中开启 Cloud Sync（[云同步教程](https://www.wps.com/academy/file-sync-in-wps-guide-quick-tutorials-1898105/)）。',
            },
            {
              question: '什么是 WPS 365，与免费版有何区别？',
              answer:
                'WPS 365 是金山云连接办公体验（[WPS 在线版](https://drive.wps.com/) + 多设备同步）。免费 [WPS Standard](https://www.wps.com/pricing/) 含桌面/移动应用与 1 GB 云空间。付费 [WPS Pro+](https://www.wps.com/pricing/)（定价页约 $5.83/月起）提供 20 GB 云空间、进阶 PDF 转换/编辑、premium 模板与更高 AI 日限额。',
            },
            {
              question: 'WPS Office 免费吗，是否需要订阅？',
              answer:
                '[WPS Standard](https://www.wps.com/pricing/) 可免费下载使用，涵盖日常文字/表格/演示与基础 PDF，无需信用卡。若需多页 PDF 转换、每用户 20 GB 云空间或进阶 AI/PDF 工具，可选购 [WPS Pro+](https://www.wps.com/pricing/) 或 Sharing Plan，非安装与打开文件的必要条件。',
            },
            {
              question: '下载后如何安装 WPS Office？',
              answer:
                'Windows/Mac/Linux：运行 [WPS 下载中心](https://www.wps.com/download/) 的安装包并按向导完成 setup。移动端：通过同页商店链接安装。安装完成后打开任意模块并登录，[文档漫游](https://help.wps.com/articles/file-roaming-wps-cloud) 会在登录后自动启用。',
            },
          ],
        },
        compatibility: {
          label: 'Office 兼容',
          desc: 'Microsoft Office 格式、Writer 与 Excel',
          faqs: [
            {
              question: 'WPS Office 能否替代 Microsoft Office 免费下载？',
              answer:
                '可以。[WPS Office 免费下载](https://www.wps.com/download/) 包含文字（Word）、表格（Excel）、演示（PowerPoint）与 PDF，是常见的 Microsoft Office free download 替代方案。官网 [下载 FAQ](https://www.wps.com/download/) 与 [定价页](https://www.wps.com/pricing/) 均说明与 .docx、.xlsx、.pptx 高度兼容。',
            },
            {
              question: 'WPS Office 能打开 Microsoft Word、Excel、PPT 文件吗？',
              answer:
                '可以。[WPS 官方下载 FAQ](https://www.wps.com/download/) 确认可打开、编辑并保存 .docx、.xlsx、.pptx 等 Microsoft Office 格式且尽量保持版式。[WPS 定价页](https://www.wps.com/pricing/) 的 WPS Standard 亦标注「100% Compatible with Microsoft File Formats」。',
            },
            {
              question: '什么是 WPS Writer（WPS Word）？',
              answer:
                'WPS Writer 是 WPS Office 文字处理应用，对应「wps office writer」「wps word」等检索。可在桌面或 [WPS 在线版](https://drive.wps.com/) 编辑 DOC/DOCX，通过「菜单 → 输出为 PDF」[导出 PDF](https://www.wps.com/academy/wps-writer-save-as-pdf-quick-tutorials-1878874/)，登录 WPS 云后可协作与同步。',
            },
            {
              question: 'WPS 有 Excel / 表格功能吗？',
              answer:
                '有。[WPS 表格 Spreadsheets](https://www.wps.com/office/spreadsheet/) 为 Excel 兼容应用（「wps excel」），支持 .xlsx、.xls、.csv 与公式图表，桌面与 [WPS 在线版](https://drive.wps.com/) 均可使用；并与 [JPG 转 Excel](https://www.wps.com/feature/jpg-to-excel/) 等工具衔接。',
            },
            {
              question: 'WPS 能否替代 Word、Excel、PowerPoint 日常办公？',
              answer:
                '日常文档、表格、演示与 PDF 工作，WPS 文字、表格、演示与 WPS PDF 可覆盖 Word/Excel/PowerPoint 核心场景，支持 PC、Mac、Linux、移动与浏览器，免费 [WPS Standard](https://www.wps.com/pricing/) 可用，进阶能力见 [WPS Pro+](https://www.wps.com/pricing/)。',
            },
          ],
        },
      },
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
