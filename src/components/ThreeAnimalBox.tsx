import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { ANIMALS, Animal } from '../data/animals';
import { playAnimalSound, speakText } from '../audio/animalSounds';
import confetti from 'canvas-confetti';
import { RefreshCw } from 'lucide-react';

interface ToyBlock3DProps {
  animal: Animal;
  position: [number, number, number];
}

const ToyBlock3D: React.FC<ToyBlock3DProps> = ({ animal, position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Floating & 3D rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      if (active) {
        groupRef.current.rotation.x += delta * 6;
        groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 12) * 0.4;
      }
    }
  });

  const handleTap = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setActive(true);

    // 1. Play real animal sound MP3
    playAnimalSound(animal.id);

    // 2. Voice pronunciation
    speakText(`${animal.name}! ${animal.soundName}`);

    // 3. Confetti burst
    try {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#FFD166', '#EF476F', '#06D6A0', '#118AB2']
      });
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setActive(false);
    }, 1000);
  };

  const blockColor = active ? '#FBBF24' : hovered ? '#F472B6' : '#38BDF8';

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={groupRef}
        position={position}
        onClick={handleTap}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={active ? 1.3 : hovered ? 1.15 : 1.0}
      >
        {/* Outer 3D Toy Cube */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 2.4, 0.8]} />
          <meshStandardMaterial
            color={blockColor}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* 3D Shiny White Inner Card */}
        <mesh position={[0, 0, 0.41]}>
          <planeGeometry args={[2.0, 2.2]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>

        {/* Big Emoji Graphic */}
        <Text
          position={[0, 0.2, 0.45]}
          fontSize={1.3}
          anchorX="center"
          anchorY="middle"
        >
          {animal.emoji}
        </Text>

        {/* 3D Animal Name */}
        <Text
          position={[0, -0.75, 0.46]}
          fontSize={0.3}
          color="#0F172A"
          anchorX="center"
          anchorY="middle"
        >
          {animal.name}
        </Text>

        {/* Sparkles around active block */}
        {active && (
          <Sparkles count={20} scale={3} size={6} speed={1.5} color="#FFD166" />
        )}
      </group>
    </Float>
  );
};

export const ThreeAnimalBox: React.FC = () => {
  const [page, setPage] = useState(0);
  
  const animalsPerPage = 8;
  const totalPages = Math.ceil(ANIMALS.length / animalsPerPage);
  const currentAnimals = ANIMALS.slice(page * animalsPerPage, (page + 1) * animalsPerPage);

  const getPosition = (index: number): [number, number, number] => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    return [(col - 1.5) * 2.7, (0.5 - row) * 2.9, 0];
  };

  const nextPage = () => {
    setPage((p) => (p + 1) % totalPages);
  };

  return (
    <div className="w-full h-[calc(100vh-3.5rem)] mt-14 relative bg-slate-900 overflow-hidden select-none">
      
      {/* 3D Header Overlay */}
      <div className="absolute top-3 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-xl border border-yellow-400 pointer-events-auto flex items-center gap-1.5">
          <span className="text-lg">✨</span>
          <span className="text-xs sm:text-sm font-black text-slate-900">
            3D Toy Box (Tap to Spin & Hear!)
          </span>
        </div>

        <button
          onClick={nextPage}
          className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-slate-950 px-3 py-1 rounded-full font-black text-xs shadow-xl border border-yellow-500 flex items-center gap-1.5 pointer-events-auto transition-transform"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>More Animals ({page + 1}/{totalPages})</span>
        </button>
      </div>

      {/* 3D Canvas Scene wrapped in Suspense */}
      <Suspense fallback={
        <div className="w-full h-full flex flex-col items-center justify-center text-white">
          <div className="text-5xl animate-bounce mb-3">🎲</div>
          <p className="text-lg font-bold">Loading 3D Toy Box...</p>
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 8.5], fov: 50 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 12, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#EC4899" />
          
          <Sparkles count={100} scale={15} size={5} speed={0.4} color="#FBBF24" />

          {currentAnimals.map((animal, idx) => (
            <ToyBlock3D key={animal.id} animal={animal} position={getPosition(idx)} />
          ))}

          <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={15} blur={2} far={4} color="#000000" />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
        </Canvas>
      </Suspense>
    </div>
  );
};
