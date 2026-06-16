'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Particles - Create cinematic bokeh circles with varying depths
    const particlesCount = 250; // High quality but optimized
    const positions = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);
    const randomScales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Spread out in a 3D volume
      positions[i] = (Math.random() - 0.5) * 22; // X
      positions[i + 1] = (Math.random() - 0.5) * 16; // Y
      positions[i + 2] = (Math.random() - 0.5) * 8; // Z (depth variation)

      originalPositions[i] = positions[i];
      originalPositions[i + 1] = positions[i + 1];
      originalPositions[i + 2] = positions[i + 2];

      randomScales[i / 3] = 0.4 + Math.random() * 0.8;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    // Create a beautiful circular bokeh canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(212, 178, 111, 0.5)'); // Core Gold
      gradient.addColorStop(0.2, 'rgba(212, 178, 111, 0.25)'); // Mid glow
      gradient.addColorStop(0.6, 'rgba(99, 102, 241, 0.05)'); // Soft indigo ring
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.22,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 5. Mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera drift (parallax tracking mouse)
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;
      
      camera.position.x = targetX * 1.5;
      camera.position.y = targetY * 1.5;
      camera.lookAt(scene.position);

      // Animate particles in a complex mathematical wave simulation
      const positionsArray = particlesGeometry.attributes.position.array as Float32Array;
      const time = Date.now() * 0.0003;
      
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        
        // Add vertical floating drift
        positionsArray[idx + 1] = originalPositions[idx + 1] + Math.sin(time + originalPositions[idx] * 0.3) * 0.6;
        
        // Add horizontal sway
        positionsArray[idx] = originalPositions[idx] + Math.cos(time * 0.5 + originalPositions[idx + 2] * 0.4) * 0.4;
        
        // Add breathing depth effect
        positionsArray[idx + 2] = originalPositions[idx + 2] + Math.sin(time * 0.2 + idx) * 0.3;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Slow overall rotation
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[-1] opacity-75"
      />
      
      {/* Cinematic Color Spotlights / Light Leaks */}
      <div className="fixed top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-accent/6 blur-[120px] pointer-events-none mix-blend-screen z-[-2]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-500/5 blur-[160px] pointer-events-none mix-blend-screen z-[-2]" />
      <div className="fixed top-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-amber-500/3 blur-[120px] pointer-events-none mix-blend-screen z-[-2]" />
      <div className="fixed bottom-[10%] left-[10%] w-[35%] h-[45%] rounded-full bg-purple-500/2 blur-[100px] pointer-events-none mix-blend-screen z-[-2]" />
    </>
  );
}
