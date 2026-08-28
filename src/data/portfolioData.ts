import { PortfolioProject } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'chronos-engine',
    title: 'Chronos // WebGL Distributed Systems Visualizer',
    category: 'Developer Portfolio',
    archetypeId: 'developer',
    clientRole: 'Distributed Systems Engineer',
    tagline: 'Interactive 3D cluster visualizer & live browser-executable terminal.',
    description:
      'Architectural showcase for backend systems engineers. Demonstrates real-time WebGL node topology, custom interactive browser terminal with runnable commands, latency telemetry graphs, and verified architecture benchmarks.',
    isConceptProject: true,
    problem: {
      summary:
        'Standard developer portfolios are static resume clones that fail to communicate complex systems thinking and distributed backend depth to recruiters.',
      painPoints: [
        'Resume bullet points fail to convey architectural intuition in under 10 seconds.',
        'No interactive proof-of-work showcasing live WebAssembly & graphics capabilities.',
        'High bounce rates from recruiters overwhelmed by walls of dense text.',
      ],
    },
    approach: {
      summary:
        'We designed a spatial command console pairing a live Three.js node visualizer with an interactive shell where technical leads can simulate cluster workloads in real time.',
      designDecisions: [
        'Dark mode high-contrast palette with emerald status luminescence (#10B981).',
        'Direct terminal CLI supporting `help`, `benchmarks`, `projects`, and `contact`.',
        'Hardware-accelerated particle flow representing live network packet throughput.',
      ],
    },
    theBuild: {
      summary:
        'Engineered with Three.js, TypeScript, custom GLSL point shaders, and Tailwind CSS. The entire application bundle is compiled to under 180KB gzip with zero runtime framework bloat.',
      techStack: ['Three.js', 'WebGL 2.0', 'TypeScript', 'GLSL Shaders', 'Tailwind CSS', 'Motion'],
      performanceScore: 99,
      fpsTarget: 'Target: 60 FPS',
    },
    theResult: {
      summary:
        'Studio showcase architecture demonstrating how distributed systems engineers can differentiate themselves during high-stakes hiring rounds.',
      metrics: [
        { label: 'Target Lighthouse Score', value: '99 / 100' },
        { label: 'Target Frame Budget', value: '16.6ms (60 FPS)' },
        { label: 'Optimized Bundle Target', value: '< 180 KB gzipped' },
      ],
    },
    featured: true,
    accentColor: '#10b981',
    previewType: 'terminal',
    previewDetails: {
      heroTitle: 'MARCUS.DEV // SYSTEMS & DISTRIBUTED COMPUTE',
      subtitle: '$ ./initiate-cluster --nodes=12 --region=global-anycast',
      status: 'Studio Concept Build',
      liveUrl: 'https://demo-systems.thebuilders.design',
      clientName: 'Concept Studio Prototype',
    },
    beforeState: {
      title: 'Bland Markdown Webpage',
      flaws: ['Static bullet points', 'Zero interactivity', 'Generic GitHub link'],
    },
    afterState: {
      title: 'Spatial 3D Command Console',
      upgrades: ['Interactive node topology', 'Real-time terminal CLI', 'Lighthouse 99 score'],
    },
  },
  {
    id: 'astral-spatial',
    title: 'Aura // Spatial Computing & Product Design Portfolio',
    category: 'Designer Portfolio',
    archetypeId: 'designer',
    clientRole: 'Principal Product & AR Designer',
    tagline: 'Glassmorphic 3D design museum with dynamic light refraction and physical inertia.',
    description:
      'Studio prototype crafted for spatial UI/UX designers. Demonstrates floating holographic glass cards, dynamic light refraction shaders, fluid cursor-tracking physics, and interactive high-resolution project teardowns.',
    isConceptProject: true,
    problem: {
      summary:
        'Flat 2D Figma screenshots cannot convey spatial computing depth, tactile friction, and 3D micro-interactions.',
      painPoints: [
        'Static portfolio grids look identical across every design agency applicant.',
        'Inability to demonstrate spatial affordances and lighting responsiveness.',
        'Low engagement on multi-page case study pdf downloads.',
      ],
    },
    approach: {
      summary:
        'Created a tactile 3D gallery where visitors orbit floating design artifacts in real time, inspecting token hierarchies and gesture mechanics in physical depth.',
      designDecisions: [
        'Subtle chromatic glass refraction with dynamic Fresnel rims.',
        'Magnetic cursor feedback with damping springs on all interactive elements.',
        'Spacious typographic hierarchy using high-contrast editorial typography.',
      ],
    },
    theBuild: {
      summary:
        'Engineered with Three.js custom mesh transmission materials, WebGL post-processing passes, and motion animations.',
      techStack: ['Three.js', 'Custom Shaders', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
      performanceScore: 97,
      fpsTarget: 'Target: 60 FPS on Retina',
    },
    theResult: {
      summary:
        'Demonstrates an elite standard of spatial immersion and tactile interaction design for design leads.',
      metrics: [
        { label: 'Target Lighthouse Score', value: '97 / 100' },
        { label: 'Target GPU Draw Calls', value: '< 24 per frame' },
        { label: 'Sprint Turnaround', value: '7–10 Days' },
      ],
    },
    featured: true,
    accentColor: '#f43f5e',
    previewType: 'canvas3d',
    previewDetails: {
      heroTitle: 'ELENA ROSTOVA // SPATIAL UI ARCHITECT',
      subtitle: 'Designing the next decade of spatial computing interfaces',
      status: 'Studio Concept Build',
      liveUrl: 'https://demo-spatial.thebuilders.design',
      clientName: 'Concept Studio Prototype',
    },
    beforeState: {
      title: 'Flat Notion/Squarespace Grid',
      flaws: ['2D static images', 'Slow image carousels', 'Zero brand identity'],
    },
    afterState: {
      title: 'Holographic 3D Glass Museum',
      upgrades: ['Tactile 3D gallery', 'Custom refraction shader', 'Instant case study expand'],
    },
  },
  {
    id: 'quantum-intern',
    title: 'Nexus // CS & AI Research Proof-of-Work',
    category: 'Student Portfolio',
    archetypeId: 'student',
    clientRole: 'Computer Science Graduate',
    tagline: 'High-signal academic & engineering proof-of-work with embedded interactive visualizers.',
    description:
      'Architectural blueprint designed for university researchers and software engineers. Features interactive neural network weights visualizer, downloadable PDF resume with live version toggle, and fast-track recruiter access.',
    isConceptProject: true,
    problem: {
      summary:
        'Students and new graduates struggle to stand out among thousands of applicants submitting identical generic resumes.',
      painPoints: [
        'Resume screeners spend under 6 seconds skimming plain PDFs.',
        'Hard to prove deep mathematical & coding mastery with text alone.',
        'High rejection rate on standard applicant tracking systems (ATS).',
      ],
    },
    approach: {
      summary:
        'Engineered an interactive 3D proof-of-work showcase embedding live WebAssembly benchmarks and mathematical visualizations directly on the page.',
      designDecisions: [
        'Clean, high-legibility layout with cyan accent matrix (#38BDF8).',
        'Direct "Recruiter Quick Look" mode highlighting core skills in 30 seconds.',
        'One-click WhatsApp & email booking for fast interview scheduling.',
      ],
    },
    theBuild: {
      summary:
        'Lightweight Vite + React + Three.js architecture with zero heavy runtime overhead, fully accessible with keyboard navigation.',
      techStack: ['Three.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      performanceScore: 100,
      fpsTarget: 'Target: 60 FPS',
    },
    theResult: {
      summary:
        'Showcases how students and graduates can present verifiable coding ability with instant impact.',
      metrics: [
        { label: 'Target Lighthouse Score', value: '100 / 100' },
        { label: 'Target First Contentful Paint', value: '< 0.5s' },
        { label: 'Sprint Turnaround', value: '5–7 Days' },
      ],
    },
    featured: true,
    accentColor: '#38bdf8',
    previewType: 'bento',
    previewDetails: {
      heroTitle: 'ALEX CHEN // RESEARCH & COMPILERS',
      subtitle: 'Exploring sparse transformers & WebAssembly runtimes',
      status: 'Studio Concept Build',
      liveUrl: 'https://demo-student.thebuilders.design',
      clientName: 'Concept Studio Prototype',
    },
    beforeState: {
      title: 'Boring Word Document Resume',
      flaws: ['Black & white text', 'No visual proof of code', 'Easily lost in inbox'],
    },
    afterState: {
      title: 'High-Impact Proof-of-Work',
      upgrades: ['Interactive neural visualizer', 'Recruiter 1-click contact', '100/100 Lighthouse'],
    },
  },
  {
    id: 'creator-nexus',
    title: 'Vortex // Tech Creator & Media Kit Engine',
    category: 'Creator Portfolio',
    archetypeId: 'creator',
    clientRole: 'Tech Creator & Educator',
    tagline: 'Dynamic brand sponsorship engine with automated media kit and live audience metrics.',
    description:
      'Studio prototype engineered for online creators and educators. Features floating 3D video reel, dynamic sponsorship tier configurator with automated inquiry generation, and newsletter subscriber conversion hooks.',
    isConceptProject: true,
    problem: {
      summary:
        'Manual PDF media kits require constant updates, get lost in agency inboxes, and fail to command premium sponsorship rates.',
      painPoints: [
        'Outdated viewer statistics causing lost sponsorship revenue.',
        'No direct booking mechanism for brand partnerships.',
        'Generic Linktree style profiles diminishing brand authority.',
      ],
    },
    approach: {
      summary:
        'Built a dynamic 3D media hub where sponsors can configure custom integration packages and submit verified booking requests instantly.',
      designDecisions: [
        'Vibrant ultraviolet lighting theme (#A855F7) reflecting tech culture.',
        'Embedded responsive video reels with custom WebGL hover distortion.',
        'Clear, transparent brand collaboration tiers and rate cards.',
      ],
    },
    theBuild: {
      summary:
        'React, Three.js dynamic canvas, motion micro-interactions, and instant WhatsApp inquiry generation.',
      techStack: ['Three.js', 'React', 'Motion', 'Tailwind CSS', 'Vite'],
      performanceScore: 98,
      fpsTarget: 'Target: 60 FPS',
    },
    theResult: {
      summary:
        'Studio prototype illustrating how tech creators replace static PDF decks with interactive sponsor portals.',
      metrics: [
        { label: 'Target Lighthouse Score', value: '98 / 100' },
        { label: 'Direct Sponsor Action', value: '1-Click WhatsApp' },
        { label: 'Sprint Duration', value: '5–7 Days' },
      ],
    },
    featured: true,
    accentColor: '#a855f7',
    previewType: 'glassmorphism',
    previewDetails: {
      heroTitle: 'KAVITA ROY // MEDIA & TECH DISPATCH',
      subtitle: 'Bridging frontier hardware & software with next-gen builders',
      status: 'Studio Concept Build',
      liveUrl: 'https://demo-creator.thebuilders.design',
      clientName: 'Concept Studio Prototype',
    },
    beforeState: {
      title: 'Clunky 5-Page PDF Deck',
      flaws: ['Outdated stats', 'No video playback', 'Manual back-and-forth emails'],
    },
    afterState: {
      title: 'Interactive 3D Media Engine',
      upgrades: ['Live rate configurator', 'Embedded video reel', 'Automated inquiry sync'],
    },
  },
  {
    id: 'sterling-executive',
    title: 'Sterling // Executive Advisory & Strategy (Concept)',
    category: 'Professional Portfolio',
    archetypeId: 'professional',
    clientRole: 'Fractional CTO & Strategic Advisor',
    tagline: 'High-contrast editorial luxury identity for strategic advisors and board consultants.',
    description:
      'Bespoke digital presence for an executive advisor. Features verified ROI case study structures, keynote speech booking calendar, private briefing portal, and thought-leadership repository.',
    isConceptProject: true,
    problem: {
      summary:
        'Senior consultants and advisors often rely solely on generic LinkedIn profiles that do not reflect high-ticket advisory value.',
      painPoints: [
        'Lack of branded credibility for private enterprise advisory retainers.',
        'No centralized space for keynote topics and governance credentials.',
        'Friction in booking executive advisory briefings.',
      ],
    },
    approach: {
      summary:
        'Designed an editorial luxury experience pairing subtle warm amber luminescence with typography and structured engagement tiers.',
      designDecisions: [
        'Warm metallic bronze lighting accents (#D97706).',
        'Rigorous case study breakdowns with quantitative business outcomes.',
        'Direct calendar integration for high-priority discovery briefings.',
      ],
    },
    theBuild: {
      summary:
        'Engineered with precision typography, responsive fluid layouts, and minimal WebGL ambient shaders.',
      techStack: ['Three.js', 'React', 'Tailwind CSS', 'Motion', 'Vite'],
      performanceScore: 99,
      fpsTarget: '60 FPS',
    },
    theResult: {
      summary:
        'Concept showcase demonstrating how executive advisors can establish definitive authority.',
      metrics: [
        { label: 'Target Lighthouse Score', value: '99 / 100' },
        { label: 'Responsive Viewports', value: '320px - 4K UHD' },
        { label: 'Turnaround Time', value: '7 Days' },
      ],
    },
    featured: false,
    accentColor: '#d97706',
    previewType: 'editorial',
    previewDetails: {
      heroTitle: 'DR. ARTHUR STERLING // BOARD ADVISOR',
      subtitle: 'Navigating artificial intelligence and enterprise transformation',
      status: 'Studio Concept Build',
      liveUrl: 'https://demo-executive.thebuilders.design',
      clientName: 'Concept Studio Build',
    },
    beforeState: {
      title: 'Standard LinkedIn Summary',
      flaws: ['Crowded social feed', 'No custom domain', 'Zero brand differentiation'],
    },
    afterState: {
      title: 'Editorial Executive Identity',
      upgrades: ['Custom domain & branding', 'Keynote booking system', 'Structured case studies'],
    },
  },
  {
    id: 'synergy-founder',
    title: 'Pulse // Startup Founder Digital Portal (Concept)',
    category: 'Founder Brand',
    archetypeId: 'founder',
    clientRole: 'Tech Founder & CEO',
    tagline: 'High-voltage spatial portal built to attract angel investors and founding engineers.',
    description:
      'Crafted for high-growth tech founders. Features interactive 3D vision timeline, embedded product sandbox preview, password-gated deck briefing, and founding team recruitment portal.',
    isConceptProject: true,
    problem: {
      summary:
        'Early-stage founders need to project massive technical credibility to close funding rounds and recruit top-1% engineers.',
      painPoints: [
        'Pitch decks get forwarded without context or interactive excitement.',
        'Hard to stand out among thousands of AI startup founders.',
        'Engineers want to see technical taste and execution capability.',
      ],
    },
    approach: {
      summary:
        'Constructed a cybernetic 3D brand portal that communicates the founder’s vision with technical precision and kinetic energy.',
      designDecisions: [
        'Cyber cyan & deep navy aesthetic with neon wireframe matrices.',
        'Interactive roadmap with milestone status badges.',
        'Direct investor & engineer contact channels with pre-filled prompts.',
      ],
    },
    theBuild: {
      summary:
        'Three.js spatial camera navigation, particle field simulation, and interactive state management.',
      techStack: ['Three.js', 'React', 'Motion', 'Tailwind CSS', 'Vite'],
      performanceScore: 98,
      fpsTarget: '60 FPS',
    },
    theResult: {
      summary:
        'Studio concept build demonstrating how high-velocity founders can launch an unforgettable personal brand.',
      metrics: [
        { label: 'Target Lighthouse Score', value: '98 / 100' },
        { label: 'GPU Pipeline', value: 'Adaptive 3D' },
        { label: 'Delivery Time', value: '7-10 Days' },
      ],
    },
    featured: false,
    accentColor: '#06b6d4',
    previewType: 'canvas3d',
    previewDetails: {
      heroTitle: 'SIDDHARTH NAIR // BUILDING PULSE',
      subtitle: 'The autonomous intelligence layer for modern engineering teams',
      status: 'Studio Concept Build',
      liveUrl: 'https://demo-founder.thebuilders.design',
      clientName: 'Concept Studio Build',
    },
    beforeState: {
      title: 'Bland One-Page PDF Deck',
      flaws: ['Static slides', 'No interactive product feel', 'Forgettable presence'],
    },
    afterState: {
      title: 'Cybernetic 3D Brand Portal',
      upgrades: ['Interactive vision timeline', 'Embedded product sandbox', 'Direct hiring hooks'],
    },
  },
];

