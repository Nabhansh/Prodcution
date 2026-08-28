import React, { useEffect, useRef } from 'react';

export type CursorType = 'default' | 'view' | 'drag' | 'explore' | 'build' | 'pointer';

interface CustomCursorProps {
  cursorType: CursorType;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorType }) => {
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    // Check if touch device
    if (typeof window !== 'undefined') {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Animation Loop: Butter-smooth hardware accelerated 60-120fps lerp
    const loop = () => {
      if (isVisible.current) {
        // Lerp outer ring
        const lerpFactor = 0.22;
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

        if (outerRingRef.current) {
          outerRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
        }

        if (innerDotRef.current) {
          innerDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        }
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const isSpecial = cursorType !== 'default' && cursorType !== 'pointer';

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 opacity-0 hidden md:block"
    >
      {/* Trailing Outer Ring */}
      <div
        ref={outerRingRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center will-change-transform transition-[width,height,background-color,border-color] duration-150 ease-out ${
          isSpecial
            ? 'w-14 h-14 -ml-7 -mt-7 bg-blue-500/20 border border-blue-400 backdrop-blur-[2px] shadow-[0_0_20px_rgba(59,130,246,0.5)]'
            : cursorType === 'pointer'
            ? 'w-10 h-10 -ml-5 -mt-5 bg-white/10 border border-white/60'
            : 'w-6 h-6 -ml-3 -mt-3 border border-blue-400/70 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
        }`}
      >
        {isSpecial && (
          <span
            ref={labelRef}
            className="text-[9px] font-mono font-bold tracking-widest text-blue-200 uppercase pointer-events-none select-none"
          >
            {cursorType}
          </span>
        )}
      </div>

      {/* Center Precision Point */}
      <div
        ref={innerDotRef}
        className={`fixed top-0 left-0 rounded-full will-change-transform ${
          isSpecial
            ? 'w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-blue-300'
            : 'w-2 h-2 -ml-1 -mt-1 bg-white shadow-[0_0_8px_#ffffff]'
        }`}
      />
    </div>
  );
};
