import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';

export const Session3Scene: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const steps = [
    { title: '1. Kỹ sư ra lệnh (Prompt)', desc: '"Vẽ mặt bằng căn hộ 2PN, lưới trục A-B-C, cột 200x200"' },
    { title: '2. AI sinh AutoLISP/Script', desc: '(command "_RECTANG" "0,0" "5000,14000") ... (command "_LINE" ...)' },
    { title: '3. AutoCAD vẽ trực tiếp lên bản vẽ', desc: 'Các nét vẽ CAD hiện dần trên không gian model' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-[#0B1E33] border border-[#1C3B5E] rounded-lg text-xs font-mono text-white">
        <div>
          <span className="text-[#F26B1D] font-bold">LUỒNG ĐIỀU KHIỂN: </span>
          <span>{steps[step].title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-2.5 py-1 rounded bg-[#142D4B] disabled:opacity-40"
          >
            Lùi lại
          </button>
          <button
            onClick={() => setStep((s) => Math.min(2, s + 1))}
            disabled={step === 2}
            className="px-2.5 py-1 rounded bg-[#F26B1D] font-bold disabled:opacity-40"
          >
            Chạy tiếp →
          </button>
        </div>
      </div>

      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#071321] border border-[#1C3B5E]">
        <Canvas camera={{ position: [0, 8, 8], fov: 45 }} frameloop="demand">
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <color attach="background" args={['#040D17']} />

          {/* AutoCAD Blueprint Grid */}
          <Grid
            infiniteGrid
            cellSize={0.5}
            cellColor="#1C3B5E"
            sectionSize={2.5}
            sectionColor="#0284C7"
          />

          {/* Outer Boundary Wall (Drawn at Step >= 1) */}
          {step >= 1 && (
            <group position={[0, 0.1, 0]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[6, 0.1, 4]} />
                <meshStandardMaterial color="#0284C7" wireframe />
              </mesh>
            </group>
          )}

          {/* Internal Partitions & Columns (Drawn at Step 2) */}
          {step >= 2 && (
            <group position={[0, 0.1, 0]}>
              {/* Internal Wall */}
              <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[0.2, 0.3, 4]} />
                <meshStandardMaterial color="#F26B1D" />
              </mesh>
              {/* Columns */}
              {[-2.8, 2.8].map((x, xi) =>
                [-1.8, 1.8].map((z, zi) => (
                  <mesh key={`${xi}-${zi}`} position={[x, 0.25, z]}>
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshStandardMaterial color="#10B981" />
                  </mesh>
                ))
              )}
            </group>
          )}

          <OrbitControls maxPolarAngle={Math.PI / 2 - 0.05} />
        </Canvas>

        {/* Code / Command Prompt Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-[#0B1E33]/90 border border-[#0284C7] p-3 rounded text-xs font-mono text-gray-200 backdrop-blur-md">
          <div className="text-[#38BDF8] font-bold mb-1">{steps[step].title}</div>
          <div className="text-gray-400">{steps[step].desc}</div>
        </div>
      </div>
    </div>
  );
};
