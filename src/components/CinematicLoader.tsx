import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/audio';
import { StudioLogo } from './StudioLogo';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface CinematicLoaderProps {
  onEnter?: () => void;
  onComplete?: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onEnter, onComplete }) => {
  const [phase, setPhase] = useState<'ignite' | 'form' | 'ready'>('ignite');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage 1: Ignite core
    const timer1 = setTimeout(() => {
      setPhase('form');
    }, 900);

    // Stage 2: Ready button
    const timer2 = setTimeout(() => {
      setPhase('ready');
    }, 2200);

    // Progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, []);

  const handleEnterClick = () => {
    soundFx.playWarp();
    if (onEnter) onEnter();
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020203] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      >
        {/* Ambient Grid & Glows */}
        <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-pulse" />

        {/* Skip button top right */}
        <button
          onClick={handleEnterClick}
          className="absolute top-6 right-6 text-xs font-mono tracking-widest text-white/50 hover:text-white transition-colors px-3.5 py-1.5 rounded-full glass border border-white/10 hover:border-blue-500/30 flex items-center gap-1.5 uppercase cursor-pointer"
        >
          SKIP INTRO
          <ArrowRight className="w-3 h-3 text-blue-400" />
        </button>

        {/* Center Glowing 3D Transforming Artifact */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Outer Pulsing Rings */}
          <motion.div
            className="w-36 h-36 rounded-full border border-blue-500/30 absolute"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: 360,
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="w-48 h-48 rounded-full border border-white/10 absolute"
            animate={{
              scale: [1.2, 0.9, 1.2],
              opacity: [0.2, 0.5, 0.2],
              rotate: -360,
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Central Logo Cyber Rabbit Core */}
          <motion.div
            className="relative w-24 h-24 flex items-center justify-center"
            animate={{
              scale: [1, 1.06, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <StudioLogo size="xl" />
          </motion.div>

          {/* Typography */}
          <div className="mt-12 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full glass border border-blue-500/30 text-[10px] font-mono tracking-widest text-blue-400 uppercase"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              [ SYSTEM : INITIALIZING DIGITAL STUDIO ]
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase text-glow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              BUILDING DIGITAL IDENTITIES
            </motion.h1>

            <motion.p
              className="mt-2 text-xs sm:text-sm font-mono text-white/50 max-w-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Compiling 3D Shaders & Environment ({progress}%)
            </motion.p>
          </div>

          {/* Enter Button */}
          <div className="mt-10 h-14 flex items-center justify-center">
            {phase === 'ready' ? (
              <motion.button
                onClick={handleEnterClick}
                onMouseEnter={() => soundFx.playHover()}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37,99,235,0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-sm bg-blue-600 hover:bg-blue-500 text-white font-bold font-mono tracking-[0.2em] text-xs flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer uppercase"
              >
                <span>ENTER EXPERIENCE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            ) : (
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Hardware Tag */}
        <div className="absolute bottom-6 flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>GPU ACCELERATED • ADAPTIVE RENDERING • DEVICE-AWARE</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
