export type ServiceSlug =
  | 'fitout-construction'
  | 'cleaning-services'
  | 'joinery'
  | 'signage';

export interface Service {
  slug: ServiceSlug;
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  /** SEO <title>/description — written for search, not reused from the
   * on-page heading/tagline. Title ~50-60 chars, description ~120-158. */
  seoTitle: { en: string; ar: string };
  seoDescription: { en: string; ar: string };
  /** Longer intro paragraph shown under the hero, before the scope list. */
  intro: { en: string; ar: string };
  scope: { en: string[]; ar: string[] };
  /** Four-step delivery process, in display order. */
  process: { en: string; ar: string }[];
  /** Three trade-specific differentiators. */
  whyPoints: { title: { en: string; ar: string }; body: { en: string; ar: string } }[];
  /** Short FAQ, specific to this trade. */
  faqs: { q: { en: string; ar: string }; a: { en: string; ar: string } }[];
  // No shared imagery field here: per-service imagery is currently owned
  // directly by each consuming page/component (services/index.astro,
  // services/[slug].astro, FeaturedProjects.astro) rather than centralized
  // here. Accepted tradeoff, not a bug — see fix-wave task 3.
}

// The four-step process is the same standard workflow across every trade.
const process: Service['process'] = [
  { en: 'Consultation & site visit', ar: 'استشارة وزيارة الموقع' },
  { en: 'Proposal & quotation', ar: 'العرض الفني وتحديد السعر' },
  { en: 'Execution', ar: 'التنفيذ' },
  { en: 'Handover & support', ar: 'التسليم والمتابعة' },
];

export const services: Service[] = [
  {
    slug: 'fitout-construction',
    title: { en: 'Fitout & Construction', ar: 'التشطيبات والإنشاءات' },
    tagline: {
      en: 'Commercial interiors built to spec and delivered on schedule.',
      ar: 'تشطيبات داخلية تجارية تُنفَّذ وفق المواصفات وتُسلَّم في الموعد المحدد.',
    },
    seoTitle: {
      en: 'Fitout & Construction Services in Oman | Golden Pillar',
      ar: 'خدمات التشطيبات والإنشاءات في عُمان | الركيزة الذهبية',
    },
    seoDescription: {
      en: 'Commercial fitout for offices, retail and F&B spaces across Oman — built to spec, on schedule, with municipal approvals handled in-house.',
      ar: 'تشطيبات تجارية للمكاتب والمحال والمطاعم في مختلف أنحاء عُمان — تنفيذ وفق المواصفات وفي الموعد المحدد، مع متابعة التصاريح البلدية.',
    },
    intro: {
      en: 'From concept to handover, our fitout and construction teams manage every layer of a commercial space — partitioning, flooring, ceilings, and MEP coordination — under one project lead, so nothing falls between trades.',
      ar: 'نتولى مشاريع التشطيبات والإنشاءات التجارية من الفكرة حتى التسليم — الفواصل والأرضيات والأسقف وتنسيق الأعمال الكهروميكانيكية — تحت إشراف مسؤول مشروع واحد، بحيث لا يضيع أي جزء من العمل بين المقاولين.',
    },
    scope: {
      en: [
        'Commercial fitout',
        'Retail fitout',
        'Office fitout',
        'F&B fitout',
        'Renovation & refurbishment',
        'MEP coordination',
      ],
      ar: [
        'تشطيبات تجارية',
        'تشطيبات المحال التجارية',
        'تشطيبات المكاتب',
        'تشطيبات المطاعم والمقاهي',
        'التجديد والترميم',
        'تنسيق الأعمال الكهروميكانيكية',
      ],
    },
    process,
    whyPoints: [
      {
        title: { en: 'Single accountable project lead', ar: 'مسؤول مشروع واحد' },
        body: {
          en: "No chasing separate subcontractors for electrical, partitions, and finishing — one lead tracks all of it.",
          ar: 'لا حاجة لمتابعة مقاولين منفصلين للكهرباء والفواصل والتشطيب — مسؤول واحد يتابع كل شيء.',
        },
      },
      {
        title: { en: 'Approvals handled in-house', ar: 'التصاريح تُدار داخليًا' },
        body: {
          en: 'Municipal permits and civil-defense sign-off are tracked as part of the programme, not an afterthought.',
          ar: 'نتابع تصاريح بلدية مسقط وموافقات الدفاع المدني كجزء من خطة المشروع، لا كخطوة لاحقة.',
        },
      },
      {
        title: { en: "Sequencing around your operating hours", ar: 'جدولة تراعي عملك' },
        body: {
          en: "For premises that can't fully close, disruptive work is scheduled around your business hours.",
          ar: 'نخطط الأعمال حول ساعات عملكم في المواقع التي لا يمكن إغلاقها بالكامل.',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'How long does a typical commercial fitout take?', ar: 'كم تستغرق أعمال التشطيبات التجارية عادة؟' },
        a: {
          en: 'A single retail unit or office floor typically runs 4–8 weeks from approved design to handover; larger multi-floor fitouts are scheduled trade by trade and quoted individually.',
          ar: 'تستغرق تشطيبات المحل الواحد أو طابق المكاتب عادة من 4 إلى 8 أسابيع من اعتماد التصميم حتى التسليم، أما المشاريع الأكبر فتُجدول وتُسعَّر حسب كل مرحلة.',
        },
      },
      {
        q: { en: 'Do you handle municipal permits and approvals?', ar: 'هل تتولون التصاريح والموافقات البلدية؟' },
        a: {
          en: 'Yes — we prepare and submit the required Muscat Municipality and civil-defense documentation as part of the project programme.',
          ar: 'نعم، نُعِدّ ونقدّم المستندات المطلوبة من بلدية مسقط والدفاع المدني ضمن خطة المشروع.',
        },
      },
      {
        q: { en: 'Can you work around our existing business hours?', ar: 'هل يمكن العمل ضمن ساعات دوامنا الحالية؟' },
        a: {
          en: 'Yes, for occupied premises we sequence noisy or disruptive work outside operating hours and coordinate access with your team in advance.',
          ar: 'نعم، بالنسبة للمواقع العاملة نُجدول الأعمال المزعجة خارج ساعات الدوام وننسّق الدخول مع فريقكم مسبقًا.',
        },
      },
      {
        q: { en: "What's included in a fitout quote?", ar: 'ماذا يشمل عرض السعر؟' },
        a: {
          en: "Every quote itemizes materials, labour, and a fixed handover date, so there's no ambiguity about what's covered before work starts.",
          ar: 'يفصّل كل عرض سعر المواد والعمالة وتاريخ تسليم محدد، دون أي غموض حول ما هو مشمول قبل بدء العمل.',
        },
      },
    ],
  },
  {
    slug: 'cleaning-services',
    title: { en: 'Cleaning Services', ar: 'خدمات التنظيف' },
    tagline: {
      en: 'Scheduled and one-off cleaning for commercial and construction sites.',
      ar: 'خدمات تنظيف دورية وفورية للمواقع التجارية ومواقع الإنشاءات.',
    },
    seoTitle: {
      en: 'Commercial Cleaning Services in Oman | Golden Pillar',
      ar: 'خدمات التنظيف التجاري في عُمان | الركيزة الذهبية',
    },
    seoDescription: {
      en: 'Scheduled and one-off cleaning for commercial premises and construction sites in Muscat and across Oman — trained crews, flexible scheduling.',
      ar: 'تنظيف دوري وفوري للمواقع التجارية ومواقع الإنشاءات في مسقط وعُمان — طواقم مدرَّبة وجدولة مرنة.',
    },
    intro: {
      en: 'We run scheduled and one-off cleaning programmes for commercial premises and construction sites across Muscat — from daily office upkeep to the deep clean a site needs before handover.',
      ar: 'نُدير برامج تنظيف دورية وفورية للمواقع التجارية ومواقع الإنشاءات في مسقط — من الصيانة اليومية للمكاتب إلى التنظيف العميق الذي يحتاجه الموقع قبل التسليم.',
    },
    scope: {
      en: [
        'Deep cleaning',
        'Facade & external cleaning',
        'Post-construction cleaning',
        'Scheduled commercial cleaning',
      ],
      ar: [
        'التنظيف العميق',
        'تنظيف الواجهات والأسطح الخارجية',
        'تنظيف ما بعد أعمال البناء',
        'التنظيف التجاري الدوري',
      ],
    },
    process,
    whyPoints: [
      {
        title: { en: 'Trained crews, supervised routes', ar: 'طواقم مدرَّبة بإشراف ثابت' },
        body: {
          en: 'Every site has a named supervisor, not a rotating crew with no continuity.',
          ar: 'لكل موقع مشرف معيّن بالاسم، لا طاقم متغيّر بلا استمرارية.',
        },
      },
      {
        title: { en: 'Post-construction ready', ar: 'جاهزية لمعايير التسليم' },
        body: {
          en: 'We clean to the standard a handover inspection expects, not a general tidy-up.',
          ar: 'ننظف وفق المعيار الذي يتطلبه فحص التسليم، لا مجرد ترتيب عام.',
        },
      },
      {
        title: { en: 'Flexible scheduling', ar: 'جدولة مرنة' },
        body: {
          en: 'After-hours, weekend, or on-call for one-off jobs, without disrupting your operating day.',
          ar: 'خارج أوقات الدوام، في عطلة نهاية الأسبوع، أو حسب الطلب للأعمال الفردية، دون تعطيل يوم عملكم.',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Do you offer one-off deep cleans or only contracts?', ar: 'هل تقدمون تنظيفًا لمرة واحدة أم عقودًا فقط؟' },
        a: {
          en: 'Both — a single post-construction or facade clean, or a recurring scheduled contract, whichever the site needs.',
          ar: 'كلاهما — تنظيف عميق لمرة واحدة بعد الإنشاء أو تنظيف الواجهات، أو عقد دوري مجدول، بحسب حاجة الموقع.',
        },
      },
      {
        q: { en: 'Can cleaning happen outside our working hours?', ar: 'هل يمكن التنظيف خارج ساعات دوامنا؟' },
        a: {
          en: 'Yes, most commercial contracts run early morning, evening, or overnight specifically to avoid disrupting your business.',
          ar: 'نعم، تُنفَّذ معظم العقود التجارية في الصباح الباكر أو المساء أو ليلاً لتجنّب تعطيل عملكم.',
        },
      },
      {
        q: { en: "What's covered in a post-construction clean?", ar: 'ماذا يشمل تنظيف ما بعد الإنشاء؟' },
        a: {
          en: 'Debris removal, surface and glass cleaning, dust extraction from fittings and ducting, and a final inspection pass before handover.',
          ar: 'إزالة المخلفات، تنظيف الأسطح والزجاج، شفط الغبار من التركيبات والمجاري، وجولة تفتيش نهائية قبل التسليم.',
        },
      },
      {
        q: { en: 'Do you supply your own equipment and materials?', ar: 'هل تحضرون معداتكم ومواد التنظيف الخاصة بكم؟' },
        a: {
          en: 'Yes, our crews bring their own equipment and cleaning materials to every site.',
          ar: 'نعم، تحضر طواقمنا معداتها ومواد التنظيف الخاصة بها إلى كل موقع.',
        },
      },
    ],
  },
  {
    slug: 'joinery',
    title: { en: 'Joinery', ar: 'النجارة' },
    tagline: {
      en: 'Custom joinery and millwork, built in-house and fitted on site.',
      ar: 'أعمال نجارة مخصصة تُصنَّع في ورشتنا وتُركَّب في الموقع.',
    },
    seoTitle: {
      en: 'Custom Joinery & Millwork in Oman | Golden Pillar',
      ar: 'أعمال النجارة المخصصة في عُمان | الركيزة الذهبية',
    },
    seoDescription: {
      en: 'Custom joinery, kitchens, wardrobes and doors built in our own Muscat workshop and fitted on site across Oman — site-measured, not assumed.',
      ar: 'نجارة مخصصة وأثاث ومطابخ وأبواب تُصنَّع في ورشتنا بمسقط وتُركَّب في مواقعكم في عُمان — قياس ميداني دقيق.',
    },
    intro: {
      en: 'Our joinery workshop builds doors, wardrobes, kitchens, and custom furniture in-house, then fits it on site — so what you approve in the drawing is exactly what gets installed.',
      ar: 'تُصنَّع أعمال النجارة لدينا — الأبواب والخزائن والمطابخ والأثاث المخصص — في ورشتنا الخاصة، ثم تُركَّب في الموقع، بحيث يكون ما تعتمدونه في المخطط هو تمامًا ما يُركَّب.',
    },
    scope: {
      en: ['Doors', 'Wardrobes', 'Kitchens', 'Custom furniture', 'Commercial millwork'],
      ar: ['الأبواب', 'الخزائن', 'المطابخ', 'الأثاث المخصص', 'أعمال النجارة التجارية'],
    },
    process,
    whyPoints: [
      {
        title: { en: 'Built in our own workshop', ar: 'تصنيع في ورشتنا الخاصة' },
        body: {
          en: 'No joinery subcontracted to a third party, so quality control stays with us start to finish.',
          ar: 'لا نجارة تُسند لمقاول من الباطن، فتبقى مراقبة الجودة لدينا من البداية للنهاية.',
        },
      },
      {
        title: { en: 'Site-measured, not assumed', ar: 'قياس ميداني لا افتراضي' },
        body: {
          en: 'Every piece is measured on site before fabrication, not taken from architectural drawings alone.',
          ar: 'تُقاس كل قطعة في الموقع قبل التصنيع، لا بالاعتماد على المخططات المعمارية وحدها.',
        },
      },
      {
        title: { en: 'Material choice you see first', ar: 'اختيار المواد قبل التنفيذ' },
        body: {
          en: 'Samples and finishes are confirmed with you before full production begins.',
          ar: 'نعتمد العينات والتشطيبات معكم قبل بدء الإنتاج الكامل.',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Can you match an existing finish or design?', ar: 'هل يمكنكم مطابقة تشطيب أو تصميم قائم؟' },
        a: {
          en: "Yes — bring a sample, photo, or reference and we'll match the finish and construction detail as closely as materials allow.",
          ar: 'نعم — أحضروا عينة أو صورة أو مرجعًا، وسنطابق التشطيب وتفاصيل التصنيع بأقرب ما تسمح به المواد.',
        },
      },
      {
        q: { en: 'How long does custom joinery take to fabricate?', ar: 'كم تستغرق أعمال النجارة المخصصة للتصنيع؟' },
        a: {
          en: 'Most kitchens and wardrobe runs take 3–5 weeks from confirmed measurements to installation; smaller pieces are faster.',
          ar: 'تستغرق معظم المطابخ ودفعات الخزائن من 3 إلى 5 أسابيع من اعتماد القياسات حتى التركيب؛ القطع الأصغر أسرع.',
        },
      },
      {
        q: { en: 'Do you handle both design and installation?', ar: 'هل تتولون التصميم والتركيب معًا؟' },
        a: {
          en: 'Yes, from initial measurement and material selection through workshop fabrication to on-site installation.',
          ar: 'نعم، من القياس الأولي واختيار المواد، مرورًا بالتصنيع في الورشة، وصولًا إلى التركيب في الموقع.',
        },
      },
      {
        q: { en: 'What materials do you work with?', ar: 'ما المواد التي تعملون بها؟' },
        a: {
          en: 'MDF, plywood, solid wood, and laminate finishes are standard; other materials can be quoted on request.',
          ar: 'الخامات الأساسية هي MDF والخشب الرقائقي والخشب الصلب وتشطيبات اللامينيت؛ يمكن تسعير مواد أخرى عند الطلب.',
        },
      },
    ],
  },
  {
    slug: 'signage',
    title: { en: 'Signage', ar: 'اللوحات الإعلانية' },
    tagline: {
      en: 'Signage that gets noticed — fabricated and installed end to end.',
      ar: 'لوحات إعلانية لافتة للنظر، نُصنّعها ونُركّبها من الألف إلى الياء.',
    },
    seoTitle: {
      en: 'Signage & Shopfront Fabrication in Oman | Golden Pillar',
      ar: 'تصنيع اللوحات الإعلانية في عُمان | الركيزة الذهبية',
    },
    seoDescription: {
      en: 'Illuminated signage, wayfinding and vehicle branding fabricated and installed across Oman — built to withstand Gulf heat, maintained after handover.',
      ar: 'لوحات إعلانية مضيئة ولوحات إرشاد وتغليف سيارات، تُصنَّع وتُركَّب في عُمان لتتحمّل الحرارة، مع متابعة بعد التسليم.',
    },
    intro: {
      en: "We design, fabricate, and install signage that has to survive Oman's sun and heat as well as look right on day one — from illuminated shopfronts to wayfinding and vehicle branding.",
      ar: 'نصمم وننفذ ونركّب لوحات إعلانية تتحمّل شمس عُمان وحرارتها، وتظهر بالشكل الصحيح من اليوم الأول — من واجهات المحال المضيئة إلى لوحات الإرشاد وتغليف السيارات.',
    },
    scope: {
      en: [
        '3D letters',
        'Lightbox signage',
        'Wayfinding signage',
        'Vehicle branding',
        'Installation & maintenance',
      ],
      ar: [
        'الحروف البارزة ثلاثية الأبعاد',
        'اللوحات المضيئة',
        'لوحات الإرشاد والتوجيه',
        'تغليف السيارات الإعلاني',
        'التركيب والصيانة',
      ],
    },
    process,
    whyPoints: [
      {
        title: { en: 'Built for outdoor conditions', ar: 'تصنيع يتحمّل الأجواء الخارجية' },
        body: {
          en: 'UV-stable materials and sealed electricals rated for Gulf summer heat.',
          ar: 'مواد مقاومة للأشعة فوق البنفسجية وتمديدات كهربائية مُحكمة مصمّمة لحرارة صيف الخليج.',
        },
      },
      {
        title: { en: 'Installation stays in-house', ar: 'التركيب ضمن فريقنا' },
        body: {
          en: 'The same team that fabricates the sign installs and wires it.',
          ar: 'الفريق الذي يصنّع اللوحة هو نفسه الذي يركّبها ويمدّ توصيلاتها.',
        },
      },
      {
        title: { en: 'Support after installation', ar: 'متابعة بعد التركيب' },
        body: {
          en: 'Lighting and structural checks are available after handover, not a one-time job.',
          ar: 'فحوصات للإضاءة والتثبيت متاحة بعد التسليم، وليست خدمة تنتهي بالتركيب.',
        },
      },
    ],
    faqs: [
      {
        q: { en: 'Do you handle municipal approval for outdoor signage?', ar: 'هل تتولون موافقة البلدية على اللوحات الخارجية؟' },
        a: {
          en: 'Yes, we prepare the artwork and structural documentation Muscat Municipality requires for outdoor sign approval.',
          ar: 'نعم، نُعِدّ التصميم والمستندات الإنشائية التي تطلبها بلدية مسقط لاعتماد اللوحات الخارجية.',
        },
      },
      {
        q: { en: 'How long does illuminated signage take to fabricate?', ar: 'كم يستغرق تصنيع لوحة مضيئة؟' },
        a: {
          en: 'Standard shopfront signage typically takes 2–3 weeks from approved artwork to installation.',
          ar: 'تستغرق لوحات المحال القياسية عادة من أسبوعين إلى ثلاثة أسابيع من اعتماد التصميم حتى التركيب.',
        },
      },
      {
        q: { en: 'Can you maintain signage after installation?', ar: 'هل يمكنكم صيانة اللوحة بعد التركيب؟' },
        a: {
          en: 'Yes, we offer post-installation checks for lighting and structural condition on request.',
          ar: 'نعم، نقدّم فحوصات للإضاءة والحالة الإنشائية بعد التركيب عند الطلب.',
        },
      },
      {
        q: { en: 'Do you do vehicle branding as well as building signage?', ar: 'هل تنفذون تغليف السيارات إضافة إلى لوحات المباني؟' },
        a: {
          en: 'Yes — vehicle wraps and branding are part of our signage scope alongside building and wayfinding signs.',
          ar: 'نعم — تغليف السيارات والعلامات التجارية جزء من نطاق عملنا إلى جانب لوحات المباني والإرشاد.',
        },
      },
    ],
  },
];
