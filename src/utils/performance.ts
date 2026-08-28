import { PerformanceTier } from '../types';

export function detectPerformanceTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'high';

  // 1. Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return 'low';
  }

  // 2. Mobile screen detection
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  // 3. Hardware concurrency (CPU cores)
  const logicalProcessors = navigator.hardwareConcurrency || 4;

  // 4. Device Memory (if supported in Chrome/Edge)
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;

  // 5. Basic WebGL GPU probing
  let hasHighEndGpu = true;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      return 'low';
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      // Check for low-power mobile or software renderers
      if (
        /SwiftShader|llvmpipe|Mali-400|Adreno 3|Intel HD Graphics/i.test(renderer)
      ) {
        hasHighEndGpu = false;
      }
    }
  } catch {
    hasHighEndGpu = false;
  }

  if (isMobile) {
    return logicalProcessors >= 6 && deviceMemory >= 6 && hasHighEndGpu ? 'medium' : 'low';
  }

  if (isTablet) {
    return hasHighEndGpu ? 'medium' : 'low';
  }

  if (logicalProcessors >= 8 && deviceMemory >= 8 && hasHighEndGpu) {
    return 'high';
  }

  if (logicalProcessors >= 4 && deviceMemory >= 4) {
    return 'medium';
  }

  return 'low';
}
