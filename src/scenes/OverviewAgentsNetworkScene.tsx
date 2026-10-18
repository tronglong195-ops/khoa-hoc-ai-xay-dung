import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';

export const OverviewAgentsNetworkScene: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  const agents = [
    { id: 0, name: 'Agent Tiếp Nhận', role: 'Phân tích yêu cầu khách hàng & dữ liệu thô', pos: [-4, 2, 0] as [number, number, number], color: '#38BDF8' },
    { id: 1, name: 'Agent Kiến Trúc', role: 'Thiết kế mặt bằng & phân khu công năng', pos: [-2, 4, 1] as [number, number, number], color: '#38BDF8' },
    { id: 2, name: 'Agent 3D Blender', role: 'Dựng khối 3D tham số từ JSON', pos: [2, 4, 1] as [number, number, number], color: '#38BDF8' },
    { id: 3, name: 'Agent Kỹ Thuật CAD', role: 'Sinh mã AutoLISP triển khai chi tiết', pos: [4, 2, 0] as [number, number, number], color: '#38BDF8' },
    { id: 4, name: 'Agent Bóc Khối Lượng', role: 'Đo bóc khối lượng bê tông/thép & lập BOQ', pos: [3, -2, 0] as [number, number, number], color: '#38BDF8' },
    { id: 5, name: 'Agent Thẩm Định QA/QC', role: 'Đối soát tiêu chuẩn PCCC và quy chuẩn', pos: [-3, -2, 0] as [number, number, number], color: '#38BDF8' },
  ];

  // HITL Central Node
  const hitlNode = { name: 'KỸ SƯ TRƯỞNG (HITL)', role: 'Quyền phê duyệt tối cao và chỉ đạo các Agent', pos: [0, 0, 0] as [number, number, number], color: '#F26B1D' };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-[#0B1E33] border border-[#1C3B5E] rounded-lg text-xs font-mono text-white flex items-center justify-between">
        <div>
          <span className="text-[#F26B1D] font-bold">MẠNG LƯỚI 6 AI AGENT: </span>
          <span>Kiến trúc phân tán với Kỹ sư trưởng (HITL) ở vị trí trung tâm điều phối</span>
        </div>
      </div>

      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#071321] border border-[#1C3B5E]">
        <Canvas camera={{ position: [0, 0, 11], fov: 45 }} frameloop="demand">
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <color attach="background" args={['#081524']} />

          {/* Central HITL Node */}
          <group position={hitlNode.pos} onClick={() => setSelectedAgent(-1)}>
            <mesh>
              <sphereGeometry args={[1.0, 32, 32]} />
              <meshStandardMaterial color={hitlNode.color} roughness={0.3} />
            </mesh>
            <Text
              position={[0, -1.4, 0]}
              fontSize={0.25}
              color="#F26B1D"
              anchorX="center"
              anchorY="middle"
            >
              HITL CONTROLLER
            </Text>
          </group>

          {/* 6 Peripheral Agent Nodes */}
          {agents.map((ag) => {
            const isSelected = selectedAgent === ag.id;
            return (
              <group key={ag.id} position={ag.pos} onClick={() => setSelectedAgent(ag.id)}>
                <mesh>
                  <sphereGeometry args={[0.6, 24, 24]} />
                  <meshStandardMaterial
                    color={isSelected ? '#F26B1D' : ag.color}
                    emissive={isSelected ? '#F26B1D' : '#000000'}
                    emissiveIntensity={isSelected ? 0.4 : 0}
                  />
                </mesh>
                <Text
                  position={[0, -0.9, 0]}
                  fontSize={0.2}
                  color="#FFFFFF"
                  anchorX="center"
                  anchorY="middle"
                >
                  {ag.name}
                </Text>

                {/* Connection line to HITL */}
                <Line
                  points={[
                    [0, 0, 0],
                    [-ag.pos[0], -ag.pos[1], -ag.pos[2]],
                  ]}
                  color="#1C3B5E"
                  lineWidth={1.5}
                />
              </group>
            );
          })}

          <OrbitControls maxPolarAngle={Math.PI / 2} minDistance={6} maxDistance={20} />
        </Canvas>

        {/* Selected Node Details */}
        <div className="absolute bottom-4 left-4 right-4 bg-[#0B1E33]/90 border border-[#1C3B5E] p-3 rounded text-xs font-mono text-white backdrop-blur-md">
          {selectedAgent === -1 ? (
            <div>
              <div className="text-[#F26B1D] font-bold text-sm mb-1">{hitlNode.name}</div>
              <div className="text-gray-300 font-sans">{hitlNode.role}</div>
            </div>
          ) : selectedAgent !== null ? (
            <div>
              <div className="text-[#38BDF8] font-bold text-sm mb-1">{agents[selectedAgent].name}</div>
              <div className="text-gray-300 font-sans">{agents[selectedAgent].role}</div>
            </div>
          ) : (
            <div className="text-gray-400 italic">
              * Click vào bất kỳ Node nào trên đồ thị 3D để xem chức năng và thẩm quyền trong mạng lưới.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
