import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

export const Session6PipelineScene: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<number>(0);
  const [clientChangedMind, setClientChangedMind] = useState<boolean>(false);

  const stations = [
    { name: '1. Tiếp nhận & Trích xuất', agent: 'Agent Tiếp nhận', isHitl: false, x: -7.5 },
    { name: '2. Mặt bằng công năng', agent: 'Agent Kiến trúc', isHitl: true, hitlName: 'HITL 1: Duyệt mặt bằng', x: -5.0 },
    { name: '3. Mô hình 3D Blender', agent: 'Agent 3D', isHitl: false, x: -2.5 },
    { name: '4. Triển khai bản vẽ CAD', agent: 'Agent Kỹ thuật', isHitl: false, x: 0 },
    { name: '5. Bóc tách BOQ', agent: 'Agent Khối lượng', isHitl: true, hitlName: 'HITL 2: Duyệt BOQ', x: 2.5 },
    { name: '6. Kiểm tra chéo (QA/QC)', agent: 'Agent Thẩm định', isHitl: false, x: 5.0 },
    { name: '7. Đóng gói hồ sơ', agent: 'Agent Đóng gói', isHitl: true, hitlName: 'HITL 3: Xuất xưởng', x: 7.5 },
  ];

  return (
    <div className="space-y-4">
      {/* Control bar */}
      <div className="p-3 bg-[#0B1E33] border border-[#1C3B5E] rounded-lg text-xs font-mono text-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[#F26B1D] font-bold">DÂY CHUYỀN 7 CHẶNG & 3 CỔNG HITL: </span>
          <span>Click từng trạm để xem Agent phụ trách và kịch bản handoff</span>
        </div>
        <button
          onClick={() => setClientChangedMind(!clientChangedMind)}
          className={`px-3 py-1.5 rounded font-bold transition-all ${
            clientChangedMind
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-[#142D4B] text-gray-200 hover:bg-[#1C3B5E]'
          }`}
        >
          {clientChangedMind ? 'Hủy mô phỏng đổi ý' : 'Mô phỏng: "Chủ nhà đổi ý!"'}
        </button>
      </div>

      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#071321] border border-[#1C3B5E]">
        <Canvas camera={{ position: [0, 8, 14], fov: 40 }} frameloop="demand">
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <color attach="background" args={['#081524']} />

          {/* Conveyor Belt Base */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[18, 0.2, 2]} />
            <meshStandardMaterial color="#1E293B" roughness={0.7} />
          </mesh>

          {/* 7 Stations */}
          {stations.map((st, idx) => {
            const isSelected = selectedStation === idx;
            const isReturnTarget = clientChangedMind && idx === 1; // Return to HITL 1 if client changed mind

            return (
              <group
                key={idx}
                position={[st.x, 0.4, 0]}
                onClick={() => setSelectedStation(idx)}
              >
                {/* Station Node */}
                <mesh>
                  <boxGeometry args={[1.6, 0.8, 1.2]} />
                  <meshStandardMaterial
                    color={
                      isReturnTarget
                        ? '#EF4444'
                        : isSelected
                        ? '#F26B1D'
                        : st.isHitl
                        ? '#10B981'
                        : '#0284C7'
                    }
                  />
                </mesh>

                {/* HITL Arch / Gate */}
                {st.isHitl && (
                  <group position={[0, 0.8, 0]}>
                    <mesh position={[0, 0.6, 0]}>
                      <boxGeometry args={[1.8, 0.2, 1.4]} />
                      <meshStandardMaterial color="#10B981" />
                    </mesh>
                    <mesh position={[-0.8, 0, 0]}>
                      <cylinderGeometry args={[0.08, 0.08, 1.2]} />
                      <meshStandardMaterial color="#10B981" />
                    </mesh>
                    <mesh position={[0.8, 0, 0]}>
                      <cylinderGeometry args={[0.08, 0.08, 1.2]} />
                      <meshStandardMaterial color="#10B981" />
                    </mesh>
                  </group>
                )}

                {/* Label */}
                <Text
                  position={[0, -0.8, 0]}
                  fontSize={0.2}
                  color="#FFFFFF"
                  anchorX="center"
                  anchorY="middle"
                >
                  {`Chặng 0${idx + 1}`}
                </Text>
              </group>
            );
          })}

          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.05} minDistance={6} maxDistance={25} />
        </Canvas>

        {/* Selected Station HUD */}
        <div className="absolute bottom-4 left-4 right-4 bg-[#0B1E33]/90 border border-[#1C3B5E] p-3 rounded text-xs font-mono text-white backdrop-blur-md">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[#F26B1D] text-sm">
              {stations[selectedStation].name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300">
              {stations[selectedStation].isHitl ? 'CỔNG KIỂM DUYỆT HITL' : 'TỰ ĐỘNG HÓA AGENT'}
            </span>
          </div>
          <div className="text-gray-300">
            Tác tử đảm nhiệm: <strong>{stations[selectedStation].agent}</strong>
          </div>
          {clientChangedMind && (
            <div className="mt-2 text-red-400 font-bold bg-red-950/50 p-1.5 rounded border border-red-800">
              ⚠️ Tình huống: Chủ nhà đổi ý tăng thêm 1 phòng ngủ tại tầng 2 $\rightarrow$ Dây chuyền đảo ngược về <strong>Cổng HITL 1 (Mặt bằng)</strong> để duyệt lại công năng trước khi sinh lại 3D và BOQ!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
