import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArchetypeId, StyleId, PerformanceTier } from '../types';

interface Configurator3DPreviewProps {
  archetype: ArchetypeId;
  style: StyleId;
  addonsCount: number;
  performanceTier?: PerformanceTier;
}

export const Configurator3DPreview: React.FC<Configurator3DPreviewProps> = ({
  archetype,
  style,
  addonsCount,
  performanceTier = 'high',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshRef = useRef<THREE.Mesh | null>(null);
  const archetypeArtifactsGroupRef = useRef<THREE.Group | null>(null);
  const satellitesGroupRef = useRef<THREE.Group | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);
  const rimLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const isLowOrMobile = performanceTier === 'low';
    const isMedium = performanceTier === 'medium';

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowOrMobile,
      powerPreference: isLowOrMobile ? 'low-power' : 'high-performance',
    });
    renderer.setSize(width, height);

    const dpr = isLowOrMobile ? 1 : isMedium ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 2.5, 20);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);
    lightRef.current = pointLight;

    const rimLight = new THREE.PointLight(0x8b5cf6, 1.8, 15);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Satellites for add-ons
    const satellitesGroup = new THREE.Group();
    scene.add(satellitesGroup);
    satellitesGroupRef.current = satellitesGroup;

    // Archetype specific physical artifact elements
    const archetypeArtifacts = new THREE.Group();
    scene.add(archetypeArtifacts);
    archetypeArtifactsGroupRef.current = archetypeArtifacts;

    // Central dynamic archetype core
    const geo = getGeometryForArchetype(archetype);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.35,
      roughness: 0.18,
      metalness: 0.85,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    meshRef.current = mesh;

    const wireGeo = geo.clone();
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.scale.set(1.18, 1.18, 1.18);
    scene.add(wireMesh);
    wireMeshRef.current = wireMesh;

    let animationFrameId: number;
    let startTime = performance.now() / 1000;
    let elapsed = 0;
    let isPaused = false;

    const onVisibility = () => {
      if (document.hidden) {
        isPaused = true;
      } else {
        startTime = performance.now() / 1000 - elapsed;
        isPaused = false;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isPaused) return;

      elapsed = performance.now() / 1000 - startTime;

      if (meshRef.current) {
        meshRef.current.rotation.x = elapsed * 0.22;
        meshRef.current.rotation.y = elapsed * 0.32;
      }
      if (wireMeshRef.current) {
        wireMeshRef.current.rotation.x = -elapsed * 0.16;
        wireMeshRef.current.rotation.y = -elapsed * 0.24;
      }
      if (satellitesGroupRef.current) {
        satellitesGroupRef.current.rotation.y = elapsed * 0.45;
        satellitesGroupRef.current.children.forEach((sat, idx) => {
          const baseY = sat.userData.baseY !== undefined ? sat.userData.baseY : 0;
          sat.position.y = baseY + Math.sin(elapsed * 2.0 + idx) * 0.08;
        });
      }
      if (archetypeArtifactsGroupRef.current) {
        archetypeArtifactsGroupRef.current.rotation.y = -elapsed * 0.2;
        archetypeArtifactsGroupRef.current.children.forEach((child, idx) => {
          const baseY = child.userData.baseY !== undefined ? child.userData.baseY : 0;
          child.position.y = baseY + Math.sin(elapsed * 1.5 + idx) * 0.08;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [performanceTier]);

  // Update Geometry and Physical Sub-Panels when Archetype or Style changes
  useEffect(() => {
    if (!meshRef.current || !wireMeshRef.current || !archetypeArtifactsGroupRef.current) return;

    // 1. Update Core Geometry
    const newGeo = getGeometryForArchetype(archetype);
    meshRef.current.geometry.dispose();
    wireMeshRef.current.geometry.dispose();
    meshRef.current.geometry = newGeo;
    wireMeshRef.current.geometry = newGeo.clone();

    // 2. Clear old sub-artifacts
    const artGroup = archetypeArtifactsGroupRef.current;
    while (artGroup.children.length > 0) {
      const child = artGroup.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (child.material) (child.material as THREE.Material).dispose();
      artGroup.remove(child);
    }

    // 3. Build Archetype-specific physical 3D scene elements
    const { lightColor } = getColorsForStyle(style);

    if (archetype === 'developer') {
      // Floating code plane panels
      const panelGeo = new THREE.PlaneGeometry(1.2, 0.7);
      const panelMat = new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const p1 = new THREE.Mesh(panelGeo, panelMat);
      p1.position.set(-1.8, 0.6, -0.4);
      p1.userData.baseY = 0.6;
      p1.rotation.y = 0.5;
      const p2 = new THREE.Mesh(panelGeo, panelMat);
      p2.position.set(1.8, -0.5, -0.2);
      p2.userData.baseY = -0.5;
      p2.rotation.y = -0.5;
      artGroup.add(p1, p2);
    } else if (archetype === 'designer') {
      // Visual artboard frames
      const ringGeo = new THREE.TorusGeometry(2.0, 0.02, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: lightColor,
        transparent: true,
        opacity: 0.4,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.userData.baseY = 0;
      ring.rotation.x = Math.PI / 3;
      artGroup.add(ring);
    } else if (archetype === 'creator') {
      // Media node planes
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const boxGeo = new THREE.BoxGeometry(0.3, 0.4, 0.05);
        const boxMat = new THREE.MeshStandardMaterial({
          color: 0x0b0f19,
          emissive: lightColor,
          emissiveIntensity: 0.3,
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        const initialY = Math.sin(angle) * 0.6;
        box.position.set(Math.cos(angle) * 1.8, initialY, Math.sin(angle) * 1.8);
        box.userData.baseY = initialY;
        artGroup.add(box);
      }
    } else if (archetype === 'founder') {
      // Venture orbital rings
      const torusGeo = new THREE.TorusGeometry(1.9, 0.04, 8, 48);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const t1 = new THREE.Mesh(torusGeo, torusMat);
      t1.userData.baseY = 0;
      t1.rotation.x = Math.PI / 4;
      const t2 = new THREE.Mesh(torusGeo, torusMat);
      t2.userData.baseY = 0;
      t2.rotation.y = Math.PI / 4;
      artGroup.add(t1, t2);
    }
  }, [archetype, style]);

  // Update Colors & Materials when Style changes
  useEffect(() => {
    if (!meshRef.current || !wireMeshRef.current || !lightRef.current || !rimLightRef.current) return;
    const { color, emissive, lightColor, rimColor } = getColorsForStyle(style);
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    const wireMat = wireMeshRef.current.material as THREE.MeshBasicMaterial;

    mat.color.setHex(color);
    mat.emissive.setHex(emissive);
    wireMat.color.setHex(lightColor);
    lightRef.current.color.setHex(lightColor);
    rimLightRef.current.color.setHex(rimColor);
  }, [style]);

  // Update Satellite Nodes when Addons change
  useEffect(() => {
    if (!satellitesGroupRef.current) return;
    const group = satellitesGroupRef.current;
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (child.material) (child.material as THREE.Material).dispose();
      group.remove(child);
    }

    const count = Math.min(addonsCount, 8);
    if (count === 0) return;

    const satGeo = new THREE.OctahedronGeometry(0.12, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2;
      const sat = new THREE.Mesh(satGeo, satMat);
      const initialY = Math.sin(angle * 2) * 0.4;
      sat.position.set(Math.cos(angle) * radius, initialY, Math.sin(angle) * radius);
      sat.userData.baseY = initialY;
      group.add(sat);
    }
  }, [addonsCount]);

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden glass bg-[#05070d]/85 border border-blue-500/25 flex items-center justify-center shadow-2xl">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      <div className="absolute top-3 left-3 flex items-center gap-2 glass px-3 py-1 rounded-full border border-blue-500/30 text-[11px] font-mono text-blue-400">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        LIVE 3D SIMULATION // {archetype.toUpperCase()}
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/60 bg-black/70 px-2.5 py-1 rounded border border-white/10">
        STYLE: {style.toUpperCase()} • REALTIME 3D
      </div>
    </div>
  );
};

function getGeometryForArchetype(archetype: ArchetypeId): THREE.BufferGeometry {
  switch (archetype) {
    case 'developer':
      return new THREE.BoxGeometry(1.4, 1.4, 1.4);
    case 'designer':
      return new THREE.TorusGeometry(1.0, 0.4, 16, 40);
    case 'creator':
      return new THREE.DodecahedronGeometry(1.25);
    case 'professional':
      return new THREE.OctahedronGeometry(1.35);
    case 'founder':
      return new THREE.TorusKnotGeometry(0.85, 0.26, 52, 16);
    case 'student':
    default:
      return new THREE.IcosahedronGeometry(1.25, 1);
  }
}

function getColorsForStyle(style: StyleId) {
  switch (style) {
    case 'luxury':
      return { color: 0x1c1917, emissive: 0x78350f, lightColor: 0xd97706, rimColor: 0xf59e0b };
    case 'dark':
    case 'brutalist':
      return { color: 0x022c22, emissive: 0x064e3b, lightColor: 0x10b981, rimColor: 0x34d399 };
    case 'spatial3d':
      return { color: 0x1e1b4b, emissive: 0x4c1d95, lightColor: 0xf43f5e, rimColor: 0x3b82f6 };
    case 'bold':
    case 'creative':
      return { color: 0x3b0764, emissive: 0x7e22ce, lightColor: 0xa855f7, rimColor: 0xf43f5e };
    case 'minimal':
      return { color: 0x0f172a, emissive: 0x1e293b, lightColor: 0x64748b, rimColor: 0x94a3b8 };
    case 'editorial':
      return { color: 0x111827, emissive: 0x374151, lightColor: 0xe2e8f0, rimColor: 0x94a3b8 };
    case 'cyber':
    case 'futuristic':
    default:
      return { color: 0x082f49, emissive: 0x0369a1, lightColor: 0x06b6d4, rimColor: 0x3b82f6 };
  }
}
