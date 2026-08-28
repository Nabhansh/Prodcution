import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { ConfiguratorState, OrderInquiry, StyleId } from '../types';
import { ARCHETYPES } from '../data/archetypesData';
import { ADDONS_DATA } from '../data/pricingData';
import { SITE_CONFIG } from '../config/siteConfig';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  Copy,
  Check,
  Video,
  Layers,
  PlusCircle,
} from 'lucide-react';

interface ContactOrderSectionProps {
  config: ConfiguratorState;
  currency: 'INR' | 'USD';
  onHoverState: (type: 'pointer') => void;
  onHoverLeave: () => void;
}

const STYLES: { id: StyleId; name: string }[] = [
  { id: 'futuristic', name: 'Cybernetic 3D' },
  { id: 'minimal', name: 'Minimal Mono' },
  { id: 'luxury', name: 'Executive Gold' },
  { id: 'dark', name: 'Terminal Matrix' },
  { id: 'spatial3d', name: 'Spatial Glass' },
  { id: 'bold', name: 'Vibrant Pop' },
];

export const ContactOrderSection: React.FC<ContactOrderSectionProps> = ({
  config,
  currency,
  onHoverState,
  onHoverLeave,
}) => {
  const [formData, setFormData] = useState<OrderInquiry>({
    name: '',
    email: '',
    whatsapp: '',
    profession: '',
    portfolioType: config.archetype || 'developer',
    tier: config.tierId || 'starter',
    style: config.style || 'futuristic',
    selectedAddons: config.selectedAddons || [],
    budget: 'Custom Sprint Scope',
    deadline: 'Within 2 Weeks',
    existingWebsite: '',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});

  // Synchronize when external configurator options update
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      portfolioType: config.archetype,
      style: config.style,
      selectedAddons: config.selectedAddons,
    }));
  }, [config.archetype, config.style, config.selectedAddons]);

  // Calculate Price Breakdown
  const currentArchetypeObj = ARCHETYPES.find((a) => a.id === formData.portfolioType) || ARCHETYPES[0];
  const basePrice = currency === 'INR' ? currentArchetypeObj.basePriceINR : currentArchetypeObj.basePriceUSD;
  const selectedAddonsList = ADDONS_DATA.filter((a) => formData.selectedAddons.includes(a.id));
  const addonsTotal = selectedAddonsList.reduce(
    (acc, item) => acc + (currency === 'INR' ? item.priceINR : item.priceUSD),
    0
  );
  const grandTotal = basePrice + addonsTotal;

  // Toggle Addon in form
  const toggleAddon = (addonId: string) => {
    soundFx.playClick();
    setFormData((prev) => {
      const exists = prev.selectedAddons.includes(addonId);
      return {
        ...prev,
        selectedAddons: exists
          ? prev.selectedAddons.filter((id) => id !== addonId)
          : [...prev.selectedAddons, addonId],
      };
    });
  };

  // Generate formatted Blueprint text
  const generateBlueprintText = () => {
    const symbol = currency === 'INR' ? '₹' : '$';
    const addonsNames =
      selectedAddonsList.length > 0
        ? selectedAddonsList
            .map((a) => `- ${a.name} (${symbol}${currency === 'INR' ? a.priceINR : a.priceUSD})`)
            .join('\n')
        : 'None (Base Package Only)';

    return `🔥 *3D PORTFOLIO PROJECT SPECIFICATIONS* 🔥
----------------------------------------
👤 *CLIENT DETAILS:*
• Name: ${formData.name || 'Not provided'}
• Email: ${formData.email || 'Not provided'}
• Phone/WhatsApp: ${formData.whatsapp || 'Not provided'}
• Role / Profession: ${formData.profession || 'Not provided'}

📐 *PROJECT CONFIGURATION:*
• Archetype: ${currentArchetypeObj.title}
• Visual Style: ${formData.style.toUpperCase()}
• Target Deadline: ${formData.deadline}
• Existing Link/Portfolio: ${formData.existingWebsite || 'None'}

📦 *SELECTED MODULES & ADD-ONS:*
${addonsNames}

💰 *ESTIMATED TOTAL:* ${symbol}${currency === 'INR' ? grandTotal.toLocaleString('en-IN') : grandTotal}

📝 *VISION & AMBITIONS:*
${formData.requirements || 'Standard high-impact 3D portfolio deployment.'}

----------------------------------------
*Requesting custom Loom video blueprint within 24 hours.*`;
  };

  // Copy blueprint to clipboard
  const handleCopyBlueprint = () => {
    const text = generateBlueprintText();
    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    soundFx.playClick();
    setTimeout(() => setCopiedBlueprint(false), 2500);
  };

  // Generate mailto and WhatsApp links
  const whatsappUrl = `https://wa.me/91${SITE_CONFIG.contact.rawPhone}?text=${encodeURIComponent(
    generateBlueprintText()
  )}`;

  const emailSubject = encodeURIComponent(
    `3D Portfolio Blueprint Request: ${formData.name || 'New Client'} (${currentArchetypeObj.title})`
  );
  const emailBody = encodeURIComponent(generateBlueprintText());
  const mailtoUrl = `mailto:${SITE_CONFIG.contact.email}?subject=${emailSubject}&body=${emailBody}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Please provide a valid email address';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      soundFx.playWarp();
      return;
    }

    setFormErrors({});
    soundFx.playClick();
    setSubmitting(true);

    // Save to localStorage
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('the_builders_inquiries') || '[]');
      const newInquiry = {
        ...formData,
        submittedAt: new Date().toISOString(),
        estimatedTotal: grandTotal,
        currency,
        id: `INQ-${Date.now().toString().slice(-6)}`,
      };
      localStorage.setItem('the_builders_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));
    } catch {
      // Ignore storage errors in private browsing
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      soundFx.playSuccess();

      // Confetti burst
      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#f43f5e', '#10b981', '#ffffff'],
      });
    }, 700);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 11 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Direct Inquiries
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
          LET&apos;S BUILD YOUR{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            signature
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
            PRESENCE.
          </span>
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-xl mx-auto leading-relaxed">
          Provide your specifications below. I review every project personally and prepare a personalized Loom video blueprint within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* LEFT COLUMN: CONTACT CHANNELS & ORDER SUMMARY (4 COLS) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* Direct Studio Channels */}
          <div className="p-5 sm:p-7 rounded-2xl glass-panel">
            <h3 className="text-xs font-mono font-semibold uppercase text-sky-400 mb-4 sm:mb-5 flex items-center gap-2 tracking-wider">
              <span>Direct Studio Channels</span>
            </h3>

            <div className="space-y-2.5 sm:space-y-3 text-xs font-mono">
              <a
                href={mailtoUrl}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-colors text-slate-300"
              >
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-sky-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Direct Email</span>
                  <span className="font-medium text-white">{SITE_CONFIG.contact.email}</span>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-emerald-500/20 hover:border-emerald-500/40 transition-colors text-slate-300"
              >
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">WhatsApp Channel</span>
                  <span className="font-medium text-white">{SITE_CONFIG.contact.whatsapp}</span>
                </div>
              </a>

              <a
                href={`tel:+91${SITE_CONFIG.contact.rawPhone}`}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-colors text-slate-300"
              >
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center text-sky-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Phone / Calling</span>
                  <span className="font-medium text-white">+91 {SITE_CONFIG.contact.rawPhone}</span>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-slate-300 text-xs">
                <span className="font-semibold text-sky-300 font-mono text-[11px] block mb-1 tracking-wider uppercase">Sprint Capacity</span>
                {SITE_CONFIG.contact.availability}
              </div>
            </div>
          </div>

          {/* Configured Package Card */}
          <div className="p-5 sm:p-7 rounded-2xl glass-panel border-sky-500/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
                Specification Stack
              </h4>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                LIVE SYNC
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono border-b border-white/10 pb-4">
              <div className="flex justify-between text-slate-300">
                <span>Archetype:</span>
                <strong className="text-sky-300">{currentArchetypeObj.title}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Visual Theme:</span>
                <strong className="text-white capitalize">{formData.style}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Addons:</span>
                <strong className="text-slate-200">{formData.selectedAddons.length} Selected</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Timeline:</span>
                <strong className="text-emerald-300">{formData.deadline}</strong>
              </div>
            </div>

            <div className="mt-5 flex items-baseline justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Estimated Total</span>
              <span className="text-2xl font-mono font-bold text-white">
                {currency === 'INR' ? `₹${grandTotal.toLocaleString('en-IN')}` : `$${grandTotal}`}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyBlueprint}
              className="mt-5 w-full min-h-[44px] py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedBlueprint ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-sky-400" />
                  <span>Copy Blueprint Spec</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: INQUIRY FORM (8 COLS) */}
        <div className="lg:col-span-8">
          <div className="p-5 sm:p-8 md:p-10 rounded-2xl glass-panel relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full glass border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase">
                    REQUEST RECEIVED
                  </h3>
                  <h4 className="text-base sm:text-lg font-mono text-sky-400 mt-2">
                    Your project brief has been captured
                  </h4>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-left max-w-lg w-full space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-sky-400 font-semibold uppercase tracking-wider pb-2 border-b border-white/10">
                    <Video className="w-4 h-4 text-emerald-400" />
                    <span>What happens next:</span>
                  </div>
                  <ul className="space-y-2 text-slate-400 text-xs list-disc list-inside">
                    <li>I review your <strong>{currentArchetypeObj.title}</strong> configuration and requirements.</li>
                    <li>You receive a confirmation with next steps.</li>
                    <li>If needed, I follow up at <strong className="text-sky-300">{formData.email}</strong>.</li>
                  </ul>
                </div>

                {/* Instant Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Connect on WhatsApp</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="flex-1 py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-slate-950 font-mono font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-white/10"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Direct Email</span>
                  </a>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full glass text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Edit Specifications / Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. ARCHETYPE & STYLE SELECTORS */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase font-semibold tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>1. Select Archetype & Aesthetic Theme</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ARCHETYPES.map((arch) => (
                      <button
                        key={arch.id}
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setFormData({ ...formData, portfolioType: arch.id });
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          formData.portfolioType === arch.id
                            ? 'bg-sky-500/10 border-sky-400 text-white shadow-sm'
                            : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold block">{arch.title}</span>
                        <span className="text-[10px] text-slate-400 mt-1">
                          {currency === 'INR' ? `₹${arch.basePriceINR.toLocaleString('en-IN')}` : `$${arch.basePriceUSD}`}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Style Radios */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                      Visual Vibe:
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {STYLES.map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            setFormData({ ...formData, style: st.id });
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-mono border text-center transition-all cursor-pointer ${
                            formData.style === st.id
                              ? 'bg-white text-slate-950 font-bold border-white shadow-md'
                              : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {st.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. OPTIONAL MODULAR ADD-ONS */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-sky-400 uppercase font-semibold tracking-wider">
                    <div className="flex items-center gap-2">
                      <PlusCircle className="w-4 h-4" />
                      <span>2. Choose Optional Modules</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{formData.selectedAddons.length} Selected</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                    {ADDONS_DATA.map((addon) => {
                      const isSelected = formData.selectedAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between text-xs ${
                            isSelected
                              ? 'bg-sky-500/10 border-sky-400 text-white'
                              : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:text-white'
                          }`}
                        >
                          <div className="truncate pr-2">
                            <span className="font-mono text-xs block truncate">{addon.name}</span>
                          </div>
                          <span className="text-xs font-mono text-sky-300 shrink-0 font-medium">
                            +{currency === 'INR' ? `₹${addon.priceINR.toLocaleString('en-IN')}` : `$${addon.priceUSD}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. CLIENT SPECIFICATIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      className={`w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:ring-1 ${
                        formErrors.name
                          ? 'border-rose-500 focus:border-rose-400 focus:ring-rose-400'
                          : 'border-white/10 focus:border-sky-400 focus:ring-sky-400'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-rose-400 text-[10px] font-mono mt-1 block">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                      }}
                      className={`w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:ring-1 ${
                        formErrors.email
                          ? 'border-rose-500 focus:border-rose-400 focus:ring-rose-400'
                          : 'border-white/10 focus:border-sky-400 focus:ring-sky-400'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-rose-400 text-[10px] font-mono mt-1 block">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* WhatsApp */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      WhatsApp / Phone (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="+91 12345 67890"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>

                  {/* Profession */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Role / Specialization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Frontend Architect / Product Designer"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Target Deadline */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Target Timeline
                    </label>
                    <select
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-[#0a0a0d] border border-white/10 focus:border-sky-400 text-white text-base sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-sky-400"
                    >
                      <option value="48 Hours (Rapid Rush)">48 Hours (Rapid Rush)</option>
                      <option value="Within 1 Week">Within 1 Week (Express Sprint)</option>
                      <option value="Within 2 Weeks">Within 2 Weeks (Standard Sprint)</option>
                      <option value="Within 1 Month">Within 1 Month (Flexible Scope)</option>
                    </select>
                  </div>

                  {/* Existing Website */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Current Links / GitHub / LinkedIn
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/username"
                      value={formData.existingWebsite}
                      onChange={(e) => setFormData({ ...formData, existingWebsite: e.target.value })}
                      className="w-full min-h-[46px] px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Project Vision & Ambitions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your desired aesthetic, target audience, key projects, and interactives you want to include..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-sky-400 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  onMouseEnter={() => {
                    soundFx.playHover();
                    onHoverState('pointer');
                  }}
                  onMouseLeave={onHoverLeave}
                  className="w-full min-h-[50px] py-4 rounded-xl bg-white hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      Preparing Custom Blueprint...
                    </span>
                  ) : (
                    <>
                      <span>Submit for Loom Video Blueprint</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
