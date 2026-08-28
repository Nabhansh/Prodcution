import { ProcessStep, FAQItem, Testimonial } from '../types';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 'PHASE 01',
    number: '01',
    title: 'DISCOVER & STRATEGIZE',
    subtitle: 'Deep-dive into your ambition, career targets, and visual archetype.',
    duration: 'Day 1–2',
    description:
      'We extract your greatest career achievements, key metrics, visual inspirations, and target audience (recruiters, clients, or investors) to blueprint an unforgettable narrative structure.',
    deliverables: [
      'Narrative & Wireframe Blueprint',
      'Art Direction Moodboard & 3D Lighting Palette',
      'Content & Project Asset Checklist',
    ],
    deliverableBadge: 'ARCHITECTURE BLUEPRINT',
  },
  {
    step: 'PHASE 02',
    number: '02',
    title: '3D ART DIRECTION & DESIGN',
    subtitle: 'Crafting the 3D world, typography pairings, and spatial geometry.',
    duration: 'Day 3–5',
    description:
      'We construct custom 3D models, glass refraction materials, dynamic lighting schemes, and editorial layout systems in Figma and Three.js prototypes to bring your digital identity to life.',
    deliverables: [
      'Interactive 3D Viewport Prototypes',
      'High-Fidelity Desktop & Mobile Screen Layouts',
      'Custom 3D Scene Geometry & Shaders',
    ],
    deliverableBadge: '3D VISUAL IDENTITY',
  },
  {
    step: 'PHASE 03',
    number: '03',
    title: 'ENGINEERING & SHADER CODE',
    subtitle: 'Transforming designs into high-performance WebGL reality.',
    duration: 'Day 6–9',
    description:
      'We write high-performance Three.js, React, and GLSL code with dynamic Level-of-Detail (LOD), camera path controllers, magnetic cursor interactions, and responsive mobile optimizations.',
    deliverables: [
      'Production React + Three.js Codebase',
      'Sub-Second Asset Preloading & Compression',
      'Full Responsive Breakpoint Tuning',
    ],
    deliverableBadge: 'HIGH-PERFORMANCE BUILD',
  },
  {
    step: 'PHASE 04',
    number: '04',
    title: 'REFINE & MICRO-INTERACTIONS',
    subtitle: 'Polishing every hover state, sound feedback, and transition curve.',
    duration: 'Day 10–11',
    description:
      'We fine-tune cubic-bezier spring physics, audio synthesizer feedback, accessibility keyboard navigation, cross-device testing, and rigorous performance audits.',
    deliverables: [
      'Client Live Staging Review & Feedback Round',
      'Comprehensive Performance & Speed Audit',
      'Cross-Browser & Device Rig Tests',
    ],
    deliverableBadge: 'QUALITY PERFECTION',
  },
  {
    step: 'PHASE 05',
    number: '05',
    title: 'LAUNCH & DOMINATE',
    subtitle: 'Going live on your custom domain, indexing on search engines, and celebration.',
    duration: 'Day 12–14',
    description:
      'We configure DNS, SSL certificates, global CDN edge caching, OpenGraph social cards, search console indexing, and hand over a complete video walkthrough and CMS guide.',
    deliverables: [
      'Live Custom Domain & Global CDN Deployment',
      'Complete Source Code & Git Repository Transfer',
      'Loom Video Walkthrough & CMS Tutorial',
    ],
    deliverableBadge: 'LIVE PRODUCTION DOMAIN',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How much does a custom portfolio cost?',
    answer:
      'Our Essential sprint begins at ₹4,999 (~$149), our most popular PRO Studio tier is ₹14,999 (~$399), and our flagship Signature Bespoke package is ₹34,999 (~$899). You can customize your exact stack and optional modular add-ons using our live 3D Configurator and get a 100% transparent quote upfront with zero hidden fees.',
    category: 'pricing',
  },
  {
    id: 'faq-2',
    question: 'What do I get with my portfolio?',
    answer:
      'Every package includes: responsive design, custom sections, deployment support, performance optimization, basic SEO setup, a contact system, and post-launch support. The Pro and Signature tiers add 3D environments, custom shaders, analytics, CMS integration, and extended support.',
    category: 'pricing',
  },
  {
    id: 'faq-3',
    question: 'How long does it take to build?',
    answer:
      'Most projects are completed and deployed within 7 to 14 business days. We operate in dedicated sprint cycles so you receive daily updates and review links throughout the process.',
    category: 'timeline',
  },
  {
    id: 'faq-4',
    question: 'Do I need to provide the content?',
    answer:
      'Yes, you provide your projects, bio, and any specific content you want featured. I help structure and present it in the best possible way. If you need help with copywriting or project descriptions, that can be arranged as part of the design process.',
    category: 'process',
  },
  {
    id: 'faq-5',
    question: 'Can I choose the design style?',
    answer:
      '100%. Every portfolio is custom tailored to your personality and aesthetic. Choose from Minimal, Luxury, Futuristic, Bold, Editorial, Spatial 3D, and more. You review and approve design concepts before any code is written.',
    category: 'process',
  },
  {
    id: 'faq-6',
    question: 'Can I update my projects after launch?',
    answer:
      'Yes. Projects are built with clean modular data files or connected to a headless CMS. You can add new projects, update text, and upload new screenshots without touching any code.',
    category: 'tech',
  },
  {
    id: 'faq-7',
    question: 'Can you redesign my existing portfolio?',
    answer:
      'Absolutely. We completely transform existing WordPress, Squarespace, or template sites into custom digital identities. We preserve your content while upgrading the design, performance, and interactivity.',
    category: 'process',
  },
  {
    id: 'faq-8',
    question: 'Do you provide hosting and domain setup?',
    answer:
      'Yes. We set up your custom domain on fast global hosting (Vercel, Cloudflare, or AWS) with automatic SSL certificates and edge caching. No extra monthly server fees.',
    category: 'process',
  },
  {
    id: 'faq-9',
    question: 'How many revisions are included?',
    answer:
      'Every package includes 2 rounds of design revisions during the staging phase. Additional revision rounds can be added if needed. We also provide 14–60 days of post-launch support depending on your package.',
    category: 'process',
  },
  {
    id: 'faq-10',
    question: 'Will it work well on mobile?',
    answer:
      'Yes. All portfolios are built mobile-first with adaptive performance. 3D effects automatically scale down for weaker devices while keeping the experience smooth and visually impressive.',
    category: 'tech',
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'Staff Distributed Systems Engineer',
    company: 'Ex-Stripe / Protocol Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote:
      '“The Builders turned my dry GitHub commits into an interactive 3D computing engine. In the first 3 weeks of launching, I received 4 inbound Staff Engineer offers without applying anywhere. The ROI on this build was 200x.”',
    portfolioType: 'Developer Portfolio',
    resultMetric: '4 Staff Offers / $380k Comp',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    role: 'Principal Spatial UX Director',
    company: 'Spatial Design Guild',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote:
      '“As a designer, my biggest fear was getting a generic template. The 3D glass physics, subtle Web Audio sounds, and spatial gallery Aetheria engineered received endless praise from design directors and booked my studio out for months.”',
    portfolioType: 'Designer Portfolio',
    resultMetric: 'Studio Booked 8mo Ahead',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Alex Chen',
    role: 'CS & AI Researcher',
    company: 'Stanford CS / Research Fellow',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote:
      '“I was applying for internships with 500 other applicants. After switching to this 3D proof-of-work portfolio, recruiters literally opened phone screens saying: ‘Your website is the best thing our team has seen all year.’”',
    portfolioType: 'Student Portfolio',
    resultMetric: 'Top Tech & AI Lab Interview Loops',
    rating: 5,
  },
  {
    id: 'test-4',
    name: 'Siddharth Nair',
    role: 'Founder & CEO',
    company: 'Nexus Tech (YC W24)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote:
      '“Investors judge founders on execution speed and taste. Having our 3D vision timeline and product teaser built by The Builders was the secret weapon that helped us close our $4.2M seed round in 11 days.”',
    portfolioType: 'Founder Brand',
    resultMetric: '$4.2M Seed Round Closed',
    rating: 5,
  },
];
