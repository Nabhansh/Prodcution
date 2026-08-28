import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data/processData';
import { soundFx } from '../utils/audio';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  onHoverState: (type: 'pointer') => void;
  onHoverLeave: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onHoverState,
  onHoverLeave,
}) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFAQ = (id: string) => {
    soundFx.playClick();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 09 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Clarity & Guarantees
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
          FREQUENTLY ASKED{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            questions.
          </span>
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-xl mx-auto leading-relaxed">
          Transparent details regarding our sprint timeline, architecture deliverables, and performance standards.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3 sm:space-y-3.5">
        {FAQ_ITEMS.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'glass-panel border-sky-500/40 shadow-lg'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                onMouseEnter={() => {
                  soundFx.playHover();
                  onHoverState('pointer');
                }}
                onMouseLeave={onHoverLeave}
                className="w-full min-h-[48px] p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none"
              >
                <span className="text-base sm:text-lg font-display font-bold text-white">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full glass flex items-center justify-center text-slate-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-sky-400 bg-sky-500/10' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-300/80 font-sans leading-relaxed border-t border-white/5 pt-3.5 sm:pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
