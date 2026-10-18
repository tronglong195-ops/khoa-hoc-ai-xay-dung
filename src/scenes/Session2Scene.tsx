import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

export const Session2Scene: React.FC = () => {
  const [isPackaged, setIsPackaged] = useState<boolean>(false);

  const scatteredCards = [
    { text: 'Prompt 1: Kiểm tra PCCC', pos: [-3, 1.5, 0] },
    { text: 'Prompt 2: Tra mác bê tông', pos: [-2, -1.2, 1] },
    { text: 'Prompt 3: So sánh cửa KT-KC', pos: [2, 1.8, -1] },
    { text: 'Prompt 4: Lập phiếu RFI', pos: [3, -1.0, 0] },
    { text: 'Prompt 5: Thẩm định mác vữa', pos: [0, 2.2, 1.5] },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-[#0B1E33] border border-[#1C3B5E] rounded-lg text-xs font-mono text-white">
        <div>
          <strong>BẢN CHẤT CỦA SKILL:</strong> Gom 5 lượt chat rời rạc thành 1 Hộp Skill (SKILL.md) chuẩn hóa
        </div>
        <button
          onClick={() => setIsPackaged(!isPackaged)}
          className="px-3 py-1.5 rounded bg-[#F26B1D] text-white font-bold hover:bg-orange-600 transition-colors"
        >
          {isPackaged ? 'Tách Rời Chat' : 'Đóng Gói Thành SKILL.md'}
        </button>
      </div>

      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#071321] border border-[#1C3B5E]">
        <Canvas camera={{ position: [0, 4, 8], fov: 45 }} frameloop="demand">
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <color attach="background" args={['#081524']} />

          {/* Central Skill Container Box */}
          <group position={[0, 0, 0]}>
            <mesh>
              <boxGeometry args={[3, 2, 2]} />
              <meshStandardMaterial
                color={isPackaged ? '#F26B1D' : '#142D4B'}
                wireframe={!isPackaged}
                transparent
                opacity={isPackaged ? 0.9 : 0.3}
              />
            </mesh>
            <Text
              position={[0, 0, 1.05]}
              fontSize={0.25}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
            >
              {isPackaged ? 'SKILL: RA-SOAT-HO-SO.MD' : 'VÙNG ĐÓNG GÓI'}
            </Text>
          </group>

          {/* 5 Chat Cards */}
          {scatteredCards.map((card, idx) => {
            const currentPos: [number, number, number] = isPackaged
              ? [0, (idx - 2) * 0.3, 0]
              : (card.pos as [number, number, number]);

            return (
              <group key={idx} position={currentPos}>
                <mesh>
                  <boxGeometry args={[1.6, 0.4, 0.05]} />
                  <meshStandardMaterial color={isPackaged ? '#10B981' : '#38BDF8'} />
                </mesh>
                <Text
                  position={[0, 0, 0.06]}
                  fontSize={0.1}
                  color="#0B1E33"
                  anchorX="center"
                  anchorY="middle"
                >
                  {card.text}
                </Text>
              </group>
            );
          })}

          <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={4} maxDistance={15} />
        </Canvas>
      </div>
    </div>
  );
};
