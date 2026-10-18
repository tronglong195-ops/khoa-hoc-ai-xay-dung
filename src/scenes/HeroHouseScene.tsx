import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { houseData, getFloorMetrics, rectToBoxProps } from '../lib/house-from-json';
import { Layers, Eye, Code, Box, Sliders, Image as ImageIcon } from 'lucide-react';

interface HeroHouseSceneProps {
  initialStage?: number;
  interactive?: boolean;
}

export const HeroHouseScene: React.FC<HeroHouseSceneProps> = ({
  initialStage = 3,
  interactive = true,
}) => {
  // 4 Stages: 0: 2D Floor Plan wireframe, 1: JSON Inspection, 2: 3D Extrude, 3: Exploded View
  const [stage, setStage] = useState<number>(initialStage);
  const [explodeFactor, setExplodeFactor] = useState<number>(1.2);
  const [selectedFloor, setSelectedFloor] = useState<string>('ALL');
  const [showStaticFallback, setShowStaticFallback] = useState<boolean>(false);

  const floorMetrics = useMemo(() => getFloorMetrics(), []);

  if (showStaticFallback) {
    return (
      <div className="relative w-full aspect-16/9 bg-[#0B1E33] rounded-lg overflow-hidden flex flex-col items-center justify-center p-6 text-white border border-[#1C3B5E]">
        <img
          src="./images/04-buoi-04-agent-claudemd-blender-3d-demo-07-nha-pho-lo-7x20m/07_phoi-canh-mat-tien.webp"
          alt="Phối cảnh nhà phố 7x20m"
          className="max-h-[80%] rounded object-contain shadow-lg"
        />
        <div className="mt-3 flex items-center justify-between w-full max-w-lg text-xs font-mono">
          <span>Chế độ ảnh tĩnh fallback (Tiết kiệm hiệu năng)</span>
          <button
            onClick={() => setShowStaticFallback(false)}
            className="text-[#F26B1D] underline font-bold"
          >
            Bật lại 3D tương tác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border-2 border-[#1B242A] dark:border-[#1C3B5E] bg-[#071321] shadow-2xl font-mono text-xs">
      {/* 4-Stage Controls Header */}
      <div className="p-3 bg-[#0B1E33] border-b border-[#1C3B5E] flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider mr-1">CHẶNG:</span>
          {[
            { id: 0, label: '1. Mặt Bằng 2D', icon: Layers },
            { id: 1, label: '2. Schema JSON', icon: Code },
            { id: 2, label: '3. Extrude 3D', icon: Box },
            { id: 3, label: '4. Bung Tầng (Exploded)', icon: Sliders },
          ].map((st) => {
            const Icon = st.icon;
            return (
              <button
                key={st.id}
                onClick={() => setStage(st.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded transition-all shrink-0 ${
                  stage === st.id
                    ? 'bg-[#F26B1D] text-white font-bold shadow'
                    : 'bg-[#142D4B] text-gray-300 hover:bg-[#1A3A5E]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {stage === 3 && (
            <div className="flex items-center gap-2 bg-[#142D4B] px-2.5 py-1 rounded">
              <span className="text-[10px] text-gray-400">ĐỘ BUNG:</span>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={explodeFactor}
                onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                className="w-20 accent-[#F26B1D]"
              />
              <span className="text-[#F26B1D] font-bold">{explodeFactor.toFixed(1)}x</span>
            </div>
          )}

          <button
            onClick={() => setShowStaticFallback(true)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#142D4B] hover:bg-[#1A3A5E] text-gray-300 transition-colors"
            title="Chuyển sang ảnh tĩnh để tiết kiệm pin/RAM"
          >
            <ImageIcon className="w-3 h-3 text-[#F26B1D]" />
            <span className="hidden sm:inline">Ảnh tĩnh</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas / JSON View Area */}
      <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-[#081524]">
        {stage === 1 ? (
          /* Stage 2: JSON Code Inspection */
          <div className="absolute inset-0 p-4 overflow-y-auto bg-[#071320] text-gray-200">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="p-3 bg-[#0E2744] border border-[#1C3B5E] rounded text-[11px] text-[#38BDF8]">
                Trích xuất từ file: <code className="text-[#F26B1D]">03_mo-ta-tu-ban-ve.json</code>
                <br />
                Đơn vị: <strong>mm</strong> | Hệ cao độ: SAN (-450), T1 (0), T2 (3600), T3 (7000), ST (10400), TUM (13400)
              </div>
              <pre className="p-4 bg-[#050C14] border border-gray-800 rounded font-mono text-[11px] leading-relaxed overflow-x-auto text-green-400">
                {JSON.stringify(
                  {
                    nguon: houseData.nguon,
                    cao_do: houseData.cao_do,
                    thong_so: houseData.thong_so,
                    mat_bang_sample: {
                      T1_tuong_count: houseData.mat_bang.T1.tuong.length,
                      T1_cua_count: houseData.mat_bang.T1.cua.length,
                      T2_tuong_count: houseData.mat_bang.T2.tuong.length,
                      T3_tuong_count: houseData.mat_bang.T3.tuong.length,
                    },
                    cua_catalog: houseData.cua,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        ) : (
          /* Stages 0, 2, 3: 3D Canvas */
          <Canvas
            camera={{ position: [12, 12, 16], fov: 45 }}
            frameloop="demand"
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={['#081524']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 20, 15]} intensity={1.2} />
            <directionalLight position={[-10, 10, -10]} intensity={0.5} />

            <Grid
              infiniteGrid
              cellSize={1}
              cellThickness={0.5}
              cellColor="#1C3B5E"
              sectionSize={5}
              sectionThickness={1}
              sectionColor="#F26B1D"
              fadeDistance={40}
            />

            {/* Render 4 Floors */}
            <FloorGroup
              floorKey="T1"
              data={houseData.mat_bang.T1}
              metrics={floorMetrics.T1}
              stage={stage}
              explodeOffset={stage === 3 ? 0 : 0}
            />
            <FloorGroup
              floorKey="T2"
              data={houseData.mat_bang.T2}
              metrics={floorMetrics.T2}
              stage={stage}
              explodeOffset={stage === 3 ? 2.5 * explodeFactor : 0}
            />
            <FloorGroup
              floorKey="T3"
              data={houseData.mat_bang.T3}
              metrics={floorMetrics.T3}
              stage={stage}
              explodeOffset={stage === 3 ? 5.0 * explodeFactor : 0}
            />
            <FloorGroup
              floorKey="MAI"
              data={houseData.mat_bang.MAI}
              metrics={floorMetrics.MAI}
              stage={stage}
              explodeOffset={stage === 3 ? 7.5 * explodeFactor : 0}
            />

            <OrbitControls
              enableDamping
              maxPolarAngle={Math.PI / 2 - 0.05}
              minDistance={5}
              maxDistance={35}
            />
          </Canvas>
        )}

        {/* HUD Info Box */}
        <div className="absolute bottom-3 left-3 bg-[#0B1E33]/90 border border-[#1C3B5E] p-2.5 rounded text-[11px] text-gray-300 backdrop-blur-sm pointer-events-none">
          <div className="font-bold text-white mb-0.5">NHÀ PHỐ LÔ 7x20m (CES GLOBAL)</div>
          <div>Kích thước đất: 5m x 14m xây dựng (lô 7m x 20m)</div>
          <div className="text-[#F26B1D]">
            {stage === 0 && 'Chế độ: Mặt bằng 2D nét wireframe'}
            {stage === 1 && 'Chế độ: Kiểm tra cấu trúc JSON'}
            {stage === 2 && 'Chế độ: Khối 3D nguyên vẹn (Extruded)'}
            {stage === 3 && `Chế độ: Bung tầng (Tách trục Y ${explodeFactor.toFixed(1)}x)`}
          </div>
        </div>
      </div>
    </div>
  );
};

interface FloorGroupProps {
  floorKey: string;
  data: any;
  metrics: { baseElevation: number; height: number };
  stage: number;
  explodeOffset: number;
}

const FloorGroup: React.FC<FloorGroupProps> = ({
  floorKey,
  data,
  metrics,
  stage,
  explodeOffset,
}) => {
  const yPos = (stage === 0 ? 0.05 : metrics.baseElevation) + explodeOffset;
  const h = stage === 0 ? 0.05 : metrics.height;
  const isWireframe = stage === 0;

  return (
    <group position={[0, yPos, 0]}>
      {/* Sàn bê tông (Slabs) */}
      {data.san?.map((rect: [number, number, number, number], idx: number) => {
        const box = rectToBoxProps(rect, 0, 0.12);
        return (
          <mesh key={`san-${idx}`} position={box.position}>
            <boxGeometry args={[box.width, box.height, box.depth]} />
            <meshStandardMaterial
              color={floorKey === 'T1' ? '#3B4A5A' : '#2D3A47'}
              wireframe={isWireframe}
              roughness={0.8}
            />
          </mesh>
        );
      })}

      {/* Tường (Walls) */}
      {data.tuong?.map((rect: [number, number, number, number], idx: number) => {
        const box = rectToBoxProps(rect, 0, h);
        return (
          <mesh key={`tuong-${idx}`} position={box.position}>
            <boxGeometry args={[box.width, box.height, box.depth]} />
            <meshStandardMaterial
              color={
                floorKey === 'MAI'
                  ? '#D97706'
                  : floorKey === 'T3'
                  ? '#9A3412'
                  : '#CBD5E1'
              }
              wireframe={isWireframe}
              roughness={0.5}
            />
          </mesh>
        );
      })}

      {/* Cột BTCT (Columns) */}
      {data.cot?.map((rect: [number, number, number, number], idx: number) => {
        const box = rectToBoxProps(rect, 0, h);
        return (
          <mesh key={`cot-${idx}`} position={box.position}>
            <boxGeometry args={[box.width, box.height, box.depth]} />
            <meshStandardMaterial color="#F26B1D" wireframe={isWireframe} />
          </mesh>
        );
      })}

      {/* Cửa (Doors & Windows) */}
      {stage !== 0 &&
        data.cua?.map((doorDef: any, idx: number) => {
          const spec = houseData.cua[doorDef.ma] || { cao: 2200, be: 0 };
          const doorHeight = (spec.cao || 2200) * 0.001;
          const doorSill = (spec.be || 0) * 0.001;
          const box = rectToBoxProps(doorDef.hcn, doorSill, doorHeight);

          const isWindow = doorDef.ma.startsWith('S');
          return (
            <mesh key={`cua-${idx}`} position={box.position}>
              <boxGeometry args={[box.width, box.height, box.depth]} />
              <meshStandardMaterial
                color={isWindow ? '#38BDF8' : '#78350F'}
                transparent
                opacity={isWindow ? 0.6 : 0.85}
              />
            </mesh>
          );
        })}
    </group>
  );
};
