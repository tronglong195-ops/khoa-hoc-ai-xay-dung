import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

export const Session5Scene: React.FC = () => {
  const [styleMode, setStyleMode] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50);

  const styles = [
    {
      name: 'Hiện Đại Tối Giản',
      wallColor: '#CBD5E1',
      woodColor: '#78350F',
      image: './images/04-buoi-04-agent-claudemd-blender-3d-demo-07-nha-pho-lo-7x20m/07_phoi-canh-mat-tien.webp',
    },
    {
      name: 'Gỗ Nhựa Nâu Cổ Điển',
      wallColor: '#D97706',
      woodColor: '#451A03',
      image: './images/04-buoi-04-agent-claudemd-blender-3d-demo-07-nha-pho-lo-7x20m/05_phoi-canh-goc-hong.webp',
    },
    {
      name: 'Bê Tông Tinh Gọn (Brutalist)',
      wallColor: '#94A3B8',
      woodColor: '#334155',
      image: './images/04-buoi-04-agent-claudemd-blender-3d-demo-07-nha-pho-lo-7x20m/06_phoi-canh-tren-cao.webp',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="p-3 bg-[#0B1E33] border border-[#1C3B5E] rounded-lg text-xs font-mono text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[#F26B1D] font-bold">"AI CHỈ SƠN LẠI, KHÔNG XÂY LẠI":</span>
          <span>Đổi phong cách vật liệu trên khối 3D nguyên gốc</span>
        </div>
        <div className="flex items-center gap-1.5">
          {styles.map((st, idx) => (
            <button
              key={idx}
              onClick={() => setStyleMode(idx)}
              className={`px-2.5 py-1 rounded transition-colors ${
                styleMode === idx
                  ? 'bg-[#F26B1D] text-white font-bold'
                  : 'bg-[#142D4B] text-gray-300 hover:bg-[#1C3B5E]'
              }`}
            >
              {st.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#071321] border border-[#1C3B5E]">
        {/* 3D Massing with dynamic material */}
        <Canvas camera={{ position: [8, 8, 12], fov: 45 }} frameloop="demand">
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 15, 10]} intensity={1.5} />
          <color attach="background" args={['#081524']} />

          {/* House Massing with style material */}
          <group position={[0, -2, 0]}>
            {/* T1 */}
            <mesh position={[0, 1.8, 0]}>
              <boxGeometry args={[4, 3.6, 6]} />
              <meshStandardMaterial color={styles[styleMode].wallColor} roughness={0.6} />
            </mesh>
            {/* T2 */}
            <mesh position={[0, 5.3, 0]}>
              <boxGeometry args={[4, 3.4, 6]} />
              <meshStandardMaterial color={styles[styleMode].woodColor} roughness={0.4} />
            </mesh>
            {/* T3 */}
            <mesh position={[0, 8.7, 0]}>
              <boxGeometry args={[4, 3.4, 6]} />
              <meshStandardMaterial color={styles[styleMode].wallColor} roughness={0.6} />
            </mesh>
            {/* Windows */}
            <mesh position={[0, 5.3, 3.05]}>
              <boxGeometry args={[2, 1.5, 0.1]} />
              <meshStandardMaterial color="#38BDF8" transparent opacity={0.7} />
            </mesh>
          </group>

          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.05} />
        </Canvas>

        {/* Overlay Before/After Comparison Card */}
        <div className="absolute bottom-4 right-4 w-64 bg-[#0B1E33]/90 border border-[#1C3B5E] p-2.5 rounded-lg text-xs font-mono text-white backdrop-blur-md">
          <div className="text-[#F26B1D] font-bold mb-1">Ảnh Render AI thực tế:</div>
          <img
            src={styles[styleMode].image}
            alt={styles[styleMode].name}
            className="w-full h-28 object-cover rounded border border-gray-700"
          />
          <div className="text-[10px] text-gray-400 mt-1 truncate">
            Phong cách: {styles[styleMode].name}
          </div>
        </div>
      </div>
    </div>
  );
};
