import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';

export const Session1Scene: React.FC = () => {
  const [activePedestal, setActivePedestal] = useState<number | null>(null);

  const levels = [
    {
      id: 0,
      title: 'CẤP 1: CHATBOT',
      sub: 'Hỏi - đáp độc lập',
      desc: 'Mô hình chat đơn lẻ không ngữ cảnh dự án. Dễ bị ảo giác (hallucination) và quên dữ liệu sau mỗi phiên.',
      color: '#64748B',
      pos: [-4, 0, 0] as [number, number, number],
    },
    {
      id: 1,
      title: 'CẤP 2: AI WORKSPACE',
      sub: 'Ngữ cảnh dự án hoàn chỉnh',
      desc: 'Bộ não dự án: Lưu trữ tiêu chuẩn PCCC, quy cách vật liệu, tệp CLAUDE.md và bộ hồ sơ thiết kế.',
      color: '#0284C7',
      pos: [0, 0, 0] as [number, number, number],
    },
    {
      id: 2,
      title: 'CẤP 3: AI AGENT',
      sub: 'Tự chủ & Phối hợp',
      desc: 'Tổ hợp tác tử chuyên trách tự dùng công cụ CAD/BOQ, kiểm tra chéo và bàn giao theo chuẩn HITL.',
      color: '#F26B1D',
      pos: [4, 0, 0] as [number, number, number],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#071321] border border-[#1C3B5E]">
        <Canvas camera={{ position: [0, 6, 10], fov: 45 }} frameloop="demand">
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <color attach="background" args={['#081524']} />

          {/* 3 Pedestals */}
          {levels.map((lvl) => {
            const isHovered = activePedestal === lvl.id;
            return (
              <group
                key={lvl.id}
                position={lvl.pos}
                onPointerOver={() => setActivePedestal(lvl.id)}
                onPointerOut={() => setActivePedestal(null)}
              >
                {/* Cylinder Base */}
                <mesh position={[0, -0.5, 0]}>
                  <cylinderGeometry args={[1.5, 1.7, 1, 32]} />
                  <meshStandardMaterial
                    color={lvl.color}
                    roughness={0.4}
                    emissive={isHovered ? lvl.color : '#000000'}
                    emissiveIntensity={isHovered ? 0.3 : 0}
                  />
                </mesh>

                {/* Floating Core Icon / Cube */}
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                  <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[0.8, 0.8, 0.8]} />
                    <meshStandardMaterial
                      color={isHovered ? '#FFFFFF' : lvl.color}
                      wireframe={!isHovered}
                    />
                  </mesh>
                </Float>

                {/* 3D Label */}
                <Text
                  position={[0, -1.3, 0]}
                  fontSize={0.25}
                  color="#FFFFFF"
                  anchorX="center"
                  anchorY="middle"
                >
                  {lvl.title}
                </Text>
              </group>
            );
          })}

          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.05} minDistance={6} maxDistance={20} />
        </Canvas>

        {/* Hover Definition Card Overlay */}
        <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-[#0B1E33]/90 border border-[#F26B1D] p-4 rounded-lg text-xs font-mono text-white backdrop-blur-md">
          {activePedestal !== null ? (
            <div>
              <div className="font-bold text-[#F26B1D] text-sm mb-1">
                {levels[activePedestal].title}
              </div>
              <div className="text-gray-400 mb-2">{levels[activePedestal].sub}</div>
              <p className="text-gray-200 font-sans leading-relaxed">
                {levels[activePedestal].desc}
              </p>
            </div>
          ) : (
            <div className="text-gray-400 italic">
              * Di chuột hoặc chạm vào 3 bệ nổi 3D để xem định nghĩa trích xuất từ giáo trình Buổi 01.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
