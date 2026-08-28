import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { StyleId, PerformanceTier } from '../types';

interface StudioCanvasProps {
  currentSection: string;
  configuratorStyle?: StyleId;
  performanceTier?: PerformanceTier;
  isEasterEggActive?: boolean;
}

export const StudioCanvas: React.FC<StudioCanvasProps> = ({
  currentSection,
  configuratorStyle = 'futuristic',
  performanceTier = 'high',
  isEasterEggActive = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshRef = useRef<THREE.Mesh | null>(null);
  const floatingCardsRef = useRef<THREE.Group[]>([]);
  const pricingPedestalsRef = useRef<THREE.Group | null>(null);
  const gridFloorRef = useRef<THREE.GridHelper | null>(null);
  const cursorPointLightRef = useRef<THREE.PointLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);
  const accentLightRef = useRef<THREE.PointLight | null>(null);

  // Target camera waypoints for continuous 3D spatial journey
  const targetCameraPos = useRef(new THREE.Vector3(0, 0, 9.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Mouse inertia coordinates
  const mouseCoords = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isLow = performanceTier === 'low';
    const isMed = performanceTier === 'medium';

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020204, 0.04);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 9.5);
    cameraRef.current = camera;

    // 3. Renderer with hardware adaptation
    const renderer = new THREE.WebGLRenderer({
      antialias: !isLow,
      alpha: true,
      powerPreference: 'high-performance',
      precision: isLow ? 'mediump' : 'highp',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLow ? 1.0 : isMed ? 1.25 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio 3D Lighting System (Key, Rim, Ambient, Cursor-Tracking Point)
    const ambientLight = new THREE.AmbientLight(0x0a1020, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x3b82f6, 1.8);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.PointLight(0x8b5cf6, 2.5, 35);
    rimLight.position.set(-6, -3, -2);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const accentLight = new THREE.PointLight(0x06b6d4, 2.0, 30);
    accentLight.position.set(4, -4, 3);
    scene.add(accentLight);
    accentLightRef.current = accentLight;

    // Cursor-reactive dynamic interactive light
    const cursorLight = new THREE.PointLight(0x60a5fa, 1.8, 15);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);
    cursorPointLightRef.current = cursorLight;

    // 5. Spatial Digital Grid Horizon
    const grid = new THREE.GridHelper(70, 45, 0x2563eb, 0x0f172a);
    grid.position.y = -3.5;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.22;
    scene.add(grid);
    gridFloorRef.current = grid;

    // 6. Master Objects Group (Digital Core & Orbiting 3D Browser Windows)
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);
    objectsGroupRef.current = objectsGroup;

    // Central Core: Polyhedral Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x070d1a,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
      roughness: 0.12,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    objectsGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Outer Holographic Wireframe Shell
    const wireGeo = new THREE.IcosahedronGeometry(2.15, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    objectsGroup.add(wireMesh);
    wireMeshRef.current = wireMesh;

    // Inner Radiant Pulsing Core
    const innerGeo = new THREE.OctahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    objectsGroup.add(innerMesh);

    // 7. Miniature 3D Browser Panels Orbiting in Hero World
    const miniBrowserGroup: THREE.Group[] = [];
    const cardBasePositions: { x: number; y: number; z: number; rotY: number }[] = [];
    const browserConfigs = [
      {
        pos: new THREE.Vector3(-3.8, 1.5, -0.5),
        rot: new THREE.Vector3(0.08, 0.35, -0.04),
        color: 0x10b981,
        title: 'DEVELOPER // CLI',
      },
      {
        pos: new THREE.Vector3(3.8, -0.8, -0.8),
        rot: new THREE.Vector3(-0.08, -0.38, 0.05),
        color: 0xf43f5e,
        title: 'DESIGNER // 3D',
      },
      {
        pos: new THREE.Vector3(-2.8, -2.4, 0.6),
        rot: new THREE.Vector3(0.18, 0.25, 0.08),
        color: 0x38bdf8,
        title: 'STUDENT // LAB',
      },
      {
        pos: new THREE.Vector3(3.2, 2.2, 0.3),
        rot: new THREE.Vector3(-0.15, -0.28, -0.06),
        color: 0xa855f7,
        title: 'CREATOR // MEDIA',
      },
    ];

    browserConfigs.forEach((cfg) => {
      const cardGroup = new THREE.Group();
      cardGroup.position.copy(cfg.pos);
      cardGroup.rotation.set(cfg.rot.x, cfg.rot.y, cfg.rot.z);

      // Glass backplate
      const plateGeo = new THREE.PlaneGeometry(2.3, 1.45);
      const plateMat = new THREE.MeshStandardMaterial({
        color: 0x050914,
        emissive: cfg.color,
        emissiveIntensity: 0.2,
        roughness: 0.15,
        metalness: 0.85,
        transparent: true,
        opacity: 0.82,
        side: THREE.DoubleSide,
      });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      cardGroup.add(plate);

      // Top browser titlebar
      const barGeo = new THREE.PlaneGeometry(2.3, 0.22);
      const barMat = new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.95,
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(0, 0.615, 0.01);
      cardGroup.add(bar);

      // Browser border frame
      const frameGeo = new THREE.EdgesGeometry(plateGeo);
      const frameMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.6,
      });
      const frame = new THREE.LineSegments(frameGeo, frameMat);
      cardGroup.add(frame);

      objectsGroup.add(cardGroup);
      miniBrowserGroup.push(cardGroup);
      cardBasePositions.push({
        x: cfg.pos.x,
        y: cfg.pos.y,
        z: cfg.pos.z,
        rotY: cfg.rot.y,
      });
    });
    floatingCardsRef.current = miniBrowserGroup;

    // 7.5. Physical 3D Pricing Pedestals Group (Anchored to 3 Pricing Cards)
    const pricingGroup = new THREE.Group();
    pricingGroup.position.set(0, -6, 0); // Initially lowered beneath grid
    scene.add(pricingGroup);
    pricingPedestalsRef.current = pricingGroup;

    const tierPillars = [
      { x: -3.6, color: 0x38bdf8, height: 1.8, shape: 'cylinder' },
      { x: 0.0, color: 0x8b5cf6, height: 2.4, shape: 'octahedron' },
      { x: 3.6, color: 0xf43f5e, height: 2.1, shape: 'box' },
    ];

    tierPillars.forEach((tier) => {
      const pillarGroup = new THREE.Group();
      pillarGroup.position.set(tier.x, 0, -1.0);

      // Holographic glowing geometric anchor
      let geo: THREE.BufferGeometry;
      if (tier.shape === 'cylinder') {
        geo = new THREE.CylinderGeometry(0.7, 0.9, tier.height, 16, 1, true);
      } else if (tier.shape === 'octahedron') {
        geo = new THREE.OctahedronGeometry(1.2, 0);
      } else {
        geo = new THREE.BoxGeometry(1.4, tier.height, 1.4);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: 0x050914,
        emissive: tier.color,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });

      const pillarMesh = new THREE.Mesh(geo, mat);
      pillarGroup.add(pillarMesh);

      // Floating crystalline topper
      const topGeo = new THREE.IcosahedronGeometry(0.35, 0);
      const topMat = new THREE.MeshBasicMaterial({
        color: tier.color,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      const topper = new THREE.Mesh(topGeo, topMat);
      topper.position.y = tier.height * 0.6 + 0.3;
      pillarGroup.add(topper);

      pricingGroup.add(pillarGroup);
    });

    // 8. Dynamic Particle Matrix System
    const particleCount = isLow ? 200 : isMed ? 600 : 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      particleScales[i] = Math.random() * 0.5 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isLow ? 0.08 : 0.05,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Pointer movement listener with smooth spring interpolation
    const handlePointerMove = (e: PointerEvent) => {
      mouseCoords.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseCoords.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 9. High-Performance Render Loop with Spring Physics
    let animationFrameId: number;
    let startTime = performance.now() / 1000;
    let elapsedTime = 0;
    let isTabHidden = false;

    const onVisibilityChange = () => {
      if (document.hidden) {
        isTabHidden = true;
      } else {
        startTime = performance.now() / 1000 - elapsedTime;
        isTabHidden = false;
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isTabHidden) return;

      elapsedTime = performance.now() / 1000 - startTime;

      // Smooth mouse spring inertia damping
      mouseCoords.current.x += (mouseCoords.current.targetX - mouseCoords.current.x) * 0.08;
      mouseCoords.current.y += (mouseCoords.current.targetY - mouseCoords.current.y) * 0.08;

      // Update Cursor Light in 3D Space
      if (cursorPointLightRef.current) {
        cursorPointLightRef.current.position.x = mouseCoords.current.x * 6;
        cursorPointLightRef.current.position.y = mouseCoords.current.y * 4;
      }

      // Smooth continuous camera fly-through interpolation
      if (cameraRef.current) {
        const mouseParallaxX = mouseCoords.current.x * 0.6;
        const mouseParallaxY = mouseCoords.current.y * 0.45;

        cameraRef.current.position.x += (targetCameraPos.current.x + mouseParallaxX - cameraRef.current.position.x) * 0.055;
        cameraRef.current.position.y += (targetCameraPos.current.y + mouseParallaxY - cameraRef.current.position.y) * 0.055;
        cameraRef.current.position.z += (targetCameraPos.current.z - cameraRef.current.position.z) * 0.055;

        currentLookAt.current.lerp(targetLookAt.current, 0.055);
        cameraRef.current.lookAt(currentLookAt.current);
      }

      // Rotate Digital Core & Holographic Shell
      const coreSpeed = isEasterEggActive ? 1.2 : 0.22;
      if (coreMeshRef.current && wireMeshRef.current) {
        coreMeshRef.current.rotation.y = elapsedTime * coreSpeed;
        coreMeshRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.18;

        wireMeshRef.current.rotation.y = -elapsedTime * (coreSpeed * 0.8);
        wireMeshRef.current.rotation.z = Math.cos(elapsedTime * 0.15) * 0.22;

        const pulseSpeed = isEasterEggActive ? 4.0 : 1.6;
        const breath = 1 + Math.sin(elapsedTime * pulseSpeed) * 0.035;
        wireMeshRef.current.scale.set(breath, breath, breath);
      }

      // Rotate inner octane
      if (innerMesh) {
        innerMesh.rotation.x = elapsedTime * 0.4;
        innerMesh.rotation.y = elapsedTime * 0.3;
      }

      // Float orbiting browser panels with gentle momentum (base + oscillation, no drift)
      floatingCardsRef.current.forEach((card, idx) => {
        const base = cardBasePositions[idx];
        if (base) {
          const offset = idx * 1.6;
          card.position.y = base.y + Math.sin(elapsedTime * 1.4 + offset) * 0.15;
          card.rotation.y = base.rotY + Math.cos(elapsedTime * 0.8 + offset) * 0.08;
        }
      });

      // Animate 3D Pricing Pedestals Elevation based on active section
      if (pricingPedestalsRef.current) {
        const targetPedestalY = currentSection === 'pricing' ? -0.8 : -7.0;
        pricingPedestalsRef.current.position.y += (targetPedestalY - pricingPedestalsRef.current.position.y) * 0.06;
        pricingPedestalsRef.current.rotation.y = elapsedTime * 0.15;
      }

      // Slowly rotate particle field
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * (isEasterEggActive ? 0.08 : 0.018);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [performanceTier, isEasterEggActive]);

  // Section-driven Camera Coordinates & Spatial Journey Navigation
  useEffect(() => {
    if (!keyLightRef.current || !rimLightRef.current || !accentLightRef.current || !coreMeshRef.current) return;

    // Easter Egg Cyber Overdrive mode
    if (isEasterEggActive) {
      targetCameraPos.current.set(0, 0, 6.8);
      targetLookAt.current.set(0, 0, 0);
      keyLightRef.current.color.setHex(0x10b981); // Matrix Emerald
      rimLightRef.current.color.setHex(0x06b6d4); // Cyan
      accentLightRef.current.color.setHex(0xec4899); // Neon Pink
      if (coreMeshRef.current) {
        (coreMeshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x059669);
      }
      if (wireMeshRef.current) {
        (wireMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(0x34d399);
      }
      return;
    }

    switch (currentSection) {
      case 'hero':
        // Hero: Front center, balanced panorama
        targetCameraPos.current.set(0, 0.1, 9.5);
        targetLookAt.current.set(0, 0, 0);
        keyLightRef.current.color.setHex(0x3b82f6);
        rimLightRef.current.color.setHex(0x8b5cf6);
        accentLightRef.current.color.setHex(0x38bdf8);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(0, 0, 0);
        break;

      case 'what-i-build':
      case 'archetypes':
        // Archetypes: Camera glides right, showing left-anchored core
        targetCameraPos.current.set(2.0, 0.4, 8.2);
        targetLookAt.current.set(0.6, 0, 0);
        keyLightRef.current.color.setHex(0x10b981);
        rimLightRef.current.color.setHex(0x3b82f6);
        accentLightRef.current.color.setHex(0x6ee7b7);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(-1.4, 0, 0);
        break;

      case 'portfolio':
      case 'work':
        // Portfolio: Camera dives left, opening center stage for 3D browser previews
        targetCameraPos.current.set(-2.2, -0.3, 7.8);
        targetLookAt.current.set(-0.8, 0, 0);
        keyLightRef.current.color.setHex(0xf43f5e);
        rimLightRef.current.color.setHex(0x8b5cf6);
        accentLightRef.current.color.setHex(0xfb7185);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(1.6, 0, 0);
        break;

      case 'before-after':
        // Before/After: Centered focal split coordinate plane
        targetCameraPos.current.set(0, 0, 7.2);
        targetLookAt.current.set(0, 0, 0);
        keyLightRef.current.color.setHex(0x38bdf8);
        rimLightRef.current.color.setHex(0x6366f1);
        accentLightRef.current.color.setHex(0x06b6d4);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(0, 0, 0);
        break;

      case 'configurator':
        // Configurator: Tight focus on transformative core
        targetCameraPos.current.set(2.4, 0.2, 6.8);
        targetLookAt.current.set(1.0, 0, 0);
        applyConfiguratorStyle(configuratorStyle as StyleId);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(-1.6, 0, 0.4);
        break;

      case 'pricing':
        // Pricing: Camera elevates looking slightly down at floating crystal platform
        targetCameraPos.current.set(0, -0.8, 8.8);
        targetLookAt.current.set(0, -0.3, 0);
        keyLightRef.current.color.setHex(0x6366f1);
        rimLightRef.current.color.setHex(0x38bdf8);
        accentLightRef.current.color.setHex(0xa855f7);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(0, 1.2, -1.0);
        break;

      case 'process':
        // Process: Dynamic leftward trajectory
        targetCameraPos.current.set(-2.2, 0.6, 8.0);
        targetLookAt.current.set(-0.9, 0.2, 0);
        keyLightRef.current.color.setHex(0x3b82f6);
        rimLightRef.current.color.setHex(0x10b981);
        accentLightRef.current.color.setHex(0x38bdf8);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(1.7, -0.3, 0);
        break;

      case 'testimonials':
      case 'faq':
        targetCameraPos.current.set(0, 0.3, 9.2);
        targetLookAt.current.set(0, 0, 0);
        keyLightRef.current.color.setHex(0x8b5cf6);
        rimLightRef.current.color.setHex(0x38bdf8);
        accentLightRef.current.color.setHex(0x6366f1);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(0, 0, 0);
        break;

      case 'contact':
        // Contact: Dramatic focal tunnel approach
        targetCameraPos.current.set(0, 0, 6.2);
        targetLookAt.current.set(0, 0, 0);
        keyLightRef.current.color.setHex(0x3b82f6);
        rimLightRef.current.color.setHex(0x60a5fa);
        accentLightRef.current.color.setHex(0x93c5fd);
        if (objectsGroupRef.current) objectsGroupRef.current.position.set(0, 0, 0.9);
        break;

      case 'footer':
        // Footer: Camera drifts into dark infinite horizon void
        targetCameraPos.current.set(0, -1.5, 11.0);
        targetLookAt.current.set(0, -0.5, 0);
        keyLightRef.current.color.setHex(0x1e293b);
        rimLightRef.current.color.setHex(0x0f172a);
        accentLightRef.current.color.setHex(0x334155);
        break;

      default:
        targetCameraPos.current.set(0, 0, 9.5);
        targetLookAt.current.set(0, 0, 0);
    }
  }, [currentSection, configuratorStyle, isEasterEggActive]);

  const applyConfiguratorStyle = (style: StyleId) => {
    if (!keyLightRef.current || !rimLightRef.current || !coreMeshRef.current || !wireMeshRef.current) return;

    const coreMat = coreMeshRef.current.material as THREE.MeshStandardMaterial;
    const wireMat = wireMeshRef.current.material as THREE.MeshBasicMaterial;

    switch (style) {
      case 'futuristic':
      case 'cyber':
        keyLightRef.current.color.setHex(0x06b6d4);
        rimLightRef.current.color.setHex(0xec4899);
        coreMat.emissive.setHex(0x0891b2);
        wireMat.color.setHex(0x22d3ee);
        break;

      case 'luxury':
        keyLightRef.current.color.setHex(0xf59e0b);
        rimLightRef.current.color.setHex(0xd97706);
        coreMat.emissive.setHex(0x78350f);
        wireMat.color.setHex(0xfbbf24);
        break;

      case 'spatial3d':
        keyLightRef.current.color.setHex(0xf43f5e);
        rimLightRef.current.color.setHex(0x3b82f6);
        coreMat.emissive.setHex(0xbe123c);
        wireMat.color.setHex(0x60a5fa);
        break;

      case 'dark':
      case 'brutalist':
        keyLightRef.current.color.setHex(0x10b981);
        rimLightRef.current.color.setHex(0x047857);
        coreMat.emissive.setHex(0x065f46);
        wireMat.color.setHex(0x34d399);
        break;

      case 'bold':
      case 'creative':
        keyLightRef.current.color.setHex(0xa855f7);
        rimLightRef.current.color.setHex(0xf43f5e);
        coreMat.emissive.setHex(0x7e22ce);
        wireMat.color.setHex(0xe879f9);
        break;

      case 'minimal':
      case 'editorial':
      default:
        keyLightRef.current.color.setHex(0x94a3b8);
        rimLightRef.current.color.setHex(0x475569);
        coreMat.emissive.setHex(0x1e293b);
        wireMat.color.setHex(0xcbd5e1);
        break;
    }
  };

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.98 }}
    />
  );
};
