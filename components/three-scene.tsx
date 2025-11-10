'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // 简单的旋转动画
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group>
      {/* 主要几何体 - 一个炫酷的科技感物体 */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial 
          color="#00ff88"
          metalness={0.8}
          roughness={0.2}
          emissive="#00ff88"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* 环绕的粒子效果 */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 3;
        return (
          <mesh 
            key={i} 
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full">
      <Canvas style={{ background: 'transparent' }}>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        {/* 光照 */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1}
          castShadow
        />
        
        {/* 3D 模型 */}
        <AnimatedModel />
      </Canvas>
    </div>
  );
}