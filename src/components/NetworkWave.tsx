'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NetworkWave() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    // Use a perspective camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 150;
    camera.position.y = 50;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particles Configuration
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number, y: number, z: number }[] = [];

    // Initialize particle positions and velocities
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400; // z

      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5,
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material (#1DBF73 Fiverr Green)
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x1dbf73,
      size: 1.5,
      transparent: true,
      opacity: 0.8,
    });

    const pointCloud = new THREE.Points(particles, particleMaterial);
    scene.add(pointCloud);

    // Lines geometry (updated dynamically)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1dbf73,
      transparent: true,
      opacity: 0.2,
    });
    
    // We will use a lines object with a maximum possible number of segments
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.005;

      const positions = pointCloud.geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        // Drift
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        // Wave logic based on x and z
        positions[i * 3 + 1] += Math.sin(time + positions[i * 3] * 0.05) * 0.2;

        // Boundary bounce
        if (positions[i * 3] > 200 || positions[i * 3] < -200) velocities[i].x *= -1;
        if (positions[i * 3 + 1] > 100 || positions[i * 3 + 1] < -100) velocities[i].y *= -1;
        if (positions[i * 3 + 2] > 200 || positions[i * 3 + 2] < -200) velocities[i].z *= -1;
      }

      pointCloud.geometry.attributes.position.needsUpdate = true;

      // Connect close particles with lines
      const linePosArray = lineMesh.geometry.attributes.position.array as Float32Array;
      const maxDistance = 50;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePosArray[lineIndex * 6] = positions[i * 3];
            linePosArray[lineIndex * 6 + 1] = positions[i * 3 + 1];
            linePosArray[lineIndex * 6 + 2] = positions[i * 3 + 2];

            linePosArray[lineIndex * 6 + 3] = positions[j * 3];
            linePosArray[lineIndex * 6 + 4] = positions[j * 3 + 1];
            linePosArray[lineIndex * 6 + 5] = positions[j * 3 + 2];

            lineIndex++;
          }
        }
      }

      lineMesh.geometry.setDrawRange(0, lineIndex * 2);
      lineMesh.geometry.attributes.position.needsUpdate = true;

      // Slow rotation of entire scene
      scene.rotation.y = time * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const currentMount = mountRef.current;
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0" />;
}
