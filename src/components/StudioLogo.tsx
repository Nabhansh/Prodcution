import React from 'react';

interface StudioLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

export const StudioLogo: React.FC<StudioLogoProps> = ({
  size = 'md',
  className = '',
  showGlow = true,
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl overflow-hidden group select-none ${sizeMap[size]} ${className}`}
    >
      {/* Outer ambient cyber glow */}
      {showGlow && (
        <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-md group-hover:bg-blue-400/50 transition-all duration-300 pointer-events-none" />
      )}

      {/* Cyberpunk Character Shield Container */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
      >
        <defs>
          {/* Background gradient */}
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#020817" />
            <stop offset="50%" stopColor="#0c1a3a" />
            <stop offset="100%" stopColor="#020817" />
          </linearGradient>

          {/* Electric Blue Aura */}
          <radialGradient id="electricAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#2563eb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          {/* Scarf Blue Gradient */}
          <linearGradient id="scarfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="40%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Eye Glow Radial */}
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e0f2fe" />
            <stop offset="60%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Neon filter for eyes */}
          <filter id="neonFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Outer ear glow */}
          <radialGradient id="earGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Background Shield */}
        <rect width="100" height="100" rx="18" fill="url(#bgGrad)" stroke="#1e3a8a" strokeWidth="2" />
        <rect width="96" height="96" x="2" y="2" rx="16" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.3" />

        {/* Digital Matrix Code Lines */}
        <g opacity="0.3" fill="#38bdf8">
          <text x="8" y="16" fontSize="5" fontFamily="monospace">10110</text>
          <text x="8" y="24" fontSize="5" fontFamily="monospace">01001</text>
          <text x="8" y="32" fontSize="5" fontFamily="monospace">11010</text>
          <text x="76" y="16" fontSize="5" fontFamily="monospace">01101</text>
          <text x="76" y="24" fontSize="5" fontFamily="monospace">10011</text>
          <text x="76" y="32" fontSize="5" fontFamily="monospace">01010</text>
          <line x1="12" y1="4" x2="12" y2="40" stroke="#38bdf8" strokeWidth="0.4" strokeDasharray="1 2" />
          <line x1="88" y1="4" x2="88" y2="40" stroke="#38bdf8" strokeWidth="0.4" strokeDasharray="1 2" />
        </g>

        {/* Electric Aura Halo */}
        <circle cx="50" cy="42" r="36" fill="url(#electricAura)" />

        {/* Lightning Energy Tendrils */}
        <path d="M16 52 L26 46 L20 40 L32 30" stroke="#7dd3fc" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        <path d="M84 52 L74 46 L80 40 L68 30" stroke="#7dd3fc" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />

        {/* 2. TALL POINTED EARS - Main Feature */}
        {/* Left Ear - tall, pointed, slightly curved */}
        <path
          d="M38 40 C36 30 33 16 35 8 C37 2 42 2 44 8 C46 16 44 30 44 40 Z"
          fill="#0a1224"
          stroke="#1e3a8a"
          strokeWidth="1.2"
        />
        {/* Left Ear Inner Neon Edge */}
        <path
          d="M36 34 C35 24 34 14 36 8 C37 6 40 8 41 14 C42 24 41 34 41 40"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
          fill="none"
        />
        {/* Left Ear Glow */}
        <ellipse cx="39" cy="20" rx="5" ry="14" fill="url(#earGlow)" opacity="0.5" />

        {/* Right Ear - tall, pointed, slightly curved */}
        <path
          d="M62 40 C64 30 67 16 65 8 C63 2 58 2 56 8 C54 16 56 30 56 40 Z"
          fill="#0a1224"
          stroke="#1e3a8a"
          strokeWidth="1.2"
        />
        {/* Right Ear Inner Neon Edge */}
        <path
          d="M64 34 C65 24 66 14 64 8 C63 6 60 8 59 14 C58 24 59 34 59 40"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
          fill="none"
        />
        {/* Right Ear Glow */}
        <ellipse cx="61" cy="20" rx="5" ry="14" fill="url(#earGlow)" opacity="0.5" />

        {/* 3. Head / Mask Silhouette */}
        <path
          d="M30 48 C28 42 34 34 50 34 C66 34 72 42 70 48 C76 54 72 64 66 68 C58 72 42 72 34 68 C28 64 24 54 30 48 Z"
          fill="#070e1c"
          stroke="#1d4ed8"
          strokeWidth="1.2"
        />

        {/* Face Mask / Dark Zone */}
        <path
          d="M34 52 C39 55 46 56 50 56 C54 56 61 55 66 52 C68 57 65 66 50 68 C35 66 32 57 34 52 Z"
          fill="#020617"
          stroke="#1e293b"
          strokeWidth="0.8"
        />

        {/* 4. INTENSE GLOWING EYES - Signature Feature */}
        {/* Left Eye Outer Glow */}
        <circle cx="42" cy="46" r="8" fill="url(#eyeGlow)" />
        {/* Left Eye Core */}
        <ellipse cx="42" cy="46" rx="5" ry="4" fill="#ffffff" filter="url(#neonFilter)" />
        <ellipse cx="42" cy="46" rx="3" ry="2.5" fill="#f0f9ff" />
        {/* Left Eye Inner Bright */}
        <ellipse cx="42" cy="45.5" rx="1.5" ry="1" fill="#ffffff" opacity="0.9" />

        {/* Right Eye Outer Glow */}
        <circle cx="58" cy="46" r="8" fill="url(#eyeGlow)" />
        {/* Right Eye Core */}
        <ellipse cx="58" cy="46" rx="5" ry="4" fill="#ffffff" filter="url(#neonFilter)" />
        <ellipse cx="58" cy="46" rx="3" ry="2.5" fill="#f0f9ff" />
        {/* Right Eye Inner Bright */}
        <ellipse cx="58" cy="45.5" rx="1.5" ry="1" fill="#ffffff" opacity="0.9" />

        {/* Eye Light Beams - extending outward */}
        <path d="M38 46 C32 45 26 43 20 38" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <path d="M62 46 C68 45 74 43 80 38" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

        {/* Eye glow beams downward */}
        <path d="M42 50 C42 56 40 62 38 68" stroke="#60a5fa" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
        <path d="M58 50 C58 56 60 62 62 68" stroke="#60a5fa" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />

        {/* 5. Vibrant Blue Scarf */}
        {/* Scarf Main Band */}
        <path
          d="M24 68 C32 64 68 64 76 68 C78 72 75 78 70 82 C60 85 40 85 30 82 C25 78 22 72 24 68 Z"
          fill="url(#scarfGrad)"
          stroke="#93c5fd"
          strokeWidth="1.2"
        />
        {/* Scarf Highlight Folds */}
        <path d="M28 70 C38 67 62 67 72 70" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <path d="M32 75 C42 73 58 73 68 75" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <path d="M36 79 C44 77 56 77 64 79" stroke="#3b82f6" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />

        {/* Scarf Hanging Tail */}
        <path
          d="M34 80 C33 86 35 94 38 98 C41 97 43 93 43 82 Z"
          fill="url(#scarfGrad)"
          stroke="#60a5fa"
          strokeWidth="0.8"
        />

        {/* 6. Suit / Armor */}
        <path d="M18 88 C24 84 32 82 38 82 L36 98 C28 96 22 94 18 88 Z" fill="#0c1830" stroke="#1e3a8a" strokeWidth="0.8" />
        <path d="M48 82 L64 98 L70 96 L56 82 Z" fill="#78350f" stroke="#b45309" strokeWidth="0.8" />

        {/* 7. Corner Accent Brackets */}
        <path d="M4 14 L4 4 L14 4" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M96 14 L96 4 L86 4" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M4 86 L4 96 L14 96" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M96 86 L96 96 L86 96" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    </div>
  );
};
