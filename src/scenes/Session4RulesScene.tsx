import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

export const Session4RulesScene: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      title: 'Tầng 1: Root Workspace CLAUDE.md',
      desc: 'Quy tắc toàn công ty: Phong cách lập trình, tiêu chuẩn chung, bảo mật API.',
      radius: 3.2,
      color: '#64748B',
    },
    {
      title: 'Tầng 2: Project Profile Context',
      desc: 'Quy chuẩn riêng của dự án: Cao độ, tiêu chuẩn PCCC, mác bê tông, danh mục cửa.',
      radius: 2.2,
      color: '#0284C7',
    },
    {
      title: 'Tầng 3: Subdirectory Task Rule',
      desc: 'Nội quy chuyên trách: Hướng dẫn script Blender, quy định layer AutoCAD.',
      radius: 1.2,
      color: '#F26B1D',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="p-3 bg-[#0B1E33] border border-[#1C3B5E] rounded-lg text-xs font-mono text-white flex items-center justify-between">
        <div>
          <span className="text-[#F26B1D] font-bold">3 TẦNG CLAUDE.MD: </span>
          <span>"Nội quy khác với Khóa cửa" — Phân cấp bảo vệ và chỉ dẫn ngữ cảnh</span>
        </div>
      </div>

      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#071321] border border-[#1C3B5E]">
        <Canvas camera={{ position: [0, 4, 8], fov: 45 }} frameloop="demand">
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <color attach="background" args={['#081524']} />

          {/* 3 Concentric Nested Shells */}
          {layers.map((layer, idx) => {
            const isSelected = activeLayer === idx;
            return (
              <group
                key={idx}
                onClick={() => setActiveLayer(idx)}
                onPointerOver={() => setActiveLayer(idx)}
              >
                <mesh>
                  <sphereGeometry args={[layer.radius, 32, 16]} />
                  <meshStandardMaterial
                    color={layer.color}
                    wireframe
                    transparent
                    opacity={isSelected ? 0.9 : 0.3}
                  />
                </mesh>
              </group>
            );
          })}

          {/* Center Safe Core ("Khóa cửa / Sandbox") */}
          <mesh>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="#10B981" />
          </mesh>

          <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={4} maxDistance={15} />
        </Canvas>

        {/* Selected Layer Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-[#0B1E33]/90 border border-[#F26B1D] p-3 rounded text-xs font-mono text-white backdrop-blur-md">
          <div className="text-[#F26B1D] font-bold text-sm mb-1">
            {layers[activeLayer].title}
          </div>
          <div className="text-gray-300 font-sans">{layers[activeLayer].desc}</div>
        </div>
      </div>
    </div>
  );
};
