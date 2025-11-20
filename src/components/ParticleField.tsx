import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const particleCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const z = positions[i3 + 2];
        
        const distance = Math.sqrt(
          Math.pow(x - mousePosition.current.x * 10, 2) +
          Math.pow(z - mousePosition.current.y * 10, 2)
        );
        
        if (distance < 2) {
          positions[i3 + 1] += Math.sin(state.clock.getElapsedTime() * 2) * 0.02;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (event.point) {
      mousePosition.current = {
        x: event.point.x / 10,
        y: event.point.z / 10
      };
    }
  };

  return (
    <points ref={particlesRef} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="hsl(120, 100%, 35%)"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ParticleField = () => {
  return (
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleField;
