import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// Realistic Polished Silver Chrome & Titanium 3D Sculpture
function LiquidChromeSculpture({ mousePos, scrollProgress }) {
  const meshRef = useRef();
  const mouseLightRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Slow, graceful fluid rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12;
      meshRef.current.rotation.y = t * 0.16;
      meshRef.current.rotation.z = Math.sin(t * 0.18) * 0.08;

      // Subtle mouse responsive inertia
      const targetX = (mousePos?.current?.y || 0) * 0.45;
      const targetY = (mousePos?.current?.x || 0) * 0.55;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX + t * 0.1, 0.035);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY + t * 0.14, 0.035);
    }

    // Scroll-linked cinematic transformation
    if (groupRef.current && scrollProgress) {
      const scrollVal = scrollProgress.current || 0;
      groupRef.current.rotation.y = scrollVal * Math.PI * 0.6;
      groupRef.current.rotation.z = scrollVal * 0.3;
      groupRef.current.position.y = -scrollVal * 1.2;
      const targetScale = Math.max(0.8, 1 - scrollVal * 0.2);
      groupRef.current.scale.setScalar(targetScale);
    }

    // Dynamic cursor reflection light
    if (mouseLightRef.current && mousePos?.current) {
      mouseLightRef.current.position.x = THREE.MathUtils.lerp(
        mouseLightRef.current.position.x,
        mousePos.current.x * 7,
        0.06
      );
      mouseLightRef.current.position.y = THREE.MathUtils.lerp(
        mouseLightRef.current.position.y,
        mousePos.current.y * 7,
        0.06
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Specular dynamic light following the cursor */}
      <pointLight
        ref={mouseLightRef}
        position={[0, 0, 6]}
        intensity={3.8}
        color="#ffffff"
        distance={16}
      />

      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh ref={meshRef} castShadow receiveShadow scale={1.25}>
          {/* Elegant geometric Mobius Torus Knot */}
          <torusKnotGeometry args={[1.3, 0.42, 280, 64, 2, 3]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.99}
            roughness={0.035}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            reflectivity={1.0}
            envMapIntensity={3.0}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroCanvas({ mousePos, scrollProgress }) {
  return (
    <div className="w-full h-[520px] sm:h-[600px] lg:h-[680px] relative pointer-events-none select-none flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 44 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.28,
        }}
        dpr={[1, 2]}
      >
        {/* Ambient Illumination */}
        <ambientLight intensity={1.1} />

        {/* Three-Point Studio Lighting with Pure Silver Highlights */}
        <directionalLight position={[10, 10, 8]} intensity={4.5} color="#ffffff" />
        <directionalLight position={[-10, 4, -4]} intensity={3.5} color="#38bdf8" />
        <directionalLight position={[0, -10, 4]} intensity={1.6} color="#e2e8f0" />
        <directionalLight position={[-8, -6, 6]} intensity={2.2} color="#ffffff" />

        {/* Realistic Studio Environment Reflection using Lightformers */}
        <Environment>
          <Lightformer
            form="rect"
            intensity={4.5}
            position={[0, 10, 2]}
            scale={[12, 6, 1]}
            target={[0, 0, 0]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={3.8}
            position={[10, 2, 4]}
            scale={[10, 5, 1]}
            target={[0, 0, 0]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={3.6}
            position={[-10, 0, -2]}
            scale={[10, 10, 1]}
            target={[0, 0, 0]}
            color="#38bdf8"
          />
          <Lightformer
            form="circle"
            intensity={2.2}
            position={[0, -6, 4]}
            scale={[6, 6, 1]}
            target={[0, 0, 0]}
            color="#e2e8f0"
          />
        </Environment>

        <LiquidChromeSculpture mousePos={mousePos} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
